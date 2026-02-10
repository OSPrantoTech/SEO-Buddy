import { useState } from 'react';
import { Card } from '../ui/Card';

/**
 * Social Media Preview Component
 * Preview how your page looks on social media platforms
 */
export function SocialPreview() {
  const [formData, setFormData] = useState({
    title: 'My Amazing Website - Best SEO Tools',
    description: 'Discover powerful SEO tools to boost your website ranking. Free meta tags generator, keyword analyzer, and more!',
    url: 'https://example.com',
    image: 'https://via.placeholder.com/1200x630/3b82f6/ffffff?text=Your+Image+Here',
    siteName: 'Example Site',
    author: 'John Doe'
  });

  const [activeTab, setActiveTab] = useState<'google' | 'facebook' | 'twitter' | 'linkedin'>('google');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const truncate = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'example.com';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          👁️ Social Media Preview
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          See how your page will look on Google, Facebook, Twitter, and LinkedIn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Form */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📝 Enter Your Page Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Page Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                maxLength={70}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.title.length}/70 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/200 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL
              </label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URL (1200x630 recommended)
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Preview */}
        <div className="space-y-4">
          {/* Platform Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'google', label: '🔍 Google', color: 'bg-white' },
              { id: 'facebook', label: '📘 Facebook', color: 'bg-blue-600' },
              { id: 'twitter', label: '🐦 Twitter', color: 'bg-sky-500' },
              { id: 'linkedin', label: '💼 LinkedIn', color: 'bg-blue-700' }
            ].map((platform) => (
              <button
                key={platform.id}
                onClick={() => setActiveTab(platform.id as typeof activeTab)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  activeTab === platform.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {platform.label}
              </button>
            ))}
          </div>

          {/* Google Preview */}
          {activeTab === 'google' && (
            <Card className="p-4 sm:p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Google Search Result</h3>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-xs">
                    {formData.siteName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{formData.siteName}</p>
                    <p className="text-xs text-gray-500">{getDomain(formData.url)}</p>
                  </div>
                </div>
                <h4 className="text-lg text-blue-600 dark:text-blue-400 hover:underline cursor-pointer mt-2">
                  {truncate(formData.title, 60)}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {truncate(formData.description, 160)}
                </p>
              </div>
            </Card>
          )}

          {/* Facebook Preview */}
          {activeTab === 'facebook' && (
            <Card className="p-4 sm:p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Facebook Share</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-w-md">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x630/e5e7eb/9ca3af?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">{getDomain(formData.url)}</p>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mt-1">
                    {truncate(formData.title, 65)}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {truncate(formData.description, 110)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Twitter Preview */}
          {activeTab === 'twitter' && (
            <Card className="p-4 sm:p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Twitter Card</h3>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-md">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x630/e5e7eb/9ca3af?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {truncate(formData.title, 55)}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {truncate(formData.description, 125)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center gap-1">
                    🔗 {getDomain(formData.url)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* LinkedIn Preview */}
          {activeTab === 'linkedin' && (
            <Card className="p-4 sm:p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">LinkedIn Share</h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-w-md">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x630/e5e7eb/9ca3af?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {truncate(formData.title, 100)}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {getDomain(formData.url)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Tips */}
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">💡 Optimization Tips</h3>
            <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
              <li>• Use images at least 1200x630px for best display</li>
              <li>• Keep titles under 60 characters for Google</li>
              <li>• Write compelling descriptions with keywords</li>
              <li>• Include your brand name in the title</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
