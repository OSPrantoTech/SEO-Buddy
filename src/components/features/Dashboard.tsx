/**
 * Dashboard.tsx - Premium, Clean Dashboard
 * Modern, minimal design with premium feel
 * Mobile-first responsive design
 */

import React from 'react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {

  // Quick action cards - all features free
  const quickActions = [
    {
      id: 'seo-checker',
      icon: '🔍',
      title: 'SEO Analyzer',
      subtitle: 'Scan any website',
      color: 'from-blue-500 to-blue-600',
      page: 'seo-checker'
    },
    {
      id: 'ai-generator',
      icon: '✨',
      title: 'AI Writer',
      subtitle: 'Generate content',
      color: 'from-purple-500 to-purple-600',
      page: 'ai-generator'
    },
    {
      id: 'keywords',
      icon: '🎯',
      title: 'Keywords',
      subtitle: 'Find opportunities',
      color: 'from-green-500 to-green-600',
      page: 'keywords'
    },
    {
      id: 'speed',
      icon: '⚡',
      title: 'Speed Test',
      subtitle: 'Check performance',
      color: 'from-yellow-500 to-yellow-600',
      page: 'performance'
    },
    {
      id: 'learn',
      icon: '📚',
      title: 'Learn SEO',
      subtitle: 'Master the basics',
      color: 'from-orange-500 to-orange-600',
      page: 'learn'
    },
    {
      id: 'projects',
      icon: '📁',
      title: 'Projects',
      subtitle: 'Manage websites',
      color: 'from-indigo-500 to-indigo-600',
      page: 'projects'
    },
    {
      id: 'reports',
      icon: '📊',
      title: 'Reports',
      subtitle: 'Generate PDFs',
      color: 'from-teal-500 to-teal-600',
      page: 'reports'
    },
    {
      id: 'proposals',
      icon: '📄',
      title: 'Proposals',
      subtitle: 'Win clients',
      color: 'from-pink-500 to-pink-600',
      page: 'proposals'
    }
  ];

  // Stats - all features free
  const stats = [
    { label: 'Sites Analyzed', value: '24', icon: '🔍', trend: '+5 this week' },
    { label: 'Projects', value: '8', icon: '📁', trend: '3 active' },
    { label: 'Reports', value: '12', icon: '📊', trend: '+4 this month' },
    { label: 'Avg Score', value: '78', icon: '📈', trend: '+12 points' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Compact & Premium */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              ✨ All Features Free
            </div>
            
            {/* Greeting */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
              Welcome to SEO Buddy 👋
            </h1>
            <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">
              Your AI-powered SEO assistant. Analyze, optimize, and grow your online presence.
            </p>

            {/* Quick Start Button */}
            <button
              onClick={() => onNavigate('seo-checker')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base"
            >
              <span>🚀</span>
              <span>Start SEO Analysis</span>
            </button>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <span className="text-2xl sm:text-3xl">{stat.icon}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full hidden sm:inline">
                  {stat.trend}
                </span>
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {stat.label}
              </div>
              {/* Mobile trend */}
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 sm:hidden">
                {stat.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {quickActions.length} tools available
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.page)}
                className="group relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 text-left overflow-hidden"
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-xl sm:text-2xl mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  {action.icon}
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {action.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {action.subtitle}
                </p>

                {/* Arrow indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-gray-400 dark:text-gray-500">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Popular Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span>🔥</span>
              <span>Popular Tools</span>
            </h3>
            
            <div className="space-y-3">
              {[
                { name: 'SEO Analyzer', desc: 'Complete website audit', icon: '🔍', action: 'seo-checker' },
                { name: 'AI Content Writer', desc: 'Generate optimized content', icon: '✨', action: 'ai-generator' },
                { name: 'Keyword Research', desc: 'Find ranking opportunities', icon: '🎯', action: 'keywords' },
                { name: 'Speed Test', desc: 'Check page performance', icon: '⚡', action: 'performance' }
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate(item.action)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
                >
                  <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg">{item.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                  </div>
                  <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              ))}
            </div>
          </div>

          {/* SEO Score Card */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white transform -translate-x-10 translate-y-10"></div>
            </div>
            
            <div className="relative">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <span>🎯</span>
                <span>Ready to Boost Your SEO?</span>
              </h3>
              
              <p className="text-white/80 text-sm mb-4">
                Enter any website URL to get a complete SEO analysis with actionable tips to improve your rankings.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter website URL..."
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onNavigate('seo-checker');
                    }
                  }}
                />
                <button
                  onClick={() => onNavigate('seo-checker')}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
                >
                  Analyze Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Made with ❤️ by OSPranto Tech • Your SEO success is our mission
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
