import { useState } from 'react';
import { Card } from '../ui/Card';

export function CanonicalGenerator() {
  const [url, setUrl] = useState('');
  const [removeWww, setRemoveWww] = useState(true);
  const [removeTrailingSlash, setRemoveTrailingSlash] = useState(true);
  const [forceHttps, setForceHttps] = useState(true);
  const [removeParams, setRemoveParams] = useState(true);
  const [copied, setCopied] = useState(false);

  const generateCanonical = () => {
    if (!url) return '';
    
    let canonical = url.trim();
    
    // Force HTTPS
    if (forceHttps) {
      canonical = canonical.replace(/^http:\/\//i, 'https://');
      if (!canonical.startsWith('https://')) {
        canonical = 'https://' + canonical.replace(/^\/\//, '');
      }
    }
    
    // Remove www
    if (removeWww) {
      canonical = canonical.replace(/^(https?:\/\/)www\./i, '$1');
    }
    
    // Remove query parameters
    if (removeParams) {
      canonical = canonical.split('?')[0].split('#')[0];
    }
    
    // Remove trailing slash
    if (removeTrailingSlash && canonical.endsWith('/') && canonical.split('/').length > 4) {
      canonical = canonical.slice(0, -1);
    }
    
    return canonical;
  };

  const canonicalUrl = generateCanonical();
  const canonicalTag = canonicalUrl ? `<link rel="canonical" href="${canonicalUrl}" />` : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(canonicalTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commonIssues = [
    { issue: 'www vs non-www', example: 'example.com ≠ www.example.com' },
    { issue: 'HTTP vs HTTPS', example: 'http://... ≠ https://...' },
    { issue: 'Trailing slash', example: '/page ≠ /page/' },
    { issue: 'Query parameters', example: '/page ≠ /page?ref=abc' },
    { issue: 'Case sensitivity', example: '/Page ≠ /page' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">🔗 Canonical URL Generator</h1>
        <p className="text-indigo-100 text-sm sm:text-base">
          Duplicate content এড়াতে proper canonical URL তৈরি করুন
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Section */}
        <Card className="p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🌐 Enter Your URL</h3>
          
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/your-page"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          {/* Options */}
          <div className="mt-4 space-y-3">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm">Normalization Options:</h4>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={forceHttps}
                onChange={(e) => setForceHttps(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Force HTTPS</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={removeWww}
                onChange={(e) => setRemoveWww(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Remove www</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={removeTrailingSlash}
                onChange={(e) => setRemoveTrailingSlash(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Remove trailing slash</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={removeParams}
                onChange={(e) => setRemoveParams(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Remove query parameters</span>
            </label>
          </div>
        </Card>

        {/* Output Section */}
        <Card className="p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">✨ Generated Canonical Tag</h3>
          
          {canonicalUrl ? (
            <>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Canonical URL:</p>
                <p className="font-mono text-sm text-indigo-600 dark:text-indigo-400 break-all">{canonicalUrl}</p>
              </div>
              
              <div className="p-3 bg-gray-900 rounded-lg mb-4">
                <code className="text-sm text-green-400 break-all">{canonicalTag}</code>
              </div>
              
              <button
                onClick={copyToClipboard}
                className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? '✅ Copied!' : '📋 Copy Tag'}
              </button>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-4xl mb-2">🔗</p>
              <p>Enter a URL to generate canonical tag</p>
            </div>
          )}
        </Card>
      </div>

      {/* Common Issues */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">⚠️ Common Duplicate Content Issues</h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {commonIssues.map((item, index) => (
            <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="font-medium text-red-700 dark:text-red-300 text-sm">{item.issue}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-mono">{item.example}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* How to Use */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">📖 Canonical Tag কিভাবে ব্যবহার করবেন</h3>
        
        <div className="space-y-3 text-sm text-indigo-700 dark:text-indigo-300">
          <p><strong>1.</strong> উপরের generated tag কপি করুন</p>
          <p><strong>2.</strong> আপনার HTML এর {'<head>'} section এ paste করুন</p>
          <p><strong>3.</strong> প্রতিটি page এর জন্য unique canonical URL দিন</p>
          <p><strong>4.</strong> Self-referencing canonical (নিজের page এর URL) recommended</p>
        </div>
      </Card>
    </div>
  );
}
