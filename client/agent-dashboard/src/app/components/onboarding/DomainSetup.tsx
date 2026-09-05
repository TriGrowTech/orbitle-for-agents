import { useState, useEffect } from 'react';
import { Globe, Check, AlertCircle, Gift, Loader2 } from 'lucide-react';
import { useCheckSubdomainQuery } from '../../api/authApi';

interface DomainSetupProps {
  onNext: () => void;
  onSkip: () => void;
  brandData?: any;
  setBrandData?: any;
  errors?: Record<string, string>;
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function DomainSetup({ onNext, onSkip, brandData, setBrandData, errors = {}, setErrors }: DomainSetupProps) {

  const [debouncedSubdomain, setDebouncedSubdomain] = useState(brandData?.subdomain || '');

  // Debounce the input by 500ms before checking API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSubdomain(brandData?.subdomain || '');
    }, 500);
    return () => clearTimeout(handler);
  }, [brandData?.subdomain]);

  const { data: checkData, isFetching } = useCheckSubdomainQuery(debouncedSubdomain, {
    skip: debouncedSubdomain.length < 3,
  });

  // Calculate live dynamic error
  const isTaken = checkData?.success && checkData?.isAvailable === false;
  const isAvailable = checkData?.success && checkData?.isAvailable === true;

  // We should intercept OnboardingWizard validations directly 
  // by passing back a "logoError" style field or just directly updating `errors` object.
  // Actually, we can just block visually, since Wizard might still submit. 
  // It's best if we just show the visual error for now. Wizard's "validate" handles the rest.

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
                value={brandData?.subdomain || ''}
                onChange={(e) => {
                  const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                  setBrandData({...brandData, subdomain: val});
                  if (errors.subdomain) {
                    setErrors?.(prev => {
                      const updated = { ...prev };
                      delete updated.subdomain;
                      return updated;
                    });
                  }
                }}
                placeholder="saratravels"
                className={`flex-1 px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold ${
                  (errors.subdomain || isTaken) ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              <span className="text-gray-600 font-semibold">.${(import.meta as any).env.VITE_MARKETPLACE_DOMAIN || 'localhost:5174'}</span>
            </div>
            
            {/* Status checking / Errors */}
            <div className="mt-2 min-h-[20px]">
              {isFetching ? (
                <p className="flex items-center gap-1 text-blue-600 text-xs mt-2 font-medium">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking availability...
                </p>
              ) : isTaken ? (
                <p className="flex items-center gap-1 text-red-600 text-xs mt-2 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> This url is already taken. Please try another one.
                </p>
              ) : isAvailable && debouncedSubdomain.length >= 3 && !errors.subdomain ? (
                <p className="flex items-center gap-1 text-green-600 text-xs mt-2 font-medium">
                  <Check className="w-3.5 h-3.5" /> This domain is available!
                </p>
              ) : errors.subdomain ? (
                <p className="flex items-center gap-1 text-red-600 text-xs mt-2 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.subdomain}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-2">
                  Example: If your business is "Sara Travels", use "saratravels"
                </p>
              )}
            </div>
          </div>

          {brandData?.subdomain && !errors.subdomain && !isTaken && (
            <div className="animate-fadeIn mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Live Website Preview</h4>
              <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white">
                {/* Browser Header */}
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto bg-white rounded-md px-3 py-1 text-xs text-center text-gray-500 shadow-sm border border-gray-200 w-2/3 truncate">
                    https://{brandData.subdomain}.${(import.meta as any).env.VITE_MARKETPLACE_DOMAIN || 'localhost:5174'}
                  </div>
                </div>
                {/* Iframe Preview */}
                <div className="bg-gray-50 w-full h-[350px] relative">
                  <iframe 
                    title="Website Preview"
                    srcDoc={'<html><head><style>body { font-family: system-ui, sans-serif; margin: 0; padding: 0; background: #f8fafc; color: #333; } .hero { background: ' + (brandData?.theme === 'red' ? 'linear-gradient(135deg, #7f1d1d, #b91c1c)' : brandData?.theme === 'cyan' ? 'linear-gradient(135deg, #164e63, #0e7490)' : 'linear-gradient(135deg, #1e3a8a, #3b82f6)') + '; color: white; padding: 60px 20px; text-align: center; } .nav { padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; background: white; box-shadow: 0 1px 2px rgba(0,0,0,0.05); } .nav .logo { font-weight: bold; font-size: 18px; color: ' + (brandData?.theme === 'red' ? '#b91c1c' : brandData?.theme === 'cyan' ? '#0e7490' : '#1e3a8a') + '; display: flex; align-items: center; gap: 8px; } .nav .logo span { display: inline-block; width: 24px; height: 24px; background: currentColor; border-radius: 4px; opacity: 0.1; } .hero h1 { margin: 0; font-size: 28px; line-height: 1.2; } .hero p { margin: 10px 0 0; opacity: 0.9; font-size: 16px; } .content { padding: 30px 20px; text-align: center; } .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 600px; margin: 0 auto; } .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); } .card-img { height: 100px; background: #e2e8f0; border-radius: 6px; margin-bottom: 12px; } .btn { display: inline-block; margin-top: 20px; padding: 10px 20px; background: white; color: #111; border-radius: 20px; font-weight: bold; text-decoration: none; font-size: 14px; } </style></head><body><div class="nav"><div class="logo"><span></span> ' + (brandData?.name || 'Your Brand') + '</div><div style="font-size: 14px; color: #666;">Home &nbsp;&nbsp; Packages</div></div><div class="hero"><h1>Explore the World with ' + (brandData?.name || 'Us') + '</h1><p>' + (brandData?.tagline || 'Your Next Adventure Awaits') + '</p><a href="#" class="btn">View Tour Packages</a></div><div class="content"><h2 style="margin: 0 0 20px;">Top Destinations</h2><div class="grid"><div class="card"><div class="card-img"></div><h4 style="margin: 0;">Dubai Special</h4><p style="margin: 5px 0 0; font-size: 12px; color: #666;">5 Days / 4 Nights</p></div><div class="card"><div class="card-img"></div><h4 style="margin: 0;">Bali Escape</h4><p style="margin: 5px 0 0; font-size: 12px; color: #666;">6 Days / 5 Nights</p></div></div></div></body></html>'}
                    className="w-full h-full border-none"
                  />
                  <div className="absolute inset-0 border border-gray-900/5 pointer-events-none rounded-b-xl"></div>
                </div>
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