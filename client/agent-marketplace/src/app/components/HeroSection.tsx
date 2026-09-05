import { Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAgent } from '../context/AgentContext';
import { useState, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export function HeroSection() {
  const { themeConfig, layoutVariant } = useTheme();
  const { banners, siteConfig, isTenantMode } = useAgent();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const titleText = siteConfig?.heroTitle?.trim() || 'Book India & International Holiday Tour Packages';
  const subtitleText = siteConfig?.heroSubtitle?.trim() || 'Explore the world with our curated travel experiences';

  // Use hero slides from API if available, otherwise use theme defaults
  const heroSlides = isTenantMode
    ? banners.filter(b => b.bannerType === 'hero_slide').map(b => `${API_BASE}/uploads/banners/${b.imageUrl}`)
    : [];
  const images = heroSlides.length > 0 ? heroSlides : themeConfig.heroImages;

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ── Centered Layout (Navy) ────────────────────────────
  if (layoutVariant === 'centered') {
    return (
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        {/* Carousel Background Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className={`absolute inset-0 ${themeConfig.heroOverlayClass}`}></div>
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 leading-tight tracking-tight">
            {titleText}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            {subtitleText}
          </p>

          {/* Fine-Tuned Glassmorphism Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="group flex items-center bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 transition-all duration-300 hover:bg-white/20 focus-within:bg-white/20 focus-within:border-white/40 focus-within:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3 flex-1 pl-6 pr-4 py-2">
                <Search className="w-5 h-5 text-white/90 flex-shrink-0 group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Search destinations, packages..."
                  className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/70 text-base lg:text-lg font-medium"
                />
              </div>
              <button className="bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white font-bold px-8 py-3.5 hover:shadow-lg hover:scale-[1.02] transition-all mr-2 my-2 rounded-full text-sm uppercase tracking-wider relative overflow-hidden group/btn">
                <span className="relative z-10">Search</span>
                <div className="absolute inset-0 bg-white/20 group-hover/btn:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12"></div>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Left-Aligned Layout (Red) ─────────────────────────
  if (layoutVariant === 'left-aligned') {
    return (
      <section className="relative h-[700px] flex items-end overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className={`absolute inset-0 ${themeConfig.heroOverlayClass}`}></div>
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20 w-full">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] rounded-full shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-semibold tracking-wider uppercase">Experience the Soul of</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight">
              {titleText}
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-10 leading-relaxed font-light">
              {subtitleText}
            </p>

            {/* Fine-Tuned Glassmorphism Search Bar */}
            <div className="max-w-xl">
              <div className="group flex items-center bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 transition-all duration-300 hover:bg-white/20 focus-within:bg-white/20 focus-within:border-white/40 focus-within:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
                <div className="flex items-center gap-3 flex-1 pl-6 pr-4 py-2">
                  <Search className="w-5 h-5 text-white/90 flex-shrink-0 group-focus-within:text-white transition-colors" />
                  <input
                    type="text"
                    placeholder="Search destinations, packages..."
                    className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/70 text-base lg:text-lg font-medium"
                  />
                </div>
                <button className="bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white font-bold px-8 py-3.5 hover:shadow-lg hover:scale-[1.02] transition-all mr-2 my-2 rounded-full text-sm uppercase tracking-wider relative overflow-hidden group/btn">
                  <span className="relative z-10">Search</span>
                  <div className="absolute inset-0 bg-white/20 group-hover/btn:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Split Layout (Cyan) ───────────────────────────────
  return (
    <section className="relative h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-cyan-900/20">
      <div
        className="absolute top-0 right-0 w-3/5 h-full bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
      >
        <div className={`absolute inset-0 ${themeConfig.heroOverlayClass}`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight">
            {titleText}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {subtitleText}
          </p>

          {/* Fine-Tuned Glassmorphism Search Bar */}
          <div className="max-w-lg">
            <div className="group flex items-center bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/60 dark:border-white/10 transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-900/60 focus-within:bg-white/60 dark:focus-within:bg-gray-900/60 focus-within:border-[var(--theme-primary)]/50 focus-within:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
              <div className="flex items-center gap-3 flex-1 pl-6 pr-4 py-2">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 group-focus-within:text-[var(--theme-primary)] transition-colors" />
                <input
                  type="text"
                  placeholder="Search destinations, packages..."
                  className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 text-base lg:text-lg font-medium"
                />
              </div>
              <button className="bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white font-bold px-8 py-3.5 hover:shadow-lg hover:scale-[1.02] transition-all mr-2 my-2 rounded-full text-sm uppercase tracking-wider relative overflow-hidden group/btn">
                <span className="relative z-10">Search</span>
                <div className="absolute inset-0 bg-white/20 group-hover/btn:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}