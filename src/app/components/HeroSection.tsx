import { Search, MapPin, Calendar, Users, Plane, Hotel, Ship, Briefcase, Mountain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';
import { StripCarousel } from './StripCarousel';

export function HeroSection() {
  const { color } = useTheme();
  const [activeTab, setActiveTab] = useState('packages');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background images for carousel
  const backgroundImages = {
    navy: [
      'https://images.unsplash.com/photo-1765978372751-aa89dc6d30e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcmVzb3J0JTIwdmFjYXRpb258ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhcmFkaXNlJTIwaXNsYW5kfGVufDF8fHx8MTc3NDQzNDAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBzY2VuaWN8ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    red: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMHRyYXZlbHxlbnwxfHx8fDE3NzQ0MzQwMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMHBlYWt8ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBzY2VuaWN8ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    cyan: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHBhcmFkaXNlJTIwaXNsYW5kfGVufDF8fHx8MTc3NDQzNDAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMG9jZWFuJTIwd2F2ZXN8ZW58MXx8fHwxNzc0NDM0MDI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbmQlMjB0cm9waWNhbCUyMGJlYWNofGVufDF8fHx8MTc3NDQzNDAyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  };

  const images = backgroundImages[color];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const tabs = [
    { id: 'packages', icon: Mountain, label: 'Packages' },
    { id: 'flights', icon: Plane, label: 'Flights' },
    { id: 'hotels', icon: Hotel, label: 'Hotels' },
    { id: 'cruise', icon: Ship, label: 'Cruise' },
  ];

  // Navy: Classic centered layout with tabs
  if (color === 'navy') {
    return (
      <section className="relative h-[750px] flex items-center justify-center overflow-hidden">
        {/* Background Images with Carousel */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/85 via-blue-900/70 to-blue-900/90"></div>
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center w-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-4 leading-tight tracking-tight">
            Book India & International
            <span className="block text-blue-300 mt-2">Holiday Tour Packages</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Explore the world with our curated travel experiences
          </p>

          {/* Tab Navigation */}
          <div className="max-w-5xl mx-auto mb-6">
            <div className="flex items-center justify-center gap-2 bg-blue-900/60 backdrop-blur-sm p-2 rounded-t-2xl">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-900 shadow-lg'
                        : 'text-white hover:bg-blue-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Bar */}
            <div className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg rounded-b-2xl shadow-2xl p-8 border-t-4 border-blue-500">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs uppercase tracking-wide font-medium text-gray-600 dark:text-gray-400 mb-2">
                    📍 Destination
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors">
                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide font-medium text-gray-600 dark:text-gray-400 mb-2">
                    📅 Departure Date
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors">
                    <input
                      type="date"
                      className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide font-medium text-gray-600 dark:text-gray-400 mb-2">
                    👥 Travellers
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors">
                    <select className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full">
                      <option>2 Adults</option>
                      <option>1 Adult</option>
                      <option>3 Adults</option>
                      <option>4+ Adults</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl text-base">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (color === 'red') {
    return (
      <section className="relative h-[750px] flex items-end overflow-hidden">
        {/* Background Images with Carousel */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-900/95 via-orange-900/80 to-transparent"></div>
          </div>
        ))}

        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-20 w-full">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 rounded-full shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-semibold tracking-wider uppercase">Experience the Soul of</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 leading-none">
              Paradise
              <span className="block text-transparent bg-gradient-to-r from-orange-300 via-red-300 to-pink-300 bg-clip-text">Destinations</span>
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 mb-10 leading-relaxed font-light">
              Rich culture, vibrant beauty, and breathtaking adventures await
            </p>

            {/* Compact Search */}
            <div className="bg-black/50 dark:bg-black/70 backdrop-blur-2xl rounded-2xl shadow-2xl p-6 border border-red-500/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                  <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Destination"
                    className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-300 text-sm font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                  <Calendar className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <input
                    type="date"
                    className="bg-transparent border-none outline-none text-white w-full text-sm font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 p-3 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                  <Users className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <select className="bg-transparent border-none outline-none text-white w-full text-sm font-medium">
                    <option className="bg-gray-900">1 Guest</option>
                    <option className="bg-gray-900">2 Guests</option>
                    <option className="bg-gray-900">3 Guests</option>
                    <option className="bg-gray-900">4+ Guests</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-red-500/50 transform hover:scale-105 text-lg uppercase">
                <Search className="w-5 h-5" />
                VIEW PACKAGES
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Cyan theme - Side form like Veena World
  return (
    <section className="relative h-[750px] flex items-center overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-900 dark:to-cyan-900/20">
      <div
        className="absolute top-0 right-0 w-3/5 h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cyan-500/10 to-cyan-50 dark:to-gray-900"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-semibold text-gray-900 dark:text-white mb-6 leading-tight">
            Tour Packages
            <span className="block text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text mt-2">From Your City!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            Air Inclusive travel packages departing from Your City!
          </p>

          {/* Quick Search */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Planning a tour? Get in touch with us.</h3>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name*"
                  className="w-full p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800 outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Mobile No.*"
                  className="w-full p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800 outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address*"
                  className="w-full p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border-2 border-cyan-200 dark:border-cyan-800 outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-yellow-500/50">
                Request Call Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}