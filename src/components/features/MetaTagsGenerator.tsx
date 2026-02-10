import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Meta Tags Generator Component
 * Generate complete meta tags for your website
 */
export function MetaTagsGenerator() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    robots: 'index, follow',
    canonical: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '',
    twitterCreator: '',
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',
    language: 'en',
    themeColor: '#3b82f6',
    favicon: '/favicon.ico'
  });

  const [generatedTags, setGeneratedTags] = useState('');
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    const tags = `<!-- Basic Meta Tags -->
<meta charset="${formData.charset}">
<meta name="viewport" content="${formData.viewport}">
<title>${formData.title || 'Your Page Title'}</title>
<meta name="description" content="${formData.description || 'Your page description'}">
${formData.keywords ? `<meta name="keywords" content="${formData.keywords}">` : ''}
${formData.author ? `<meta name="author" content="${formData.author}">` : ''}
<meta name="robots" content="${formData.robots}">
${formData.canonical ? `<link rel="canonical" href="${formData.canonical}">` : ''}
<meta name="language" content="${formData.language}">
<meta name="theme-color" content="${formData.themeColor}">
${formData.favicon ? `<link rel="icon" href="${formData.favicon}">` : ''}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${formData.ogType}">
<meta property="og:title" content="${formData.ogTitle || formData.title || 'Your Page Title'}">
<meta property="og:description" content="${formData.ogDescription || formData.description || 'Your page description'}">
${formData.ogImage ? `<meta property="og:image" content="${formData.ogImage}">` : ''}
${formData.ogUrl ? `<meta property="og:url" content="${formData.ogUrl}">` : ''}

<!-- Twitter Card -->
<meta name="twitter:card" content="${formData.twitterCard}">
<meta name="twitter:title" content="${formData.ogTitle || formData.title || 'Your Page Title'}">
<meta name="twitter:description" content="${formData.ogDescription || formData.description || 'Your page description'}">
${formData.ogImage ? `<meta name="twitter:image" content="${formData.ogImage}">` : ''}
${formData.twitterSite ? `<meta name="twitter:site" content="${formData.twitterSite}">` : ''}
${formData.twitterCreator ? `<meta name="twitter:creator" content="${formData.twitterCreator}">` : ''}`;

    setGeneratedTags(tags);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          🏷️ Meta Tags Generator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Generate complete meta tags for better SEO and social sharing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Form */}
        <div className="space-y-4">
          {/* Basic SEO */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              📝 Basic SEO Tags
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Page Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My Awesome Website"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/60 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Meta Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="A brief description of your page..."
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="seo, marketing, website"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Robots
                  </label>
                  <select
                    name="robots"
                    value={formData.robots}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="index, follow">Index, Follow</option>
                    <option value="index, nofollow">Index, Nofollow</option>
                    <option value="noindex, follow">Noindex, Follow</option>
                    <option value="noindex, nofollow">Noindex, Nofollow</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Canonical URL
                </label>
                <input
                  type="url"
                  name="canonical"
                  value={formData.canonical}
                  onChange={handleChange}
                  placeholder="https://example.com/page"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </Card>

          {/* Open Graph */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              📘 Open Graph (Facebook/LinkedIn)
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  OG Title (leave empty to use page title)
                </label>
                <input
                  type="text"
                  name="ogTitle"
                  value={formData.ogTitle}
                  onChange={handleChange}
                  placeholder="Social media title"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  OG Image URL
                </label>
                <input
                  type="url"
                  name="ogImage"
                  value={formData.ogImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630 pixels</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    OG Type
                  </label>
                  <select
                    name="ogType"
                    value={formData.ogType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="website">Website</option>
                    <option value="article">Article</option>
                    <option value="product">Product</option>
                    <option value="profile">Profile</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    OG URL
                  </label>
                  <input
                    type="url"
                    name="ogUrl"
                    value={formData.ogUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Twitter */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              🐦 Twitter Card
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Type
                </label>
                <select
                  name="twitterCard"
                  value={formData.twitterCard}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="summary">Summary</option>
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="player">Player</option>
                  <option value="app">App</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    @site
                  </label>
                  <input
                    type="text"
                    name="twitterSite"
                    value={formData.twitterSite}
                    onChange={handleChange}
                    placeholder="@yoursite"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    @creator
                  </label>
                  <input
                    type="text"
                    name="twitterCreator"
                    value={formData.twitterCreator}
                    onChange={handleChange}
                    placeholder="@author"
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Additional */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              ⚙️ Additional Settings
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Theme Color
                </label>
                <input
                  type="color"
                  name="themeColor"
                  value={formData.themeColor}
                  onChange={handleChange}
                  className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="bn">Bengali</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
            </div>
          </Card>

          <Button onClick={generateTags} className="w-full">
            🏷️ Generate Meta Tags
          </Button>
        </div>

        {/* Generated Output */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                📄 Generated Meta Tags
              </h2>
              {generatedTags && (
                <Button onClick={copyToClipboard} variant="secondary" size="sm">
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </Button>
              )}
            </div>

            {generatedTags ? (
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm whitespace-pre-wrap">
                {generatedTags}
              </pre>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <span className="text-4xl">🏷️</span>
                <p className="mt-2">Fill the form and click "Generate Meta Tags"</p>
              </div>
            )}
          </Card>

          {/* Tips */}
          <Card className="p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">💡 Meta Tags Best Practices</h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
              <li>✅ Keep title under 60 characters</li>
              <li>✅ Keep description between 150-160 characters</li>
              <li>✅ Use unique titles for each page</li>
              <li>✅ Include primary keyword in title</li>
              <li>✅ Add OG image for better social sharing</li>
              <li>✅ Use canonical URL to avoid duplicate content</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
