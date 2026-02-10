/**
 * ============================================
 * LEARNING CENTER COMPONENT
 * ============================================
 * Complete SEO learning roadmap from beginner to advanced
 */

import { useState } from 'react';
import { 
  BookOpen, Trophy, Target, ChevronRight, Play, CheckCircle, 
  Lock, Star, Clock, ArrowLeft, Lightbulb, GraduationCap
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';

// Comprehensive learning modules
const learningRoadmap = [
  {
    id: 'foundation',
    title: 'SEO Foundation',
    description: 'Master the fundamentals of search engine optimization',
    level: 'beginner',
    duration: '2 hours',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-500',
    modules: [
      {
        id: 'what-is-seo',
        title: 'What is SEO?',
        duration: '10 min',
        content: `
# What is SEO?

**SEO (Search Engine Optimization)** is the practice of improving your website to increase its visibility when people search for products or services related to your business on Google and other search engines.

## Why SEO Matters

Think of Google as a giant library. When someone searches for something, Google acts as the librarian, finding the best books (websites) that answer the question. SEO helps your "book" get recommended more often.

### Key Benefits:
- **Free Traffic**: Unlike paid ads, organic traffic doesn't cost per click
- **Trust & Credibility**: Higher rankings = more trust from users
- **24/7 Marketing**: Your optimized pages work around the clock
- **Long-term Results**: Good SEO compounds over time

## How Search Engines Work

1. **Crawling**: Google sends out "crawlers" (like digital spiders) to discover web pages
2. **Indexing**: Found pages are stored in Google's massive database
3. **Ranking**: When someone searches, Google shows the most relevant, quality results

## The SEO Mindset

The #1 rule of SEO: **Create content that genuinely helps your audience**. Google's goal is to show users the best answers to their questions. If you focus on being helpful, you're already doing SEO right!
        `,
        keyTakeaways: [
          'SEO helps your website appear higher in search results',
          'Good SEO = more free traffic to your website',
          'Focus on helping users, and rankings will follow',
          'SEO is a long-term strategy, not a quick fix'
        ],
        practicalTip: 'Start by thinking about what questions your target audience might ask. These questions often become your best content topics and keywords!'
      },
      {
        id: 'keywords-basics',
        title: 'Understanding Keywords',
        duration: '15 min',
        content: `
# Understanding Keywords

**Keywords** are the words and phrases people type into search engines. Your goal is to understand what your audience searches for and create content that matches their intent.

## Types of Keywords

### 1. Short-tail Keywords (Head Terms)
- 1-2 words: "shoes", "marketing"
- High search volume, high competition
- Hard to rank for beginners

### 2. Long-tail Keywords
- 3+ words: "best running shoes for flat feet"
- Lower search volume, lower competition
- **Best for beginners** - easier to rank!

### 3. Intent-Based Keywords
- **Informational**: "how to tie shoes" (looking for info)
- **Commercial**: "best running shoes 2024" (researching options)
- **Transactional**: "buy Nike running shoes" (ready to purchase)
- **Navigational**: "Nike official website" (looking for specific site)

## Finding Keywords

1. Think like your customer - what would YOU search?
2. Use Google Autocomplete - start typing and see suggestions
3. Check "People Also Ask" boxes in search results
4. Use our Keyword Tool for more ideas!

## Where to Use Keywords

- Page title (most important!)
- First paragraph
- Headings (H1, H2, H3)
- Throughout content naturally
- Meta description
- Image alt text
        `,
        keyTakeaways: [
          'Keywords are what people search for in Google',
          'Long-tail keywords are easier to rank for',
          'Match your content to search intent',
          'Use keywords naturally - never stuff them!'
        ],
        practicalTip: 'Try this now: Go to Google and start typing your main topic. Note down 5 autocomplete suggestions - these are real keywords people search for!'
      },
      {
        id: 'title-description',
        title: 'Title Tags & Meta Descriptions',
        duration: '12 min',
        content: `
# Title Tags & Meta Descriptions

These are your first impression in search results. Think of them as your page's "advertisement" in Google.

## Title Tags

The title tag is the clickable headline in search results. It's also shown in browser tabs.

### Best Practices:
- **Length**: 50-60 characters (Google cuts off longer titles)
- **Keywords**: Include your main keyword, preferably near the beginning
- **Brand**: Add your brand name at the end (if space allows)
- **Compelling**: Make people WANT to click
- **Unique**: Every page needs a different title

### Formula for Great Titles:
\`[Primary Keyword] - [Benefit/Hook] | [Brand]\`

**Examples:**
- ✅ "Vegan Pasta Recipes: 15 Quick & Delicious Ideas | CookSimple"
- ❌ "Recipes" (too vague)
- ❌ "The Best Most Amazing Incredible Vegan Pasta Recipes Ever Made..." (too long)

## Meta Descriptions

The meta description is the snippet below your title in search results.

### Best Practices:
- **Length**: 150-160 characters
- **Include keyword**: Helps show relevance
- **Call-to-action**: "Learn more", "Discover", "Get started"
- **Match content**: Accurately describe what's on the page
- **Unique**: Different for each page

### Good vs Bad Examples:

✅ **Good**: "Discover 15 quick vegan pasta recipes that take under 30 minutes. Perfect for busy weeknights! Get cooking tips and ingredient swaps inside."

❌ **Bad**: "This page has recipes. We have lots of recipes. Click here for recipes."
        `,
        keyTakeaways: [
          'Title tags should be 50-60 characters',
          'Meta descriptions should be 150-160 characters',
          'Both should include your main keyword',
          'Make them compelling to earn clicks'
        ],
        practicalTip: 'Use our SEO Checker to analyze your current titles and descriptions. Then use the AI Generator to create optimized alternatives!'
      }
    ]
  },
  {
    id: 'on-page',
    title: 'On-Page SEO',
    description: 'Optimize every element on your pages for maximum impact',
    level: 'beginner',
    duration: '3 hours',
    icon: '📝',
    color: 'from-green-500 to-emerald-500',
    modules: [
      {
        id: 'content-structure',
        title: 'Content Structure & Headings',
        duration: '15 min',
        content: `
# Content Structure & Headings

Well-structured content helps both users and search engines understand your page.

## The Heading Hierarchy

Think of headings like an outline for your content:

- **H1**: Main title (only ONE per page)
- **H2**: Major sections
- **H3**: Subsections under H2
- **H4-H6**: Further subdivisions (rarely needed)

### Example Structure:

\`\`\`
H1: Complete Guide to Home Gardening
  H2: Getting Started
    H3: Choosing Your Location
    H3: Essential Tools
  H2: Best Plants for Beginners
    H3: Vegetables
    H3: Herbs
  H2: Common Mistakes to Avoid
\`\`\`

## Why Structure Matters

1. **Readability**: Readers can scan and find what they need
2. **Accessibility**: Screen readers use headings to navigate
3. **SEO**: Google understands your content better
4. **Featured Snippets**: Well-structured content is more likely to appear as featured snippets

## Content Formatting Tips

- Use **short paragraphs** (2-3 sentences max)
- Add **bullet points** and **numbered lists**
- Include **images** to break up text
- Use **bold** for important terms
- Add **internal links** to related content
        `,
        keyTakeaways: [
          'Use only ONE H1 per page',
          'Follow proper heading hierarchy (H1 → H2 → H3)',
          'Well-structured content ranks better',
          'Make content scannable with short paragraphs and lists'
        ],
        practicalTip: 'Review one of your existing pages. Does it have proper headings? If not, add them! Even this simple change can improve rankings.'
      },
      {
        id: 'image-optimization',
        title: 'Image SEO',
        duration: '12 min',
        content: `
# Image SEO

Images aren't just visual - they're an SEO opportunity! Properly optimized images help your pages rank and can bring traffic from Google Images.

## Why Image SEO Matters

- Images can rank in Google Images search
- Slow-loading images hurt your page speed (and rankings!)
- Alt text helps accessibility AND SEO
- Good images improve user engagement

## Image Optimization Checklist

### 1. File Names
❌ IMG_12345.jpg
✅ chocolate-chip-cookies-recipe.jpg

### 2. Alt Text (Alternative Text)
Describes the image for screen readers and Google.

❌ alt="image"
❌ alt="" (empty)
✅ alt="Freshly baked chocolate chip cookies cooling on a wire rack"

### 3. File Size
- Compress images before uploading
- Use tools like TinyPNG or Squoosh
- Aim for under 100KB when possible
- Use modern formats (WebP, AVIF)

### 4. Dimensions
- Don't upload 4000px images for a 400px display area
- Resize to the actual display size
- Use responsive images (srcset) for different screen sizes

### 5. Lazy Loading
Add \`loading="lazy"\` to images below the fold:
\`<img src="photo.jpg" loading="lazy" alt="Description">\`
        `,
        keyTakeaways: [
          'Use descriptive file names with keywords',
          'Always add meaningful alt text',
          'Compress images to improve page speed',
          'Use lazy loading for images below the fold'
        ],
        practicalTip: 'Audit 5 images on your website right now. Do they have descriptive file names and alt text? Fixing these is a quick SEO win!'
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical SEO',
    description: 'Ensure search engines can crawl and index your site properly',
    level: 'intermediate',
    duration: '4 hours',
    icon: '⚙️',
    color: 'from-orange-500 to-red-500',
    modules: [
      {
        id: 'site-speed',
        title: 'Page Speed Optimization',
        duration: '20 min',
        content: `
# Page Speed Optimization

Page speed is a confirmed Google ranking factor. Slow sites frustrate users and hurt rankings.

## Why Speed Matters

- 53% of mobile users leave if a page takes over 3 seconds to load
- Google uses Core Web Vitals as ranking signals
- Faster sites = better user experience = more conversions

## Core Web Vitals

Google measures these three metrics:

### 1. Largest Contentful Paint (LCP)
How long until the main content loads
- Good: Under 2.5 seconds
- Needs improvement: 2.5-4 seconds
- Poor: Over 4 seconds

### 2. First Input Delay (FID)
How long until the page responds to clicks
- Good: Under 100ms
- Needs improvement: 100-300ms
- Poor: Over 300ms

### 3. Cumulative Layout Shift (CLS)
How much content shifts while loading
- Good: Under 0.1
- Needs improvement: 0.1-0.25
- Poor: Over 0.25

## Quick Speed Wins

1. **Compress images** (biggest impact for most sites!)
2. **Enable caching** (browsers store files locally)
3. **Use a CDN** (content delivery network)
4. **Minimize CSS/JS** (remove unnecessary code)
5. **Choose fast hosting** (don't cheap out here)
        `,
        keyTakeaways: [
          'Page speed directly affects rankings',
          'Core Web Vitals are key metrics to track',
          'Image optimization often provides the biggest speed gains',
          'Use our Speed Check tool to analyze your site'
        ],
        practicalTip: 'Test your site with Google PageSpeed Insights right now. Focus on fixing the top 2-3 issues it identifies.'
      }
    ]
  },
  {
    id: 'link-building',
    title: 'Link Building',
    description: 'Build authority through quality backlinks',
    level: 'advanced',
    duration: '5 hours',
    icon: '🔗',
    color: 'from-purple-500 to-pink-500',
    modules: [
      {
        id: 'backlinks-intro',
        title: 'Understanding Backlinks',
        duration: '15 min',
        content: `
# Understanding Backlinks

Backlinks are links from other websites to yours. They're like "votes of confidence" that tell Google your content is valuable.

## Why Backlinks Matter

- One of the most important ranking factors
- Quality matters more than quantity
- Relevant links from authoritative sites = more value
- Too many low-quality links can actually hurt you

## Types of Backlinks

### High-Quality Links ✅
- From relevant, authoritative websites
- Earned naturally because of great content
- Editorial links (someone chose to link to you)
- From diverse, trusted sources

### Low-Quality Links ❌
- From spammy, irrelevant sites
- Paid links (violates Google's guidelines)
- Link exchanges and schemes
- From private blog networks (PBNs)

## How to Earn Backlinks

1. **Create Link-Worthy Content**
   - Original research and data
   - Comprehensive guides
   - Infographics
   - Free tools

2. **Guest Posting**
   - Write for other blogs in your niche
   - Provide value, don't just seek links

3. **Build Relationships**
   - Network with others in your industry
   - Collaborate on content

4. **Broken Link Building**
   - Find broken links on other sites
   - Suggest your content as a replacement

⚠️ **Never buy links or participate in link schemes. Google can detect these and may penalize your site.**
        `,
        keyTakeaways: [
          'Backlinks are votes of confidence from other sites',
          'Quality is more important than quantity',
          'Create content worth linking to',
          'Never buy links or use shady tactics'
        ],
        practicalTip: 'Think about 3 pieces of content you could create that others would want to link to. Original research and comprehensive guides work best!'
      }
    ]
  },
  {
    id: 'earning',
    title: 'Earning with SEO',
    description: 'Turn your SEO skills into income',
    level: 'advanced',
    duration: '3 hours',
    icon: '💰',
    color: 'from-yellow-500 to-orange-500',
    modules: [
      {
        id: 'freelancing-seo',
        title: 'SEO Freelancing Guide',
        duration: '25 min',
        content: `
# SEO Freelancing Guide

SEO is one of the most in-demand digital marketing skills. Here's how to turn it into income.

## Getting Started

### 1. Build Your Skills
- Complete this learning track
- Practice on your own websites
- Stay updated (SEO changes constantly)

### 2. Create a Portfolio
- Document case studies (before/after)
- Show rankings improvements
- Highlight traffic growth

### 3. Set Your Pricing

**Beginner Rates (0-6 months experience)**
- Hourly: $25-50/hour
- Monthly retainer: $300-500/month
- One-time audit: $200-400

**Intermediate Rates (6-24 months)**
- Hourly: $50-100/hour
- Monthly retainer: $500-1500/month
- One-time audit: $400-800

**Expert Rates (2+ years)**
- Hourly: $100-250+/hour
- Monthly retainer: $1500-5000+/month
- One-time audit: $1000-3000+

## Services You Can Offer

1. **SEO Audits** - Analyze and report on a site's SEO
2. **On-Page Optimization** - Improve existing content
3. **Keyword Research** - Find opportunities
4. **Content Strategy** - Plan SEO-focused content
5. **Technical SEO** - Fix crawlability issues
6. **Link Building** - Earn backlinks
7. **Monthly SEO Management** - Ongoing optimization

## Finding Clients

- Freelance platforms (Upwork, Fiverr, Toptal)
- LinkedIn networking
- Local businesses
- Referrals from happy clients
- Your own website ranking for "SEO services [location]"

## Delivering Professional Work

Use SEO Buddy's features:
- Generate professional audit reports
- Create proposals with our proposal generator
- Track client projects
- Show progress with monthly comparisons
        `,
        keyTakeaways: [
          'Build skills before seeking clients',
          'Start with lower rates and increase as you gain experience',
          'Create case studies to showcase results',
          'Professional deliverables win clients'
        ],
        practicalTip: 'Start by offering a free or discounted SEO audit to 3 local businesses. Use the results as case studies to attract paying clients!'
      }
    ]
  }
];

export function LearningCenter() {
  const { completedLessons, markLessonComplete } = useApp();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<{
    sectionId: string;
    moduleId: string;
    title: string;
    content: string;
    keyTakeaways: string[];
    practicalTip?: string;
  } | null>(null);

  // Calculate progress
  const totalLessons = learningRoadmap.reduce((acc, section) => acc + section.modules.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const handleStartLesson = (sectionId: string, module: typeof learningRoadmap[0]['modules'][0]) => {
    setActiveLesson({
      sectionId,
      moduleId: module.id,
      title: module.title,
      content: module.content,
      keyTakeaways: module.keyTakeaways,
      practicalTip: module.practicalTip
    });
  };

  const handleCompleteLesson = () => {
    if (activeLesson) {
      markLessonComplete(activeLesson.moduleId);
      setActiveLesson(null);
    }
  };

  // Lesson View
  if (activeLesson) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => setActiveLesson(null)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Center</span>
        </button>

        {/* Lesson Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 text-indigo-200 text-sm mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Learning Module</span>
          </div>
          <h1 className="text-2xl font-bold">{activeLesson.title}</h1>
        </div>

        {/* Lesson Content */}
        <Card className="p-6">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {activeLesson.content.split('\n').map((line, index) => {
              const trimmedLine = line.trim();
              
              if (trimmedLine.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-4">{trimmedLine.slice(2)}</h1>;
              }
              if (trimmedLine.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">{trimmedLine.slice(3)}</h2>;
              }
              if (trimmedLine.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">{trimmedLine.slice(4)}</h3>;
              }
              if (trimmedLine.startsWith('- ')) {
                return <li key={index} className="text-gray-600 dark:text-gray-300 ml-4">{trimmedLine.slice(2)}</li>;
              }
              if (trimmedLine.startsWith('1. ') || trimmedLine.startsWith('2. ') || trimmedLine.startsWith('3. ')) {
                return <li key={index} className="text-gray-600 dark:text-gray-300 ml-4 list-decimal">{trimmedLine.slice(3)}</li>;
              }
              if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                return <p key={index} className="font-semibold text-gray-900 dark:text-white">{trimmedLine.slice(2, -2)}</p>;
              }
              if (trimmedLine === '') {
                return <br key={index} />;
              }
              
              // Handle inline formatting
              const formattedLine = trimmedLine
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>')
                .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">$1</code>');
              
              return <p key={index} className="text-gray-600 dark:text-gray-300 my-2" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
            })}
          </div>
        </Card>

        {/* Key Takeaways */}
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Key Takeaways
          </h3>
          <ul className="space-y-2">
            {activeLesson.keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Practical Tip */}
        {activeLesson.practicalTip && (
          <Card className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              Try This Now!
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{activeLesson.practicalTip}</p>
          </Card>
        )}

        {/* Complete Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleCompleteLesson}
            className="px-8 py-3"
            disabled={completedLessons.includes(activeLesson.moduleId)}
          >
            {completedLessons.includes(activeLesson.moduleId) ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Lesson Completed!
              </>
            ) : (
              <>
                <Trophy className="w-5 h-5" />
                Mark as Complete
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📚 SEO Learning Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your complete roadmap from SEO beginner to expert. Learn at your own pace with practical lessons.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="8"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${progressPercent * 2.51} 251`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{progressPercent}%</span>
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-xl font-bold mb-2">Your Learning Progress</h3>
            <p className="text-indigo-200">
              {completedCount} of {totalLessons} lessons completed
            </p>
            <div className="mt-3 flex items-center gap-4 justify-center sm:justify-start">
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">{completedCount} Completed</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-indigo-200" />
                <span className="text-sm">{totalLessons - completedCount} Remaining</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Learning Roadmap */}
      <div className="space-y-4">
        {learningRoadmap.map((section, sectionIndex) => {
          const isOpen = activeSection === section.id;
          const sectionCompletedLessons = section.modules.filter(m => completedLessons.includes(m.id)).length;
          const sectionProgress = section.modules.length > 0 ? Math.round((sectionCompletedLessons / section.modules.length) * 100) : 0;
          const isLocked = sectionIndex > 1 && sectionIndex > 0 && 
            learningRoadmap[sectionIndex - 1].modules.some(m => !completedLessons.includes(m.id));

          return (
            <Card key={section.id} className="overflow-hidden">
              <button
                onClick={() => setActiveSection(isOpen ? null : section.id)}
                disabled={isLocked}
                className={`w-full p-4 sm:p-6 flex items-center gap-4 text-left transition-colors ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                  {isLocked ? <Lock className="w-6 h-6 text-white" /> : section.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{section.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      section.level === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                      section.level === 'intermediate' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
                    }`}>
                      {section.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${section.color}`}
                        style={{ width: `${sectionProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {sectionCompletedLessons}/{section.modules.length}
                    </span>
                  </div>
                </div>

                {/* Duration & Arrow */}
                <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{section.duration}</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </div>
              </button>

              {/* Expanded Modules */}
              {isOpen && !isLocked && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                  {section.modules.map((module) => {
                    const isCompleted = completedLessons.includes(module.id);
                    
                    return (
                      <div
                        key={module.id}
                        className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted 
                            ? 'bg-green-100 dark:bg-green-900/50' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Play className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium ${
                            isCompleted 
                              ? 'text-gray-500 dark:text-gray-400 line-through' 
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {module.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{module.duration}</span>
                          </div>
                        </div>

                        <Button
                          variant={isCompleted ? 'secondary' : 'primary'}
                          size="sm"
                          onClick={() => handleStartLesson(section.id, module)}
                        >
                          {isCompleted ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Quick Tips */}
      <Card className="p-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Learning Tips
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <Target className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span><strong>Practice as you learn:</strong> Apply each lesson to a real website</span>
          </li>
          <li className="flex items-start gap-2">
            <Target className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span><strong>Take notes:</strong> Write down key concepts in your own words</span>
          </li>
          <li className="flex items-start gap-2">
            <Target className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <span><strong>Use our tools:</strong> Each lesson connects to a feature in SEO Buddy</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
