import { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const THEMES = [
  {
    title: 'Beach & Islands',
    description: 'Tropical paradises and sun-soaked coastal escapes.',
    tags: ['Maldives', 'Andaman', 'Goa', 'Bali'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    title: 'Adventure & Trekking',
    description: 'Mountain expeditions and thrilling outdoor experiences.',
    tags: ['Ladakh', 'Manali', 'Rishikesh', 'Spiti'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  },
  {
    title: 'Heritage & Culture',
    description: 'Historical monuments and immersive cultural journeys.',
    tags: ['Jaipur', 'Varanasi', 'Hampi', 'Mysore'],
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80',
  },
  {
    title: 'Pilgrimage',
    description: 'Sacred destinations that calm and restore the soul.',
    tags: ['Char Dham', 'Vaishno Devi', 'Tirupati', 'Shirdi'],
    image: 'https://images.unsplash.com/photo-1609075820678-498d8e65b9d4?w=800&q=80',
  },
  {
    title: 'Honeymoon',
    description: 'Romantic escapes crafted for two, in paradise.',
    tags: ['Maldives', 'Bali', 'Kerala', 'Paris'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
  },
  {
    title: 'Culinary Tours',
    description: 'Savour authentic street food, spices and fine dining.',
    tags: ['Lucknow', 'Kolkata', 'Chennai', 'Hyderabad'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  },
  {
    title: 'Photography',
    description: 'Picturesque locations and golden-hour magic for every lens.',
    tags: ['Rajasthan', 'Meghalaya', 'Spiti', 'Kashmir'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
  {
    title: 'Camping & Wildlife',
    description: 'Into the wild — safaris, national parks & jungle camps.',
    tags: ['Jim Corbett', 'Ranthambore', 'Kaziranga', 'Bandhavgarh'],
    image: 'https://images.unsplash.com/photo-1551009175-15bdf9dcb580?w=800&q=80',
  },
];

const PAGE_SIZE = 5;

export function TravelThemes() {
  const [start,  setStart]  = useState(0);
  const [active, setActive] = useState(0); // index within current page
  const [dir,    setDir]    = useState<'left' | 'right' | null>(null);
  const [animKey, setAnimKey] = useState(0); // re-key to replay animation

  const maxStart = THEMES.length - PAGE_SIZE;

  const navigate = (direction: 'left' | 'right') => {
    const next = direction === 'right'
      ? Math.min(start + 1, maxStart)
      : Math.max(start - 1, 0);
    if (next === start) return;
    setDir(direction);
    setStart(next);
    setActive(0);
    setAnimKey(k => k + 1);
  };

  const visible = THEMES.slice(start, start + PAGE_SIZE);

  return (
    <section id="themes" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--theme-primary)' }}>
              Curated Collections
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore Themes that{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'var(--theme-gradient)' }}
              >
                Inspire Travel
              </span>
            </h2>
          </div>

          {/* Nav arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => navigate('left')}
              disabled={start === 0}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
              style={{
                borderColor: 'var(--theme-primary)',
                color: 'var(--theme-primary)',
              }}
              onMouseEnter={e => { if (start !== 0) (e.currentTarget as HTMLElement).style.background = 'var(--theme-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => navigate('right')}
              disabled={start >= maxStart}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:text-white"
              style={{
                borderColor: 'var(--theme-primary)',
                color: 'var(--theme-primary)',
              }}
              onMouseEnter={e => { if (start < maxStart) (e.currentTarget as HTMLElement).style.background = 'var(--theme-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <ChevronRight size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-1 ml-2">
              {Array.from({ length: maxStart + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > start ? 'right' : 'left'); setStart(i); setActive(0); setAnimKey(k => k + 1); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === start ? 20 : 8,
                    height: 8,
                    background: i === start ? 'var(--theme-primary)' : 'var(--theme-primary)',
                    opacity: i === start ? 1 : 0.25,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Accordion carousel ── */}
        <div className="hidden sm:block overflow-hidden">
          <div
            key={animKey}
            className="flex gap-3 h-[400px]"
            style={{
              animation: dir
                ? `${dir === 'right' ? 'slideInRight' : 'slideInLeft'} 0.4s cubic-bezier(0.4,0,0.2,1) both`
                : undefined,
            }}
          >
            <style>{`
              @keyframes slideInRight {
                from { opacity: 0; transform: translateX(32px); }
                to   { opacity: 1; transform: translateX(0); }
              }
              @keyframes slideInLeft {
                from { opacity: 0; transform: translateX(-32px); }
                to   { opacity: 1; transform: translateX(0); }
              }
            `}</style>

            {visible.map((theme, i) => {
              const isOpen = active === i;
              return (
                <div
                  key={theme.title}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
                  style={{
                    flex: isOpen ? '4 0 0%' : '1 0 0%',
                    transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: 0,
                  }}
                >
                  {/* Image */}
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      transform: isOpen ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />

                  {/* Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                      transition: 'background 0.5s ease',
                    }}
                  />

                  {/* Collapsed label */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                      opacity: isOpen ? 0 : 1,
                      transition: 'opacity 0.25s ease',
                    }}
                  >
                    <p
                      className="text-white font-bold text-sm tracking-wide whitespace-nowrap"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        transform: 'rotate(180deg)',
                      }}
                    >
                      {theme.title}
                    </p>
                  </div>

                  {/* Expanded content */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                      transition: 'opacity 0.3s ease 0.18s, transform 0.3s ease 0.18s',
                      pointerEvents: isOpen ? 'auto' : 'none',
                    }}
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {theme.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight mb-0.5">
                          {theme.title}
                        </h3>
                        <p className="text-white/70 text-xs leading-relaxed">
                          {theme.description}
                        </p>
                      </div>
                      <a
                        href="#packages"
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-900 font-bold shadow-lg hover:scale-110 transition-transform"
                        style={{ background: 'var(--theme-accent, #facc15)' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile grid ── */}
        <div className="sm:hidden grid grid-cols-2 gap-3">
          {THEMES.map(theme => (
            <div key={theme.title} className="relative h-44 rounded-2xl overflow-hidden">
              <img src={theme.image} alt={theme.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-3">
                <p className="text-white font-bold text-sm">{theme.title}</p>
                <p className="text-white/65 text-[10px] mt-0.5">{theme.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}