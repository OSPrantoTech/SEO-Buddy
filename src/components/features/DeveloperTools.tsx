import { useState } from 'react';
import { 
  Wrench, Palette, FileJson, Binary, Key, Lock, Hash, Link2, 
  FileCode, FileText, Database, Image, Barcode, Code, Sparkles,
  ArrowRight
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  category: string;
}

interface DeveloperToolsProps {
  onNavigate?: (page: string) => void;
}

export default function DeveloperTools({ onNavigate }: DeveloperToolsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const tools: Tool[] = [
    // Formatters
    { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', icon: FileJson, color: 'from-yellow-500 to-orange-500', category: 'formatter' },
    { id: 'xml-formatter', name: 'XML Formatter', description: 'Format and beautify XML', icon: FileCode, color: 'from-orange-500 to-red-500', category: 'formatter' },
    { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', icon: Database, color: 'from-blue-600 to-indigo-600', category: 'formatter' },
    { id: 'markdown-formatter', name: 'Markdown Formatter', description: 'Format and preview Markdown', icon: FileText, color: 'from-gray-600 to-gray-800', category: 'formatter' },
    
    // Converters
    { id: 'base64', name: 'Base64 Converter', description: 'Encode/decode Base64', icon: Binary, color: 'from-cyan-500 to-blue-500', category: 'converter' },
    { id: 'json-to-go', name: 'JSON to Go', description: 'Convert JSON to Go structs', icon: Code, color: 'from-cyan-500 to-blue-500', category: 'converter' },
    { id: 'url-cleaner', name: 'URL Cleaner', description: 'Clean tracking params from URLs', icon: Link2, color: 'from-teal-500 to-cyan-500', category: 'converter' },
    
    // Security
    { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA hashes', icon: Hash, color: 'from-violet-500 to-purple-500', category: 'security' },
    { id: 'password-generator', name: 'Password Generator', description: 'Generate strong passwords', icon: Lock, color: 'from-green-500 to-teal-500', category: 'security' },
    { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT tokens', icon: Key, color: 'from-amber-500 to-red-500', category: 'security' },
    
    // Generators
    { id: 'color-picker', name: 'Color Picker', description: 'Pick colors, get all formats', icon: Palette, color: 'from-pink-500 to-purple-500', category: 'generator' },
    { id: 'favicon-generator', name: 'Favicon Generator', description: 'Create website favicons', icon: Image, color: 'from-pink-500 to-rose-500', category: 'generator' },
    { id: 'barcode-generator', name: 'Barcode Generator', description: 'Generate barcodes', icon: Barcode, color: 'from-gray-700 to-gray-900', category: 'generator' },
    { id: 'qr-code', name: 'QR Code Generator', description: 'Create QR codes', icon: Sparkles, color: 'from-indigo-500 to-purple-500', category: 'generator' },
    
    // Code Tools
    { id: 'code-errors', name: 'Code Error Finder', description: 'Find and fix code errors', icon: Wrench, color: 'from-red-500 to-orange-500', category: 'code' },
    { id: 'project-analyzer', name: 'Project Analyzer', description: 'Analyze full projects', icon: FileCode, color: 'from-blue-500 to-indigo-500', category: 'code' },
  ];

  const categories = [
    { id: 'all', name: 'All Tools', count: tools.length },
    { id: 'formatter', name: 'Formatters', count: tools.filter(t => t.category === 'formatter').length },
    { id: 'converter', name: 'Converters', count: tools.filter(t => t.category === 'converter').length },
    { id: 'security', name: 'Security', count: tools.filter(t => t.category === 'security').length },
    { id: 'generator', name: 'Generators', count: tools.filter(t => t.category === 'generator').length },
    { id: 'code', name: 'Code Tools', count: tools.filter(t => t.category === 'code').length },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (toolId: string) => {
    if (onNavigate) {
      onNavigate(toolId);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Developer Tools</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">All-in-one toolkit for developers</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search tools..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat.name} <span className="opacity-70">({cat.count})</span>
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map(tool => (
          <button
            key={tool.id}
            onClick={() => handleToolClick(tool.id)}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 bg-gradient-to-r ${tool.color} rounded-xl`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors flex items-center gap-2">
                  {tool.name}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {tool.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No tools found matching your search.</p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-4 text-white">
          <p className="text-3xl font-bold">{tools.length}</p>
          <p className="text-sm opacity-80">Total Tools</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-4 text-white">
          <p className="text-3xl font-bold">100%</p>
          <p className="text-sm opacity-80">Free to Use</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm opacity-80">Ads</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
          <p className="text-3xl font-bold">∞</p>
          <p className="text-sm opacity-80">Usage Limit</p>
        </div>
      </div>
    </div>
  );
}
