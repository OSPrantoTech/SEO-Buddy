import { useState } from 'react';
import { FileJson, Copy, Check, Trash2, Download, Minimize2, Maximize2 } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indentSize));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setOutput('');
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError('');
      alert('✅ Valid JSON!');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([output || input], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    const sample = {
      "name": "SEO Buddy",
      "version": "1.0.0",
      "description": "A powerful SEO tool",
      "author": {
        "name": "Obaida Siddque Pranto",
        "company": "OSPranto Tech",
        "email": "OSPranto.Official@gmail.com"
      },
      "features": ["SEO Checker", "AI Generator", "Keywords"],
      "settings": {
        "theme": "dark",
        "language": "en",
        "notifications": true
      }
    };
    setInput(JSON.stringify(sample));
    setOutput('');
    setError('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
            <FileJson className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">JSON Formatter & Validator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Format, validate, and beautify JSON</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-3 items-center">
          <button onClick={formatJson} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2">
            <Maximize2 className="w-4 h-4" /> Format
          </button>
          <button onClick={minifyJson} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2">
            <Minimize2 className="w-4 h-4" /> Minify
          </button>
          <button onClick={validateJson} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            ✓ Validate
          </button>
          <button onClick={loadSample} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            📋 Sample
          </button>
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-sm text-gray-600 dark:text-gray-400">Indent:</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          <p className="font-medium">❌ JSON Error:</p>
          <p className="text-sm font-mono mt-1">{error}</p>
        </div>
      )}

      {/* Editor */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">📥 Input JSON</span>
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
            placeholder='Paste your JSON here...\n\n{"key": "value"}'
            className="w-full h-80 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
          />
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <span className="font-medium text-gray-700 dark:text-gray-300">📤 Output</span>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="p-1 text-gray-400 hover:text-blue-500">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button onClick={downloadJson} className="p-1 text-gray-400 hover:text-green-500">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <pre className="w-full h-80 p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto">
            {output || <span className="text-gray-400">Formatted JSON will appear here...</span>}
          </pre>
        </div>
      </div>

      {/* Stats */}
      {output && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-blue-500">{output.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Characters</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-green-500">{output.split('\n').length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Lines</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-purple-500">{(new Blob([output]).size / 1024).toFixed(2)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Size (KB)</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-2xl font-bold text-orange-500">✓</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Valid JSON</p>
          </div>
        </div>
      )}
    </div>
  );
}
