import { Shield, Award, Headphones, CreditCard, Users, Globe, Clock, ThumbsUp, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAgent } from '../context/AgentContext';
import { useState, useEffect, useMemo } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const defaultIcons = [Shield, Award, Headphones, CreditCard, Users, Globe, Clock, ThumbsUp];

const defaultTrustReasons = [
  { icon: Shield, title: 'Secure Booking', description: '100% secure payment gateway with SSL encryption' },
  { icon: Award, title: 'Certified Agency', description: 'Government approved and ISO certified travel agency' },
  { icon: Headphones, title: '24/7 Support', description: 'Round the clock customer support for your convenience' },
  { icon: CreditCard, title: 'Best Price', description: 'Guaranteed lowest prices with price match promise' },
  { icon: Users, title: '50K+ Travelers', description: 'Trusted by over 50,000 happy travelers worldwide' },
  { icon: Globe, title: '500+ Destinations', description: 'Access to destinations across 100+ countries' },
  { icon: Clock, title: '15+ Years', description: 'Over 15 years of experience in travel industry' },
  { icon: ThumbsUp, title: '4.8 Rating', description: 'Excellent ratings on all major review platforms' },
];

export function WhyTrustUs() {
  const { layoutVariant, themeConfig } = useTheme();
  const { subdomain, isTenantMode } = useAgent();
  const [apiSections, setApiSections] = useState<any[] | null>(null);

  useEffect(() => {
    if (!isTenantMode || !subdomain) return;
    fetch(`${API_BASE}/api/public/content/${subdomain}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          const whyCards = data.data.filter((s: any) => s.sectionType === 'why_choose_us');
          if (whyCards.length > 0) setApiSections(whyCards);
        }
      })
      .catch(() => {});
  }, [subdomain, isTenantMode]);

  const trustReasons = useMemo(() => {
    if (apiSections && apiSections.length > 0) {
      return apiSections.map((s, i) => ({
        icon: defaultIcons[i % defaultIcons.length],
        title: s.title,
        description: s.content,
      }));
    }
    return defaultTrustReasons;
  }, [apiSections]);

  // Centered layout
  if (layoutVariant === 'centered') {
    return (
      <section id="about" className={`py-20 ${themeConfig.trustBgClass}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why <span className="text-transparent bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] bg-clip-text">Trust Us</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Your trusted partner for unforgettable travel experiences backed by excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[var(--theme-primary)] hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-full mb-4 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{reason.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Left-aligned layout
  if (layoutVariant === 'left-aligned') {
    return (
      <section id="about" className={`py-20 ${themeConfig.trustBgClass}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
              Why Choose <span className="text-transparent bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] bg-clip-text">Us</span>
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
              We don't just plan trips. We create memories that last a lifetime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trustReasons.map((reason, index) => {
              const Icon = reason.icon;
              const isHighlighted = index % 3 === 0;
              return (
                <div
                  key={index}
                  className={`group bg-gradient-to-br ${
                    isHighlighted 
                      ? 'from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white' 
                      : 'from-white to-gray-50 dark:from-gray-800 dark:to-gray-700'
                  } rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${
                    isHighlighted 
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)]'
                  } rounded-xl mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    isHighlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {reason.title}
                  </h3>
                  <p className={`text-sm ${
                    isHighlighted ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Split layout
  return (
    <section id="about" className={`py-20 ${themeConfig.trustBgClass}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
            Why <span className="text-transparent bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] bg-clip-text">Trust Us</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Excellence in every journey, commitment in every experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustReasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[var(--theme-primary)]"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{reason.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-16">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}