/**
 * ============================================
 * MODE SELECTOR COMPONENT
 * ============================================
 * Allows users to switch between Beginner, Pro, and Agency modes
 */

import { useState } from 'react';
import { Sparkles, Rocket, Check, Lock, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { UserMode } from '../../types';

const modes = [
  {
    id: 'beginner' as UserMode,
    name: 'Beginner Mode',
    description: 'Simple tools with step-by-step guidance',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-500',
    features: [
      'Essential SEO tools only',
      'Simple language explanations',
      'Step-by-step guidance',
      'Learning resources',
      'AI content generator',
      'Keyword research'
    ],
    badge: 'Free'
  },
  {
    id: 'pro' as UserMode,
    name: 'Pro Mode',
    description: 'All features for professionals',
    icon: Rocket,
    color: 'from-indigo-500 to-purple-500',
    features: [
      'All Beginner features',
      'Speed & Performance check',
      'Project management',
      'Client management',
      'Proposal generator',
      'Pricing calculator',
      'Report generation',
      'Full SEO toolkit'
    ],
    badge: 'Pro'
  }
];

interface ModeSelectorProps {
  variant?: 'full' | 'compact';
  onModeChange?: () => void;
}

export function ModeSelector({ variant = 'full', onModeChange }: ModeSelectorProps) {
  const { userMode, setUserMode } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const currentMode = modes.find(m => m.id === userMode) || modes[0];
  const CurrentIcon = currentMode.icon;

  const handleModeChange = (mode: UserMode) => {
    setUserMode(mode);
    setIsOpen(false);
    onModeChange?.();
  };

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <div className={`p-1.5 rounded-lg bg-gradient-to-r ${currentMode.color}`}>
            <CurrentIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {currentMode.name}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = mode.id === userMode;
                
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleModeChange(mode.id)}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                      isActive ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${mode.color}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {mode.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {mode.description}
                      </p>
                    </div>
                    {isActive && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Mode
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select the experience level that matches your needs
        </p>
      </div>

      {/* Mode Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = mode.id === userMode;
          const isLocked = false; // For future: implement subscription logic

          return (
            <button
              key={mode.id}
              onClick={() => !isLocked && handleModeChange(mode.id)}
              disabled={isLocked}
              className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                isActive
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-500/20'
                  : isLocked
                  ? 'border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg'
              }`}
            >
              {/* Badge */}
              <span className={`absolute top-3 right-3 px-2 py-0.5 text-xs font-medium rounded-full ${
                mode.id === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                mode.id === 'pro' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' :
                'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
              }`}>
                {mode.badge}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${mode.color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {mode.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {mode.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {mode.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Active Indicator */}
              {isActive && (
                <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-700">
                  <span className="flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    <Check className="w-4 h-4" />
                    Currently Active
                  </span>
                </div>
              )}

              {/* Locked Overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-900/50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Coming Soon</span>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Info Note */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          💡 <strong>Tip:</strong> Start with Beginner Mode to learn the basics, then upgrade to Pro Mode as you become more comfortable. All your data will be preserved when switching modes.
        </p>
      </div>
    </div>
  );
}
