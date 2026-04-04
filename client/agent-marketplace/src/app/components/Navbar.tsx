import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { Menu, X, Sun, Moon, Palette, Heart, Gift, ChevronDown, MapPin, Globe, Home as HomeIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PlanTourModal } from './PlanTourModal';
import logo from "../../assets/tgt-logo.png";

const internationalDestinations = [
  'Maldives', 'Dubai', 'Thailand', 'Bali', 'Singapore',
  'Malaysia', 'Sri Lanka', 'Vietnam', 'Turkey', 'Greece',
  'Switzerland', 'Paris', 'London', 'Japan', 'Australia',
  'Africa', 'Mauritius', 'Egypt',
];

const domesticDestinations = [
  'Goa', 'Manali', 'Kashmir', 'Shimla', 'Jaipur',
  'Udaipur', 'Kerala', 'Ladakh', 'Rishikesh', 'Andaman',
  'Darjeeling', 'Meghalaya', 'Varanasi', 'Ooty', 'Coorg',
  'Hampi', 'Leh', 'Munnar',
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [showPlanTourModal, setShowPlanTourModal] = useState(false);
  const { mode, toggleMode, setThemeColor, allThemes, color } = useTheme();
  const destRef = useRef<HTMLDivElement>(null);
  const destTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close destinations dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestinations(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleDestEnter = () => {
    if (destTimeout.current) clearTimeout(destTimeout.current);
    setShowDestinations(true);
  };
  const handleDestLeave = () => {
    destTimeout.current = setTimeout(() => setShowDestinations(false), 200);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
           <div className="w-12 h-12 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
  <img
    src={logo}
    alt="TGT Logo"
    className="w-full h-full object-contain"
  />
</div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">TG Travels</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium">
              Home
            </Link>
            <a href="#packages" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium">
              Packages
            </a>

            {/* Destinations Dropdown */}
            <div
              ref={destRef}
              className="relative"
              onMouseEnter={handleDestEnter}
              onMouseLeave={handleDestLeave}
            >
              <button
                className="flex items-center gap-1 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium"
                onClick={() => setShowDestinations(!showDestinations)}
              >
                Destinations
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDestinations ? 'rotate-180' : ''}`} />
              </button>

              {showDestinations && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white dark:bg-gray-800 rounded-sm shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                    {/* International */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-lg flex items-center justify-center">
                          <Globe className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">International</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {internationalDestinations.map((dest) => (
                          <a
                            key={dest}
                            href="#packages"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                            onClick={() => setShowDestinations(false)}
                          >
                            <MapPin className="w-3 h-3 flex-shrink-0 opacity-40" />
                            {dest}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Domestic */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-lg flex items-center justify-center">
                          <HomeIcon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">Domestic</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {domesticDestinations.map((dest) => (
                          <a
                            key={dest}
                            href="#packages"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                            onClick={() => setShowDestinations(false)}
                          >
                            <MapPin className="w-3 h-3 flex-shrink-0 opacity-40" />
                            {dest}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#about" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium">
              About
            </a>
            <a href="#contact" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Action Buttons — Wishlist only */}
            

            {/* Theme Controls */}
            <button
              onClick={toggleMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {mode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Palette className="w-5 h-5" />
              </button>
              
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700">
                  {allThemes.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setThemeColor(theme.id);
                        setShowThemeMenu(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${color === theme.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                    >
                      <div className={`w-5 h-5 bg-gradient-to-br ${theme.swatchGradient} rounded-full shadow`}></div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">{theme.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowPlanTourModal(true)}
              className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              <Gift className="w-4 h-4" />
              Plan My Tour
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-2">
              <Link to="/" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">
                Home
              </Link>
              <a href="#packages" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">
                Packages
              </a>
              
              {/* Mobile Destinations Accordion */}
              <div>
                <button
                  onClick={() => setMobileDestOpen(!mobileDestOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                >
                  Destinations
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDestOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileDestOpen && (
                  <div className="mt-1 ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-3">
                    {/* International */}
                    <div>
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <Globe className="w-4 h-4 text-[var(--theme-primary)]" />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">International</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {internationalDestinations.map((dest) => (
                          <a
                            key={dest}
                            href="#packages"
                            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[var(--theme-primary)] rounded transition-colors"
                            onClick={() => { setIsOpen(false); setMobileDestOpen(false); }}
                          >
                            {dest}
                          </a>
                        ))}
                      </div>
                    </div>
                    {/* Domestic */}
                    <div>
                      <div className="flex items-center gap-2 px-2 py-1.5">
                        <HomeIcon className="w-4 h-4 text-[var(--theme-primary)]" />
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Domestic</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {domesticDestinations.map((dest) => (
                          <a
                            key={dest}
                            href="#packages"
                            className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-[var(--theme-primary)] rounded transition-colors"
                            onClick={() => { setIsOpen(false); setMobileDestOpen(false); }}
                          >
                            {dest}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a href="#about" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">
                About
              </a>
              <a href="#contact" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">
                Contact
              </a>
              <button
                onClick={() => setShowPlanTourModal(true)}
                className="mt-2 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                Plan My Tour
              </button>
            </div>
          </div>
        )}
      </div>
      <PlanTourModal
        isOpen={showPlanTourModal}
        onClose={() => setShowPlanTourModal(false)}
      />
    </nav>
  );
}