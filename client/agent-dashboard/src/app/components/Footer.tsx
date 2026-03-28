import { Mail } from 'lucide-react';
import { Link } from 'react-router';
import orbitleLogo from "../../assets/orbitle-logo.png";

export function Footer() {
  return (
    <footer className="mt-auto bg-white/80 backdrop-blur-sm border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <img src={orbitleLogo} alt="Orbitle" className="w-6 h-6" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Orbitle
            </span>
          </div>

          {/* Contact */}
          <a
            href="mailto:contact@orbitle.com"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>contact@orbitle.com</span>
          </a>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link to="/legal" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/legal" className="hover:text-blue-600 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
