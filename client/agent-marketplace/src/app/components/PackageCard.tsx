import { Heart, Check, X, Tag } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router';

interface PackageCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  duration: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  badges?: Array<'premium' | 'budget' | 'vip' | 'bestseller' | 'trending' | 'season' | 'discount'>;
  category?: string;
  offer?: string;
  inclusions?: string[];
  exclusions?: string[];
}

export function PackageCard({
  id,
  title,
  location,
  price,
  originalPrice,
  discount,
  duration,
  imageUrl,
  rating,
  reviews,
  featured = false,
  badges,
  category,
  offer,
  inclusions = [],
  exclusions = [],
}: PackageCardProps) {
  const handleWhatsAppShare = () => {
    const message = `Check out this amazing travel package: ${title} - ${location}. Price: ₹${price.toLocaleString()}. ${window.location.origin}/package/${id}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case 'premium':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';
      case 'vip':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900';
      case 'budget':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'bestseller':
        return 'bg-gradient-to-r from-orange-500 to-red-600 text-white';
      case 'trending':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'season':
        return 'bg-gradient-to-r from-red-500 to-orange-500 text-white';
      case 'discount':
        return 'bg-gradient-to-r from-green-500 to-lime-500 text-white';
      default:
        return 'bg-blue-600 text-white';
    }
  };

  if (featured) {
    return (
      <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
        <Link to={`/package/${id}`} className="block relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          {/* Offer Ribbon */}
          {offer && (
            <div className="absolute top-0 right-0 bg-gradient-to-br from-red-600 to-orange-600 text-white px-6 py-2 rounded-bl-2xl shadow-xl">
              <p className="text-sm font-bold uppercase tracking-wider">{offer}</p>
            </div>
          )}
          
          {/* Category Badge */}
          {category && (
            <div className="absolute bottom-24 left-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
              {category}
            </div>
          )}
          
          <div className="absolute top-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-900 dark:text-white shadow-lg">
            {duration}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            {/* Badge above title */}
            {badges && (
              <div className="flex gap-2 mb-3 flex-wrap">
                {badges.map((badge, idx) => (
                  <div key={idx} className={`inline-flex ${getBadgeStyles(badge)} px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg`}>
                    {badge}
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center mb-3">
              <span className="text-yellow-400 text-xl mr-1">★</span>
              <span className="font-bold text-lg">{rating}</span>
              <span className="text-gray-200 text-sm ml-2">({reviews} reviews)</span>
            </div>
            <h3 className="text-4xl font-black mb-2">{title}</h3>
            <p className="text-lg text-gray-200 mb-4">{location}</p>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-300">Starting from</p>
                <div className="flex items-center gap-3">
                  {originalPrice && (
                    <p className="text-lg text-gray-400 line-through">₹{originalPrice.toLocaleString()}</p>
                  )}
                  <p className="text-3xl font-bold text-white">₹{price.toLocaleString()}</p>
                  {discount && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link
                to={`/package/${id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-base shadow-2xl hover:shadow-3xl hover:-translate-y-1 active:scale-95"
              >
                <span>View Details</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleWhatsAppShare();
                }}
                className="flex items-center justify-center bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 active:scale-95 group"
                title="Share on WhatsApp"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-7 h-7 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
      <Link to={`/package/${id}`} className="block relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Offer Ribbon */}
        {offer && (
          <div className="absolute top-0 right-0 z-10">
            <div className="relative">
              <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white px-4 py-2 rounded-bl-2xl shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wide">{offer}</p>
              </div>
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[8px] border-t-red-800 border-l-[8px] border-l-transparent"></div>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/20 z-10">
            {category}
          </div>
        )}
        
        {/* Duration Badge */}
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-900 dark:text-white shadow-md">
          {duration}
        </div>
      </Link>
      
      <div className="p-5 flex-1 flex flex-col">
        {/* Badge above title */}
        {badges && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {badges.map((badge, idx) => (
              <div key={idx} className={`inline-flex ${getBadgeStyles(badge)} px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider`}>
                {badge}
              </div>
            ))}
          </div>
        )}
        
        <Link to={`/package/${id}`}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[var(--theme-primary)] transition-colors flex-1">
              {title}
            </h3>
            <button 
              className="text-gray-400 hover:text-red-500 transition-colors ml-2"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{location}</p>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="font-semibold text-gray-900 dark:text-white">{rating}</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({reviews} reviews)</span>
            </div>
          </div>
        </Link>

        {/* Inclusions & Exclusions */}
        {(inclusions.length > 0 || exclusions.length > 0) && (
          <div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
            {inclusions.length > 0 && (
              <div className="mb-2">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Included:</p>
                <div className="flex flex-wrap gap-1">
                  {inclusions.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                      <Check className="w-3 h-3" />
                      {item}
                    </span>
                  ))}
                  {inclusions.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                      +{inclusions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
            {exclusions.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Not Included:</p>
                <div className="flex flex-wrap gap-1">
                  {exclusions.slice(0, 2).map((item, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-xs bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2 py-1 rounded-full">
                      <X className="w-3 h-3" />
                      {item}
                    </span>
                  ))}
                  {exclusions.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                      +{exclusions.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Slim Offer Ribbon */}
        {offer && (
          <div className="-mx-5 mb-3">
            <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 py-1.5 px-5">
              <div className="flex items-center justify-center gap-2">
                <Tag className="w-3 h-3 text-white" />
                <p className="text-xs font-bold text-white uppercase tracking-wider">{offer}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Price Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mb-4 mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Starting from</p>
              <div className="flex items-center gap-2">
                {originalPrice && (
                  <p className="text-sm text-gray-400 dark:text-gray-500 line-through">₹{originalPrice.toLocaleString()}</p>
                )}
                <p className="text-2xl font-bold text-[var(--theme-primary)]">₹{price.toLocaleString()}</p>
              </div>
              {discount && (
                <p className="text-xs font-bold text-green-600 dark:text-green-400 mt-0.5">
                  Save {discount}% • ₹{(originalPrice! - price).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link 
            to={`/package/${id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-[var(--theme-primary)] hover:bg-[var(--theme-secondary)] text-white px-5 py-3.5 rounded-lg transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            <span>View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center justify-center bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 group"
            title="Share on WhatsApp"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}