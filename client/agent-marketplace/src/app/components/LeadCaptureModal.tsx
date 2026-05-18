import { useState, useEffect, useRef } from 'react';
import { Phone, X, ChevronDown, BadgeCheck, Loader2 } from 'lucide-react';
import { useAgent } from '../context/AgentContext';
import { toast } from 'sonner';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AVATARS = [
  { initials: 'RS', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  { initials: 'PM', bg: 'bg-violet-100',  text: 'text-violet-700'  },
  { initials: 'AK', bg: 'bg-orange-100',  text: 'text-orange-700'  },
  { initials: 'DV', bg: 'bg-blue-100',    text: 'text-blue-700'    },
];

const STATS = [
  { value: '₹0',     label: 'Consultation' },
  { value: '< 2 hrs', label: 'Callback'    },
  { value: '4.9 ★',  label: 'Rating'       },
];

export function LeadCaptureModal() {
  const { subdomain, isTenantMode } = useAgent();
  const [isOpen,      setIsOpen]      = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData,    setFormData]    = useState({ name: '', phone: '' });
  const nameRef = useRef<HTMLInputElement>(null);

  // Only show in tenant mode (a real agent's marketplace)
  useEffect(() => {
    if (!isTenantMode) return;
    const hasSeenModal = sessionStorage.getItem('leadCaptureShown');
    if (!hasSeenModal) {
      const timer = setTimeout(() => setIsOpen(true), 7000);
      return () => clearTimeout(timer);
    }
  }, [isTenantMode]);

  useEffect(() => {
    if (isOpen) setTimeout(() => nameRef.current?.focus(), 300);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('leadCaptureShown', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subdomain) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/public/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain,
          name: formData.name,
          phone: formData.phone,
          source: 'popup',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          handleClose();
          setSubmitted(false);
          setFormData({ name: '', phone: '' });
        }, 2800);
      } else {
        toast.error(data.message || 'Failed to submit. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:px-4 sm:py-6 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Card */}
      <div className="w-full sm:max-w-[420px] bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300">

        {/* ── Hero strip ──────────────────────────────── */}
        <div
          className="relative px-5 pt-5 pb-0 overflow-hidden"
          style={{ background: 'var(--theme-gradient)' }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-6 left-4 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
          >
            <X size={13} />
          </button>

          {/* Live badge */}
          <div className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 rounded-full px-2.5 py-1 text-white text-[10px] font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse inline-block" />
            24 specialists available now
          </div>

          {/* Headline */}
          <h2 className="text-white font-bold text-lg leading-snug mb-1">
            Your dream trip is one call away.
          </h2>
          <p className="text-white/75 text-xs leading-relaxed mb-0">
            Drop your number — we'll handle flights, stays &amp; everything in between.
          </p>

          {/* Stats strip */}
          <div className="flex mt-3 border-t border-white/20">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex-1 text-center py-2 ${i !== 0 ? 'border-l border-white/20' : ''}`}
              >
                <p className="text-white font-semibold text-sm leading-none">{s.value}</p>
                <p className="text-white/60 text-[9px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Form body ───────────────────────────────── */}
        <div className="px-5 pt-4 pb-5 bg-white dark:bg-gray-900">

          {submitted ? (
            /* Success state */
            <div className="text-center py-4 animate-in zoom-in-90 duration-300">
              <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                <BadgeCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="font-semibold text-gray-900 dark:text-white text-sm">You're all set!</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                A specialist will call you within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Name */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Your name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Arjun Sharma"
                  required
                  className="w-full h-10 px-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  style={{ '--tw-ring-color': 'var(--theme-primary)' } as React.CSSProperties}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                  Mobile number
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1 h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs whitespace-nowrap"
                  >
                    <span className="text-sm">🇮🇳</span>
                    +91
                    <ChevronDown size={11} />
                  </button>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    required
                    className="flex-1 min-w-0 h-10 px-3 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': 'var(--theme-primary)' } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 flex items-center justify-center gap-2 text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-70"
                style={{ background: 'var(--theme-gradient)' }}
              >
                {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Phone size={14} />}
                {isSubmitting ? 'Sending...' : 'Get a free callback'}
              </button>

              {/* Social proof */}
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-3 py-2.5">
                {/* Stacked avatars */}
                <div className="flex flex-shrink-0">
                  {AVATARS.map((av, i) => (
                    <div
                      key={av.initials}
                      className={`w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-[8px] font-bold ${av.bg} ${av.text} ${i !== 0 ? '-ml-1.5' : ''}`}
                      style={{ zIndex: AVATARS.length - i, position: 'relative' }}
                    >
                      {av.initials}
                    </div>
                  ))}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 leading-tight">
                    1,200+ trips planned this month
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">
                    "Best experience ever." — Priya M.
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}