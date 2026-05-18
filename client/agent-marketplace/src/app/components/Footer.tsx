import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import { useAgent } from '../context/AgentContext';
import logo from "../../assets/tgt-logo.png";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function Footer() {
  const { layoutVariant, themeConfig } = useTheme();
  const { agent, siteConfig, isTenantMode } = useAgent();

  // Dynamic values — prefer siteConfig branding over agent profile
  const displayName   = isTenantMode ? (siteConfig?.companyName || (agent ? (agent.businessName || agent.name) : '')) : 'TG Travels';
  const tagline       = isTenantMode && agent?.tagline ? agent.tagline : 'Your trusted partner for unforgettable travel experiences around the world. Creating memories that last a lifetime.';
  const phone         = siteConfig?.contactPhone || '';
  const email         = siteConfig?.contactEmail || '';
  const address       = siteConfig?.address || '';
  const facebookHref  = siteConfig?.facebookUrl  || '#';
  const instagramHref = siteConfig?.instagramUrl || '#';
  const year          = new Date().getFullYear();
  const agentLogoUrl  = isTenantMode && agent?.logo && agent.logo !== 'no-photo.jpg'
    ? `${API_BASE}/uploads/${agent.logo}`
    : null;

  const socialIconBaseClass = "w-10 h-10 rounded-full flex items-center justify-center transition-all";

  /** Shared sub-components to avoid triple repetition */
  const LogoBlock = ({ size = 'sm' }: { size?: 'sm' | 'lg' }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className={`${size === 'lg' ? 'w-14 h-14' : 'w-12 h-12'} bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-xl flex items-center justify-center shadow-lg overflow-hidden`}>
        {agentLogoUrl
          ? <img src={agentLogoUrl} alt={displayName} className="w-full h-full object-cover" />
          : <img src={logo} alt="Logo" className="w-full h-full object-contain" />}
      </div>
      <span className={`${size === 'lg' ? 'text-2xl font-black' : 'text-2xl font-bold'} text-white`}>{displayName}</span>
    </div>
  );

  const ContactBlock = () => (
    <ul className="space-y-3">
      {phone && (
        <li className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0" />
          <a href={`tel:${phone}`} className={`text-sm ${themeConfig.footerAccentClass} transition-colors`}>{phone}</a>
        </li>
      )}
      {email && (
        <li className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0" />
          <a href={`mailto:${email}`} className={`text-sm ${themeConfig.footerAccentClass} transition-colors`}>{email}</a>
        </li>
      )}
      {address && (
        <li className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[var(--theme-accent)] flex-shrink-0 mt-0.5" />
          <span className="text-sm text-gray-400 leading-snug">{address}</span>
        </li>
      )}
      {!phone && !email && !address && (
        <li className="text-sm text-gray-500 italic">Contact details not set</li>
      )}
    </ul>
  );

  const BottomBar = ({ borderClass = 'border-white/10' }: { borderClass?: string }) => (
    <div className={`border-t ${borderClass} pt-8`}>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left text-gray-400">
          © {year} {displayName}. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Privacy Policy</a>
          <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Terms &amp; Conditions</a>
          <a href="#" className={`${themeConfig.footerAccentClass} transition-colors`}>Refund Policy</a>
        </div>
      </div>
      <div className="text-center mt-6 pt-6 border-t border-white/10">
        <p className="text-xs text-gray-500">
          Powered by <a href="https://orbitle.trigrowtech.in" target="_blank" rel="noopener noreferrer" className="text-[var(--theme-accent)] hover:opacity-80 font-semibold transition-colors">Orbitle</a>
        </p>
      </div>
    </div>
  );

  // ── Centered layout (Navy-style) ──────────────────────────────
  if (layoutVariant === 'centered') {
    return (
      <footer id="contact" className={`${themeConfig.footerBgClass} text-gray-300`}>
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            <div>
              <LogoBlock />
              <p className="text-sm mb-6 text-gray-400 leading-relaxed">{tagline}</p>
              <div className="flex gap-3">
                <a href={facebookHref} target={facebookHref !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className={`${socialIconBaseClass} bg-white/5 hover:bg-gradient-to-br hover:from-[var(--theme-primary)] hover:to-[var(--theme-secondary)]`}>
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={instagramHref} target={instagramHref !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className={`${socialIconBaseClass} bg-white/5 hover:bg-gradient-to-br hover:from-[var(--theme-primary)] hover:to-[var(--theme-secondary)]`}>
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Home</Link></li>
                <li><a href="#packages" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Packages</a></li>
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
              <ContactBlock />
            </div>
          </div>
          <BottomBar />
        </div>
      </footer>
    );
  }

  // ── Left-aligned layout (Red-style) ──────────────────────────
  if (layoutVariant === 'left-aligned') {
    return (
      <footer id="contact" className={`relative ${themeConfig.footerBgClass} text-gray-300 overflow-hidden`}>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[var(--theme-primary)]/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <LogoBlock size="lg" />
              <p className="text-base mb-6 text-gray-300 leading-relaxed max-w-md">{tagline}</p>
              <div className="flex gap-4">
                <a href={facebookHref} target={facebookHref !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className="w-11 h-11 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] hover:opacity-90 rounded-xl flex items-center justify-center transition-all shadow-lg transform hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={instagramHref} target={instagramHref !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className="w-11 h-11 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] hover:opacity-90 rounded-xl flex items-center justify-center transition-all shadow-lg transform hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Home</Link></li>
                <li><a href="#packages" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Packages</a></li>
                <li><a href="#about" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>About Us</a></li>
                <li><a href="#" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Visa Assistance</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Get In Touch</h3>
              <ContactBlock />
            </div>
          </div>
          <BottomBar />
        </div>
      </footer>
    );
  }

  // ── Split layout (Cyan-style / default) ──────────────────────
  return (
    <footer id="contact" className={`${themeConfig.footerBgClass} text-gray-300`}>
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <LogoBlock />
            <p className="text-sm mb-6 text-gray-400 leading-relaxed">{tagline}</p>
            <div className="flex gap-3">
              <a href={facebookHref} target={facebookHref !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className={`${socialIconBaseClass} bg-gray-800 hover:bg-gradient-to-br hover:from-[var(--theme-primary)] hover:to-[var(--theme-secondary)] rounded-2xl`}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href={instagramHref} target={instagramHref !== '#' ? '_blank' : undefined} rel="noopener noreferrer" className={`${socialIconBaseClass} bg-gray-800 hover:bg-gradient-to-br hover:from-[var(--theme-primary)] hover:to-[var(--theme-secondary)] rounded-2xl`}>
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Home</Link></li>
              <li><a href="#packages" className={`${themeConfig.footerAccentClass} transition-colors text-sm`}>Packages</a></li>
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
            <ContactBlock />
          </div>
        </div>
        <BottomBar borderClass="border-gray-800" />
      </div>
    </footer>
  );
}