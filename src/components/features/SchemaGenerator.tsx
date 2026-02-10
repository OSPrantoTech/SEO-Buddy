import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState('Article');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    headline: 'How to Improve Your Website SEO',
    description: 'Learn the best practices for improving your website SEO and ranking higher on Google.',
    author: 'John Doe',
    datePublished: '2024-01-15',
    image: 'https://example.com/image.jpg',
    url: 'https://example.com/article'
  });

  const schemaTypes = ['Article', 'LocalBusiness', 'Product', 'FAQ', 'Person', 'Event', 'Organization', 'WebSite'];

  const generateSchema = () => {
    switch (schemaType) {
      case 'Article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": formData.headline,
          "description": formData.description,
          "author": { "@type": "Person", "name": formData.author },
          "datePublished": formData.datePublished,
          "image": formData.image,
          "url": formData.url
        };
      case 'LocalBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": formData.headline,
          "description": formData.description,
          "image": formData.image,
          "url": formData.url
        };
      case 'Product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": formData.headline,
          "description": formData.description,
          "image": formData.image,
          "url": formData.url
        };
      default:
        return {
          "@context": "https://schema.org",
          "@type": schemaType,
          "name": formData.headline,
          "description": formData.description
        };
    }
  };

  const schemaJson = JSON.stringify(generateSchema(), null, 2);

  const copyToClipboard = () => {
    const scriptTag = `<script type="application/ld+json">\n${schemaJson}\n</script>`;
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          📋 Schema Generator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Generate structured data (JSON-LD) for rich snippets
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">⚙️ Configure Schema</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Schema Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {schemaTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSchemaType(type)}
                    className={`px-3 py-2 text-sm rounded-lg ${schemaType === type ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title/Headline</label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({...formData, headline: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.datePublished}
                  onChange={(e) => setFormData({...formData, datePublished: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Page URL</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📄 Generated Schema</h2>
              <Button onClick={copyToClipboard} size="sm">
                {copied ? '✅ Copied!' : '📋 Copy'}
              </Button>
            </div>
            
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm max-h-96">
              {`<script type="application/ld+json">\n${schemaJson}\n</script>`}
            </pre>
          </Card>

          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 How to Use</h3>
            <ol className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-decimal list-inside">
              <li>Copy the generated code</li>
              <li>Paste it in your HTML &lt;head&gt; section</li>
              <li>Test with Google's Rich Results Test</li>
              <li>Wait for Google to crawl your page</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
