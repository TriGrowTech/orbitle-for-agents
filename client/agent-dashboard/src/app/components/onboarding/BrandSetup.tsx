import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

interface BrandSetupProps {
  onNext: () => void;
  onSkip: () => void;
  brandData?: any;
  setBrandData?: any;
  errors?: Record<string, string>;
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

export function BrandSetup({ brandData, setBrandData, errors = {}, setErrors }: BrandSetupProps) {
  const themes = [
    { id: 'navy', name: 'Navy Blue', color: '#1e3a8a' },
    { id: 'red', name: 'Deep Red', color: '#b91c1c' },
    { id: 'cyan', name: 'Ocean Teal', color: '#0e7490' },
  ];
  const currentThemeColor = themes.find(t => t.id === brandData?.theme)?.color || '#1e3a8a';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {

      setBrandData({ ...brandData, logoFile: null, logoError: 'Logo must be smaller than 2MB.' });
      return;
    }
    setBrandData({ ...brandData, logoFile: file, logoError: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Let's set up your brand 🎨</h2>
          <p className="text-gray-500 text-sm mt-1">This information will appear on your website</p>
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={brandData?.name || ''}
            onChange={e => {
              setBrandData({ ...brandData, name: e.target.value });
              if (errors.name) {
                setErrors?.(prev => {
                  const updated = { ...prev };
                  delete updated.name;
                  return updated;
                });
              }
            }}
            placeholder="e.g., Sara Travels"
            className={`w-full px-4 py-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-red-600 text-xs mt-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
            </p>
          )}
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Business Tagline</label>
          <input
            type="text"
            value={brandData?.tagline || ''}
            onChange={e => setBrandData({ ...brandData, tagline: e.target.value })}
            placeholder="e.g., Creating Memories, One Journey at a Time"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number</label>
          <input
            type="tel"
            value={brandData?.whatsapp || ''}
            onChange={e => setBrandData({ ...brandData, whatsapp: e.target.value })}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-400 mt-1">Customers will contact you on this number</p>
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Logo</label>
          <div className="flex items-center gap-4">
            <div className={`w-20 h-20 border-2 border-dashed rounded-xl flex items-center justify-center bg-gray-50 overflow-hidden transition-all ${
              brandData?.logoError ? 'border-red-400' : brandData?.logoFile ? 'border-green-400' : 'border-gray-300'
            }`}>
              {brandData?.logoFile ? (
                <img src={URL.createObjectURL(brandData.logoFile)} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <Upload className="w-7 h-7 text-gray-400" />
              )}
            </div>
            <div>
              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm cursor-pointer inline-block transition-colors">
                {brandData?.logoFile ? 'Change Logo' : 'Choose File'}
                <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />
              </label>
              {brandData?.logoFile && !brandData?.logoError && (
                <p className="flex items-center gap-1 text-green-600 text-xs mt-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Logo uploaded
                </p>
              )}
              {brandData?.logoError && (
                <p className="flex items-center gap-1 text-red-600 text-xs mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {brandData.logoError}
                </p>
              )}
              {!brandData?.logoFile && !brandData?.logoError && (
                <p className="text-xs text-gray-400 mt-1.5">PNG, JPG, WebP · Max 2MB</p>
              )}
            </div>
          </div>
        </div>


        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Website Colour Theme</label>
          <div className="flex gap-3">
            {themes.map(theme => (
              <button
                key={theme.id}
                type="button"
                onClick={() => setBrandData({ ...brandData, theme: theme.id })}
                className={`flex-1 py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  brandData?.theme === theme.id
                    ? 'border-gray-900 shadow ring-2 ring-gray-900/10'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="w-7 h-7 rounded-full shadow-sm" style={{ backgroundColor: theme.color }} />
                <span className="text-xs font-semibold text-gray-700">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>


      <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-gray-500 tracking-widest">LIVE PREVIEW</span>
        </div>
        <div className="bg-white rounded-xl shadow overflow-hidden flex-1">

          <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden" style={{ backgroundColor: currentThemeColor }}>
                {brandData?.logoFile ? (
                  <img src={URL.createObjectURL(brandData.logoFile)} alt="" className="w-full h-full object-contain" />
                ) : (
                  <span className="text-white text-xs font-bold">
                    {(brandData?.name || 'B')[0].toUpperCase()}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm text-gray-900">{brandData?.name || 'Your Brand'}</span>
            </div>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>Home</span><span>Packages</span><span>Contact</span>
            </div>
          </div>


          <div className="p-8 text-white transition-colors duration-500" style={{ backgroundColor: currentThemeColor }}>
            <p className="text-xs uppercase tracking-widest text-white/70 mb-2">Welcome to</p>
            <h1 className="text-2xl font-bold leading-tight">{brandData?.name || 'Your Business Name'}</h1>
            <p className="text-white/80 text-sm mt-1">{brandData?.tagline || 'Your tagline will appear here'}</p>
            {brandData?.whatsapp && (
              <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-sm">
                📱 {brandData.whatsapp}
              </div>
            )}
          </div>


          <div className="p-5 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map(i => <div key={i} className="h-20 bg-gray-100 rounded-lg" />)}
            </div>
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
