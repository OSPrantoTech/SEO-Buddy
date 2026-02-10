import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Image SEO Checker Component
 * Analyze images for SEO optimization
 */
export function ImageSEO() {
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [fileName, setFileName] = useState('');
  const [analysis, setAnalysis] = useState<{
    score: number;
    issues: { type: 'success' | 'warning' | 'error'; title: string; message: string }[];
    suggestions: string[];
    optimizedAlt: string;
    optimizedFileName: string;
  } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const analyzeImage = () => {
    const issues: { type: 'success' | 'warning' | 'error'; title: string; message: string }[] = [];
    const suggestions: string[] = [];
    let score = 100;

    // Analyze alt text
    if (!altText.trim()) {
      score -= 30;
      issues.push({
        type: 'error',
        title: 'Missing Alt Text',
        message: 'Alt text is crucial for SEO and accessibility. Search engines use it to understand image content.'
      });
      suggestions.push('Add descriptive alt text that explains what the image shows');
    } else if (altText.length < 10) {
      score -= 15;
      issues.push({
        type: 'warning',
        title: 'Alt Text Too Short',
        message: 'Your alt text is very short. More descriptive alt text helps SEO.'
      });
      suggestions.push('Expand your alt text to be more descriptive (10-125 characters)');
    } else if (altText.length > 125) {
      score -= 10;
      issues.push({
        type: 'warning',
        title: 'Alt Text Too Long',
        message: 'Alt text is quite long. Keep it concise but descriptive.'
      });
    } else {
      issues.push({
        type: 'success',
        title: 'Good Alt Text Length',
        message: 'Your alt text length is optimal for SEO.'
      });
    }

    // Check for keyword stuffing in alt
    if (altText.toLowerCase().includes('image of') || altText.toLowerCase().includes('picture of')) {
      score -= 5;
      issues.push({
        type: 'warning',
        title: 'Avoid Redundant Phrases',
        message: 'Don\'t start alt text with "image of" or "picture of" - it\'s already an image!'
      });
    }

    // Analyze file name
    if (!fileName.trim()) {
      score -= 20;
      issues.push({
        type: 'error',
        title: 'Missing File Name',
        message: 'Enter your image file name to analyze it.'
      });
    } else {
      const cleanFileName = fileName.toLowerCase();
      
      // Check for generic names
      if (/^(img|image|photo|picture|dsc|screenshot|untitled|\d+)/.test(cleanFileName)) {
        score -= 15;
        issues.push({
          type: 'error',
          title: 'Generic File Name',
          message: 'Generic file names like "IMG_001.jpg" hurt SEO. Use descriptive names.'
        });
        suggestions.push('Rename your file with descriptive keywords');
      } else {
        issues.push({
          type: 'success',
          title: 'Descriptive File Name',
          message: 'Your file name appears to be descriptive.'
        });
      }

      // Check for spaces
      if (cleanFileName.includes(' ')) {
        score -= 10;
        issues.push({
          type: 'warning',
          title: 'Spaces in File Name',
          message: 'Use hyphens instead of spaces in image file names.'
        });
        suggestions.push('Replace spaces with hyphens (-)');
      }

      // Check for underscores
      if (cleanFileName.includes('_')) {
        score -= 5;
        issues.push({
          type: 'warning',
          title: 'Underscores in File Name',
          message: 'Google treats hyphens as word separators but not underscores.'
        });
        suggestions.push('Replace underscores with hyphens for better SEO');
      }

      // Check format
      const format = cleanFileName.split('.').pop();
      if (!['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'].includes(format || '')) {
        score -= 10;
        issues.push({
          type: 'warning',
          title: 'Unknown Image Format',
          message: 'Use modern formats like WebP or AVIF for better performance.'
        });
      } else if (format === 'webp' || format === 'avif') {
        issues.push({
          type: 'success',
          title: 'Modern Image Format',
          message: 'Great! You\'re using a modern, optimized format.'
        });
      } else if (format === 'png' || format === 'jpg' || format === 'jpeg') {
        suggestions.push('Consider converting to WebP for 25-50% smaller file size');
      }
    }

    // Check image URL
    if (imageUrl) {
      if (!imageUrl.startsWith('https://')) {
        score -= 10;
        issues.push({
          type: 'warning',
          title: 'Not Using HTTPS',
          message: 'Use HTTPS URLs for images for better security and SEO.'
        });
      }

      if (imageUrl.length > 100) {
        suggestions.push('Consider using shorter, cleaner image URLs');
      }
    }

    // Generate optimized versions
    const keywords = altText.toLowerCase().split(' ').filter(w => w.length > 3).slice(0, 4);
    const optimizedFileName = keywords.join('-') + '.webp' || 'descriptive-image-name.webp';
    const optimizedAlt = altText || 'Add a descriptive alt text here';

    setAnalysis({
      score: Math.max(0, score),
      issues,
      suggestions,
      optimizedAlt,
      optimizedFileName
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          🖼️ Image SEO Checker
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Optimize your images for better search engine rankings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Form */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📝 Image Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL (optional - for preview)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImageLoaded(false);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* Image Preview */}
              {imageUrl && (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={altText || 'Preview'}
                    className="w-full h-48 object-cover"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageLoaded(false)}
                  />
                  {imageLoaded && (
                    <div className="p-2 bg-green-50 dark:bg-green-900/20 text-center text-sm text-green-600 dark:text-green-400">
                      ✅ Image loaded successfully
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Alt Text *
                </label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  placeholder="e.g., Golden retriever puppy playing in the park"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">{altText.length}/125 characters (recommended)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current File Name *
                </label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g., golden-retriever-puppy.jpg"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <Button onClick={analyzeImage} className="w-full">
                🔍 Analyze Image SEO
              </Button>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Image SEO Best Practices</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>✅ Use descriptive, keyword-rich file names</li>
              <li>✅ Always add alt text to every image</li>
              <li>✅ Use hyphens to separate words in file names</li>
              <li>✅ Compress images for faster loading</li>
              <li>✅ Use WebP or AVIF format for smaller sizes</li>
              <li>✅ Add images to your sitemap</li>
            </ul>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {analysis ? (
            <>
              {/* Score Card */}
              <Card className="p-6 text-center">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Image SEO Score
                </h3>
                <div className={`text-6xl font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}
                </div>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {analysis.score >= 80 ? 'Excellent!' : analysis.score >= 60 ? 'Needs Improvement' : 'Poor - Fix Issues'}
                </div>
                
                {/* Progress bar */}
                <div className="mt-4 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreBg(analysis.score)} transition-all duration-500`}
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
              </Card>

              {/* Issues */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🔍 Analysis Results
                </h3>
                <div className="space-y-3">
                  {analysis.issues.map((issue, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg ${
                        issue.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' :
                        issue.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500' :
                        'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>
                          {issue.type === 'success' ? '✅' : issue.type === 'warning' ? '⚠️' : '❌'}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">{issue.title}</span>
                      </div>
                      <p className={`text-sm mt-1 ml-6 ${
                        issue.type === 'success' ? 'text-green-700 dark:text-green-400' :
                        issue.type === 'warning' ? 'text-yellow-700 dark:text-yellow-400' :
                        'text-red-700 dark:text-red-400'
                      }`}>
                        {issue.message}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <Card className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-3">
                    💡 Improvement Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-purple-700 dark:text-purple-400">
                        <span>→</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {/* Optimized Versions */}
              <Card className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  ✨ Optimized Suggestions
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Suggested File Name
                    </label>
                    <div className="flex gap-2">
                      <code className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-800 dark:text-gray-200">
                        {analysis.optimizedFileName}
                      </code>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => navigator.clipboard.writeText(analysis.optimizedFileName)}
                      >
                        📋
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-8 text-center">
              <span className="text-6xl">🖼️</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
                No Analysis Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Enter your image details and click "Analyze Image SEO"
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
