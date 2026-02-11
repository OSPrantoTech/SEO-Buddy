import { useState } from 'react';
import { Barcode, Copy, Check, Download, RefreshCw } from 'lucide-react';

export default function BarcodeGenerator() {
  const [text, setText] = useState('1234567890');
  const [barcodeType, setBarcodeType] = useState<'code128' | 'ean13' | 'upc'>('code128');
  const [copied, setCopied] = useState(false);

  // Generate simple barcode pattern
  const generateBarcodePattern = (input: string, type: string): string[] => {
    const patterns: string[] = [];
    
    // Simplified barcode representation
    const charPatterns: Record<string, string> = {
      '0': '1010001101', '1': '1100110101', '2': '1101100101', '3': '1000101101',
      '4': '1011101001', '5': '1001110101', '6': '1010000011', '7': '1000100011',
      '8': '1001000011', '9': '1110101001',
      'A': '1101010001', 'B': '1011010001', 'C': '1101101001', 'D': '1010110001',
      'E': '1101011001', 'F': '1011011001', 'G': '1010100011', 'H': '1101010011',
      'I': '1011010011', 'J': '1010110011', 'K': '1101010101', 'L': '1011010101',
      'M': '1101101011', 'N': '1010110101', 'O': '1101011011', 'P': '1011011011',
      'Q': '1010101101', 'R': '1101010110', 'S': '1011010110', 'T': '1010110110',
      'U': '1100101011', 'V': '1001101011', 'W': '1100110110', 'X': '1001011011',
      'Y': '1100101101', 'Z': '1001101101', '-': '1001010011', '.': '1100101001',
      ' ': '1001100101', '$': '1001001001', '/': '1001001010', '+': '1010010010',
      '%': '1010100100'
    };

    // Start pattern
    patterns.push('11010010000');

    const chars = input.toUpperCase().split('');
    chars.forEach(char => {
      if (charPatterns[char]) {
        patterns.push(charPatterns[char]);
      }
    });

    // End pattern
    patterns.push('11000111010');
    patterns.push('11');

    return patterns;
  };

  const barcodePatterns = generateBarcodePattern(text, barcodeType);
  const fullPattern = barcodePatterns.join('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadBarcode = () => {
    const svg = document.getElementById('barcode-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new window.Image();

    canvas.width = fullPattern.length * 2;
    canvas.height = 100;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = 'barcode.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const generateSample = () => {
    const samples = {
      code128: 'SEO-BUDDY-2024',
      ean13: '5901234123457',
      upc: '012345678905'
    };
    setText(samples[barcodeType]);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg">
            <Barcode className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Barcode Generator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Create barcodes for products and inventory</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-800 dark:text-white mb-4">⚙️ Settings</h2>

            {/* Barcode Type */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Barcode Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'code128', name: 'Code 128', desc: 'Alphanumeric' },
                  { id: 'ean13', name: 'EAN-13', desc: '13 digits' },
                  { id: 'upc', name: 'UPC-A', desc: '12 digits' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setBarcodeType(type.id as 'code128' | 'ean13' | 'upc')}
                    className={`p-3 rounded-lg text-left transition-colors ${
                      barcodeType === type.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <p className="font-medium text-sm">{type.name}</p>
                    <p className={`text-xs ${barcodeType === type.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      {type.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Text */}
            <div className="mb-4">
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Barcode Content</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={barcodeType === 'code128' ? 'Enter text or numbers' : 'Enter numbers only'}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-mono"
                  maxLength={barcodeType === 'ean13' ? 13 : barcodeType === 'upc' ? 12 : 50}
                />
                <button
                  onClick={generateSample}
                  className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {barcodeType === 'code128' && 'Supports letters, numbers, and some special characters'}
                {barcodeType === 'ean13' && 'Requires exactly 13 digits'}
                {barcodeType === 'upc' && 'Requires exactly 12 digits'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold text-gray-800 dark:text-white mb-4">📥 Export</h2>
            <div className="flex gap-3">
              <button
                onClick={downloadBarcode}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> Download PNG
              </button>
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-4">👁️ Preview</h2>
          
          <div className="bg-white p-8 rounded-xl border-2 border-dashed border-gray-200">
            {/* SVG Barcode */}
            <svg
              id="barcode-svg"
              viewBox={`0 0 ${fullPattern.length * 2} 80`}
              className="w-full h-auto"
              style={{ minHeight: 80 }}
            >
              <rect width="100%" height="100%" fill="white" />
              {fullPattern.split('').map((bit, index) => (
                bit === '1' && (
                  <rect
                    key={index}
                    x={index * 2}
                    y={0}
                    width={2}
                    height={60}
                    fill="black"
                  />
                )
              ))}
              <text
                x="50%"
                y="75"
                textAnchor="middle"
                fontSize="12"
                fontFamily="monospace"
                fill="black"
              >
                {text}
              </text>
            </svg>
          </div>

          {/* Info */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Type</p>
                <p className="font-medium text-gray-800 dark:text-white">
                  {barcodeType === 'code128' ? 'Code 128' : barcodeType === 'ean13' ? 'EAN-13' : 'UPC-A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Characters</p>
                <p className="font-medium text-gray-800 dark:text-white">{text.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barcode Types Info */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-white mb-4">📖 Barcode Types</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white">Code 128</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Most versatile. Supports letters, numbers, and symbols. Used in shipping and packaging.
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white">EAN-13</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              European Article Number. 13 digits. Used in retail worldwide (except USA/Canada).
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-white">UPC-A</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Universal Product Code. 12 digits. Standard in USA and Canada retail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
