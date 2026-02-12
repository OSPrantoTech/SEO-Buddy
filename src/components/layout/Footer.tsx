/**
 * ============================================
 * FOOTER COMPONENT
 * ============================================
 * Footer with developer/company information.
 */

import { Heart, Globe, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Logo and Company */}
          <div className="flex items-center gap-3">
            <img 
              src="https://i.postimg.cc/sfvLyGtG/logo.png" 
              alt="OSPranto Tech Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">OSPranto Tech</h3>
              <p className="text-gray-400 text-sm">Building the Future</p>
            </div>
          </div>

          {/* Developer Info */}
          <div className="border-t border-gray-700 pt-4 mt-4 w-full max-w-md">
            <p className="text-lg font-semibold text-white mb-1">
              Obaida Siddque Pranto
            </p>
            <p className="text-indigo-400 text-sm mb-3">
              CEO & Founder, OSPranto Tech
            </p>
            
            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
              <a 
                href="https://www.OSPranto.pro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4 text-green-400" />
                <span>www.OSPranto.pro</span>
              </a>
              <span className="hidden sm:inline text-gray-600">|</span>
              <a 
                href="mailto:OSPranto.Official@gmail.com"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-red-400" />
                <span>OSPranto.Official@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Made with Love */}
          <div className="flex items-center gap-2 text-gray-400 text-sm pt-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>for Beginners</span>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-4 mt-2 w-full text-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} <span className="text-white font-medium">OSPranto Tech</span>. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Last Update: {currentDate}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
