/**
 * ============================================
 * PERFORMANCE CHECK COMPONENT
 * ============================================
 * Checks page speed and mobile-friendliness.
 */

import React, { useState } from 'react';
import { Gauge, Smartphone, Monitor, Wifi, Zap, Image, Code, Check, X, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tooltip } from '../ui/Tooltip';

interface PerformanceResult {
  overall: number;
  mobile: {
    score: number;
    isResponsive: boolean;
    touchTargets: boolean;
    fontSize: boolean;
  };
  speed: {
    score: number;
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
  };
  optimizations: {
    images: boolean;
    caching: boolean;
    minification: boolean;
    compression: boolean;
  };
}

export function PerformanceCheck() {
  const [url, setUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PerformanceResult | null>(null);

  // Run performance check
  const handleCheck = async () => {
    if (!url.trim()) return;

    setIsChecking(true);
    
    // Simulate API call (in real app, this would call PageSpeed Insights API)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock results
    const mobileScore = Math.floor(Math.random() * 30) + 65;
    const speedScore = Math.floor(Math.random() * 30) + 60;
    
    setResult({
      overall: Math.round((mobileScore + speedScore) / 2),
      mobile: {
        score: mobileScore,
        isResponsive: Math.random() > 0.3,
        touchTargets: Math.random() > 0.2,
        fontSize: Math.random() > 0.25
      },
      speed: {
        score: speedScore,
        loadTime: parseFloat((Math.random() * 3 + 1).toFixed(1)),
        firstContentfulPaint: parseFloat((Math.random() * 2 + 0.5).toFixed(1)),
        largestContentfulPaint: parseFloat((Math.random() * 3 + 1.5).toFixed(1))
      },
      optimizations: {
        images: Math.random() > 0.4,
        caching: Math.random() > 0.5,
        minification: Math.random() > 0.3,
        compression: Math.random() > 0.35
      }
    });

    setIsChecking(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 50) return 'Needs Work';
    return 'Poor';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ⚡ Page Speed & Mobile Check
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Check how fast your website loads and if it works well on mobile devices.
          Fast, mobile-friendly sites rank higher in Google!
        </p>
      </div>

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Gauge className="w-5 h-5 text-orange-500 flex-shrink-0" />
            Enter Website URL
          </CardTitle>
          <CardDescription>
            We'll check the speed and mobile-friendliness of your page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-3 md:px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm md:text-base
                       focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
            />
            <Button 
              onClick={handleCheck} 
              loading={isChecking}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 w-full sm:w-auto"
            >
              <Zap className="w-5 h-5" />
              {isChecking ? 'Checking...' : 'Check Speed'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4 md:space-y-6 animate-fade-in">
          {/* Overall Score */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Overall */}
            <Card className="text-center">
              <CardContent className="p-4 md:p-6">
                <Gauge className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-gray-400" />
                <div className={`text-3xl md:text-4xl font-bold ${getScoreColor(result.overall)}`}>
                  {result.overall}
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Overall Score</p>
                <p className={`text-xs md:text-sm font-medium ${getScoreColor(result.overall)}`}>
                  {getScoreLabel(result.overall)}
                </p>
              </CardContent>
            </Card>

            {/* Mobile Score */}
            <Card className="text-center">
              <CardContent className="p-4 md:p-6">
                <Smartphone className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-gray-400" />
                <div className={`text-3xl md:text-4xl font-bold ${getScoreColor(result.mobile.score)}`}>
                  {result.mobile.score}
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Mobile Score</p>
                <p className={`text-xs md:text-sm font-medium ${getScoreColor(result.mobile.score)}`}>
                  {getScoreLabel(result.mobile.score)}
                </p>
              </CardContent>
            </Card>

            {/* Speed Score */}
            <Card className="text-center">
              <CardContent className="p-4 md:p-6">
                <Monitor className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-gray-400" />
                <div className={`text-3xl md:text-4xl font-bold ${getScoreColor(result.speed.score)}`}>
                  {result.speed.score}
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Speed Score</p>
                <p className={`text-xs md:text-sm font-medium ${getScoreColor(result.speed.score)}`}>
                  {getScoreLabel(result.speed.score)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Speed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Wifi className="w-5 h-5 text-blue-500 flex-shrink-0" />
                Speed Metrics
              </CardTitle>
              <CardDescription>
                How long it takes for your page to load
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Total Load Time
                      <Tooltip content="How long it takes for your entire page to load">
                        <Info className="w-3 h-3 inline ml-1" />
                      </Tooltip>
                    </span>
                  </div>
                  <p className={`text-xl md:text-2xl font-bold ${result.speed.loadTime < 2 ? 'text-green-500' : result.speed.loadTime < 4 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {result.speed.loadTime}s
                  </p>
                  <p className="text-xs text-gray-500">Goal: Under 2s</p>
                </div>

                <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      First Paint
                      <Tooltip content="When the first content appears on screen">
                        <Info className="w-3 h-3 inline ml-1" />
                      </Tooltip>
                    </span>
                  </div>
                  <p className={`text-xl md:text-2xl font-bold ${result.speed.firstContentfulPaint < 1.5 ? 'text-green-500' : result.speed.firstContentfulPaint < 3 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {result.speed.firstContentfulPaint}s
                  </p>
                  <p className="text-xs text-gray-500">Goal: Under 1.5s</p>
                </div>

                <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                      Largest Paint
                      <Tooltip content="When the main content is visible">
                        <Info className="w-3 h-3 inline ml-1" />
                      </Tooltip>
                    </span>
                  </div>
                  <p className={`text-xl md:text-2xl font-bold ${result.speed.largestContentfulPaint < 2.5 ? 'text-green-500' : result.speed.largestContentfulPaint < 4 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {result.speed.largestContentfulPaint}s
                  </p>
                  <p className="text-xs text-gray-500">Goal: Under 2.5s</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Friendliness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Smartphone className="w-5 h-5 text-green-500 flex-shrink-0" />
                Mobile Friendliness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <CheckItem 
                  label="Responsive Design"
                  passed={result.mobile.isResponsive}
                  description="Page adapts to different screen sizes"
                />
                <CheckItem 
                  label="Touch Targets"
                  passed={result.mobile.touchTargets}
                  description="Buttons and links are easy to tap on mobile"
                />
                <CheckItem 
                  label="Readable Font Size"
                  passed={result.mobile.fontSize}
                  description="Text is large enough to read on mobile"
                />
              </div>
            </CardContent>
          </Card>

          {/* Optimizations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Code className="w-5 h-5 text-purple-500 flex-shrink-0" />
                Technical Optimizations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-3">
                <CheckItem 
                  label="Image Optimization"
                  passed={result.optimizations.images}
                  description="Images are compressed and properly sized"
                  icon={<Image className="w-4 h-4" />}
                />
                <CheckItem 
                  label="Browser Caching"
                  passed={result.optimizations.caching}
                  description="Files are cached to speed up return visits"
                />
                <CheckItem 
                  label="Code Minification"
                  passed={result.optimizations.minification}
                  description="CSS and JavaScript files are compressed"
                />
                <CheckItem 
                  label="GZIP Compression"
                  passed={result.optimizations.compression}
                  description="Server compresses files before sending"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tips */}
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-orange-200 dark:border-orange-800">
        <CardContent className="p-4 md:p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm md:text-base">
            🚀 Quick Tips to Improve Speed
          </h4>
          <ul className="space-y-2 text-xs md:text-sm text-gray-600 dark:text-gray-400">
            <li>• <strong>Optimize images:</strong> Use tools like TinyPNG to compress images without losing quality</li>
            <li>• <strong>Enable caching:</strong> Let browsers store your files so they don't reload every time</li>
            <li>• <strong>Use a CDN:</strong> Deliver content from servers close to your visitors</li>
            <li>• <strong>Minimize code:</strong> Remove unnecessary spaces and comments from your code</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// Check item component
function CheckItem({ 
  label, 
  passed, 
  description,
  icon
}: { 
  label: string; 
  passed: boolean; 
  description: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${passed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
      <div className={`mt-0.5 flex-shrink-0 ${passed ? 'text-green-500' : 'text-red-500'}`}>
        {passed ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon}
          <p className={`font-medium text-sm ${passed ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {label}
          </p>
        </div>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
