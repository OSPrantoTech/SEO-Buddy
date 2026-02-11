import { useState } from 'react';
import { FileCode, Copy, Check, Download, Trash2 } from 'lucide-react';

export default function XmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatXml = (xml: string, indent: number): string => {
    const PADDING = ' '.repeat(indent);
    let formatted = '';
    let pad = 0;
    
    // Remove extra whitespace between tags
    xml = xml.replace(/>\s*</g, '><').trim();
    
    // Split on tags
    const nodes = xml.split(/(?=<)|(?<=>)/);
    
    nodes.forEach(node => {
      if (!node.trim()) return;
      
      // Decrease padding for closing tags
      if (node.match(/^<\//)) {
        pad -= 1;
      }
      
      // Add formatted line
      formatted += PADDING.repeat(Math.max(0, pad)) + node.trim() + '\n';
      
      // Increase padding for opening tags (not self-closing)
      if (node.match(/^<[^\/!?]/) && !node.match(/\/>$/)) {
        pad += 1;
      }
    });
    
    return formatted.trim();
  };

  const handleFormat = () => {
    try {
      // Basic XML validation
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, 'text/xml');
      const parseError = doc.querySelector('parsererror');
      
      if (parseError) {
        setError('Invalid XML: ' + parseError.textContent?.slice(0, 100));
        setOutput('');
        return;
      }

      const formatted = formatXml(input, indentSize);
      setOutput(formatted);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const minifyXml = () => {
    try {
      const minified = input.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
      setOutput(minified);
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadXml = () => {
    const blob = new Blob([output], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://seobuddy.com/</loc><lastmod>2024-01-15</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url><url><loc>https://seobuddy.com/tools</loc><lastmod>2024-01-14</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url><url><loc>https://seobuddy.com/about</loc><lastmod>2024-01-10</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url></urlset>`);
    setOutput('');
    setError('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
            <FileCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">XML Formatter</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Format and beautify XML</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center">
          <button onClick={handleFormat} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            ✨ Format
          </button>
          <button onClick={minifyXml} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
            🗜️ Minify
          </button>
          <button onClick={loadSample} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            📋 Sample
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-600 dark:text-gray-400">Indent:</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          ❌ {error}
        </div>
      )}

      {/* Editor */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">📥 Input XML</span>
            <button
              onClick={() => { setInput(''); setOutput(''); setError(''); }}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your XML here..."
            className="w-full h-80 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">📤 Formatted XML</span>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="p-1 text-gray-400 hover:text-blue-500">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button onClick={downloadXml} className="p-1 text-gray-400 hover:text-green-500">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <pre className="w-full h-80 p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto">
            {output || <span className="text-gray-400">Formatted XML will appear here...</span>}
          </pre>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
        <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">💡 SEO তে XML এর ব্যবহার</h3>
        <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-1">
          <li>• <strong>Sitemap.xml:</strong> Search engines কে আপনার pages এর list দেয়</li>
          <li>• <strong>RSS Feeds:</strong> Content syndication এর জন্য</li>
          <li>• <strong>Schema.org:</strong> Structured data (JSON-LD ও XML format এ)</li>
        </ul>
      </div>
    </div>
  );
}
