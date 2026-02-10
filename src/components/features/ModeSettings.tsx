/**
 * ============================================
 * MODE SETTINGS COMPONENT
 * ============================================
 * Allows users to switch between Beginner/Pro/Agency modes.
 * Each mode unlocks different features.
 */

import { Check, Lock, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useMode, modeConfig, AppMode } from '../../context/ModeContext';
import { cn } from '../../utils/cn';

export function ModeSettings() {
  const { mode, setMode } = useMode();

  const modes: { key: AppMode; icon: string; color: string; bgColor: string; borderColor: string }[] = [
    {
      key: 'beginner',
      icon: '🌱',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-500'
    },
    {
      key: 'pro',
      icon: '⚡',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-500'
    },
    {
      key: 'agency',
      icon: '🏢',
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-500'
    }
  ];

  const handleModeChange = (newMode: AppMode) => {
    setMode(newMode);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          ⚙️ Mode Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose the mode that fits your experience level
        </p>
      </div>

      {/* Current Mode Indicator */}
      <Card className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Currently Active</p>
            <p className="text-xl font-bold flex items-center gap-2">
              <span>{modeConfig[mode].icon}</span>
              <span>{modeConfig[mode].name} Mode</span>
            </p>
          </div>
          <Sparkles className="w-8 h-8 opacity-50" />
        </div>
      </Card>

      {/* Mode Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((modeItem) => {
          const config = modeConfig[modeItem.key];
          const isActive = mode === modeItem.key;

          return (
            <Card
              key={modeItem.key}
              className={cn(
                'p-6 transition-all duration-300 cursor-pointer',
                isActive 
                  ? `${modeItem.bgColor} border-2 ${modeItem.borderColor} shadow-lg` 
                  : 'hover:shadow-md border-2 border-transparent'
              )}
              onClick={() => handleModeChange(modeItem.key)}
            >
              {/* Mode Icon & Name */}
              <div className="text-center mb-4">
                <span className="text-4xl">{modeItem.icon}</span>
                <h3 className={cn('text-xl font-bold mt-2', modeItem.color)}>
                  {config.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {config.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2 mb-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Available Features
                </p>
                {config.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Locked Features */}
              {config.lockedFeatures.length > 0 && (
                <div className="space-y-2 mb-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Not Available
                  </p>
                  {config.lockedFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm opacity-50">
                      <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-gray-500 dark:text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Select Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModeChange(modeItem.key);
                }}
                className={cn(
                  'w-full mt-4',
                  isActive 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : ''
                )}
                variant={isActive ? 'primary' : 'secondary'}
              >
                {isActive ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Active
                  </>
                ) : (
                  'Select Mode'
                )}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Mode Comparison Table */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          📊 Mode Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-gray-600 dark:text-gray-400">Feature</th>
                <th className="text-center py-3 px-4 text-green-600">🌱 Beginner</th>
                <th className="text-center py-3 px-4 text-indigo-600">⚡ Pro</th>
                <th className="text-center py-3 px-4 text-amber-600">🏢 Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">SEO Checker</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">AI Generator</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Keyword Research</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Learning Roadmap</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Speed Check</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Project Management</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Report Generation</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Client Management</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Proposal Generator</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Pricing Calculator</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">❌</td>
                <td className="text-center py-3 px-4">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
          💡 Which mode should I choose?
        </h3>
        <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
          <li>
            <strong>🌱 Beginner:</strong> You're new to SEO and want to learn the basics
          </li>
          <li>
            <strong>⚡ Pro:</strong> You understand SEO and want to work on your own projects
          </li>
          <li>
            <strong>🏢 Agency:</strong> You do SEO for clients and need full business tools
          </li>
        </ul>
      </Card>
    </div>
  );
}
