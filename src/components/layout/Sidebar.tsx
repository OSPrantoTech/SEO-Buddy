/**
 * ============================================
 * SIDEBAR COMPONENT
 * ============================================
 * Navigation sidebar with all the tool options.
 * Collapses on mobile and shows as a slide-out menu.
 * Filters navigation items based on current mode.
 */

import { Search, Sparkles, Hash, Zap, BookOpen, Home, Code2, FolderOpen, GraduationCap, Settings, Users, FileText, DollarSign, FileBarChart } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useApp } from '../../context/AppContext';

// Define which features are available in which mode
const modeFeatures = {
  beginner: ['home', 'seo-checker', 'ai-generator', 'keywords', 'learning', 'learn', 'about', 'mode', 'developer'],
  pro: ['home', 'seo-checker', 'ai-generator', 'keywords', 'performance', 'learning', 'learn', 'projects', 'reports', 'about', 'mode', 'developer'],
  agency: ['home', 'seo-checker', 'ai-generator', 'keywords', 'performance', 'learning', 'learn', 'projects', 'reports', 'clients', 'proposals', 'pricing', 'about', 'mode', 'developer']
};

// All navigation items
const allNavItems = [
  // Main Tools
  {
    id: 'home',
    label: 'Dashboard',
    icon: Home,
    tooltip: 'Overview of all your SEO tools',
    color: 'text-blue-500',
    section: 'main',
    badge: null
  },
  {
    id: 'seo-checker',
    label: 'SEO Checker',
    icon: Search,
    tooltip: 'Analyze your page\'s SEO and get a score',
    color: 'text-indigo-500',
    section: 'main',
    badge: null
  },
  {
    id: 'ai-generator',
    label: 'AI Generator',
    icon: Sparkles,
    tooltip: 'Generate SEO-optimized titles and descriptions',
    color: 'text-purple-500',
    section: 'main',
    badge: 'AI'
  },
  {
    id: 'keywords',
    label: 'Keywords',
    icon: Hash,
    tooltip: 'Find the best keywords for your content',
    color: 'text-green-500',
    section: 'main',
    badge: null
  },
  {
    id: 'performance',
    label: 'Speed Check',
    icon: Zap,
    tooltip: 'Check page speed and mobile-friendliness',
    color: 'text-orange-500',
    section: 'main',
    badge: 'Pro'
  },
  // Learning & Growth
  {
    id: 'learning',
    label: 'Learn SEO',
    icon: GraduationCap,
    tooltip: 'Complete SEO learning roadmap',
    color: 'text-pink-500',
    section: 'learn',
    badge: null
  },
  {
    id: 'learn',
    label: 'Quick Guides',
    icon: BookOpen,
    tooltip: 'Quick SEO reference guides',
    color: 'text-rose-500',
    section: 'learn',
    badge: null
  },
  // Pro Features
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderOpen,
    tooltip: 'Manage your SEO projects',
    color: 'text-cyan-500',
    section: 'pro',
    badge: 'Pro'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileBarChart,
    tooltip: 'Generate SEO audit reports',
    color: 'text-teal-500',
    section: 'pro',
    badge: 'Pro'
  },
  // Agency Features
  {
    id: 'clients',
    label: 'Clients',
    icon: Users,
    tooltip: 'Manage your clients',
    color: 'text-amber-500',
    section: 'agency',
    badge: 'Agency'
  },
  {
    id: 'proposals',
    label: 'Proposals',
    icon: FileText,
    tooltip: 'Create SEO service proposals',
    color: 'text-emerald-500',
    section: 'agency',
    badge: 'Agency'
  },
  {
    id: 'pricing',
    label: 'Pricing',
    icon: DollarSign,
    tooltip: 'SEO service pricing calculator',
    color: 'text-yellow-500',
    section: 'agency',
    badge: 'Agency'
  },
  // Settings & Info
  {
    id: 'about',
    label: 'About Platform',
    icon: BookOpen,
    tooltip: 'Learn about SEO Buddy platform',
    color: 'text-blue-500',
    section: 'settings',
    badge: null
  },
  {
    id: 'mode',
    label: 'Mode Settings',
    icon: Settings,
    tooltip: 'Switch between Beginner/Pro/Agency mode',
    color: 'text-gray-500',
    section: 'settings',
    badge: null
  },
  {
    id: 'developer',
    label: 'Developer',
    icon: Code2,
    tooltip: 'About the developer',
    color: 'text-cyan-500',
    section: 'settings',
    badge: 'Info'
  }
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ activeTab, onTabChange, isMobileOpen, onMobileClose }: SidebarProps) {
  const { userMode } = useApp();
  
  // Filter navigation items based on current mode
  const availableFeatures = modeFeatures[userMode as keyof typeof modeFeatures] || modeFeatures.beginner;
  const navItems = allNavItems.filter(item => availableFeatures.includes(item.id));

  const handleNavClick = (id: string) => {
    onTabChange(id);
    onMobileClose();
  };

  // Get badge color based on badge type
  const getBadgeStyles = (badge: string | null) => {
    switch (badge) {
      case 'AI':
        return 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300';
      case 'Pro':
        return 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300';
      case 'Agency':
        return 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300';
      case 'Info':
        return 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-300';
      default:
        return '';
    }
  };

  // Get mode label for display
  const getModeLabel = (): { text: string; color: string } => {
    switch (userMode) {
      case 'beginner':
        return { text: 'Beginner', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' };
      case 'pro':
        return { text: 'Pro', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' };
      case 'agency':
        return { text: 'Agency', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' };
      default:
        return { text: 'Beginner', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' };
    }
  };

  const modeLabel = getModeLabel();

  return (
    <>
      {/* Mobile overlay - blocks background interaction */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden touch-none"
          onClick={onMobileClose}
          onTouchMove={(e) => e.preventDefault()}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 z-50',
          'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700',
          'transform transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 flex-shrink-0',
          'overscroll-contain',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="p-4 space-y-1 h-full overflow-y-auto pb-40 overscroll-contain">
          {/* Current Mode Badge */}
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Current Mode</span>
              <span className={cn('px-2 py-1 text-xs font-medium rounded-full', modeLabel.color)}>
                {modeLabel.text}
              </span>
            </div>
          </div>

          {/* Section: Main Tools */}
          <div className="mb-2">
            <span className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Main Tools
            </span>
          </div>
          
          {navItems.filter(item => item.section === 'main').map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'text-left font-medium',
                  isActive
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? item.color : '')} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={cn('ml-auto px-2 py-0.5 text-xs rounded-full flex-shrink-0', getBadgeStyles(item.badge))}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Section: Learning */}
          <div className="mt-4 mb-2">
            <span className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Learning
            </span>
          </div>
          
          {navItems.filter(item => item.section === 'learn').map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'text-left font-medium',
                  isActive
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? item.color : '')} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={cn('ml-auto px-2 py-0.5 text-xs rounded-full flex-shrink-0', getBadgeStyles(item.badge))}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Section: Pro Features (only show if there are pro items) */}
          {navItems.filter(item => item.section === 'pro').length > 0 && (
            <>
              <div className="mt-4 mb-2">
                <span className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Pro Features
                </span>
              </div>
              
              {navItems.filter(item => item.section === 'pro').map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                      'text-left font-medium',
                      isActive
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? item.color : '')} />
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={cn('ml-auto px-2 py-0.5 text-xs rounded-full flex-shrink-0', getBadgeStyles(item.badge))}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {/* Section: Agency Features (only show if there are agency items) */}
          {navItems.filter(item => item.section === 'agency').length > 0 && (
            <>
              <div className="mt-4 mb-2">
                <span className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  Agency Tools
                </span>
              </div>
              
              {navItems.filter(item => item.section === 'agency').map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                      'text-left font-medium',
                      isActive
                        ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    )}
                  >
                    <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? item.color : '')} />
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={cn('ml-auto px-2 py-0.5 text-xs rounded-full flex-shrink-0', getBadgeStyles(item.badge))}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {/* Section: Settings */}
          <div className="mt-4 mb-2">
            <span className="px-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Settings
            </span>
          </div>
          
          {navItems.filter(item => item.section === 'settings').map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'text-left font-medium',
                  isActive
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? item.color : '')} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className={cn('ml-auto px-2 py-0.5 text-xs rounded-full flex-shrink-0', getBadgeStyles(item.badge))}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
