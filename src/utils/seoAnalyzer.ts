/**
 * ============================================
 * SEO ANALYZER UTILITIES
 * ============================================
 * These functions help analyze SEO elements of a webpage.
 * Each function is well-commented for beginners to understand.
 */

import type { SEOAnalysisResult, Suggestion } from '../types';

/**
 * Analyzes a title tag and returns insights
 * 
 * WHY THIS MATTERS:
 * - Google displays about 50-60 characters of your title
 * - A good title helps people understand what your page is about
 * - It also helps search engines rank your page
 */
export function analyzeTitle(title: string): {
  exists: boolean;
  length: number;
  isOptimal: boolean;
  content: string;
  score: number;
} {
  const length = title.trim().length;
  
  // Optimal title length is 50-60 characters
  const isOptimal = length >= 50 && length <= 60;
  
  // Calculate score based on length
  let score = 0;
  if (length === 0) {
    score = 0; // No title = bad!
  } else if (length < 30) {
    score = 40; // Too short
  } else if (length < 50) {
    score = 70; // Getting better
  } else if (length <= 60) {
    score = 100; // Perfect!
  } else if (length <= 70) {
    score = 80; // A bit long but okay
  } else {
    score = 50; // Too long, will be cut off
  }

  return {
    exists: length > 0,
    length,
    isOptimal,
    content: title.trim(),
    score
  };
}

/**
 * Analyzes a meta description
 * 
 * WHY THIS MATTERS:
 * - Google shows about 150-160 characters of your description
 * - A good description convinces people to click your link
 * - It's like a mini-advertisement for your page!
 */
export function analyzeMetaDescription(description: string): {
  exists: boolean;
  length: number;
  isOptimal: boolean;
  content: string;
  score: number;
} {
  const length = description.trim().length;
  
  // Optimal description length is 150-160 characters
  const isOptimal = length >= 150 && length <= 160;
  
  let score = 0;
  if (length === 0) {
    score = 0;
  } else if (length < 70) {
    score = 40;
  } else if (length < 150) {
    score = 70;
  } else if (length <= 160) {
    score = 100;
  } else if (length <= 200) {
    score = 75;
  } else {
    score = 50;
  }

  return {
    exists: length > 0,
    length,
    isOptimal,
    content: description.trim(),
    score
  };
}

/**
 * Extracts keywords from text content
 * Simple keyword extraction for beginners
 */
export function extractKeywords(text: string): string[] {
  // Remove common words (stop words) that don't help SEO
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we',
    'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how', 'all',
    'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such',
    'no', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just'
  ]);

  // Clean and split text into words
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Count word frequency
  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  // Return top keywords sorted by frequency
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word);
}

/**
 * Generates SEO improvement suggestions
 * Written in simple, friendly language for beginners
 */
export function generateSuggestions(analysis: Partial<SEOAnalysisResult>): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Title suggestions
  if (analysis.title) {
    if (!analysis.title.exists) {
      suggestions.push({
        id: 'title-missing',
        type: 'error',
        title: '❌ Missing Page Title',
        description: 'Your page doesn\'t have a title tag. This is very important for SEO!',
        howToFix: 'Add a <title> tag in your HTML <head> section. Example: <title>My Awesome Page - Best Tips</title>'
      });
    } else if (analysis.title.length < 30) {
      suggestions.push({
        id: 'title-short',
        type: 'warning',
        title: '⚠️ Title Too Short',
        description: `Your title is only ${analysis.title.length} characters. Aim for 50-60 characters.`,
        howToFix: 'Add more descriptive words to your title. Include your main keyword and make it compelling!'
      });
    } else if (analysis.title.length > 60) {
      suggestions.push({
        id: 'title-long',
        type: 'warning',
        title: '⚠️ Title Too Long',
        description: `Your title is ${analysis.title.length} characters. Google may cut it off after 60 characters.`,
        howToFix: 'Shorten your title to 50-60 characters. Put the most important words first!'
      });
    } else {
      suggestions.push({
        id: 'title-good',
        type: 'success',
        title: '✅ Great Title Length',
        description: 'Your title length is perfect for search engines!',
      });
    }
  }

  // Description suggestions
  if (analysis.description) {
    if (!analysis.description.exists) {
      suggestions.push({
        id: 'desc-missing',
        type: 'error',
        title: '❌ Missing Meta Description',
        description: 'Your page doesn\'t have a meta description. Google might show random text instead!',
        howToFix: 'Add a meta description tag: <meta name="description" content="Your page description here...">'
      });
    } else if (analysis.description.length < 120) {
      suggestions.push({
        id: 'desc-short',
        type: 'warning',
        title: '⚠️ Description Too Short',
        description: `Your description is only ${analysis.description.length} characters. Aim for 150-160 characters.`,
        howToFix: 'Expand your description to include more details about your page. Make it interesting!'
      });
    } else if (analysis.description.length > 160) {
      suggestions.push({
        id: 'desc-long',
        type: 'warning',
        title: '⚠️ Description Too Long',
        description: `Your description is ${analysis.description.length} characters. It may be cut off in search results.`,
        howToFix: 'Trim your description to 150-160 characters. Focus on the most important information.'
      });
    } else {
      suggestions.push({
        id: 'desc-good',
        type: 'success',
        title: '✅ Great Description Length',
        description: 'Your meta description length is perfect!',
      });
    }
  }

  return suggestions;
}

/**
 * Calculates overall SEO score from individual scores
 * Simple weighted average for beginners to understand
 */
export function calculateOverallScore(scores: {
  title: number;
  description: number;
  keywords: number;
  performance: number;
}): number {
  // Each factor has different importance (weight)
  const weights = {
    title: 0.3,        // 30% - Title is very important
    description: 0.25, // 25% - Description matters a lot too
    keywords: 0.25,    // 25% - Keywords help ranking
    performance: 0.2   // 20% - Speed is increasingly important
  };

  const weightedScore = 
    scores.title * weights.title +
    scores.description * weights.description +
    scores.keywords * weights.keywords +
    scores.performance * weights.performance;

  return Math.round(weightedScore);
}
