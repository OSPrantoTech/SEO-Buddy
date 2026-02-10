import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ProposalGenerator() {
  const [formData, setFormData] = useState({
    clientName: '',
    businessType: '',
    website: '',
    services: [] as string[],
    timeline: '3 months',
    budget: ''
  });
  const [proposal, setProposal] = useState('');
  const [copied, setCopied] = useState(false);

  const serviceOptions = [
    'Technical SEO Audit',
    'On-Page Optimization',
    'Keyword Research',
    'Content Strategy',
    'Link Building',
    'Local SEO',
    'Monthly Reporting',
    'Competitor Analysis'
  ];

  const toggleService = (service: string) => {
    if (formData.services.includes(service)) {
      setFormData({ ...formData, services: formData.services.filter(s => s !== service) });
    } else {
      setFormData({ ...formData, services: [...formData.services, service] });
    }
  };

  const generateProposal = () => {
    const text = `
═══════════════════════════════════════════════════════════════
                    SEO SERVICES PROPOSAL
═══════════════════════════════════════════════════════════════

Prepared for: ${formData.clientName || '[Client Name]'}
Business: ${formData.businessType || '[Business Type]'}
Website: ${formData.website || '[Website URL]'}
Date: ${new Date().toLocaleDateString()}

───────────────────────────────────────────────────────────────
                      EXECUTIVE SUMMARY
───────────────────────────────────────────────────────────────

Thank you for considering our SEO services. Based on our initial 
assessment, we've prepared a customized strategy to improve your 
online visibility and drive organic traffic to your website.

Our goal is to help ${formData.clientName || 'your business'} rank higher 
on search engines, attract more qualified leads, and increase conversions.

───────────────────────────────────────────────────────────────
                     PROPOSED SERVICES
───────────────────────────────────────────────────────────────

${formData.services.length > 0 ? formData.services.map((s, i) => `${i + 1}. ${s}`).join('\n') : '• No services selected yet'}

───────────────────────────────────────────────────────────────
                        TIMELINE
───────────────────────────────────────────────────────────────

Project Duration: ${formData.timeline}

Month 1: Technical Audit & Foundation
- Complete website audit
- Fix technical issues
- Keyword research

Month 2: On-Page Optimization
- Content optimization
- Meta tags implementation
- Internal linking structure

Month 3+: Growth & Monitoring
- Link building campaigns
- Content creation
- Performance tracking

───────────────────────────────────────────────────────────────
                       INVESTMENT
───────────────────────────────────────────────────────────────

${formData.budget ? `Proposed Budget: ${formData.budget}` : 'Budget: To be discussed'}

This includes:
✓ All selected services
✓ Monthly progress reports
✓ Regular strategy calls
✓ Dedicated support

───────────────────────────────────────────────────────────────
                      NEXT STEPS
───────────────────────────────────────────────────────────────

1. Review this proposal
2. Schedule a call to discuss details
3. Sign agreement and get started
4. Begin seeing results!

───────────────────────────────────────────────────────────────

Prepared by: SEO Buddy
Contact: OSPranto.Official@gmail.com
Website: seo-buddy.com

© ${new Date().getFullYear()} OSPranto Tech. All rights reserved.
═══════════════════════════════════════════════════════════════
`;
    setProposal(text);
  };

  const copyProposal = () => {
    navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          📄 Proposal Generator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Create professional SEO service proposals for clients
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 Proposal Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                placeholder="Acme Corporation"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Business Type</label>
              <input
                type="text"
                value={formData.businessType}
                onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                placeholder="E-commerce / SaaS / Local Business"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Services</label>
              <div className="grid grid-cols-2 gap-2">
                {serviceOptions.map(service => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`p-2 text-sm rounded-lg text-left ${
                      formData.services.includes(service)
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-2 border-blue-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent'
                    }`}
                  >
                    {formData.services.includes(service) ? '✓ ' : ''}{service}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timeline</label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="1 month">1 Month</option>
                  <option value="3 months">3 Months</option>
                  <option value="6 months">6 Months</option>
                  <option value="12 months">12 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Budget</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  placeholder="$500/month"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <Button onClick={generateProposal} className="w-full">
              📄 Generate Proposal
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📋 Generated Proposal</h2>
              {proposal && (
                <Button onClick={copyProposal} size="sm">
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </Button>
              )}
            </div>
            
            {proposal ? (
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-xs whitespace-pre-wrap max-h-[500px]">
                {proposal}
              </pre>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <span className="text-4xl">📄</span>
                <p className="mt-2">Fill in the details and generate your proposal</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
