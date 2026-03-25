import { useTheme } from '../context/ThemeContext';

export function StripCarousel() {
  const { color } = useTheme();
  
  const features = [
    "Travel for Every Age Group",
    "Fully Customizable Holiday Packages",
    "India's Favourite Travel Brand",
    "Safe, Seamless Travel for Every Age Group",
    "Fully Customizable Holiday Packages",
    "Best Price Guarantee",
    "24/7 Customer Support",
    "Expert Travel Agents",
  ];

  // Get theme-specific colors
  const themeColors = {
    navy: { bg: 'from-blue-900 to-blue-950', dot: 'text-blue-400', dotGlow: 'shadow-blue-400/50' },
    red: { bg: 'from-red-900 to-orange-900', dot: 'text-orange-400', dotGlow: 'shadow-orange-400/50' },
    cyan: { bg: 'from-cyan-900 to-blue-900', dot: 'text-cyan-400', dotGlow: 'shadow-cyan-400/50' },
  };

  const theme = themeColors[color];

  return (
    <div className={`bg-gradient-to-r ${theme.bg} dark:from-black dark:to-gray-900 border-t border-white/10 overflow-hidden relative py-3`}>
      {/* Gradient overlays for fade effect */}
      <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r ${theme.bg} to-transparent z-10 pointer-events-none`}></div>
      <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l ${theme.bg} to-transparent z-10 pointer-events-none`}></div>
      
      <div className="flex animate-scroll whitespace-nowrap">
        {/* First set */}
        {features.map((feature, index) => (
          <div
            key={`first-${index}`}
            className="inline-flex items-center px-8"
          >
            <span className={`${theme.dot} mr-3 text-lg drop-shadow-lg ${theme.dotGlow}`}>●</span>
            <span className="text-white font-medium text-sm tracking-wide">{feature}</span>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {features.map((feature, index) => (
          <div
            key={`second-${index}`}
            className="inline-flex items-center px-8"
          >
            <span className={`${theme.dot} mr-3 text-lg drop-shadow-lg ${theme.dotGlow}`}>●</span>
            <span className="text-white font-medium text-sm tracking-wide">{feature}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}