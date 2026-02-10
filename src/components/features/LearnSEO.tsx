/**
 * ============================================
 * LEARN SEO COMPONENT
 * ============================================
 * Beginner-friendly SEO tutorials and guides.
 * Explains SEO concepts in simple language.
 */

import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Lightbulb, Target, TrendingUp, FileText, Link, Image, Gauge } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

// SEO Topics data
const seoTopics = [
  {
    id: 'what-is-seo',
    title: 'What is SEO?',
    icon: Target,
    color: 'text-blue-500',
    content: `
      **SEO stands for Search Engine Optimization.** It's a set of practices that help your website appear higher in Google (and other search engines) when people search for things related to your content.

      **Think of it like this:** Imagine you have a store. SEO is like putting up signs, keeping your store organized, and making sure people can find you easily. The better your "signs" (SEO), the more customers (visitors) you'll get!

      **Why does it matter?**
      • 93% of online experiences start with a search engine
      • The first 5 results on Google get 67% of all clicks
      • Good SEO = more visitors = more opportunities for your business
    `
  },
  {
    id: 'title-tags',
    title: 'Title Tags - Your Page\'s Name',
    icon: FileText,
    color: 'text-indigo-500',
    content: `
      **What is a title tag?** It's the clickable headline you see in Google search results. It also appears in your browser tab.

      **Why it matters:** Google uses your title to understand what your page is about. A good title also convinces people to click!

      **How to write a great title:**
      • Keep it between 50-60 characters (Google cuts off longer titles)
      • Include your main keyword near the beginning
      • Make it compelling - give people a reason to click
      • Each page should have a unique title

      **Example of a good title:**
      "10 Easy Vegan Recipes for Beginners - Quick & Delicious"

      **Example of a bad title:**
      "Recipes" (too short, not descriptive)
    `
  },
  {
    id: 'meta-descriptions',
    title: 'Meta Descriptions - Your Page\'s Summary',
    icon: FileText,
    color: 'text-green-500',
    content: `
      **What is a meta description?** It's the short paragraph that appears under your title in Google search results.

      **Why it matters:** While it doesn't directly affect rankings, a good description convinces people to click your link instead of others.

      **How to write a great meta description:**
      • Keep it between 150-160 characters
      • Include your main keyword naturally
      • Add a call-to-action like "Learn more" or "Get started today"
      • Accurately describe what's on the page
      • Make it unique for each page

      **Example:**
      "Discover 10 easy vegan recipes perfect for beginners. Quick, delicious meals ready in 30 minutes or less. Start your healthy journey today!"
    `
  },
  {
    id: 'keywords',
    title: 'Keywords - What People Search For',
    icon: TrendingUp,
    color: 'text-purple-500',
    content: `
      **What are keywords?** Keywords are the words and phrases people type into Google when searching. Your goal is to use the same words on your page so Google can match you with those searches.

      **Types of keywords:**
      • **Short-tail:** 1-2 words like "shoes" (high competition, hard to rank)
      • **Long-tail:** 3+ words like "best running shoes for beginners" (less competition, easier to rank)

      **How to use keywords:**
      • Include your main keyword in your title
      • Use it in your first paragraph
      • Add it to headings (H1, H2, H3)
      • Sprinkle related keywords throughout naturally
      • Don't "stuff" keywords - it hurts your SEO!

      **Tip for beginners:** Focus on long-tail keywords. They're specific, have less competition, and the people searching them usually know what they want!
    `
  },
  {
    id: 'content',
    title: 'Content is King',
    icon: BookOpen,
    color: 'text-yellow-500',
    content: `
      **Why content matters:** Google wants to show users the best, most helpful content. If your content is valuable, Google will rank it higher.

      **What makes content "good" for SEO:**
      • **Helpful:** Actually answers what people are searching for
      • **Original:** Don't copy from other sites
      • **Well-organized:** Use headings (H1, H2, H3) to structure your content
      • **Comprehensive:** Cover the topic thoroughly
      • **Updated:** Keep information current

      **Content tips:**
      • Write for humans first, search engines second
      • Break up text with bullet points, images, and headings
      • Aim for at least 300 words (more for competitive topics)
      • Answer questions your audience might have
      • Use simple language - if a 10-year-old can understand it, you're doing great!
    `
  },
  {
    id: 'links',
    title: 'Links - Building Connections',
    icon: Link,
    color: 'text-red-500',
    content: `
      **There are two types of links that matter for SEO:**

      **1. Internal Links (links between your own pages)**
      • Help visitors navigate your site
      • Help Google understand your site structure
      • Pass "authority" between your pages
      • Example: Linking from your homepage to your blog posts

      **2. External Links (links from other websites to yours)**
      • Also called "backlinks"
      • Act like votes of confidence
      • More quality backlinks = higher rankings
      • Quality matters more than quantity

      **How to get backlinks:**
      • Create amazing content others want to share
      • Guest post on other blogs
      • Build relationships with others in your industry
      • Create free tools or resources
      • Never buy links - Google penalizes this!
    `
  },
  {
    id: 'images',
    title: 'Image Optimization',
    icon: Image,
    color: 'text-pink-500',
    content: `
      **Why optimize images?**
      • Large images slow down your page (bad for SEO)
      • Proper naming helps Google understand your images
      • Images can appear in Google Image Search (extra traffic!)

      **How to optimize images:**

      **1. File name:** Use descriptive names
      • Bad: IMG_12345.jpg
      • Good: chocolate-chip-cookies-recipe.jpg

      **2. Alt text:** Describe the image for screen readers and Google
      • Example: alt="Freshly baked chocolate chip cookies on a cooling rack"

      **3. File size:** Compress images before uploading
      • Use tools like TinyPNG or Squoosh
      • Aim for under 100KB when possible

      **4. Format:** Use modern formats like WebP for better compression
    `
  },
  {
    id: 'page-speed',
    title: 'Page Speed - Faster is Better',
    icon: Gauge,
    color: 'text-orange-500',
    content: `
      **Why speed matters:**
      • Google uses page speed as a ranking factor
      • Slow pages = people leave (higher "bounce rate")
      • 53% of mobile users leave if a page takes over 3 seconds to load

      **How to improve page speed:**

      **Quick wins:**
      • Compress and resize images
      • Use a caching plugin (for WordPress)
      • Choose a fast web hosting provider
      • Minimize plugins/widgets you don't need

      **Technical improvements:**
      • Enable browser caching
      • Minify CSS and JavaScript
      • Use a Content Delivery Network (CDN)
      • Enable GZIP compression

      **How to check your speed:**
      • Use our Speed Check tool!
      • Or try Google PageSpeed Insights (free)
      • Aim for a score of 80+ on mobile
    `
  }
];

export function LearnSEO() {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('what-is-seo');

  const toggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  // Simple markdown-like parser for content
  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      // Bold text
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        return (
          <p key={index} className="font-semibold text-gray-900 dark:text-white mt-4 mb-2">
            {trimmedLine.slice(2, -2)}
          </p>
        );
      }
      
      // Bullet points
      if (trimmedLine.startsWith('•')) {
        return (
          <li key={index} className="ml-4 text-gray-600 dark:text-gray-400">
            {formatInlineText(trimmedLine.slice(1).trim())}
          </li>
        );
      }
      
      // Empty lines
      if (!trimmedLine) {
        return <br key={index} />;
      }
      
      // Regular paragraph
      return (
        <p key={index} className="text-gray-600 dark:text-gray-400">
          {formatInlineText(trimmedLine)}
        </p>
      );
    });
  };

  // Format inline bold text
  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📚 Learn SEO - Beginner's Guide
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about SEO, explained in simple terms. 
          Click on any topic to learn more!
        </p>
      </div>

      {/* Quick tip */}
      <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800">
        <CardContent className="p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 flex-shrink-0" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base">Pro Tip for Beginners</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Don't try to learn everything at once! Start with the basics (titles, descriptions, keywords) 
              and gradually add more techniques. SEO is a marathon, not a sprint!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Topics Accordion */}
      <div className="space-y-3">
        {seoTopics.map((topic) => {
          const Icon = topic.icon;
          const isExpanded = expandedTopic === topic.id;

          return (
            <Card key={topic.id} padding="none" className="overflow-hidden">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full flex items-center justify-between p-3 md:p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 md:p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${topic.color} flex-shrink-0`}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-sm md:text-base">
                    {topic.title}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-3 md:px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="pt-4 prose prose-sm dark:prose-invert max-w-none text-xs md:text-sm">
                    {formatContent(topic.content)}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-base md:text-lg">🎯 SEO Checklist for Beginners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4 text-xs md:text-sm">
            <div className="space-y-2">
              <p className="font-medium text-gray-900 dark:text-white">On Every Page:</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>☐ Unique, descriptive title (50-60 chars)</li>
                <li>☐ Compelling meta description (150-160 chars)</li>
                <li>☐ Main keyword in title and first paragraph</li>
                <li>☐ Organized headings (H1, H2, H3)</li>
                <li>☐ Optimized images with alt text</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900 dark:text-white">Overall Site:</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>☐ Fast loading speed (under 3 seconds)</li>
                <li>☐ Mobile-friendly design</li>
                <li>☐ SSL certificate (https://)</li>
                <li>☐ Internal links between pages</li>
                <li>☐ Quality, helpful content</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
