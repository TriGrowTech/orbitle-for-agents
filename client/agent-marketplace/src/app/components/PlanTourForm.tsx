import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Users, MessageSquare, Send, CheckCircle, Globe, Shield, Clock } from 'lucide-react';

export function PlanTourForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    date: '',
    guests: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you shortly.');
  };

  const highlights = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Worldwide Destinations',
      desc: 'From the beaches of Maldives to the mountains of Himachal — we cover it all.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Fully Customized',
      desc: 'Every itinerary is built around your preferences, budget, and travel style.',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: 'Quick Response',
      desc: 'Our travel experts get back to you within 24 hours with a tailored plan.',
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: 'End-to-End Support',
      desc: 'Flights, hotels, transfers, visa — we handle everything so you don\'t have to.',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Guidance Text */}
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold tracking-widest text-[var(--theme-primary)] uppercase mb-3">
              Custom Tour Planner
            </p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-5">
              Let Us Plan Your <span className="text-[var(--theme-primary)]">Dream Trip</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10">
              Share a few details about your travel plans and our experts will craft a personalised itinerary just for you — no cookie-cutter packages, just experiences made for you.
            </p>

            <div className="space-y-6">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-2xl border border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/5">
              <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                "We've helped <span className="font-semibold text-[var(--theme-primary)]">10,000+ travellers</span> plan their perfect holiday. Fill in the form and let us take care of the rest."
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-[var(--theme-primary)] transition-colors">
                    <User className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-[var(--theme-primary)] transition-colors">
                    <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-[var(--theme-primary)] transition-colors">
                    <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Destination *
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-[var(--theme-primary)] transition-colors">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-sm"
                      placeholder="Maldives"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Travel Date *
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-[var(--theme-primary)] transition-colors">
                    <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Guests *
                  </label>
                  <div className="flex items-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-[var(--theme-primary)] transition-colors">
                    <Users className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <select
                      required
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full text-sm"
                    >
                      <option value="">Select guests</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5+">5+ Guests</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Requirements
                </label>
                <div className="flex items-start gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:border-[var(--theme-primary)] transition-colors">
                  <MessageSquare className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="bg-transparent border-none outline-none text-gray-900 dark:text-white w-full resize-none text-sm"
                    placeholder="Tell us about your preferences, budget, activities you'd like..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--theme-primary)] hover:bg-[var(--theme-primary-dark)] text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-5 h-5" />
                Submit Request
              </button>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
                By submitting, you agree to our{' '}
                <a href="#" className="text-[var(--theme-primary)] hover:underline">Privacy Policy</a>.
                We never share your details.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}