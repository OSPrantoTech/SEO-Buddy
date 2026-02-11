import { useState } from 'react';
import { 
  Bug, Wand2, AlertTriangle, CheckCircle, Copy, Check, 
  Code, FileCode, Shield, Gauge, RefreshCw, Lightbulb,
  MessageSquare, ArrowRight, Sparkles, Search, Wrench
} from 'lucide-react';

type TabType = 'bug-fixer' | 'code-reviewer' | 'error-solver' | 'code-explainer' | 'refactorer' | 'security-checker';

interface FixedIssue {
  type: 'bug' | 'warning' | 'improvement' | 'security';
  line?: number;
  original: string;
  fixed: string;
  explanation: string;
}

interface ReviewItem {
  category: string;
  severity: 'high' | 'medium' | 'low';
  issue: string;
  suggestion: string;
  line?: number;
}

export default function AIDebugSuite() {
  const [activeTab, setActiveTab] = useState<TabType>('bug-fixer');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    fixedCode?: string;
    issues?: FixedIssue[];
    reviews?: ReviewItem[];
    explanation?: string;
    solution?: string;
    refactoredCode?: string;
    securityIssues?: ReviewItem[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'bug-fixer' as TabType, label: 'Bug Fixer', icon: Bug, color: 'text-red-500' },
    { id: 'code-reviewer' as TabType, label: 'Code Reviewer', icon: Search, color: 'text-blue-500' },
    { id: 'error-solver' as TabType, label: 'Error Solver', icon: AlertTriangle, color: 'text-yellow-500' },
    { id: 'code-explainer' as TabType, label: 'Code Explainer', icon: Lightbulb, color: 'text-purple-500' },
    { id: 'refactorer' as TabType, label: 'Refactorer', icon: RefreshCw, color: 'text-green-500' },
    { id: 'security-checker' as TabType, label: 'Security Check', icon: Shield, color: 'text-orange-500' },
  ];

  const languages = [
    'javascript', 'typescript', 'python', 'java', 'php', 'html', 'css', 'sql', 'react', 'nodejs'
  ];

  // AI Bug Detection and Fixing
  const detectAndFixBugs = (code: string, lang: string): { fixedCode: string; issues: FixedIssue[] } => {
    let fixedCode = code;
    const issues: FixedIssue[] = [];

    if (lang === 'javascript' || lang === 'typescript' || lang === 'react' || lang === 'nodejs') {
      // Fix: var to const/let
      if (/\bvar\s+/.test(fixedCode)) {
        const match = fixedCode.match(/\bvar\s+(\w+)\s*=/);
        if (match) {
          issues.push({
            type: 'bug',
            original: `var ${match[1]}`,
            fixed: `const ${match[1]}`,
            explanation: "'var' has function scope and can cause unexpected behavior. Use 'const' for values that don\'t change, or 'let' for values that do."
          });
          fixedCode = fixedCode.replace(/\bvar\s+/g, 'const ');
        }
      }

      // Fix: == to ===
      if (/[^=!<>]==[^=]/.test(fixedCode)) {
        issues.push({
          type: 'bug',
          original: '==',
          fixed: '===',
          explanation: "'==' performs type coercion which can lead to unexpected results. Use '===' for strict equality checking."
        });
        fixedCode = fixedCode.replace(/([^=!<>])={2}([^=])/g, '$1===$2');
      }

      // Fix: != to !==
      if (/!=[^=]/.test(fixedCode)) {
        issues.push({
          type: 'bug',
          original: '!=',
          fixed: '!==',
          explanation: "'!=' performs type coercion. Use '!==' for strict inequality checking."
        });
        fixedCode = fixedCode.replace(/!={1}([^=])/g, '!==$1');
      }

      // Fix: Missing semicolons
      const lines = fixedCode.split('\n');
      const fixedLines = lines.map((line, idx) => {
        const trimmed = line.trim();
        if (trimmed && 
            !trimmed.endsWith(';') && 
            !trimmed.endsWith('{') && 
            !trimmed.endsWith('}') &&
            !trimmed.endsWith(',') &&
            !trimmed.startsWith('//') &&
            !trimmed.startsWith('/*') &&
            !trimmed.startsWith('*') &&
            !trimmed.startsWith('if') &&
            !trimmed.startsWith('else') &&
            !trimmed.startsWith('for') &&
            !trimmed.startsWith('while') &&
            !trimmed.startsWith('function') &&
            !trimmed.startsWith('class') &&
            !trimmed.startsWith('import') &&
            !trimmed.startsWith('export') &&
            /^(const|let|var|return|throw|break|continue|\w+\s*=|\w+\.\w+\(|\w+\()/.test(trimmed)) {
          issues.push({
            type: 'warning',
            line: idx + 1,
            original: trimmed,
            fixed: trimmed + ';',
            explanation: `Missing semicolon at line ${idx + 1}. While optional in JavaScript, semicolons prevent potential issues.`
          });
          return line + ';';
        }
        return line;
      });
      fixedCode = fixedLines.join('\n');

      // Fix: console.log (mark as warning)
      if (/console\.(log|warn|error|info)/.test(fixedCode)) {
        issues.push({
          type: 'warning',
          original: 'console.log(...)',
          fixed: '// console.log(...)',
          explanation: 'Console statements should be removed in production code. They can expose sensitive information and slow down the application.'
        });
      }

      // Fix: Empty catch blocks
      if (/catch\s*\([^)]*\)\s*\{\s*\}/.test(fixedCode)) {
        issues.push({
          type: 'bug',
          original: 'catch(e) {}',
          fixed: 'catch(e) { console.error(e); }',
          explanation: 'Empty catch blocks silently swallow errors, making debugging difficult. At minimum, log the error.'
        });
        fixedCode = fixedCode.replace(/catch\s*\(([^)]*)\)\s*\{\s*\}/g, 'catch($1) { console.error($1); }');
      }

      // Fix: Undefined checks
      if (/if\s*\(\s*(\w+)\s*\)/.test(fixedCode) && !/if\s*\(\s*typeof/.test(fixedCode)) {
        const match = fixedCode.match(/if\s*\(\s*(\w+)\s*\)/);
        if (match && !['true', 'false'].includes(match[1])) {
          issues.push({
            type: 'improvement',
            original: `if (${match[1]})`,
            fixed: `if (${match[1]} !== undefined && ${match[1]} !== null)`,
            explanation: 'Explicit null/undefined checks are safer than truthy checks, as they won\'t falsely match 0, empty strings, or false.'
          });
        }
      }

      // Fix: Array methods without return
      if (/\.map\s*\([^)]*=>\s*\{[^}]*[^r][^e][^t][^u][^r][^n]/.test(fixedCode)) {
        issues.push({
          type: 'bug',
          original: '.map(() => { ... })',
          fixed: '.map(() => { return ...; })',
          explanation: 'Array.map() expects a return value. Without return, the new array will be filled with undefined values.'
        });
      }

      // Fix: Async without await
      if (/async\s+function|\async\s+\(/.test(fixedCode) && !/await\s+/.test(fixedCode)) {
        issues.push({
          type: 'warning',
          original: 'async function without await',
          fixed: 'Consider adding await or removing async',
          explanation: 'An async function without await is unnecessary and may indicate missing asynchronous operations.'
        });
      }
    }

    if (lang === 'python') {
      // Fix: Python 2 print
      if (/print\s+[^(]/.test(fixedCode)) {
        issues.push({
          type: 'bug',
          original: 'print "text"',
          fixed: 'print("text")',
          explanation: 'Python 2 print syntax is deprecated. Use print() function for Python 3 compatibility.'
        });
        fixedCode = fixedCode.replace(/print\s+(['"][^'"]*['"])/g, 'print($1)');
      }

      // Fix: == True/False
      if (/==\s*(True|False|None)/.test(fixedCode)) {
        issues.push({
          type: 'improvement',
          original: '== True/False/None',
          fixed: 'is True/False/None',
          explanation: 'Use "is" instead of "==" for comparing to True, False, or None for proper identity comparison.'
        });
        fixedCode = fixedCode.replace(/==\s*(True|False|None)/g, 'is $1');
      }

      // Fix: Bare except
      if (/except\s*:/.test(fixedCode)) {
        issues.push({
          type: 'bug',
          original: 'except:',
          fixed: 'except Exception as e:',
          explanation: 'Bare except catches all exceptions including SystemExit and KeyboardInterrupt. Be specific about which exceptions to catch.'
        });
        fixedCode = fixedCode.replace(/except\s*:/g, 'except Exception as e:');
      }
    }

    if (lang === 'html') {
      // Fix: Missing alt attribute
      if (/<img[^>]*(?!alt=)[^>]*>/i.test(fixedCode)) {
        issues.push({
          type: 'bug',
          original: '<img src="...">',
          fixed: '<img src="..." alt="description">',
          explanation: 'Images must have alt attributes for accessibility. Screen readers use alt text to describe images to visually impaired users.'
        });
        fixedCode = fixedCode.replace(/<img([^>]*?)(?!\salt=)(\s*\/?>)/gi, '<img$1 alt=""$2');
      }

      // Fix: Deprecated tags
      const deprecatedTags = ['font', 'center', 'marquee', 'blink'];
      deprecatedTags.forEach(tag => {
        if (new RegExp(`<${tag}[^>]*>`, 'i').test(fixedCode)) {
          issues.push({
            type: 'bug',
            original: `<${tag}>`,
            fixed: 'Use CSS instead',
            explanation: `The <${tag}> tag is deprecated in HTML5. Use CSS for styling instead.`
          });
        }
      });

      // Fix: Inline styles
      if (/style\s*=\s*["'][^"']+["']/i.test(fixedCode)) {
        issues.push({
          type: 'warning',
          original: 'style="..."',
          fixed: 'Use CSS classes',
          explanation: 'Inline styles make maintenance difficult and increase page size. Use CSS classes for better organization.'
        });
      }
    }

    if (lang === 'css') {
      // Fix: !important overuse
      const importantCount = (fixedCode.match(/!important/g) || []).length;
      if (importantCount > 3) {
        issues.push({
          type: 'warning',
          original: '!important (multiple)',
          fixed: 'Refactor CSS specificity',
          explanation: `Found ${importantCount} uses of !important. Overuse indicates specificity issues. Refactor your CSS hierarchy instead.`
        });
      }

      // Fix: High z-index
      const zIndexMatch = fixedCode.match(/z-index\s*:\s*(\d+)/g);
      if (zIndexMatch) {
        zIndexMatch.forEach(match => {
          const value = parseInt(match.replace(/z-index\s*:\s*/, ''));
          if (value > 9999) {
            issues.push({
              type: 'warning',
              original: match,
              fixed: 'Use reasonable z-index values (1-100)',
              explanation: 'Extremely high z-index values indicate stacking context issues. Use a z-index scale system (1, 10, 100, 1000).'
            });
          }
        });
      }
    }

    if (lang === 'sql') {
      // Fix: SELECT *
      if (/SELECT\s+\*/i.test(fixedCode)) {
        issues.push({
          type: 'warning',
          original: 'SELECT *',
          fixed: 'SELECT column1, column2, ...',
          explanation: 'SELECT * retrieves all columns which is inefficient. Specify only the columns you need.'
        });
      }

      // Fix: SQL Injection risk
      if (/WHERE.*=\s*['"]?\$|WHERE.*=\s*['"]?\{/.test(fixedCode)) {
        issues.push({
          type: 'security',
          original: 'Direct variable in SQL',
          fixed: 'Use parameterized queries',
          explanation: 'Direct variable interpolation in SQL is vulnerable to SQL injection attacks. Use prepared statements or parameterized queries.'
        });
      }

      // Fix: DELETE/UPDATE without WHERE
      if (/\b(DELETE|UPDATE)\b(?![\s\S]*\bWHERE\b)/i.test(fixedCode)) {
        issues.push({
          type: 'bug',
          original: 'DELETE/UPDATE without WHERE',
          fixed: 'Add WHERE clause',
          explanation: 'DELETE or UPDATE without WHERE will affect ALL rows in the table. Always include a WHERE clause to target specific records.'
        });
      }
    }

    return { fixedCode, issues };
  };

  // AI Code Review
  const reviewCode = (code: string, lang: string): ReviewItem[] => {
    const reviews: ReviewItem[] = [];

    // Performance checks
    if (lang === 'javascript' || lang === 'typescript' || lang === 'react') {
      if (/for\s*\([^)]*\.length/.test(code)) {
        reviews.push({
          category: 'Performance',
          severity: 'medium',
          issue: 'Accessing .length in loop condition',
          suggestion: 'Cache the length value before the loop: const len = array.length; for(let i = 0; i < len; i++)'
        });
      }

      if (/\.forEach\s*\(/.test(code) && /await\s+/.test(code)) {
        reviews.push({
          category: 'Performance',
          severity: 'high',
          issue: 'Using forEach with async/await',
          suggestion: 'forEach does not wait for async callbacks. Use for...of loop or Promise.all() with .map() instead.'
        });
      }

      if (/document\.querySelector|document\.getElementById/.test(code)) {
        reviews.push({
          category: 'Performance',
          severity: 'low',
          issue: 'Multiple DOM queries',
          suggestion: 'Cache DOM elements in variables if accessed multiple times. DOM queries are expensive operations.'
        });
      }

      if (/new RegExp\(/.test(code)) {
        reviews.push({
          category: 'Performance',
          severity: 'low',
          issue: 'Creating RegExp in potentially hot path',
          suggestion: 'If the regex pattern is constant, use regex literal (/pattern/) instead of new RegExp() for better performance.'
        });
      }
    }

    // Best Practice checks
    if (/TODO|FIXME|HACK|XXX/.test(code)) {
      reviews.push({
        category: 'Best Practice',
        severity: 'low',
        issue: 'TODO/FIXME comments found',
        suggestion: 'Address TODO and FIXME comments before production deployment.'
      });
    }

    if (lang === 'javascript' || lang === 'typescript') {
      if (/function\s+\w+\s*\([^)]{50,}\)/.test(code)) {
        reviews.push({
          category: 'Best Practice',
          severity: 'medium',
          issue: 'Function with too many parameters',
          suggestion: 'Consider using an options object pattern for functions with many parameters.'
        });
      }

      if (code.split('\n').some(line => line.length > 120)) {
        reviews.push({
          category: 'Best Practice',
          severity: 'low',
          issue: 'Lines exceeding 120 characters',
          suggestion: 'Keep lines under 120 characters for better readability.'
        });
      }
    }

    // Maintainability checks
    const lines = code.split('\n');
    if (lines.length > 200) {
      reviews.push({
        category: 'Maintainability',
        severity: 'medium',
        issue: 'File is too long',
        suggestion: `File has ${lines.length} lines. Consider splitting into smaller, focused modules.`
      });
    }

    // Magic numbers check
    const magicNumbers = code.match(/[^0-9.][0-9]{2,}[^0-9.]/g);
    if (magicNumbers && magicNumbers.length > 3) {
      reviews.push({
        category: 'Maintainability',
        severity: 'low',
        issue: 'Magic numbers detected',
        suggestion: 'Replace magic numbers with named constants for better code clarity.'
      });
    }

    // Error handling checks
    if (lang === 'javascript' || lang === 'typescript') {
      if (!/try\s*\{/.test(code) && /fetch\(|axios|\.then\(/.test(code)) {
        reviews.push({
          category: 'Error Handling',
          severity: 'high',
          issue: 'API calls without try-catch',
          suggestion: 'Wrap API calls in try-catch blocks or use .catch() to handle network errors gracefully.'
        });
      }
    }

    return reviews;
  };

  // AI Error Solver
  const solveError = (error: string): string => {
    const solutions: { [key: string]: string } = {
      'undefined is not an object': `
**🔍 Error: "undefined is not an object"**

**কারণ:** আপনি undefined value এর property access করার চেষ্টা করছেন।

**সমাধান:**
1. Optional chaining ব্যবহার করুন: \`object?.property\`
2. Null check করুন: \`if (object) { object.property }\`
3. Default value দিন: \`const value = object?.property || 'default'\`

**উদাহরণ:**
\`\`\`javascript
// ❌ ভুল
const name = user.profile.name;

// ✅ সঠিক
const name = user?.profile?.name || 'Unknown';
\`\`\`
      `,
      'cannot read property': `
**🔍 Error: "Cannot read property of undefined/null"**

**কারণ:** আপনি null বা undefined value এর property পড়ার চেষ্টা করছেন।

**সমাধান:**
1. Variable টি properly initialize করুন
2. Optional chaining (?.) ব্যবহার করুন
3. API response check করুন

**উদাহরণ:**
\`\`\`javascript
// ❌ ভুল
const items = data.results.map(item => item.name);

// ✅ সঠিক
const items = data?.results?.map(item => item?.name) || [];
\`\`\`
      `,
      'is not a function': `
**🔍 Error: "X is not a function"**

**কারণ:** আপনি এমন কিছু call করছেন যেটা function না।

**সমাধান:**
1. Variable টি function কিনা check করুন
2. Import সঠিকভাবে হয়েছে কিনা দেখুন
3. Typo check করুন

**উদাহরণ:**
\`\`\`javascript
// ❌ ভুল
const result = myVar(); // myVar is not a function

// ✅ সঠিক
if (typeof myVar === 'function') {
  const result = myVar();
}
\`\`\`
      `,
      'unexpected token': `
**🔍 Error: "Unexpected token"**

**কারণ:** Syntax error আছে কোডে।

**সমাধান:**
1. Missing brackets/parentheses চেক করুন
2. Semicolons চেক করুন
3. JSON parse করলে valid JSON কিনা দেখুন

**উদাহরণ:**
\`\`\`javascript
// ❌ ভুল
const obj = { name: 'test', } // trailing comma in JSON

// ✅ সঠিক
const obj = { name: 'test' };
\`\`\`
      `,
      'module not found': `
**🔍 Error: "Module not found"**

**কারণ:** Package install নেই বা path ভুল।

**সমাধান:**
1. Package install করুন: \`npm install package-name\`
2. File path check করুন
3. Case-sensitivity check করুন

**উদাহরণ:**
\`\`\`bash
# Package install
npm install lodash

# বা yarn
yarn add lodash
\`\`\`
      `,
      'cors': `
**🔍 Error: "CORS policy" / "Access-Control-Allow-Origin"**

**কারণ:** Backend CORS allow করেনি।

**সমাধান:**
1. Backend এ CORS enable করুন
2. Proxy ব্যবহার করুন
3. Backend developer কে জানান

**Backend Example (Node.js):**
\`\`\`javascript
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));
\`\`\`
      `,
      'syntaxerror': `
**🔍 Error: "SyntaxError"**

**কারণ:** Code এ syntax ভুল আছে।

**সমাধান:**
1. Brackets {} [] () match হচ্ছে কিনা দেখুন
2. Quotes '' "" match হচ্ছে কিনা দেখুন
3. Semicolons ঠিক আছে কিনা দেখুন
4. Keywords ঠিকমত লেখা হয়েছে কিনা দেখুন
      `,
      'typeerror': `
**🔍 Error: "TypeError"**

**কারণ:** Wrong type এর value ব্যবহার করা হয়েছে।

**সমাধান:**
1. Variable type check করুন
2. Type conversion করুন যদি দরকার হয়
3. Optional chaining ব্যবহার করুন
      `,
      'referenceerror': `
**🔍 Error: "ReferenceError"**

**কারণ:** Variable declare করা হয়নি।

**সমাধান:**
1. Variable declare করুন (let, const, var)
2. Spelling check করুন
3. Scope check করুন - variable accessible কিনা
      `,
      'network error': `
**🔍 Error: "Network Error" / "Failed to fetch"**

**কারণ:** API call fail হয়েছে।

**সমাধান:**
1. Internet connection check করুন
2. API URL সঠিক কিনা দেখুন
3. Server running আছে কিনা দেখুন
4. CORS issue কিনা check করুন
      `
    };

    const errorLower = error.toLowerCase();
    for (const [key, solution] of Object.entries(solutions)) {
      if (errorLower.includes(key.toLowerCase())) {
        return solution;
      }
    }

    return `
**🔍 Error Analysis**

আপনার error টি specific database এ পাওয়া যায়নি। নিচের steps follow করুন:

1. **Error message ভালো করে পড়ুন** - কোন line এ error সেটা দেখুন
2. **Google করুন** - Error message copy করে search করুন
3. **Stack Overflow check করুন** - অনেক common errors এর solution আছে
4. **Console log করুন** - Problematic variable গুলো log করে value দেখুন

**Common Debugging Tips:**
- \`console.log()\` ব্যবহার করে step by step check করুন
- Browser DevTools ব্যবহার করুন
- Breakpoints set করে debug করুন
    `;
  };

  // AI Code Explainer
  const explainCode = (code: string, lang: string): string => {
    let explanation = `## 📖 Code Explanation\n\n`;
    
    const lines = code.split('\n').filter(l => l.trim());
    
    if (lang === 'javascript' || lang === 'typescript' || lang === 'react') {
      // Detect patterns
      if (/import\s+/.test(code)) {
        explanation += `### 📦 Imports\nএই code এ external modules/packages import করা হয়েছে।\n\n`;
      }
      
      if (/function\s+\w+|const\s+\w+\s*=\s*\(/.test(code)) {
        explanation += `### ⚙️ Functions\nFunctions define করা হয়েছে যা specific কাজ করে।\n\n`;
      }
      
      if (/useState|useEffect|useContext|useRef/.test(code)) {
        explanation += `### ⚛️ React Hooks\nReact Hooks ব্যবহার করা হয়েছে:\n`;
        if (/useState/.test(code)) explanation += `- \`useState\`: Component state manage করে\n`;
        if (/useEffect/.test(code)) explanation += `- \`useEffect\`: Side effects handle করে (API calls, subscriptions)\n`;
        if (/useContext/.test(code)) explanation += `- \`useContext\`: Context থেকে data access করে\n`;
        if (/useRef/.test(code)) explanation += `- \`useRef\`: DOM reference বা mutable value রাখে\n`;
        explanation += `\n`;
      }
      
      if (/async|await|\.then\(|Promise/.test(code)) {
        explanation += `### ⏳ Asynchronous Code\nAsync/await বা Promises ব্যবহার করা হয়েছে asynchronous operations এর জন্য (যেমন API calls)।\n\n`;
      }
      
      if (/\.map\(|\.filter\(|\.reduce\(|\.forEach\(/.test(code)) {
        explanation += `### 🔄 Array Methods\nArray methods ব্যবহার করা হয়েছে:\n`;
        if (/\.map\(/.test(code)) explanation += `- \`map()\`: প্রতিটি element transform করে নতুন array বানায়\n`;
        if (/\.filter\(/.test(code)) explanation += `- \`filter()\`: Condition অনুযায়ী elements filter করে\n`;
        if (/\.reduce\(/.test(code)) explanation += `- \`reduce()\`: Array কে single value এ reduce করে\n`;
        if (/\.forEach\(/.test(code)) explanation += `- \`forEach()\`: প্রতিটি element এ operation চালায়\n`;
        explanation += `\n`;
      }
      
      if (/try\s*\{|catch\s*\(/.test(code)) {
        explanation += `### 🛡️ Error Handling\ntry-catch ব্যবহার করা হয়েছে errors handle করতে।\n\n`;
      }

      if (/fetch\(|axios/.test(code)) {
        explanation += `### 🌐 API Calls\nHTTP requests করা হয়েছে data fetch করতে।\n\n`;
      }

      if (/export\s+default|export\s+{/.test(code)) {
        explanation += `### 📤 Exports\nModules export করা হয়েছে অন্য files এ ব্যবহারের জন্য।\n\n`;
      }
    }
    
    explanation += `### 📝 Line by Line:\n\n`;
    lines.slice(0, 15).forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('//') && !trimmed.startsWith('/*')) {
        explanation += `**Line ${idx + 1}:** \`${trimmed.slice(0, 60)}${trimmed.length > 60 ? '...' : ''}\`\n`;
        
        // Simple explanations
        if (/^import/.test(trimmed)) {
          explanation += `↳ External module import করছে\n`;
        } else if (/^const|^let|^var/.test(trimmed)) {
          explanation += `↳ Variable declare করছে\n`;
        } else if (/^function|=>/.test(trimmed)) {
          explanation += `↳ Function define করছে\n`;
        } else if (/^return/.test(trimmed)) {
          explanation += `↳ Value return করছে\n`;
        } else if (/^if\s*\(/.test(trimmed)) {
          explanation += `↳ Condition check করছে\n`;
        } else if (/^for\s*\(|^while\s*\(/.test(trimmed)) {
          explanation += `↳ Loop চালাচ্ছে\n`;
        }
        explanation += `\n`;
      }
    });
    
    if (lines.length > 15) {
      explanation += `\n*...এবং আরও ${lines.length - 15} lines আছে*\n`;
    }
    
    return explanation;
  };

  // AI Refactorer
  const refactorCode = (code: string, lang: string): string => {
    let refactored = code;
    
    if (lang === 'javascript' || lang === 'typescript' || lang === 'react') {
      // var to const/let
      refactored = refactored.replace(/\bvar\s+/g, 'const ');
      
      // == to ===
      refactored = refactored.replace(/([^=!<>])={2}([^=])/g, '$1===$2');
      
      // Function to arrow function
      refactored = refactored.replace(
        /function\s+(\w+)\s*\(([^)]*)\)\s*\{/g, 
        'const $1 = ($2) => {'
      );
      
      // String concatenation to template literals
      refactored = refactored.replace(
        /(['"])([^'"]*)\1\s*\+\s*(\w+)\s*\+\s*(['"])([^'"]*)\4/g,
        '`$2${$3}$5`'
      );
      
      // Remove trailing whitespace
      refactored = refactored.split('\n').map(line => line.trimEnd()).join('\n');
      
      // Consistent indentation (2 spaces)
      const lines = refactored.split('\n');
      let indentLevel = 0;
      refactored = lines.map(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        const indented = '  '.repeat(indentLevel) + trimmed;
        if (trimmed.endsWith('{') || trimmed.endsWith('[') || (trimmed.endsWith('(') && !trimmed.includes(')'))) {
          indentLevel++;
        }
        return indented;
      }).join('\n');
    }
    
    return refactored;
  };

  // AI Security Checker
  const checkSecurity = (code: string, lang: string): ReviewItem[] => {
    const issues: ReviewItem[] = [];
    
    // XSS vulnerabilities
    if (/innerHTML\s*=|dangerouslySetInnerHTML|document\.write/.test(code)) {
      issues.push({
        category: 'XSS Vulnerability',
        severity: 'high',
        issue: 'Potential XSS vulnerability detected',
        suggestion: 'Avoid using innerHTML, dangerouslySetInnerHTML, or document.write with user input. Use textContent or sanitize HTML.'
      });
    }
    
    // eval usage
    if (/\beval\s*\(/.test(code)) {
      issues.push({
        category: 'Code Injection',
        severity: 'high',
        issue: 'eval() is dangerous',
        suggestion: 'Never use eval() as it can execute arbitrary code. Use JSON.parse() for JSON or safer alternatives.'
      });
    }
    
    // Hardcoded secrets
    if (/password\s*[:=]\s*['"][^'"]+['"]|api[_-]?key\s*[:=]\s*['"][^'"]+['"]|secret\s*[:=]\s*['"][^'"]+['"]/i.test(code)) {
      issues.push({
        category: 'Exposed Secrets',
        severity: 'high',
        issue: 'Hardcoded credentials detected',
        suggestion: 'Never hardcode passwords, API keys, or secrets. Use environment variables instead.'
      });
    }
    
    // SQL Injection
    if (lang === 'sql' || lang === 'php' || lang === 'nodejs') {
      if (/\$\{.*\}.*(?:SELECT|INSERT|UPDATE|DELETE|WHERE)/i.test(code) || 
          /\+\s*['"]?\s*(?:SELECT|INSERT|UPDATE|DELETE|WHERE)/i.test(code)) {
        issues.push({
          category: 'SQL Injection',
          severity: 'high',
          issue: 'Potential SQL injection vulnerability',
          suggestion: 'Use parameterized queries or prepared statements. Never concatenate user input into SQL queries.'
        });
      }
    }
    
    // Insecure HTTP
    if (/http:\/\/(?!localhost|127\.0\.0\.1)/.test(code)) {
      issues.push({
        category: 'Insecure Connection',
        severity: 'medium',
        issue: 'HTTP used instead of HTTPS',
        suggestion: 'Use HTTPS for all external connections to prevent man-in-the-middle attacks.'
      });
    }
    
    // Console in production
    if (/console\.(log|warn|error|info|debug)/.test(code)) {
      issues.push({
        category: 'Information Leak',
        severity: 'low',
        issue: 'Console statements found',
        suggestion: 'Remove console statements in production as they can expose sensitive information.'
      });
    }
    
    // localStorage sensitive data
    if (/localStorage\.setItem\s*\(\s*['"](?:password|token|secret|key)/i.test(code)) {
      issues.push({
        category: 'Insecure Storage',
        severity: 'high',
        issue: 'Sensitive data in localStorage',
        suggestion: 'Avoid storing sensitive data in localStorage. Use httpOnly cookies or secure session management.'
      });
    }
    
    if (issues.length === 0) {
      issues.push({
        category: 'Security Check',
        severity: 'low',
        issue: 'No major security issues detected',
        suggestion: 'Code appears secure, but always conduct thorough security audits for production code.'
      });
    }
    
    return issues;
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setResult(null);
    
    setTimeout(() => {
      switch (activeTab) {
        case 'bug-fixer':
          const bugResult = detectAndFixBugs(code, language);
          setResult({ fixedCode: bugResult.fixedCode, issues: bugResult.issues });
          break;
        case 'code-reviewer':
          const reviews = reviewCode(code, language);
          setResult({ reviews });
          break;
        case 'error-solver':
          const solution = solveError(errorMessage);
          setResult({ solution });
          break;
        case 'code-explainer':
          const explanation = explainCode(code, language);
          setResult({ explanation });
          break;
        case 'refactorer':
          const refactored = refactorCode(code, language);
          setResult({ refactoredCode: refactored });
          break;
        case 'security-checker':
          const security = checkSecurity(code, language);
          setResult({ securityIssues: security });
          break;
      }
      setIsProcessing(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getIssueTypeIcon = (type: string) => {
    switch (type) {
      case 'bug': return <Bug className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'improvement': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'security': return <Shield className="w-4 h-4 text-orange-500" />;
      default: return <Code className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">AI Debug Suite</h1>
        </div>
        <p className="text-purple-100 text-sm sm:text-base">
          AI-powered tools দিয়ে আপনার code এর bugs খুঁজুন, fix করুন, এবং improve করুন
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setResult(null);
                }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.color}`} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-6">
          {/* Bug Fixer Tab */}
          {activeTab === 'bug-fixer' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                  ))}
                </select>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  🔍 Bugs detect করে automatically fix করে দেয়
                </p>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="আপনার code এখানে paste করুন..."
                className="w-full h-48 sm:h-64 p-4 font-mono text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
              
              <button
                onClick={handleProcess}
                disabled={!code.trim() || isProcessing}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Wand2 className="w-5 h-5" />
                )}
                {isProcessing ? 'Analyzing...' : 'Find & Fix Bugs'}
              </button>

              {result?.issues && (
                <div className="space-y-4 mt-6">
                  {/* Issues Found */}
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      {result.issues.length} Issues Found
                    </h3>
                    
                    {result.issues.length === 0 ? (
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span>কোনো bug পাওয়া যায়নি! 🎉</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {result.issues.map((issue, idx) => (
                          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                            <div className="flex items-start gap-2">
                              {getIssueTypeIcon(issue.type)}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className={`text-xs px-2 py-0.5 rounded ${
                                    issue.type === 'bug' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                    issue.type === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                    issue.type === 'security' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                  }`}>
                                    {issue.type.toUpperCase()}
                                  </span>
                                  {issue.line && (
                                    <span className="text-xs text-gray-500">Line {issue.line}</span>
                                  )}
                                </div>
                                
                                <div className="mt-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="text-red-600 dark:text-red-400 line-through">{issue.original}</span>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                    <span className="text-green-600 dark:text-green-400">{issue.fixed}</span>
                                  </div>
                                </div>
                                
                                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                  💡 {issue.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Fixed Code */}
                  {result.fixedCode && (
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          Fixed Code
                        </h3>
                        <button
                          onClick={() => copyToClipboard(result.fixedCode!)}
                          className="flex items-center gap-1 px-3 py-1 text-sm bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                        {result.fixedCode}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Code Reviewer Tab */}
          {activeTab === 'code-reviewer' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                  ))}
                </select>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  📊 Performance, Best Practices, Maintainability review করে
                </p>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Review করার জন্য code paste করুন..."
                className="w-full h-48 sm:h-64 p-4 font-mono text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
              
              <button
                onClick={handleProcess}
                disabled={!code.trim() || isProcessing}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                {isProcessing ? 'Reviewing...' : 'Review Code'}
              </button>

              {result?.reviews && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-blue-500" />
                    Code Review Results
                  </h3>
                  
                  {result.reviews.length === 0 ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span>Code looks good! No major issues found. 🎉</span>
                    </div>
                  ) : (
                    result.reviews.map((review, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border-l-4 border-l-blue-500">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${getSeverityColor(review.severity)}`}>
                            {review.severity.toUpperCase()}
                          </span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {review.category}
                          </span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-medium">{review.issue}</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          💡 {review.suggestion}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Error Solver Tab */}
          {activeTab === 'error-solver' && (
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                ❌ Error message paste করুন, AI solution দেবে
              </p>
              
              <textarea
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                placeholder="Error message paste করুন... (e.g., 'TypeError: Cannot read property of undefined')"
                className="w-full h-32 sm:h-40 p-4 font-mono text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
              
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Common errors:</span>
                {['undefined is not an object', 'is not a function', 'unexpected token', 'CORS', 'Module not found'].map(err => (
                  <button
                    key={err}
                    onClick={() => setErrorMessage(err)}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    {err}
                  </button>
                ))}
              </div>
              
              <button
                onClick={handleProcess}
                disabled={!errorMessage.trim() || isProcessing}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Wrench className="w-5 h-5" />
                )}
                {isProcessing ? 'Finding Solution...' : 'Solve Error'}
              </button>

              {result?.solution && (
                <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                      {result.solution}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Code Explainer Tab */}
          {activeTab === 'code-explainer' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                  ))}
                </select>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  📖 Code কি করে সেটা সহজ ভাষায় বোঝায়
                </p>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="বুঝতে চান এমন code paste করুন..."
                className="w-full h-48 sm:h-64 p-4 font-mono text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
              
              <button
                onClick={handleProcess}
                disabled={!code.trim() || isProcessing}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Lightbulb className="w-5 h-5" />
                )}
                {isProcessing ? 'Explaining...' : 'Explain Code'}
              </button>

              {result?.explanation && (
                <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
                      {result.explanation}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Refactorer Tab */}
          {activeTab === 'refactorer' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                  ))}
                </select>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  ✨ Code clean এবং modern করে
                </p>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Refactor করার জন্য code paste করুন..."
                className="w-full h-48 sm:h-64 p-4 font-mono text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
              
              <button
                onClick={handleProcess}
                disabled={!code.trim() || isProcessing}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Gauge className="w-5 h-5" />
                )}
                {isProcessing ? 'Refactoring...' : 'Refactor Code'}
              </button>

              {result?.refactoredCode && (
                <div className="mt-6 space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Refactored Code
                      </h3>
                      <button
                        onClick={() => copyToClipboard(result.refactoredCode!)}
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                      {result.refactoredCode}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Security Checker Tab */}
          {activeTab === 'security-checker' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                  ))}
                </select>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  🛡️ Security vulnerabilities check করে
                </p>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Security check করার জন্য code paste করুন..."
                className="w-full h-48 sm:h-64 p-4 font-mono text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
              />
              
              <button
                onClick={handleProcess}
                disabled={!code.trim() || isProcessing}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <Shield className="w-5 h-5" />
                )}
                {isProcessing ? 'Scanning...' : 'Check Security'}
              </button>

              {result?.securityIssues && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-orange-500" />
                    Security Scan Results
                  </h3>
                  
                  {result.securityIssues.map((issue, idx) => (
                    <div key={idx} className={`rounded-lg p-4 border-l-4 ${
                      issue.severity === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-l-red-500' :
                      issue.severity === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-l-yellow-500' :
                      'bg-blue-50 dark:bg-blue-900/20 border-l-blue-500'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity.toUpperCase()}
                        </span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {issue.category}
                        </span>
                      </div>
                      <p className="text-gray-900 dark:text-white font-medium">{issue.issue}</p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        🔧 {issue.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-500" />
          💡 AI Debug Tips
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-600 dark:text-gray-400">Bug Fixer: Syntax এবং logic bugs auto-fix করে</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-600 dark:text-gray-400">Code Reviewer: Performance এবং best practices check করে</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-600 dark:text-gray-400">Error Solver: Error message এর solution দেয়</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-600 dark:text-gray-400">Code Explainer: Code সহজ ভাষায় বোঝায়</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-600 dark:text-gray-400">Refactorer: Code clean এবং modern করে</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-gray-600 dark:text-gray-400">Security Check: Vulnerabilities detect করে</span>
          </div>
        </div>
      </div>
    </div>
  );
}
