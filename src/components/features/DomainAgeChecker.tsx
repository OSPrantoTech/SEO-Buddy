import { useState } from 'react';
import { Card } from '../ui/Card';

interface DomainInfo {
  domain: string;
  age: number;
  created: string;
  expires: string;
  registrar: string;
  status: string;
  trustScore: number;
}

export function DomainAgeChecker() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DomainInfo | null>(null);

  const checkDomain = () => {
    if (!domain.trim()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
      
      // Generate realistic mock data
      const currentYear = new Date().getFullYear();
      const randomAge = Math.floor(Math.random() * 20) + 1;
      const createdYear = currentYear - randomAge;
      const createdDate = new Date(createdYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      const expiresDate = new Date(currentYear + Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      
      const registrars = ['GoDaddy', 'Namecheap', 'Google Domains', 'Cloudflare', 'Name.com', 'Hostinger'];
      
      setResult({
        domain: cleanDomain,
        age: randomAge,
        created: createdDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        expires: expiresDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        registrar: registrars[Math.floor(Math.random() * registrars.length)],
        status: 'Active',
        trustScore: Math.min(100, 40 + randomAge * 3 + Math.floor(Math.random() * 20)),
      });
      
      setLoading(false);
    }, 1500);
  };

  const getTrustColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getAgeBadge = (age: number) => {
    if (age >= 10) return { text: 'Established', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
    if (age >= 5) return { text: 'Mature', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' };
    if (age >= 2) return { text: 'Growing', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' };
    return { text: 'New', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-xl sm:text-2xl font-bold mb-2">📅 Domain Age Checker</h1>
        <p className="text-amber-100 text-sm sm:text-base">
          যেকোনো domain এর বয়স ও registration information দেখুন
        </p>
      </div>

      {/* Input Section */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkDomain()}
            placeholder="Enter domain (e.g., google.com)"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm sm:text-base focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <button
            onClick={checkDomain}
            disabled={loading || !domain.trim()}
            className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Checking...
              </>
            ) : (
              <>🔍 Check Domain</>
            )}
          </button>
        </div>
      </Card>

      {/* Results */}
      {result && (
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Main Info */}
          <Card className="p-4 sm:p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{result.domain}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${getAgeBadge(result.age).color}`}>
                {getAgeBadge(result.age).text} Domain
              </span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl font-bold text-amber-500 mb-2">{result.age}</div>
                <p className="text-gray-600 dark:text-gray-400">Years Old</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Created</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{result.created}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Expires</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{result.expires}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Registrar</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{result.registrar}</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">{result.status}</p>
              </div>
            </div>
          </Card>

          {/* Trust Score */}
          <Card className="p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">🛡️ Domain Trust Score</h3>
            
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${result.trustScore * 3.52} 352`}
                    className={getTrustColor(result.trustScore)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-3xl font-bold ${getTrustColor(result.trustScore)}`}>
                    {result.trustScore}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={`text-xl ${result.age >= 5 ? '✅' : '⚠️'}`}></span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Domain Age</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {result.age >= 5 ? 'Good - Established domain' : 'New domain - needs time to build trust'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Active Status</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Domain is currently active</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Valid Registration</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Registered with {result.registrar}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Why Domain Age Matters */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-4 sm:p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
          <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">📊 Domain Age কেন গুরুত্বপূর্ণ?</h3>
          <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
            <li>• <strong>Trust Factor:</strong> পুরাতন domains Google বেশি trust করে</li>
            <li>• <strong>SEO Advantage:</strong> Established domains rank করা সহজ</li>
            <li>• <strong>Backlink History:</strong> পুরাতন domains এর backlinks থাকে</li>
            <li>• <strong>Brand Recognition:</strong> বেশি সময় ধরে market এ আছে</li>
          </ul>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">💡 Tips for New Domains</h3>
          <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
            <li>• Quality content regularly publish করুন</li>
            <li>• Social media presence build করুন</li>
            <li>• White-hat backlinks তৈরি করুন</li>
            <li>• Google Search Console এ submit করুন</li>
            <li>• Patience রাখুন - trust সময় নেয়</li>
          </ul>
        </Card>
      </div>

      {/* Note */}
      <Card className="p-4 bg-gray-50 dark:bg-gray-800/50">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <strong>💡 Note:</strong> এটি simulated data। Real WHOIS data এর জন্য WHOIS API বা 
          <a href="https://who.is" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline ml-1">who.is</a> ব্যবহার করতে পারেন।
        </p>
      </Card>
    </div>
  );
}
