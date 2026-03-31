import { Plus, Search, Edit, Trash2, Eye, TrendingUp, MapPin, Clock, Tag, ImageOff } from 'lucide-react';
import { useState } from 'react';
import { PackageModal } from './PackageModal';

interface Badge {
  label: string;
  textColor: string;
  bgColor: string;
}

interface Package {
  id: number;
  name: string;
  destination: string;
  duration: string;
  category: string;
  type: string;
  originalPrice: string;
  discountedPrice: string;
  discountPercent: number;
  images: string[]; // URLs or empty
  badges: Badge[];
  trending: boolean;
  hasOffer: boolean;
  inclusions: string[];
  exclusions: string[];
  status: 'Active' | 'Inactive';
}

const mockPackages: Package[] = [
  {
    id: 1,
    name: 'Bali Paradise – 7D/6N',
    destination: 'Bali, Indonesia',
    duration: '7 Days / 6 Nights',
    category: 'International',
    type: 'Beach',
    originalPrice: '₹50,000',
    discountedPrice: '₹45,000',
    discountPercent: 10,
    images: [],
    badges: [
      { label: 'Bestseller', textColor: '#ffffff', bgColor: '#f59e0b' },
      { label: 'Hot Deal',   textColor: '#ffffff', bgColor: '#ef4444' },
    ],
    trending: true,
    hasOffer: true,
    inclusions: ['Accommodation', 'Breakfast & Dinner', 'Sightseeing', 'Airport Transfers'],
    exclusions: ['Airfare', 'Personal Expenses', 'Visa Fees'],
    status: 'Active',
  },
  {
    id: 2,
    name: 'Dubai Delight – 5D/4N',
    destination: 'Dubai, UAE',
    duration: '5 Days / 4 Nights',
    category: 'International',
    type: 'City Tour',
    originalPrice: '₹42,000',
    discountedPrice: '₹38,000',
    discountPercent: 10,
    images: [],
    badges: [
      { label: 'Premium', textColor: '#ffffff', bgColor: '#1f2937' },
    ],
    trending: false,
    hasOffer: false,
    inclusions: ['5-Star Hotel', 'Desert Safari', 'Burj Khalifa Entry', 'Dhow Cruise'],
    exclusions: ['Flights', 'Visa'],
    status: 'Active',
  },
  {
    id: 3,
    name: 'Goa Beach Escape – 4D/3N',
    destination: 'Goa, India',
    duration: '4 Days / 3 Nights',
    category: 'Domestic',
    type: 'Beach',
    originalPrice: '₹15,000',
    discountedPrice: '₹15,000',
    discountPercent: 0,
    images: [],
    badges: [
      { label: 'Family Friendly', textColor: '#ffffff', bgColor: '#ec4899' },
      { label: 'New',             textColor: '#ffffff', bgColor: '#10b981' },
    ],
    trending: false,
    hasOffer: false,
    inclusions: ['Hotel Stay', 'Breakfast', 'Water Sports', 'Sightseeing'],
    exclusions: ['Travel', 'Lunch & Dinner'],
    status: 'Active',
  },
  {
    id: 4,
    name: 'Maldives Luxury – 6D/5N',
    destination: 'Maldives',
    duration: '6 Days / 5 Nights',
    category: 'International',
    type: 'Honeymoon',
    originalPrice: '₹1,00,000',
    discountedPrice: '₹85,000',
    discountPercent: 15,
    images: [],
    badges: [
      { label: 'Premium',      textColor: '#ffffff', bgColor: '#1f2937' },
      { label: 'Limited Time', textColor: '#ffffff', bgColor: '#8b5cf6' },
    ],
    trending: true,
    hasOffer: true,
    inclusions: ['Overwater Villa', 'All Meals', 'Snorkeling', 'Spa Session'],
    exclusions: ['International Flights', 'Alcohol'],
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Kedarnath Yatra – 5D/4N',
    destination: 'Kedarnath, India',
    duration: '5 Days / 4 Nights',
    category: 'Domestic',
    type: 'Pilgrimage',
    originalPrice: '₹18,000',
    discountedPrice: '₹16,500',
    discountPercent: 8,
    images: [],
    badges: [
      { label: 'Bestseller', textColor: '#ffffff', bgColor: '#f59e0b' },
    ],
    trending: false,
    hasOffer: true,
    inclusions: ['Accommodation', 'All Meals', 'Pony / Helicopter Option', 'Guide'],
    exclusions: ['Personal Expenses', 'Travel Insurance'],
    status: 'Active',
  },
  {
    id: 6,
    name: 'Manali Adventure – 6D/5N',
    destination: 'Manali, India',
    duration: '6 Days / 5 Nights',
    category: 'Domestic',
    type: 'Adventure',
    originalPrice: '₹22,000',
    discountedPrice: '₹19,999',
    discountPercent: 9,
    images: [],
    badges: [
      { label: 'New', textColor: '#ffffff', bgColor: '#10b981' },
    ],
    trending: true,
    hasOffer: false,
    inclusions: ['Camp Stay', 'Trekking', 'River Rafting', 'Meals'],
    exclusions: ['Travel to Manali', 'Personal Gear'],
    status: 'Active',
  },
];

/* ─── Gradient palettes for image placeholders ───────────────── */
const gradients = [
  'from-blue-400 via-purple-500 to-pink-500',
  'from-orange-400 via-red-400 to-pink-500',
  'from-emerald-400 via-teal-400 to-cyan-500',
  'from-violet-500 via-purple-400 to-indigo-500',
  'from-amber-400 via-orange-400 to-red-400',
  'from-sky-400 via-blue-400 to-indigo-500',
];

/* ─── Package Card ───────────────────────────────────────────── */
function PackageCard({
  pkg,
  onToggleStatus,
}: {
  pkg: Package;
  onToggleStatus: (id: number) => void;
}) {
  const gradient = gradients[(pkg.id - 1) % gradients.length];
  const isActive = pkg.status === 'Active';
  const hasDiscount = pkg.discountPercent > 0;
  const savings = (() => {
    const orig = parseFloat(pkg.originalPrice.replace(/[^0-9.]/g, ''));
    const disc = parseFloat(pkg.discountedPrice.replace(/[^0-9.]/g, ''));
    return orig - disc;
  })();

  return (
    <div className={`group bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col ${
      isActive ? 'border-gray-200/80 hover:shadow-blue-500/10' : 'border-gray-200/50 opacity-75 hover:opacity-100'
    }`}>

      {/* ── Image area ──────────────────────────────────────────── */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden flex-shrink-0`}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/15 transition-colors" />

        {/* Placeholder icon */}
        {pkg.images.length === 0 && (
          <ImageOff className="w-10 h-10 text-white/40" />
        )}

        {/* Dual image preview */}
        {pkg.images.length > 0 && (
          <div className="absolute inset-0 flex">
            {pkg.images.slice(0, 2).map((src, i) => (
              <img key={i} src={src} alt="" className={`h-full object-cover ${pkg.images.length === 2 ? 'w-1/2' : 'w-full'}`} />
            ))}
          </div>
        )}

        {/* Top-left: Trending */}
        {pkg.trending && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-orange-500 text-white rounded-lg text-[10px] font-semibold shadow-md">
            <TrendingUp className="w-3 h-3" />
            Trending
          </div>
        )}

        {/* Top-right: Special Offer */}
        {pkg.hasOffer && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-lg text-[10px] font-semibold shadow-md">
            <Tag className="w-3 h-3" />
            Special Offer
          </div>
        )}

        {/* Bottom of image: Category (left) + Type (right) */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-3 pb-2.5 pt-8 bg-gradient-to-t from-black/50 to-transparent">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full ring-1 ring-white/30">
            {pkg.category}
          </span>
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold rounded-full ring-1 ring-white/30">
            {pkg.type}
          </span>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-1">

        {/* Badges — just above heading */}
        {pkg.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {pkg.badges.map((b, i) => (
              <span
                key={i}
                style={{ backgroundColor: b.bgColor, color: b.textColor }}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide shadow-sm"
              >
                {b.label}
              </span>
            ))}
          </div>
        )}

        {/* Name */}
        <h3 className="font-semibold text-gray-900 text-[15px] leading-snug mb-2 line-clamp-2">
          {pkg.name}
        </h3>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            {pkg.destination}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            {pkg.duration}
          </div>
        </div>

        {/* Inclusions */}
        {pkg.inclusions.length > 0 && (
          <div className="mb-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Inclusions</p>
            <div className="flex flex-wrap gap-1">
              {pkg.inclusions.slice(0, 3).map((inc, i) => (
                <span key={i} className="flex items-center gap-0.5 text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded-full ring-1 ring-green-200">
                  <span className="text-green-500">✓</span> {inc}
                </span>
              ))}
              {pkg.inclusions.length > 3 && (
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  +{pkg.inclusions.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Exclusions */}
        {pkg.exclusions.length > 0 && (
          <div className="mb-3">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Exclusions</p>
            <div className="flex flex-wrap gap-1">
              {pkg.exclusions.slice(0, 2).map((exc, i) => (
                <span key={i} className="flex items-center gap-0.5 text-[10px] text-red-600 bg-red-50 px-2 py-0.5 rounded-full ring-1 ring-red-200">
                  <span className="text-red-400">✕</span> {exc}
                </span>
              ))}
              {pkg.exclusions.length > 2 && (
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  +{pkg.exclusions.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Offer / discount bar — below exclusions */}
        {hasDiscount && (
          <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-3 py-1.5 mb-3">
            <span className="text-[11px] text-green-700 font-medium">
              Save ₹{savings.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-green-700 font-bold">
              {pkg.discountPercent}% OFF
            </span>
          </div>
        )}

        {/* Spacer to push price + footer down */}
        <div className="flex-1" />

        {/* Price — at the bottom */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">{pkg.discountedPrice}</span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">{pkg.originalPrice}</span>
          )}
          <span className="text-xs text-gray-400 ml-auto">per person</span>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">

          {/* Active / Inactive toggle */}
          <div className="flex items-center gap-2 mr-auto">
            <button
              onClick={() => onToggleStatus(pkg.id)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  isActive ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={`text-[11px] font-semibold ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          <button className="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-all" title="View">
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md hover:shadow-blue-500/30 transition-all" title="Edit">
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-all" title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Packages page ────────────────────────────────────────── */
export function Packages() {
  const [packages, setPackages] = useState<Package[]>(mockPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleStatus = (id: number) => {
    setPackages(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p
      )
    );
  };

  const filtered = packages.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = !filterCategory ||
      (filterCategory === 'trending' ? p.trending : p.category.toLowerCase() === filterCategory);
    const matchStatus = !filterStatus || p.status.toLowerCase() === filterStatus;
    return matchSearch && matchCat && matchStatus;
  });

  const activeCount   = packages.filter(p => p.status === 'Active').length;
  const inactiveCount = packages.filter(p => p.status === 'Inactive').length;
  const trendingCount = packages.filter(p => p.trending).length;

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-600 mt-1">Manage your travel packages and offerings</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 w-fit font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Package
        </button>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Total',    value: packages.length,  color: 'text-gray-900',  bg: 'bg-gray-50',   border: 'border-gray-200' },
          { label: 'Active',   value: activeCount,       color: 'text-green-700', bg: 'bg-green-50',  border: 'border-green-200' },
          { label: 'Inactive', value: inactiveCount,     color: 'text-gray-500',  bg: 'bg-gray-50',   border: 'border-gray-200' },
          { label: 'Trending', value: trendingCount,     color: 'text-orange-600',bg: 'bg-orange-50', border: 'border-orange-200' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} ${s.border} border rounded-xl p-3 text-center`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filters ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200/50 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages or destination…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          >
            <option value="">All Categories</option>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
            <option value="trending">Trending</option>
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* ── Grid ────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg font-medium">No packages found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} onToggleStatus={toggleStatus} />
          ))}
        </div>
      )}

      {/* ── Modal ───────────────────────────────────────────────── */}
      <PackageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}