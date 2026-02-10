import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Keyword Density Checker Component
 * Check how often keywords appear in your content
 */
export function KeywordDensity() {
  const [content, setContent] = useState('');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [analysis, setAnalysis] = useState<{
    wordCount: number;
    charCount: number;
    sentenceCount: number;
    paragraphCount: number;
    readingTime: number;
    keywords: { word: string; count: number; density: number }[];
    targetDensity: number;
    targetCount: number;
  } | null>(null);

  const analyzeContent = () => {
    if (!content.trim()) return;

    // Basic counts
    const words = content.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const charCount = content.length;
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;
    const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
    const paragraphCount = paragraphs.length || 1;
    const readingTime = Math.ceil(wordCount / 200);

    // Word frequency analysis
    const wordFrequency: { [key: string]: number } = {};
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'as', 'if', 'then', 'because', 'while', 'although', 'though', 'after', 'before', 'since', 'until', 'unless', 'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'during', 'except', 'inside', 'into', 'near', 'off', 'onto', 'out', 'outside', 'over', 'past', 'through', 'throughout', 'toward', 'under', 'underneath', 'until', 'unto', 'up', 'upon', 'within', 'without'];

    words.forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanWord.length > 2 && !stopWords.includes(cleanWord)) {
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });

    // Sort by frequency
    const sortedKeywords = Object.entries(wordFrequency)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / wordCount) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    // Target keyword analysis
    let targetDensity = 0;
    let targetCount = 0;
    if (targetKeyword.trim()) {
      const regex = new RegExp(targetKeyword.trim().toLowerCase(), 'gi');
      const matches = content.toLowerCase().match(regex);
      targetCount = matches ? matches.length : 0;
      targetDensity = (targetCount / wordCount) * 100;
    }

    setAnalysis({
      wordCount,
      charCount,
      sentenceCount,
      paragraphCount,
      readingTime,
      keywords: sortedKeywords,
      targetDensity,
      targetCount
    });
  };

  const getDensityColor = (density: number) => {
    if (density < 0.5) return 'text-yellow-600 bg-yellow-100';
    if (density <= 2.5) return 'text-green-600 bg-green-100';
    return 'text-red-600 bg-red-100';
  };

  const getDensityStatus = (density: number) => {
    if (density < 0.5) return { status: 'Low', message: 'Consider using keyword more' };
    if (density <= 2.5) return { status: 'Optimal', message: 'Perfect keyword density!' };
    return { status: 'High', message: 'Reduce to avoid keyword stuffing' };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          📊 Keyword Density Checker
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Analyze keyword usage and optimize your content for SEO
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📝 Your Content
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Keyword (optional)
                </label>
                <input
                  type="text"
                  value={targetKeyword}
                  onChange={(e) => setTargetKeyword(e.target.value)}
                  placeholder="e.g., seo tools"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Paste Your Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your article, blog post, or any content here to analyze keyword density..."
                  rows={12}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <Button onClick={analyzeContent} className="w-full">
                📊 Analyze Content
              </Button>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Keyword Density Tips</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>✅ <strong>Optimal:</strong> 1-2% keyword density</li>
              <li>⚠️ <strong>Low:</strong> Below 0.5% - use keyword more</li>
              <li>❌ <strong>High:</strong> Above 2.5% - may trigger spam filters</li>
              <li>📝 Focus on natural, readable content</li>
              <li>🎯 Use keyword variations and synonyms</li>
            </ul>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {analysis ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="p-3 text-center">
                  <div className="text-2xl font-bold text-blue-600">{analysis.wordCount}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Words</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">{analysis.charCount}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Characters</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-2xl font-bold text-purple-600">{analysis.sentenceCount}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Sentences</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-2xl font-bold text-orange-600">{analysis.readingTime}m</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Read Time</div>
                </Card>
              </div>

              {/* Target Keyword Analysis */}
              {targetKeyword && (
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🎯 Target Keyword: "{targetKeyword}"
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{analysis.targetCount}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Times Used</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">{analysis.targetDensity.toFixed(2)}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Density</div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${getDensityColor(analysis.targetDensity)}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{getDensityStatus(analysis.targetDensity).status}</span>
                      <span className="text-sm">{getDensityStatus(analysis.targetDensity).message}</span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Top Keywords */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🔑 Top Keywords Found
                </h3>
                
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {analysis.keywords.map((kw, index) => (
                    <div 
                      key={kw.word}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">{kw.word}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{kw.count}x</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDensityColor(kw.density)}`}>
                          {kw.density.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recommendations */}
              <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">📈 Recommendations</h3>
                <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                  {analysis.wordCount < 300 && (
                    <li>• Add more content - aim for 300+ words minimum</li>
                  )}
                  {analysis.wordCount >= 300 && analysis.wordCount < 1000 && (
                    <li>• Good length! For in-depth articles, aim for 1000+ words</li>
                  )}
                  {analysis.wordCount >= 1000 && (
                    <li>• Great content length! Keep it comprehensive</li>
                  )}
                  {targetKeyword && analysis.targetDensity < 0.5 && (
                    <li>• Include "{targetKeyword}" a few more times naturally</li>
                  )}
                  {targetKeyword && analysis.targetDensity > 2.5 && (
                    <li>• Reduce usage of "{targetKeyword}" to avoid keyword stuffing</li>
                  )}
                  <li>• Use variations and synonyms of your target keyword</li>
                  <li>• Include keywords in headings naturally</li>
                </ul>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center">
              <span className="text-6xl">📊</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
                No Analysis Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Paste your content and click "Analyze Content" to see keyword density
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
