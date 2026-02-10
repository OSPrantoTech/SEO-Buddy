import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Readability Checker Component
 * Check how easy your content is to read
 */
export function ReadabilityChecker() {
  const [content, setContent] = useState('');
  const [analysis, setAnalysis] = useState<{
    fleschScore: number;
    fleschKincaid: number;
    avgWordsPerSentence: number;
    avgSyllablesPerWord: number;
    complexWords: number;
    wordCount: number;
    sentenceCount: number;
    readingLevel: string;
    readingTime: number;
    issues: { type: 'warning' | 'error' | 'success'; message: string }[];
  } | null>(null);

  const countSyllables = (word: string): number => {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  };

  const analyzeReadability = () => {
    if (!content.trim()) return;

    const words = content.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length || 1;
    
    const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
    const avgWordsPerSentence = wordCount / sentenceCount;
    const avgSyllablesPerWord = totalSyllables / wordCount;
    
    // Complex words (3+ syllables)
    const complexWords = words.filter(w => countSyllables(w) >= 3).length;

    // Flesch Reading Ease Score (0-100, higher is easier)
    const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    
    // Flesch-Kincaid Grade Level
    const fleschKincaid = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;

    // Determine reading level
    let readingLevel = '';
    if (fleschScore >= 90) readingLevel = '5th Grade (Very Easy)';
    else if (fleschScore >= 80) readingLevel = '6th Grade (Easy)';
    else if (fleschScore >= 70) readingLevel = '7th Grade (Fairly Easy)';
    else if (fleschScore >= 60) readingLevel = '8th-9th Grade (Standard)';
    else if (fleschScore >= 50) readingLevel = '10th-12th Grade (Fairly Difficult)';
    else if (fleschScore >= 30) readingLevel = 'College (Difficult)';
    else readingLevel = 'College Graduate (Very Difficult)';

    const readingTime = Math.ceil(wordCount / 200);

    // Generate issues/suggestions
    const issues: { type: 'warning' | 'error' | 'success'; message: string }[] = [];
    
    if (fleschScore >= 60) {
      issues.push({ type: 'success', message: 'Good readability! Your content is easy to read.' });
    } else if (fleschScore >= 40) {
      issues.push({ type: 'warning', message: 'Moderate readability. Consider simplifying for wider audience.' });
    } else {
      issues.push({ type: 'error', message: 'Content is difficult to read. Simplify your writing.' });
    }

    if (avgWordsPerSentence > 20) {
      issues.push({ type: 'warning', message: `Long sentences detected (avg ${avgWordsPerSentence.toFixed(1)} words). Aim for 15-20 words.` });
    } else {
      issues.push({ type: 'success', message: `Good sentence length (avg ${avgWordsPerSentence.toFixed(1)} words).` });
    }

    if (complexWords / wordCount > 0.1) {
      issues.push({ type: 'warning', message: `${complexWords} complex words found. Use simpler alternatives.` });
    } else {
      issues.push({ type: 'success', message: 'Good use of simple vocabulary.' });
    }

    if (wordCount < 300) {
      issues.push({ type: 'warning', message: 'Content is short. Consider adding more detail.' });
    }

    setAnalysis({
      fleschScore: Math.max(0, Math.min(100, fleschScore)),
      fleschKincaid: Math.max(0, fleschKincaid),
      avgWordsPerSentence,
      avgSyllablesPerWord,
      complexWords,
      wordCount,
      sentenceCount,
      readingLevel,
      readingTime,
      issues
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'from-green-500 to-emerald-500';
    if (score >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          📖 Readability Checker
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Analyze how easy your content is to read and understand
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📝 Paste Your Content
            </h2>
            
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your article, blog post, or any content here to check readability...

Example: 
SEO is important for your website. It helps people find you on Google. Good SEO means more visitors. More visitors can mean more customers. Start with simple steps like good titles and descriptions."
              rows={14}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />

            <Button onClick={analyzeReadability} className="w-full mt-4">
              📖 Check Readability
            </Button>
          </Card>

          {/* Info Card */}
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">📊 Understanding Readability Scores</h3>
            <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
              <div className="flex justify-between">
                <span>90-100:</span>
                <span className="text-green-600">Very Easy (5th grade)</span>
              </div>
              <div className="flex justify-between">
                <span>70-89:</span>
                <span className="text-green-600">Easy (6th-7th grade)</span>
              </div>
              <div className="flex justify-between">
                <span>50-69:</span>
                <span className="text-yellow-600">Standard (8th-10th grade)</span>
              </div>
              <div className="flex justify-between">
                <span>30-49:</span>
                <span className="text-orange-600">Difficult (College)</span>
              </div>
              <div className="flex justify-between">
                <span>0-29:</span>
                <span className="text-red-600">Very Difficult</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {analysis ? (
            <>
              {/* Main Score */}
              <Card className="p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Flesch Reading Ease Score
                </h3>
                <div className={`text-6xl font-bold ${getScoreColor(analysis.fleschScore)}`}>
                  {analysis.fleschScore.toFixed(0)}
                </div>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getScoreBg(analysis.fleschScore)} text-white`}>
                    {analysis.readingLevel}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreBg(analysis.fleschScore)} transition-all duration-500`}
                    style={{ width: `${analysis.fleschScore}%` }}
                  />
                </div>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Card className="p-3 text-center">
                  <div className="text-xl font-bold text-blue-600">{analysis.wordCount}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Words</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-xl font-bold text-green-600">{analysis.sentenceCount}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Sentences</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-xl font-bold text-purple-600">{analysis.avgWordsPerSentence.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Words/Sentence</div>
                </Card>
                <Card className="p-3 text-center">
                  <div className="text-xl font-bold text-orange-600">{analysis.readingTime}m</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Read Time</div>
                </Card>
              </div>

              {/* Additional Metrics */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📈 Detailed Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-gray-700 dark:text-gray-300">Flesch-Kincaid Grade</span>
                    <span className="font-semibold">{analysis.fleschKincaid.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-gray-700 dark:text-gray-300">Avg Syllables/Word</span>
                    <span className="font-semibold">{analysis.avgSyllablesPerWord.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-gray-700 dark:text-gray-300">Complex Words (3+ syllables)</span>
                    <span className="font-semibold">{analysis.complexWords} ({((analysis.complexWords / analysis.wordCount) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              </Card>

              {/* Issues & Suggestions */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  💡 Analysis & Suggestions
                </h3>
                <div className="space-y-2">
                  {analysis.issues.map((issue, index) => (
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
              <span className="text-6xl">📖</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
                No Analysis Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Paste your content and click "Check Readability" to analyze
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
