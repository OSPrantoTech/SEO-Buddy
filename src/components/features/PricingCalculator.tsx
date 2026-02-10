import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  unit: string;
  selected: boolean;
  quantity: number;
}

export function PricingCalculator() {
  const [services, setServices] = useState<Service[]>([
    { id: 'audit', name: 'Technical SEO Audit', description: 'Complete website analysis', basePrice: 200, unit: 'one-time', selected: false, quantity: 1 },
    { id: 'onpage', name: 'On-Page Optimization', description: 'Per page optimization', basePrice: 50, unit: 'per page', selected: false, quantity: 10 },
    { id: 'keyword', name: 'Keyword Research', description: 'In-depth keyword analysis', basePrice: 150, unit: 'one-time', selected: false, quantity: 1 },
    { id: 'content', name: 'Content Writing', description: 'SEO-optimized articles', basePrice: 100, unit: 'per article', selected: false, quantity: 4 },
    { id: 'linkbuilding', name: 'Link Building', description: 'Quality backlink acquisition', basePrice: 300, unit: 'per month', selected: false, quantity: 1 },
    { id: 'local', name: 'Local SEO Setup', description: 'Google Business Profile optimization', basePrice: 250, unit: 'one-time', selected: false, quantity: 1 },
    { id: 'reporting', name: 'Monthly Reporting', description: 'Detailed progress reports', basePrice: 100, unit: 'per month', selected: false, quantity: 1 },
    { id: 'competitor', name: 'Competitor Analysis', description: 'Competitive landscape review', basePrice: 175, unit: 'one-time', selected: false, quantity: 1 },
  ]);

  const [discount, setDiscount] = useState(0);
  const [copied, setCopied] = useState(false);

  const toggleService = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    ));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, quantity: Math.max(1, quantity) } : s
    ));
  };

  const selectedServices = services.filter(s => s.selected);
  const subtotal = selectedServices.reduce((sum, s) => sum + (s.basePrice * s.quantity), 0);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  const generateQuote = () => {
    let quote = `SEO Services Quote\n`;
    quote += `Date: ${new Date().toLocaleDateString()}\n\n`;
    quote += `Services:\n`;
    quote += `─────────────────────────────\n`;
    selectedServices.forEach(s => {
      quote += `${s.name} (x${s.quantity}): $${(s.basePrice * s.quantity).toLocaleString()}\n`;
    });
    quote += `─────────────────────────────\n`;
    quote += `Subtotal: $${subtotal.toLocaleString()}\n`;
    if (discount > 0) {
      quote += `Discount (${discount}%): -$${discountAmount.toLocaleString()}\n`;
    }
    quote += `─────────────────────────────\n`;
    quote += `Total: $${total.toLocaleString()}\n\n`;
    quote += `Prepared by SEO Buddy | OSPranto Tech`;
    
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          💰 Pricing Calculator
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Calculate SEO service pricing for your clients
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📋 Select Services</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map(service => (
              <Card 
                key={service.id}
                className={`p-4 cursor-pointer transition-all ${
                  service.selected 
                    ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => toggleService(service.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded border flex items-center justify-center ${
                        service.selected ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'
                      }`}>
                        {service.selected && '✓'}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 ml-7">{service.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">${service.basePrice}</div>
                    <div className="text-xs text-gray-500">{service.unit}</div>
                  </div>
                </div>

                {service.selected && service.unit !== 'one-time' && (
                  <div className="mt-3 ml-7 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <label className="text-sm text-gray-600 dark:text-gray-400">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={service.quantity}
                      onChange={(e) => updateQuantity(service.id, parseInt(e.target.value) || 1)}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <span className="text-sm text-gray-500">= ${(service.basePrice * service.quantity).toLocaleString()}</span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <Card className="p-4 sm:p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 Quote Summary</h2>
            
            {selectedServices.length > 0 ? (
              <>
                <div className="space-y-2 mb-4">
                  {selectedServices.map(s => (
                    <div key={s.id} className="flex justify-between text-sm">
                      <span className="text-gray-700 dark:text-gray-300">
                        {s.name} {s.unit !== 'one-time' && `(x${s.quantity})`}
                      </span>
                      <span className="font-medium">${(s.basePrice * s.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 dark:text-gray-400">Discount:</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discount}
                      onChange={(e) => setDiscount(Math.min(100, parseInt(e.target.value) || 0))}
                      className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <span className="text-sm text-gray-500">%</span>
                    {discount > 0 && (
                      <span className="text-sm text-green-600">-${discountAmount.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-blue-600">${total.toLocaleString()}</span>
                  </div>
                </div>

                <Button onClick={generateQuote} className="w-full mt-4">
                  {copied ? '✅ Copied!' : '📋 Copy Quote'}
                </Button>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <span className="text-4xl">📦</span>
                <p className="mt-2">Select services to calculate pricing</p>
              </div>
            )}
          </Card>

          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">💡 Pricing Tips</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Offer package discounts (10-20%)</li>
              <li>• Consider project complexity</li>
              <li>• Include revision rounds</li>
              <li>• Add rush fees for urgent work</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
