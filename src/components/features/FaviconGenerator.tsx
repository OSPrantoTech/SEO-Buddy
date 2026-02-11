import { useState, useRef } from 'react';
import { Image, Download, Upload, Palette, Copy, Check } from 'lucide-react';

export default function FaviconGenerator() {
  const [text, setText] = useState('S');
  const [bgColor, setBgColor] = useState('#3B82F6');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(32);
  const [borderRadius, setBorderRadius] = useState(8);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizes = [16, 32, 48, 64, 128, 180, 192, 512];

  const generateFavicon = (size: number): string => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Background
    ctx.fillStyle = bgColor;
    const radius = (borderRadius / 64) * size;
    
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();

    if (uploadedImage) {
      // Draw uploaded image
      const img = new window.Image();
      img.src = uploadedImage;
      ctx.drawImage(img, 0, 0, size, size);
    } else {
      // Draw text
      ctx.fillStyle = textColor;
      ctx.font = `bold ${(fontSize / 64) * size}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text.slice(0, 2), size / 2, size / 2 + 2);
    }

    return canvas.toDataURL('image/png');
  };

  const downloadFavicon = (size: number) => {
    const dataUrl = generateFavicon(size);
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `favicon-${size}x${size}.png`;
    a.click();
  };

  const downloadAll = () => {
    sizes.forEach((size, index) => {
      setTimeout(() => downloadFavicon(size), index * 200);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const copyHtmlCode = () => {
    const html = `<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="${bgColor}">`;
    
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presetColors = [
    { bg: '#3B82F6', text: '#FFFFFF', name: 'Blue' },
    { bg: '#10B981', text: '#FFFFFF', name: 'Green' },
    { bg: '#8B5CF6', text: '#FFFFFF', name: 'Purple' },
    { bg: '#EF4444', text: '#FFFFFF', name: 'Red' },
    { bg: '#F59E0B', text: '#000000', name: 'Amber' },
    { bg: '#000000', text: '#FFFFFF', name: 'Black' },
    { bg: '#FFFFFF', text: '#000000', name: 'White' },
    { bg: '#EC4899', text: '#FFFFFF', name: 'Pink' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg">
            <Image className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Favicon Generator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create favicons for your website</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor */}
        <div className="space-y-4">
          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-800 dark:text-white mb-4">👁️ Preview</h2>
            
            <div className="flex items-center justify-center gap-4 p-6 bg-gray-100 dark:bg-gray-700 rounded-xl">
              {[64, 32, 16].map(size => (
                <div key={size} className="text-center">
                  <div 
                    className="mx-auto flex items-center justify-center"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: bgColor,
                      borderRadius: (borderRadius / 64) * size,
                      color: textColor,
                      fontSize: (fontSize / 64) * size,
                      fontWeight: 'bold'
                    }}
                  >
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Favicon" style={{ width: size, height: size, borderRadius: (borderRadius / 64) * size }} />
                    ) : (
                      text.slice(0, 2)
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{size}px</p>
                </div>
              ))}
            </div>

            {/* Browser Preview */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Browser Tab Preview:</p>
              <div className="flex items-center gap-2 bg-white dark:bg-gray-600 rounded-t-lg px-3 py-2 border-b border-gray-200 dark:border-gray-500">
                <div 
                  className="flex items-center justify-center"
                  style={{
                    width: 16,
                    height: 16,
                    backgroundColor: bgColor,
                    borderRadius: (borderRadius / 64) * 16,
                    color: textColor,
                    fontSize: (fontSize / 64) * 16,
                    fontWeight: 'bold'
                  }}
                >
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Favicon" style={{ width: 16, height: 16, borderRadius: (borderRadius / 64) * 16 }} />
                  ) : (
                    <span style={{ fontSize: 10 }}>{text.slice(0, 1)}</span>
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-200 truncate">SEO Buddy - Your Website</span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" /> Customize
            </h2>

            {/* Upload or Text */}
            <div className="mb-4">
              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => { setUploadedImage(null); }}
                  className={`px-4 py-2 rounded-lg text-sm ${!uploadedImage ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                >
                  Text Icon
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Upload Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {!uploadedImage && (
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  maxLength={2}
                  placeholder="AB"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-center text-2xl font-bold"
                />
              )}
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-mono text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Color Presets</label>
              <div className="flex flex-wrap gap-2">
                {presetColors.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => { setBgColor(preset.bg); setTextColor(preset.text); }}
                    className="w-8 h-8 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform"
                    style={{ backgroundColor: preset.bg }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex justify-between">
                  <span>Font Size</span>
                  <span>{fontSize}px</span>
                </label>
                <input
                  type="range"
                  min="16"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex justify-between">
                  <span>Border Radius</span>
                  <span>{borderRadius}px</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={borderRadius}
                  onChange={(e) => setBorderRadius(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Download */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 dark:text-white">📥 Download Sizes</h2>
              <button
                onClick={downloadAll}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => downloadFavicon(size)}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                >
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: Math.min(size, 32),
                      height: Math.min(size, 32),
                      backgroundColor: bgColor,
                      borderRadius: (borderRadius / 64) * Math.min(size, 32),
                      color: textColor,
                      fontSize: (fontSize / 64) * Math.min(size, 32),
                      fontWeight: 'bold'
                    }}
                  >
                    {uploadedImage ? '📷' : text.slice(0, 1)}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800 dark:text-white">{size}x{size}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {size <= 32 ? 'Browser' : size === 180 ? 'Apple' : size >= 192 ? 'Android' : 'General'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* HTML Code */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800 dark:text-white">🔧 HTML Code</h2>
              <button
                onClick={copyHtmlCode}
                className="p-2 text-gray-400 hover:text-blue-500"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <pre className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto">
{`<!-- Favicon -->
<link rel="icon" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta name="theme-color" content="${bgColor}">`}
            </pre>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
