import { useState } from 'react';
import { performComprehensiveSEOAnalysis, SEOAnalysisResult, CategoryScore, SEOIssue } from '../../utils/powerfulSeoAnalyzer';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Powerful SEO Checker Component
 * Similar to Seobility - comprehensive SEO analysis
 */

// Sample HTML for demo
const SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Best Digital Marketing Agency in Bangladesh - OSPranto Tech</title>
  <meta name="description" content="OSPranto Tech is the leading digital marketing agency in Bangladesh. We offer SEO, web development, and social media marketing services.">
  <meta name="keywords" content="digital marketing, SEO, web development, Bangladesh">
  <link rel="canonical" href="https://ospranto.tech/">
  <meta property="og:title" content="OSPranto Tech - Digital Marketing Agency">
  <meta property="og:description" content="Leading digital marketing agency in Bangladesh">
  <meta property="og:image" content="https://ospranto.tech/og-image.jpg">
  <meta property="og:url" content="https://ospranto.tech/">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="OSPranto Tech - Digital Marketing Agency">
  <meta name="twitter:description" content="Leading digital marketing agency in Bangladesh">
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/services">Services</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>
  
  <main>
    <h1>Best Digital Marketing Agency in Bangladesh</h1>
    
    <p>Welcome to OSPranto Tech, the leading digital marketing agency in Bangladesh. We help businesses grow their online presence through strategic SEO, web development, and social media marketing services.</p>
    
    <h2>Our Services</h2>
    <p>We offer a comprehensive range of digital marketing services designed to help your business succeed online. Our team of experts uses the latest tools and techniques to deliver measurable results.</p>
    
    <ul>
      <li><strong>Search Engine Optimization (SEO)</strong> - Improve your website ranking</li>
      <li><strong>Web Development</strong> - Build modern, responsive websites</li>
      <li><strong>Social Media Marketing</strong> - Grow your social presence</li>
      <li><strong>Content Marketing</strong> - Create engaging content</li>
    </ul>
    
    <h2>Why Choose Us?</h2>
    <p>With years of experience in digital marketing, we understand what it takes to succeed online. Our data-driven approach ensures that every campaign is optimized for maximum results.</p>
    
    <h3>Our Expertise</h3>
    <p>Our team consists of certified professionals with expertise in all areas of digital marketing. We stay up-to-date with the latest industry trends and best practices.</p>
    
    <h3>Client Success</h3>
    <p>We have helped hundreds of businesses achieve their online goals. Our clients include small businesses, startups, and established enterprises across various industries.</p>
    
    <h2>Get Started Today</h2>
    <p>Ready to take your business to the next level? Contact us today for a free consultation and discover how we can help you achieve your digital marketing goals.</p>
    
    <img src="/team-photo.jpg" alt="OSPranto Tech Team - Digital Marketing Experts" width="800" height="400" loading="lazy">
  </main>
  
  <footer>
    <p>&copy; 2024 OSPranto Tech. All rights reserved.</p>
    <a href="https://github.com/OSPrantoTech" target="_blank" rel="noopener">GitHub</a>
    <a href="https://twitter.com/ospranto" target="_blank" rel="noopener">Twitter</a>
  </footer>
</body>
</html>`;

// Issue Card Component
function IssueCard({ issue }: { issue: SEOIssue }) {
  const [expanded, setExpanded] = useState(false);
  
  const categoryColors = {
    critical: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700',
    success: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700',
    info: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700'
  };
  
  const categoryIcons = {
    critical: '❌',
    warning: '⚠️',
    success: '✅',
    info: 'ℹ️'
  };
  
  const categoryLabels = {
    critical: 'Critical Issue',
    warning: 'Warning',
    success: 'Passed',
    info: 'Info'
  };

  return (
    <div className={`border rounded-lg p-3 sm:p-4 ${categoryColors[issue.category]} transition-all`}>
      <div 
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
          <span className="text-lg sm:text-xl flex-shrink-0">{categoryIcons[issue.category]}</span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                issue.category === 'critical' ? 'bg-red-500 text-white' :
                issue.category === 'warning' ? 'bg-yellow-500 text-black' :
                issue.category === 'success' ? 'bg-green-500 text-white' :
                'bg-blue-500 text-white'
              }`}>
                {categoryLabels[issue.category]}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {issue.points}/{issue.maxPoints} points
              </span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{issue.title}</h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{issue.description}</p>
          </div>
        </div>
        <button className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0">
          {expanded ? '▲' : '▼'}
        </button>
      </div>
      
      {expanded && issue.howToFix && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">💡 How to Fix:</p>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-2 sm:p-3 rounded">
            {issue.howToFix}
          </p>
        </div>
      )}
    </div>
  );
}

// Category Section Component
function CategorySection({ category, defaultOpen = false }: { category: CategoryScore; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    if (percentage >= 40) return 'text-orange-500';
    return 'text-red-500';
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const criticalCount = category.issues.filter(i => i.category === 'critical').length;
  const warningCount = category.issues.filter(i => i.category === 'warning').length;
  const passedCount = category.issues.filter(i => i.category === 'success').length;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <span className="text-xl sm:text-2xl flex-shrink-0">{category.icon}</span>
          <div className="text-left min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{category.name}</h3>
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 text-xs">
              {criticalCount > 0 && (
                <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 sm:px-2 py-0.5 rounded">
                  {criticalCount} critical
                </span>
              )}
              {warningCount > 0 && (
                <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-1.5 sm:px-2 py-0.5 rounded">
                  {warningCount} warning
                </span>
              )}
              <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-1.5 sm:px-2 py-0.5 rounded">
                {passedCount} passed
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div className="text-right">
            <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(category.percentage)}`}>
              {category.percentage}%
            </span>
          </div>
          <div className="w-16 sm:w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden hidden sm:block">
            <div 
              className={`h-full ${getProgressColor(category.percentage)} transition-all duration-500`}
              style={{ width: `${category.percentage}%` }}
            />
          </div>
          <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
        </div>
      </button>
      
      {isOpen && (
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 bg-white dark:bg-gray-900">
          {category.issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}

// Main Component
export default function PowerfulSEOChecker() {
  const [url, setUrl] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [inputMode, setInputMode] = useState<'url' | 'html'>('url');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SEOAnalysisResult | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'warnings' | 'passed' | 'info'>('all');

  const handleAnalyze = async () => {
    setError('');
    setResult(null);
    setIsAnalyzing(true);

    try {
      let htmlToAnalyze = '';
      let urlToUse = '';

      if (inputMode === 'url') {
        if (!url.trim()) {
          throw new Error('Please enter a URL');
        }
        urlToUse = url.startsWith('http') ? url : `https://${url}`;
        
        // Try to fetch the page using a CORS proxy
        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlToUse)}`;
          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error('Failed to fetch page');
          htmlToAnalyze = await response.text();
        } catch {
          // If fetch fails, use sample HTML for demo
          setError('⚠️ Could not fetch the URL due to CORS restrictions. Showing demo analysis instead.');
          htmlToAnalyze = SAMPLE_HTML;
          urlToUse = 'https://ospranto.tech';
        }
      } else {
        if (!htmlContent.trim()) {
          throw new Error('Please enter HTML content');
        }
        htmlToAnalyze = htmlContent;
        urlToUse = 'https://example.com';
      }

      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const analysisResult = performComprehensiveSEOAnalysis(htmlToAnalyze, urlToUse);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadDemo = () => {
    setHtmlContent(SAMPLE_HTML);
    setInputMode('html');
  };

  const getGradeDescription = (grade: string) => {
    switch (grade) {
      case 'A+': return 'Excellent! Your page is well-optimized for SEO.';
      case 'A': return 'Great job! Minor improvements can make it even better.';
      case 'B': return 'Good! There are some areas that need attention.';
      case 'C': return 'Average. Several improvements are recommended.';
      case 'D': return 'Needs work. Multiple issues should be addressed.';
      default: return 'Critical issues found. Immediate action required.';
    }
  };

  const filteredCategories = result ? Object.values(result.categories).filter(cat => {
    if (activeTab === 'all') return true;
    if (activeTab === 'critical') return cat.issues.some(i => i.category === 'critical');
    if (activeTab === 'warnings') return cat.issues.some(i => i.category === 'warning');
    if (activeTab === 'passed') return cat.issues.some(i => i.category === 'success');
    if (activeTab === 'info') return cat.issues.some(i => i.category === 'info');
    return true;
  }) : [];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🔍 Powerful SEO Checker
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Comprehensive SEO analysis similar to Seobility. Get detailed reports with actionable fixes.
        </p>
      </div>

      {/* Input Section */}
      <Card className="p-4 sm:p-6">
        {/* Input Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInputMode('url')}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all ${
              inputMode === 'url'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🌐 Enter URL
          </button>
          <button
            onClick={() => setInputMode('html')}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base font-medium transition-all ${
              inputMode === 'html'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            📝 Paste HTML
          </button>
        </div>

        {inputMode === 'url' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm sm:text-base"
            />
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
              💡 Due to browser restrictions, some websites may not load. Use "Paste HTML" for guaranteed analysis.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                HTML Content
              </label>
              <button
                onClick={loadDemo}
                className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
              >
                📄 Load Demo HTML
              </button>
            </div>
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Paste your HTML code here..."
              rows={8}
              className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-xs sm:text-sm"
            />
          </div>
        )}

        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full mt-4 py-3 sm:py-4 text-base sm:text-lg"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Analyzing...
            </span>
          ) : (
            '🔍 Analyze SEO'
          )}
        </Button>

        {error && (
          <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-200 text-sm">
            {error}
          </div>
        )}
      </Card>

      {/* Results Section */}
      {result && (
        <div className="space-y-4 sm:space-y-6">
          {/* Overall Score Card */}
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Score Circle */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke="currentColor"
                      className="text-gray-200 dark:text-gray-700"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="45%"
                      fill="none"
                      stroke={result.gradeColor}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${result.overallScore * 2.83} 283`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span 
                      className="text-3xl sm:text-4xl font-bold"
                      style={{ color: result.gradeColor }}
                    >
                      {result.grade}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {result.overallScore}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* Score Details */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  SEO Score: {result.overallScore}%
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                  {getGradeDescription(result.grade)}
                </p>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 p-2 sm:p-3 rounded-lg text-center">
                    <div className="text-lg sm:text-2xl font-bold text-red-500">{result.summary.critical}</div>
                    <div className="text-xs text-red-600 dark:text-red-400">Critical</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 sm:p-3 rounded-lg text-center">
                    <div className="text-lg sm:text-2xl font-bold text-yellow-500">{result.summary.warnings}</div>
                    <div className="text-xs text-yellow-600 dark:text-yellow-400">Warnings</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 sm:p-3 rounded-lg text-center">
                    <div className="text-lg sm:text-2xl font-bold text-green-500">{result.summary.passed}</div>
                    <div className="text-xs text-green-600 dark:text-green-400">Passed</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 rounded-lg text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-500">{result.summary.info}</div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Info</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Page Info */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">📋 Page Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Title</div>
                <div className="font-medium text-gray-900 dark:text-white truncate" title={result.pageInfo.title}>
                  {result.pageInfo.title}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">URL</div>
                <div className="font-medium text-gray-900 dark:text-white truncate" title={result.pageInfo.url}>
                  {result.pageInfo.url}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Word Count</div>
                <div className="font-medium text-gray-900 dark:text-white">{result.pageInfo.wordCount} words</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Page Size</div>
                <div className="font-medium text-gray-900 dark:text-white">{result.pageInfo.pageSize}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg sm:col-span-2">
                <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Description</div>
                <div className="font-medium text-gray-900 dark:text-white text-xs line-clamp-2" title={result.pageInfo.description}>
                  {result.pageInfo.description}
                </div>
              </div>
            </div>
          </Card>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {(['all', 'critical', 'warnings', 'passed', 'info'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tab === 'all' && '📊 All Categories'}
                {tab === 'critical' && `❌ Critical (${result.summary.critical})`}
                {tab === 'warnings' && `⚠️ Warnings (${result.summary.warnings})`}
                {tab === 'passed' && `✅ Passed (${result.summary.passed})`}
                {tab === 'info' && `ℹ️ Info (${result.summary.info})`}
              </button>
            ))}
          </div>

          {/* Category Sections */}
          <div className="space-y-3 sm:space-y-4">
            {filteredCategories.map((category, index) => (
              <CategorySection 
                key={category.name} 
                category={category}
                defaultOpen={index === 0}
              />
            ))}
          </div>

          {/* Export/Share Section */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">📤 Export Report</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  const text = `SEO Analysis Report\n\nURL: ${result.pageInfo.url}\nScore: ${result.overallScore}/100 (Grade: ${result.grade})\n\nSummary:\n- Critical Issues: ${result.summary.critical}\n- Warnings: ${result.summary.warnings}\n- Passed: ${result.summary.passed}\n- Info: ${result.summary.info}\n\nAnalyzed by SEO Buddy - OSPranto Tech`;
                  navigator.clipboard.writeText(text);
                  alert('Report copied to clipboard!');
                }}
                className="text-sm"
              >
                📋 Copy Summary
              </Button>
              <Button
                variant="secondary"
                onClick={() => window.print()}
                className="text-sm"
              >
                🖨️ Print Report
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Help Section */}
      {!result && (
        <Card className="p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3">💡 How This Works</h3>
          <div className="grid gap-3 sm:gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">1️⃣</span>
              <div>
                <strong className="text-gray-900 dark:text-white">Enter URL or Paste HTML</strong>
                <p className="text-xs sm:text-sm">Provide a website URL or paste your HTML code directly for analysis.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">2️⃣</span>
              <div>
                <strong className="text-gray-900 dark:text-white">Get Comprehensive Analysis</strong>
                <p className="text-xs sm:text-sm">We check 10 SEO categories including meta tags, content, headings, images, links, and more.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">3️⃣</span>
              <div>
                <strong className="text-gray-900 dark:text-white">Fix Issues with Guidance</strong>
                <p className="text-xs sm:text-sm">Each issue comes with clear explanations and step-by-step fix instructions.</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
