/**
 * ============================================
 * SEO BUDDY PRO - TYPE DEFINITIONS
 * ============================================
 * Complete SEO Career Platform Types
 */

// ===========================================
// USER & MODE TYPES
// ===========================================

export type UserMode = 'beginner' | 'pro';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mode: UserMode;
  createdAt: Date;
  avatar?: string;
}

// ===========================================
// PROJECT & CLIENT TYPES
// ===========================================

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website: string;
  notes?: string;
  createdAt: Date;
  projects: Project[];
}

export interface Project {
  id: string;
  clientId?: string;
  name: string;
  url: string;
  description?: string;
  createdAt: Date;
  lastAnalyzed?: Date;
  seoHistory: SEOHistoryEntry[];
  status: 'active' | 'completed' | 'paused';
  roadmap?: SEORoadmap;
  contentCalendar?: ContentCalendarItem[];
}

export interface SEOHistoryEntry {
  id: string;
  date: Date;
  score: number;
  grade: string;
  summary: {
    critical: number;
    warnings: number;
    passed: number;
  };
}

// ===========================================
// LEARNING SYSTEM TYPES
// ===========================================

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: Lesson[];
  icon: string;
  color: string;
  unlocked: boolean;
  completed: boolean;
  progress: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  keyTakeaways: string[];
  practicalExample?: string;
  quiz?: QuizQuestion[];
  completed: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// ===========================================
// SEO ROADMAP & PLANNING TYPES
// ===========================================

export interface SEORoadmap {
  id: string;
  projectId: string;
  createdAt: Date;
  duration: '30' | '60' | '90';
  phases: RoadmapPhase[];
  currentPhase: number;
  completedTasks: number;
  totalTasks: number;
}

export interface RoadmapPhase {
  id: string;
  name: string;
  description: string;
  week: number;
  tasks: RoadmapTask[];
  status: 'pending' | 'in-progress' | 'completed';
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  completed: boolean;
  dueDate?: Date;
}

// ===========================================
// CONTENT CALENDAR TYPES
// ===========================================

export interface ContentCalendarItem {
  id: string;
  date: Date;
  title: string;
  type: 'blog' | 'social' | 'video' | 'email' | 'other';
  keywords: string[];
  status: 'planned' | 'draft' | 'published';
  notes?: string;
}

// ===========================================
// FREELANCING & EARNING TYPES
// ===========================================

export interface SEOAuditReport {
  id: string;
  projectId: string;
  clientName: string;
  websiteUrl: string;
  generatedAt: Date;
  overallScore: number;
  grade: string;
  executiveSummary: string;
  sections: AuditReportSection[];
  recommendations: AuditRecommendation[];
  pricing?: ServicePricing;
}

export interface AuditReportSection {
  title: string;
  score: number;
  status: 'good' | 'needs-work' | 'critical';
  findings: string[];
  recommendations: string[];
}

export interface AuditRecommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  estimatedImpact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

export interface ServicePricing {
  service: string;
  difficulty: 'basic' | 'standard' | 'premium';
  suggestedPrice: {
    min: number;
    max: number;
    currency: string;
  };
  includes: string[];
  timeline: string;
}

export interface Proposal {
  id: string;
  clientName: string;
  projectTitle: string;
  createdAt: Date;
  services: ProposalService[];
  totalPrice: number;
  timeline: string;
  terms: string[];
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
}

export interface ProposalService {
  name: string;
  description: string;
  price: number;
  deliverables: string[];
}

// ===========================================
// AI FEATURES TYPES
// ===========================================

export interface AICompetitorAnalysis {
  competitorUrl: string;
  strengths: string[];
  weaknesses: string[];
  keywords: string[];
  contentGaps: string[];
  opportunities: string[];
}

export interface AIActionChecklist {
  immediate: ActionItem[];
  shortTerm: ActionItem[];
  longTerm: ActionItem[];
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

// ===========================================
// EXISTING TYPES (UPDATED)
// ===========================================

export interface SEOAnalysisResult {
  score: number;
  title: TitleAnalysis;
  description: MetaDescriptionAnalysis;
  keywords: KeywordAnalysis;
  performance: PerformanceAnalysis;
  suggestions: Suggestion[];
}

export interface TitleAnalysis {
  exists: boolean;
  length: number;
  isOptimal: boolean;
  content: string;
  score: number;
}

export interface MetaDescriptionAnalysis {
  exists: boolean;
  length: number;
  isOptimal: boolean;
  content: string;
  score: number;
}

export interface KeywordAnalysis {
  found: string[];
  density: number;
  score: number;
}

export interface PerformanceAnalysis {
  mobileScore: number;
  speedScore: number;
  isResponsive: boolean;
}

export interface Suggestion {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  description: string;
  howToFix?: string;
  learnMoreLink?: string;
}

export interface AIContent {
  titles: string[];
  descriptions: string[];
  keywords: string[];
}

export type Theme = 'light' | 'dark';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  tooltip: string;
  badge?: string;
  proOnly?: boolean;
  agencyOnly?: boolean;
}
