import { useState } from 'react';
import { Key, Copy, Check, AlertTriangle, Clock, User, Shield } from 'lucide-react';

interface JwtPayload {
  [key: string]: unknown;
  exp?: number;
  iat?: number;
  nbf?: number;
  sub?: string;
  iss?: string;
  aud?: string;
}

interface JwtHeader {
  alg?: string;
  typ?: string;
  [key: string]: unknown;
}

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState<JwtHeader | null>(null);
  const [payload, setPayload] = useState<JwtPayload | null>(null);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const decodeJwt = () => {
    try {
      const parts = token.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. JWT must have 3 parts separated by dots.');
      }

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));
      
      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setSignature(parts[2]);
      setError('');
    } catch (e) {
      setError((e as Error).message);
      setHeader(null);
      setPayload(null);
      setSignature('');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const isExpired = () => {
    if (!payload?.exp) return false;
    return Date.now() > payload.exp * 1000;
  };

  const getTimeRemaining = () => {
    if (!payload?.exp) return null;
    const diff = payload.exp * 1000 - Date.now();
    if (diff < 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadSample = () => {
    // Sample JWT (not a real secret)
    setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik9iYWlkYSBTaWRkcXVlIFByYW50byIsImVtYWlsIjoiT1NQcmFudG8uT2ZmaWNpYWxAZ21haWwuY29tIiwiY29tcGFueSI6Ik9TUHJhbnRvIFRlY2giLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDUzMDAwMDAsImV4cCI6MTczNjgzNjAwMH0.fake_signature_for_demo');
    setHeader(null);
    setPayload(null);
    setSignature('');
    setError('');
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-amber-500 to-red-500 rounded-lg">
            <Key className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">JWT Decoder</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Decode and inspect JSON Web Tokens</p>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <span className="font-medium text-gray-700 dark:text-gray-300">🔐 Paste JWT Token</span>
          <button onClick={loadSample} className="text-sm text-blue-500 hover:text-blue-600">
            Load Sample
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          className="w-full h-32 p-4 font-mono text-sm bg-transparent text-gray-800 dark:text-gray-200 resize-none focus:outline-none"
        />
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={decodeJwt}
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            🔓 Decode Token
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Decoded Results */}
      {header && payload && (
        <div className="space-y-4">
          {/* Token Status */}
          <div className={`p-4 rounded-xl border flex items-center justify-between ${
            isExpired() 
              ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800' 
              : 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800'
          }`}>
            <div className="flex items-center gap-3">
              <Clock className={`w-5 h-5 ${isExpired() ? 'text-red-500' : 'text-green-500'}`} />
              <div>
                <p className={`font-medium ${isExpired() ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                  {isExpired() ? '❌ Token Expired' : '✅ Token Valid'}
                </p>
                {getTimeRemaining() && (
                  <p className={`text-sm ${isExpired() ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500'}`}>
                    {getTimeRemaining()}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right text-sm">
              <p className="text-gray-500 dark:text-gray-400">Algorithm</p>
              <p className="font-mono font-medium text-gray-800 dark:text-white">{header.alg}</p>
            </div>
          </div>

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-red-50 dark:bg-red-900/30 border-b border-red-200 dark:border-red-800">
              <span className="font-medium text-red-700 dark:text-red-400 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Header
              </span>
              <button
                onClick={() => copyToClipboard(JSON.stringify(header, null, 2), 'header')}
                className="p-1 text-gray-400 hover:text-blue-500"
              >
                {copied === 'header' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto">
              {JSON.stringify(header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-purple-50 dark:bg-purple-900/30 border-b border-purple-200 dark:border-purple-800">
              <span className="font-medium text-purple-700 dark:text-purple-400 flex items-center gap-2">
                <User className="w-4 h-4" /> Payload
              </span>
              <button
                onClick={() => copyToClipboard(JSON.stringify(payload, null, 2), 'payload')}
                className="p-1 text-gray-400 hover:text-blue-500"
              >
                {copied === 'payload' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="p-4 font-mono text-sm text-gray-800 dark:text-gray-200 overflow-auto">
              {JSON.stringify(payload, null, 2)}
            </pre>
          </div>

          {/* Payload Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">📋 Token Claims</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {payload.sub && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Subject (sub)</p>
                  <p className="font-mono text-gray-800 dark:text-white">{payload.sub}</p>
                </div>
              )}
              {payload.iss && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Issuer (iss)</p>
                  <p className="font-mono text-gray-800 dark:text-white">{payload.iss}</p>
                </div>
              )}
              {payload.iat && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Issued At (iat)</p>
                  <p className="font-mono text-gray-800 dark:text-white">{formatDate(payload.iat)}</p>
                </div>
              )}
              {payload.exp && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Expires (exp)</p>
                  <p className="font-mono text-gray-800 dark:text-white">{formatDate(payload.exp)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Signature */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800">
              <span className="font-medium text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <Key className="w-4 h-4" /> Signature
              </span>
              <button
                onClick={() => copyToClipboard(signature, 'signature')}
                className="p-1 text-gray-400 hover:text-blue-500"
              >
                {copied === 'signature' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="p-4 font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
              {signature}
            </p>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">🔐 JWT কি?</h3>
        <p className="text-sm text-amber-700 dark:text-amber-400">
          JSON Web Token (JWT) হলো একটি secure way information transmit করার জন্য। এটা ৩ parts এ বিভক্ত: 
          Header (algorithm info), Payload (data), এবং Signature (verification)। Authentication এবং 
          authorization এ JWT অনেক ব্যবহৃত হয়।
        </p>
      </div>
    </div>
  );
}
