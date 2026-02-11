import { useState } from 'react';
import { Card } from '../ui/Card';

export function QRCodeGenerator() {
  const [url, setUrl] = useState('https://example.com');
  const [size, setSize] = useState(200);
  const [copied, setCopied] = useState(false);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  // Generate QR Code URL using Google Charts API
  const getQRCodeUrl = () => {
    const encodedUrl = encodeURIComponent(url);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}&ecc=${errorLevel}`;
  };

  // Alternative Google Charts API
  const getGoogleQRUrl = () => {
    const encodedUrl = encodeURIComponent(url);
    return `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodedUrl}&chld=${errorLevel}`;
  };

  const [useGoogleApi, setUseGoogleApi] = useState(false);
  const qrCodeUrl = useGoogleApi ? getGoogleQRUrl() : getQRCodeUrl();

  const downloadQR = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `qrcode-${size}x${size}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch {
      // Fallback: open in new tab
      window.open(qrCodeUrl, '_blank');
    }
  };

  const copyQRUrl = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = qrCodeUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const presetSizes = [
    { size: 100, label: 'Small' },
    { size: 200, label: 'Medium' },
    { size: 300, label: 'Large' },
    { size: 400, label: 'X-Large' },
  ];

  const errorLevels = [
    { level: 'L' as const, label: 'Low (7%)', desc: 'Small file size' },
    { level: 'M' as const, label: 'Medium (15%)', desc: 'Recommended' },
    { level: 'Q' as const, label: 'High (25%)', desc: 'Better recovery' },
    { level: 'H' as const, label: 'Highest (30%)', desc: 'Best for logos' },
  ];

  const quickLinks = [
    { label: 'Website', prefix: 'https://', placeholder: 'example.com' },
    { label: 'Email', prefix: 'mailto:', placeholder: 'email@example.com' },
    { label: 'Phone', prefix: 'tel:', placeholder: '+8801700000000' },
    { label: 'SMS', prefix: 'sms:', placeholder: '+8801700000000' },
    { label: 'WhatsApp', prefix: 'https://wa.me/', placeholder: '8801700000000' },
    { label: 'WiFi', prefix: 'WIFI:T:WPA;S:', placeholder: 'NetworkName;P:Password;;' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">📱 QR Code Generator</h1>
        <p className="text-purple-100 text-sm sm:text-base">
          যেকোনো URL, Phone, Email, WhatsApp এর জন্য scannable QR code তৈরি করুন
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🔗 Enter Content</h3>
            
            {/* Quick Type Buttons */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick type:</p>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => setUrl(link.prefix + link.placeholder)}
                    className="px-3 py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL, phone, email, or text"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />

            {/* Size Selection */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📐 Size: {size}x{size} px
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {presetSizes.map((preset) => (
                  <button
                    key={preset.size}
                    onClick={() => setSize(preset.size)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      size === preset.size
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="50"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-purple-600"
              />
            </div>

            {/* Error Correction Level */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🛡️ Error Correction Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {errorLevels.map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setErrorLevel(item.level)}
                    className={`p-2 text-left rounded-lg border-2 transition-colors ${
                      errorLevel === item.level
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <p className={`text-sm font-medium ${errorLevel === item.level ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* API Selection */}
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useGoogleApi}
                  onChange={(e) => setUseGoogleApi(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Use Google Charts API (alternative)
                </span>
              </label>
            </div>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">👁️ Preview</h3>
            
            <div className="flex justify-center p-6 bg-white dark:bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-400">
              {url ? (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="max-w-full h-auto rounded shadow-lg"
                  style={{ maxWidth: size, maxHeight: size }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(url)}`;
                  }}
                />
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <p className="text-4xl mb-2">📱</p>
                  <p>Enter a URL to generate QR code</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={downloadQR}
                disabled={!url}
                className="flex-1 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                📥 Download PNG
              </button>
              <button
                onClick={copyQRUrl}
                disabled={!url}
                className="flex-1 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {copied ? '✅ Copied!' : '📋 Copy URL'}
              </button>
            </div>

            {/* Direct Image URL */}
            {url && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Direct Image URL:</p>
                <input
                  type="text"
                  value={qrCodeUrl}
                  readOnly
                  className="w-full p-2 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-600 dark:text-gray-300"
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                />
              </div>
            )}
          </Card>

          {/* HTML Embed Code */}
          {url && (
            <Card className="p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📝 Embed Code</h3>
              <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                <code className="text-green-400 text-xs sm:text-sm whitespace-pre-wrap break-all">
                  {`<img src="${qrCodeUrl}" alt="QR Code" width="${size}" height="${size}" />`}
                </code>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`<img src="${qrCodeUrl}" alt="QR Code" width="${size}" height="${size}" />`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                📋 Copy HTML
              </button>
            </Card>
          )}

          {/* Use Cases */}
          <Card className="p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">📌 QR Code ব্যবহার করুন</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-2">
                <span>💼</span>
                <span>Business Cards</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📋</span>
                <span>Flyers & Posters</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📦</span>
                <span>Product Packaging</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🍽️</span>
                <span>Restaurant Menus</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🎟️</span>
                <span>Event Tickets</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📱</span>
                <span>App Downloads</span>
              </div>
              <div className="flex items-start gap-2">
                <span>💳</span>
                <span>Payment Links</span>
              </div>
              <div className="flex items-start gap-2">
                <span>📧</span>
                <span>Email Signatures</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* SEO Tips */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">💡 QR Code Best Practices</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="font-medium text-green-800 dark:text-green-300 mb-1">✅ Test First</p>
            <p className="text-sm text-green-700 dark:text-green-400">Print করার আগে scan করে দেখুন</p>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">📐 Right Size</p>
            <p className="text-sm text-blue-700 dark:text-blue-400">Print size কমপক্ষে 2x2 cm রাখুন</p>
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="font-medium text-purple-800 dark:text-purple-300 mb-1">🎨 Good Contrast</p>
            <p className="text-sm text-purple-700 dark:text-purple-400">Dark foreground, light background</p>
          </div>
          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="font-medium text-orange-800 dark:text-orange-300 mb-1">🔗 Short URLs</p>
            <p className="text-sm text-orange-700 dark:text-orange-400">Short URLs = simpler QR codes</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
