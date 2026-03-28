import { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X, Sun, Moon, Palette, User, Heart, Gift, Type } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PlanTourModal } from './PlanTourModal';
import logo from "../../assets/tgt-logo.png";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showPlanTourModal, setShowPlanTourModal] = useState(false);
  const { mode, color, headingFont, bodyFont, toggleMode, setThemeColor, setHeadingFont, setBodyFont } = useTheme();

  const fonts = [
    { id: 'inter', name: 'Inter' },
    { id: 'roboto', name: 'Roboto' },
    { id: 'poppins', name: 'Poppins' },
    { id: 'lato', name: 'Lato' },
    { id: 'montserrat', name: 'Montserrat' },
    { id: 'work-sans', name: 'Work Sans' },
  ] as const;

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
            <a href="#themes" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium">
              Destinations
            </a>
            <a href="#about" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium">
              About
            </a>
            <a href="#contact" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all font-medium">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>

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
                  <button
                    onClick={() => {
                      setThemeColor('navy');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${color === 'navy' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-900 to-blue-600 rounded-full shadow"></div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Navy</span>
                  </button>
                  <button
                    onClick={() => {
                      setThemeColor('red');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${color === 'red' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-red-600 to-orange-500 rounded-full shadow"></div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Red</span>
                  </button>
                  <button
                    onClick={() => {
                      setThemeColor('cyan');
                      setShowThemeMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${color === 'cyan' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full shadow"></div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">Cyan</span>
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowFontMenu(!showFontMenu)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Type className="w-5 h-5" />
              </button>
              
              {showFontMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700">
                  {/* Heading Font Section */}
                  <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Heading Font</span>
                  </div>
                  {fonts.map((f) => (
                    <button
                      key={`heading-${f.id}`}
                      onClick={() => {
                        setHeadingFont(f.id);
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${headingFont === f.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                    >
                      <span className="text-gray-700 dark:text-gray-200 text-sm">{f.name}</span>
                      {headingFont === f.id && <span className="text-[var(--theme-primary)] text-xs">✓</span>}
                    </button>
                  ))}
                  
                  {/* Body Font Section */}
                  <div className="px-3 py-2 border-t border-b border-gray-200 dark:border-gray-700 mt-1">
                    <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Body Font</span>
                  </div>
                  {fonts.map((f) => (
                    <button
                      key={`body-${f.id}`}
                      onClick={() => {
                        setBodyFont(f.id);
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${bodyFont === f.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                    >
                      <span className="text-gray-700 dark:text-gray-200 text-sm">{f.name}</span>
                      {bodyFont === f.id && <span className="text-[var(--theme-primary)] text-xs">✓</span>}
                    </button>
                  ))}
                  
                  <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-1">
                    <button
                      onClick={() => setShowFontMenu(false)}
                      className="w-full text-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Close
                    </button>
                  </div>
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
              <a href="#themes" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-[var(--theme-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium">
                Destinations
              </a>
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