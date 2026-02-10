/**
 * ============================================
 * MODE CONTEXT
 * ============================================
 * Manages the application mode (Beginner/Pro/Agency)
 * and provides mode-specific functionality.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the available modes
export type AppMode = 'beginner' | 'pro' | 'agency';

// Mode configuration with features and descriptions
export const modeConfig = {
  beginner: {
    name: 'Beginner',
    description: 'Perfect for learning SEO basics',
    icon: '🌱',
    color: 'green',
    features: [
      'Basic SEO Checker',
      'AI Content Generator',
      'Keyword Research',
      'SEO Learning Roadmap',
      'Quick Guides'
    ],
    lockedFeatures: [
      'Speed & Performance Check',
      'Project Management',
      'Report Generation',
      'Client Management',
      'Proposal Generator',
      'Pricing Calculator'
    ]
  },
  pro: {
    name: 'Pro',
    description: 'For professional SEO work',
    icon: '⚡',
    color: 'indigo',
    features: [
      'All Beginner Features',
      'Speed & Performance Check',
      'Project Management',
      'SEO Audit Reports',
      'Advanced Analysis'
    ],
    lockedFeatures: [
      'Client Management',
      'Proposal Generator',
      'Pricing Calculator'
    ]
  },
  agency: {
    name: 'Agency',
    description: 'Full agency toolkit',
    icon: '🏢',
    color: 'amber',
    features: [
      'All Pro Features',
      'Client Management',
      'Proposal Generator',
      'Pricing Calculator',
      'Team Collaboration',
      'White-label Reports'
    ],
    lockedFeatures: []
  }
};

// Context type
interface ModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  modeInfo: typeof modeConfig.beginner;
  isFeatureAvailable: (feature: string) => boolean;
}

// Create context
const ModeContext = createContext<ModeContextType | undefined>(undefined);

// Provider component
export function ModeProvider({ children }: { children: ReactNode }) {
  // Initialize mode from localStorage or default to 'beginner'
  const [mode, setModeState] = useState<AppMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('seo-buddy-mode');
      if (savedMode && ['beginner', 'pro', 'agency'].includes(savedMode)) {
        return savedMode as AppMode;
      }
    }
    return 'beginner';
  });

  // Save mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('seo-buddy-mode', mode);
  }, [mode]);

  // Set mode function
  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
  };

  // Get current mode info
  const modeInfo = modeConfig[mode];

  // Check if a feature is available in current mode
  const isFeatureAvailable = (feature: string): boolean => {
    const features = modeInfo.features as string[];
    const lockedFeatures = modeInfo.lockedFeatures as string[];
    return features.includes(feature) || !lockedFeatures.includes(feature);
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, modeInfo, isFeatureAvailable }}>
      {children}
    </ModeContext.Provider>
  );
}

// Hook to use mode context
export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
