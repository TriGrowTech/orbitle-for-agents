import { useState } from 'react';
import { Palette, Check } from 'lucide-react';

interface PredefinedTheme {
  id: string;
  name: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
}

const PREDEFINED_THEMES: PredefinedTheme[] = [
  {
    id: 'navy',
    name: 'Navy Blue',
    description: 'Professional, Trustworthy, Classic',
    colorPrimary: '#1e3a8a',
    colorSecondary: '#3b82f6',
  },
  {
    id: 'red',
    name: 'Bold Red',
    description: 'Energetic, Passionate, Striking',
    colorPrimary: '#b91c1c',
    colorSecondary: '#f87171',
  },
  {
    id: 'cyan',
    name: 'Fresh Cyan',
    description: 'Modern, Clean, Inviting',
    colorPrimary: '#0e7490',
    colorSecondary: '#06b6d4',
  },
];

export function ThemeManagement() {
  const [activeTheme, setActiveTheme] = useState<string>('navy');

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Palette className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Website Theme</h2>
          <p className="text-sm text-gray-600 mt-1">Choose the primary aesthetic for your travel website</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREDEFINED_THEMES.map((theme) => {
            const isActive = activeTheme === theme.id;
            
            return (
              <div 
                key={theme.id}
                className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  isActive ? 'border-blue-500 shadow-md ring-4 ring-blue-500/10' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Theme Preview Header */}
                <div 
                  className="h-24 p-4 flex items-end"
                  style={{ background: `linear-gradient(135deg, ${theme.colorPrimary}, ${theme.colorSecondary})` }}
                >
                  <p className="font-bold text-white text-lg drop-shadow-md">{theme.name}</p>
                </div>
                
                {/* Content & Toggle */}
                <div className="p-4 bg-white flex flex-col justify-between items-start gap-4 h-[100px]">
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{theme.description}</p>
                  
                  <div className="flex items-center justify-between w-full mt-auto">
                    <span className={`text-sm font-semibold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {isActive ? 'Active Theme' : 'Set Active'}
                    </span>
                    
                    {/* iOS style toggle */}
                    <button
                      onClick={() => setActiveTheme(theme.id)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isActive ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                      role="switch"
                      aria-checked={isActive}
                    >
                      <span className="sr-only">Make Active</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isActive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      >
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
