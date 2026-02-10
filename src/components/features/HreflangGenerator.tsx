import { useState } from 'react';
import { Card } from '../ui/Card';

interface HreflangEntry {
  id: string;
  language: string;
  region: string;
  url: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'Bengali/Bangla' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
];

const regions = [
  { code: '', name: 'All Regions' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'IN', name: 'India' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
];

export function HreflangGenerator() {
  const [entries, setEntries] = useState<HreflangEntry[]>([
    { id: '1', language: 'en', region: 'US', url: 'https://example.com/page' },
    { id: '2', language: 'en', region: 'GB', url: 'https://example.com/uk/page' },
  ]);
  const [defaultUrl, setDefaultUrl] = useState('https://example.com/page');
  const [copied, setCopied] = useState(false);

  const addEntry = () => {
    setEntries([
      ...entries,
      { id: Date.now().toString(), language: 'en', region: '', url: '' }
    ]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const updateEntry = (id: string, field: keyof HreflangEntry, value: string) => {
    setEntries(entries.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const generateHreflangCode = (entry: HreflangEntry) => {
    const hreflang = entry.region 
      ? `${entry.language}-${entry.region}` 
      : entry.language;
    return hreflang;
  };

  const generateTags = () => {
    const tags = entries
      .filter(e => e.url)
      .map(e => `<link rel="alternate" hreflang="${generateHreflangCode(e)}" href="${e.url}" />`);
    
    if (defaultUrl) {
      tags.push(`<link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`);
    }
    
    return tags.join('\n');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">🌍 Hreflang Tag Generator</h1>
        <p className="text-teal-100 text-sm sm:text-base">
          Multi-language ও multi-region SEO এর জন্য hreflang tags তৈরি করুন
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">🔗 Language Versions</h3>
              <button
                onClick={addEntry}
                className="px-3 py-1 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
              >
                + Add
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {entries.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Version #{index + 1}
                    </span>
                    {entries.length > 1 && (
                      <button
                        onClick={() => removeEntry(entry.id)}
                        className="text-red-500 hover:text-red-600 text-sm"
                      >
                        ✕ Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={entry.language}
                      onChange={(e) => updateEntry(entry.id, 'language', e.target.value)}
                      className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                    
                    <select
                      value={entry.region}
                      onChange={(e) => updateEntry(entry.id, 'region', e.target.value)}
                      className="p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {regions.map(reg => (
                        <option key={reg.code} value={reg.code}>{reg.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <input
                    type="url"
                    value={entry.url}
                    onChange={(e) => updateEntry(entry.id, 'url', e.target.value)}
                    placeholder="https://example.com/page"
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  
                  <div className="text-xs text-teal-600 dark:text-teal-400 font-mono">
                    hreflang="{generateHreflangCode(entry)}"
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🏠 Default URL (x-default)</h3>
            <input
              type="url"
              value={defaultUrl}
              onChange={(e) => setDefaultUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Users যাদের language match হয় না তাদের এই URL এ redirect করা হবে
            </p>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">✨ Generated Hreflang Tags</h3>
            
            <div className="p-4 bg-gray-900 rounded-lg overflow-x-auto">
              <pre className="text-xs sm:text-sm text-green-400 whitespace-pre-wrap">
                {generateTags() || '<!-- Add language versions to generate tags -->'}
              </pre>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full mt-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
            >
              {copied ? '✅ Copied!' : '📋 Copy All Tags'}
            </button>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
            <h3 className="font-semibold text-teal-800 dark:text-teal-200 mb-3">📖 Hreflang কেন দরকার?</h3>
            <ul className="space-y-2 text-sm text-teal-700 dark:text-teal-300">
              <li>• একই content এর multiple language versions থাকলে</li>
              <li>• একই language এর different regional versions থাকলে</li>
              <li>• Google কে বলে কোন version কোন user কে দেখাবে</li>
              <li>• Duplicate content penalty এড়াতে সাহায্য করে</li>
              <li>• International SEO এর জন্য essential</li>
            </ul>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">⚠️ গুরুত্বপূর্ণ Tips</h3>
            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
              <li>• প্রতিটি page এ সব versions এর hreflang থাকতে হবে</li>
              <li>• Self-referencing tag অবশ্যই দিতে হবে</li>
              <li>• Reciprocal links থাকতে হবে (A → B এবং B → A)</li>
              <li>• x-default সবসময় যোগ করুন</li>
              <li>• Valid ISO language codes ব্যবহার করুন</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
