import { useState } from 'react';
import { Globe, Check, AlertCircle, Gift } from 'lucide-react';

interface DomainSetupProps {
  onNext: () => void;
  onSkip: () => void;
}

export function DomainSetup({ onNext, onSkip }: DomainSetupProps) {
  const [domainName, setDomainName] = useState('');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set up your website domain 🌐</h2>
        <p className="text-gray-600">Your professional website address</p>
      </div>

      {/* Free domain gift */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">🎉 Free Domain Included!</h3>
            <p className="text-sm text-gray-700 mb-3">
              Get a <strong>free professional domain for 1 year</strong> with 6 Months, Annual, and Lifetime plans
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span><strong>6 Months Plan:</strong> 1 year free domain + website</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span><strong>Annual Plan:</strong> 1 year free domain + website</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span><strong>Lifetime Plan:</strong> 1 year free domain + website forever</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              *After 1 year, domain renewal charges apply (₹800-1200/year) for all plans
            </p>
          </div>
        </div>
      </div>

      {/* Domain input */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-gray-900">Enter Your Preferred Domain Name</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain Name (without www)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="saratravels"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-semibold"
              />
              <span className="text-lg text-gray-600 font-semibold">.com</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Example: If your business is "Sara Travels", use "saratravels.com"
            </p>
          </div>

          {domainName && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fadeIn">
              <p className="text-sm font-semibold text-blue-900 mb-2">Your domain will be:</p>
              <div className="px-4 py-3 bg-white rounded-lg border border-blue-200">
                <p className="text-xl font-bold text-blue-600">www.{domainName}.com</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <h4 className="font-semibold text-purple-900 mb-2 text-sm">During Trial Period</h4>
          <p className="text-xs text-purple-700">
            Preview your website using temporary link. Domain activates after subscription.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h4 className="font-semibold text-green-900 mb-2 text-sm">After Subscription</h4>
          <p className="text-xs text-green-700">
            Your custom domain goes live within 24-48 hours. We'll handle everything!
          </p>
        </div>
      </div>

      {/* DNS setup note */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">No Technical Setup Needed!</p>
            <p className="text-sm text-gray-600">
              We'll register and configure your domain. Just enter your preferred name and we'll handle the rest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}