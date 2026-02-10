/**
 * ============================================
 * SEO CHECKER COMPONENT
 * ============================================
 * The main tool for analyzing a website's SEO.
 * 
 * HOW IT WORKS:
 * 1. User enters a URL or content to analyze
 * 2. We check the title, description, keywords, etc.
 * 3. We show a score and improvement suggestions
 * 
 * This is the heart of our SEO tool!
 */

import { useState } from 'react';
import { Search, Globe, AlertCircle, CheckCircle, Info, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';
import { analyzeTitle, analyzeMetaDescription, generateSuggestions, calculateOverallScore, extractKeywords } from '../../utils/seoAnalyzer';
import type { SEOAnalysisResult, Suggestion } from '../../types';

export function SEOChecker() {
  // State for the input and results
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SEOAnalysisResult | null>(null);

  // Load demo data for beginners to try
  const loadDemoData = () => {
    setUrl('https://example.com/seo-tips');
    setTitle('10 Essential SEO Tips for Beginners - Complete Guide 2024');
    setDescription('Learn the most important SEO techniques that will help your website rank higher in Google. Easy-to-follow tips for beginners with step-by-step instructions.');
    setContent('Search engine optimization is crucial for any website. This guide covers keyword research, on-page SEO, meta tags, content optimization, and link building strategies. Learn how to improve your website visibility and drive more organic traffic.');
  };

  // Run the SEO analysis
  const handleAnalyze = async () => {
    if (!title && !description && !content) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate processing time (real API would take time too)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Analyze each element
    const titleAnalysis = analyzeTitle(title);
    const descriptionAnalysis = analyzeMetaDescription(description);
    const keywords = extractKeywords(content || `${title} ${description}`);
    
    // Calculate keyword score based on presence
    const keywordScore = keywords.length >= 5 ? 100 : keywords.length >= 3 ? 70 : keywords.length >= 1 ? 40 : 0;
    
    // Mock performance scores (in real app, these would come from an API)
    const performanceAnalysis = {
      mobileScore: Math.floor(Math.random() * 30) + 70,
      speedScore: Math.floor(Math.random() * 30) + 70,
      isResponsive: true
    };

    const performanceScore = (performanceAnalysis.mobileScore + performanceAnalysis.speedScore) / 2;

    // Generate suggestions
    const suggestions = generateSuggestions({
      title: titleAnalysis,
      description: descriptionAnalysis
    });

    // Calculate overall score
    const overallScore = calculateOverallScore({
      title: titleAnalysis.score,
      description: descriptionAnalysis.score,
      keywords: keywordScore,
      performance: performanceScore
    });

    setResult({
      score: overallScore,
      title: titleAnalysis,
      description: descriptionAnalysis,
      keywords: {
        found: keywords,
        density: keywords.length > 0 ? 2.5 : 0,
        score: keywordScore
      },
      performance: performanceAnalysis,
      suggestions
    });

    setIsAnalyzing(false);
  };

  // Get color for score display
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-amber-500';
    if (score >= 40) return 'from-orange-500 to-amber-600';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="space-y-6">
      {/* Header with explanation */}
      <div className="text-center mb-6 md:mb-8 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🔍 Website SEO Checker
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Enter your page details below and we'll analyze how well-optimized it is for search engines. 
          <Tooltip content="SEO = Search Engine Optimization. It helps your website appear higher in Google searches!">
            <span className="inline-flex items-center ml-1 text-indigo-600 dark:text-indigo-400 cursor-help">
              <Info className="w-4 h-4" />
            </span>
          </Tooltip>
        </p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Globe className="w-5 h-5 text-indigo-500 flex-shrink-0" />
            Enter Your Page Details
          </CardTitle>
          <CardDescription>
            Fill in the fields below. Don't worry if you don't have all the information!
          </CardDescription>
          
          {/* Demo button for beginners */}
          <button
            onClick={loadDemoData}
            className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline text-left"
          >
            🎯 Click here to load demo data and try it out!
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* URL Input (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Website URL (optional)
              <Tooltip content="The web address of your page, like https://example.com/my-page">
                <Info className="w-4 h-4 inline ml-1 text-gray-400" />
              </Tooltip>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Page Title *
              <Tooltip content="The title that appears in browser tabs and Google search results. Aim for 50-60 characters.">
                <Info className="w-4 h-4 inline ml-1 text-gray-400" />
              </Tooltip>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Amazing Blog Post - Tips for Beginners"
              className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              {title.length}/60 characters {title.length >= 50 && title.length <= 60 ? '✅' : ''}
            </p>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meta Description *
              <Tooltip content="A short summary of your page that appears in Google search results. Aim for 150-160 characters.">
                <Info className="w-4 h-4 inline ml-1 text-gray-400" />
              </Tooltip>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Discover the best tips for beginners. Our comprehensive guide will help you get started quickly and achieve great results."
              rows={3}
              className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <p className="mt-1 text-xs md:text-sm text-gray-500">
              {description.length}/160 characters {description.length >= 150 && description.length <= 160 ? '✅' : ''}
            </p>
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Page Content (optional)
              <Tooltip content="Paste some of your page's main content. We'll extract keywords from it.">
                <Info className="w-4 h-4 inline ml-1 text-gray-400" />
              </Tooltip>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your main content here to analyze keywords..."
              rows={4}
              className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Analyze Button */}
          <Button 
            onClick={handleAnalyze} 
            loading={isAnalyzing}
            className="w-full"
            size="lg"
          >
            <Search className="w-5 h-5" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze SEO'}
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-4 md:space-y-6 animate-fade-in">
          {/* Overall Score */}
          <Card className="overflow-hidden">
            <div className={`bg-gradient-to-r ${getScoreBgColor(result.score)} p-4 md:p-6 text-white`}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-white/80 text-sm font-medium">Overall SEO Score</p>
                  <p className="text-4xl md:text-5xl font-bold mt-1">{result.score}/100</p>
                  <p className="text-white/80 mt-2 text-sm md:text-base">
                    {result.score >= 80 ? '🎉 Excellent! Your SEO is great!' :
                     result.score >= 60 ? '👍 Good, but there\'s room for improvement.' :
                     result.score >= 40 ? '⚠️ Needs work. Check the suggestions below.' :
                     '🚨 Needs significant improvement. Follow our tips!'}
                  </p>
                </div>
                <div className="hidden sm:flex w-24 h-24 md:w-32 md:h-32 rounded-full border-8 border-white/30 items-center justify-center flex-shrink-0">
                  <span className="text-3xl md:text-4xl font-bold">{result.score}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Scores */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Title Score */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Title</span>
                  <span className={`text-base md:text-lg font-bold ${getScoreColor(result.title.score)}`}>
                    {result.title.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getScoreBgColor(result.title.score)}`}
                    style={{ width: `${result.title.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{result.title.length} chars</p>
              </CardContent>
            </Card>

            {/* Description Score */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Description</span>
                  <span className={`text-base md:text-lg font-bold ${getScoreColor(result.description.score)}`}>
                    {result.description.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getScoreBgColor(result.description.score)}`}
                    style={{ width: `${result.description.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{result.description.length} chars</p>
              </CardContent>
            </Card>

            {/* Keywords Score */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Keywords</span>
                  <span className={`text-base md:text-lg font-bold ${getScoreColor(result.keywords.score)}`}>
                    {result.keywords.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getScoreBgColor(result.keywords.score)}`}
                    style={{ width: `${result.keywords.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{result.keywords.found.length} found</p>
              </CardContent>
            </Card>

            {/* Performance Score */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Speed</span>
                  <span className={`text-base md:text-lg font-bold ${getScoreColor(result.performance.speedScore)}`}>
                    {result.performance.speedScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${getScoreBgColor(result.performance.speedScore)}`}
                    style={{ width: `${result.performance.speedScore}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Mobile: {result.performance.mobileScore}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Keywords Found */}
          {result.keywords.found.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  🔑 Keywords Found
                </CardTitle>
                <CardDescription>
                  These are the main topics we found in your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.found.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs md:text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                Improvement Suggestions
              </CardTitle>
              <CardDescription>
                Follow these tips to improve your SEO score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.suggestions.map((suggestion) => (
                  <SuggestionItem key={suggestion.id} suggestion={suggestion} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Suggestion item component
function SuggestionItem({ suggestion }: { suggestion: Suggestion }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const iconMap = {
    success: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
  };

  const bgMap = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
  };

  return (
    <div className={`p-3 md:p-4 rounded-lg border ${bgMap[suggestion.type]}`}>
      <div className="flex items-start gap-3">
        {iconMap[suggestion.type]}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{suggestion.title}</p>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{suggestion.description}</p>
          
          {suggestion.howToFix && (
            <>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs md:text-sm text-indigo-600 dark:text-indigo-400 mt-2 hover:underline"
              >
                {isExpanded ? 'Hide details' : 'How to fix this?'}
              </button>
              {isExpanded && (
                <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg text-xs md:text-sm text-gray-700 dark:text-gray-300">
                  {suggestion.howToFix}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
