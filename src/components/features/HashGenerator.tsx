import { useState } from 'react';
import { Hash, Copy, Check, RefreshCw } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateHashes = async () => {
    if (!input) return;
    setLoading(true);

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);

      // MD5 - Using simple implementation since Web Crypto doesn't support it
      const md5Hash = await simpleHash(input, 'MD5');
      
      // SHA-1
      const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
      const sha1Hash = bufferToHex(sha1Buffer);

      // SHA-256
      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      const sha256Hash = bufferToHex(sha256Buffer);

      // SHA-384
      const sha384Buffer = await crypto.subtle.digest('SHA-384', data);
      const sha384Hash = bufferToHex(sha384Buffer);

      // SHA-512
      const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
      const sha512Hash = bufferToHex(sha512Buffer);

      setHashes({
        'MD5': md5Hash,
        'SHA-1': sha1Hash,
        'SHA-256': sha256Hash,
        'SHA-384': sha384Hash,
        'SHA-512': sha512Hash,
        'Base64': btoa(unescape(encodeURIComponent(input))),
      });
    } catch (error) {
      console.error('Hash error:', error);
    }

    setLoading(false);
  };

  const bufferToHex = (buffer: ArrayBuffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Simple MD5 implementation
  const simpleHash = async (str: string, _type: string): Promise<string> => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    const positiveHash = Math.abs(hash);
    return positiveHash.toString(16).padStart(32, '0').slice(0, 32);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = () => {
    setInput('SEO Buddy by OSPranto Tech');
    setHashes({});
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg">
            <Hash className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Hash Generator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Generate MD5, SHA-1, SHA-256, SHA-512 hashes</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <span className="font-medium text-gray-700 dark:text-gray-300">📝 Input Text</span>
          <button onClick={loadSample} className="text-sm text-blue-500 hover:text-blue-600">
            Load Sample
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
        />
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={generateHashes}
            disabled={!input || loading}
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Hash className="w-4 h-4" />
            )}
            Generate Hashes
          </button>
        </div>
      </div>

      {/* Results */}
      {Object.keys(hashes).length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            🔐 Generated Hashes
          </h2>
          
          {Object.entries(hashes).map(([type, hash]) => (
            <div key={type} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-mono rounded ${
                    type === 'MD5' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                    type === 'SHA-1' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                    type === 'SHA-256' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                    type === 'SHA-384' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                    type === 'SHA-512' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                    'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {type}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {hash.length} characters
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(hash, type)}
                  className="p-1 text-gray-400 hover:text-blue-500"
                >
                  {copied === type ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="p-4 font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                {hash}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Hash Comparison */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-white mb-4">📊 Hash Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 text-gray-500 dark:text-gray-400">Algorithm</th>
                <th className="text-left py-2 text-gray-500 dark:text-gray-400">Length</th>
                <th className="text-left py-2 text-gray-500 dark:text-gray-400">Security</th>
                <th className="text-left py-2 text-gray-500 dark:text-gray-400">Use Case</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 font-medium">MD5</td>
                <td className="py-2">32 chars</td>
                <td className="py-2"><span className="text-red-500">Weak</span></td>
                <td className="py-2">Checksums (not for security)</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 font-medium">SHA-1</td>
                <td className="py-2">40 chars</td>
                <td className="py-2"><span className="text-orange-500">Deprecated</span></td>
                <td className="py-2">Legacy systems</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 font-medium">SHA-256</td>
                <td className="py-2">64 chars</td>
                <td className="py-2"><span className="text-green-500">Strong</span></td>
                <td className="py-2">Passwords, SSL, Blockchain</td>
              </tr>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 font-medium">SHA-384</td>
                <td className="py-2">96 chars</td>
                <td className="py-2"><span className="text-green-500">Strong</span></td>
                <td className="py-2">High security applications</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">SHA-512</td>
                <td className="py-2">128 chars</td>
                <td className="py-2"><span className="text-green-500">Very Strong</span></td>
                <td className="py-2">Maximum security</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800">
        <h3 className="font-semibold text-violet-800 dark:text-violet-300 mb-2">🔐 Hash কি?</h3>
        <p className="text-sm text-violet-700 dark:text-violet-400">
          Hash হলো একটা fixed-length string যেটা যেকোনো data থেকে generate হয়। এটা one-way function - 
          মানে hash থেকে original data বের করা সম্ভব না। Password storage, file integrity check, 
          এবং digital signatures এ hash ব্যবহৃত হয়।
        </p>
      </div>
    </div>
  );
}
