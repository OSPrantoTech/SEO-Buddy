import { useState } from 'react';
import { Card } from '../ui/Card';

export function WordCounter() {
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
    paragraphs: text.split(/\n\n+/).filter(p => p.trim()).length,
    lines: text.split(/\n/).filter(l => l.trim()).length,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
    speakingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 150),
  };

  const topWords = text.trim() 
    ? Object.entries(
        text.toLowerCase()
          .replace(/[^a-zA-Z0-9\s]/g, '')
          .split(/\s+/)
          .filter(w => w.length > 2)
          .reduce((acc: Record<string, number>, word) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
          }, {})
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
    : [];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">📝 Word Counter & Text Analyzer</h1>
        <p className="text-cyan-100 text-sm sm:text-base">
          Count words, characters, sentences এবং reading time calculate করুন
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Text Input */}
        <div className="lg:col-span-2">
          <Card className="p-4 sm:p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              আপনার text paste করুন
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="এখানে আপনার content লিখুন বা paste করুন..."
              className="w-full h-64 sm:h-80 p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base resize-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setText('')}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                🗑️ Clear
              </button>
              <button
                onClick={() => setText(text.toUpperCase())}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                AA UPPERCASE
              </button>
              <button
                onClick={() => setText(text.toLowerCase())}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                aa lowercase
              </button>
              <button
                onClick={() => setText(text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '))}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Aa Title Case
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(text)}
                className="px-4 py-2 text-sm bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                📋 Copy
              </button>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">📊 Statistics</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Words</span>
                <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400">{stats.words}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Characters</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{stats.characters}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Without Spaces</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{stats.charactersNoSpaces}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Sentences</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{stats.sentences}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Paragraphs</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{stats.paragraphs}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Lines</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{stats.lines}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">⏱️ Time Estimates</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">📖 Reading Time</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{stats.readingTime} min</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">🎤 Speaking Time</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">{stats.speakingTime} min</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
              * Reading: 200 words/min • Speaking: 150 words/min
            </p>
          </Card>
        </div>
      </div>

      {/* Top Words */}
      {topWords.length > 0 && (
        <Card className="p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🔤 Top 10 Most Used Words</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {topWords.map(([word, count], index) => (
              <div
                key={word}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">#{index + 1}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{word}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{count}x</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* SEO Tips */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
        <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">💡 SEO Content Tips</h3>
        <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
          <li>• Blog posts: <strong>1,500-2,500 words</strong> ideal for ranking</li>
          <li>• Product descriptions: <strong>300-500 words</strong> minimum</li>
          <li>• Meta descriptions: <strong>150-160 characters</strong></li>
          <li>• Title tags: <strong>50-60 characters</strong></li>
          <li>• Reading time <strong>7-8 minutes</strong> keeps users engaged</li>
        </ul>
      </Card>
    </div>
  );
}
