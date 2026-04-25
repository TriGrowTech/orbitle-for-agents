import { useState, useCallback, useEffect } from 'react';
import { PackageCard } from './PackageCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAgent } from '../context/AgentContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const domesticPackages = [
  {
    id: '5',
    title: 'Goa Beach Paradise',
    location: 'Goa, India',
    price: 12999,
    originalPrice: 17999,
    discount: 28,
    duration: '4D/3N',
    imageUrl: 'https://images.unsplash.com/photo-1667111838729-1a25f468856b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMHN1bnNldCUyMGluZGlhfGVufDF8fHx8MTc3NDQ0NzAyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.6,
    reviews: 287,
    badge: 'budget' as const,
    category: 'Beach',
    offer: '28% Off',
    inclusions: ['Hotel', 'Breakfast', 'Sightseeing'],
    exclusions: ['Flights', 'Lunch', 'Dinner'],
  },
  {
    id: '6',
    title: 'Kerala Backwaters',
    location: 'Kerala, India',
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    duration: '5D/4N',
    imageUrl: 'https://images.unsplash.com/photo-1707893013488-51672ef83425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc3NDQyMjkxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 201,
    badge: 'premium' as const,
    category: 'Houseboat',
    offer: 'Best Value',
    inclusions: ['Houseboat', 'All Meals', 'Sightseeing', 'Transfers'],
    exclusions: ['Flights', 'Ayurveda', 'Shopping'],
  },
  {
    id: '7',
    title: 'Rajasthan Heritage',
    location: 'Jaipur-Udaipur, India',
    price: 24999,
    originalPrice: 34999,
    discount: 29,
    duration: '6D/5N',
    imageUrl: 'https://images.unsplash.com/photo-1670254812851-e59013163aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBmb3J0JTIwcGFsYWNlfGVufDF8fHx8MTc3NDQ0NzAyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    reviews: 342,
    badge: 'bestseller' as const,
    category: 'Heritage',
    offer: 'Super Saver',
    inclusions: ['Hotel', 'Breakfast', 'Sightseeing', 'Transfers'],
    exclusions: ['Flights', 'Lunch', 'Dinner'],
  },
  {
    id: '8',
    title: 'Himalayan Adventure',
    location: 'Manali, India',
    price: 16999,
    originalPrice: 21999,
    discount: 23,
    duration: '5D/4N',
    imageUrl: 'https://images.unsplash.com/photo-1629184950099-3eb7993b5f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBzbm93JTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDQ0NzAyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    reviews: 198,
    badge: 'budget' as const,
    category: 'Adventure',
    offer: 'Flash Sale',
    inclusions: ['Hotel', 'Breakfast', 'Adventure Activities'],
    exclusions: ['Flights', 'Lunch', 'Dinner', 'Gear'],
  },
  {
    id: '9',
    title: 'Golden Triangle',
    location: 'Delhi-Agra-Jaipur',
    price: 22999,
    originalPrice: 29999,
    discount: 23,
    duration: '6D/5N',
    imageUrl: 'https://images.unsplash.com/photo-1671375159307-960b2e7fabc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhJTIwbW9udW1lbnR8ZW58MXx8fHwxNzc0MzU5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 412,
    badge: 'bestseller' as const,
    category: 'Cultural',
    offer: 'Popular',
    inclusions: ['Hotel', 'Breakfast', 'Sightseeing', 'Transfers', 'Guide'],
    exclusions: ['Flights', 'Lunch', 'Dinner'],
  },
  {
    id: '18',
    title: 'Kashmir Valley',
    location: 'Srinagar-Gulmarg',
    price: 26999,
    originalPrice: 32999,
    discount: 18,
    duration: '6D/5N',
    imageUrl: 'https://images.unsplash.com/photo-1615024467554-34adcb8ce62a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    rating: 4.9,
    reviews: 211,
    badge: 'trending' as const,
    category: 'Nature',
    offer: 'Exclusive',
    inclusions: ['Hotel', 'Houseboat', 'Breakfast', 'Transfers'],
    exclusions: ['Flights', 'Lunch', 'Activities'],
  },
  {
    id: '19',
    title: 'Andaman Escape',
    location: 'Port Blair-Havelock',
    price: 28999,
    originalPrice: 38999,
    discount: 25,
    duration: '5D/4N',
    imageUrl: 'https://images.unsplash.com/photo-1628169135061-f40445a4a580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    rating: 4.7,
    reviews: 145,
    badge: 'premium' as const,
    category: 'Beach',
    offer: 'Limited',
    inclusions: ['Hotel', 'Ferry', 'Breakfast', 'Sightseeing'],
    exclusions: ['Flights', 'Lunch', 'Water Sports'],
  },
  {
    id: '20',
    title: 'Mysore Ooty Coorg',
    location: 'South India',
    price: 19999,
    originalPrice: 25999,
    discount: 23,
    duration: '6D/5N',
    imageUrl: 'https://images.unsplash.com/photo-1621213032766-267be3eecb6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    rating: 4.8,
    reviews: 302,
    badge: 'bestseller' as const,
    category: 'Hill Station',
    offer: 'Save 23%',
    inclusions: ['Hotel', 'Breakfast', 'Sightseeing', 'Transfers'],
    exclusions: ['Flights', 'Lunch', 'Dinner'],
  },
];

export function DomesticPackages() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const { packages: agentPackages, isTenantMode } = useAgent();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // In tenant mode: use agent's domestic packages, else use demo packages
  const displayPackages = isTenantMode
    ? agentPackages
        .filter(p => p.category === 'domestic')
        .map(p => ({
          id: p._id,
          title: p.title,
          location: p.location,
          price: p.discountedPrice ?? p.originalPrice,
          originalPrice: p.discountedPrice ? p.originalPrice : undefined,
          discount: p.discountedPrice
            ? Math.round(((p.originalPrice - p.discountedPrice) / p.originalPrice) * 100)
            : undefined,
          duration: p.duration,
          imageUrl: p.imageUrl1 || `https://images.unsplash.com/photo-1667111838729-1a25f468856b?w=800&q=80`,
          rating: 4.8,
          reviews: 0,
          category: p.packageType,
          inclusions: p.inclusions,
          exclusions: p.exclusions,
          badges: p.isTrending ? ['trending' as const] : [],
          offer: p.hasOffer ? 'Special Offer' : undefined,
        }))
    : domesticPackages;

  // If tenant mode has no domestic packages, don't render this section
  if (isTenantMode && displayPackages.length === 0) return null;



  const visibleCount = windowWidth < 768 ? 1 : windowWidth < 1024 ? 3 : 4;
  const maxIndex = Math.max(0, displayPackages.length - visibleCount);


  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play (slow moving)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goNext, 5000); // 5 seconds (slow)
    return () => clearInterval(interval);
  }, [isAutoPlaying, goNext]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Domestic <span className="text-[var(--theme-primary)]">Packages</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore the beauty of India with our specially curated packages
          </p>
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Controls */}
          {currentIndex > 0 && (
            <button
              onClick={goPrev}
              className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[var(--theme-primary)] hover:text-white transition-all border border-gray-200 dark:border-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={goNext}
              className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[var(--theme-primary)] hover:text-white transition-all border border-gray-200 dark:border-gray-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Carousel Track */}
          <div className="overflow-visible sm:overflow-hidden mx-0 sm:mx-8 px-4 sm:px-0">
            <div
              className="flex transition-transform duration-700 ease-out gap-4 sm:gap-0"
              style={{
                transform: `translateX(calc(-${(currentIndex * 100) / visibleCount}% - ${currentIndex * (windowWidth < 640 ? 16 : 0)}px))`,
              }}
            >
              {displayPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex-shrink-0 sm:px-3"
                  style={{ width: windowWidth < 640 ? '85%' : `${100 / visibleCount}%` }}
                >
                  <PackageCard {...pkg} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile swipe hint or touch dots could go here, but hiding arrows on mobile means native-like swiping feeling is best. For now, rely on auto-play or button clicks. */}
        </div>
      </div>
    </section>
  );
}