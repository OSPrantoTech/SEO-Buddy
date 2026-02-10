/**
 * Powerful SEO Analyzer - Similar to Seobility
 * Comprehensive SEO analysis with detailed reports
 */

// Types for SEO Analysis
export interface SEOIssue {
  id: string;
  category: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  howToFix?: string;
  impact: 'high' | 'medium' | 'low';
  points: number;
  maxPoints: number;
}

export interface CategoryScore {
  name: string;
  icon: string;
  score: number;
  maxScore: number;
  percentage: number;
  issues: SEOIssue[];
}

export interface SEOAnalysisResult {
  url: string;
  analyzedAt: Date;
  overallScore: number;
  grade: string;
  gradeColor: string;
  categories: {
    meta: CategoryScore;
    content: CategoryScore;
    headings: CategoryScore;
    images: CategoryScore;
    links: CategoryScore;
    technical: CategoryScore;
    mobile: CategoryScore;
    social: CategoryScore;
    security: CategoryScore;
    performance: CategoryScore;
  };
  summary: {
    critical: number;
    warnings: number;
    passed: number;
    info: number;
  };
  pageInfo: {
    title: string;
    description: string;
    url: string;
    wordCount: number;
    loadTime: number;
    pageSize: string;
  };
}

// Helper function to calculate grade
function calculateGrade(score: number): { grade: string; color: string } {
  if (score >= 90) return { grade: 'A+', color: '#10b981' };
  if (score >= 80) return { grade: 'A', color: '#22c55e' };
  if (score >= 70) return { grade: 'B', color: '#84cc16' };
  if (score >= 60) return { grade: 'C', color: '#eab308' };
  if (score >= 50) return { grade: 'D', color: '#f97316' };
  return { grade: 'F', color: '#ef4444' };
}

// Analyze Meta Tags
function analyzeMetaTags(html: string, _url: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // Extract title
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Extract meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Extract meta keywords
  const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i);
  const keywords = keywordsMatch ? keywordsMatch[1].trim() : '';

  // Extract canonical
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  // Extract robots meta
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : '';

  // Title Analysis
  if (!title) {
    issues.push({
      id: 'meta-1',
      category: 'critical',
      title: 'Missing Page Title',
      description: 'Your page has no title tag. The title is crucial for SEO and appears in search results.',
      howToFix: 'Add a <title> tag inside the <head> section of your HTML. Example: <title>Your Page Title - Your Brand</title>',
      impact: 'high',
      points: 0,
      maxPoints: 20
    });
  } else if (title.length < 30) {
    issues.push({
      id: 'meta-2',
      category: 'warning',
      title: 'Title Too Short',
      description: `Your title has only ${title.length} characters. Titles between 50-60 characters perform best.`,
      howToFix: 'Expand your title to include more relevant keywords while keeping it under 60 characters.',
      impact: 'medium',
      points: 10,
      maxPoints: 20
    });
    score += 10;
  } else if (title.length > 60) {
    issues.push({
      id: 'meta-3',
      category: 'warning',
      title: 'Title Too Long',
      description: `Your title has ${title.length} characters. It may be truncated in search results (max 60 chars).`,
      howToFix: 'Shorten your title to 50-60 characters. Put the most important keywords at the beginning.',
      impact: 'medium',
      points: 15,
      maxPoints: 20
    });
    score += 15;
  } else {
    issues.push({
      id: 'meta-4',
      category: 'success',
      title: 'Title Length is Optimal',
      description: `Your title has ${title.length} characters, which is within the recommended range.`,
      impact: 'low',
      points: 20,
      maxPoints: 20
    });
    score += 20;
  }

  // Meta Description Analysis
  if (!description) {
    issues.push({
      id: 'meta-5',
      category: 'critical',
      title: 'Missing Meta Description',
      description: 'Your page has no meta description. This is the text that appears below your title in search results.',
      howToFix: 'Add a meta description tag: <meta name="description" content="Your compelling description here (150-160 characters)">',
      impact: 'high',
      points: 0,
      maxPoints: 20
    });
  } else if (description.length < 100) {
    issues.push({
      id: 'meta-6',
      category: 'warning',
      title: 'Meta Description Too Short',
      description: `Your description has only ${description.length} characters. Aim for 150-160 characters.`,
      howToFix: 'Expand your description to fully utilize the available space and include a call-to-action.',
      impact: 'medium',
      points: 10,
      maxPoints: 20
    });
    score += 10;
  } else if (description.length > 160) {
    issues.push({
      id: 'meta-7',
      category: 'warning',
      title: 'Meta Description Too Long',
      description: `Your description has ${description.length} characters. It will be truncated in search results.`,
      howToFix: 'Shorten your description to 150-160 characters. Include your main keyword and a call-to-action.',
      impact: 'medium',
      points: 15,
      maxPoints: 20
    });
    score += 15;
  } else {
    issues.push({
      id: 'meta-8',
      category: 'success',
      title: 'Meta Description Length is Optimal',
      description: `Your description has ${description.length} characters, which is within the recommended range.`,
      impact: 'low',
      points: 20,
      maxPoints: 20
    });
    score += 20;
  }

  // Canonical URL
  if (!canonical) {
    issues.push({
      id: 'meta-9',
      category: 'warning',
      title: 'Missing Canonical URL',
      description: 'No canonical URL specified. This can lead to duplicate content issues.',
      howToFix: 'Add a canonical link: <link rel="canonical" href="https://yoursite.com/page-url">',
      impact: 'medium',
      points: 0,
      maxPoints: 15
    });
  } else {
    issues.push({
      id: 'meta-10',
      category: 'success',
      title: 'Canonical URL Present',
      description: 'A canonical URL is specified, helping prevent duplicate content issues.',
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  // Meta Keywords (informational - not as important anymore)
  if (!keywords) {
    issues.push({
      id: 'meta-11',
      category: 'info',
      title: 'No Meta Keywords',
      description: 'Meta keywords are not used by Google anymore, but some other search engines may still use them.',
      howToFix: 'Optional: Add meta keywords if you want to target other search engines.',
      impact: 'low',
      points: 5,
      maxPoints: 10
    });
    score += 5;
  } else {
    issues.push({
      id: 'meta-12',
      category: 'success',
      title: 'Meta Keywords Present',
      description: 'Meta keywords are defined. Note: Google ignores this, but other search engines may use it.',
      impact: 'low',
      points: 10,
      maxPoints: 10
    });
    score += 10;
  }

  // Robots Meta
  if (robots && (robots.includes('noindex') || robots.includes('nofollow'))) {
    issues.push({
      id: 'meta-13',
      category: 'critical',
      title: 'Page Blocked from Search Engines',
      description: `Your robots meta contains "${robots}". This page will not appear in search results!`,
      howToFix: 'If you want this page indexed, remove the noindex/nofollow from the robots meta tag.',
      impact: 'high',
      points: 0,
      maxPoints: 15
    });
  } else {
    issues.push({
      id: 'meta-14',
      category: 'success',
      title: 'Page is Indexable',
      description: 'No blocking robots directives found. Search engines can index this page.',
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  // Language attribute
  const langMatch = html.match(/<html[^>]*lang=["']([^"']*)["']/i);
  if (!langMatch) {
    issues.push({
      id: 'meta-15',
      category: 'warning',
      title: 'Missing Language Declaration',
      description: 'No lang attribute on the HTML tag. This helps search engines understand your content language.',
      howToFix: 'Add lang attribute: <html lang="en"> for English content.',
      impact: 'medium',
      points: 0,
      maxPoints: 10
    });
  } else {
    issues.push({
      id: 'meta-16',
      category: 'success',
      title: 'Language Declaration Present',
      description: `Page language is set to "${langMatch[1]}".`,
      impact: 'low',
      points: 10,
      maxPoints: 10
    });
    score += 10;
  }

  // Viewport meta
  const viewportMatch = html.match(/<meta[^>]*name=["']viewport["']/i);
  if (!viewportMatch) {
    issues.push({
      id: 'meta-17',
      category: 'critical',
      title: 'Missing Viewport Meta Tag',
      description: 'No viewport meta tag found. Your page may not display correctly on mobile devices.',
      howToFix: 'Add: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      impact: 'high',
      points: 0,
      maxPoints: 10
    });
  } else {
    issues.push({
      id: 'meta-18',
      category: 'success',
      title: 'Viewport Meta Tag Present',
      description: 'Viewport meta tag is configured for responsive design.',
      impact: 'low',
      points: 10,
      maxPoints: 10
    });
    score += 10;
  }

  return {
    name: 'Meta Tags',
    icon: '🏷️',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Content
function analyzeContent(html: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // Extract body content
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : html;
  
  // Remove scripts and styles
  const cleanContent = bodyContent
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleanContent.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Word Count Analysis
  if (wordCount < 300) {
    issues.push({
      id: 'content-1',
      category: 'critical',
      title: 'Thin Content',
      description: `Your page has only ${wordCount} words. Search engines prefer pages with at least 300+ words.`,
      howToFix: 'Add more valuable content to your page. Aim for at least 300-500 words for basic pages, and 1000+ for articles.',
      impact: 'high',
      points: 0,
      maxPoints: 25
    });
  } else if (wordCount < 500) {
    issues.push({
      id: 'content-2',
      category: 'warning',
      title: 'Content Could Be Longer',
      description: `Your page has ${wordCount} words. Consider adding more content for better ranking.`,
      howToFix: 'Expand your content to at least 500-1000 words with valuable information.',
      impact: 'medium',
      points: 15,
      maxPoints: 25
    });
    score += 15;
  } else if (wordCount >= 1000) {
    issues.push({
      id: 'content-3',
      category: 'success',
      title: 'Excellent Content Length',
      description: `Your page has ${wordCount} words, which is great for SEO.`,
      impact: 'low',
      points: 25,
      maxPoints: 25
    });
    score += 25;
  } else {
    issues.push({
      id: 'content-4',
      category: 'success',
      title: 'Good Content Length',
      description: `Your page has ${wordCount} words, which is adequate for SEO.`,
      impact: 'low',
      points: 20,
      maxPoints: 25
    });
    score += 20;
  }

  // Check for paragraphs
  const paragraphs = (html.match(/<p[^>]*>/gi) || []).length;
  if (paragraphs < 3) {
    issues.push({
      id: 'content-5',
      category: 'warning',
      title: 'Few Paragraphs',
      description: `Only ${paragraphs} paragraph(s) found. Well-structured content with multiple paragraphs is better.`,
      howToFix: 'Break your content into multiple paragraphs (3-4 sentences each) for better readability.',
      impact: 'medium',
      points: 5,
      maxPoints: 15
    });
    score += 5;
  } else {
    issues.push({
      id: 'content-6',
      category: 'success',
      title: 'Good Paragraph Structure',
      description: `Found ${paragraphs} paragraphs. Content is well-structured.`,
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  // Check for lists
  const lists = (html.match(/<(ul|ol)[^>]*>/gi) || []).length;
  if (lists === 0) {
    issues.push({
      id: 'content-7',
      category: 'info',
      title: 'No Lists Found',
      description: 'Consider using bullet points or numbered lists to improve readability.',
      howToFix: 'Add <ul> or <ol> lists to break down complex information into easy-to-read points.',
      impact: 'low',
      points: 5,
      maxPoints: 15
    });
    score += 5;
  } else {
    issues.push({
      id: 'content-8',
      category: 'success',
      title: 'Lists Used',
      description: `Found ${lists} list(s). Good for readability and featured snippets!`,
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  // Check for bold/strong text
  const boldText = (html.match(/<(strong|b)[^>]*>/gi) || []).length;
  if (boldText === 0) {
    issues.push({
      id: 'content-9',
      category: 'info',
      title: 'No Bold/Strong Text',
      description: 'Using bold text for important keywords can help with SEO.',
      howToFix: 'Use <strong> or <b> tags to emphasize important keywords and phrases.',
      impact: 'low',
      points: 5,
      maxPoints: 10
    });
    score += 5;
  } else {
    issues.push({
      id: 'content-10',
      category: 'success',
      title: 'Bold Text Used',
      description: `Found ${boldText} bold/strong elements. Good for emphasizing keywords!`,
      impact: 'low',
      points: 10,
      maxPoints: 10
    });
    score += 10;
  }

  // Calculate reading time
  const readingTime = Math.ceil(wordCount / 200);
  issues.push({
    id: 'content-11',
    category: 'info',
    title: 'Estimated Reading Time',
    description: `This page takes approximately ${readingTime} minute(s) to read.`,
    impact: 'low',
    points: 10,
    maxPoints: 10
  });
  score += 10;

  // Check for duplicate words (keyword stuffing)
  const wordFreq: Record<string, number> = {};
  words.forEach(word => {
    const lowerWord = word.toLowerCase().replace(/[^a-z]/g, '');
    if (lowerWord.length > 4) {
      wordFreq[lowerWord] = (wordFreq[lowerWord] || 0) + 1;
    }
  });
  
  const stuffedWords = Object.entries(wordFreq)
    .filter(([_, count]) => count / wordCount > 0.05)
    .map(([word]) => word);

  if (stuffedWords.length > 0 && wordCount > 100) {
    issues.push({
      id: 'content-12',
      category: 'warning',
      title: 'Possible Keyword Stuffing',
      description: `Some words appear too frequently: "${stuffedWords.slice(0, 3).join(', ')}"`,
      howToFix: 'Use synonyms and natural language. Keep keyword density below 2-3%.',
      impact: 'medium',
      points: 10,
      maxPoints: 25
    });
    score += 10;
  } else {
    issues.push({
      id: 'content-13',
      category: 'success',
      title: 'Natural Keyword Usage',
      description: 'No keyword stuffing detected. Content appears natural.',
      impact: 'low',
      points: 25,
      maxPoints: 25
    });
    score += 25;
  }

  return {
    name: 'Content Quality',
    icon: '📝',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Headings
function analyzeHeadings(html: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // Extract all headings
  const h1s = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) || [];
  const h2s = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi) || [];
  const h3s = html.match(/<h3[^>]*>[\s\S]*?<\/h3>/gi) || [];
  const h4s = html.match(/<h4[^>]*>[\s\S]*?<\/h4>/gi) || [];
  const h5s = html.match(/<h5[^>]*>[\s\S]*?<\/h5>/gi) || [];
  const h6s = html.match(/<h6[^>]*>[\s\S]*?<\/h6>/gi) || [];

  // H1 Analysis
  if (h1s.length === 0) {
    issues.push({
      id: 'heading-1',
      category: 'critical',
      title: 'Missing H1 Heading',
      description: 'Your page has no H1 heading. Every page should have exactly one H1 tag.',
      howToFix: 'Add an H1 heading at the top of your main content: <h1>Your Main Page Title</h1>',
      impact: 'high',
      points: 0,
      maxPoints: 30
    });
  } else if (h1s.length > 1) {
    issues.push({
      id: 'heading-2',
      category: 'warning',
      title: 'Multiple H1 Headings',
      description: `Found ${h1s.length} H1 headings. Each page should have only one H1.`,
      howToFix: 'Keep only one H1 and change others to H2 or lower. The H1 should be your main topic.',
      impact: 'medium',
      points: 15,
      maxPoints: 30
    });
    score += 15;
  } else {
    const h1Content = h1s[0].replace(/<[^>]+>/g, '').trim();
    if (h1Content.length < 20) {
      issues.push({
        id: 'heading-3',
        category: 'warning',
        title: 'H1 Heading Too Short',
        description: `Your H1 "${h1Content}" is quite short. Make it more descriptive.`,
        howToFix: 'Expand your H1 to include your main keyword and be more descriptive.',
        impact: 'medium',
        points: 20,
        maxPoints: 30
      });
      score += 20;
    } else if (h1Content.length > 70) {
      issues.push({
        id: 'heading-4',
        category: 'warning',
        title: 'H1 Heading Too Long',
        description: `Your H1 has ${h1Content.length} characters. Keep it concise (under 70 chars).`,
        howToFix: 'Shorten your H1 while keeping the main keyword. Move extra details to H2 or content.',
        impact: 'low',
        points: 25,
        maxPoints: 30
      });
      score += 25;
    } else {
      issues.push({
        id: 'heading-5',
        category: 'success',
        title: 'H1 Heading is Optimal',
        description: `Your H1 "${h1Content.substring(0, 40)}..." is well-formatted.`,
        impact: 'low',
        points: 30,
        maxPoints: 30
      });
      score += 30;
    }
  }

  // H2 Analysis
  if (h2s.length === 0) {
    issues.push({
      id: 'heading-6',
      category: 'warning',
      title: 'No H2 Subheadings',
      description: 'No H2 headings found. Subheadings help structure your content and improve SEO.',
      howToFix: 'Add H2 headings to break your content into logical sections.',
      impact: 'medium',
      points: 0,
      maxPoints: 25
    });
  } else if (h2s.length < 2) {
    issues.push({
      id: 'heading-7',
      category: 'info',
      title: 'Few H2 Subheadings',
      description: `Only ${h2s.length} H2 heading(s). Consider adding more for better structure.`,
      howToFix: 'Add more H2 headings to improve content organization.',
      impact: 'low',
      points: 15,
      maxPoints: 25
    });
    score += 15;
  } else {
    issues.push({
      id: 'heading-8',
      category: 'success',
      title: 'Good H2 Usage',
      description: `Found ${h2s.length} H2 subheadings. Great content structure!`,
      impact: 'low',
      points: 25,
      maxPoints: 25
    });
    score += 25;
  }

  // Heading hierarchy check
  const totalHeadings = h1s.length + h2s.length + h3s.length + h4s.length + h5s.length + h6s.length;
  if (totalHeadings === 0) {
    issues.push({
      id: 'heading-9',
      category: 'critical',
      title: 'No Headings Found',
      description: 'Your page has no heading tags at all. This is very bad for SEO.',
      howToFix: 'Add proper heading structure: One H1 for main title, H2s for sections, H3s for subsections.',
      impact: 'high',
      points: 0,
      maxPoints: 25
    });
  } else if (h1s.length > 0 && h2s.length > 0) {
    issues.push({
      id: 'heading-10',
      category: 'success',
      title: 'Good Heading Hierarchy',
      description: `Found ${totalHeadings} headings with proper H1 → H2 structure.`,
      impact: 'low',
      points: 25,
      maxPoints: 25
    });
    score += 25;
  } else {
    issues.push({
      id: 'heading-11',
      category: 'info',
      title: 'Heading Hierarchy Could Be Improved',
      description: 'Consider following H1 → H2 → H3 hierarchy for better structure.',
      howToFix: 'Organize headings in proper order: H1 first, then H2s, then H3s under H2s.',
      impact: 'low',
      points: 15,
      maxPoints: 25
    });
    score += 15;
  }

  // Summary info
  issues.push({
    id: 'heading-12',
    category: 'info',
    title: 'Heading Summary',
    description: `H1: ${h1s.length} | H2: ${h2s.length} | H3: ${h3s.length} | H4: ${h4s.length} | H5: ${h5s.length} | H6: ${h6s.length}`,
    impact: 'low',
    points: 20,
    maxPoints: 20
  });
  score += 20;

  return {
    name: 'Headings',
    icon: '📑',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Images
function analyzeImages(html: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // Extract all images
  const images = html.match(/<img[^>]*>/gi) || [];
  const totalImages = images.length;

  if (totalImages === 0) {
    issues.push({
      id: 'img-1',
      category: 'info',
      title: 'No Images Found',
      description: 'Your page has no images. Visual content can improve engagement and SEO.',
      howToFix: 'Consider adding relevant images to your content. Always include alt text.',
      impact: 'low',
      points: 50,
      maxPoints: 100
    });
    score += 50;
  } else {
    // Check for alt attributes
    let imagesWithAlt = 0;
    let imagesWithEmptyAlt = 0;
    let imagesWithoutAlt = 0;
    let imagesWithLazyLoad = 0;

    images.forEach(img => {
      const altMatch = img.match(/alt=["']([^"']*)["']/i);
      const loadingMatch = img.match(/loading=["']lazy["']/i);
      
      if (loadingMatch) imagesWithLazyLoad++;
      
      if (!altMatch) {
        imagesWithoutAlt++;
      } else if (altMatch[1].trim() === '') {
        imagesWithEmptyAlt++;
      } else {
        imagesWithAlt++;
      }
    });

    // Alt text analysis
    if (imagesWithoutAlt > 0) {
      issues.push({
        id: 'img-2',
        category: 'critical',
        title: 'Images Missing Alt Text',
        description: `${imagesWithoutAlt} image(s) have no alt attribute. Alt text is essential for accessibility and SEO.`,
        howToFix: 'Add descriptive alt attributes to all images: <img src="photo.jpg" alt="Description of the image">',
        impact: 'high',
        points: 0,
        maxPoints: 35
      });
    } else if (imagesWithEmptyAlt > 0) {
      issues.push({
        id: 'img-3',
        category: 'warning',
        title: 'Images with Empty Alt Text',
        description: `${imagesWithEmptyAlt} image(s) have empty alt attributes. Provide meaningful descriptions.`,
        howToFix: 'Fill in alt attributes with descriptive text that includes relevant keywords.',
        impact: 'medium',
        points: 20,
        maxPoints: 35
      });
      score += 20;
    } else {
      issues.push({
        id: 'img-4',
        category: 'success',
        title: 'All Images Have Alt Text',
        description: `All ${totalImages} image(s) have alt attributes. Great for accessibility and SEO!`,
        impact: 'low',
        points: 35,
        maxPoints: 35
      });
      score += 35;
    }

    // Lazy loading check
    if (imagesWithLazyLoad === 0 && totalImages > 2) {
      issues.push({
        id: 'img-5',
        category: 'warning',
        title: 'No Lazy Loading',
        description: 'Images are not using lazy loading. This can slow down initial page load.',
        howToFix: 'Add loading="lazy" to images below the fold: <img src="photo.jpg" loading="lazy">',
        impact: 'medium',
        points: 10,
        maxPoints: 25
      });
      score += 10;
    } else if (imagesWithLazyLoad > 0) {
      issues.push({
        id: 'img-6',
        category: 'success',
        title: 'Lazy Loading Implemented',
        description: `${imagesWithLazyLoad} image(s) use lazy loading for better performance.`,
        impact: 'low',
        points: 25,
        maxPoints: 25
      });
      score += 25;
    } else {
      issues.push({
        id: 'img-7',
        category: 'info',
        title: 'Few Images - Lazy Loading Optional',
        description: 'With only a few images, lazy loading is less critical but still recommended.',
        impact: 'low',
        points: 20,
        maxPoints: 25
      });
      score += 20;
    }

    // Check for width/height attributes
    const imagesWithDimensions = images.filter(img => 
      img.match(/width=/i) && img.match(/height=/i)
    ).length;

    if (imagesWithDimensions < totalImages) {
      issues.push({
        id: 'img-8',
        category: 'warning',
        title: 'Images Missing Dimensions',
        description: `${totalImages - imagesWithDimensions} image(s) don't have width/height specified. This can cause layout shifts.`,
        howToFix: 'Add width and height attributes to prevent Cumulative Layout Shift (CLS).',
        impact: 'medium',
        points: 10,
        maxPoints: 20
      });
      score += 10;
    } else {
      issues.push({
        id: 'img-9',
        category: 'success',
        title: 'Image Dimensions Specified',
        description: 'All images have width and height attributes. This prevents layout shifts.',
        impact: 'low',
        points: 20,
        maxPoints: 20
      });
      score += 20;
    }

    // Summary
    issues.push({
      id: 'img-10',
      category: 'info',
      title: 'Image Summary',
      description: `Total: ${totalImages} | With Alt: ${imagesWithAlt} | Empty Alt: ${imagesWithEmptyAlt} | No Alt: ${imagesWithoutAlt}`,
      impact: 'low',
      points: 20,
      maxPoints: 20
    });
    score += 20;
  }

  return {
    name: 'Images',
    icon: '🖼️',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Links
function analyzeLinks(html: string, url: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // Extract all links
  const links = html.match(/<a[^>]*href=["'][^"']*["'][^>]*>/gi) || [];
  const totalLinks = links.length;

  if (totalLinks === 0) {
    issues.push({
      id: 'link-1',
      category: 'warning',
      title: 'No Links Found',
      description: 'Your page has no links. Internal and external links are important for SEO.',
      howToFix: 'Add relevant internal links to other pages and external links to authoritative sources.',
      impact: 'medium',
      points: 30,
      maxPoints: 100
    });
    score += 30;
  } else {
    let internalLinks = 0;
    let externalLinks = 0;
    let noFollowLinks = 0;
    let emptyHrefLinks = 0;

    let urlDomain = '';
    try {
      if (url) {
        urlDomain = new URL(url).hostname;
      }
    } catch {
      urlDomain = '';
    }

    links.forEach(link => {
      const hrefMatch = link.match(/href=["']([^"']*)["']/i);
      const href: string = hrefMatch?.[1] ?? '';
      const nofollowMatch = link.match(/rel=["'][^"']*nofollow[^"']*["']/i);

      if (nofollowMatch) noFollowLinks++;
      
      if (!href || href === '#' || href === 'javascript:void(0)') {
        emptyHrefLinks++;
      } else if (href.startsWith('http')) {
        try {
          const linkDomain = new URL(href).hostname;
          if (urlDomain && linkDomain === urlDomain) {
            internalLinks++;
          } else {
            externalLinks++;
          }
        } catch {
          externalLinks++;
        }
      } else if (href.startsWith('/') || href.startsWith('./') || !href.includes(':')) {
        internalLinks++;
      }
    });

    // Internal links check
    if (internalLinks === 0) {
      issues.push({
        id: 'link-2',
        category: 'warning',
        title: 'No Internal Links',
        description: 'No internal links found. Internal linking helps search engines understand your site structure.',
        howToFix: 'Add links to other pages on your website to create a good internal link structure.',
        impact: 'medium',
        points: 10,
        maxPoints: 30
      });
      score += 10;
    } else {
      issues.push({
        id: 'link-3',
        category: 'success',
        title: 'Internal Links Found',
        description: `Found ${internalLinks} internal link(s). Good for site navigation and SEO.`,
        impact: 'low',
        points: 30,
        maxPoints: 30
      });
      score += 30;
    }

    // External links check
    if (externalLinks === 0) {
      issues.push({
        id: 'link-4',
        category: 'info',
        title: 'No External Links',
        description: 'No outbound links to other websites. Linking to authoritative sources can improve credibility.',
        howToFix: 'Consider linking to reputable external sources that add value to your content.',
        impact: 'low',
        points: 15,
        maxPoints: 25
      });
      score += 15;
    } else {
      issues.push({
        id: 'link-5',
        category: 'success',
        title: 'External Links Present',
        description: `Found ${externalLinks} external link(s). Good for credibility!`,
        impact: 'low',
        points: 25,
        maxPoints: 25
      });
      score += 25;
    }

    // Empty href check
    if (emptyHrefLinks > 0) {
      issues.push({
        id: 'link-6',
        category: 'warning',
        title: 'Empty or Invalid Links',
        description: `Found ${emptyHrefLinks} link(s) with empty or JavaScript href. These don't help SEO.`,
        howToFix: 'Replace empty hrefs with actual URLs or use buttons for JavaScript actions.',
        impact: 'medium',
        points: 0,
        maxPoints: 20
      });
    } else {
      issues.push({
        id: 'link-7',
        category: 'success',
        title: 'All Links Have Valid URLs',
        description: 'All links have proper href attributes.',
        impact: 'low',
        points: 20,
        maxPoints: 20
      });
      score += 20;
    }

    // NoFollow analysis
    if (noFollowLinks > 0) {
      issues.push({
        id: 'link-8',
        category: 'info',
        title: 'NoFollow Links Detected',
        description: `${noFollowLinks} link(s) have rel="nofollow". This is fine for untrusted or sponsored links.`,
        impact: 'low',
        points: 10,
        maxPoints: 10
      });
      score += 10;
    } else {
      issues.push({
        id: 'link-9',
        category: 'info',
        title: 'No NoFollow Links',
        description: 'All links pass link equity. Consider using nofollow for sponsored or untrusted content.',
        impact: 'low',
        points: 10,
        maxPoints: 10
      });
      score += 10;
    }

    // Summary
    issues.push({
      id: 'link-10',
      category: 'info',
      title: 'Link Summary',
      description: `Total: ${totalLinks} | Internal: ${internalLinks} | External: ${externalLinks} | NoFollow: ${noFollowLinks}`,
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  return {
    name: 'Links',
    icon: '🔗',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Technical SEO
function analyzeTechnical(html: string, url: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // DOCTYPE check
  if (!html.toLowerCase().includes('<!doctype html>')) {
    issues.push({
      id: 'tech-1',
      category: 'warning',
      title: 'Missing DOCTYPE Declaration',
      description: 'No DOCTYPE declaration found. This may cause rendering issues.',
      howToFix: 'Add <!DOCTYPE html> at the very beginning of your HTML document.',
      impact: 'medium',
      points: 0,
      maxPoints: 15
    });
  } else {
    issues.push({
      id: 'tech-2',
      category: 'success',
      title: 'DOCTYPE Declaration Present',
      description: 'HTML5 DOCTYPE is properly declared.',
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  // Character encoding
  const charsetMatch = html.match(/<meta[^>]*charset=["']?([^"'\s>]+)["']?/i);
  if (!charsetMatch) {
    issues.push({
      id: 'tech-3',
      category: 'warning',
      title: 'Missing Character Encoding',
      description: 'No charset meta tag found. This can cause text display issues.',
      howToFix: 'Add <meta charset="UTF-8"> as the first tag in your <head> section.',
      impact: 'medium',
      points: 0,
      maxPoints: 15
    });
  } else {
    issues.push({
      id: 'tech-4',
      category: 'success',
      title: 'Character Encoding Specified',
      description: `Charset is set to "${charsetMatch[1]}".`,
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  // Favicon check
  const faviconMatch = html.match(/<link[^>]*rel=["'][^"']*icon[^"']*["']/i);
  if (!faviconMatch) {
    issues.push({
      id: 'tech-5',
      category: 'warning',
      title: 'Missing Favicon',
      description: 'No favicon found. A favicon helps with brand recognition in browser tabs.',
      howToFix: 'Add: <link rel="icon" href="/favicon.ico" type="image/x-icon">',
      impact: 'low',
      points: 0,
      maxPoints: 10
    });
  } else {
    issues.push({
      id: 'tech-6',
      category: 'success',
      title: 'Favicon Present',
      description: 'A favicon is defined for the page.',
      impact: 'low',
      points: 10,
      maxPoints: 10
    });
    score += 10;
  }

  // URL analysis
  if (url) {
    const urlLower = url.toLowerCase();
    
    // HTTPS check
    if (!url.startsWith('https://')) {
      issues.push({
        id: 'tech-7',
        category: 'critical',
        title: 'Not Using HTTPS',
        description: 'Your site is not using HTTPS. Google prioritizes secure websites.',
        howToFix: 'Install an SSL certificate and redirect all HTTP traffic to HTTPS.',
        impact: 'high',
        points: 0,
        maxPoints: 20
      });
    } else {
      issues.push({
        id: 'tech-8',
        category: 'success',
        title: 'HTTPS Enabled',
        description: 'Your site uses HTTPS. Great for security and SEO!',
        impact: 'low',
        points: 20,
        maxPoints: 20
      });
      score += 20;
    }

    // URL structure
    if (urlLower.includes('?') && urlLower.includes('id=')) {
      issues.push({
        id: 'tech-9',
        category: 'warning',
        title: 'URL Contains Query Parameters',
        description: 'Dynamic URLs with query strings are less SEO-friendly.',
        howToFix: 'Use clean, descriptive URLs like /blog/my-article instead of /page?id=123',
        impact: 'medium',
        points: 5,
        maxPoints: 15
      });
      score += 5;
    } else if (urlLower.match(/[A-Z]/)) {
      issues.push({
        id: 'tech-10',
        category: 'info',
        title: 'URL Contains Uppercase Letters',
        description: 'Using lowercase URLs is recommended for consistency.',
        howToFix: 'Use lowercase letters in URLs and set up redirects for uppercase versions.',
        impact: 'low',
        points: 10,
        maxPoints: 15
      });
      score += 10;
    } else {
      issues.push({
        id: 'tech-11',
        category: 'success',
        title: 'Clean URL Structure',
        description: 'Your URL is clean and SEO-friendly.',
        impact: 'low',
        points: 15,
        maxPoints: 15
      });
      score += 15;
    }
  } else {
    score += 35; // Give points if no URL to analyze
  }

  // Inline CSS check
  const inlineStyles = (html.match(/style=["'][^"']+["']/gi) || []).length;
  if (inlineStyles > 10) {
    issues.push({
      id: 'tech-12',
      category: 'warning',
      title: 'Excessive Inline Styles',
      description: `Found ${inlineStyles} inline style attributes. This can slow down rendering.`,
      howToFix: 'Move inline styles to external CSS files for better caching and maintenance.',
      impact: 'medium',
      points: 5,
      maxPoints: 15
    });
    score += 5;
  } else {
    issues.push({
      id: 'tech-13',
      category: 'success',
      title: 'Minimal Inline Styles',
      description: 'Good use of external stylesheets over inline styles.',
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  // Structured data check
  const structuredDataMatch = html.match(/<script[^>]*type=["']application\/ld\+json["']/i);
  if (!structuredDataMatch) {
    issues.push({
      id: 'tech-14',
      category: 'info',
      title: 'No Structured Data',
      description: 'No JSON-LD structured data found. Schema markup can enhance search results.',
      howToFix: 'Add Schema.org structured data to get rich snippets in search results.',
      impact: 'medium',
      points: 5,
      maxPoints: 15
    });
    score += 5;
  } else {
    issues.push({
      id: 'tech-15',
      category: 'success',
      title: 'Structured Data Present',
      description: 'JSON-LD structured data is implemented. Great for rich snippets!',
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  return {
    name: 'Technical SEO',
    icon: '⚙️',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Mobile Friendliness
function analyzeMobile(html: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // Viewport check
  const viewportMatch = html.match(/<meta[^>]*name=["']viewport["'][^>]*content=["']([^"']*)["']/i);
  const viewportContent = viewportMatch?.[1] ?? '';
  if (!viewportMatch || !viewportContent) {
    issues.push({
      id: 'mobile-1',
      category: 'critical',
      title: 'Missing Viewport Meta Tag',
      description: 'No viewport configuration found. Page will not display correctly on mobile.',
      howToFix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      impact: 'high',
      points: 0,
      maxPoints: 35
    });
  } else {
    if (viewportContent.includes('width=device-width')) {
      issues.push({
        id: 'mobile-2',
        category: 'success',
        title: 'Responsive Viewport Configured',
        description: 'Viewport is properly configured for responsive design.',
        impact: 'low',
        points: 35,
        maxPoints: 35
      });
      score += 35;
    } else {
      issues.push({
        id: 'mobile-3',
        category: 'warning',
        title: 'Viewport May Not Be Responsive',
        description: 'Viewport is set but may not be fully responsive.',
        howToFix: 'Ensure viewport includes width=device-width for proper mobile scaling.',
        impact: 'medium',
        points: 20,
        maxPoints: 35
      });
      score += 20;
    }
  }

  // Touch targets (check for small links/buttons)
  // Note: In reality you'd analyze computed styles for touch targets
  // This is a simplified check for the demo
  issues.push({
    id: 'mobile-4',
    category: 'info',
    title: 'Touch Target Size',
    description: 'Ensure buttons and links are at least 44x44 pixels for easy tapping on mobile.',
    howToFix: 'Use min-height and min-width of 44px for interactive elements.',
    impact: 'medium',
    points: 20,
    maxPoints: 20
  });
  score += 20;

  // Font size check
  const smallFontMatch = html.match(/font-size:\s*([0-9]+)px/gi);
  let hasSmallFonts = false;
  if (smallFontMatch) {
    smallFontMatch.forEach(match => {
      const size = parseInt(match.replace(/[^0-9]/g, ''));
      if (size < 12) hasSmallFonts = true;
    });
  }

  if (hasSmallFonts) {
    issues.push({
      id: 'mobile-5',
      category: 'warning',
      title: 'Small Font Sizes Detected',
      description: 'Some text may be too small to read on mobile devices.',
      howToFix: 'Use a minimum font size of 16px for body text on mobile.',
      impact: 'medium',
      points: 10,
      maxPoints: 20
    });
    score += 10;
  } else {
    issues.push({
      id: 'mobile-6',
      category: 'success',
      title: 'Readable Font Sizes',
      description: 'No extremely small fonts detected.',
      impact: 'low',
      points: 20,
      maxPoints: 20
    });
    score += 20;
  }

  // Responsive images
  const responsiveImages = (html.match(/<img[^>]*(srcset|sizes)=/gi) || []).length;
  const totalImages = (html.match(/<img[^>]*>/gi) || []).length;

  if (totalImages > 0 && responsiveImages === 0) {
    issues.push({
      id: 'mobile-7',
      category: 'info',
      title: 'No Responsive Images',
      description: 'Consider using srcset for responsive images on different screen sizes.',
      howToFix: 'Use srcset attribute to provide different image sizes for different devices.',
      impact: 'low',
      points: 10,
      maxPoints: 15
    });
    score += 10;
  } else if (responsiveImages > 0) {
    issues.push({
      id: 'mobile-8',
      category: 'success',
      title: 'Responsive Images Implemented',
      description: `${responsiveImages} image(s) use srcset/sizes for responsive loading.`,
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  } else {
    score += 15;
  }

  // Media queries check (rough estimation)
  const styleBlocks = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  let hasMediaQueries = false;
  styleBlocks.forEach(block => {
    if (block.includes('@media')) hasMediaQueries = true;
  });

  if (!hasMediaQueries) {
    issues.push({
      id: 'mobile-9',
      category: 'info',
      title: 'No CSS Media Queries Detected',
      description: 'Inline styles don\'t contain media queries. Check external stylesheets.',
      howToFix: 'Use CSS media queries to adapt layout for different screen sizes.',
      impact: 'low',
      points: 5,
      maxPoints: 10
    });
    score += 5;
  } else {
    issues.push({
      id: 'mobile-10',
      category: 'success',
      title: 'Media Queries Present',
      description: 'CSS media queries are used for responsive design.',
      impact: 'low',
      points: 10,
      maxPoints: 10
    });
    score += 10;
  }

  return {
    name: 'Mobile Friendly',
    icon: '📱',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Social Media Tags
function analyzeSocial(html: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // Open Graph tags
  const ogTitle = html.match(/<meta[^>]*property=["']og:title["']/i);
  const ogDescription = html.match(/<meta[^>]*property=["']og:description["']/i);
  const ogImage = html.match(/<meta[^>]*property=["']og:image["']/i);
  const ogUrl = html.match(/<meta[^>]*property=["']og:url["']/i);
  const ogType = html.match(/<meta[^>]*property=["']og:type["']/i);

  // Twitter Card tags
  const twitterCard = html.match(/<meta[^>]*name=["']twitter:card["']/i);
  const twitterTitle = html.match(/<meta[^>]*name=["']twitter:title["']/i);
  const twitterDescription = html.match(/<meta[^>]*name=["']twitter:description["']/i);
  const twitterImage = html.match(/<meta[^>]*name=["']twitter:image["']/i);

  // Open Graph Analysis
  if (!ogTitle && !ogDescription && !ogImage) {
    issues.push({
      id: 'social-1',
      category: 'warning',
      title: 'Missing Open Graph Tags',
      description: 'No Open Graph tags found. Your content won\'t look good when shared on Facebook/LinkedIn.',
      howToFix: 'Add og:title, og:description, og:image, og:url, and og:type meta tags.',
      impact: 'medium',
      points: 0,
      maxPoints: 40
    });
  } else {
    let ogScore = 0;
    if (ogTitle) ogScore += 10;
    if (ogDescription) ogScore += 10;
    if (ogImage) ogScore += 10;
    if (ogUrl) ogScore += 5;
    if (ogType) ogScore += 5;

    if (ogScore >= 30) {
      issues.push({
        id: 'social-2',
        category: 'success',
        title: 'Open Graph Tags Present',
        description: 'Essential Open Graph tags are configured for social sharing.',
        impact: 'low',
        points: 40,
        maxPoints: 40
      });
      score += 40;
    } else {
      issues.push({
        id: 'social-3',
        category: 'warning',
        title: 'Incomplete Open Graph Tags',
        description: 'Some Open Graph tags are missing. Add og:title, og:description, og:image.',
        howToFix: 'Complete your Open Graph implementation with all required tags.',
        impact: 'medium',
        points: ogScore,
        maxPoints: 40
      });
      score += ogScore;
    }
  }

  // Twitter Card Analysis
  if (!twitterCard) {
    issues.push({
      id: 'social-4',
      category: 'warning',
      title: 'Missing Twitter Card Tags',
      description: 'No Twitter Card tags found. Your content won\'t display well when shared on Twitter.',
      howToFix: 'Add twitter:card, twitter:title, twitter:description, and twitter:image meta tags.',
      impact: 'medium',
      points: 0,
      maxPoints: 40
    });
  } else {
    let twitterScore = 0;
    if (twitterCard) twitterScore += 15;
    if (twitterTitle) twitterScore += 10;
    if (twitterDescription) twitterScore += 10;
    if (twitterImage) twitterScore += 5;

    if (twitterScore >= 25) {
      issues.push({
        id: 'social-5',
        category: 'success',
        title: 'Twitter Card Tags Present',
        description: 'Twitter Card is properly configured.',
        impact: 'low',
        points: 40,
        maxPoints: 40
      });
      score += 40;
    } else {
      issues.push({
        id: 'social-6',
        category: 'warning',
        title: 'Incomplete Twitter Card Tags',
        description: 'Some Twitter Card tags are missing.',
        howToFix: 'Add twitter:title, twitter:description, and twitter:image tags.',
        impact: 'medium',
        points: twitterScore,
        maxPoints: 40
      });
      score += twitterScore;
    }
  }

  // Social sharing info
  issues.push({
    id: 'social-7',
    category: 'info',
    title: 'Social Sharing Best Practices',
    description: 'Use images at least 1200x630px for best display on social platforms.',
    howToFix: 'Create custom social sharing images with your brand and compelling text.',
    impact: 'low',
    points: 20,
    maxPoints: 20
  });
  score += 20;

  return {
    name: 'Social Media',
    icon: '📣',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Security
function analyzeSecurity(html: string, url: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // HTTPS check
  if (url) {
    if (url.startsWith('https://')) {
      issues.push({
        id: 'security-1',
        category: 'success',
        title: 'SSL/HTTPS Enabled',
        description: 'Your site uses HTTPS encryption. This is a ranking factor for Google.',
        impact: 'low',
        points: 40,
        maxPoints: 40
      });
      score += 40;
    } else {
      issues.push({
        id: 'security-2',
        category: 'critical',
        title: 'No HTTPS/SSL',
        description: 'Your site is not using HTTPS. This is a security risk and hurts SEO.',
        howToFix: 'Install an SSL certificate and redirect all traffic to HTTPS.',
        impact: 'high',
        points: 0,
        maxPoints: 40
      });
    }
  } else {
    score += 20;
  }

  // Mixed content check
  const httpResources = html.match(/src=["']http:\/\//gi) || [];
  const httpLinks = html.match(/href=["']http:\/\/[^"']*\.(css|js)["']/gi) || [];
  
  if (httpResources.length > 0 || httpLinks.length > 0) {
    issues.push({
      id: 'security-3',
      category: 'warning',
      title: 'Mixed Content Detected',
      description: `Found ${httpResources.length + httpLinks.length} HTTP resource(s). This can cause security warnings.`,
      howToFix: 'Change all HTTP resources to HTTPS or use protocol-relative URLs (//).',
      impact: 'medium',
      points: 10,
      maxPoints: 25
    });
    score += 10;
  } else {
    issues.push({
      id: 'security-4',
      category: 'success',
      title: 'No Mixed Content',
      description: 'All resources are loaded securely.',
      impact: 'low',
      points: 25,
      maxPoints: 25
    });
    score += 25;
  }

  // External script check
  const externalScripts = html.match(/<script[^>]*src=["']https?:\/\/[^"']*["']/gi) || [];
  if (externalScripts.length > 5) {
    issues.push({
      id: 'security-5',
      category: 'info',
      title: 'Many External Scripts',
      description: `${externalScripts.length} external scripts detected. Be cautious about third-party code.`,
      howToFix: 'Review external scripts regularly and use Subresource Integrity (SRI) for security.',
      impact: 'low',
      points: 10,
      maxPoints: 20
    });
    score += 10;
  } else {
    issues.push({
      id: 'security-6',
      category: 'success',
      title: 'Reasonable External Scripts',
      description: 'External script usage is within acceptable limits.',
      impact: 'low',
      points: 20,
      maxPoints: 20
    });
    score += 20;
  }

  // Form security
  const forms = html.match(/<form[^>]*>/gi) || [];
  const secureForms = html.match(/<form[^>]*action=["']https:\/\//gi) || [];
  
  if (forms.length > 0 && secureForms.length < forms.length) {
    issues.push({
      id: 'security-7',
      category: 'warning',
      title: 'Form Security',
      description: 'Some forms may not submit over HTTPS.',
      howToFix: 'Ensure all form actions use HTTPS URLs.',
      impact: 'medium',
      points: 5,
      maxPoints: 15
    });
    score += 5;
  } else {
    issues.push({
      id: 'security-8',
      category: 'success',
      title: 'Forms Secure',
      description: 'No insecure form submissions detected.',
      impact: 'low',
      points: 15,
      maxPoints: 15
    });
    score += 15;
  }

  return {
    name: 'Security',
    icon: '🔒',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Analyze Performance (estimated)
function analyzePerformance(html: string): CategoryScore {
  const issues: SEOIssue[] = [];
  let score = 0;
  const maxScore = 100;

  // HTML size
  const htmlSize = new Blob([html]).size;
  const htmlSizeKB = (htmlSize / 1024).toFixed(1);

  if (htmlSize > 100000) {
    issues.push({
      id: 'perf-1',
      category: 'warning',
      title: 'Large HTML Document',
      description: `HTML size is ${htmlSizeKB}KB. Large documents slow down initial render.`,
      howToFix: 'Reduce HTML size by removing unnecessary code, comments, and inline styles.',
      impact: 'medium',
      points: 10,
      maxPoints: 25
    });
    score += 10;
  } else if (htmlSize > 50000) {
    issues.push({
      id: 'perf-2',
      category: 'info',
      title: 'Moderate HTML Size',
      description: `HTML size is ${htmlSizeKB}KB. Consider optimizing if possible.`,
      howToFix: 'Look for opportunities to reduce HTML size.',
      impact: 'low',
      points: 18,
      maxPoints: 25
    });
    score += 18;
  } else {
    issues.push({
      id: 'perf-3',
      category: 'success',
      title: 'Optimized HTML Size',
      description: `HTML size is ${htmlSizeKB}KB. Good for fast loading!`,
      impact: 'low',
      points: 25,
      maxPoints: 25
    });
    score += 25;
  }

  // Inline CSS and JS
  const inlineStyleBlocks = (html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || []).length;
  const inlineScriptBlocks = (html.match(/<script(?![^>]*src)[^>]*>[\s\S]*?<\/script>/gi) || []).length;

  if (inlineStyleBlocks > 3 || inlineScriptBlocks > 5) {
    issues.push({
      id: 'perf-4',
      category: 'warning',
      title: 'Excessive Inline Code',
      description: `Found ${inlineStyleBlocks} style blocks and ${inlineScriptBlocks} inline scripts.`,
      howToFix: 'Move inline CSS and JavaScript to external files for better caching.',
      impact: 'medium',
      points: 10,
      maxPoints: 25
    });
    score += 10;
  } else {
    issues.push({
      id: 'perf-5',
      category: 'success',
      title: 'Minimal Inline Code',
      description: 'Good balance of inline and external resources.',
      impact: 'low',
      points: 25,
      maxPoints: 25
    });
    score += 25;
  }

  // Render-blocking resources
  const renderBlockingCSS = (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).length;
  const renderBlockingJS = (html.match(/<script[^>]*src=[^>]*>(?![\s\S]*defer|async)/gi) || []).length;

  if (renderBlockingCSS > 5 || renderBlockingJS > 3) {
    issues.push({
      id: 'perf-6',
      category: 'warning',
      title: 'Multiple Render-Blocking Resources',
      description: `${renderBlockingCSS} CSS files and ${renderBlockingJS} blocking scripts may slow rendering.`,
      howToFix: 'Use async/defer for scripts and consider critical CSS inlining.',
      impact: 'medium',
      points: 10,
      maxPoints: 25
    });
    score += 10;
  } else {
    issues.push({
      id: 'perf-7',
      category: 'success',
      title: 'Reasonable Resource Loading',
      description: 'Number of render-blocking resources is acceptable.',
      impact: 'low',
      points: 25,
      maxPoints: 25
    });
    score += 25;
  }

  // Compression hint
  issues.push({
    id: 'perf-8',
    category: 'info',
    title: 'Enable Compression',
    description: 'Ensure Gzip/Brotli compression is enabled on your server.',
    howToFix: 'Configure your server to compress HTML, CSS, and JavaScript files.',
    impact: 'medium',
    points: 25,
    maxPoints: 25
  });
  score += 25;

  return {
    name: 'Performance',
    icon: '⚡',
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100),
    issues
  };
}

// Main analysis function
export function performComprehensiveSEOAnalysis(html: string, url: string): SEOAnalysisResult {
  const meta = analyzeMetaTags(html, url);
  const content = analyzeContent(html);
  const headings = analyzeHeadings(html);
  const images = analyzeImages(html);
  const links = analyzeLinks(html, url);
  const technical = analyzeTechnical(html, url);
  const mobile = analyzeMobile(html);
  const social = analyzeSocial(html);
  const security = analyzeSecurity(html, url);
  const performance = analyzePerformance(html);

  const categories = { meta, content, headings, images, links, technical, mobile, social, security, performance };

  // Calculate overall score
  const totalScore = Object.values(categories).reduce((sum, cat) => sum + cat.score, 0);
  const totalMaxScore = Object.values(categories).reduce((sum, cat) => sum + cat.maxScore, 0);
  const overallScore = Math.round((totalScore / totalMaxScore) * 100);

  // Calculate summary
  const allIssues = Object.values(categories).flatMap(cat => cat.issues);
  const summary = {
    critical: allIssues.filter(i => i.category === 'critical').length,
    warnings: allIssues.filter(i => i.category === 'warning').length,
    passed: allIssues.filter(i => i.category === 'success').length,
    info: allIssues.filter(i => i.category === 'info').length
  };

  // Extract page info
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
  const wordCount = bodyContent.split(/\s+/).filter(w => w.length > 0).length;

  const { grade, color } = calculateGrade(overallScore);

  return {
    url,
    analyzedAt: new Date(),
    overallScore,
    grade,
    gradeColor: color,
    categories,
    summary,
    pageInfo: {
      title: titleMatch ? titleMatch[1].trim() : 'No title found',
      description: descMatch ? descMatch[1].trim() : 'No description found',
      url,
      wordCount,
      loadTime: Math.random() * 2 + 0.5, // Simulated
      pageSize: (new Blob([html]).size / 1024).toFixed(1) + ' KB'
    }
  };
}
