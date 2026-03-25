import { Phone, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function Topbar() {
  const { color } = useTheme();

  return (
    <div className="bg-[var(--theme-primary)] text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-sm">
        {/* Left - Phone */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Phone className="w-4 h-4" />
          <a href="tel:+911234567890" className="hover:opacity-80 transition-opacity hidden sm:inline">
            +91 123 456 7890
          </a>
        </div>
        
        {/* Middle - Offer */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="font-semibold text-xs sm:text-sm tracking-wide">⚡ Best Price Guarantee - Book Now!</span>
          </div>
        </div>
        
        {/* Right - Email */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Mail className="w-4 h-4" />
          <a href="mailto:info@travelmarket.com" className="hover:opacity-80 transition-opacity hidden sm:inline">
            info@travelmarket.com
          </a>
        </div>
      </div>
    </div>
  );
}