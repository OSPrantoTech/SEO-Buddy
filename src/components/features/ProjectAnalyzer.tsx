/**
 * ============================================
 * PROJECT ANALYZER COMPONENT
 * ============================================
 * Upload folder to analyze entire project for errors
 * and get auto-fix suggestions.
 * 
 * Created by Obaida Siddque Pranto (OSPranto Tech)
 */

import { useState, useRef } from 'react';
import { 
  FolderArchive, Upload, FileCode, AlertCircle, CheckCircle, 
  AlertTriangle, Info, ChevronDown, ChevronRight, Download,
  RefreshCw, File, Folder, Bug, Wrench, Eye, Copy, Check, X
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

// Types
interface FileIssue {
  line: number;
  type: 'error' | 'warning' | 'info';
  message: string;
  code: string;
  fix?: string;
  fixDescription?: string;
}

interface AnalyzedFile {
  name: string;
  path: string;
  content: string;
  fixedContent?: string;
  language: string;
  issues: FileIssue[];
  size: number;
  lines: number;
}

interface ProjectStats {
  totalFiles: number;
  totalLines: number;
  totalErrors: number;
  totalWarnings: number;
  totalInfo: number;
  fixableIssues: number;
  fileTypes: Record<string, number>;
}

// Language detection
const getLanguage = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  const langMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'css',
    'json': 'json',
    'py': 'python',
    'php': 'php',
    'md': 'markdown',
  };
  return langMap[ext] || 'unknown';
};

// Analyze file content for issues
const analyzeFileContent = (content: string, language: string): FileIssue[] => {
  const issues: FileIssue[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // JavaScript/TypeScript checks
    if (language === 'javascript' || language === 'typescript') {
      if (/\bvar\s+\w+/.test(line)) {
        issues.push({
          line: lineNum,
          type: 'warning',
          message: "'var' ব্যবহার করা হয়েছে। 'let' বা 'const' ব্যবহার করুন।",
          code: line.trim(),
          fix: line.replace(/\bvar\s+/g, 'const '),
          fixDescription: "'var' কে 'const' দিয়ে replace করুন"
        });
      }

      if (/[^=!]==[^=]/.test(line) && !line.includes('===')) {
        issues.push({
          line: lineNum,
          type: 'warning',
          message: "'==' ব্যবহার করা হয়েছে। '===' ব্যবহার করুন।",
          code: line.trim(),
          fix: line.replace(/([^=!])={2}([^=])/g, '$1===$2'),
          fixDescription: "'==' কে '===' দিয়ে replace করুন"
        });
      }

      if (/console\.(log|warn|error|info|debug)/.test(line)) {
        issues.push({
          line: lineNum,
          type: 'info',
          message: "console statement পাওয়া গেছে। Production এ remove করুন।",
          code: line.trim(),
          fix: '// ' + line.trim(),
          fixDescription: "console statement comment করুন"
        });
      }

      if (/\bdebugger\b/.test(line)) {
        issues.push({
          line: lineNum,
          type: 'error',
          message: "'debugger' statement পাওয়া গেছে। Remove করুন।",
          code: line.trim(),
          fix: '',
          fixDescription: "debugger statement remove করুন"
        });
      }

      if (/\beval\s*\(/.test(line)) {
        issues.push({
          line: lineNum,
          type: 'error',
          message: "'eval()' ব্যবহার নিরাপদ নয়।",
          code: line.trim()
        });
      }

      if (language === 'typescript' && /:\s*any\b/.test(line)) {
        issues.push({
          line: lineNum,
          type: 'warning',
          message: "'any' type ব্যবহার এড়িয়ে চলুন।",
          code: line.trim()
        });
      }
    }

    // HTML checks
    if (language === 'html') {
      if (/<img[^>]+(?!alt=)[^>]*>/i.test(line) && !line.includes('alt=')) {
        issues.push({
          line: lineNum,
          type: 'error',
          message: "Image এ 'alt' attribute নেই।",
          code: line.trim(),
          fix: line.replace(/<img/i, '<img alt=""'),
          fixDescription: "alt attribute যোগ করুন"
        });
      }

      const deprecatedTags = ['font', 'center', 'marquee'];
      deprecatedTags.forEach(tag => {
        if (new RegExp(`<${tag}[^>]*>`, 'i').test(line)) {
          issues.push({
            line: lineNum,
            type: 'warning',
            message: `'<${tag}>' deprecated।`,
            code: line.trim()
          });
        }
      });
    }

    // CSS checks
    if (language === 'css') {
      if (/!important/i.test(line)) {
        issues.push({
          line: lineNum,
          type: 'warning',
          message: "'!important' অতিরিক্ত ব্যবহার এড়িয়ে চলুন।",
          code: line.trim(),
          fix: line.replace(/\s*!important/gi, ''),
          fixDescription: "!important remove করুন"
        });
      }
    }

    // JSON checks
    if (language === 'json') {
      if (/,\s*[}\]]/.test(line)) {
        issues.push({
          line: lineNum,
          type: 'error',
          message: "JSON এ trailing comma অনুমতি নেই।",
          code: line.trim(),
          fix: line.replace(/,(\s*[}\]])/g, '$1'),
          fixDescription: "trailing comma remove করুন"
        });
      }
    }

    // Python checks
    if (language === 'python') {
      if (/^(\s*)print\s+[^(]/.test(line)) {
        issues.push({
          line: lineNum,
          type: 'error',
          message: "Python 2 style print। print() ব্যবহার করুন।",
          code: line.trim(),
          fix: line.replace(/print\s+(.+)/, 'print($1)'),
          fixDescription: "print() function ব্যবহার করুন"
        });
      }
    }

    // Common checks
    if (/\s+$/.test(line) && line.trim().length > 0) {
      issues.push({
        line: lineNum,
        type: 'info',
        message: "Trailing whitespace আছে।",
        code: line,
        fix: line.trimEnd(),
        fixDescription: "trailing whitespace remove করুন"
      });
    }
  });

  return issues;
};

// Apply fixes
const applyFixes = (content: string, issues: FileIssue[]): string => {
  const lines = content.split('\n');
  const sortedIssues = [...issues].filter(i => i.fix !== undefined).sort((a, b) => b.line - a.line);
  
  sortedIssues.forEach(issue => {
    if (issue.fix !== undefined && issue.line > 0 && issue.line <= lines.length) {
      lines[issue.line - 1] = issue.fix;
    }
  });
  
  return lines.filter(line => line !== '').join('\n');
};

export function ProjectAnalyzer() {
  const [files, setFiles] = useState<AnalyzedFile[]>([]);
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<AnalyzedFile | null>(null);
  const [showFixedCode, setShowFixedCode] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // Process uploaded files
  const processFiles = async (fileList: FileList | File[]) => {
    setIsLoading(true);
    const analyzedFiles: AnalyzedFile[] = [];
    const fileArray = Array.from(fileList);

    for (const file of fileArray) {
      if (file.name.includes('node_modules') || 
          file.name.includes('.git') ||
          file.name.endsWith('.png') ||
          file.name.endsWith('.jpg') ||
          file.name.endsWith('.gif') ||
          file.name.endsWith('.ico')) {
        continue;
      }

      const language = getLanguage(file.name);
      if (language === 'unknown') continue;

      try {
        const content = await file.text();
        const issues = analyzeFileContent(content, language);
        const fixedContent = applyFixes(content, issues);

        analyzedFiles.push({
          name: file.name,
          path: (file as File & { webkitRelativePath?: string }).webkitRelativePath || file.name,
          content,
          fixedContent,
          language,
          issues,
          size: file.size,
          lines: content.split('\n').length
        });
      } catch {
        console.error('Error reading file:', file.name);
      }
    }

    calculateStats(analyzedFiles);
    setFiles(analyzedFiles);
    setIsLoading(false);
    
    if (analyzedFiles.length > 0) {
      toast.success(`${analyzedFiles.length} files analyzed!`);
    } else {
      toast.error('No valid files found');
    }
  };

  // Calculate stats
  const calculateStats = (analyzedFiles: AnalyzedFile[]) => {
    const fileTypes: Record<string, number> = {};
    let totalErrors = 0, totalWarnings = 0, totalInfo = 0, fixableIssues = 0, totalLines = 0;

    analyzedFiles.forEach(file => {
      fileTypes[file.language] = (fileTypes[file.language] || 0) + 1;
      totalLines += file.lines;
      
      file.issues.forEach(issue => {
        if (issue.type === 'error') totalErrors++;
        if (issue.type === 'warning') totalWarnings++;
        if (issue.type === 'info') totalInfo++;
        if (issue.fix !== undefined) fixableIssues++;
      });
    });

    setStats({ totalFiles: analyzedFiles.length, totalLines, totalErrors, totalWarnings, totalInfo, fixableIssues, fileTypes });
  };

  // Handle folder upload
  const handleFolderUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  // Toggle file expansion
  const toggleFile = (path: string) => {
    const newExpanded = new Set(expandedFiles);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFiles(newExpanded);
  };

  // Fix single file
  const fixFile = (file: AnalyzedFile) => {
    const updatedFiles = files.map(f => {
      if (f.path === file.path) {
        return { ...f, content: f.fixedContent || f.content, issues: f.issues.filter(i => i.fix === undefined) };
      }
      return f;
    });
    setFiles(updatedFiles);
    calculateStats(updatedFiles);
    toast.success(`${file.name} fixed!`);
  };

  // Fix all files
  const fixAllFiles = () => {
    const updatedFiles = files.map(f => ({
      ...f,
      content: f.fixedContent || f.content,
      issues: f.issues.filter(i => i.fix === undefined)
    }));
    setFiles(updatedFiles);
    calculateStats(updatedFiles);
    toast.success('All fixable issues fixed!');
  };

  // Download fixed files
  const downloadFixedFiles = () => {
    files.forEach(file => {
      const blob = new Blob([file.fixedContent || file.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    });
    toast.success('Files downloaded!');
  };

  // Copy code
  const copyCode = (code: string, path: string) => {
    navigator.clipboard.writeText(code);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
    toast.success('Code copied!');
  };

  // Reset
  const reset = () => {
    setFiles([]);
    setStats(null);
    setExpandedFiles(new Set());
    setSelectedFile(null);
    if (folderInputRef.current) folderInputRef.current.value = '';
  };

  // Get issue icon
  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  // Get language color
  const getLangColor = (lang: string) => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      typescript: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      html: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      css: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      json: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      python: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      php: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      markdown: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[lang] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <FolderArchive className="w-8 h-8 text-blue-500" />
            Project Analyzer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            পুরো Project upload করে errors খুঁজুন এবং auto-fix করুন
          </p>
        </div>
        
        {files.length > 0 && (
          <Button variant="secondary" onClick={reset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        )}
      </div>

      {/* Upload Section */}
      {files.length === 0 && (
        <Card className="p-6">
          <div 
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
            onClick={() => folderInputRef.current?.click()}
          >
            <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Project Folder Upload করুন
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Click করে folder select করুন
            </p>
            
            <Button onClick={(e) => { e.stopPropagation(); folderInputRef.current?.click(); }}>
              <Folder className="w-4 h-4 mr-2" />
              Upload Folder
            </Button>

            <input
              ref={folderInputRef}
              type="file"
              /* @ts-expect-error webkitdirectory is not in types */
              webkitdirectory=""
              directory=""
              multiple
              className="hidden"
              onChange={handleFolderUpload}
            />
          </div>

          {/* Supported Files */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">📁 Supported Files:</h4>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'TypeScript', 'HTML', 'CSS', 'JSON', 'Python', 'PHP'].map(lang => (
                <span key={lang} className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-sm text-gray-600 dark:text-gray-300">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Loading */}
      {isLoading && (
        <Card className="p-8 text-center">
          <RefreshCw className="w-12 h-12 mx-auto text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Files analyze করা হচ্ছে...</p>
        </Card>
      )}

      {/* Results */}
      {!isLoading && files.length > 0 && stats && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Card className="p-4 text-center">
              <File className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalFiles}</div>
              <div className="text-xs text-gray-500">Files</div>
            </Card>
            <Card className="p-4 text-center">
              <FileCode className="w-6 h-6 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalLines.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Lines</div>
            </Card>
            <Card className="p-4 text-center">
              <AlertCircle className="w-6 h-6 mx-auto text-red-500 mb-2" />
              <div className="text-2xl font-bold text-red-600">{stats.totalErrors}</div>
              <div className="text-xs text-gray-500">Errors</div>
            </Card>
            <Card className="p-4 text-center">
              <AlertTriangle className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
              <div className="text-2xl font-bold text-yellow-600">{stats.totalWarnings}</div>
              <div className="text-xs text-gray-500">Warnings</div>
            </Card>
            <Card className="p-4 text-center">
              <Info className="w-6 h-6 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold text-blue-600">{stats.totalInfo}</div>
              <div className="text-xs text-gray-500">Info</div>
            </Card>
            <Card className="p-4 text-center">
              <Wrench className="w-6 h-6 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold text-green-600">{stats.fixableIssues}</div>
              <div className="text-xs text-gray-500">Fixable</div>
            </Card>
          </div>

          {/* Actions */}
          {stats.fixableIssues > 0 && (
            <div className="flex flex-wrap gap-3">
              <Button onClick={fixAllFiles}>
                <Wrench className="w-4 h-4 mr-2" />
                Fix All ({stats.fixableIssues})
              </Button>
              <Button variant="secondary" onClick={downloadFixedFiles}>
                <Download className="w-4 h-4 mr-2" />
                Download Fixed Files
              </Button>
            </div>
          )}

          {/* File Types */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📊 File Types</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.fileTypes).map(([lang, count]) => (
                <span key={lang} className={`px-3 py-1 rounded-full text-sm font-medium ${getLangColor(lang)}`}>
                  {lang}: {count}
                </span>
              ))}
            </div>
          </Card>

          {/* Files List */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📁 Files ({files.length})</h3>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {files.map(file => (
                <div key={file.path} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  {/* File Header */}
                  <div 
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => toggleFile(file.path)}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {expandedFiles.has(file.path) ? (
                        <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      )}
                      <FileCode className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <span className="font-medium text-gray-900 dark:text-white truncate text-sm">{file.path}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${getLangColor(file.language)}`}>
                        {file.language}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {file.issues.filter(i => i.type === 'error').length > 0 && (
                        <span className="flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {file.issues.filter(i => i.type === 'error').length}
                        </span>
                      )}
                      {file.issues.filter(i => i.type === 'warning').length > 0 && (
                        <span className="flex items-center gap-1 text-yellow-500 text-xs">
                          <AlertTriangle className="w-3 h-3" />
                          {file.issues.filter(i => i.type === 'warning').length}
                        </span>
                      )}
                      {file.issues.length === 0 && (
                        <span className="flex items-center gap-1 text-green-500 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Clean
                        </span>
                      )}
                    </div>
                  </div>

                  {/* File Issues */}
                  {expandedFiles.has(file.path) && (
                    <div className="p-3 space-y-3 bg-white dark:bg-gray-900">
                      {file.issues.length === 0 ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          কোনো issue নেই!
                        </div>
                      ) : (
                        <>
                          <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                            {file.issues.some(i => i.fix !== undefined) && (
                              <Button size="sm" onClick={() => fixFile(file)}>
                                <Wrench className="w-3 h-3 mr-1" />
                                Fix All
                              </Button>
                            )}
                            <Button size="sm" variant="secondary" onClick={() => { setSelectedFile(file); setShowFixedCode(false); }}>
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="secondary" onClick={() => copyCode(file.fixedContent || file.content, file.path)}>
                              {copiedPath === file.path ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                              Copy
                            </Button>
                          </div>

                          {file.issues.map((issue, idx) => (
                            <div 
                              key={idx} 
                              className={`p-3 rounded-lg border text-sm ${
                                issue.type === 'error' 
                                  ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' 
                                  : issue.type === 'warning'
                                  ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800'
                                  : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {getIssueIcon(issue.type)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-medium text-gray-500">Line {issue.line}</span>
                                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                                      issue.type === 'error' ? 'bg-red-200 text-red-800' :
                                      issue.type === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                                      'bg-blue-200 text-blue-800'
                                    }`}>
                                      {issue.type}
                                    </span>
                                    {issue.fix !== undefined && (
                                      <span className="text-xs px-1.5 py-0.5 rounded bg-green-200 text-green-800">
                                        Auto-fixable
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-gray-800 dark:text-gray-200 mt-1">{issue.message}</p>
                                  <code className="block mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-x-auto">
                                    {issue.code}
                                  </code>
                                  {issue.fix !== undefined && (
                                    <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded">
                                      <div className="text-xs text-green-700 dark:text-green-300 font-medium mb-1">
                                        ✅ Fix: {issue.fixDescription}
                                      </div>
                                      <code className="block p-2 bg-white dark:bg-gray-800 rounded text-xs overflow-x-auto">
                                        {issue.fix || '(remove line)'}
                                      </code>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Code Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FileCode className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">{selectedFile.name}</span>
              </div>
              <button onClick={() => setSelectedFile(null)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex gap-2 p-3 border-b border-gray-200 dark:border-gray-700">
              <Button size="sm" variant={showFixedCode ? 'secondary' : 'primary'} onClick={() => setShowFixedCode(false)}>
                Original
              </Button>
              <Button size="sm" variant={showFixedCode ? 'primary' : 'secondary'} onClick={() => setShowFixedCode(true)}>
                Fixed
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <pre className="text-sm font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                {showFixedCode ? (selectedFile.fixedContent || selectedFile.content) : selectedFile.content}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Bug className="w-5 h-5 text-blue-500" />
          💡 Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• <strong>Folder Upload:</strong> Project folder select করুন</li>
          <li>• <strong>Auto-fix:</strong> Green "Fixable" tag আছে এমন issues auto-fix হবে</li>
          <li>• <strong>View Code:</strong> Original ও Fixed code দেখুন</li>
          <li>• <strong>node_modules:</strong> স্বয়ংক্রিয়ভাবে skip হয়</li>
        </ul>
      </Card>
    </div>
  );
}

export default ProjectAnalyzer;
