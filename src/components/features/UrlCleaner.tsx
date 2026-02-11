import { useState } from 'react';
import { Link2, Copy, Check, Trash2, Sparkles, Download } from 'lucide-react';

interface CleanedUrl {
  original: string;
  cleaned: string;
  removed: string[];
}

export default function UrlCleaner() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<CleanedUrl[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  
  const [options, setOptions] = useState({
    removeTracking: true,
    removeUtm: true,
    removeFbclid: true,
    removeGclid: true,
    removeRef: false,
    removeHash: false,
    forceHttps: true,
    removeWww: false,
    removeTrailingSlash: true,
    lowercasePath: false,
  });

  const trackingParams = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
    'fbclid', 'gclid', 'gclsrc', 'dclid', 'msclkid',
    'mc_eid', 'mc_cid', '_ga', '_gl',
    'ref', 'referer', 'referrer',
    'source', 'src',
    'affiliate_id', 'aff_id',
    'campaign_id', 'ad_id',
    'tracking_id', 'track',
    's_kwcid', 'ef_id',
    'igshid', 'share_id',
  ];

  const cleanUrl = (url: string): CleanedUrl => {
    const removed: string[] = [];
    let cleanedUrl = url.trim();

    try {
      // Add protocol if missing
      if (!cleanedUrl.match(/^https?:\/\//)) {
        cleanedUrl = 'https://' + cleanedUrl;
      }

      const urlObj = new URL(cleanedUrl);

      // Remove tracking parameters
      if (options.removeTracking || options.removeUtm || options.removeFbclid || options.removeGclid) {
        const paramsToRemove: string[] = [];
        
        urlObj.searchParams.forEach((_, key) => {
          const keyLower = key.toLowerCase();
          
          if (options.removeUtm && keyLower.startsWith('utm_')) {
            paramsToRemove.push(key);
          }
          if (options.removeFbclid && keyLower === 'fbclid') {
            paramsToRemove.push(key);
          }
          if (options.removeGclid && (keyLower === 'gclid' || keyLower === 'gclsrc' || keyLower === 'dclid')) {
            paramsToRemove.push(key);
          }
          if (options.removeTracking && trackingParams.some(p => keyLower === p || keyLower.includes(p))) {
            paramsToRemove.push(key);
          }
          if (options.removeRef && (keyLower === 'ref' || keyLower.includes('refer'))) {
            paramsToRemove.push(key);
          }
        });

        paramsToRemove.forEach(param => {
          removed.push(`${param}=${urlObj.searchParams.get(param)}`);
          urlObj.searchParams.delete(param);
        });
      }

      // Remove hash
      if (options.removeHash && urlObj.hash) {
        removed.push(`hash: ${urlObj.hash}`);
        urlObj.hash = '';
      }

      // Force HTTPS
      if (options.forceHttps && urlObj.protocol === 'http:') {
        removed.push('http → https');
        urlObj.protocol = 'https:';
      }

      // Remove www
      if (options.removeWww && urlObj.hostname.startsWith('www.')) {
        removed.push('www.');
        urlObj.hostname = urlObj.hostname.replace('www.', '');
      }

      // Lowercase path
      if (options.lowercasePath && urlObj.pathname !== urlObj.pathname.toLowerCase()) {
        removed.push('uppercase in path');
        urlObj.pathname = urlObj.pathname.toLowerCase();
      }

      cleanedUrl = urlObj.toString();

      // Remove trailing slash
      if (options.removeTrailingSlash && cleanedUrl.endsWith('/') && urlObj.pathname !== '/') {
        removed.push('trailing slash');
        cleanedUrl = cleanedUrl.slice(0, -1);
      }

    } catch (e) {
      // If URL parsing fails, return original
      return { original: url, cleaned: url, removed: ['Invalid URL'] };
    }

    return { original: url, cleaned: cleanedUrl, removed };
  };

  const handleClean = () => {
    const urls = input.split('\n').filter(u => u.trim());
    const cleanedUrls = urls.map(cleanUrl);
    setResults(cleanedUrls);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAllCleaned = () => {
    const allCleaned = results.map(r => r.cleaned).join('\n');
    navigator.clipboard.writeText(allCleaned);
    setCopied(-1);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadCleaned = () => {
    const content = results.map(r => r.cleaned).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cleaned-urls.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    setInput(`https://example.com/page?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&fbclid=abc123
https://www.site.com/blog/article/?gclid=xyz789&ref=twitter
http://shop.example.com/product/123?tracking_id=456&affiliate_id=789#section
https://WWW.EXAMPLE.COM/PAGE/`);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">URL Cleaner</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Remove tracking parameters and clean URLs</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-white mb-3">⚙️ Cleaning Options</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { key: 'removeUtm', label: 'UTM params' },
            { key: 'removeFbclid', label: 'Facebook (fbclid)' },
            { key: 'removeGclid', label: 'Google (gclid)' },
            { key: 'removeTracking', label: 'All tracking' },
            { key: 'removeRef', label: 'Referrer params' },
            { key: 'removeHash', label: 'URL hash (#)' },
            { key: 'forceHttps', label: 'Force HTTPS' },
            { key: 'removeWww', label: 'Remove www' },
            { key: 'removeTrailingSlash', label: 'Trailing slash' },
            { key: 'lowercasePath', label: 'Lowercase path' },
          ].map(opt => (
            <label key={opt.key} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={options[opt.key as keyof typeof options]}
                onChange={(e) => setOptions({ ...options, [opt.key]: e.target.checked })}
                className="w-4 h-4 text-blue-500 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <span className="font-medium text-gray-700 dark:text-gray-300">🔗 Paste URLs (one per line)</span>
          <div className="flex gap-2">
            <button onClick={loadSample} className="text-sm text-blue-500 hover:text-blue-600">
              Sample
            </button>
            <button onClick={() => { setInput(''); setResults([]); }} className="text-sm text-red-500 hover:text-red-600">
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com/page?utm_source=google&utm_medium=cpc&fbclid=abc123"
          className="w-full h-40 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
        />
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClean}
            disabled={!input.trim()}
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Clean URLs
          </button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 dark:text-white">✨ Cleaned URLs ({results.length})</h2>
            <div className="flex gap-2">
              <button
                onClick={copyAllCleaned}
                className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 flex items-center gap-1"
              >
                {copied === -1 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy All
              </button>
              <button
                onClick={downloadCleaned}
                className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 flex items-center gap-1"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>

          {results.map((result, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Original */}
              <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-red-600 dark:text-red-400 font-medium">Original</span>
                  <Trash2 className="w-3 h-3 text-red-400" />
                </div>
                <p className="font-mono text-xs text-red-700 dark:text-red-300 break-all line-through opacity-70">
                  {result.original}
                </p>
              </div>
              
              {/* Cleaned */}
              <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Cleaned</span>
                  <button
                    onClick={() => copyToClipboard(result.cleaned, index)}
                    className="p-1 text-gray-400 hover:text-blue-500"
                  >
                    {copied === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="font-mono text-sm text-green-700 dark:text-green-300 break-all">
                  {result.cleaned}
                </p>
              </div>

              {/* Removed items */}
              {result.removed.length > 0 && (
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Removed: {result.removed.join(', ')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
        <h3 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">🔗 URL Cleaner কেন দরকার?</h3>
        <ul className="text-sm text-teal-700 dark:text-teal-400 space-y-1">
          <li>• <strong>Privacy:</strong> Tracking parameters আপনার activity track করে</li>
          <li>• <strong>SEO:</strong> Clean URLs search engines এ better rank করে</li>
          <li>• <strong>Sharing:</strong> Short, clean URLs share করা সহজ</li>
          <li>• <strong>Analytics:</strong> Duplicate content issues এড়াতে সাহায্য করে</li>
        </ul>
      </div>
    </div>
  );
}
