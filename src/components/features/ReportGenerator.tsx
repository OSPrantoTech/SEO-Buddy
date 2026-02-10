import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ReportGenerator() {
  const [clientName, setClientName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<{
    score: number;
    date: string;
    sections: { title: string; score: number; items: { label: string; status: 'pass' | 'fail' | 'warning'; note: string }[] }[];
  } | null>(null);

  const generateReport = async () => {
    if (!websiteUrl.trim()) return;
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const overallScore = Math.floor(Math.random() * 40) + 50;
    
    setReport({
      score: overallScore,
      date: new Date().toLocaleDateString(),
      sections: [
        {
          title: 'Technical SEO',
          score: Math.floor(Math.random() * 30) + 60,
          items: [
            { label: 'SSL Certificate', status: 'pass', note: 'HTTPS is enabled' },
            { label: 'Mobile Friendly', status: 'pass', note: 'Responsive design detected' },
            { label: 'Page Speed', status: 'warning', note: 'Load time: 3.2s (aim for <2s)' },
            { label: 'Robots.txt', status: 'pass', note: 'File found and valid' },
            { label: 'Sitemap', status: 'fail', note: 'No sitemap detected' },
          ]
        },
        {
          title: 'On-Page SEO',
          score: Math.floor(Math.random() * 30) + 55,
          items: [
            { label: 'Title Tag', status: 'pass', note: '55 characters - good length' },
            { label: 'Meta Description', status: 'warning', note: '180 characters - slightly long' },
            { label: 'H1 Heading', status: 'pass', note: 'One H1 found' },
            { label: 'Image Alt Tags', status: 'fail', note: '5 images missing alt text' },
            { label: 'Internal Links', status: 'pass', note: '12 internal links found' },
          ]
        },
        {
          title: 'Content Quality',
          score: Math.floor(Math.random() * 30) + 50,
          items: [
            { label: 'Word Count', status: 'warning', note: '450 words - add more content' },
            { label: 'Keyword Usage', status: 'pass', note: 'Good keyword density' },
            { label: 'Readability', status: 'pass', note: 'Grade 8 reading level' },
            { label: 'Duplicate Content', status: 'pass', note: 'No issues found' },
          ]
        }
      ]
    });
    
    setLoading(false);
  };

  const getStatusIcon = (status: 'pass' | 'fail' | 'warning') => {
    switch (status) {
      case 'pass': return '✅';
      case 'fail': return '❌';
      case 'warning': return '⚠️';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          📊 SEO Report Generator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Generate professional SEO audit reports for clients
        </p>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client or Company Name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL</label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={generateReport} disabled={loading} className="w-full">
              {loading ? '🔄 Generating...' : '📊 Generate Report'}
            </Button>
          </div>
        </div>
      </Card>

      {report && (
        <div className="space-y-4">
          {/* Header */}
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">SEO Audit Report</h2>
                <p className="opacity-90">{clientName || 'Website'} - {websiteUrl}</p>
                <p className="text-sm opacity-75">Generated: {report.date}</p>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-4">
                <div className="text-4xl font-bold">{report.score}</div>
                <div className="text-sm">Overall Score</div>
              </div>
            </div>
          </Card>

          {/* Sections */}
          {report.sections.map((section, i) => (
            <Card key={i} className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                <span className={`text-2xl font-bold ${getScoreColor(section.score)}`}>{section.score}/100</span>
              </div>
              
              <div className="space-y-2">
                {section.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span>{getStatusIcon(item.status)}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.note}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}

          {/* Actions */}
          <Card className="p-4 flex flex-wrap gap-3 justify-center">
            <Button variant="secondary" onClick={() => window.print()}>🖨️ Print Report</Button>
            <Button variant="secondary">📧 Email to Client</Button>
            <Button>📄 Download PDF</Button>
          </Card>
        </div>
      )}
    </div>
  );
}
