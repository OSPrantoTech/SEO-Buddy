import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function HeadingAnalyzer() {
  const [html, setHtml] = useState('');
  const [analysis, setAnalysis] = useState<{
    headings: { level: number; text: string; issues: string[] }[];
    issues: { type: 'error' | 'warning' | 'success'; message: string }[];
    score: number;
  } | null>(null);

  const analyzeHeadings = () => {
    const headings: { level: number; text: string; issues: string[] }[] = [];
    const issues: { type: 'error' | 'warning' | 'success'; message: string }[] = [];
    let score = 100;

    // Extract headings from HTML
    const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
    let match;
    while ((match = headingRegex.exec(html)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, '').trim();
      const headingIssues: string[] = [];
      
      if (text.length < 10) {
        headingIssues.push('Too short');
        score -= 5;
      }
      if (text.length > 70) {
        headingIssues.push('Too long');
        score -= 3;
      }
      
      headings.push({ level, text, issues: headingIssues });
    }

    // Check for issues
    const h1Count = headings.filter(h => h.level === 1).length;
    
    if (h1Count === 0) {
      issues.push({ type: 'error', message: 'No H1 heading found. Every page needs exactly one H1.' });
      score -= 30;
    } else if (h1Count > 1) {
      issues.push({ type: 'warning', message: `Multiple H1 headings (${h1Count}). Use only one H1 per page.` });
      score -= 15;
    } else {
      issues.push({ type: 'success', message: 'One H1 heading found - perfect!' });
    }

    // Check heading hierarchy
    let prevLevel = 0;
    let hasSkip = false;
    for (const heading of headings) {
      if (heading.level > prevLevel + 1 && prevLevel !== 0) {
        hasSkip = true;
      }
      prevLevel = heading.level;
    }

    if (hasSkip) {
      issues.push({ type: 'warning', message: 'Heading levels are skipped. Use sequential heading levels (H1 → H2 → H3).' });
      score -= 10;
    } else if (headings.length > 0) {
      issues.push({ type: 'success', message: 'Heading hierarchy is correct.' });
    }

    if (headings.length === 0) {
      issues.push({ type: 'error', message: 'No headings found. Add some headings to structure your content.' });
      score = 0;
    }

    setAnalysis({ headings, issues, score: Math.max(0, score) });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          📊 Heading Analyzer
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Check your heading structure for SEO best practices
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 Paste Your HTML</h2>
          
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste your HTML here or enter content with heading tags like:

<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
..."
            rows={12}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
          />
          
          <Button onClick={analyzeHeadings} className="w-full mt-4">
            📊 Analyze Headings
          </Button>
        </Card>

        <div className="space-y-4">
          {analysis ? (
            <>
              {/* Score */}
              <Card className="p-6 text-center">
                <div className="text-sm text-gray-500 mb-2">Heading Structure Score</div>
                <div className={`text-5xl font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}
                </div>
              </Card>

              {/* Issues */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">💡 Analysis</h3>
                <div className="space-y-2">
                  {analysis.issues.map((issue, i) => (
                    <div key={i} className={`p-3 rounded-lg flex items-start gap-2 ${
                      issue.type === 'success' ? 'bg-green-50 dark:bg-green-900/20' :
                      issue.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                      'bg-red-50 dark:bg-red-900/20'
                    }`}>
                      <span>{issue.type === 'success' ? '✅' : issue.type === 'warning' ? '⚠️' : '❌'}</span>
                      <span className={`text-sm ${
                        issue.type === 'success' ? 'text-green-700 dark:text-green-400' :
                        issue.type === 'warning' ? 'text-yellow-700 dark:text-yellow-400' :
                        'text-red-700 dark:text-red-400'
                      }`}>{issue.message}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Heading Tree */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🌳 Heading Tree</h3>
                <div className="space-y-1">
                  {analysis.headings.map((h, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2 py-1"
                      style={{ paddingLeft: `${(h.level - 1) * 16}px` }}
                    >
                      <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                        h.level === 1 ? 'bg-blue-100 text-blue-700' :
                        h.level === 2 ? 'bg-green-100 text-green-700' :
                        h.level === 3 ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        H{h.level}
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{h.text}</span>
                      {h.issues.length > 0 && (
                        <span className="text-xs text-red-500">({h.issues.join(', ')})</span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center">
              <span className="text-6xl">📊</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">No Analysis Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Paste your HTML and click analyze</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
