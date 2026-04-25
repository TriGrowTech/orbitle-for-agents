import { useParams, Link } from 'react-router';
import { ArrowLeft, MapPin, Calendar, Users, Star, Check, Loader2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { Topbar } from '../components/Topbar';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatbotButton } from '../components/ChatbotButton';
import { PlanTourModal } from '../components/PlanTourModal';
import { useState, useEffect } from 'react';
import { useAgent } from '../context/AgentContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Mock data - in real app, this would come from API/database
const packageDetails: Record<string, any> = {
  '1': {
    title: 'Maldives Paradise',
    location: 'Maldives',
    price: 89999,
    duration: '5 Days / 4 Nights',
    badges: ['premium', 'vip'],
    images: [
      'https://images.unsplash.com/photo-1698726654908-834d3a5330d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMHdhdGVyJTIwdmlsbGF8ZW58MXx8fHwxNzc0NDMyNzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rating: 4.9,
    reviews: 234,
    description: 'Experience luxury and tranquility in the crystal-clear waters of Maldives. This package includes water villa accommodation, water sports, spa treatments, and romantic dining experiences.',
    highlights: [
      'Luxury water villa accommodation',
      'All meals included (breakfast, lunch, dinner)',
      'Water sports activities',
      'Spa and wellness treatments',
      'Romantic beach dinner',
      'Airport transfers',
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Check-in', description: 'Arrive at Male airport, speedboat transfer to resort, check-in to water villa, welcome drinks and resort orientation.' },
      { day: 2, title: 'Island Activities', description: 'Breakfast at resort, morning snorkeling session, lunch, afternoon spa treatment, evening sunset cruise.' },
      { day: 3, title: 'Water Sports', description: 'Breakfast, full day water sports activities including jet skiing, parasailing, and kayaking. Lunch at resort.' },
      { day: 4, title: 'Relaxation Day', description: 'Leisure day, optional diving excursion, romantic beach dinner under the stars.' },
      { day: 5, title: 'Departure', description: 'Breakfast, check-out, speedboat transfer to Male airport.' },
    ],
    inclusions: [
      'Round trip airfare',
      '4 nights accommodation in water villa',
      'All meals (MAP basis)',
      'Airport transfers',
      'Water sports activities',
      'One spa session per person',
    ],
    exclusions: [
      'Travel insurance',
      'Personal expenses',
      'Tips and gratuities',
      'Any meals not mentioned',
    ],
  },
};

// Badge styling — mirrors PackageCard.tsx
const getBadgeStyles = (badge: string): string => {
  switch (badge) {
    case 'premium':    return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white';
    case 'vip':        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900';
    case 'budget':     return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
    case 'bestseller': return 'bg-gradient-to-r from-orange-500 to-red-600 text-white';
    case 'trending':   return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
    case 'season':     return 'bg-gradient-to-r from-red-500 to-orange-500 text-white';
    case 'discount':   return 'bg-gradient-to-r from-green-500 to-lime-500 text-white';
    default:           return 'bg-blue-600 text-white';
  }
};

const BADGE_ICONS: Record<string, string> = {
  premium: '👑',
  vip: '⭐',
  bestseller: '🔥',
  trending: '📈',
  budget: '💚',
  season: '🌸',
  discount: '🏷️',
};


export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const { isTenantMode, agent } = useAgent();
  
  const [packageData, setPackageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // Fetch package details
  useEffect(() => {
    if (!id) return;
    
    // Always try to fetch first
    setIsLoading(true);
    fetch(`${API_BASE}/api/public/package/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Normalize API data to match frontend expectations
          const pkg = data.data;
          setPackageData({
            title: pkg.title,
            location: pkg.location,
            price: pkg.discountedPrice || pkg.originalPrice,
            originalPrice: pkg.originalPrice,
            duration: pkg.duration,
            badges: pkg.badges || [],
            images: [pkg.imageUrl1, pkg.imageUrl2].filter(Boolean),
            rating: 4.8, // Mock
            reviews: 124, // Mock
            description: pkg.description,
            itinerary: (pkg.itinerary || []).map((i: any) => ({
              day: i.dayNumber,
              title: i.title,
              description: i.description
            })),
            inclusions: pkg.inclusions || [],
            exclusions: pkg.exclusions || [],
          });
        } else {
          // Fallback to mock if API fails (useful for local testing without DB setup)
          setPackageData(packageDetails[id] || packageDetails['1']);
        }
      })
      .catch(() => {
        setPackageData(packageDetails[id] || packageDetails['1']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // Simple scroll-based sticky bar for mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const footer = document.querySelector('footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;

      if (scrollY > 300 && footerTop > window.innerHeight) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppShare = () => {
    if (!packageData) return;
    const phone = isTenantMode && agent?.whatsapp ? agent.whatsapp : '911234567890';
    const message = `Check out this amazing travel package: ${packageData.title} - ${packageData.location}. Price: ₹${packageData.price.toLocaleString()}. ${window.location.href}`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleGetQuote = () => {
    setShowQuoteModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
        <Topbar />
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--theme-primary)]" />
          <p className="text-gray-500 font-medium">Loading package details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Topbar />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[var(--theme-primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Packages</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Package Info Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-3">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{packageData.location}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {packageData.title}
              </h1>
              {/* Badges */}
              {packageData.badges && packageData.badges.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {packageData.badges.map((badge: string) => (
                    <span
                      key={badge}
                      className={`inline-flex items-center gap-1.5 ${getBadgeStyles(badge)} px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md`}
                    >
                      <span>{BADGE_ICONS[badge] || ''}</span>
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white px-4 py-2 rounded-full shadow-md">
                  <Star className="w-4 h-4 fill-white" />
                  <span className="font-bold">{packageData.rating}</span>
                  <span className="text-sm opacity-90">({packageData.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">{packageData.duration}</span>
                </div>
              </div>
            </div>

            {/* Hero Image — NO favourite icon, only WhatsApp share */}
            <div className="relative h-96 rounded-2xl overflow-hidden mb-6">
              <img
                src={packageData.images[0]}
                alt={packageData.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 ">
                <button
                  onClick={handleWhatsAppShare} 
                  className="px-2.5 py-3 bg-green-500 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <FontAwesomeIcon icon={faWhatsapp} size="2x" className=" text-white" />
                </button>
              </div>
            </div>

            {/* Package Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {packageData.description}
              </p>
            </div>

            {/* Itinerary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Day-wise Itinerary</h2>
              <div className="space-y-6">
                {packageData.itinerary.map((item: any) => (
                  <div key={item.day} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[var(--theme-primary)] text-white rounded-full flex items-center justify-center font-bold">
                      {item.day}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 lg:mb-0">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Inclusions</h3>
                <ul className="space-y-2">
                  {packageData.inclusions.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Exclusions</h3>
                <ul className="space-y-2">
                  {packageData.exclusions.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-4 h-4 text-red-600 flex-shrink-0 mt-1">✕</span>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card (Desktop) */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Starting from</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-[var(--theme-primary)]">
                    ₹{packageData.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 mb-1">per person</span>
                </div>
              </div>

             

              <button
                onClick={handleGetQuote}
                className="w-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] hover:shadow-lg text-white font-semibold py-4 rounded-lg transition-all mb-3"
              >
                Get Quote
              </button>
              
              <button
                onClick={handleWhatsAppShare}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                Share on WhatsApp
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Our travel experts are available 24/7 to assist you
                </p>
                <a
                  href={`tel:${isTenantMode && agent?.whatsapp ? agent.whatsapp : '+91 123 456 7890'}`}
                  className="text-[var(--theme-primary)] font-semibold hover:underline"
                >
                  {isTenantMode && agent?.whatsapp ? agent.whatsapp : '+91 123 456 7890'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ Sticky Get Quote Bar — MOBILE ONLY ━━━ */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-300 ease-out ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] px-4 py-3">
          <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
            <div className="min-w-0">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Starting from</p>
              <p className="text-lg font-bold text-[var(--theme-primary)] leading-tight">
                ₹{packageData.price.toLocaleString()}
                <span className="text-[10px] font-normal text-gray-500 dark:text-gray-400 ml-1">/ person</span>
              </p>
            </div>
            <button
              onClick={handleGetQuote}
              className="bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm flex-shrink-0 active:scale-95"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>

      <Footer />
      {/* Chatbot hidden on package detail pages */}
      <ChatbotButton hidden />

      {/* Get Quote Modal */}
      <PlanTourModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
        preselectedPackage={{
          title: packageData.title,
          location: packageData.location,
          price: packageData.price,
          duration: packageData.duration,
        }}
      />
    </div>
  );
}