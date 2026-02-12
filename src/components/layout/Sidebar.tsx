/**
 * ============================================
 * SIDEBAR COMPONENT
 * ============================================
 * Navigation sidebar with all the tool options.
 * All features are FREE - no mode restrictions.
 */

import { 
  Search, Sparkles, Hash, Zap, BookOpen, Home, Code2, FolderOpen, 
  GraduationCap, FileText, DollarSign, FileBarChart, Link, Eye,
  FileCode, Bot, Map, BarChart3, Tag, BookOpenCheck, Image, RefreshCw,
  FileEdit, Languages, CheckSquare, Target, QrCode, Clock, Braces, Bug,
  FolderArchive, Palette, FileJson, Binary, Key, Lock, Database, Wrench,
  Barcode, Link2, Wand2
} from 'lucide-react';
import { cn } from '../../utils/cn';

// All navigation items - ALL FREE
const allNavItems = [
  // AI Tools - শুরুতে
  {
    id: 'ai-playground',
    label: 'AI Code Playground',
    icon: Sparkles,
    color: 'text-pink-500',
    section: 'ai'
  },
  {
    id: 'ai-generator',
    label: 'AI Content Generator',
    icon: Wand2,
    color: 'text-purple-500',
    section: 'ai'
  },
  {
    id: 'ai-code-generator',
    label: 'AI Code Generator',
    icon: Code2,
    color: 'text-indigo-500',
    section: 'ai'
  },
  {
    id: 'ai-debug-suite',
    label: 'AI Bug Fixer',
    icon: Bug,
    color: 'text-red-500',
    section: 'ai'
  },
  // Main Tools
  {
    id: 'home',
    label: 'Dashboard',
    icon: Home,
    color: 'text-blue-500',
    section: 'main'
  },
  {
    id: 'seo-checker',
    label: 'SEO Checker',
    icon: Search,
    color: 'text-indigo-500',
    section: 'main'
  },
  {
    id: 'keywords',
    label: 'Keywords',
    icon: Hash,
    color: 'text-green-500',
    section: 'main'
  },
  {
    id: 'performance',
    label: 'Speed Check',
    icon: Zap,
    color: 'text-orange-500',
    section: 'main'
  },
  // SEO Tools
  {
    id: 'backlinks',
    label: 'Backlinks',
    icon: Link,
    color: 'text-pink-500',
    section: 'seo'
  },
  {
    id: 'serp-preview',
    label: 'SERP Preview',
    icon: Eye,
    color: 'text-cyan-500',
    section: 'seo'
  },
  {
    id: 'meta-tags',
    label: 'Meta Tags',
    icon: Tag,
    color: 'text-violet-500',
    section: 'seo'
  },
  {
    id: 'social-preview',
    label: 'Social Preview',
    icon: Eye,
    color: 'text-blue-500',
    section: 'seo'
  },
  {
    id: 'schema',
    label: 'Schema Generator',
    icon: FileCode,
    color: 'text-emerald-500',
    section: 'seo'
  },
  {
    id: 'robots',
    label: 'Robots.txt',
    icon: Bot,
    color: 'text-gray-500',
    section: 'seo'
  },
  {
    id: 'sitemap',
    label: 'Sitemap',
    icon: Map,
    color: 'text-teal-500',
    section: 'seo'
  },
  {
    id: 'headings',
    label: 'Headings',
    icon: BarChart3,
    color: 'text-amber-500',
    section: 'seo'
  },
  // Content Tools
  {
    id: 'word-counter',
    label: 'Word Counter',
    icon: FileEdit,
    color: 'text-cyan-500',
    section: 'content'
  },
  {
    id: 'keyword-density',
    label: 'Keyword Density',
    icon: Hash,
    color: 'text-rose-500',
    section: 'content'
  },
  {
    id: 'readability',
    label: 'Readability',
    icon: BookOpenCheck,
    color: 'text-indigo-500',
    section: 'content'
  },
  {
    id: 'image-seo',
    label: 'Image SEO',
    icon: Image,
    color: 'text-purple-500',
    section: 'content'
  },
  {
    id: 'redirect-checker',
    label: 'Redirect Checker',
    icon: RefreshCw,
    color: 'text-orange-500',
    section: 'content'
  },
  // Advanced SEO
  {
    id: 'canonical',
    label: 'Canonical URL',
    icon: Link,
    color: 'text-indigo-500',
    section: 'advanced'
  },
  {
    id: 'hreflang',
    label: 'Hreflang Tags',
    icon: Languages,
    color: 'text-teal-500',
    section: 'advanced'
  },
  {
    id: 'domain-age',
    label: 'Domain Age',
    icon: Clock,
    color: 'text-amber-500',
    section: 'advanced'
  },
  {
    id: 'seo-checklist',
    label: 'SEO Checklist',
    icon: CheckSquare,
    color: 'text-green-500',
    section: 'advanced'
  },
  {
    id: 'longtail-keywords',
    label: 'Long-tail Keywords',
    icon: Target,
    color: 'text-violet-500',
    section: 'advanced'
  },
  {
    id: 'qr-generator',
    label: 'QR Code',
    icon: QrCode,
    color: 'text-gray-500',
    section: 'advanced'
  },
  {
    id: 'json-creator',
    label: 'JSON Creator',
    icon: Braces,
    color: 'text-yellow-500',
    section: 'advanced'
  },
  {
    id: 'code-error-finder',
    label: 'Code Error Finder',
    icon: Bug,
    color: 'text-red-500',
    section: 'advanced'
  },
  {
    id: 'project-analyzer',
    label: 'Project Analyzer',
    icon: FolderArchive,
    color: 'text-blue-600',
    section: 'advanced'
  },
  // AI tools moved to top
  // Developer Tools
  {
    id: 'dev-tools',
    label: 'Developer Tools',
    icon: Wrench,
    color: 'text-indigo-500',
    section: 'devtools'
  },
  {
    id: 'color-picker',
    label: 'Color Picker',
    icon: Palette,
    color: 'text-pink-500',
    section: 'devtools'
  },
  {
    id: 'json-formatter',
    label: 'JSON Formatter',
    icon: FileJson,
    color: 'text-yellow-500',
    section: 'devtools'
  },
  {
    id: 'json-to-go',
    label: 'JSON to Go',
    icon: FileCode,
    color: 'text-cyan-500',
    section: 'devtools'
  },
  {
    id: 'base64',
    label: 'Base64 Converter',
    icon: Binary,
    color: 'text-blue-500',
    section: 'devtools'
  },
  {
    id: 'jwt-decoder',
    label: 'JWT Decoder',
    icon: Key,
    color: 'text-amber-500',
    section: 'devtools'
  },
  {
    id: 'password-generator',
    label: 'Password Generator',
    icon: Lock,
    color: 'text-green-500',
    section: 'devtools'
  },
  {
    id: 'hash-generator',
    label: 'Hash Generator',
    icon: Hash,
    color: 'text-violet-500',
    section: 'devtools'
  },
  {
    id: 'url-cleaner',
    label: 'URL Cleaner',
    icon: Link2,
    color: 'text-teal-500',
    section: 'devtools'
  },
  {
    id: 'xml-formatter',
    label: 'XML Formatter',
    icon: FileCode,
    color: 'text-orange-500',
    section: 'devtools'
  },
  {
    id: 'markdown-formatter',
    label: 'Markdown Formatter',
    icon: FileText,
    color: 'text-gray-500',
    section: 'devtools'
  },
  {
    id: 'sql-formatter',
    label: 'SQL Formatter',
    icon: Database,
    color: 'text-blue-600',
    section: 'devtools'
  },
  {
    id: 'favicon-generator',
    label: 'Favicon Generator',
    icon: Image,
    color: 'text-pink-500',
    section: 'devtools'
  },
  {
    id: 'barcode-generator',
    label: 'Barcode Generator',
    icon: Barcode,
    color: 'text-gray-700',
    section: 'devtools'
  },
  // Learning
  {
    id: 'learning',
    label: 'Learn SEO',
    icon: GraduationCap,
    color: 'text-pink-500',
    section: 'learn'
  },
  {
    id: 'learn',
    label: 'Quick Guides',
    icon: BookOpen,
    color: 'text-rose-500',
    section: 'learn'
  },
  // Business
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    color: 'text-cyan-500',
    section: 'business'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileBarChart,
    color: 'text-teal-500',
    section: 'business'
  },
  {
    id: 'proposals',
    label: 'Proposals',
    icon: FileText,
    color: 'text-emerald-500',
    section: 'business'
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: DollarSign,
    color: 'text-yellow-500',
    section: 'business'
  },
  // Settings
  {
    id: 'about',
    label: 'About Platform',
    icon: BookOpen,
    color: 'text-blue-500',
    section: 'settings'
  },
  {
    id: 'developer',
    label: 'Developer',
    icon: Code2,
    color: 'text-cyan-500',
    section: 'settings'
  }
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ activeTab, onTabChange, isMobileOpen, onMobileClose }: SidebarProps) {
  const handleNavClick = (id: string) => {
    onTabChange(id);
    onMobileClose();
  };

  const renderSection = (sectionId: string, title: string) => {
    const items = allNavItems.filter(item => item.section === sectionId);
    if (items.length === 0) return null;

    return (
      <>
        <div className="mt-4 mb-2 first:mt-0">
          <span className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {title}
          </span>
        </div>
        
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200',
                'text-left font-medium text-sm',
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', isActive ? item.color : '')} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden touch-none"
          onClick={onMobileClose}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      {/* Sidebar - Fixed on PC, slides in on mobile */}
      <aside
        className={cn(
          'fixed top-16 left-0 h-[calc(100vh-4rem)] w-56 z-40',
          'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700',
          'transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 flex-shrink-0',
          'overscroll-contain shadow-lg lg:shadow-none',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="p-3 space-y-0.5 h-full overflow-y-auto pb-40 overscroll-contain">
          {/* All Features Free Badge */}
          <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎉</span>
              <div>
                <div className="text-xs font-semibold text-green-700 dark:text-green-300">All Features FREE</div>
                <div className="text-xs text-green-600 dark:text-green-400">65+ SEO & Dev Tools</div>
              </div>
            </div>
          </div>

          {renderSection('ai', '🤖 AI Tools')}
          {renderSection('main', 'Main Tools')}
          {renderSection('seo', 'SEO Tools')}
          {renderSection('content', 'Content Tools')}
          {renderSection('advanced', 'Advanced SEO')}
          {renderSection('devtools', 'Developer Tools')}
          {renderSection('learn', 'Learning')}
          {renderSection('business', 'Business')}
          {renderSection('settings', 'Settings')}
        </nav>
      </aside>
    </>
  );
}
