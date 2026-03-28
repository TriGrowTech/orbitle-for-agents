import { Plus, Search, Edit, Trash2, Eye, MoreVertical, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { PackageModal } from './PackageModal';

const mockPackages = [
  {
    id: 1,
    name: 'Bali Paradise - 7D/6N',
    destination: 'Bali, Indonesia',
    duration: '7 Days / 6 Nights',
    price: '₹45,000',
    category: 'International',
    status: 'Active',
    image: '🏝️',
    trending: true
  },
  {
    id: 2,
    name: 'Dubai Delight - 5D/4N',
    destination: 'Dubai, UAE',
    duration: '5 Days / 4 Nights',
    price: '₹38,000',
    category: 'International',
    status: 'Active',
    image: '🏙️',
    trending: false
  },
  {
    id: 3,
    name: 'Goa Beach Escape - 4D/3N',
    destination: 'Goa, India',
    duration: '4 Days / 3 Nights',
    price: '₹15,000',
    category: 'Domestic',
    status: 'Active',
    image: '🏖️',
    trending: false
  },
  {
    id: 4,
    name: 'Maldives Luxury - 6D/5N',
    destination: 'Maldives',
    duration: '6 Days / 5 Nights',
    price: '₹85,000',
    category: 'International',
    status: 'Inactive',
    image: '🌴',
    trending: true
  },
];

export function Packages() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-600 mt-2">Manage your travel packages and offerings</p>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center gap-2 w-fit font-medium" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Add New Package
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <select className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium">
            <option value="">All Categories</option>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
            <option value="trending">Trending</option>
          </select>
          <select className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPackages.map((pkg) => (
          <div key={pkg.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
            {/* Package Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-7xl overflow-hidden">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
              <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{pkg.image}</span>
              {pkg.trending && (
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-lg">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              )}
            </div>

            {/* Package Details */}
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">{pkg.name}</h3>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{pkg.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>⏱️</span>
                  <span>{pkg.duration}</span>
                </div>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {pkg.price}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-5">
                <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-semibold rounded-lg ring-1 ring-blue-600/20">
                  {pkg.category}
                </span>
                <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ring-1 ${
                  pkg.status === 'Active' 
                    ? 'bg-green-100 text-green-700 ring-green-600/20' 
                    : 'bg-gray-100 text-gray-700 ring-gray-600/20'
                }`}>
                  {pkg.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex-1 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 text-sm font-medium">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-3 py-2.5 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Package Modal */}
      <PackageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}