import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DESTINATIONS = [
  { name: 'Ladakh', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80' },
  { name: 'Kashmir', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&q=80' },
  { name: 'Manali', image: 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=400&q=80' },
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80' },
  { name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80' },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80' },
  { name: 'Andaman', image: 'https://images.unsplash.com/photo-1586019978207-5029e1afef8b?w=400&q=80' },
  { name: 'Darjeeling', image: 'https://images.unsplash.com/photo-1544735716-ea35bf36e785?w=400&q=80' },
  { name: 'Meghalaya', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=400&q=80' },
  { name: 'Leh', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80' },
  { name: 'Ooty', image: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=400&q=80' },
  { name: 'Coorg', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=400&q=80' },
];

export function DestinationsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 220 : -220, behavior: 'smooth' });
  };

  return (
    <section className="py-14 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--theme-primary)' }}>
              Explore India
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trending Holiday{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'var(--theme-gradient)' }}>
                Destinations
              </span>
            </h2>
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all hover:text-white"
              style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--theme-primary)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--theme-primary)'; }}
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all"
              style={{ background: 'var(--theme-gradient)' }}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        {/* Oval pill row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {DESTINATIONS.map((dest) => (
            <a
              key={dest.name}
              href="#packages"
              className="flex-shrink-0 group cursor-pointer"
              style={{ width: 130 }}
            >
              {/* Pill image */}
              <div
                className="relative overflow-hidden mx-auto mb-3 group-hover:-translate-y-1 transition-transform duration-300"
                style={{
                  width: 120,
                  height: 160,
                  borderRadius: '60px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Name inside pill */}
                <div className="absolute top-4 left-0 right-0 text-center">
                  <span className="text-white text-xs font-bold uppercase tracking-widest drop-shadow-lg">
                    {dest.name}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
