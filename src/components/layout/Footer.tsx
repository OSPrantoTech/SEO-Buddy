/**
 * ============================================
 * FOOTER COMPONENT
 * ============================================
 * Simple footer with quick copyright info.
 * Main developer info is now in the Developer page.
 */

import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <img 
              src="https://i.postimg.cc/sfvLyGtG/logo.png" 
              alt="OSPranto Tech Logo" 
              className="w-5 h-5 object-contain"
            />
            <span className="font-medium text-gray-700 dark:text-gray-300">OSPranto Tech</span>
          </div>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by
            <span className="font-medium text-gray-700 dark:text-gray-300 ml-1">Obaida Siddque Pranto</span>
          </span>
          <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
          <span>© {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}
