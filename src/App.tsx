/**
 * ============================================
 * SEO BUDDY - MAIN APPLICATION
 * ============================================
 * 
 * Welcome to SEO Buddy! This is the main entry point of the application.
 * 
 * STRUCTURE:
 * - ThemeProvider: Manages light/dark mode
 * - Header: Top navigation with logo and theme toggle
 * - Sidebar: Navigation menu for different tools
 * - Main Content: Displays the active tool
 * - Footer: Branding and contact information
 * 
 * HOW TO ADD NEW TOOLS:
 * 1. Create a new component in src/components/features/
 * 2. Add it to the navItems in Sidebar.tsx
 * 3. Add it to the renderContent() function below
 * 
 * Created by Obaida Siddque Prant (OSPranto Tech)
 */

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import Dashboard from './components/features/Dashboard';
import PowerfulSEOChecker from './components/features/PowerfulSEOChecker';
import { AIContentGenerator } from './components/features/AIContentGenerator';
import { KeywordTool } from './components/features/KeywordTool';
import { PerformanceCheck } from './components/features/PerformanceCheck';
import { LearnSEO } from './components/features/LearnSEO';
import { Developer } from './components/features/Developer';
import { LearningCenter } from './components/features/LearningCenter';
import { ProjectManager } from './components/features/ProjectManager';
import { ModeSelector } from './components/features/ModeSelector';
import AboutPlatform from './components/features/AboutPlatform';

export function App() {
  // Track which tool is currently active
  const [activeTab, setActiveTab] = useState('home');
  
  // Track if mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const scrollY = window.scrollY;
    
    if (isMobileMenuOpen) {
      // Store current scroll position and lock body
      document.documentElement.classList.add('menu-open');
      document.body.classList.add('menu-open');
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Restore scroll position and unlock body
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      const storedScrollY = parseInt(document.body.style.top || '0') * -1;
      if (storedScrollY > 0) {
        window.scrollTo(0, storedScrollY);
      }
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  // Change active tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    closeMobileMenu();
  };

  /**
   * Renders the content based on active tab
   * 
   * TO ADD A NEW TOOL:
   * 1. Import your component at the top
   * 2. Add a new case here with your tool's ID
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onNavigate={handleTabChange} />;
      case 'seo-checker':
        return <PowerfulSEOChecker />;
      case 'ai-generator':
        return <AIContentGenerator />;
      case 'keywords':
        return <KeywordTool />;
      case 'performance':
        return <PerformanceCheck />;
      case 'learn':
        return <LearnSEO />;
      case 'learning':
        return <LearningCenter />;
      case 'projects':
        return <ProjectManager />;
      case 'mode':
        return <ModeSelector onModeChange={() => handleTabChange('home')} />;
      case 'about':
        return <AboutPlatform onNavigate={handleTabChange} />;
      case 'developer':
        return <Developer />;
      default:
        return <Dashboard onNavigate={handleTabChange} />;
    }
  };

  return (
    <ThemeProvider>
      <AppProvider>
      {/* Toast notifications for feedback */}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 3000,
        }}
      />

      {/* Main app container */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header - always visible at top */}
        <Header 
          onMenuToggle={toggleMobileMenu} 
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Main layout with sidebar and content */}
        <div className="flex min-h-[calc(100vh-4rem)]">
          {/* Sidebar navigation */}
          <Sidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            isMobileOpen={isMobileMenuOpen}
            onMobileClose={closeMobileMenu}
          />

          {/* Main content area */}
          <main className="flex-1 w-full min-w-0 flex flex-col">
            <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              {renderContent()}
            </div>

            {/* Footer */}
            <Footer />
          </main>
        </div>
      </div>
      </AppProvider>
    </ThemeProvider>
  );
}
