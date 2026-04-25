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

interface AgentContextType {
  subdomain: string | null;
  agent: AgentProfile | null;
  packages: AgentPackage[];
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
  isLoading: false,
  error: null,
  isTenantMode: false,
});

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const [subdomain] = useState<string | null>(detectSubdomain);
  const [agent, setAgent] = useState<AgentProfile | null>(null);
  const [packages, setPackages] = useState<AgentPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!subdomain) return; // No subdomain → default mode

    setIsLoading(true);
    fetch(`${API_BASE}/api/public/agent/${subdomain}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAgent(data.agent);
          setPackages(data.packages || []);
        } else {
          setError(data.message || 'Agent not found');
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
