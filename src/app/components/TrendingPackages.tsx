import { PackageCard } from './PackageCard';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, Sparkles, Flame } from 'lucide-react';

const trendingPackages = [
  {
    id: '1',
    title: 'Maldives Paradise',
    location: 'Maldives',
    price: 89999,
    originalPrice: 119999,
    discount: 25,
    duration: '5D/4N',
    imageUrl: 'https://images.unsplash.com/photo-1698726654908-834d3a5330d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHdhdGVyJTIwdmlsbGF8ZW58MXx8fHwxNzc0NDMyNzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 234,
    badges: ['premium', 'trending', 'discount'] as const,
    category: 'Beach Resort',
    offer: 'Limited Offer',
    inclusions: ['Flights', 'Hotel', 'Breakfast', 'Water Sports', 'Transfers'],
    exclusions: ['Lunch', 'Dinner', 'Personal Expenses'],
  },
  {
    id: '2',
    title: 'Dubai Extravaganza',
    location: 'Dubai, UAE',
    price: 54999,
    originalPrice: 74999,
    discount: 27,
    duration: '4D/3N',
    imageUrl: 'https://images.unsplash.com/photo-1768069794857-9306ac167c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMHNreWxpbmUlMjBjaXR5c2NhcGV8ZW58MXx8fHwxNzc0NDM0MDI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 189,
    badges: ['bestseller', 'trending'] as const,
    category: 'City Tour',
    offer: 'Flat 27% Off',
    inclusions: ['Flights', '4-Star Hotel', 'City Tour', 'Desert Safari'],
    exclusions: ['Meals', 'Visa Fees', 'Shopping'],
  },
  {
    id: '3',
    title: 'Thailand Explorer',
    location: 'Bangkok & Phuket, Thailand',
    price: 42999,
    originalPrice: 59999,
    discount: 28,
    duration: '6D/5N',
    imageUrl: 'https://images.unsplash.com/photo-1702910683001-af738a8ec642?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpbGFuZCUyMHRlbXBsZXMlMjBjdWx0dXJlfGVufDF8fHx8MTc3NDQ0NzAyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviews: 312,
    badges: ['budget', 'season'] as const,
    category: 'Cultural',
    offer: 'Save ₹17K',
    inclusions: ['Flights', 'Hotel', 'Breakfast', 'Sightseeing', 'Transfers'],
    exclusions: ['Lunch', 'Dinner', 'Travel Insurance'],
  },
  {
    id: '4',
    title: 'Safari Adventure',
    location: 'Kenya, Africa',
    price: 125999,
    originalPrice: 159999,
    discount: 21,
    duration: '7D/6N',
    imageUrl: 'https://images.unsplash.com/photo-1729359035276-189519a4b072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NzQ0MTMyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    reviews: 156,
    badges: ['vip', 'trending'] as const,
    category: 'Adventure',
    offer: '21% Off',
    inclusions: ['Flights', '5-Star Lodge', 'All Meals', 'Safari Tours', 'Guide'],
    exclusions: ['Visa', 'Tips', 'Personal Expenses'],
  },
];

export function TrendingPackages() {
  const { color } = useTheme();

  // Navy: Classic grid layout with elegant header
  if (color === 'navy') {
    return (
      <section id="packages" className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Most Popular</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Trending <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">Destinations</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Handpicked experiences that our travelers love the most. Join thousands who've already discovered these amazing places.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Red: Bold asymmetric layout with featured card
  if (color === 'red') {
    return (
      <section id="packages" className="py-20 bg-gradient-to-br from-gray-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full mb-4">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Hot Deals</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-3">
                What's <span className="text-transparent bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text">Trending</span>
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                The hottest destinations everyone's talking about
              </p>
            </div>
          </div>

          {/* Featured + Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Featured Large Card */}
            <div className="lg:col-span-2 lg:row-span-2">
              <PackageCard key={trendingPackages[0].id} {...trendingPackages[0]} featured />
            </div>
            
            {/* Smaller Cards */}
            {trendingPackages.slice(1).map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Cyan: Modern card-focused layout with clean spacing
  return (
    <section id="packages" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-full mb-3">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-2">
              Popular <span className="text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">Escapes</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover where travelers are heading this season
            </p>
          </div>
          <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all">
            View All Packages
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}