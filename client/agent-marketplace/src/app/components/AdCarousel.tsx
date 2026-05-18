import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAgent } from '../context/AgentContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fallback hardcoded slides for non-tenant / empty state
const defaultAds = [
  { id: 1, title: 'SUMMER SPECIAL - 40% OFF', subtitle: 'Book your dream vacation now!', bgColor: 'from-orange-500 to-pink-500' },
  { id: 2, title: 'FAMILY PACKAGES AVAILABLE', subtitle: 'Travel together, save together', bgColor: 'from-purple-500 to-indigo-500' },
  { id: 3, title: 'EARLY BIRD OFFER', subtitle: 'Book 3 months in advance & save 30%', bgColor: 'from-green-500 to-teal-500' },
  { id: 4, title: 'HONEYMOON SPECIAL', subtitle: 'Romantic getaways at best prices', bgColor: 'from-red-500 to-pink-500' },
];

const bgGradients = [
  'from-orange-500 to-pink-500',
  'from-purple-500 to-indigo-500',
  'from-green-500 to-teal-500',
  'from-red-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-amber-500 to-orange-500',
];

export function AdCarousel() {
  const { banners, isTenantMode } = useAgent();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use promotional banners from API if available, else default slides
  const promoSlides = isTenantMode
    ? banners.filter(b => b.bannerType === 'promotional')
    : [];

  const hasApiSlides = promoSlides.length > 0;
  const total = hasApiSlides ? promoSlides.length : defaultAds.length;

  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  const goToPrevious = () => setCurrentIndex(prev => (prev - 1 + total) % total);
  const goToNext = () => setCurrentIndex(prev => (prev + 1) % total);

  // Don't render if tenant mode has no promotional banners
  if (isTenantMode && !hasApiSlides) return null;

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl shadow-lg" style={{ aspectRatio: '5/1' }}>
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {hasApiSlides
              ? promoSlides.map((slide, i) => (
                <div
                  key={slide._id}
                  className={`min-w-full h-full flex flex-col items-center justify-center text-white px-4 relative overflow-hidden bg-gradient-to-r ${bgGradients[i % bgGradients.length]}`}
                >
                  {slide.imageUrl && (
                    <img
                      src={`${API_BASE}/uploads/banners/${slide.imageUrl}`}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="relative z-10 text-center">
                    {slide.title && <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-md">{slide.title}</h3>}
                    {slide.subtitle && <p className="text-base md:text-lg opacity-90 drop-shadow">{slide.subtitle}</p>}
                  </div>
                  {slide.imageUrl && <div className="absolute inset-0 bg-black/30" />}
                </div>
              ))
              : defaultAds.map(ad => (
                <div
                  key={ad.id}
                  className={`min-w-full h-full bg-gradient-to-r ${ad.bgColor} flex flex-col items-center justify-center text-white px-4`}
                >
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{ad.title}</h3>
                  <p className="text-base md:text-lg lg:text-xl opacity-90">{ad.subtitle}</p>
                </div>
              ))}
          </div>

          {total > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {Array.from({ length: total }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}