import { Link } from 'react-router';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const DEALS = [
  {
    id: '1',
    tag: 'Limited Offer',
    headline: 'Buy 1 Get 1 FREE!',
    subtitle: 'Maldives Water Villa Escape',
    price: 89999,
    image: 'https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=800&q=80',
  },
  // carousel slides (top-right)
  {
    id: '2',
    tag: 'Bestseller',
    headline: 'Dubai Extravaganza',
    subtitle: 'A Glittering City Retreat for Summer!',
    price: 54999,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&q=80',
  },
  {
    id: '3',
    tag: '28% Off',
    headline: 'Thailand Explorer',
    subtitle: 'Bangkok & Phuket — 6 Days / 5 Nights',
    price: 42999,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
  },
  {
    id: '4',
    tag: 'Trending',
    headline: 'Bali Bliss',
    subtitle: 'Tropical escape with beach resort & spa',
    price: 35999,
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1400&q=80',
  },
  {
    id: '5',
    tag: 'Exclusive',
    headline: 'Sri Lanka Discovery',
    subtitle: 'A Beautiful Island Retreat for Summer!',
    price: 38999,
    image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?w=1400&q=80',
  },
  // bento row 2
  {
    id: '6',
    tag: 'Trending',
    headline: 'Char Dham Yatra',
    subtitle: 'Embark on a Journey of Faith',
    price: 34999,
    image: 'https://images.unsplash.com/photo-1609075820678-498d8e65b9d4?w=1200&q=80',
  },
  {
    id: '7',
    tag: 'Customisable',
    headline: 'Build Your Own Itinerary!',
    subtitle: 'Personalise flights, stays & sightseeing in minutes',
    price: null,
    image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80',
  },
  {
    id: '8',
    tag: 'Fly Direct · Save 10%',
    headline: 'Bhutan Direct',
    subtitle: 'Ex Bangalore | Ex Ahmedabad',
    price: 85990,
    image: 'https://images.unsplash.com/photo-1561111951-f4e15ce6168e?w=800&q=80',
  },
];

// Slides shown in the top-right carousel
const CAROUSEL_SLIDES = DEALS.slice(1, 5);

interface DealCardProps {
  deal: typeof DEALS[number];
  className?: string;
  height?: string;
}

function DealCard({ deal, className = '', height = 'h-48' }: DealCardProps) {
  return (
    <Link
      to={`/package/${deal.id}`}
      className={`group relative overflow-hidden rounded-2xl block ${height} ${className}`}
    >
      <img
        src={deal.image}
        alt={deal.headline}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 group-hover:from-black/85 transition-all duration-300" />

      {/* Tag */}
      <div
        className="absolute top-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
        style={{ background: 'var(--theme-gradient)' }}
      >
        {deal.tag}
      </div>

      {/* Arrow */}
      <div
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300"
        style={{ background: 'var(--theme-primary)' }}
      >
        <ArrowUpRight size={15} />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white font-bold text-lg leading-tight">{deal.headline}</h3>
        <p className="text-white/75 text-xs mt-0.5">{deal.subtitle}</p>
        <div className="flex items-center gap-3 mt-2.5">
          {deal.price !== null ? (
            <span className="text-white text-sm font-semibold">
              Starting at ₹{deal.price.toLocaleString()}
            </span>
          ) : (
            <span className="text-white/80 text-xs">Customise in 10 minutes</span>
          )}
          <div className="inline-flex items-center gap-1 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/40 bg-white/15">
            View More <ArrowUpRight size={11} />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Top-right auto-cycling carousel ──────────────────────────────────────────
function BentoCarousel() {
  const [idx, setIdx]       = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (n: number) => setIdx((n + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => go(idx + 1), 3500);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [idx, paused]);

  const slide = CAROUSEL_SLIDES[idx];

  return (
    <div
      className="relative h-full rounded-2xl overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image with crossfade */}
      {CAROUSEL_SLIDES.map((s, i) => (
        <img
          key={s.id}
          src={s.image}
          alt={s.headline}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Tag */}
      <div
        className="absolute top-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10"
        style={{ background: 'var(--theme-gradient)' }}
      >
        {slide.tag}
      </div>

      {/* Prev / Next */}
      <button
        onClick={() => go(idx - 1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft size={14} />
      </button>
      <button
        onClick={() => go(idx + 1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight size={14} />
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-4 z-10">
        <h3 className="text-white font-bold text-xl leading-tight">{slide.headline}</h3>
        <p className="text-white/75 text-xs mt-0.5">{slide.subtitle}</p>
        <div className="flex items-center gap-3 mt-2.5">
          {slide.price !== null && (
            <span className="text-white text-sm font-semibold">
              Starting at ₹{slide.price.toLocaleString()}
            </span>
          )}
          <Link
            to={`/package/${slide.id}`}
            className="inline-flex items-center gap-1 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/40 bg-white/15 hover:bg-white/30 transition-colors"
          >
            View More <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
        {CAROUSEL_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? 20 : 8,
              height: 8,
              background: 'white',
              opacity: i === idx ? 1 : 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
}


export function TrendingPackages() {
  return (
    <section id="packages" className="py-16 bg-gray-50 dark:bg-gray-800/40">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1.5"
              style={{ color: 'var(--theme-primary)' }}
            >
              Hot Right Now
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trending{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'var(--theme-gradient)' }}
              >
                Specials
              </span>
            </h2>
          </div>
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: 'var(--theme-primary)' }}
          >
            View All <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* ── Bento grid — desktop ── */}
        <div className="hidden md:flex flex-col gap-3">

          {/* Row 1 — left 1/3 · right 2/3 (carousel) */}
          <div className="flex gap-3 h-[280px]">
            <div className="flex-[1_0_0%] min-w-0">
              <DealCard deal={DEALS[0]} height="h-full" />
            </div>
            <div className="flex-[2_0_0%] min-w-0">
              <BentoCarousel />
            </div>
          </div>

          {/* Row 2 — left 1/2 · middle 1/4 · right 1/4 */}
          <div className="flex gap-3 h-[280px]">
            <div className="flex-[2_0_0%] min-w-0">
              <DealCard deal={DEALS[5]} height="h-full" />
            </div>
            <div className="flex-[1_0_0%] min-w-0">
              <DealCard deal={DEALS[6]} height="h-full" />
            </div>
            <div className="flex-[1_0_0%] min-w-0">
              <DealCard deal={DEALS[7]} height="h-full" />
            </div>
          </div>

        </div>

        {/* ── Mobile: vertical stack ── */}
        <div className="md:hidden flex flex-col gap-3">
          {DEALS.map(deal => (
            <DealCard key={deal.id} deal={deal} height="h-44" />
          ))}
        </div>

      </div>
    </section>
  );
}