/**
 * ============================================
 * DEVELOPER COMPONENT
 * ============================================
 * Shows information about the developer/creator.
 * Contains branding, contact info, and credits.
 */

import { Github, Mail, Globe, Heart, Code2, Building2, Sparkles, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export function Developer() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          👨‍💻 Developer Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Learn more about the creator of SEO Buddy and how to get in touch.
        </p>
      </div>

      {/* Developer Profile Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Logo */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white flex items-center justify-center shadow-xl flex-shrink-0 p-2">
              <img 
                src="https://i.postimg.cc/sfvLyGtG/logo.png" 
                alt="OSPranto Tech Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Obaida Siddque Pranto</h3>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-white/90">
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  CEO & Founder
                </span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  OSPranto Tech
                </span>
              </div>
              <p className="mt-4 text-white/80 max-w-lg text-sm md:text-base">
                Passionate developer focused on creating beginner-friendly tools that make 
                professional work accessible to everyone. Building the future, one project at a time.
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Contact Links */}
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-500" />
            Get In Touch
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* GitHub */}
            <a
              href="https://github.com/OSPrantoTech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center flex-shrink-0">
                <Github className="w-6 h-6 text-white dark:text-gray-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">GitHub</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">OSPrantoTech</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
            </a>

            {/* Email */}
            <a
              href="mailto:OSPranto.Official@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">Email</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">OSPranto.Official@gmail.com</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
            </a>
          </div>
        </CardContent>
      </Card>

      {/* About the Project */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-500" />
            About SEO Buddy
          </h4>
          
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              SEO Buddy is a beginner-friendly, AI-powered SEO tool designed to help website owners, 
              freelancers, and small businesses optimize their websites without needing complex 
              technical knowledge.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                <h5 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">🎯 Mission</h5>
                <p className="text-sm">
                  Make professional SEO accessible to everyone, regardless of technical background.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <h5 className="font-medium text-purple-700 dark:text-purple-300 mb-2">💡 Vision</h5>
                <p className="text-sm">
                  Empower beginners to compete with professionals using smart, AI-powered tools.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-purple-500" />
            Built With
          </h4>
          
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Copyright Notice */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <img 
              src="https://i.postimg.cc/sfvLyGtG/logo.png" 
              alt="OSPranto Tech Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">OSPranto Tech</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-3 text-sm">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>Made with love for beginners</span>
          </div>
          
          <p className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            © {new Date().getFullYear()} Obaida Siddque Pranto
          </p>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            CEO & Founder
          </p>
          
          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href="https://github.com/OSPrantoTech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:OSPranto.Official@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Support Banner */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <h4 className="text-xl font-bold mb-2">🚀 Like This Project?</h4>
          <p className="text-white/90 mb-4 text-sm md:text-base">
            If you find SEO Buddy helpful, consider giving it a star on GitHub or sharing it with others!
          </p>
          <a
            href="https://github.com/OSPrantoTech"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <Github className="w-5 h-5" />
            Star on GitHub
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
