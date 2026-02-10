/**
 * ============================================
 * KEYWORD SUGGESTION TOOL
 * ============================================
 * Helps users find the right keywords for their content.
 */

import { useState } from 'react';
import { Search, TrendingUp, Target, Lightbulb, Info, Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
import { generateAIKeywords } from '../../utils/aiHelper';

// Sample keyword data (in real app, this would come from an API)
interface KeywordData {
  keyword: string;
  searchVolume: 'High' | 'Medium' | 'Low';
  competition: 'High' | 'Medium' | 'Low';
  difficulty: number;
}

export function KeywordTool() {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [keywords, setKeywords] = useState<KeywordData[]>([]);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  // Search for keywords
  const handleSearch = async () => {
    if (!seedKeyword.trim()) return;

    setIsSearching(true);
    try {
      const suggestions = await generateAIKeywords(seedKeyword);
      
      // Add mock data for demonstration
      const keywordData: KeywordData[] = suggestions.map((kw) => ({
        keyword: kw,
        searchVolume: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)] as 'High' | 'Medium' | 'Low',
        competition: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)] as 'High' | 'Medium' | 'Low',
        difficulty: Math.floor(Math.random() * 100)
      }));
      
      setKeywords(keywordData);
    } catch (error) {
      console.error('Error searching keywords:', error);
    }
    setIsSearching(false);
  };

  // Copy keyword
  const copyKeyword = async (keyword: string) => {
    await navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  // Get color for difficulty
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty < 30) return 'text-green-500 bg-green-100 dark:bg-green-900/30';
    if (difficulty < 60) return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
    return 'text-red-500 bg-red-100 dark:bg-red-900/30';
  };

  const getVolumeColor = (volume: string) => {
    if (volume === 'High') return 'text-green-600 dark:text-green-400';
    if (volume === 'Medium') return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🔑 Keyword Research Tool
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find the perfect keywords for your content. Enter a topic and we'll suggest related keywords
          that people are actually searching for!
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Target className="w-5 h-5 text-blue-500 flex-shrink-0" />
            Enter Your Seed Keyword
          </CardTitle>
          <CardDescription>
            A seed keyword is your main topic. We'll find related keywords from it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={seedKeyword}
                onChange={(e) => setSeedKeyword(e.target.value)}
                placeholder="e.g., content marketing, home workout..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} loading={isSearching} className="w-full sm:w-auto">
              <Search className="w-5 h-5" />
              Find Keywords
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Keywords Results */}
      {keywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <TrendingUp className="w-5 h-5 text-green-500 flex-shrink-0" />
              Keyword Suggestions ({keywords.length})
            </CardTitle>
            <CardDescription>
              Tap any keyword to copy it. Lower difficulty = easier to rank!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-t-lg text-sm font-medium text-gray-600 dark:text-gray-300">
              <div className="col-span-5">Keyword</div>
              <div className="col-span-2 text-center">
                Volume
                <Tooltip content="How many people search for this keyword each month">
                  <Info className="w-3 h-3 inline ml-1" />
                </Tooltip>
              </div>
              <div className="col-span-2 text-center">
                Competition
                <Tooltip content="How many other websites are trying to rank for this keyword">
                  <Info className="w-3 h-3 inline ml-1" />
                </Tooltip>
              </div>
              <div className="col-span-2 text-center">
                Difficulty
                <Tooltip content="How hard it is to rank on page 1 (0-100). Lower is better!">
                  <Info className="w-3 h-3 inline ml-1" />
                </Tooltip>
              </div>
              <div className="col-span-1"></div>
            </div>

            {/* Keyword Rows */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {keywords.map((kw, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {/* Keyword - Mobile Card / Desktop Row */}
                  <div className="md:col-span-5">
                    <div className="flex items-center justify-between md:justify-start">
                      <span className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                        {kw.keyword}
                      </span>
                      {/* Mobile Copy Button */}
                      <button
                        onClick={() => copyKeyword(kw.keyword)}
                        className="md:hidden p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        {copiedKeyword === kw.keyword ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {/* Mobile Stats Row */}
                  <div className="md:hidden flex items-center justify-between text-xs mt-2 gap-2">
                    <div className="flex items-center gap-4">
                      <span className={getVolumeColor(kw.searchVolume)}>
                        Vol: {kw.searchVolume}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Comp: {kw.competition}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs ${getDifficultyColor(kw.difficulty)}`}>
                      Diff: {kw.difficulty}
                    </span>
                  </div>
                  
                  {/* Desktop Stats */}
                  <div className="hidden md:block md:col-span-2 md:text-center">
                    <span className={getVolumeColor(kw.searchVolume)}>
                      {kw.searchVolume}
                    </span>
                  </div>
                  
                  <div className="hidden md:block md:col-span-2 md:text-center text-gray-600 dark:text-gray-400">
                    {kw.competition}
                  </div>
                  
                  <div className="hidden md:block md:col-span-2 md:text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-sm ${getDifficultyColor(kw.difficulty)}`}>
                      {kw.difficulty}
                    </span>
                  </div>
                  
                  {/* Desktop Copy Button */}
                  <div className="hidden md:flex md:col-span-1 justify-end">
                    <button
                      onClick={() => copyKeyword(kw.keyword)}
                      className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    >
                      {copiedKeyword === kw.keyword ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Beginner Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4 md:p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm md:text-base">
            <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            How to Choose the Right Keywords
          </h4>
          <div className="grid md:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <span className="text-green-500 font-bold flex-shrink-0">1.</span>
                <span><strong>Start with low difficulty:</strong> If you're new, target keywords with difficulty under 30.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-500 font-bold flex-shrink-0">2.</span>
                <span><strong>Look for "long-tail" keywords:</strong> These are longer, specific phrases that are easier to rank for.</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <span className="text-green-500 font-bold flex-shrink-0">3.</span>
                <span><strong>Match search intent:</strong> Make sure your content answers what people are looking for.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-green-500 font-bold flex-shrink-0">4.</span>
                <span><strong>Use keywords naturally:</strong> Include keywords in your title and first paragraph - but don't overdo it!</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
