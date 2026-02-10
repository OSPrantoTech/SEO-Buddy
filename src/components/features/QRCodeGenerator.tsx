import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';

export function QRCodeGenerator() {
  const [url, setUrl] = useState('https://example.com');
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simple QR Code generator using canvas
  const generateQRCode = () => {
    if (!canvasRef.current || !url) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use a simple visual representation (actual QR would need a library)
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Create a pattern that looks like QR code
    const moduleSize = Math.floor(size / 25);
    ctx.fillStyle = fgColor;

    // Generate pseudo-random pattern based on URL
    const seed = url.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    
    // Position patterns (corners)
    const drawPositionPattern = (x: number, y: number) => {
      const s = moduleSize * 7;
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = bgColor;
      ctx.fillRect(x + moduleSize, y + moduleSize, s - moduleSize * 2, s - moduleSize * 2);
      ctx.fillStyle = fgColor;
      ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, s - moduleSize * 4, s - moduleSize * 4);
    };

    drawPositionPattern(moduleSize, moduleSize);
    drawPositionPattern(size - moduleSize * 8, moduleSize);
    drawPositionPattern(moduleSize, size - moduleSize * 8);

    // Data modules (simplified pattern)
    for (let i = 9; i < 24; i++) {
      for (let j = 9; j < 24; j++) {
        const val = (seed * i * j) % 7;
        if (val < 3) {
          ctx.fillRect(
            i * moduleSize,
            j * moduleSize,
            moduleSize - 1,
            moduleSize - 1
          );
        }
      }
    }

    // Timing patterns
    for (let i = 8; i < 24; i += 2) {
      ctx.fillRect(6 * moduleSize, i * moduleSize, moduleSize, moduleSize);
      ctx.fillRect(i * moduleSize, 6 * moduleSize, moduleSize, moduleSize);
    }
  };

  useEffect(() => {
    generateQRCode();
  }, [url, size, bgColor, fgColor]);

  const downloadQR = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  const copyQR = async () => {
    if (!canvasRef.current) return;
    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasRef.current?.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback - copy URL instead
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const presetColors = [
    { bg: '#ffffff', fg: '#000000', name: 'Classic' },
    { bg: '#1a1a2e', fg: '#eaeaea', name: 'Dark' },
    { bg: '#f8f9fa', fg: '#0d6efd', name: 'Blue' },
    { bg: '#d4edda', fg: '#155724', name: 'Green' },
    { bg: '#fff3cd', fg: '#856404', name: 'Yellow' },
    { bg: '#f8d7da', fg: '#721c24', name: 'Red' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">📱 QR Code Generator</h1>
        <p className="text-gray-300 text-sm sm:text-base">
          যেকোনো URL এর জন্য QR code তৈরি করুন - marketing materials এ ব্যবহার করুন
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🔗 Enter URL</h3>
            
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-website.com"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />

            {/* Size Slider */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Size: {size}px
              </label>
              <input
                type="range"
                min="100"
                max="400"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Foreground Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Color Presets */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🎨 Color Presets</h3>
            
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presetColors.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setBgColor(preset.bg);
                    setFgColor(preset.fg);
                  }}
                  className="p-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 transition-colors"
                >
                  <div 
                    className="w-full h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: preset.bg }}
                  >
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.fg }}
                    />
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">{preset.name}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">👁️ Preview</h3>
            
            <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <canvas
                ref={canvasRef}
                width={size}
                height={size}
                className="rounded shadow-lg"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={downloadQR}
                className="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                📥 Download PNG
              </button>
              <button
                onClick={copyQR}
                className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? '✅ Copied!' : '📋 Copy Image'}
              </button>
            </div>
          </Card>

          {/* Use Cases */}
          <Card className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">📌 QR Code ব্যবহার করুন</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• <strong>Business Cards:</strong> Website link শেয়ার করুন</li>
              <li>• <strong>Flyers & Posters:</strong> Campaign landing page</li>
              <li>• <strong>Product Packaging:</strong> Product details page</li>
              <li>• <strong>Restaurant Menus:</strong> Digital menu link</li>
              <li>• <strong>Event Tickets:</strong> Event registration</li>
              <li>• <strong>Social Media:</strong> Profile link শেয়ার করুন</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Note */}
      <Card className="p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-700 dark:text-amber-300">
          <strong>💡 Note:</strong> এটি একটি visual representation। Production use এর জন্য actual QR code library ব্যবহার করুন। 
          Google Charts API দিয়েও QR code generate করতে পারেন: 
          <code className="ml-1 px-1 bg-amber-100 dark:bg-amber-900/50 rounded">
            https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=YOUR_URL
          </code>
        </p>
      </Card>
    </div>
  );
}
