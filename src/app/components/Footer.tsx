import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { useTheme } from '../context/ThemeContext';
import logo from "../../assets/tgt-logo.png";

export function Footer() {
  const { color } = useTheme();

  // Navy: Classic elegant footer with subtle gradient
  if (color === 'navy') {
    return (
      <footer id="contact" className="bg-gradient-to-b from-gray-900 to-blue-950 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                  <img src={logo} alt="TGT Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-bold text-white">TG Travels</span>
              </div>
              <p className="text-sm mb-6 text-gray-400 leading-relaxed">
                Your trusted partner for unforgettable travel experiences around the world. Creating memories that last a lifetime.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-blue-900/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 rounded-full flex items-center justify-center transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-900/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 rounded-full flex items-center justify-center transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-900/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 rounded-full flex items-center justify-center transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-900/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 rounded-full flex items-center justify-center transition-all">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="hover:text-blue-400 transition-colors text-sm">Home</Link></li>
                <li><a href="#packages" className="hover:text-blue-400 transition-colors text-sm">Packages</a></li>
                <li><a href="#themes" className="hover:text-blue-400 transition-colors text-sm">Themes</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors text-sm">About Us</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Our Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Domestic Tours</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">International Tours</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Honeymoon Packages</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Corporate Travel</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors text-sm">Visa Assistance</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                  <span className="text-sm text-gray-400">123 Travel Street, Andheri West, Mumbai - 400058, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a href="tel:+911234567890" className="text-sm hover:text-blue-400 transition-colors">+91 123 456 7890</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a href="mailto:info@travelagent.com" className="text-sm hover:text-blue-400 transition-colors">info@travelagent.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-900/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-center md:text-left text-gray-400">
                © 2026 TravelMarket. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Terms & Conditions</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Refund Policy</a>
              </div>
            </div>
            <div className="text-center mt-6 pt-6 border-t border-blue-900/50">
              <p className="text-xs text-gray-500">
                Powered by <a href="https://orbitle.trigrowtech.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Orbitle</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Red: Bold footer with diagonal elements
  if (color === 'red') {
    return (
      <footer id="contact" className="relative bg-gradient-to-br from-gray-900 via-red-950 to-black text-gray-300 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-600/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <img src={logo} alt="TGT Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-2xl font-black text-white">TG Travels</span>
              </div>
              <p className="text-base mb-6 text-gray-300 leading-relaxed max-w-md">
                Your trusted partner for unforgettable travel experiences around the world. Creating memories that last a lifetime.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-11 h-11 bg-gradient-to-br from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-red-500/50 transform hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-11 h-11 bg-gradient-to-br from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-red-500/50 transform hover:scale-110">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-11 h-11 bg-gradient-to-br from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-red-500/50 transform hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-11 h-11 bg-gradient-to-br from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-red-500/50 transform hover:scale-110">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links & Services Combined */}
            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Navigation</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-orange-400 transition-colors text-sm">Home</Link></li>
                <li><a href="#packages" className="hover:text-orange-400 transition-colors text-sm">Packages</a></li>
                <li><a href="#themes" className="hover:text-orange-400 transition-colors text-sm">Themes</a></li>
                <li><a href="#about" className="hover:text-orange-400 transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors text-sm">Visa Assistance</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Get In Touch</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                  <span className="text-sm">123 Travel Street, Mumbai - 400058</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <a href="tel:+911234567890" className="text-sm hover:text-orange-400 transition-colors">+91 123 456 7890</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  <a href="mailto:info@travelagent.com" className="text-sm hover:text-orange-400 transition-colors">info@travelagent.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-red-900/30 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-center md:text-left">
                © 2026 TravelMarket. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-orange-400 transition-colors">Refunds</a>
              </div>
            </div>
            <div className="text-center mt-6 pt-6 border-t border-red-900/30">
              <p className="text-xs text-gray-500">
                Powered by <a href="https://orbitle.trigrowtech.in" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">Orbitle</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  // Cyan: Modern clean footer with card-like sections
  return (
    <footer id="contact" className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <img src={logo} alt="TGT Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold text-white">TG Travels</span>
            </div>
            <p className="text-sm mb-6 text-gray-400 leading-relaxed">
              Your trusted partner for unforgettable travel experiences around the world.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-500 rounded-2xl flex items-center justify-center transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-500 rounded-2xl flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-500 rounded-2xl flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-500 rounded-2xl flex items-center justify-center transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors text-sm">Home</Link></li>
              <li><a href="#packages" className="hover:text-cyan-400 transition-colors text-sm">Packages</a></li>
              <li><a href="#themes" className="hover:text-cyan-400 transition-colors text-sm">Themes</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors text-sm">About Us</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Domestic Tours</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">International Tours</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Honeymoon Packages</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Corporate Travel</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors text-sm">Visa Assistance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-400">123 Travel Street, Mumbai - 400058, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-sm hover:text-cyan-400 transition-colors">+91 123 456 7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <a href="mailto:info@travelagent.com" className="text-sm hover:text-cyan-400 transition-colors">info@travelagent.com</a>
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
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Refund Policy</a>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-xs text-gray-500">
              Powered by <a href="https://orbitle.trigrowtech.in" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Orbitle</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}