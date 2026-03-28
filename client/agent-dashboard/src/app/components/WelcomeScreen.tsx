import { Sparkles, Clock, Rocket } from 'lucide-react';
import orbitleLogo from "../../assets/orbitle-logo.png";

interface WelcomeScreenProps {
  isOpen: boolean;
  onStart: () => void;
}

export function WelcomeScreen({ isOpen, onStart }: WelcomeScreenProps) {
  if (!isOpen) return null;

  const businessName = 'Sara Travels';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 250,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(8px, 2vh, 16px)',
        background: 'linear-gradient(135deg, #0f1e35 0%, #1a3a5c 50%, #0f1e35 100%)',
      }}
    >
      {/* Background accents */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', top: -160, right: -160, background: 'radial-gradient(circle, rgba(37,99,168,0.18) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', bottom: -160, left: -160, background: 'radial-gradient(circle, rgba(59,130,196,0.12) 0%, transparent 70%)' }} />
      </div>

      {/* Card — no scroll, all content visible */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top accent bar */}
        <div style={{ height: 3, flexShrink: 0, background: 'linear-gradient(90deg, #1a2f4e, #2563a8, #3b82c4)' }} />

        <div style={{ padding: 'clamp(16px, 3.5vh, 28px) clamp(16px, 3vw, 28px)' }}>

          {/* Logo + badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(12px, 2vh, 20px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #1a2f4e, #2563a8)',
                boxShadow: '0 4px 12px rgba(37,99,168,0.35)',
                overflow: 'hidden',
              }}>
                <img src={orbitleLogo} alt="Orbitle" style={{ width: 26, height: 26, objectFit: 'contain' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px', color: '#1a2f4e' }}>Orbitle</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 999, background: '#eef4fb', color: '#2563a8', fontSize: 11, fontWeight: 600 }}>
              <Sparkles style={{ width: 12, height: 12 }} />
              Workspace Created
            </div>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 'clamp(8px, 1.5vh, 16px)' }}>
            <h1 style={{ fontSize: 'clamp(18px, 2.8vh, 24px)', fontWeight: 700, color: '#0f1e35', margin: '0 0 4px' }}>
              Welcome aboard! 🎉
            </h1>
            <p style={{ fontSize: 13, color: '#4b5563', margin: 0 }}>
              <span style={{ fontWeight: 600, color: '#2563a8' }}>{businessName}</span> workspace is ready to go.
            </p>
          </div>

          {/* Trial pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 999, background: '#eef4fb', color: '#1a3a5c', fontSize: 11, fontWeight: 500, marginBottom: 'clamp(10px, 2vh, 18px)' }}>
            <Clock style={{ width: 12, height: 12, color: '#2563a8' }} />
            7-day free trial has started
          </div>

          {/* Steps */}
          <div style={{ borderRadius: 14, padding: 'clamp(10px, 1.5vh, 14px)', background: '#f8fafc', border: '1px solid #e2e8f0', marginBottom: 'clamp(10px, 2vh, 18px)' }}>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', margin: '0 0 8px' }}>
              Setup checklist
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { icon: '🎨', label: 'Brand Setup', desc: 'Logo, colors & typography' },
                { icon: '📦', label: 'Add Package', desc: 'Your first travel offering' },
                { icon: '🚀', label: 'Go Live', desc: 'Publish your website' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 10, padding: '8px 12px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <span style={{ fontSize: 16, lineHeight: 1 }}>{step.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#1e293b', margin: 0 }}>{step.label}</p>
                    <p style={{ fontSize: 11, color: '#94a3b8', margin: 0 }}>{step.desc}</p>
                  </div>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time note */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 'clamp(10px, 2vh, 18px)', fontSize: 11, color: '#94a3b8' }}>
            <Clock style={{ width: 12, height: 12 }} />
            Takes only <strong style={{ color: '#4b5563' }}>5 minutes</strong> to complete
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 0', borderRadius: 12, fontWeight: 600, fontSize: 14, color: '#fff', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #1a2f4e 0%, #2563a8 100%)',
              boxShadow: '0 4px 14px rgba(37,99,168,0.35)',
              transition: 'opacity 0.15s, transform 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Rocket style={{ width: 15, height: 15 }} />
            Start Setup
          </button>

          <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', margin: '10px 0 0' }}>
            No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}