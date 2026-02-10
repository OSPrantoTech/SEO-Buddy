/**
 * ============================================
 * APP CONTEXT - Global State Management
 * ============================================
 * Manages user mode, projects, clients, and learning progress
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserMode, Project, Client, LearningModule, SEOHistoryEntry } from '../types';

interface AppState {
  // User Mode
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'seoHistory'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addSEOHistory: (projectId: string, entry: Omit<SEOHistoryEntry, 'id' | 'date'>) => void;
  
  // Clients (Agency Mode)
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'projects'>) => Client;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  
  // Learning Progress
  learningModules: LearningModule[];
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  
  // Active Items
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  
  // Stats
  totalAnalyses: number;
  incrementAnalyses: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Default learning modules
const defaultLearningModules: LearningModule[] = [
  {
    id: 'seo-basics',
    title: 'SEO Fundamentals',
    description: 'Learn the core concepts of search engine optimization',
    level: 'beginner',
    duration: '30 min',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
    unlocked: true,
    completed: false,
    progress: 0,
    lessons: [
      {
        id: 'what-is-seo',
        title: 'What is SEO?',
        content: 'SEO (Search Engine Optimization) is the practice of optimizing your website to rank higher in search engine results...',
        keyTakeaways: ['SEO helps your website get found', 'Higher rankings = more traffic', 'SEO is a long-term strategy'],
        completed: false
      },
      {
        id: 'how-search-works',
        title: 'How Search Engines Work',
        content: 'Search engines like Google use crawlers to discover and index web pages...',
        keyTakeaways: ['Crawlers discover pages', 'Indexing stores page information', 'Algorithms determine rankings'],
        completed: false
      }
    ]
  },
  {
    id: 'on-page-seo',
    title: 'On-Page SEO Mastery',
    description: 'Master the elements you can control on your own pages',
    level: 'beginner',
    duration: '45 min',
    icon: '📝',
    color: 'from-green-500 to-emerald-500',
    unlocked: true,
    completed: false,
    progress: 0,
    lessons: [
      {
        id: 'title-tags',
        title: 'Perfecting Title Tags',
        content: 'Title tags are one of the most important on-page SEO elements...',
        keyTakeaways: ['Keep titles 50-60 characters', 'Include primary keyword', 'Make them compelling'],
        completed: false
      },
      {
        id: 'meta-descriptions',
        title: 'Writing Meta Descriptions',
        content: 'Meta descriptions are the snippets that appear below your title in search results...',
        keyTakeaways: ['150-160 characters ideal', 'Include call-to-action', 'Match search intent'],
        completed: false
      }
    ]
  },
  {
    id: 'keyword-research',
    title: 'Keyword Research Pro',
    description: 'Find and target the right keywords for your content',
    level: 'intermediate',
    duration: '60 min',
    icon: '🔑',
    color: 'from-purple-500 to-pink-500',
    unlocked: false,
    completed: false,
    progress: 0,
    lessons: []
  },
  {
    id: 'technical-seo',
    title: 'Technical SEO',
    description: 'Optimize the technical aspects of your website',
    level: 'advanced',
    duration: '90 min',
    icon: '⚙️',
    color: 'from-orange-500 to-red-500',
    unlocked: false,
    completed: false,
    progress: 0,
    lessons: []
  },
  {
    id: 'link-building',
    title: 'Link Building Strategies',
    description: 'Build high-quality backlinks to boost authority',
    level: 'advanced',
    duration: '75 min',
    icon: '🔗',
    color: 'from-indigo-500 to-purple-500',
    unlocked: false,
    completed: false,
    progress: 0,
    lessons: []
  }
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  // User Mode - persisted to localStorage
  const [userMode, setUserModeState] = useState<UserMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seo-buddy-mode') as UserMode;
      return saved || 'beginner';
    }
    return 'beginner';
  });

  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seo-buddy-projects');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Clients
  const [clients, setClients] = useState<Client[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seo-buddy-clients');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Learning Progress
  const [learningModules, setLearningModules] = useState<LearningModule[]>(defaultLearningModules);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('seo-buddy-lessons');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Active Project
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Stats
  const [totalAnalyses, setTotalAnalyses] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('seo-buddy-analyses') || '0');
    }
    return 0;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('seo-buddy-mode', userMode);
  }, [userMode]);

  useEffect(() => {
    localStorage.setItem('seo-buddy-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('seo-buddy-clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('seo-buddy-lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('seo-buddy-analyses', totalAnalyses.toString());
  }, [totalAnalyses]);

  // Functions
  const setUserMode = (mode: UserMode) => {
    setUserModeState(mode);
  };

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'seoHistory'>) => {
    const newProject: Project = {
      ...projectData,
      id: generateId(),
      createdAt: new Date(),
      seoHistory: []
    };
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addSEOHistory = (projectId: string, entry: Omit<SEOHistoryEntry, 'id' | 'date'>) => {
    const historyEntry: SEOHistoryEntry = {
      ...entry,
      id: generateId(),
      date: new Date()
    };
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, seoHistory: [...p.seoHistory, historyEntry], lastAnalyzed: new Date() }
        : p
    ));
  };

  const addClient = (clientData: Omit<Client, 'id' | 'createdAt' | 'projects'>) => {
    const newClient: Client = {
      ...clientData,
      id: generateId(),
      createdAt: new Date(),
      projects: []
    };
    setClients(prev => [...prev, newClient]);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      
      // Update module progress
      setLearningModules(prev => prev.map(module => {
        const moduleCompletedLessons = module.lessons.filter(
          l => completedLessons.includes(l.id) || l.id === lessonId
        ).length;
        const progress = (moduleCompletedLessons / module.lessons.length) * 100;
        const completed = progress === 100;
        
        return {
          ...module,
          progress,
          completed,
          lessons: module.lessons.map(l => ({
            ...l,
            completed: completedLessons.includes(l.id) || l.id === lessonId
          }))
        };
      }));
    }
  };

  const incrementAnalyses = () => {
    setTotalAnalyses(prev => prev + 1);
  };

  return (
    <AppContext.Provider value={{
      userMode,
      setUserMode,
      projects,
      addProject,
      updateProject,
      deleteProject,
      addSEOHistory,
      clients,
      addClient,
      updateClient,
      deleteClient,
      learningModules,
      completedLessons,
      markLessonComplete,
      activeProject,
      setActiveProject,
      totalAnalyses,
      incrementAnalyses
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
