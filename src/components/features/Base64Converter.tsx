import { useState } from 'react';
import { Binary, Copy, Check, ArrowUpDown, Trash2, Upload } from 'lucide-react';

export default function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const encode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError('');
    } catch (e) {
      setError('Failed to encode. Invalid input.');
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError('');
    } catch (e) {
      setError('Failed to decode. Invalid Base64 string.');
    }
  };

  const handleConvert = () => {
    if (mode === 'encode') {
      encode();
    } else {
      decode();
    }
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
    setError('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    if (mode === 'encode') {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        setOutput(base64);
        setError('');
      };
    } else {
      reader.readAsText(file);
      reader.onload = () => {
        setInput(reader.result as string);
      };
    }
  };

  const loadSample = () => {
    if (mode === 'encode') {
      setInput('Hello, SEO Buddy! This is a test message from OSPranto Tech.');
    } else {
      setInput('SGVsbG8sIFNFTyBCdWRkeSEgVGhpcyBpcyBhIHRlc3QgbWVzc2FnZSBmcm9tIE9TUHJhbnRvIFRlY2gu');
    }
    setOutput('');
    setError('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
            <Binary className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Base64 Converter</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Encode and decode Base64</p>
          </div>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'encode'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              🔒 Encode
            </button>
            <button
              onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'decode'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              🔓 Decode
            </button>
          </div>
          <div className="flex gap-2">
            <button onClick={loadSample} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
              📋 Sample
            </button>
            <label className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" /> Upload File
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          ❌ {error}
        </div>
      )}

      {/* Input/Output */}
      <div className="space-y-4">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {mode === 'encode' ? '📝 Plain Text' : '🔐 Base64 String'}
            </span>
            <button
              onClick={() => { setInput(''); setOutput(''); setError(''); }}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="w-full h-40 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
          />
        </div>

        {/* Convert Button */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConvert}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            {mode === 'encode' ? '🔒 Encode to Base64' : '🔓 Decode from Base64'}
          </button>
          <button
            onClick={swapMode}
            className="px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <ArrowUpDown className="w-5 h-5" />
          </button>
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {mode === 'encode' ? '🔐 Base64 Output' : '📝 Decoded Text'}
            </span>
            {output && (
              <button onClick={copyToClipboard} className="p-1 text-gray-400 hover:text-blue-500">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
          <pre className="w-full h-40 p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto whitespace-pre-wrap break-all">
            {output || <span className="text-gray-400">Result will appear here...</span>}
          </pre>
        </div>
      </div>

      {/* Stats */}
      {output && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-blue-500">{input.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Input Length</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-green-500">{output.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Output Length</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-purple-500">
              {mode === 'encode' ? Math.round((output.length / input.length - 1) * 100) : Math.round((1 - output.length / input.length) * 100)}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{mode === 'encode' ? 'Size Increase' : 'Size Decrease'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-orange-500">✓</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Valid</p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Base64 কি?</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Base64 হলো binary data কে ASCII text এ convert করার একটা encoding method। এটা সাধারণত images, files, 
          এবং data URLs এ ব্যবহার করা হয়। Email attachments এবং API data transfer এও Base64 ব্যবহৃত হয়।
        </p>
      </div>
    </div>
  );
}
