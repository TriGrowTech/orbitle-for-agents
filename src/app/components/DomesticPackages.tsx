import { PackageCard } from './PackageCard';

const domesticPackages = [
  {
    id: '5',
    title: 'Goa Beach Paradise',
    location: 'Goa, India',
    price: 12999,
    originalPrice: 17999,
    discount: 28,
    duration: '4D/3N',
    imageUrl: 'https://images.unsplash.com/photo-1667111838729-1a25f468856b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMHN1bnNldCUyMGluZGlhfGVufDF8fHx8MTc3NDQ0NzAyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
    imageUrl: 'https://images.unsplash.com/photo-1707893013488-51672ef83425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc3NDQyMjkxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
    imageUrl: 'https://images.unsplash.com/photo-1670254812851-e59013163aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBmb3J0JTIwcGFsYWNlfGVufDF8fHx8MTc3NDQ0NzAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
    imageUrl: 'https://images.unsplash.com/photo-1629184950099-3eb7993b5f48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YXMlMjBzbm93JTIwbW91bnRhaW5zfGVufDF8fHx8MTc3NDQ0NzAyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
    location: 'Delhi-Agra-Jaipur, India',
    price: 22999,
    originalPrice: 29999,
    discount: 23,
    duration: '6D/5N',
    imageUrl: 'https://images.unsplash.com/photo-1671375159307-960b2e7fabc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhJTIwbW9udW1lbnR8ZW58MXx8fHwxNzc0MzU5NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 412,
    badge: 'bestseller' as const,
    category: 'Cultural',
    offer: 'Popular',
    inclusions: ['Hotel', 'Breakfast', 'Sightseeing', 'Transfers', 'Guide'],
    exclusions: ['Flights', 'Lunch', 'Dinner'],
  },
];

export function DomesticPackages() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
            Domestic <span className="text-[var(--theme-primary)]">Packages</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore the beauty of India with our specially curated packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {domesticPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}