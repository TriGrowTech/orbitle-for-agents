import { useState, useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import exampleImage from "figma:asset/7202b305d8d4ac078d528aa37bceafaf6743aa87.png";

export function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    // Check if user has already seen the modal in this session
    const hasSeenModal = sessionStorage.getItem('leadCaptureShown');
    
    if (!hasSeenModal) {
      // Show modal after 7 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 7000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('leadCaptureShown', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Lead captured:', formData);
    
    // Show success message (you could add a toast notification)
    alert('Thank you! Our team will contact you soon.');
    
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header with gradient and travel illustration */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white px-6 py-8 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-6">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5L25 15L30 5L25 10L30 15L20 10L10 15L15 10L10 5L15 15L20 5Z" fill="white"/>
              </svg>
            </div>
            <div className="absolute top-4 right-8">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5L25 15L30 5L25 10L30 15L20 10L10 15L15 10L10 5L15 15L20 5Z" fill="white"/>
              </svg>
            </div>
          </div>

          {/* Illustration - use the provided image or travel SVG */}
          <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M0 50L60 45C120 40 240 30 360 35C480 40 600 60 720 65C840 70 960 60 1080 55C1200 50 1320 50 1380 50L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
            </svg>
          </div>

          {/* Traveler illustrations - smaller */}
          <div className="absolute bottom-4 left-8 opacity-90 scale-75">
            <div className="w-10 h-10 bg-yellow-400 rounded-full"></div>
            <div className="w-6 h-8 bg-white rounded-t-full mt-1 mx-auto"></div>
            <div className="w-5 h-6 bg-orange-500 rounded mx-auto -mt-2"></div>
          </div>
          
          <div className="absolute bottom-4 right-8 opacity-90 scale-75">
            <div className="flex gap-1">
              <div>
                <div className="w-8 h-8 bg-pink-300 rounded-full"></div>
                <div className="w-6 h-7 bg-white rounded-t-full mt-1 mx-auto"></div>
              </div>
              <div>
                <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
                <div className="w-6 h-7 bg-white rounded-t-full mt-1 mx-auto"></div>
              </div>
            </div>
            <div className="flex gap-1 justify-center -mt-2">
              <div className="w-4 h-6 bg-red-400 rounded"></div>
              <div className="w-4 h-6 bg-purple-400 rounded"></div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 hover:bg-white/20 rounded-full transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title - smaller text */}
          <div className="text-center relative z-10">
            <h2 className="text-xl font-semibold mb-2 leading-snug" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Scrolling is fun, but travelling is better.<br />
              Leave your number, and let's get<br />
              you packing!
            </h2>
          </div>
        </div>

        {/* Form - more compact */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-gray-50 dark:bg-gray-800">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name*"
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all text-sm"
            />
          </div>

          {/* Phone with country code */}
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 ml-1">
              Mobile No.*
            </label>
            <div className="flex gap-2">
              {/* Country Code Selector */}
              <div className="relative flex items-center bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg px-2 py-3">
                <span className="text-xl mr-1">🇮🇳</span>
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Phone Input */}
              <div className="flex-1 relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all text-sm"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none text-sm">
                  +91
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button - smaller */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold py-3 rounded-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4" />
            Request Call Back
          </button>

          {/* Privacy note */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
            We respect your privacy. Your information is safe with us.
          </p>
        </form>
      </div>
    </div>
  );
}