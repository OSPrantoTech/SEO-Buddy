import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';

type JsonTemplate = 'empty' | 'seo' | 'schema-article' | 'schema-product' | 'schema-faq' | 'schema-business' | 'manifest' | 'package' | 'tsconfig' | 'custom';

interface JsonField {
  id: string;
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'null';
}

export function JsonCreator() {
  const [template, setTemplate] = useState<JsonTemplate>('empty');
  const [fields, setFields] = useState<JsonField[]>([
    { id: '1', key: '', value: '', type: 'string' }
  ]);
  const [jsonOutput, setJsonOutput] = useState<string>('{}');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');
  const [rawMode, setRawMode] = useState(false);
  const [rawJson, setRawJson] = useState('{\n  \n}');

  const templates: { id: JsonTemplate; name: string; icon: string; description: string }[] = [
    { id: 'empty', name: 'Empty JSON', icon: '📄', description: 'Start from scratch' },
    { id: 'seo', name: 'SEO Config', icon: '🔍', description: 'SEO configuration file' },
    { id: 'schema-article', name: 'Article Schema', icon: '📝', description: 'JSON-LD for articles' },
    { id: 'schema-product', name: 'Product Schema', icon: '🛍️', description: 'JSON-LD for products' },
    { id: 'schema-faq', name: 'FAQ Schema', icon: '❓', description: 'JSON-LD for FAQs' },
    { id: 'schema-business', name: 'Business Schema', icon: '🏢', description: 'JSON-LD for local business' },
    { id: 'manifest', name: 'Web Manifest', icon: '📱', description: 'PWA manifest.json' },
    { id: 'package', name: 'Package.json', icon: '📦', description: 'NPM package file' },
    { id: 'tsconfig', name: 'TSConfig', icon: '⚙️', description: 'TypeScript config' },
    { id: 'custom', name: 'Custom Builder', icon: '🛠️', description: 'Build your own JSON' },
  ];

  const getTemplateJson = (templateId: JsonTemplate): string => {
    switch (templateId) {
      case 'seo':
        return JSON.stringify({
          siteName: "Your Website",
          siteUrl: "https://example.com",
          title: "Page Title - Your Brand",
          description: "Your meta description here (150-160 characters recommended)",
          keywords: ["keyword1", "keyword2", "keyword3"],
          author: "Your Name",
          image: "https://example.com/og-image.jpg",
          twitterHandle: "@yourhandle",
          locale: "en_US",
          robots: "index, follow"
        }, null, 2);

      case 'schema-article':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Article Title Here",
          "description": "Brief description of the article",
          "image": "https://example.com/article-image.jpg",
          "author": {
            "@type": "Person",
            "name": "Author Name",
            "url": "https://example.com/author"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Publisher Name",
            "logo": {
              "@type": "ImageObject",
              "url": "https://example.com/logo.png"
            }
          },
          "datePublished": new Date().toISOString().split('T')[0],
          "dateModified": new Date().toISOString().split('T')[0],
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://example.com/article-url"
          }
        }, null, 2);

      case 'schema-product':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Product Name",
          "description": "Product description here",
          "image": "https://example.com/product-image.jpg",
          "brand": {
            "@type": "Brand",
            "name": "Brand Name"
          },
          "sku": "SKU123456",
          "mpn": "MPN123456",
          "offers": {
            "@type": "Offer",
            "price": "99.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Seller Name"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "reviewCount": "100"
          }
        }, null, 2);

      case 'schema-faq':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is SEO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SEO stands for Search Engine Optimization. It is the practice of optimizing websites to rank higher in search engine results."
              }
            },
            {
              "@type": "Question",
              "name": "Why is SEO important?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SEO is important because it helps your website get more organic traffic from search engines, increasing visibility and potential customers."
              }
            },
            {
              "@type": "Question",
              "name": "How long does SEO take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "SEO typically takes 3-6 months to show significant results, depending on competition and the current state of your website."
              }
            }
          ]
        }, null, 2);

      case 'schema-business':
        return JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Business Name",
          "description": "Brief description of your business",
          "image": "https://example.com/business-image.jpg",
          "@id": "https://example.com",
          "url": "https://example.com",
          "telephone": "+1-234-567-8900",
          "email": "contact@example.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Main Street",
            "addressLocality": "City Name",
            "addressRegion": "State",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "40.7128",
            "longitude": "-74.0060"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "17:00"
            }
          ],
          "priceRange": "$$"
        }, null, 2);

      case 'manifest':
        return JSON.stringify({
          "name": "Your App Name",
          "short_name": "AppName",
          "description": "Description of your web application",
          "start_url": "/",
          "display": "standalone",
          "background_color": "#ffffff",
          "theme_color": "#3b82f6",
          "orientation": "portrait-primary",
          "icons": [
            {
              "src": "/icons/icon-72x72.png",
              "sizes": "72x72",
              "type": "image/png"
            },
            {
              "src": "/icons/icon-96x96.png",
              "sizes": "96x96",
              "type": "image/png"
            },
            {
              "src": "/icons/icon-128x128.png",
              "sizes": "128x128",
              "type": "image/png"
            },
            {
              "src": "/icons/icon-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
            },
            {
              "src": "/icons/icon-512x512.png",
              "sizes": "512x512",
              "type": "image/png"
            }
          ]
        }, null, 2);

      case 'package':
        return JSON.stringify({
          "name": "my-project",
          "version": "1.0.0",
          "description": "Project description here",
          "main": "index.js",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview",
            "test": "vitest"
          },
          "keywords": ["keyword1", "keyword2"],
          "author": "Your Name <email@example.com>",
          "license": "MIT",
          "dependencies": {},
          "devDependencies": {}
        }, null, 2);

      case 'tsconfig':
        return JSON.stringify({
          "compilerOptions": {
            "target": "ES2020",
            "useDefineForClassFields": true,
            "lib": ["ES2020", "DOM", "DOM.Iterable"],
            "module": "ESNext",
            "skipLibCheck": true,
            "moduleResolution": "bundler",
            "allowImportingTsExtensions": true,
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "react-jsx",
            "strict": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "noFallthroughCasesInSwitch": true
          },
          "include": ["src"],
          "references": [{ "path": "./tsconfig.node.json" }]
        }, null, 2);

      case 'custom':
        return '{\n  \n}';

      default:
        return '{}';
    }
  };

  const handleTemplateChange = (templateId: JsonTemplate) => {
    setTemplate(templateId);
    const json = getTemplateJson(templateId);
    setRawJson(json);
    setJsonOutput(json);
    setError('');
  };

  const addField = () => {
    const newId = Date.now().toString();
    setFields([...fields, { id: newId, key: '', value: '', type: 'string' }]);
  };

  const removeField = (id: string) => {
    if (fields.length > 1) {
      setFields(fields.filter(f => f.id !== id));
    }
  };

  const updateField = (id: string, updates: Partial<JsonField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const buildJsonFromFields = () => {
    try {
      const obj: Record<string, unknown> = {};
      fields.forEach(field => {
        if (field.key.trim()) {
          let value: unknown = field.value;
          switch (field.type) {
            case 'number':
              value = parseFloat(field.value) || 0;
              break;
            case 'boolean':
              value = field.value.toLowerCase() === 'true';
              break;
            case 'array':
              try {
                value = JSON.parse(field.value);
              } catch {
                value = field.value.split(',').map(s => s.trim());
              }
              break;
            case 'object':
              try {
                value = JSON.parse(field.value);
              } catch {
                value = {};
              }
              break;
            case 'null':
              value = null;
              break;
            default:
              value = field.value;
          }
          obj[field.key] = value;
        }
      });
      const json = JSON.stringify(obj, null, 2);
      setJsonOutput(json);
      setError('');
    } catch (err) {
      setError('Invalid JSON structure');
    }
  };

  const validateAndFormatJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setRawJson(formatted);
      setJsonOutput(formatted);
      setError('');
    } catch (err) {
      setError('Invalid JSON syntax. Please check your code.');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(rawJson);
      const minified = JSON.stringify(parsed);
      setRawJson(minified);
      setJsonOutput(minified);
      setError('');
    } catch (err) {
      setError('Invalid JSON syntax. Please check your code.');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadJson = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Set filename based on template
    let filename = 'data.json';
    if (template === 'manifest') filename = 'manifest.json';
    else if (template === 'package') filename = 'package.json';
    else if (template === 'tsconfig') filename = 'tsconfig.json';
    else if (template.startsWith('schema')) filename = 'schema.json';
    else if (template === 'seo') filename = 'seo-config.json';
    
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">📋</span> JSON File Creator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Create JSON files for SEO, configs, and more
          </p>
        </div>
        <Tooltip content="JSON files are used for configuration, structured data, and data exchange">
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
            💡 What is JSON?
          </span>
        </Tooltip>
      </div>

      {/* Templates */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📂 Choose Template
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
          {templates.map(t => (
            <button
              key={t.id}
              onClick={() => handleTemplateChange(t.id)}
              className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                template === t.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <div className="text-xl sm:text-2xl mb-1">{t.icon}</div>
              <div className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white">{t.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{t.description}</div>
            </button>
          ))}
        </div>
      </Card>

      {/* Mode Toggle */}
      <div className="flex gap-2">
        <Button
          variant={!rawMode ? 'primary' : 'secondary'}
          onClick={() => setRawMode(false)}
          className="text-sm"
        >
          ✏️ Visual Editor
        </Button>
        <Button
          variant={rawMode ? 'primary' : 'secondary'}
          onClick={() => setRawMode(true)}
          className="text-sm"
        >
          💻 Code Editor
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Editor */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            {rawMode ? '💻 Code Editor' : '✏️ Visual Editor'}
          </h2>

          {rawMode ? (
            <div className="space-y-4">
              <textarea
                value={rawJson}
                onChange={(e) => {
                  setRawJson(e.target.value);
                  setJsonOutput(e.target.value);
                }}
                className="w-full h-64 sm:h-96 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter your JSON here..."
                spellCheck={false}
              />
              <div className="flex flex-wrap gap-2">
                <Button onClick={validateAndFormatJson} variant="secondary" className="text-sm">
                  ✨ Format & Validate
                </Button>
                <Button onClick={minifyJson} variant="secondary" className="text-sm">
                  📦 Minify
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {template === 'custom' ? (
                <>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {fields.map((field) => (
                      <div key={field.id} className="flex flex-wrap gap-2 items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-1 min-w-[120px]">
                          <input
                            type="text"
                            value={field.key}
                            onChange={(e) => updateField(field.id, { key: e.target.value })}
                            placeholder="Key name"
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div className="w-24">
                          <select
                            value={field.type}
                            onChange={(e) => updateField(field.id, { type: e.target.value as JsonField['type'] })}
                            className="w-full px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="array">Array</option>
                            <option value="object">Object</option>
                            <option value="null">Null</option>
                          </select>
                        </div>
                        <div className="flex-1 min-w-[120px]">
                          {field.type === 'boolean' ? (
                            <select
                              value={field.value}
                              onChange={(e) => updateField(field.id, { value: e.target.value })}
                              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          ) : (
                            <input
                              type={field.type === 'number' ? 'number' : 'text'}
                              value={field.value}
                              onChange={(e) => updateField(field.id, { value: e.target.value })}
                              placeholder={field.type === 'array' ? '["item1", "item2"]' : 'Value'}
                              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          )}
                        </div>
                        <button
                          onClick={() => removeField(field.id)}
                          className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg"
                          disabled={fields.length === 1}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={addField} variant="secondary" className="text-sm">
                      ➕ Add Field
                    </Button>
                    <Button onClick={buildJsonFromFields} variant="primary" className="text-sm">
                      🔨 Build JSON
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      💡 <strong>Tip:</strong> Edit the template in the Code Editor mode, or switch to "Custom Builder" to build from scratch.
                    </p>
                  </div>
                  <Button onClick={() => setRawMode(true)} variant="primary" className="w-full">
                    💻 Edit in Code Editor
                  </Button>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm">
              ❌ {error}
            </div>
          )}
        </Card>

        {/* Preview & Output */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              📄 Output Preview
            </h2>
            <div className="flex gap-2">
              <Button onClick={copyToClipboard} variant="secondary" className="text-sm">
                {copied ? '✅ Copied!' : '📋 Copy'}
              </Button>
              <Button onClick={downloadJson} variant="primary" className="text-sm">
                ⬇️ Download
              </Button>
            </div>
          </div>

          <div className="relative">
            <pre className="p-4 bg-gray-900 text-green-400 rounded-lg overflow-x-auto text-xs sm:text-sm max-h-80 sm:max-h-96">
              <code>{jsonOutput}</code>
            </pre>
          </div>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-blue-600">{jsonOutput.length}</div>
              <div className="text-xs text-gray-500">Characters</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-green-600">
                {jsonOutput.split('\n').length}
              </div>
              <div className="text-xs text-gray-500">Lines</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
              <div className="text-lg sm:text-xl font-bold text-purple-600">
                {(new TextEncoder().encode(jsonOutput).length / 1024).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">KB Size</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Usage Guide */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📚 How to Use JSON Files for SEO
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Schema.org (JSON-LD)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add structured data to your pages for rich snippets in Google search results.
            </p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Web Manifest</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Make your website installable as a PWA with proper icons and theme colors.
            </p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Config Files</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create configuration files for your projects like package.json and tsconfig.json.
            </p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl mb-2">🔄</div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">API Responses</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Design and test JSON structures for API endpoints and data exchange.
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          💡 JSON Tips for Beginners
        </h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Keys</strong> must be in double quotes: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">"name"</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Strings</strong> use double quotes: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">"Hello World"</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Numbers</strong> don't need quotes: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">42</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">3.14</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Booleans</strong> are lowercase: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">true</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">false</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>Arrays</strong> use square brackets: <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">["item1", "item2"]</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span><strong>No trailing commas</strong> allowed after the last item!</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
