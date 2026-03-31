import { useState } from 'react';
import { Upload, Palette } from 'lucide-react';

interface BrandSetupProps {
  onNext: () => void;
  onSkip: () => void;
  brandData?: any;
  setBrandData?: any;
}

export function BrandSetup({ onNext, onSkip, brandData, setBrandData }: BrandSetupProps) {
  const [whatsapp, setWhatsapp] = useState('');

  const themes = [
    { id: 'navy', name: 'Navy', color: '#1e3a8a' },
    { id: 'red', name: 'Red', color: '#b91c1c' },
    { id: 'cyan', name: 'Cyan', color: '#0e7490' },
  ];

  const currentThemeColor = themes.find(t => t.id === brandData?.theme)?.color || '#1e3a8a';

  return (

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's set up your brand 🎨</h2>
          <p className="text-gray-600">This will make your website uniquely yours</p>
        </div>

        {/* Logo upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Logo
          </label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm">
                Choose File
              </button>
              <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            value={brandData?.name || ''}
            onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
            placeholder="e.g., Sara Travels"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Brand Theme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website Theme
          </label>
          <div className="flex gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setBrandData({ ...brandData, theme: theme.id })}
                className={`flex-1 py-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${brandData?.theme === theme.id
                    ? 'border-gray-900 shadow-md ring-2 ring-gray-900/20'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: theme.color }}></div>
                <span className="text-sm font-semibold text-gray-700">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Tagline
          </label>
          <input
            type="text"
            value={brandData?.tagline || ''}
            onChange={(e) => setBrandData({ ...brandData, tagline: e.target.value })}
            placeholder="e.g., Creating Memories, One Journey at a Time"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="e.g., +91 98765 43210"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">Customers will contact you on this number</p>
        </div>
      </div>

      {/* Live Preview Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs font-semibold text-gray-600">LIVE PREVIEW</span>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Simulated website header */}
          <div
            className="p-6 text-white transition-all duration-300"
            style={{ backgroundColor: currentThemeColor }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{brandData?.name || 'Your Business Name'}</h3>
                  {brandData?.tagline && <p className="text-sm text-white/80">{brandData.tagline}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Discover Amazing Destinations</h1>
              <p className="text-white/90">Plan your perfect getaway with us</p>
            </div>
          </div>

          {/* Simulated content */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-32 animate-pulse"></div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          {/* WhatsApp button preview */}
          {whatsapp && (
            <div className="px-6 pb-6">
              <button
                className="w-full py-3 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ backgroundColor: currentThemeColor }}
              >
                📱 WhatsApp: {whatsapp}
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>✨ Live Preview:</strong> Your website updates in real-time as you make changes!
          </p>
        </div>
      </div>
    </div>
  );
}
