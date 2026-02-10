import { useState } from 'react';
import { Card } from '../ui/Card';

interface LongTailKeyword {
  keyword: string;
  type: string;
  volume: string;
  difficulty: string;
}

export function LongTailKeywords() {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [keywords, setKeywords] = useState<LongTailKeyword[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const prefixes = [
    'how to', 'what is', 'why', 'when', 'where', 'which', 'who',
    'best', 'top', 'free', 'cheap', 'affordable',
    'easy', 'quick', 'fast', 'simple',
    'ultimate', 'complete', 'definitive',
    'vs', 'or', 'and',
  ];

  const suffixes = [
    'for beginners', 'for small business', 'for students',
    'in 2024', 'in 2025', 'guide', 'tutorial', 'tips',
    'examples', 'ideas', 'templates', 'tools',
    'near me', 'online', 'free', 'pdf',
    'step by step', 'for dummies', 'made easy',
    'checklist', 'strategies', 'techniques',
    'best practices', 'mistakes to avoid',
  ];

  const questionWords = [
    'how to', 'what is', 'why do', 'when should', 'where can',
    'which is best', 'who can', 'can I', 'should I', 'is it',
    'does', 'will', 'are', 'do I need',
  ];

  const generateKeywords = () => {
    if (!seedKeyword.trim()) return;
    
    setLoading(true);
    
    setTimeout(() => {
      const generated: LongTailKeyword[] = [];
      const seed = seedKeyword.toLowerCase().trim();
      
      // Prefix combinations
      prefixes.slice(0, 8).forEach(prefix => {
        generated.push({
          keyword: `${prefix} ${seed}`,
          type: 'Prefix',
          volume: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        });
      });
      
      // Suffix combinations
      suffixes.slice(0, 10).forEach(suffix => {
        generated.push({
          keyword: `${seed} ${suffix}`,
          type: 'Suffix',
          volume: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        });
      });
      
      // Question combinations
      questionWords.slice(0, 8).forEach(question => {
        generated.push({
          keyword: `${question} ${seed}`,
          type: 'Question',
          volume: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        });
      });
      
      // Comparison combinations
      const comparisons = ['vs alternatives', 'vs competitors', 'or similar', 'compared'];
      comparisons.forEach(comp => {
        generated.push({
          keyword: `${seed} ${comp}`,
          type: 'Comparison',
          volume: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
          difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
        });
      });
      
      setKeywords(generated);
      setLoading(false);
    }, 1000);
  };

  const copyKeyword = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopied(kw);
    setTimeout(() => setCopied(null), 1500);
  };

  const copyAll = () => {
    const all = keywords.map(k => k.keyword).join('\n');
    navigator.clipboard.writeText(all);
    setCopied('all');
    setTimeout(() => setCopied(null), 1500);
  };

  const getVolumeColor = (volume: string) => {
    switch (volume) {
      case 'High': return 'text-green-600 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'Low': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const typeFilters = ['All', 'Prefix', 'Suffix', 'Question', 'Comparison'];
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredKeywords = activeFilter === 'All' 
    ? keywords 
    : keywords.filter(k => k.type === activeFilter);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">🎯 Long-Tail Keyword Generator</h1>
        <p className="text-violet-100 text-sm sm:text-base">
          একটি seed keyword থেকে শত শত long-tail keywords তৈরি করুন
        </p>
      </div>

      {/* Input Section */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={seedKeyword}
            onChange={(e) => setSeedKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateKeywords()}
            placeholder="Enter seed keyword (e.g., SEO, digital marketing, web design)"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <button
            onClick={generateKeywords}
            disabled={loading || !seedKeyword.trim()}
            className="px-6 py-3 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Generating...
              </>
            ) : (
              <>🔍 Generate Keywords</>
            )}
          </button>
        </div>
      </Card>

      {/* Results */}
      {keywords.length > 0 && (
        <>
          {/* Stats & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {typeFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    activeFilter === filter
                      ? 'bg-violet-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {filter} ({filter === 'All' ? keywords.length : keywords.filter(k => k.type === filter).length})
                </button>
              ))}
            </div>
            
            <button
              onClick={copyAll}
              className="px-4 py-2 text-sm bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
            >
              {copied === 'all' ? '✅ Copied All!' : '📋 Copy All Keywords'}
            </button>
          </div>

          {/* Keywords List */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredKeywords.map((kw, index) => (
              <Card
                key={index}
                className="p-3 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => copyKeyword(kw.keyword)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm truncate group-hover:text-violet-600 dark:group-hover:text-violet-400">
                      {kw.keyword}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getDifficultyColor(kw.difficulty)}`}>
                        {kw.difficulty}
                      </span>
                      <span className={`text-xs ${getVolumeColor(kw.volume)}`}>
                        📊 {kw.volume}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {kw.type}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-violet-500 text-sm">
                    {copied === kw.keyword ? '✅' : '📋'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {keywords.length === 0 && !loading && (
        <Card className="p-8 text-center">
          <p className="text-4xl mb-3">🎯</p>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Keywords Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            একটি seed keyword enter করে Generate করুন
          </p>
        </Card>
      )}

      {/* Tips */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-4 sm:p-6 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
          <h3 className="font-semibold text-violet-800 dark:text-violet-200 mb-3">🎯 Long-Tail Keywords কেন ভালো?</h3>
          <ul className="space-y-2 text-sm text-violet-700 dark:text-violet-300">
            <li>• <strong>কম Competition:</strong> Rank করা সহজ</li>
            <li>• <strong>Higher Conversion:</strong> Specific intent = more sales</li>
            <li>• <strong>Voice Search:</strong> People speak in long phrases</li>
            <li>• <strong>Featured Snippets:</strong> Question keywords = snippets</li>
          </ul>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">💡 Best Practices</h3>
          <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
            <li>• Question keywords দিয়ে FAQ তৈরি করুন</li>
            <li>• Easy difficulty keywords target করুন</li>
            <li>• একটি article এ 2-3টি related keywords use করুন</li>
            <li>• Natural way তে content এ include করুন</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
