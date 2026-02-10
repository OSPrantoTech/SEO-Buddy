/**
 * ============================================
 * HEADER COMPONENT
 * ============================================
 * The top navigation bar with logo and theme toggle.
 */

import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button and Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle - on the left */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="https://i.postimg.cc/sfvLyGtG/logo.png" 
                alt="OSPranto Tech Logo" 
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain flex-shrink-0"
              />
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  SEO Buddy
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  by OSPranto Tech
                </p>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
