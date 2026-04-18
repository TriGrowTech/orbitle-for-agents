import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DESTINATIONS = [
  { name: 'Ladakh', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILyx8yJX-DzIM35QGZnvvv8ozIs_13ShnaA&s' },
  { name: 'Kashmir', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2FzaG1pcnxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Manali', image: 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=400&q=80' },
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80' },
  { name: 'Rajasthan', image: 'https://plus.unsplash.com/premium_photo-1697729422411-a2553ae5bd0d?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFqYXN0aGFufGVufDB8fDB8fHww' },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80' },
  { name: 'Andaman', image: 'https://images.unsplash.com/photo-1545762374-d18079617da8?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5kYW1hbnxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Darjeeling', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCuQHJKHUiZ5xcncPCRPiJBBUk7cBbB_a13w&s' },
  { name: 'Meghalaya', image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=400&q=80' },
  { name: 'Leh', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80' },
  { name: 'Ooty', image: 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=400&q=80' },
  { name: 'Coorg', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=400&q=80' },
];

const GAP = 20; // px — must match gap in flex container

export function DestinationsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getItemWidth = () => {
    if (!containerRef.current) return 130;
    // Container width minus 5 gaps between 6 visible items, divided by 6
    return (containerRef.current.offsetWidth - GAP * 5) / 6;
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const step = getItemWidth() + GAP; // exactly one oval's slot
    scrollRef.current.scrollBy({ left: dir === 'right' ? step : -step, behavior: 'smooth' });
  };

  return (
    <section className="py-14 bg-white dark:bg-gray-900 overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4">

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
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--theme-primary)';
                (e.currentTarget as HTMLElement).style.color = '#fff';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--theme-primary)';
              }}
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

        {/* Oval pill row — exactly 6 visible, scrolls one at a time */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-2"
          style={{
            gap: GAP,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {DESTINATIONS.map((dest) => (
            <a
              key={dest.name}
              href="#packages"
              className="group cursor-pointer flex-shrink-0"
              style={{
                // Exactly 1/6 of container width accounting for 5 gaps
                flex: `0 0 calc((100% - ${GAP * 5}px) / 6)`,
              }}
            >
              {/* Pill image */}
              <div
                className="relative overflow-hidden mx-auto mb-3 group-hover:-translate-y-1 transition-transform duration-300"
                style={{
                  width: '100%',
                  paddingBottom: '133%', // ~4:3 tall pill aspect ratio
                  borderRadius: '9999px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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