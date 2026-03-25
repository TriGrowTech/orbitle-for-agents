import { PackageCard } from './PackageCard';

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
];

export function InternationalPackages() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {internationalPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}