import { useState } from 'react';
import { Card } from '../ui/Card';

export function SERPPreview() {
  const [title, setTitle] = useState('Your Page Title - Brand Name');
  const [url, setUrl] = useState('https://example.com/page');
  const [description, setDescription] = useState('This is your meta description. It should be compelling and include your main keywords to encourage clicks from search results.');
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');

  const truncate = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          👁️ SERP Preview
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          See how your page looks in Google search results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 Edit Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Page Title ({title.length}/60)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={70}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className={`h-1 mt-1 rounded ${title.length <= 60 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, (title.length / 60) * 100)}%` }} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Description ({description.length}/160)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={200}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className={`h-1 mt-1 rounded ${description.length <= 160 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, (description.length / 160) * 100)}%` }} />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setView('desktop')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${view === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              🖥️ Desktop
            </button>
            <button
              onClick={() => setView('mobile')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${view === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
            >
              📱 Mobile
            </button>
          </div>

          <Card className="p-4 sm:p-6 bg-white dark:bg-gray-800">
            <h3 className="text-sm text-gray-500 mb-4">Google Search Preview</h3>
            
            <div className={`${view === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">
                    {url.replace('https://', '').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm text-gray-800 dark:text-gray-200">
                      {url.replace('https://', '').replace('http://', '').split('/')[0]}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{url}</div>
                  </div>
                </div>
                
                <h3 className="text-xl text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                  {truncate(title, view === 'mobile' ? 55 : 60)}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {truncate(description, view === 'mobile' ? 120 : 160)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-green-50 dark:bg-green-900/20">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">💡 Tips</h3>
            <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
              <li>• Keep title under 60 characters</li>
              <li>• Description should be 150-160 characters</li>
              <li>• Include primary keyword in title</li>
              <li>• Make it compelling to increase CTR</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
