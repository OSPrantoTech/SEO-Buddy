import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export function SitemapGenerator() {
  const [urls, setUrls] = useState<SitemapUrl[]>([
    { loc: 'https://example.com/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '1.0' },
    { loc: 'https://example.com/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://example.com/blog', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '0.9' },
  ]);
  const [copied, setCopied] = useState(false);

  const generateSitemap = () => {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urls.forEach(url => {
      if (url.loc.trim()) {
        xml += '  <url>\n';
        xml += `    <loc>${url.loc}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '  </url>\n';
      }
    });
    
    xml += '</urlset>';
    return xml;
  };

  const addUrl = () => {
    setUrls([...urls, { loc: '', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.5' }]);
  };

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const updateUrl = (index: number, field: keyof SitemapUrl, value: string) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSitemap());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([generateSitemap()], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          🗺️ Sitemap Generator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Create XML sitemap for better search engine indexing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📝 URLs</h2>
            <Button onClick={addUrl} size="sm">+ Add URL</Button>
          </div>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {urls.map((url, index) => (
              <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">URL #{index + 1}</span>
                  <button onClick={() => removeUrl(index)} className="text-red-500 text-sm">Remove</button>
                </div>
                
                <input
                  type="url"
                  value={url.loc}
                  onChange={(e) => updateUrl(index, 'loc', e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-gray-500">Last Modified</label>
                    <input
                      type="date"
                      value={url.lastmod}
                      onChange={(e) => updateUrl(index, 'lastmod', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Frequency</label>
                    <select
                      value={url.changefreq}
                      onChange={(e) => updateUrl(index, 'changefreq', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="always">Always</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Priority</label>
                    <select
                      value={url.priority}
                      onChange={(e) => updateUrl(index, 'priority', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="1.0">1.0</option>
                      <option value="0.9">0.9</option>
                      <option value="0.8">0.8</option>
                      <option value="0.7">0.7</option>
                      <option value="0.6">0.6</option>
                      <option value="0.5">0.5</option>
                      <option value="0.4">0.4</option>
                      <option value="0.3">0.3</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📄 Generated Sitemap</h2>
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} size="sm" variant="secondary">
                  {copied ? '✅' : '📋'}
                </Button>
                <Button onClick={downloadFile} size="sm">
                  ⬇️ Download
                </Button>
              </div>
            </div>
            
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs max-h-80">
              {generateSitemap()}
            </pre>
          </Card>

          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Tips</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Upload sitemap.xml to your website root</li>
              <li>• Submit to Google Search Console</li>
              <li>• Add sitemap URL to robots.txt</li>
              <li>• Update when adding new pages</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
