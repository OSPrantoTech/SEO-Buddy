import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function BacklinkChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    totalBacklinks: number;
    referringDomains: number;
    domainAuthority: number;
    pageAuthority: number;
    topBacklinks: { url: string; anchor: string; da: number; dofollow: boolean }[];
  } | null>(null);

  const checkBacklinks = async () => {
    if (!url.trim()) return;
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate demo results
    setResults({
      totalBacklinks: Math.floor(Math.random() * 5000) + 100,
      referringDomains: Math.floor(Math.random() * 500) + 20,
      domainAuthority: Math.floor(Math.random() * 60) + 20,
      pageAuthority: Math.floor(Math.random() * 50) + 15,
      topBacklinks: [
        { url: 'https://example-blog.com/article', anchor: 'best seo tools', da: 45, dofollow: true },
        { url: 'https://tech-news.com/review', anchor: 'seo buddy review', da: 52, dofollow: true },
        { url: 'https://marketing-tips.com', anchor: 'click here', da: 38, dofollow: false },
        { url: 'https://seo-guide.org/tools', anchor: 'recommended tools', da: 61, dofollow: true },
        { url: 'https://digital-marketing.net', anchor: url, da: 33, dofollow: false },
      ]
    });
    
    setLoading(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          🔗 Backlink Checker
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Analyze your website's backlink profile
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., example.com)"
            className="flex-1 px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <Button onClick={checkBacklinks} disabled={loading}>
            {loading ? '🔄 Analyzing...' : '🔍 Check Backlinks'}
          </Button>
        </div>
      </Card>

      {results && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{results.totalBacklinks.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Backlinks</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{results.referringDomains}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Referring Domains</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{results.domainAuthority}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Domain Authority</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-3xl font-bold text-orange-600">{results.pageAuthority}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Page Authority</div>
          </Card>
        </div>
      )}

      {results && (
        <Card className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🔗 Top Backlinks</h3>
          <div className="space-y-3">
            {results.topBacklinks.map((link, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">{link.url}</div>
                    <div className="text-xs text-gray-500 mt-1">Anchor: "{link.anchor}"</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">DA: {link.da}</span>
                    <span className={`text-xs px-2 py-1 rounded ${link.dofollow ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {link.dofollow ? 'Dofollow' : 'Nofollow'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
