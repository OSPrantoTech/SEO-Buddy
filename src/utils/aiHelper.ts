/**
 * ============================================
 * AI HELPER UTILITIES
 * ============================================
 * These functions simulate AI-powered content generation.
 * In a real app, these would call an AI API like OpenAI.
 * 
 * FOR BEGINNERS:
 * - These are mock functions that generate sample content
 * - To use real AI, you'd replace these with API calls
 * - We've included realistic examples to help you understand
 */

import type { AIContent } from '../types';

/**
 * Generates SEO-optimized titles based on a topic
 * 
 * HOW IT WORKS:
 * - Takes your topic and creates catchy, SEO-friendly titles
 * - Uses proven title formulas that attract clicks
 * - Keeps titles within the optimal 50-60 character range
 */
export async function generateAITitles(topic: string): Promise<string[]> {
  // Simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Clean the topic
  const cleanTopic = topic.trim().toLowerCase();

  // Title templates that work well for SEO
  const templates = [
    `${capitalize(cleanTopic)}: A Complete Beginner's Guide 2024`,
    `How to Master ${capitalize(cleanTopic)} in 5 Easy Steps`,
    `${capitalize(cleanTopic)} 101: Everything You Need to Know`,
    `The Ultimate ${capitalize(cleanTopic)} Guide for Beginners`,
    `Top 10 ${capitalize(cleanTopic)} Tips That Actually Work`,
    `${capitalize(cleanTopic)} Made Simple: Expert Tips & Tricks`,
    `Why ${capitalize(cleanTopic)} Matters: A Practical Guide`,
    `${capitalize(cleanTopic)} Best Practices for Success`
  ];

  // Return 5 random titles
  return shuffleArray(templates).slice(0, 5);
}

/**
 * Generates SEO-optimized meta descriptions
 * 
 * HOW IT WORKS:
 * - Creates compelling descriptions that encourage clicks
 * - Includes relevant keywords naturally
 * - Stays within 150-160 characters (optimal length)
 */
export async function generateAIDescriptions(topic: string): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 800));

  const cleanTopic = topic.trim().toLowerCase();

  const templates = [
    `Learn ${cleanTopic} with our easy-to-follow guide. Perfect for beginners! Get started today and see results fast.`,
    `Discover the secrets of ${cleanTopic}. Our step-by-step tutorial makes it simple for anyone to succeed.`,
    `Master ${cleanTopic} quickly with proven strategies. Expert tips designed for beginners. Start learning now!`,
    `Everything you need to know about ${cleanTopic} in one place. Simple explanations, practical tips, real results.`,
    `${capitalize(cleanTopic)} doesn't have to be complicated. Our beginner-friendly guide breaks it down step by step.`
  ];

  return templates;
}

/**
 * Suggests relevant keywords for a topic
 * 
 * HOW IT WORKS:
 * - Analyzes your topic to find related search terms
 * - Suggests long-tail keywords (specific phrases people search)
 * - Helps you understand what people are looking for
 */
export async function generateAIKeywords(topic: string): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 600));

  const cleanTopic = topic.trim().toLowerCase();

  // Common keyword patterns that work for most topics
  const keywordPatterns = [
    `${cleanTopic} for beginners`,
    `${cleanTopic} guide`,
    `${cleanTopic} tutorial`,
    `how to ${cleanTopic}`,
    `${cleanTopic} tips`,
    `best ${cleanTopic}`,
    `${cleanTopic} examples`,
    `${cleanTopic} 2024`,
    `learn ${cleanTopic}`,
    `${cleanTopic} basics`,
    `${cleanTopic} step by step`,
    `easy ${cleanTopic}`,
    `${cleanTopic} strategies`,
    `${cleanTopic} techniques`,
    `${cleanTopic} for dummies`
  ];

  return keywordPatterns;
}

/**
 * Generates SEO improvement suggestions based on content
 * 
 * HOW IT WORKS:
 * - Analyzes your current content
 * - Suggests specific improvements
 * - Explains WHY each change helps (beginner-friendly!)
 */
export async function generateAISuggestions(content: {
  title: string;
  description: string;
  keywords: string[];
}): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 700));

  const suggestions: string[] = [];

  // Title analysis
  if (content.title.length < 30) {
    suggestions.push('💡 Your title is short. Add more descriptive words to help Google understand your content.');
  }
  if (!content.title.match(/\d/)) {
    suggestions.push('💡 Consider adding a number to your title (like "5 Tips" or "2024 Guide") - these get more clicks!');
  }
  if (content.title.length > 0 && content.title === content.title.toLowerCase()) {
    suggestions.push('💡 Capitalize important words in your title. It looks more professional and gets more attention.');
  }

  // Description analysis  
  if (content.description.length > 0 && !content.description.includes('!') && !content.description.includes('?')) {
    suggestions.push('💡 Add a call-to-action to your description like "Learn more today!" to encourage clicks.');
  }

  // Keyword suggestions
  if (content.keywords.length === 0) {
    suggestions.push('💡 Add some focus keywords. Think about what words people would search to find your page.');
  }

  // General best practices
  suggestions.push('💡 Make sure your main keyword appears in your title, description, and first paragraph.');
  suggestions.push('💡 Use header tags (H1, H2, H3) to organize your content - search engines love this!');
  suggestions.push('💡 Add internal links to other pages on your website to help Google crawl your site.');
  suggestions.push('💡 Include images with descriptive alt text - this helps both SEO and accessibility.');

  return suggestions.slice(0, 6);
}

/**
 * Generates a complete AI content package
 */
export async function generateAIContent(topic: string): Promise<AIContent> {
  const [titles, descriptions, keywords] = await Promise.all([
    generateAITitles(topic),
    generateAIDescriptions(topic),
    generateAIKeywords(topic)
  ]);

  return { titles, descriptions, keywords };
}

// Helper: Capitalize first letter of each word
function capitalize(str: string): string {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Helper: Shuffle an array randomly
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
