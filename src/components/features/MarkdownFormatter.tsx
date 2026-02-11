import { useState } from 'react';
import { FileText, Copy, Check, Download, Eye, Code } from 'lucide-react';

export default function MarkdownFormatter() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');

  const parseMarkdown = (md: string): string => {
    let html = md;

    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-800 dark:text-white mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-800 dark:text-white mt-6 mb-4">$1</h1>');

    // Bold and Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\_\_\_(.*?)\_\_\_/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>');
    html = html.replace(/\_(.*?)\_/g, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>');
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-sm">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-blue-500 hover:underline" target="_blank">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-lg my-4" />');

    // Blockquotes
    html = html.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-4 text-gray-600 dark:text-gray-400 italic">$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr class="my-6 border-gray-200 dark:border-gray-700" />');
    html = html.replace(/^\*\*\*$/gm, '<hr class="my-6 border-gray-200 dark:border-gray-700" />');

    // Unordered lists
    html = html.replace(/^[\*\-] (.*$)/gm, '<li class="ml-4">$1</li>');
    
    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="my-3 text-gray-700 dark:text-gray-300">');

    // Line breaks
    html = html.replace(/\n/g, '<br />');

    // Wrap in paragraph
    html = '<p class="my-3 text-gray-700 dark:text-gray-300">' + html + '</p>';

    return html;
  };

  const beautifyMarkdown = () => {
    let beautified = input;

    // Ensure proper spacing around headers
    beautified = beautified.replace(/^(#+)/gm, '\n$1');
    beautified = beautified.replace(/^(#+.*$)/gm, '$1\n');

    // Ensure blank lines around code blocks
    beautified = beautified.replace(/(```[\s\S]*?```)/g, '\n$1\n');

    // Ensure blank lines around lists
    beautified = beautified.replace(/^([\*\-\d].*$)/gm, '$1');

    // Remove multiple blank lines
    beautified = beautified.replace(/\n{3,}/g, '\n\n');

    // Trim
    beautified = beautified.trim();

    setInput(beautified);
  };

  const getHtml = () => {
    return parseMarkdown(input);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([input], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(`# SEO Buddy Documentation

## Introduction

Welcome to **SEO Buddy** - your complete SEO toolkit! This tool helps you:

- Analyze website SEO
- Generate keywords
- Create meta tags
- And much more...

## Getting Started

### Step 1: Enter Your URL

Simply paste your website URL in the SEO Checker and click **Analyze**.

### Step 2: Review Results

You'll get a detailed report including:

1. Meta tag analysis
2. Content optimization
3. Technical SEO issues
4. Mobile friendliness

## Code Example

\`\`\`javascript
const seoScore = analyzeSEO(url);
console.log('SEO Score:', seoScore);
\`\`\`

## Important Notes

> Always use \`canonical\` tags to avoid duplicate content issues.

---

*Made with ❤️ by [OSPranto Tech](https://github.com/OSPrantoTech)*`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Markdown Formatter</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Format and preview Markdown</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center">
          <button onClick={beautifyMarkdown} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            ✨ Beautify
          </button>
          <button onClick={loadSample} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            📋 Sample
          </button>
          <button onClick={downloadMarkdown} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            📥 Download
          </button>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'preview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Eye className="w-4 h-4" /> Preview
            </button>
            <button
              onClick={() => setViewMode('html')}
              className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                viewMode === 'html'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Code className="w-4 h-4" /> HTML
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">📝 Markdown</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Write your markdown here..."
            className="w-full h-96 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {viewMode === 'preview' ? '👁️ Preview' : '🔧 HTML'}
            </span>
            <button
              onClick={() => copyToClipboard(viewMode === 'html' ? getHtml() : input)}
              className="p-1 text-gray-400 hover:text-blue-500"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          {viewMode === 'preview' ? (
            <div
              className="w-full h-96 p-4 overflow-auto prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(input) }}
            />
          ) : (
            <pre className="w-full h-96 p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto">
              {getHtml() || <span className="text-gray-400">HTML will appear here...</span>}
            </pre>
          )}
        </div>
      </div>

      {/* Cheat Sheet */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-white mb-4">📖 Markdown Cheat Sheet</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <code className="text-blue-500"># Heading 1</code>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Main heading</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <code className="text-blue-500">**bold**</code>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Bold text</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <code className="text-blue-500">*italic*</code>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Italic text</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <code className="text-blue-500">[link](url)</code>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Hyperlink</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <code className="text-blue-500">- list item</code>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Bullet list</p>
          </div>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <code className="text-blue-500">`code`</code>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Inline code</p>
          </div>
        </div>
      </div>
    </div>
  );
}
