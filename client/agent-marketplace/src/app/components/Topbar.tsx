import { Phone, Mail } from 'lucide-react';
import { useAgent } from '../context/AgentContext';

export function Topbar() {
  const { siteConfig, isTenantMode } = useAgent();

  // Use branding contact info from siteConfig, not from agent auth profile
  const phone = siteConfig?.contactPhone || '+91 123 456 7890';
  const email = siteConfig?.contactEmail || 'info@travelmarket.com';

  // Topbar offer text & active status
  const topbarOffer = siteConfig?.topbarOffer;

  // If topbar offer is turned off (Inactive), hide the ENTIRE top bar strip completely!
  if (topbarOffer && topbarOffer.isActive === false) {
    return null;
  }

  const offerText = (topbarOffer?.text?.trim())
    ? topbarOffer.text
    : '⚡ Best Price Guarantee - Book Now!';

  return (
    <div className="bg-[var(--theme-primary)] text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-sm">
        {/* Left — Phone */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Phone className="w-4 h-4" />
          <a href={`tel:${phone}`} className="hover:opacity-80 transition-opacity hidden sm:inline">
            {phone}
          </a>
        </div>

        {/* Middle — Offer */}
        <div className="flex-1 flex items-center justify-center">
          {offerText && (
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="font-semibold text-xs sm:text-sm tracking-wide">{offerText}</span>
            </div>
          )}
        </div>

        {/* Right — Email */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${email}`} className="hover:opacity-80 transition-opacity hidden sm:inline">
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}