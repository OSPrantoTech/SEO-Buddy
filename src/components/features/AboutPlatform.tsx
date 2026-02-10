/**
 * AboutPlatform.tsx - About SEO Buddy Platform
 * Detailed information about the platform, features, and getting started guide
 * This content is moved from Dashboard to keep the main page clean
 */

import React, { useState } from 'react';

interface AboutPlatformProps {
  onNavigate: (page: string) => void;
}

const AboutPlatform: React.FC<AboutPlatformProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { id: 'about', label: 'About', icon: '📖' },
    { id: 'features', label: 'Features', icon: '✨' },
    { id: 'getting-started', label: 'Get Started', icon: '🚀' },
    { id: 'faq', label: 'FAQ', icon: '❓' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          About SEO Buddy
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your complete SEO learning and working platform
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        
        {/* About Section */}
        {activeSection === 'about' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What is SEO Buddy?
              </h2>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                SEO Buddy is a comprehensive, AI-powered SEO platform designed specifically for beginners who want to learn and practice search engine optimization. Whether you are a blogger, small business owner, or aspiring digital marketer, SEO Buddy provides all the tools and resources you need to succeed.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Unlike complex enterprise tools that can overwhelm beginners, SEO Buddy uses simple language, provides clear explanations, and guides you through every step of the optimization process. Our AI assistant helps you understand not just what to do, but why each action matters for your search rankings.
              </p>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Learn</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Master SEO basics with guided tutorials
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💼</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Work</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Analyze and optimize real websites
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Earn</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Generate professional client reports
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white text-center">
              <h4 className="font-semibold mb-2">Our Mission</h4>
              <p className="text-sm text-white/90">
                Making professional SEO accessible to everyone, regardless of technical background or budget.
              </p>
            </div>
          </div>
        )}

        {/* Features Section */}
        {activeSection === 'features' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              ✨ Platform Features
            </h2>

            <div className="grid gap-4">
              {[
                {
                  icon: '🔍',
                  title: 'Powerful SEO Analyzer',
                  description: 'Scan any website and get a detailed SEO audit with scores, issues, and actionable recommendations. Just like Seobility but easier to understand.',
                  color: 'blue'
                },
                {
                  icon: '✨',
                  title: 'AI Content Generator',
                  description: 'Create SEO-optimized titles, meta descriptions, and content suggestions using artificial intelligence. Perfect for bloggers and content creators.',
                  color: 'purple'
                },
                {
                  icon: '🎯',
                  title: 'Keyword Research Tool',
                  description: 'Discover valuable keywords for your content with search volume estimates, competition levels, and ranking difficulty scores.',
                  color: 'green'
                },
                {
                  icon: '⚡',
                  title: 'Speed & Performance Check',
                  description: 'Test your website loading speed and get optimization tips. Page speed is a critical ranking factor for Google.',
                  color: 'yellow'
                },
                {
                  icon: '📚',
                  title: 'Learning Center',
                  description: 'Step-by-step SEO tutorials from beginner to advanced. Learn at your own pace with practical examples.',
                  color: 'orange'
                },
                {
                  icon: '📊',
                  title: 'Client Reports (Agency Mode)',
                  description: 'Generate professional PDF reports for clients. Perfect for freelancers and SEO agencies.',
                  color: 'indigo'
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border-l-4 bg-gray-50 dark:bg-gray-700/50
                    ${feature.color === 'blue' ? 'border-blue-500' : ''}
                    ${feature.color === 'purple' ? 'border-purple-500' : ''}
                    ${feature.color === 'green' ? 'border-green-500' : ''}
                    ${feature.color === 'yellow' ? 'border-yellow-500' : ''}
                    ${feature.color === 'orange' ? 'border-orange-500' : ''}
                    ${feature.color === 'indigo' ? 'border-indigo-500' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Getting Started Section */}
        {activeSection === 'getting-started' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              🚀 Getting Started Guide
            </h2>

            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Choose Your Mode',
                  description: 'Start with Beginner Mode to learn the basics. As you grow, upgrade to Pro or Agency mode for more features.',
                  action: 'mode',
                  actionLabel: 'Set Mode'
                },
                {
                  step: 2,
                  title: 'Analyze Your First Website',
                  description: 'Enter any website URL in the SEO Checker to see how it performs. Start with your own website or blog.',
                  action: 'seo-checker',
                  actionLabel: 'Start Analysis'
                },
                {
                  step: 3,
                  title: 'Fix Critical Issues First',
                  description: 'Focus on red (critical) issues before yellow (warnings). Each issue includes a simple explanation and fix.',
                  action: 'learn',
                  actionLabel: 'Learn More'
                },
                {
                  step: 4,
                  title: 'Use AI to Improve Content',
                  description: 'Generate better titles and meta descriptions using the AI Content Generator. It is free and easy to use.',
                  action: 'ai-generator',
                  actionLabel: 'Try AI'
                },
                {
                  step: 5,
                  title: 'Research Keywords',
                  description: 'Find what people are searching for using the Keyword Tool. Target keywords with lower competition to start.',
                  action: 'keywords',
                  actionLabel: 'Find Keywords'
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.description}
                    </p>
                    <button
                      onClick={() => onNavigate(item.action)}
                      className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {item.actionLabel} →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Pro Tip</h4>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    SEO is a marathon, not a sprint. Focus on consistent improvements rather than trying to fix everything at once. Even small optimizations add up over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === 'faq' && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              ❓ Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: 'Is SEO Buddy free to use?',
                  a: 'Yes! The basic tools are completely free. Pro and Agency modes will have premium features in future updates, but the core functionality will always remain free.'
                },
                {
                  q: 'Do I need technical knowledge to use this tool?',
                  a: 'Not at all! SEO Buddy is designed specifically for beginners. Every feature includes simple explanations, and technical terms are always explained in plain language.'
                },
                {
                  q: 'How accurate is the SEO analysis?',
                  a: 'Our analyzer checks the same factors that professional tools like Seobility, Moz, and Ahrefs check. The scores and recommendations are based on current SEO best practices.'
                },
                {
                  q: 'Can I use this for client work?',
                  a: 'Absolutely! In Agency Mode, you can manage multiple clients, generate professional reports, and even create proposals. It is perfect for freelancers starting an SEO business.'
                },
                {
                  q: 'How does the AI content generator work?',
                  a: 'The AI analyzes your topic and target keywords to generate SEO-optimized titles and descriptions. It follows Google guidelines to create content that ranks well.'
                },
                {
                  q: 'Will you add more features?',
                  a: 'Yes! We are constantly improving SEO Buddy based on user feedback. Upcoming features include backlink analysis, rank tracking, and competitor analysis.'
                }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-start gap-2">
                    <span className="text-blue-500">Q:</span>
                    {item.q}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 pl-6">
                    <span className="text-green-500 font-semibold">A:</span> {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back to Dashboard */}
      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AboutPlatform;
