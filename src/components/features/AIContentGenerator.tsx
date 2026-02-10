/**
 * ============================================
 * AI CONTENT GENERATOR COMPONENT
 * ============================================
 * Uses AI to generate SEO-optimized content.
 */

import { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Type, FileText, Hash } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { generateAIContent } from '../../utils/aiHelper';
import type { AIContent } from '../../types';

export function AIContentGenerator() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiContent, setAiContent] = useState<AIContent | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Generate AI content
  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    try {
      const content = await generateAIContent(topic);
      setAiContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
    }
    setIsGenerating(false);
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ✨ AI Content Generator
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Let AI help you create SEO-optimized titles, descriptions, and find the best keywords.
          Just enter your topic and watch the magic happen!
        </p>
      </div>

      {/* Topic Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0" />
            What's Your Topic?
          </CardTitle>
          <CardDescription>
            Enter the main topic of your blog post, product, or page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., digital marketing, healthy recipes..."
              className="flex-1 px-3 md:px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <Button 
              onClick={handleGenerate} 
              loading={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full sm:w-auto"
            >
              <Sparkles className="w-5 h-5" />
              Generate
            </Button>
          </div>

          {/* Quick topic suggestions */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Try:</span>
            {['SEO tips', 'fitness routine', 'cooking basics', 'photography'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setTopic(suggestion)}
                className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 
                         text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600
                         transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {aiContent && (
        <div className="space-y-4 md:space-y-6 animate-fade-in">
          {/* Titles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Type className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                Generated Titles
                <span className="text-gray-400 text-xs md:text-sm font-normal">(tap to copy)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {aiContent.titles.map((title, index) => (
                  <div
                    key={index}
                    onClick={() => copyToClipboard(title, `title-${index}`)}
                    className="group flex items-center justify-between p-3 rounded-lg 
                             bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20
                             cursor-pointer transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
                  >
                    <span className="text-sm md:text-base text-gray-800 dark:text-gray-200 pr-2">{title}</span>
                    <span className="flex-shrink-0">
                      {copiedIndex === `title-${index}` ? (
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 md:w-5 md:h-5 text-gray-400 opacity-50 group-hover:opacity-100" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Descriptions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <FileText className="w-5 h-5 text-green-500 flex-shrink-0" />
                Meta Descriptions
                <span className="text-gray-400 text-xs md:text-sm font-normal">(tap to copy)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {aiContent.descriptions.map((desc, index) => (
                  <div
                    key={index}
                    onClick={() => copyToClipboard(desc, `desc-${index}`)}
                    className="group flex items-start justify-between p-3 rounded-lg 
                             bg-gray-50 dark:bg-gray-700/50 hover:bg-green-50 dark:hover:bg-green-900/20
                             cursor-pointer transition-colors border border-transparent hover:border-green-200 dark:hover:border-green-800"
                  >
                    <span className="text-xs md:text-sm text-gray-800 dark:text-gray-200 pr-2">{desc}</span>
                    <span className="flex-shrink-0 mt-0.5">
                      {copiedIndex === `desc-${index}` ? (
                        <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 md:w-5 md:h-5 text-gray-400 opacity-50 group-hover:opacity-100" />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Keywords */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Hash className="w-5 h-5 text-purple-500 flex-shrink-0" />
                Suggested Keywords
              </CardTitle>
              <CardDescription>
                Use these keywords in your content to help rank higher in search results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {aiContent.keywords.map((keyword, index) => (
                  <button
                    key={index}
                    onClick={() => copyToClipboard(keyword, `keyword-${index}`)}
                    className="group flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-full
                             bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300
                             hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-xs md:text-sm"
                  >
                    {keyword}
                    {copiedIndex === `keyword-${index}` ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regenerate Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleGenerate} 
              variant="secondary"
              loading={isGenerating}
            >
              <RefreshCw className="w-4 h-4" />
              Generate More Ideas
            </Button>
          </div>
        </div>
      )}

      {/* Tips for beginners */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-4 md:p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm md:text-base">💡 Tips for Using AI Content</h4>
          <ul className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Always customize AI suggestions to match your unique voice and brand</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Use keywords naturally - don't stuff them everywhere!</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Test different titles to see which ones perform better</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Make sure your description accurately represents your content</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
