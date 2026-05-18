import React, { createContext, useContext, useState, useEffect } from 'react';

/* ── Types ─────────────────────────────────────────────────────── */
export interface AgentPackage {
  _id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  category: string;
  packageType: string;
  imageUrl1: string;
  imageUrl2: string;
  originalPrice: number;
  discountedPrice: number | null;
  isTrending: boolean;
  hasOffer: boolean;
  badges: string[];
  inclusions: string[];
  exclusions: string[];
}

export interface AgentProfile {
  _id: string;
  name: string;
  businessName: string;
  tagline: string;
  logo: string;
  theme: string;
  whatsapp: string;
  subdomain: string;
}

export interface SiteConfig {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  defaultWhatsappMessage: string;
  currency: string;
  timezone: string;
  topbarOffer: {
    text: string;
    ctaText: string;
    ctaLink: string;
    isActive: boolean;
  };
  cardOffer: {
    text: string;
    bgColor: string;
    isActive: boolean;
  };
}

export interface BannerData {
  _id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  position: number;
  bannerType: 'hero_slide' | 'promotional';
}

interface AgentContextType {
  subdomain: string | null;
  agent: AgentProfile | null;
  packages: AgentPackage[];
  siteConfig: SiteConfig | null;
  banners: BannerData[];
  isLoading: boolean;
  error: string | null;
  isTenantMode: boolean; // true = viewing as specific agent, false = default
}

/* ── Subdomain Detection ────────────────────────────────────────── */
function detectSubdomain(): string | null {
  const host = window.location.hostname; // e.g. "trigrowtech.localhost" or "trigrowtech.orbitle.in"

  // Local dev: trigrowtech.localhost
  if (host.endsWith('.localhost')) {
    const sub = host.replace(/\.localhost$/, '');
    // Ignore plain "localhost" with no subdomain
    if (sub && sub !== 'localhost') return sub;
  }

  // Production: trigrowtech.orbitle.in
  if (host.endsWith('.orbitle.in')) {
    const sub = host.replace(/\.orbitle\.in$/, '');
    if (sub && sub !== 'www' && sub !== 'agent' && sub !== 'api') return sub;
  }

  return null;
}

/* ── Context ────────────────────────────────────────────────────── */
const AgentContext = createContext<AgentContextType>({
  subdomain: null,
  agent: null,
  packages: [],
  siteConfig: null,
  banners: [],
  isLoading: false,
  error: null,
  isTenantMode: false,
});

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [subdomain] = useState<string | null>(detectSubdomain);
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [packages, setPackages] = useState<AgentPackage[]>([]);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subdomain) return; // No subdomain → default mode

    setIsLoading(true);

    // Fetch agent data + site config + banners in parallel
    Promise.all([
      fetch(`${API_BASE}/api/public/agent/${subdomain}`).then(r => r.json()),
      fetch(`${API_BASE}/api/public/site-config/${subdomain}`).then(r => r.json()).catch(() => ({ success: false })),
      fetch(`${API_BASE}/api/public/banners/${subdomain}`).then(r => r.json()).catch(() => ({ success: false })),
    ])
      .then(([agentData, configData, bannersData]) => {
        if (agentData.success) {
          setAgent(agentData.agent);
          setPackages(agentData.packages || []);
        } else {
          setError(agentData.message || 'Agent not found');
        }

        if (configData.success && configData.data) {
          setSiteConfig(configData.data);
        }

        if (bannersData.success && bannersData.data) {
          setBanners(bannersData.data);
        }
      })
      .catch(() => setError('Failed to connect to server'))
      .finally(() => setIsLoading(false));
  }, [subdomain]);

  return (
    <AgentContext.Provider value={{
      subdomain,
      agent,
      packages,
      siteConfig,
      banners,
      isLoading,
      error,
      isTenantMode: !!subdomain,
    }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  return useContext(AgentContext);
}

