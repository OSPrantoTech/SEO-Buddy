/**
 * ============================================
 * THEME CONTEXT - Light/Dark Mode
 * ============================================
 * This manages the app's color theme (light or dark mode).
 * 
 * FOR BEGINNERS:
 * - React Context lets you share data across many components
 * - Without Context, you'd have to pass theme through every component
 * - This makes switching themes easy from anywhere in the app!
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Theme } from '../types';

// Define what the context will provide
interface ThemeContextType {
  theme: Theme;                     // Current theme ('light' or 'dark')
  toggleTheme: () => void;          // Function to switch themes
  setTheme: (theme: Theme) => void; // Function to set a specific theme
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Component
 * 
 * Wrap your app with this to enable theme switching everywhere.
 * It automatically saves the user's preference to localStorage.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check if user has a saved preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seo-buddy-theme') as Theme;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Apply theme class to document when it changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove old theme class and add new one
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Save preference to localStorage
    localStorage.setItem('seo-buddy-theme', theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setThemeState(current => current === 'light' ? 'dark' : 'light');
  };

  // Set a specific theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use the theme
 * 
 * HOW TO USE:
 * const { theme, toggleTheme } = useTheme();
 * 
 * Then you can check: if (theme === 'dark') { ... }
 * Or toggle: <button onClick={toggleTheme}>Switch Theme</button>
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
