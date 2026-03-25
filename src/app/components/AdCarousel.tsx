import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ads = [
  {
    id: 1,
    title: 'SUMMER SPECIAL - 40% OFF',
    subtitle: 'Book your dream vacation now!',
    bgColor: 'from-orange-500 to-pink-500',
  },
  {
    id: 2,
    title: 'FAMILY PACKAGES AVAILABLE',
    subtitle: 'Travel together, save together',
    bgColor: 'from-purple-500 to-indigo-500',
  },
  {
    id: 3,
    title: 'EARLY BIRD OFFER',
    subtitle: 'Book 3 months in advance & save 30%',
    bgColor: 'from-green-500 to-teal-500',
  },
  {
    id: 4,
    title: 'HONEYMOON SPECIAL',
    subtitle: 'Romantic getaways at best prices',
    bgColor: 'from-red-500 to-pink-500',
  },
];

export function AdCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ads.length);
  };

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-md" style={{ aspectRatio: '5/1' }}>
          <div
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {ads.map((ad) => (
              <div
                key={ad.id}
                className={`min-w-full h-full bg-gradient-to-r ${ad.bgColor} flex flex-col items-center justify-center text-white px-4`}
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{ad.title}</h3>
                <p className="text-base md:text-lg lg:text-xl opacity-90">{ad.subtitle}</p>
              </div>
            ))}
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}