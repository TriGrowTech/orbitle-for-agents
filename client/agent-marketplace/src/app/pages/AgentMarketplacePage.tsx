import { useState } from 'react';
import { useAgent, type AgentPackage } from '../context/AgentContext';

/* ── Theme map ─────────────────────────────────────────────────── */
const THEMES: Record<string, { primary: string; gradient: string; accent: string }> = {
  navy:    { primary: '#1e3a8a', gradient: 'linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%)', accent: '#3b82f6' },
  red:     { primary: '#be123c', gradient: 'linear-gradient(135deg,#9f1239 0%,#e11d48 100%)', accent: '#f43f5e' },
  cyan:    { primary: '#0e7490', gradient: 'linear-gradient(135deg,#0e7490 0%,#06b6d4 100%)', accent: '#22d3ee' },
  default: { primary: '#7c3aed', gradient: 'linear-gradient(135deg,#5b21b6 0%,#7c3aed 100%)', accent: '#a78bfa' },
};

const BADGE_LABELS: Record<string, string> = {
  bestseller: '🏆 Bestseller', hot: '🔥 Hot Deal', new: '✨ New',
  limited: '⚡ Limited', premium: '💎 Premium', familyFriendly: '👨‍👩‍👧 Family',
};

const TYPE_EMOJI: Record<string, string> = {
  beach: '🏖️', mountain: '⛰️', pilgrimage: '🕌', honeymoon: '💑',
  adventure: '🧗', wildlife: '🦁', cultural: '🏛️', cruise: '🛳️',
  desert: '🏜️', city: '🌆', other: '✈️',
};

function formatPrice(n: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/* ── Package Card ────────────────────────────────────────────────── */
function PackageCard({ pkg, theme, agentWhatsapp }: {
  pkg: AgentPackage;
  theme: typeof THEMES[string];
  agentWhatsapp: string;
}) {
  const discount = pkg.discountedPrice && pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.discountedPrice) / pkg.originalPrice) * 100)
    : 0;

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in your package: "${pkg.title}" (${pkg.location}, ${pkg.duration}). Can you share more details?`
  );
  const whatsappLink = `https://wa.me/${agentWhatsapp?.replace(/\D/g, '')}?text=${whatsappMsg}`;

  return (
    <div
      className="pkg-card"
      style={{
        borderRadius: 20, overflow: 'hidden', background: '#fff',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        transition: 'transform 0.25s, box-shadow 0.25s',
        display: 'flex', flexDirection: 'column'
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 210, background: '#f1f5f9', overflow: 'hidden' }}>
        {pkg.imageUrl1 ? (
          <img src={pkg.imageUrl1} alt={pkg.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 64,
            background: 'linear-gradient(135deg,#f8fafc,#e2e8f0)'
          }}>
            {TYPE_EMOJI[pkg.packageType] || '✈️'}
          </div>
        )}
        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {pkg.isTrending && (
            <span style={{ background: 'linear-gradient(90deg,#f59e0b,#ef4444)', color: '#fff', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🔥 Trending</span>
          )}
          {pkg.badges?.slice(0, 2).map(b => (
            <span key={b} style={{ background: theme.primary, color: '#fff', borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{BADGE_LABELS[b] || b}</span>
          ))}
        </div>
        {discount > 0 && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: '#22c55e', color: '#fff', borderRadius: 999, padding: '4px 12px', fontSize: 12, fontWeight: 800 }}>
            -{discount}% OFF
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.55)', color: '#fff', borderRadius: 999, padding: '3px 10px', fontSize: 11, backdropFilter: 'blur(4px)' }}>
          {pkg.category === 'international' ? '🌍 International' : '🇮🇳 Domestic'}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>{pkg.title}</h3>
        <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
          <span>📍 {pkg.location}</span>
          <span>🕒 {pkg.duration}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: '#475569', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {pkg.description}
        </p>

        {pkg.inclusions?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {pkg.inclusions.slice(0, 3).map((inc, i) => (
              <span key={i} style={{ background: '#f0fdf4', color: '#16a34a', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>✓ {inc}</span>
            ))}
            {pkg.inclusions.length > 3 && (
              <span style={{ color: '#94a3b8', fontSize: 11 }}>+{pkg.inclusions.length - 3} more</span>
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div>
            {pkg.discountedPrice ? (
              <>
                <div style={{ fontSize: 20, fontWeight: 800, color: theme.primary }}>{formatPrice(pkg.discountedPrice)}</div>
                <div style={{ fontSize: 12, color: '#94a3b8', textDecoration: 'line-through' }}>{formatPrice(pkg.originalPrice)}</div>
              </>
            ) : (
              <div style={{ fontSize: 20, fontWeight: 800, color: theme.primary }}>{formatPrice(pkg.originalPrice)}</div>
            )}
            <div style={{ fontSize: 11, color: '#94a3b8' }}>per person</div>
          </div>
          {agentWhatsapp && (
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25d366', color: '#fff', borderRadius: 12, padding: '10px 16px', fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Enquire
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────────── */
export default function AgentMarketplacePage() {
  const { agent, packages, subdomain } = useAgent();
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');
  const [search, setSearch] = useState('');

  if (!agent) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56 }}>🔍</div>
          <h2 style={{ color: '#0f172a' }}>No agent found for "{subdomain}"</h2>
        </div>
      </div>
    );
  }

  const theme = THEMES[agent.theme] || THEMES.default;
  const displayName = agent.businessName || agent.name;
  const logoUrl = agent.logo && agent.logo !== 'no-photo.jpg'
    ? `${API_BASE}/uploads/${agent.logo}`
    : null;

  const whatsappLink = agent.whatsapp
    ? `https://wa.me/${agent.whatsapp.replace(/\D/g, '')}`
    : null;

  const filtered = packages.filter(p => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchSearch = !search
      || p.title.toLowerCase().includes(search.toLowerCase())
      || p.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
      <style>{`
        .pkg-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.14) !important; }
        .filter-btn { border: none; cursor: pointer; transition: all 0.2s; font-family: inherit; font-weight: 600; }
        @media (max-width: 640px) {
          .pkg-grid { grid-template-columns: 1fr !important; }
          .hero-pad { padding: 32px 16px !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ background: theme.gradient, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -40, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

        <div className="hero-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 48px', position: 'relative', zIndex: 1 }}>
          {/* Logo + Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.3)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {logoUrl
                ? <img src={logoUrl} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 32 }}>✈️</span>}
            </div>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>Official Travel Partner</div>
              <h1 style={{ margin: 0, fontSize: 30, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{displayName}</h1>
            </div>
          </div>

          {agent.tagline && (
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', maxWidth: 540, lineHeight: 1.6, margin: '0 0 28px' }}>
              {agent.tagline}
            </p>
          )}

          {/* Stats */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { val: packages.length, label: 'Packages' },
              { val: packages.filter(p => p.category === 'domestic').length, label: 'Domestic' },
              { val: packages.filter(p => p.category === 'international').length, label: 'International' },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '12px 20px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{s.label}</div>
              </div>
            ))}
            {whatsappLink && (
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                style={{ background: '#25d366', color: '#fff', borderRadius: 12, padding: '12px 20px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 32 }}>
          <input
            type="text"
            placeholder="🔍  Search by destination or package name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1 1 260px', padding: '12px 18px', borderRadius: 12, border: '1.5px solid #e2e8f0', fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            {(['all', 'domestic', 'international'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className="filter-btn"
                style={{ padding: '10px 18px', borderRadius: 10, fontSize: 13, background: filter === f ? theme.primary : '#fff', color: filter === f ? '#fff' : '#64748b', border: `1.5px solid ${filter === f ? theme.primary : '#e2e8f0'}`, boxShadow: filter === f ? `0 4px 14px ${theme.accent}55` : 'none' }}>
                {f === 'all' ? 'All' : f === 'domestic' ? '🇮🇳 Domestic' : '🌍 International'}
              </button>
            ))}
          </div>
        </div>

        <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 20 }}>
          Showing <strong style={{ color: '#0f172a' }}>{filtered.length}</strong> package{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#94a3b8' }}>
            <div style={{ fontSize: 56 }}>📦</div>
            <h3 style={{ marginTop: 16, color: '#475569' }}>No packages found</h3>
          </div>
        ) : (
          <div className="pkg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {filtered.map(pkg => (
              <PackageCard key={pkg._id} pkg={pkg} theme={theme} agentWhatsapp={agent.whatsapp} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', padding: 24, textAlign: 'center', background: '#fff', marginTop: 40 }}>
        <p style={{ margin: 0, fontSize: 13, color: '#94a3b8' }}>
          Powered by <a href="http://localhost:3000" style={{ color: theme.primary, fontWeight: 700, textDecoration: 'none' }}>Orbitle</a>
          {' '}· {displayName} © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
