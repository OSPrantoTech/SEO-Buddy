import { useState } from 'react';
import { Card } from '../ui/Card';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  checked: boolean;
  priority: 'high' | 'medium' | 'low';
}

const initialChecklist: ChecklistItem[] = [
  // Technical SEO
  { id: '1', category: 'Technical', title: 'SSL Certificate (HTTPS)', description: 'আপনার site HTTPS use করছে', checked: false, priority: 'high' },
  { id: '2', category: 'Technical', title: 'Mobile-Friendly', description: 'Site mobile এ ভালোভাবে দেখায়', checked: false, priority: 'high' },
  { id: '3', category: 'Technical', title: 'Page Speed < 3s', description: 'Page 3 second এর মধ্যে load হয়', checked: false, priority: 'high' },
  { id: '4', category: 'Technical', title: 'XML Sitemap', description: 'Sitemap.xml file আছে', checked: false, priority: 'high' },
  { id: '5', category: 'Technical', title: 'Robots.txt', description: 'Robots.txt properly configured', checked: false, priority: 'medium' },
  { id: '6', category: 'Technical', title: 'Canonical Tags', description: 'Proper canonical URLs set করা আছে', checked: false, priority: 'medium' },
  { id: '7', category: 'Technical', title: 'No Broken Links', description: 'কোনো 404 error নেই', checked: false, priority: 'medium' },
  { id: '8', category: 'Technical', title: 'Schema Markup', description: 'Structured data যোগ করা আছে', checked: false, priority: 'low' },
  
  // On-Page SEO
  { id: '9', category: 'On-Page', title: 'Title Tag (50-60 chars)', description: 'প্রতিটি page এ unique title আছে', checked: false, priority: 'high' },
  { id: '10', category: 'On-Page', title: 'Meta Description', description: '150-160 characters এর description আছে', checked: false, priority: 'high' },
  { id: '11', category: 'On-Page', title: 'One H1 Per Page', description: 'প্রতিটি page এ একটাই H1 আছে', checked: false, priority: 'high' },
  { id: '12', category: 'On-Page', title: 'Header Hierarchy', description: 'H1 → H2 → H3 proper order এ আছে', checked: false, priority: 'medium' },
  { id: '13', category: 'On-Page', title: 'Keyword in Title', description: 'Main keyword title এ আছে', checked: false, priority: 'high' },
  { id: '14', category: 'On-Page', title: 'Keyword in URL', description: 'URL SEO-friendly ও keyword আছে', checked: false, priority: 'medium' },
  { id: '15', category: 'On-Page', title: 'Keyword in First 100 Words', description: 'Content এর শুরুতে keyword আছে', checked: false, priority: 'medium' },
  { id: '16', category: 'On-Page', title: 'Image Alt Tags', description: 'সব images এ alt text আছে', checked: false, priority: 'medium' },
  
  // Content
  { id: '17', category: 'Content', title: 'Content Length 1500+ Words', description: 'Blog posts detailed ও comprehensive', checked: false, priority: 'medium' },
  { id: '18', category: 'Content', title: 'Original Content', description: 'Content unique, copied না', checked: false, priority: 'high' },
  { id: '19', category: 'Content', title: 'Internal Links', description: 'অন্য pages এ links আছে', checked: false, priority: 'medium' },
  { id: '20', category: 'Content', title: 'External Links', description: 'Authority sites এ links আছে', checked: false, priority: 'low' },
  { id: '21', category: 'Content', title: 'Updated Content', description: 'Content regularly update হয়', checked: false, priority: 'medium' },
  { id: '22', category: 'Content', title: 'Multimedia Content', description: 'Images, videos ব্যবহার করা হয়েছে', checked: false, priority: 'low' },
  
  // Off-Page
  { id: '23', category: 'Off-Page', title: 'Google Search Console', description: 'Site GSC এ submit করা আছে', checked: false, priority: 'high' },
  { id: '24', category: 'Off-Page', title: 'Google Business Profile', description: 'Local business এর জন্য setup আছে', checked: false, priority: 'medium' },
  { id: '25', category: 'Off-Page', title: 'Social Media Presence', description: 'Social profiles linked আছে', checked: false, priority: 'low' },
  { id: '26', category: 'Off-Page', title: 'Quality Backlinks', description: 'Relevant sites থেকে backlinks আছে', checked: false, priority: 'high' },
];

export function SEOAuditChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [filter, setFilter] = useState<string>('all');

  const toggleItem = (id: string) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const categories = ['all', ...new Set(checklist.map(item => item.category))];
  const filteredItems = filter === 'all' 
    ? checklist 
    : checklist.filter(item => item.category === filter);

  const completedCount = checklist.filter(item => item.checked).length;
  const totalCount = checklist.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const getScoreColor = () => {
    if (progress >= 80) return 'text-green-500';
    if (progress >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const resetChecklist = () => {
    setChecklist(initialChecklist);
  };

  const checkAll = () => {
    setChecklist(checklist.map(item => ({ ...item, checked: true })));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">✅ SEO Audit Checklist</h1>
        <p className="text-emerald-100 text-sm sm:text-base">
          Complete SEO checklist - প্রতিটি item check করে আপনার site improve করুন
        </p>
      </div>

      {/* Progress Section */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`text-4xl sm:text-5xl font-bold ${getScoreColor()}`}>
              {progress}%
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">SEO Score</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {completedCount} of {totalCount} completed
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={resetChecklist}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              🔄 Reset
            </button>
            <button
              onClick={checkAll}
              className="px-4 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              ✓ Check All
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                progress >= 80 ? 'bg-green-500' : progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {['Technical', 'On-Page', 'Content', 'Off-Page'].map(cat => {
            const catItems = checklist.filter(i => i.category === cat);
            const catCompleted = catItems.filter(i => i.checked).length;
            const catPercent = Math.round((catCompleted / catItems.length) * 100);
            
            return (
              <div key={cat} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">{cat}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{catPercent}%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{catCompleted}/{catItems.length}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              filter === cat 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {cat === 'all' ? '📋 All' : cat}
          </button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map(item => (
          <Card
            key={item.id}
            className={`p-4 cursor-pointer transition-all ${
              item.checked 
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800' 
                : 'hover:shadow-md'
            }`}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                item.checked 
                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}>
                {item.checked && <span className="text-sm">✓</span>}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className={`font-medium ${
                    item.checked 
                      ? 'text-emerald-700 dark:text-emerald-300 line-through' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {item.title}
                  </h4>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {item.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
        <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">💡 Pro Tips</h3>
        <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
          <li>• <strong>High priority</strong> items আগে complete করুন</li>
          <li>• প্রতি সপ্তাহে checklist review করুন</li>
          <li>• নতুন page publish করার আগে এই checklist follow করুন</li>
          <li>• Competitor sites ও analyze করুন</li>
        </ul>
      </Card>
    </div>
  );
}
