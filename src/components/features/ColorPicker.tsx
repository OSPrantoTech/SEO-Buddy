import { useState } from 'react';
import { Pipette, Copy, Check, RefreshCw, Palette } from 'lucide-react';

export default function ColorPicker() {
  const [color, setColor] = useState('#3B82F6');
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'CSS Variable', value: `--color-primary: ${color};` },
    { label: 'Tailwind', value: `bg-[${color}]` },
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
  };

  const presetColors = [
    '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
    '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
    '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
    '#EC4899', '#F43F5E', '#78716C', '#64748B', '#000000'
  ];

  const getContrastColor = (hex: string) => {
    const { r, g, b } = hexToRgb(hex);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
            <Pipette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Color Picker</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pick colors and get all formats</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Color Picker */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" /> Select Color
          </h2>
          
          {/* Main Color Display */}
          <div 
            className="w-full h-40 rounded-xl mb-4 flex items-center justify-center text-2xl font-bold shadow-inner"
            style={{ backgroundColor: color, color: getContrastColor(color) }}
          >
            {color.toUpperCase()}
          </div>

          {/* Color Input */}
          <div className="flex gap-3 mb-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-12 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-600"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-mono"
              placeholder="#000000"
            />
            <button
              onClick={generateRandomColor}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Preset Colors */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Preset Colors</p>
            <div className="grid grid-cols-10 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => setColor(presetColor)}
                  className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${
                    color === presetColor ? 'border-gray-800 dark:border-white scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: presetColor }}
                  title={presetColor}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Color Formats */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-4">📋 Color Formats</h2>
          
          <div className="space-y-3">
            {formats.map((format) => (
              <div key={format.label} className="flex items-center gap-3">
                <span className="w-24 text-sm text-gray-500 dark:text-gray-400">{format.label}</span>
                <div className="flex-1 flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-800 dark:text-gray-200 truncate">
                    {format.value}
                  </code>
                  <button
                    onClick={() => copyToClipboard(format.value, format.label)}
                    className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    {copied === format.label ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Color Info */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white mb-3">🎨 Color Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Red</p>
                <p className="font-mono text-gray-800 dark:text-white">{rgb.r}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Green</p>
                <p className="font-mono text-gray-800 dark:text-white">{rgb.g}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Blue</p>
                <p className="font-mono text-gray-800 dark:text-white">{rgb.b}</p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Luminance</p>
                <p className="font-mono text-gray-800 dark:text-white">{hsl.l}%</p>
              </div>
            </div>
          </div>

          {/* Contrast Preview */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Text Contrast Preview</p>
            <div className="grid grid-cols-2 gap-2">
              <div 
                className="p-3 rounded-lg text-center font-medium"
                style={{ backgroundColor: color, color: '#FFFFFF' }}
              >
                White Text
              </div>
              <div 
                className="p-3 rounded-lg text-center font-medium"
                style={{ backgroundColor: color, color: '#000000' }}
              >
                Black Text
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
