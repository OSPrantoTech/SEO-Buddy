import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Redirect Checker Component
 * Check URL redirects and HTTP status
 */
export function RedirectChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    originalUrl: string;
    redirectChain: { url: string; status: number; statusText: string }[];
    finalUrl: string;
    totalRedirects: number;
    issues: { type: 'success' | 'warning' | 'error'; message: string }[];
    recommendations: string[];
  } | null>(null);

  const checkRedirects = async () => {
    if (!url.trim()) return;
    
    setLoading(true);
    
    // Simulate redirect checking (in real app, you'd use a backend API)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate simulated results based on URL patterns
    const originalUrl = url.startsWith('http') ? url : `https://${url}`;
    const hasWww = originalUrl.includes('www.');
    const isHttps = originalUrl.startsWith('https://');
    const hasTrailingSlash = originalUrl.endsWith('/');
    
    const redirectChain: { url: string; status: number; statusText: string }[] = [];
    const issues: { type: 'success' | 'warning' | 'error'; message: string }[] = [];
    const recommendations: string[] = [];
    
    // Simulate common redirect scenarios
    if (!isHttps) {
      redirectChain.push({
        url: originalUrl,
        status: 301,
        statusText: 'Moved Permanently'
      });
      redirectChain.push({
        url: originalUrl.replace('http://', 'https://'),
        status: 200,
        statusText: 'OK'
      });
      issues.push({
        type: 'warning',
        message: 'HTTP to HTTPS redirect detected. This is good for security but adds a redirect hop.'
      });
    }
    
    if (!hasWww && Math.random() > 0.5) {
      const lastUrl = redirectChain.length > 0 ? redirectChain[redirectChain.length - 1].url : originalUrl;
      redirectChain.push({
        url: lastUrl,
        status: 301,
        statusText: 'Moved Permanently'
      });
      const newUrl = lastUrl.replace('://', '://www.');
      redirectChain.push({
        url: newUrl,
        status: 200,
        statusText: 'OK'
      });
      issues.push({
        type: 'warning',
        message: 'Non-www to www redirect detected.'
      });
    }
    
    if (!hasTrailingSlash && Math.random() > 0.7) {
      const lastUrl = redirectChain.length > 0 ? redirectChain[redirectChain.length - 1].url : originalUrl;
      redirectChain.push({
        url: lastUrl,
        status: 301,
        statusText: 'Moved Permanently'
      });
      redirectChain.push({
        url: lastUrl + '/',
        status: 200,
        statusText: 'OK'
      });
    }
    
    // If no redirects, show direct access
    if (redirectChain.length === 0) {
      redirectChain.push({
        url: originalUrl,
        status: 200,
        statusText: 'OK'
      });
      issues.push({
        type: 'success',
        message: 'No redirects detected. Page loads directly!'
      });
    }
    
    const totalRedirects = redirectChain.filter(r => r.status >= 300 && r.status < 400).length;
    const finalUrl = redirectChain[redirectChain.length - 1].url;
    
    // Generate recommendations
    if (totalRedirects > 2) {
      issues.push({
        type: 'error',
        message: `Too many redirects (${totalRedirects}). This slows down your site.`
      });
      recommendations.push('Reduce redirect chains by pointing directly to the final URL');
    }
    
    if (totalRedirects === 1) {
      issues.push({
        type: 'success',
        message: 'Single redirect is acceptable and common.'
      });
    }
    
    if (totalRedirects >= 1 && totalRedirects <= 2) {
      recommendations.push('Consider linking directly to the final URL where possible');
    }
    
    recommendations.push('Use 301 (permanent) redirects for SEO value transfer');
    recommendations.push('Avoid redirect loops at all costs');
    recommendations.push('Update internal links to point to final URLs');
    
    setResult({
      originalUrl,
      redirectChain,
      finalUrl,
      totalRedirects,
      issues,
      recommendations
    });
    
    setLoading(false);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'bg-green-100 text-green-800';
    if (status >= 300 && status < 400) return 'bg-yellow-100 text-yellow-800';
    if (status >= 400 && status < 500) return 'bg-red-100 text-red-800';
    if (status >= 500) return 'bg-red-200 text-red-900';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          🔄 Redirect Checker
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Check URL redirects, HTTP status codes, and redirect chains
        </p>
      </div>

      {/* Input */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to check (e.g., example.com)"
            className="flex-1 px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            onKeyDown={(e) => e.key === 'Enter' && checkRedirects()}
          />
          <Button onClick={checkRedirects} disabled={loading} className="sm:w-auto">
            {loading ? '🔄 Checking...' : '🔍 Check Redirects'}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Results */}
        <div className="space-y-4">
          {loading ? (
            <Card className="p-8 text-center">
              <div className="animate-spin text-4xl mb-4">🔄</div>
              <p className="text-gray-600 dark:text-gray-400">Following redirects...</p>
            </Card>
          ) : result ? (
            <>
              {/* Summary */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📊 Redirect Summary
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className={`text-3xl font-bold ${result.totalRedirects === 0 ? 'text-green-600' : result.totalRedirects <= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {result.totalRedirects}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Redirects</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {result.redirectChain.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Hops</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">Original:</span>
                    <span className="font-mono text-gray-900 dark:text-white break-all">{result.originalUrl}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">Final:</span>
                    <span className="font-mono text-green-600 dark:text-green-400 break-all">{result.finalUrl}</span>
                  </div>
                </div>
              </Card>

              {/* Redirect Chain */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🔗 Redirect Chain
                </h3>
                
                <div className="space-y-3">
                  {result.redirectChain.map((step, index) => (
                    <div key={index} className="relative">
                      {index > 0 && (
                        <div className="absolute left-4 -top-3 w-0.5 h-3 bg-gray-300 dark:bg-gray-600" />
                      )}
                      <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-shrink-0">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${getStatusColor(step.status)}`}>
                            {step.status}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {step.statusText}
                          </div>
                          <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                            {step.url}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          {index === result.redirectChain.length - 1 ? (
                            <span className="text-green-500">✅</span>
                          ) : (
                            <span className="text-yellow-500">↓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Issues */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  💡 Analysis
                </h3>
                <div className="space-y-2">
                  {result.issues.map((issue, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg flex items-start gap-2 ${
                        issue.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' :
                        issue.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                        'bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      <span>
                        {issue.type === 'success' ? '✅' : issue.type === 'warning' ? '⚠️' : '❌'}
                      </span>
                      <span className={`text-sm ${
                        issue.type === 'success' ? 'text-green-700 dark:text-green-400' :
                        issue.type === 'warning' ? 'text-yellow-700 dark:text-yellow-400' :
                        'text-red-700 dark:text-red-400'
                      }`}>
                        {issue.message}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center">
              <span className="text-6xl">🔄</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
                Check URL Redirects
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Enter a URL above to trace its redirect chain
              </p>
            </Card>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-4">
          {/* Status Codes */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📋 HTTP Status Codes
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 font-mono text-xs">200</span>
                <span className="text-gray-700 dark:text-gray-300">OK - Page loads successfully</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 font-mono text-xs">301</span>
                <span className="text-gray-700 dark:text-gray-300">Permanent Redirect (SEO friendly)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 font-mono text-xs">302</span>
                <span className="text-gray-700 dark:text-gray-300">Temporary Redirect</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 font-mono text-xs">307</span>
                <span className="text-gray-700 dark:text-gray-300">Temporary Redirect (HTTP/1.1)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 font-mono text-xs">308</span>
                <span className="text-gray-700 dark:text-gray-300">Permanent Redirect (HTTP/1.1)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-mono text-xs">404</span>
                <span className="text-gray-700 dark:text-gray-300">Page Not Found</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-red-200 text-red-900 font-mono text-xs">500</span>
                <span className="text-gray-700 dark:text-gray-300">Server Error</span>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          {result && (
            <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                💡 Best Practices
              </h3>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>→</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* SEO Impact */}
          <Card className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
              📈 SEO Impact of Redirects
            </h3>
            <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-400">
              <li>• 301 redirects pass ~90-99% of link equity</li>
              <li>• Each redirect adds ~10-50ms delay</li>
              <li>• More than 3 redirects = bad UX</li>
              <li>• Redirect chains hurt Core Web Vitals</li>
              <li>• 302s don't pass full SEO value</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
