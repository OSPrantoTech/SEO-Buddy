/**
 * ============================================
 * SEO BUDDY - MAIN APPLICATION
 * ============================================
 * 
 * Welcome to SEO Buddy! This is the main entry point of the application.
 * All 20+ SEO tools are FREE!
 * 
 * Created by Obaida Siddque Pranto (OSPranto Tech)
 */

import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Feature Components
import Dashboard from './components/features/Dashboard';
import PowerfulSEOChecker from './components/features/PowerfulSEOChecker';
import { AIContentGenerator } from './components/features/AIContentGenerator';
import { KeywordTool } from './components/features/KeywordTool';
import { PerformanceCheck } from './components/features/PerformanceCheck';
import { LearnSEO } from './components/features/LearnSEO';
import { Developer } from './components/features/Developer';
import { LearningCenter } from './components/features/LearningCenter';
import { ProjectManager } from './components/features/ProjectManager';
import AboutPlatform from './components/features/AboutPlatform';

// SEO Tools
import { BacklinkChecker } from './components/features/BacklinkChecker';
import { SERPPreview } from './components/features/SERPPreview';
import { SchemaGenerator } from './components/features/SchemaGenerator';
import { RobotsTxtGenerator } from './components/features/RobotsTxtGenerator';
import { SitemapGenerator } from './components/features/SitemapGenerator';
import { HeadingAnalyzer } from './components/features/HeadingAnalyzer';

// New SEO Tools
import { MetaTagsGenerator } from './components/features/MetaTagsGenerator';
import { SocialPreview } from './components/features/SocialPreview';
import { KeywordDensity } from './components/features/KeywordDensity';
import { ReadabilityChecker } from './components/features/ReadabilityChecker';
import { ImageSEO } from './components/features/ImageSEO';
import { RedirectChecker } from './components/features/RedirectChecker';

// Advanced SEO Tools
import { WordCounter } from './components/features/WordCounter';
import { CanonicalGenerator } from './components/features/CanonicalGenerator';
import { HreflangGenerator } from './components/features/HreflangGenerator';
import { DomainAgeChecker } from './components/features/DomainAgeChecker';
import { SEOAuditChecklist } from './components/features/SEOAuditChecklist';
import { LongTailKeywords } from './components/features/LongTailKeywords';
import { QRCodeGenerator } from './components/features/QRCodeGenerator';
import { JsonCreator } from './components/features/JsonCreator';
import { CodeErrorFinder } from './components/features/CodeErrorFinder';
import { ProjectAnalyzer } from './components/features/ProjectAnalyzer';
import AiCodeGenerator from './components/features/AiCodeGenerator';
import AIDebugSuite from './components/features/AIDebugSuite';
import AICodePlayground from './components/features/AICodePlayground';

// Developer Tools
import ColorPicker from './components/features/ColorPicker';
import JsonFormatter from './components/features/JsonFormatter';
import JsonToGo from './components/features/JsonToGo';
import Base64Converter from './components/features/Base64Converter';
import JwtDecoder from './components/features/JwtDecoder';
import PasswordGenerator from './components/features/PasswordGenerator';
import HashGenerator from './components/features/HashGenerator';
import UrlCleaner from './components/features/UrlCleaner';
import XmlFormatter from './components/features/XmlFormatter';
import MarkdownFormatter from './components/features/MarkdownFormatter';
import SqlFormatter from './components/features/SqlFormatter';
import FaviconGenerator from './components/features/FaviconGenerator';
import BarcodeGenerator from './components/features/BarcodeGenerator';
import DeveloperTools from './components/features/DeveloperTools';

// Business Tools
import { ReportGenerator } from './components/features/ReportGenerator';
import { ProposalGenerator } from './components/features/ProposalGenerator';
import { PricingCalculator } from './components/features/PricingCalculator';

export function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    const scrollY = window.scrollY;
    
    if (isMobileMenuOpen) {
      document.documentElement.classList.add('menu-open');
      document.body.classList.add('menu-open');
      document.body.style.top = `-${scrollY}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      const storedScrollY = parseInt(document.body.style.top || '0') * -1;
      if (storedScrollY > 0) {
        window.scrollTo(0, storedScrollY);
      }
    }

    return () => {
      document.documentElement.classList.remove('menu-open');
      document.body.classList.remove('menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    closeMobileMenu();
  };

  const renderContent = () => {
    switch (activeTab) {
      // Main Tools
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
      
      // SEO Tools
      case 'backlinks':
        return <BacklinkChecker />;
      case 'serp-preview':
        return <SERPPreview />;
      case 'meta-tags':
        return <MetaTagsGenerator />;
      case 'social-preview':
        return <SocialPreview />;
      case 'schema':
        return <SchemaGenerator />;
      case 'robots':
        return <RobotsTxtGenerator />;
      case 'sitemap':
        return <SitemapGenerator />;
      case 'headings':
        return <HeadingAnalyzer />;
      
      // Content Tools
      case 'word-counter':
        return <WordCounter />;
      case 'keyword-density':
        return <KeywordDensity />;
      case 'readability':
        return <ReadabilityChecker />;
      case 'image-seo':
        return <ImageSEO />;
      case 'redirect-checker':
        return <RedirectChecker />;
      
      // Advanced SEO
      case 'canonical':
        return <CanonicalGenerator />;
      case 'hreflang':
        return <HreflangGenerator />;
      case 'domain-age':
        return <DomainAgeChecker />;
      case 'seo-checklist':
        return <SEOAuditChecklist />;
      case 'longtail-keywords':
        return <LongTailKeywords />;
      case 'qr-generator':
        return <QRCodeGenerator />;
      case 'json-creator':
        return <JsonCreator />;
      case 'code-error-finder':
        return <CodeErrorFinder />;
      case 'project-analyzer':
        return <ProjectAnalyzer />;
      case 'ai-code-generator':
        return <AiCodeGenerator />;
      case 'ai-debug-suite':
        return <AIDebugSuite />;
      case 'ai-playground':
        return <AICodePlayground />;
      
      // Learning
      case 'learn':
        return <LearnSEO />;
      case 'learning':
        return <LearningCenter />;
      
      // Business
      case 'projects':
        return <ProjectManager />;
      case 'reports':
        return <ReportGenerator />;
      case 'proposals':
        return <ProposalGenerator />;
      case 'pricing':
        return <PricingCalculator />;
      
      // Developer Tools
      case 'color-picker':
        return <ColorPicker />;
      case 'json-formatter':
        return <JsonFormatter />;
      case 'json-to-go':
        return <JsonToGo />;
      case 'base64':
        return <Base64Converter />;
      case 'jwt-decoder':
        return <JwtDecoder />;
      case 'password-generator':
        return <PasswordGenerator />;
      case 'hash-generator':
        return <HashGenerator />;
      case 'url-cleaner':
        return <UrlCleaner />;
      case 'xml-formatter':
        return <XmlFormatter />;
      case 'markdown-formatter':
        return <MarkdownFormatter />;
      case 'sql-formatter':
        return <SqlFormatter />;
      case 'favicon-generator':
        return <FaviconGenerator />;
      case 'barcode-generator':
        return <BarcodeGenerator />;
      case 'developer-tools':
        return <DeveloperTools />;
      
      // Settings
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
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            duration: 3000,
          }}
        />

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {/* Fixed Header */}
          <Header 
            onMenuToggle={toggleMobileMenu} 
            isMobileMenuOpen={isMobileMenuOpen}
          />

          {/* Main Layout - Sidebar fixed on PC */}
          <div className="flex pt-16">
            {/* Fixed Sidebar */}
            <Sidebar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isMobileOpen={isMobileMenuOpen}
              onMobileClose={closeMobileMenu}
            />

            {/* Main Content - with left margin for fixed sidebar on PC */}
            <main className="flex-1 w-full min-w-0 flex flex-col lg:ml-56">
              <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 min-h-[calc(100vh-4rem)]">
                {renderContent()}
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </AppProvider>
    </ThemeProvider>
  );
}
