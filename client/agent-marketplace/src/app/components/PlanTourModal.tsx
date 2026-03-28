import { X, MapPin, Calendar, Users, Phone, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface PlanTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlanTourModal({ isOpen, onClose }: PlanTourModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    startDate: '',
    duration: '',
    travelers: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    alert('Thank you! We will contact you soon.');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Plan Your Dream Tour</h2>
            <p className="text-blue-100">Fill in the details and our travel experts will craft the perfect itinerary for you</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 max-h-[calc(90vh-200px)] overflow-y-auto">
          {/* Left Side - Features */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Expert Travel Agents</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Professional agents with 10+ years experience in curating perfect journeys</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Best Price Guarantee</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get the best deals with our price match promise and exclusive offers</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">24/7 Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Round-the-clock assistance before, during, and after your trip</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">Customized Packages</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Tailor-made itineraries designed exclusively for your preferences</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Quick Response</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Get a detailed quote within 24 hours with personalized recommendations
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold">
                <Phone className="w-4 h-4" />
                <span>Call: +91 123 456 7890</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Email Address*
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Phone Number*
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Destination*
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Maldives, Dubai, Paris"
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Start Date*
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="">Select duration</option>
                    <option value="1-3">1-3 Days</option>
                    <option value="4-6">4-6 Days</option>
                    <option value="7-10">7-10 Days</option>
                    <option value="10+">10+ Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                    >
                      <option value="">Select travelers</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3-4">3-4 People</option>
                      <option value="5-6">5-6 People</option>
                      <option value="7+">7+ People</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                    Budget (₹)
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                  >
                    <option value="">Select budget</option>
                    <option value="<50000">Under ₹50,000</option>
                    <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                    <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000+">₹2,00,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  Additional Requirements
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your preferences, special requirements, or any specific requests..."
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[var(--theme-primary)] focus:bg-white dark:focus:bg-gray-900 outline-none transition-all resize-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--theme-primary)] to-[var(--theme-secondary)] text-white font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
              >
                <Send className="w-5 h-5" />
                Submit Tour Request
              </button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                By submitting this form, you agree to our Terms & Conditions and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}