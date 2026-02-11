import { useState } from 'react';
import { Lock, Copy, Check, RefreshCw, Shield, Eye, EyeOff } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [history, setHistory] = useState<string[]>([]);

  const generatePassword = () => {
    let chars = '';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const ambiguous = 'Il1O0';

    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (excludeAmbiguous) {
      chars = chars.split('').filter(c => !ambiguous.includes(c)).join('');
    }

    if (chars.length === 0) {
      chars = lowercase;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setPassword(newPassword);
    setHistory(prev => [newPassword, ...prev.slice(0, 9)]);
  };

  const getStrength = () => {
    if (!password) return { level: 0, text: 'No password', color: 'gray' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (password.length >= 16) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { level: 1, text: 'Weak', color: 'red' };
    if (score <= 4) return { level: 2, text: 'Fair', color: 'orange' };
    if (score <= 5) return { level: 3, text: 'Good', color: 'yellow' };
    if (score <= 6) return { level: 4, text: 'Strong', color: 'green' };
    return { level: 5, text: 'Very Strong', color: 'emerald' };
  };

  const strength = getStrength();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthBars = () => {
    const colors = {
      red: 'bg-red-500',
      orange: 'bg-orange-500',
      yellow: 'bg-yellow-500',
      green: 'bg-green-500',
      emerald: 'bg-emerald-500',
      gray: 'bg-gray-300'
    };
    
    return Array(5).fill(0).map((_, i) => (
      <div
        key={i}
        className={`h-2 flex-1 rounded-full ${
          i < strength.level ? colors[strength.color as keyof typeof colors] : 'bg-gray-200 dark:bg-gray-700'
        }`}
      />
    ));
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">Password Generator</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Generate strong, secure passwords</p>
          </div>
        </div>
      </div>

      {/* Generated Password */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              readOnly
              placeholder="Click Generate to create password"
              className="w-full px-4 py-4 pr-24 font-mono text-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-white"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-400 hover:text-blue-500"
                disabled={!password}
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <button
            onClick={generatePassword}
            className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="hidden sm:inline">Generate</span>
          </button>
        </div>

        {/* Strength Indicator */}
        {password && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Password Strength</span>
              <span className={`text-sm font-medium text-${strength.color}-500`}>{strength.text}</span>
            </div>
            <div className="flex gap-1">
              {getStrengthBars()}
            </div>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" /> Password Options
        </h2>

        {/* Length Slider */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Password Length</label>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full font-mono text-sm">
              {length}
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>4</span>
            <span>16</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-5 h-5 text-blue-500 rounded"
            />
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Uppercase (A-Z)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-5 h-5 text-blue-500 rounded"
            />
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Lowercase (a-z)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">abcdefghijklmnopqrstuvwxyz</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-5 h-5 text-blue-500 rounded"
            />
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Numbers (0-9)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">0123456789</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-5 h-5 text-blue-500 rounded"
            />
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Symbols (!@#$%)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">!@#$%^&*()_+-=</p>
            </div>
          </label>
        </div>

        <label className="flex items-center gap-3 p-3 mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30">
          <input
            type="checkbox"
            checked={excludeAmbiguous}
            onChange={(e) => setExcludeAmbiguous(e.target.checked)}
            className="w-5 h-5 text-yellow-500 rounded"
          />
          <div>
            <p className="font-medium text-gray-800 dark:text-white">Exclude Ambiguous Characters</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Avoid confusing characters: I, l, 1, O, 0</p>
          </div>
        </label>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-4">🕐 Recent Passwords</h2>
          <div className="space-y-2">
            {history.map((pwd, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full text-xs text-gray-600 dark:text-gray-300">
                  {index + 1}
                </span>
                <code className="flex-1 font-mono text-sm text-gray-800 dark:text-gray-200 truncate">
                  {pwd}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(pwd);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="p-1 text-gray-400 hover:text-blue-500"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
        <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">💡 Password Tips</h3>
        <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
          <li>• Use at least 12 characters for better security</li>
          <li>• Include all character types (uppercase, lowercase, numbers, symbols)</li>
          <li>• Never reuse passwords across different accounts</li>
          <li>• Consider using a password manager</li>
        </ul>
      </div>
    </div>
  );
}
