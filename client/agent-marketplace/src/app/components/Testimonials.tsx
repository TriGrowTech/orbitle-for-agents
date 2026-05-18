import { useState, useCallback, useEffect, useMemo } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useAgent } from '../context/AgentContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const gradientPairs = [
  { from: 'from-blue-500', to: 'to-cyan-400' },
  { from: 'from-purple-500', to: 'to-pink-400' },
  { from: 'from-green-500', to: 'to-emerald-400' },
  { from: 'from-orange-500', to: 'to-amber-400' },
  { from: 'from-rose-500', to: 'to-red-400' },
  { from: 'from-indigo-500', to: 'to-blue-400' },
  { from: 'from-teal-500', to: 'to-cyan-400' },
  { from: 'from-sky-500', to: 'to-blue-400' },
];

const defaultTestimonials = [
  {
    name: 'Priya Sharma', destination: 'Maldives', rating: 5,
    review: 'Absolutely magical experience! The water villa was breathtaking, and the team planned every detail perfectly. From sunset cruises to snorkeling — everything was world-class.',
    date: 'Mar 2026', initials: 'PS', gradientFrom: 'from-blue-500', gradientTo: 'to-cyan-400',
  },
  {
    name: 'Rahul Mehta', destination: 'Switzerland', rating: 5,
    review: 'Our honeymoon in Switzerland was a dream come true. The scenic train rides, chocolate factories, and mountain views were unforgettable. Highly recommend!',
    date: 'Feb 2026', initials: 'RM', gradientFrom: 'from-purple-500', gradientTo: 'to-pink-400',
  },
  {
    name: 'Anjali Desai', destination: 'Kerala', rating: 5,
    review: 'The Kerala backwaters tour was pure bliss. Houseboat stay, Ayurvedic spa, and the food — oh the food! Everything was arranged seamlessly. Will book again!',
    date: 'Jan 2026', initials: 'AD', gradientFrom: 'from-green-500', gradientTo: 'to-emerald-400',
  },
  {
    name: 'Vikram Singh', destination: 'Dubai', rating: 4,
    review: 'Dubai was spectacular! Desert safari, Burj Khalifa, and the shopping — all perfectly planned. The hotel upgrade was a lovely surprise. Great value for money.',
    date: 'Dec 2025', initials: 'VS', gradientFrom: 'from-orange-500', gradientTo: 'to-amber-400',
  },
  {
    name: 'Sneha Patel', destination: 'Bali', rating: 5,
    review: 'Bali exceeded all expectations! The private villa, temple visits, and rice terrace trek were incredible. Best vacation of my life.',
    date: 'Nov 2025', initials: 'SP', gradientFrom: 'from-rose-500', gradientTo: 'to-red-400',
  },
  {
    name: 'Arjun Kapoor', destination: 'Ladakh', rating: 5,
    review: 'Ladakh was an adventure of a lifetime. From Pangong Lake to Nubra Valley, every moment was breathtaking. The team handled all permits and logistics flawlessly.',
    date: 'Oct 2025', initials: 'AK', gradientFrom: 'from-indigo-500', gradientTo: 'to-blue-400',
  },
];

export function Testimonials() {
  const { subdomain, isTenantMode } = useAgent();
  const [apiTestimonials, setApiTestimonials] = useState<any[] | null>(null);

  // Fetch from public API when in tenant mode
  useEffect(() => {
    if (!isTenantMode || !subdomain) return;
    fetch(`${API_BASE}/api/public/testimonials/${subdomain}`)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data?.length > 0) {
          setApiTestimonials(data.data);
        }
      })
      .catch(() => {});
  }, [subdomain, isTenantMode]);

  // Map API testimonials to display format, or use defaults
  const testimonials = useMemo(() => {
    if (apiTestimonials && apiTestimonials.length > 0) {
      return apiTestimonials.map((t, i) => {
        const gradient = gradientPairs[i % gradientPairs.length];
        const initials = t.customerName.split(' ').map((n: string) => n[0]).join('').toUpperCase();
        return {
          name: t.customerName,
          destination: t.destination || '',
          rating: t.rating || 5,
          review: t.review,
          date: new Date(t.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          initials,
          gradientFrom: gradient.from,
          gradientTo: gradient.to,
        };
      });
    }
    return defaultTestimonials;
  }, [apiTestimonials]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const visibleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goNext]);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--theme-primary)]/10 rounded-full mb-4">
            <Quote className="w-4 h-4 text-[var(--theme-primary)]" />
            <span className="text-sm font-semibold text-[var(--theme-primary)] uppercase tracking-wider">Traveller Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our <span className="text-transparent bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] bg-clip-text">Travellers Say</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real experiences from real travellers who explored the world with us
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[var(--theme-primary)] hover:text-white transition-all border border-gray-200 dark:border-gray-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[var(--theme-primary)] hover:text-white transition-all border border-gray-200 dark:border-gray-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-8">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
                    {/* Quote Icon */}
                    <div className="mb-4">
                      <Quote className="w-8 h-8 text-[var(--theme-primary)]/20" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                      "{testimonial.review}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className={`w-11 h-11 bg-gradient-to-br ${testimonial.gradientFrom} ${testimonial.gradientTo} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.destination && <>Travelled to <span className="text-[var(--theme-primary)] font-medium">{testimonial.destination}</span> · </>}{testimonial.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 bg-[var(--theme-primary)]'
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
