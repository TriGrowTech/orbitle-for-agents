import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import logo from "../../assets/tgt-logo.png";

export function Footer() {
  const { layoutVariant, themeConfig } = useTheme();

  const socialIconBaseClass = "w-10 h-10 rounded-full flex items-center justify-center transition-all";

  // Centered layout (Navy-style)
  if (layoutVariant === 'centered') {
    return (
      <footer id="contact" className={`${themeConfig.footerBgClass} text-gray-300`}>
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-lg flex items-center justify-center shadow-lg">
                  <img src={logo} alt="TGT Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-bold text-white">TG Travels</span>
              </div>
              <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                Your trusted partner for unforgettable travel experiences around the world. Creating memories that last a lifetime.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className={`${socialIconBaseClass} bg-white/5 hover:bg-gradient-to-br hover:from-[var(--theme-primary)] hover:to-[var(--theme-secondary)]`}>
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Home</Link></li>
                <li><a href="#packages" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Packages</a></li>
                <li><a href="#themes" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Themes</a></li>
                <li><a href="#about" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>About Us</a></li>
                <li><a href="#contact" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Our Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Domestic Tours</a></li>
                <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>International Tours</a></li>
                <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Honeymoon Packages</a></li>
                <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Corporate Travel</a></li>
                <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Visa Assistance</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-400">123 Travel Street, Andheri West, Mumbai - 400058, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0" />
                  <a href="tel:+911234567890" className={`text-sm ${themeConfig.footerAccentClass} transition-colors`}>+91 123 456 7890</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0" />
                  <a href="mailto:info@travelagent.com" className={`text-sm ${themeConfig.footerAccentClass} transition-colors`}>info@travelagent.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-center md:text-left text-gray-400">
                © 2026 TravelMarket. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Privacy Policy</a>
                <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Terms & Conditions</a>
                <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Refund Policy</a>
              </div>
            </div>
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500">
                Powered by <a href="https://orbitle.trigrowtech.in" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-accent)] hover:opacity-80 font-semibold transition-colors">Orbitle</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Left-aligned layout (Red-style)
  if (layoutVariant === 'left-aligned') {
    return (
      <footer id="contact" className={`relative ${themeConfig.footerBgClass} text-gray-300 overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--theme-primary)]/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-xl flex items-center justify-center shadow-lg">
                  <img src={logo} alt="TGT Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-black text-white">TG Travels</span>
              </div>
              <p className="text-base mb-6 text-gray-300 leading-relaxed max-w-md">
                Your trusted partner for unforgettable travel experiences around the world. Creating memories that last a lifetime.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-11 h-11 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] hover:opacity-90 rounded-xl flex items-center justify-center transition-all shadow-lg transform hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Home</Link></li>
                <li><a href="#packages" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Packages</a></li>
                <li><a href="#themes" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Themes</a></li>
                <li><a href="#about" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>About Us</a></li>
                <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Visa Assistance</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Get In Touch</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0 mt-1" />
                  <span className="text-sm">123 Travel Street, Mumbai - 400058</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0" />
                  <a href="tel:+911234567890" className={`text-sm ${themeConfig.footerAccentClass} transition-colors`}>+91 123 456 7890</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0" />
                  <a href="mailto:info@travelagent.com" className={`text-sm ${themeConfig.footerAccentClass} transition-colors`}>info@travelagent.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-center md:text-left">© 2026 TravelMarket. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Privacy</a>
                <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Terms</a>
                <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Refunds</a>
              </div>
            </div>
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-500">
                Powered by <a href="https://orbitle.trigrowtech.in" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-accent)] hover:opacity-80 font-semibold transition-colors">Orbitle</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Split layout (Cyan-style)
  return (
    <footer id="contact" className={`${themeConfig.footerBgClass} text-gray-300`}>
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-2xl flex items-center justify-center shadow-lg">
                <img src={logo} alt="TGT Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-white">TG Travels</span>
            </div>
            <p className="text-sm mb-6 text-gray-400 leading-relaxed">
              Your trusted partner for unforgettable travel experiences around the world.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className={`${socialIconBaseClass} bg-gray-800 hover:bg-gradient-to-br hover:from-[var(--theme-primary)] hover:to-[var(--theme-secondary)] rounded-2xl`}>
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Home</Link></li>
              <li><a href="#packages" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Packages</a></li>
              <li><a href="#themes" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Themes</a></li>
              <li><a href="#about" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>About Us</a></li>
              <li><a href="#contact" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Domestic Tours</a></li>
              <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>International Tours</a></li>
              <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Honeymoon Packages</a></li>
              <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Corporate Travel</a></li>
              <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Visa Assistance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-400">123 Travel Street, Mumbai - 400058, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0" />
                <a href="tel:+911234567890" className={`text-sm ${themeConfig.footerAccentClass} transition-colors`}>+91 123 456 7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0" />
                <a href="mailto:info@travelagent.com" className={`text-sm ${themeConfig.footerAccentClass} transition-colors`}>info@travelagent.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left text-gray-400">
              © 2026 TravelMarket. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Privacy Policy</a>
              <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Terms & Conditions</a>
              <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Refund Policy</a>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              Powered by <a href="https://orbitle.trigrowtech.in" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-accent)] hover:opacity-80 font-semibold transition-colors">Orbitle</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}