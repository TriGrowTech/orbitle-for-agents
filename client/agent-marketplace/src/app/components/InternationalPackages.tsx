import { PackageCard } from './PackageCard';
import { useAgent } from '../context/AgentContext';

const internationalPackages = [
  {
    id: '10',
    title: 'European Delight',
    location: 'Paris & Rome',
    price: 129999,
    originalPrice: 179999,
    discount: 28,
    duration: '8D/7N',
    imageUrl: 'https://images.unsplash.com/photo-1725806760874-96040618865c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGNpdHklMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc0NDIwMDc4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 267,
    badge: 'premium' as const,
    category: 'European',
    offer: 'Save ₹50K',
    inclusions: ['Flights', '4-Star Hotel', 'Breakfast', 'City Tours', 'Transfers'],
    exclusions: ['Lunch', 'Dinner', 'Visa', 'Travel Insurance'],
  },
  {
    id: '11',
    title: 'Bali Bliss',
    location: 'Bali, Indonesia',
    price: 35999,
    originalPrice: 49999,
    discount: 28,
    duration: '5D/4N',
    imageUrl: 'https://images.unsplash.com/photo-1765978372751-aa89dc6d30e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwdmFjYXRpb258ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 432,
    badge: 'bestseller' as const,
    category: 'Tropical',
    offer: 'Trending',
    inclusions: ['Flights', 'Beach Resort', 'Breakfast', 'Water Sports', 'Spa'],
    exclusions: ['Lunch', 'Dinner', 'Visa'],
  },
  {
    id: '12',
    title: 'Singapore Getaway',
    location: 'Singapore',
    price: 38999,
    originalPrice: 52999,
    discount: 26,
    duration: '4D/3N',
    imageUrl: 'https://images.unsplash.com/photo-1768069794857-9306ac167c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzc0NDM0MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 298,
    badge: 'budget' as const,
    category: 'City Break',
    offer: '26% Off',
    inclusions: ['Flights', 'Hotel', 'Breakfast', 'City Tour', 'USS Tickets'],
    exclusions: ['Lunch', 'Dinner', 'Shopping'],
  },
  {
    id: '13',
    title: 'Mountain Trek',
    location: 'Switzerland',
    price: 159999,
    originalPrice: 219999,
    discount: 27,
    duration: '7D/6N',
    imageUrl: 'https://images.unsplash.com/photo-1595368062405-e4d7840cba14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpa2luZyUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NzQ0MDM1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 187,
    badge: 'vip' as const,
    category: 'Adventure',
    offer: 'Exclusive',
    inclusions: ['Flights', '5-Star Hotel', 'All Meals', 'Mountain Tours', 'Guide'],
    exclusions: ['Visa', 'Equipment', 'Tips'],
  },
  {
    id: '14',
    title: 'Japan Discovery',
    location: 'Tokyo & Kyoto',
    price: 89999,
    originalPrice: 110999,
    discount: 18,
    duration: '6D/5N',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMGphcGFufGVufDF8fHx8MTc3NDQyMDA3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    reviews: 154,
    badge: 'trending' as const,
    category: 'Cultural',
    offer: 'Limited',
    inclusions: ['Flights', 'Hotel', 'Bullet Train', 'Tours'],
    exclusions: ['Visa', 'Lunch', 'Dinner'],
  },
  {
    id: '15',
    title: 'Maldives Retreat',
    location: 'Maldives',
    price: 99999,
    originalPrice: 139999,
    discount: 28,
    duration: '5D/4N',
    imageUrl: 'https://images.unsplash.com/photo-1698726654908-834d3a5330d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    rating: 4.9,
    reviews: 322,
    badge: 'bestseller' as const,
    category: 'Beach',
    offer: 'Save Flat 40K',
    inclusions: ['Flights', 'Water Villa', 'Meals', 'Transfers'],
    exclusions: ['Spa', 'Travel Insurance'],
  },
  {
    id: '16',
    title: 'Vietnam Wonders',
    location: 'Hanoi & Halong Bay',
    price: 45999,
    originalPrice: 59999,
    discount: 23,
    duration: '6D/5N',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    rating: 4.7,
    reviews: 211,
    badge: 'budget' as const,
    category: 'Adventure',
    offer: 'Great Deal',
    inclusions: ['Flights', 'Cruise', 'Hotels', 'Meals'],
    exclusions: ['Visa on arrival', 'Shopping'],
  },
  {
    id: '17',
    title: 'Egypt Escapade',
    location: 'Cairo & Luxor',
    price: 75999,
    originalPrice: 95999,
    discount: 20,
    duration: '7D/6N',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    rating: 4.8,
    reviews: 198,
    badge: 'premium' as const,
    category: 'Heritage',
    offer: 'Exotic',
    inclusions: ['Flights', 'Nile Cruise', 'Pyramid Tour'],
    exclusions: ['Tipping', 'Visa'],
  },
];

export function InternationalPackages() {
  const { packages: agentPackages, isTenantMode } = useAgent();

  // In tenant mode: use agent's international packages, else use demo packages
  const displayPackages = isTenantMode
    ? agentPackages
        .filter(p => p.category === 'international')
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
          imageUrl: p.imageUrl1 || `https://images.unsplash.com/photo-1725806760874-96040618865c?w=800&q=80`,
          rating: 4.9,
          reviews: 0,
          category: p.packageType,
          inclusions: p.inclusions,
          exclusions: p.exclusions,
          badges: (p.badges && p.badges.length > 0)
            ? p.badges as Array<'premium' | 'budget' | 'vip' | 'bestseller' | 'trending' | 'season' | 'discount'>
            : (p.isTrending ? ['trending' as const] : []),
          offer: undefined, // Card offer is controlled globally via siteConfig.cardOffer
        }))
    : internationalPackages;

  // If tenant mode has no international packages, don't render this section
  if (isTenantMode && displayPackages.length === 0) return null;

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            International <span className="text-[var(--theme-primary)]">Packages</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover the world with our exclusive international tour packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="flex items-center gap-2 text-sm font-semibold text-[var(--theme-primary)] hover:text-white hover:bg-[var(--theme-primary)] px-5 py-2.5 rounded-lg border border-[var(--theme-primary)] transition-all shadow-sm">
            View More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}