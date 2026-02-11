import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface CodeError {
  id: string;
  line: number;
  column?: number;
  type: 'error' | 'warning' | 'info';
  message: string;
  code: string;
  fix?: string;
  fixDescription?: string;
}

interface LanguageOption {
  id: string;
  name: string;
  icon: string;
}

const languages: LanguageOption[] = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷' },
  { id: 'html', name: 'HTML', icon: '🟧' },
  { id: 'css', name: 'CSS', icon: '🟦' },
  { id: 'json', name: 'JSON', icon: '📋' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'php', name: 'PHP', icon: '🐘' },
  { id: 'sql', name: 'SQL', icon: '🗃️' },
];

export function CodeErrorFinder() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [errors, setErrors] = useState<CodeError[]>([]);
  const [fixedCode, setFixedCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFixed, setShowFixed] = useState(false);
  const [copied, setCopied] = useState(false);

  // JavaScript/TypeScript Error Patterns
  const jsErrors = [
    { pattern: /console\.log\(/g, type: 'warning' as const, message: 'Console.log found - remove before production', fix: (code: string) => code.replace(/console\.log\([^)]*\);?\n?/g, ''), fixDesc: 'Remove console.log statements' },
    { pattern: /var\s+/g, type: 'warning' as const, message: 'Use "let" or "const" instead of "var"', fix: (code: string) => code.replace(/var\s+/g, 'let '), fixDesc: 'Replace var with let' },
    { pattern: /==(?!=)/g, type: 'warning' as const, message: 'Use "===" instead of "==" for strict equality', fix: (code: string) => code.replace(/==(?!=)/g, '==='), fixDesc: 'Replace == with ===' },
    { pattern: /!=(?!=)/g, type: 'warning' as const, message: 'Use "!==" instead of "!=" for strict inequality', fix: (code: string) => code.replace(/!=(?!=)/g, '!=='), fixDesc: 'Replace != with !==' },
    { pattern: /;\s*;/g, type: 'error' as const, message: 'Double semicolon found', fix: (code: string) => code.replace(/;\s*;/g, ';'), fixDesc: 'Remove double semicolons' },
    { pattern: /\(\s*\)/g, type: 'info' as const, message: 'Empty parentheses found', fix: null, fixDesc: null },
    { pattern: /{\s*}/g, type: 'info' as const, message: 'Empty code block found', fix: null, fixDesc: null },
    { pattern: /alert\(/g, type: 'warning' as const, message: 'Alert() found - consider using a modal instead', fix: null, fixDesc: null },
    { pattern: /document\.write\(/g, type: 'error' as const, message: 'document.write() is deprecated and dangerous', fix: null, fixDesc: null },
    { pattern: /eval\(/g, type: 'error' as const, message: 'eval() is dangerous - avoid using it', fix: null, fixDesc: null },
    { pattern: /new Array\(\)/g, type: 'warning' as const, message: 'Use [] instead of new Array()', fix: (code: string) => code.replace(/new Array\(\)/g, '[]'), fixDesc: 'Replace new Array() with []' },
    { pattern: /new Object\(\)/g, type: 'warning' as const, message: 'Use {} instead of new Object()', fix: (code: string) => code.replace(/new Object\(\)/g, '{}'), fixDesc: 'Replace new Object() with {}' },
    { pattern: /function\s+\w+\s*\([^)]*\)\s*{[^}]*}\s*$/gm, type: 'info' as const, message: 'Consider using arrow functions', fix: null, fixDesc: null },
    { pattern: /['"]use strict['"]\s*;?/g, type: 'info' as const, message: '"use strict" is not needed in ES modules', fix: (code: string) => code.replace(/['"]use strict['"]\s*;?\n?/g, ''), fixDesc: 'Remove use strict' },
    { pattern: /\+\s*""/g, type: 'warning' as const, message: 'Use template literals instead of string concatenation', fix: null, fixDesc: null },
    { pattern: /"\s*\+\s*/g, type: 'info' as const, message: 'Consider using template literals', fix: null, fixDesc: null },
    { pattern: /\/\/\s*TODO/gi, type: 'info' as const, message: 'TODO comment found', fix: null, fixDesc: null },
    { pattern: /\/\/\s*FIXME/gi, type: 'warning' as const, message: 'FIXME comment found - needs attention', fix: null, fixDesc: null },
    { pattern: /debugger\s*;?/g, type: 'error' as const, message: 'Debugger statement found - remove before production', fix: (code: string) => code.replace(/debugger\s*;?\n?/g, ''), fixDesc: 'Remove debugger statements' },
    { pattern: /^\s*\n\s*\n\s*\n/gm, type: 'warning' as const, message: 'Multiple empty lines found', fix: (code: string) => code.replace(/^\s*\n\s*\n\s*\n/gm, '\n\n'), fixDesc: 'Remove extra empty lines' },
    { pattern: /\s+$/gm, type: 'warning' as const, message: 'Trailing whitespace found', fix: (code: string) => code.replace(/\s+$/gm, ''), fixDesc: 'Remove trailing whitespace' },
  ];

  // HTML Error Patterns
  const htmlErrors = [
    { pattern: /<img(?![^>]*alt=)/gi, type: 'error' as const, message: 'Image missing alt attribute (accessibility issue)', fix: (code: string) => code.replace(/<img(?![^>]*alt=)([^>]*)>/gi, '<img$1 alt="">'), fixDesc: 'Add empty alt attribute' },
    { pattern: /<a(?![^>]*href=)/gi, type: 'error' as const, message: 'Anchor tag missing href attribute', fix: (code: string) => code.replace(/<a(?![^>]*href=)([^>]*)>/gi, '<a$1 href="#">'), fixDesc: 'Add href attribute' },
    { pattern: /<html(?![^>]*lang=)/gi, type: 'warning' as const, message: 'HTML tag missing lang attribute', fix: (code: string) => code.replace(/<html(?![^>]*lang=)([^>]*)>/gi, '<html$1 lang="en">'), fixDesc: 'Add lang="en" attribute' },
    { pattern: /<meta(?![^>]*charset)/gi, type: 'warning' as const, message: 'Missing charset meta tag', fix: null, fixDesc: null },
    { pattern: /<br>/gi, type: 'warning' as const, message: 'Use <br /> instead of <br> for XHTML compatibility', fix: (code: string) => code.replace(/<br>/gi, '<br />'), fixDesc: 'Replace <br> with <br />' },
    { pattern: /<hr>/gi, type: 'warning' as const, message: 'Use <hr /> instead of <hr> for XHTML compatibility', fix: (code: string) => code.replace(/<hr>/gi, '<hr />'), fixDesc: 'Replace <hr> with <hr />' },
    { pattern: /<input(?![^>]*\/>)([^>]*)>/gi, type: 'info' as const, message: 'Self-closing input tag recommended', fix: (code: string) => code.replace(/<input([^>]*)(?<!\/)>/gi, '<input$1 />'), fixDesc: 'Make input self-closing' },
    { pattern: /style\s*=\s*["'][^"']*["']/gi, type: 'warning' as const, message: 'Inline styles found - consider using CSS classes', fix: null, fixDesc: null },
    { pattern: /onclick\s*=\s*["']/gi, type: 'warning' as const, message: 'Inline event handler found - use addEventListener instead', fix: null, fixDesc: null },
    { pattern: /<font/gi, type: 'error' as const, message: '<font> tag is deprecated - use CSS instead', fix: null, fixDesc: null },
    { pattern: /<center/gi, type: 'error' as const, message: '<center> tag is deprecated - use CSS instead', fix: null, fixDesc: null },
    { pattern: /<marquee/gi, type: 'error' as const, message: '<marquee> tag is deprecated', fix: null, fixDesc: null },
    { pattern: /<b>/gi, type: 'info' as const, message: 'Consider using <strong> for semantic meaning', fix: (code: string) => code.replace(/<b>/gi, '<strong>').replace(/<\/b>/gi, '</strong>'), fixDesc: 'Replace <b> with <strong>' },
    { pattern: /<i>(?![^<]*icon)/gi, type: 'info' as const, message: 'Consider using <em> for semantic emphasis', fix: (code: string) => code.replace(/<i>/gi, '<em>').replace(/<\/i>/gi, '</em>'), fixDesc: 'Replace <i> with <em>' },
    { pattern: /<!--[\s\S]*?-->/g, type: 'info' as const, message: 'HTML comment found', fix: null, fixDesc: null },
  ];

  // CSS Error Patterns
  const cssErrors = [
    { pattern: /!important/g, type: 'warning' as const, message: '!important found - avoid overusing it', fix: null, fixDesc: null },
    { pattern: /#[0-9a-f]{6}/gi, type: 'info' as const, message: 'Consider using CSS variables for colors', fix: null, fixDesc: null },
    { pattern: /\*\s*{/g, type: 'warning' as const, message: 'Universal selector (*) can impact performance', fix: null, fixDesc: null },
    { pattern: /@import/g, type: 'warning' as const, message: '@import can slow down page load - use <link> instead', fix: null, fixDesc: null },
    { pattern: /float\s*:/g, type: 'info' as const, message: 'Consider using Flexbox or Grid instead of float', fix: null, fixDesc: null },
    { pattern: /position\s*:\s*absolute/g, type: 'info' as const, message: 'Absolute positioning found - use with caution', fix: null, fixDesc: null },
    { pattern: /z-index\s*:\s*[0-9]{4,}/g, type: 'warning' as const, message: 'Very high z-index value found', fix: null, fixDesc: null },
    { pattern: /px\s*;/g, type: 'info' as const, message: 'Consider using rem or em for better responsiveness', fix: null, fixDesc: null },
    { pattern: /margin\s*:\s*0\s*auto/g, type: 'info' as const, message: 'For centering, consider using Flexbox', fix: null, fixDesc: null },
    { pattern: /;\s*;/g, type: 'error' as const, message: 'Double semicolon found', fix: (code: string) => code.replace(/;\s*;/g, ';'), fixDesc: 'Remove double semicolons' },
    { pattern: /{\s*}/g, type: 'warning' as const, message: 'Empty CSS rule found', fix: null, fixDesc: null },
    { pattern: /-webkit-|-moz-|-ms-|-o-/g, type: 'info' as const, message: 'Vendor prefixes found - consider using autoprefixer', fix: null, fixDesc: null },
  ];

  // JSON Error Patterns
  const jsonErrors = [
    { pattern: /,\s*[}\]]/g, type: 'error' as const, message: 'Trailing comma found (not allowed in JSON)', fix: (code: string) => code.replace(/,(\s*[}\]])/g, '$1'), fixDesc: 'Remove trailing commas' },
    { pattern: /\/\/.*/g, type: 'error' as const, message: 'Comments are not allowed in JSON', fix: (code: string) => code.replace(/\/\/.*\n?/g, ''), fixDesc: 'Remove comments' },
    { pattern: /\/\*[\s\S]*?\*\//g, type: 'error' as const, message: 'Block comments are not allowed in JSON', fix: (code: string) => code.replace(/\/\*[\s\S]*?\*\//g, ''), fixDesc: 'Remove block comments' },
    { pattern: /'[^']*'/g, type: 'error' as const, message: 'Single quotes not allowed - use double quotes', fix: (code: string) => code.replace(/'([^']*)'/g, '"$1"'), fixDesc: 'Replace single quotes with double quotes' },
    { pattern: /:\s*undefined/g, type: 'error' as const, message: 'undefined is not valid in JSON - use null', fix: (code: string) => code.replace(/:\s*undefined/g, ': null'), fixDesc: 'Replace undefined with null' },
    { pattern: /\bNaN\b/g, type: 'error' as const, message: 'NaN is not valid in JSON', fix: (code: string) => code.replace(/\bNaN\b/g, 'null'), fixDesc: 'Replace NaN with null' },
    { pattern: /\bInfinity\b/g, type: 'error' as const, message: 'Infinity is not valid in JSON', fix: (code: string) => code.replace(/\bInfinity\b/g, 'null'), fixDesc: 'Replace Infinity with null' },
  ];

  // Python Error Patterns
  const pythonErrors = [
    { pattern: /print\s+[^(]/g, type: 'error' as const, message: 'Python 2 print statement - use print() function', fix: null, fixDesc: null },
    { pattern: /\t/g, type: 'warning' as const, message: 'Tab character found - use 4 spaces instead', fix: (code: string) => code.replace(/\t/g, '    '), fixDesc: 'Replace tabs with spaces' },
    { pattern: /except\s*:/g, type: 'warning' as const, message: 'Bare except clause - specify exception type', fix: null, fixDesc: null },
    { pattern: /from\s+\w+\s+import\s+\*/g, type: 'warning' as const, message: 'Wildcard import found - import specific names', fix: null, fixDesc: null },
    { pattern: /==\s*True\b/g, type: 'warning' as const, message: 'Comparing to True - use the value directly', fix: (code: string) => code.replace(/==\s*True\b/g, ''), fixDesc: 'Remove == True comparison' },
    { pattern: /==\s*False\b/g, type: 'warning' as const, message: 'Comparing to False - use "not" instead', fix: null, fixDesc: null },
    { pattern: /==\s*None\b/g, type: 'warning' as const, message: 'Use "is None" instead of "== None"', fix: (code: string) => code.replace(/==\s*None\b/g, 'is None'), fixDesc: 'Replace == None with is None' },
    { pattern: /!=\s*None\b/g, type: 'warning' as const, message: 'Use "is not None" instead of "!= None"', fix: (code: string) => code.replace(/!=\s*None\b/g, 'is not None'), fixDesc: 'Replace != None with is not None' },
    { pattern: /#\s*TODO/gi, type: 'info' as const, message: 'TODO comment found', fix: null, fixDesc: null },
    { pattern: /#\s*FIXME/gi, type: 'warning' as const, message: 'FIXME comment found', fix: null, fixDesc: null },
    { pattern: /lambda\s+\w+\s*:\s*\w+/g, type: 'info' as const, message: 'Consider using a named function for clarity', fix: null, fixDesc: null },
  ];

  // PHP Error Patterns
  const phpErrors = [
    { pattern: /mysql_/g, type: 'error' as const, message: 'mysql_ functions are deprecated - use mysqli_ or PDO', fix: null, fixDesc: null },
    { pattern: /echo\s+\$_/g, type: 'error' as const, message: 'XSS vulnerability - escape output with htmlspecialchars()', fix: null, fixDesc: null },
    { pattern: /eval\s*\(/g, type: 'error' as const, message: 'eval() is dangerous - avoid using it', fix: null, fixDesc: null },
    { pattern: /error_reporting\s*\(\s*0\s*\)/g, type: 'warning' as const, message: 'Error reporting disabled - enable in development', fix: null, fixDesc: null },
  ];

  // SQL Error Patterns
  const sqlErrors = [
    { pattern: /SELECT\s+\*/gi, type: 'warning' as const, message: 'SELECT * can be slow - specify columns', fix: null, fixDesc: null },
    { pattern: /password\s*=\s*['"][^'"]+['"]/gi, type: 'error' as const, message: 'Hardcoded password found - use parameters', fix: null, fixDesc: null },
    { pattern: /'\s*\+\s*\w+\s*\+\s*'/g, type: 'error' as const, message: 'SQL injection risk - use prepared statements', fix: null, fixDesc: null },
    { pattern: /\$\w+/g, type: 'warning' as const, message: 'Variable in SQL - ensure it\'s properly escaped', fix: null, fixDesc: null },
    { pattern: /LIKE\s+'%/gi, type: 'info' as const, message: 'Leading wildcard in LIKE can be slow', fix: null, fixDesc: null },
    { pattern: /ORDER BY\s+\d+/gi, type: 'warning' as const, message: 'Order by column number - use column name instead', fix: null, fixDesc: null },
    { pattern: /DELETE\s+FROM\s+\w+\s*;/gi, type: 'error' as const, message: 'DELETE without WHERE - will delete all rows!', fix: null, fixDesc: null },
    { pattern: /UPDATE\s+\w+\s+SET[^W]*;/gi, type: 'error' as const, message: 'UPDATE without WHERE - will update all rows!', fix: null, fixDesc: null },
    { pattern: /DROP\s+TABLE/gi, type: 'error' as const, message: 'DROP TABLE found - be careful!', fix: null, fixDesc: null },
    { pattern: /TRUNCATE/gi, type: 'warning' as const, message: 'TRUNCATE will delete all data!', fix: null, fixDesc: null },
  ];

  const getErrorPatterns = () => {
    switch (language) {
      case 'javascript':
      case 'typescript':
        return jsErrors;
      case 'html':
        return htmlErrors;
      case 'css':
        return cssErrors;
      case 'json':
        return jsonErrors;
      case 'python':
        return pythonErrors;
      case 'php':
        return phpErrors;
      case 'sql':
        return sqlErrors;
      default:
        return jsErrors;
    }
  };

  const findLineNumber = (code: string, match: RegExpMatchArray): number => {
    const index = match.index || 0;
    const lines = code.substring(0, index).split('\n');
    return lines.length;
  };

  const analyzeCode = () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    setShowFixed(false);
    setErrors([]);

    setTimeout(() => {
      const patterns = getErrorPatterns();
      const foundErrors: CodeError[] = [];
      let errorId = 0;

      // Check for syntax errors first (basic validation)
      if (language === 'json') {
        try {
          JSON.parse(code);
        } catch (e) {
          const error = e as SyntaxError;
          foundErrors.push({
            id: `err-${errorId++}`,
            line: 1,
            type: 'error',
            message: `JSON Syntax Error: ${error.message}`,
            code: code.substring(0, 50),
          });
        }
      }

      // Check patterns
      patterns.forEach((pattern) => {
        const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags);
        let match;

        while ((match = regex.exec(code)) !== null) {
          const lineNum = findLineNumber(code, match);
          
          // Avoid duplicate errors on same line with same message
          const isDuplicate = foundErrors.some(
            (e) => e.line === lineNum && e.message === pattern.message
          );

          if (!isDuplicate) {
            foundErrors.push({
              id: `err-${errorId++}`,
              line: lineNum,
              type: pattern.type,
              message: pattern.message,
              code: match[0].substring(0, 50),
              fix: pattern.fix ? 'available' : undefined,
              fixDescription: pattern.fixDesc || undefined,
            });
          }
        }
      });

      // Sort by line number
      foundErrors.sort((a, b) => a.line - b.line);

      setErrors(foundErrors);
      setIsAnalyzing(false);
    }, 500);
  };

  const fixAllErrors = () => {
    const patterns = getErrorPatterns();
    let fixed = code;

    patterns.forEach((pattern) => {
      if (pattern.fix) {
        fixed = pattern.fix(fixed);
      }
    });

    // Additional cleanup
    fixed = fixed
      .replace(/\n{3,}/g, '\n\n') // Remove multiple empty lines
      .replace(/\s+$/gm, '') // Remove trailing whitespace
      .trim();

    setFixedCode(fixed);
    setShowFixed(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyFix = () => {
    setCode(fixedCode);
    setShowFixed(false);
    setErrors([]);
  };

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '•';
    }
  };

  const getErrorColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  const errorCount = errors.filter((e) => e.type === 'error').length;
  const warningCount = errors.filter((e) => e.type === 'warning').length;
  const infoCount = errors.filter((e) => e.type === 'info').length;
  const fixableCount = errors.filter((e) => e.fix).length;

  const sampleCodes: Record<string, string> = {
    javascript: `// Sample JavaScript with errors
var name = "John";
console.log("Hello " + name);

if (name == "John") {
  alert("Welcome!");
}

var arr = new Array();
debugger;

function greet(name) {
  return "Hello, " + name;;
}`,
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Sample Page</title>
</head>
<body>
  <img src="image.jpg">
  <a>Click here</a>
  <font color="red">Old tag</font>
  <center>Centered text</center>
  <br>
  <b>Bold text</b>
  <div onclick="handleClick()">Clickable</div>
</body>
</html>`,
    css: `/* Sample CSS with issues */
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 100px;
  z-index: 99999;
  float: left;;
}

.box {
  color: #ff0000 !important;
  -webkit-transform: rotate(45deg);
}

.empty-rule { }`,
    json: `{
  'name': "John",
  "age": 30,
  "city": undefined,
  "hobbies": ["reading", "coding",],
  // This is a comment
  "active": true
}`,
    python: `# Sample Python with issues
from os import *

def check_value(x):
    if x == True:
        print "Hello"
    
    if x == None:
        return False
    
    # TODO: Fix this later
    except:
        pass`,
    php: `<?
// Sample PHP with issues
$name = $_GET['name'];
echo $name;

mysql_query("SELECT * FROM users");

if ($name == "admin") {
    die("Access denied");
}

error_reporting(0);
?>`,
    sql: `-- Sample SQL with issues
SELECT * FROM users;

DELETE FROM logs;

UPDATE users SET status = 'active';

SELECT * FROM products WHERE name LIKE '%search';

DROP TABLE temp_data;`,
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            🔧 Code Error Finder
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            আপনার code এর সমস্যা খুঁজে বের করুন এবং এক click এ fix করুন
          </p>
        </div>
      </div>

      {/* Language Selection */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Programming Language নির্বাচন করুন:
        </h3>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => {
                setLanguage(lang.id);
                setErrors([]);
                setShowFixed(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                language === lang.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{lang.icon}</span>
              <span className="hidden sm:inline">{lang.name}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Code Input */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            আপনার Code এখানে পেস্ট করুন:
          </h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setCode(sampleCodes[language] || sampleCodes.javascript);
              setErrors([]);
              setShowFixed(false);
            }}
          >
            📝 Sample Code
          </Button>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-100 dark:bg-gray-700 rounded-l-lg flex flex-col items-center pt-3 text-xs text-gray-400 overflow-hidden">
            {code.split('\n').map((_, i) => (
              <div key={i} className="h-5 leading-5">
                {i + 1}
              </div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setErrors([]);
              setShowFixed(false);
            }}
            placeholder={`আপনার ${languages.find((l) => l.id === language)?.name} code এখানে paste করুন...`}
            className="w-full h-64 sm:h-80 pl-12 pr-4 py-3 font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none leading-5"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={analyzeCode}
            disabled={!code.trim() || isAnalyzing}
            className="flex-1"
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin mr-2">⚙️</span>
                Analyzing...
              </>
            ) : (
              <>
                🔍 Find Errors
              </>
            )}
          </Button>

          {errors.length > 0 && fixableCount > 0 && (
            <Button
            onClick={fixAllErrors}
            variant="secondary"
            className="flex-1 border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
          >
              ✨ Fix All ({fixableCount} fixable)
            </Button>
          )}
        </div>
      </Card>

      {/* Results Summary */}
      {errors.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="p-3 text-center bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {errorCount}
            </div>
            <div className="text-xs text-red-600 dark:text-red-400">Errors</div>
          </Card>
          <Card className="p-3 text-center bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {warningCount}
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400">Warnings</div>
          </Card>
          <Card className="p-3 text-center bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {infoCount}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Info</div>
          </Card>
          <Card className="p-3 text-center bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {fixableCount}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">Fixable</div>
          </Card>
        </div>
      )}

      {/* Error List */}
      {errors.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            🔍 Found Issues ({errors.length})
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {errors.map((error) => (
              <div
                key={error.id}
                className={`p-3 rounded-lg border ${getErrorColor(error.type)}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg">{getErrorIcon(error.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        Line {error.line}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${
                          error.type === 'error'
                            ? 'bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300'
                            : error.type === 'warning'
                            ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300'
                            : 'bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                        }`}
                      >
                        {error.type.toUpperCase()}
                      </span>
                      {error.fix && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300">
                          ✅ Auto-fixable
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {error.message}
                    </p>
                    {error.code && (
                      <code className="block mt-1 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-400 font-mono truncate">
                        {error.code}
                      </code>
                    )}
                    {error.fixDescription && (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        💡 Fix: {error.fixDescription}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Fixed Code */}
      {showFixed && fixedCode && (
        <Card className="p-4 border-2 border-green-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
              ✅ Fixed Code
            </h3>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => copyToClipboard(fixedCode)}
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </Button>
              <Button size="sm" onClick={applyFix}>
                ✨ Apply Fix
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-green-50 dark:bg-green-900/20 rounded-l-lg flex flex-col items-center pt-3 text-xs text-green-400 overflow-hidden">
              {fixedCode.split('\n').map((_, i) => (
                <div key={i} className="h-5 leading-5">
                  {i + 1}
                </div>
              ))}
            </div>
            <pre className="w-full max-h-64 overflow-auto pl-12 pr-4 py-3 font-mono text-sm bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg leading-5">
              <code>{fixedCode}</code>
            </pre>
          </div>
        </Card>
      )}

      {/* No Errors Found */}
      {code && errors.length === 0 && !isAnalyzing && (
        <Card className="p-8 text-center bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
            কোনো সমস্যা পাওয়া যায়নি!
          </h3>
          <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-1">
            আপনার code দেখতে ভালো আছে। তবে এটা শুধু common patterns check করে।
          </p>
        </Card>
      )}

      {/* Tips */}
      <Card className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          💡 Code Error Finder Tips
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            <span>সঠিক programming language নির্বাচন করুন</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            <span>❌ Errors গুলো অবশ্যই fix করা উচিত</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            <span>⚠️ Warnings গুলো best practices</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            <span>ℹ️ Info গুলো suggestions মাত্র</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            <span>"Fix All" button শুধু fixable issues ঠিক করে</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-indigo-500">•</span>
            <span>Fix apply করার আগে review করে নিন</span>
          </div>
        </div>
      </Card>

      {/* What This Tool Checks */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          🔧 এই Tool যা Check করে:
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
              🟨 JavaScript/TS
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• var vs let/const</li>
              <li>• == vs ===</li>
              <li>• console.log</li>
              <li>• debugger statements</li>
              <li>• eval() usage</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
              🟧 HTML
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Missing alt attributes</li>
              <li>• Deprecated tags</li>
              <li>• Inline styles</li>
              <li>• Accessibility issues</li>
              <li>• Semantic HTML</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
              🟦 CSS
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• !important overuse</li>
              <li>• High z-index</li>
              <li>• Vendor prefixes</li>
              <li>• Empty rules</li>
              <li>• Universal selector</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">
              📋 JSON
            </h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Trailing commas</li>
              <li>• Comments</li>
              <li>• Single quotes</li>
              <li>• undefined/NaN</li>
              <li>• Syntax errors</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
