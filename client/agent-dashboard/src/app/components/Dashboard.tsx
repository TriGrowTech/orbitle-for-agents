import { useState, useEffect } from 'react';
import { TrendingUp, MessageCircle, Package, Users, ArrowUpRight, ArrowDownRight, Clock, Zap } from 'lucide-react';
import { WelcomeScreen } from './WelcomeScreen';
import { OnboardingWizard } from './OnboardingWizard';

const stats = [
  { name: 'Total Leads', value: '127', change: '+12%', icon: Users, color: 'blue', trend: 'up' },
  { name: 'WhatsApp Clicks', value: '342', change: '+23%', icon: MessageCircle, color: 'green', trend: 'up' },
  { name: 'Package Enquiries', value: '89', change: '+8%', icon: Package, color: 'purple', trend: 'up' },
  { name: 'Conversion Rate', value: '24%', change: '+5%', icon: TrendingUp, color: 'orange', trend: 'up' },
];

const topPackages = [
  { name: 'Bali Paradise - 7D/6N', enquiries: 45, price: '₹45,000', trend: '+12%' },
  { name: 'Dubai Delight - 5D/4N', enquiries: 38, price: '₹38,000', trend: '+8%' },
  { name: 'Maldives Escape - 6D/5N', enquiries: 32, price: '₹85,000', trend: '+15%' },
  { name: 'Thailand Adventure - 8D/7N', enquiries: 28, price: '₹42,000', trend: '+5%' },
];

const recentEnquiries = [
  { name: 'Rahul Sharma', destination: 'Bali', travelers: 2, date: '2026-03-25', status: 'new', time: '2h ago' },
  { name: 'Priya Patel', destination: 'Dubai', travelers: 4, date: '2026-03-25', status: 'contacted', time: '4h ago' },
  { name: 'Amit Kumar', destination: 'Maldives', travelers: 2, date: '2026-03-24', status: 'new', time: '1d ago' },
  { name: 'Sneha Reddy', destination: 'Thailand', travelers: 3, date: '2026-03-24', status: 'contacted', time: '1d ago' },
  { name: 'Vikram Singh', destination: 'Singapore', travelers: 5, date: '2026-03-23', status: 'new', time: '2d ago' },
];

export function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if this is first time user (in real app, this would check localStorage or API)
    const isFirstTime = localStorage.getItem('orbitle_onboarding_complete') !== 'true';
    
    if (isFirstTime) {
      setShowWelcome(true);
    }
  }, []);

  const handleStartOnboarding = () => {
    setShowWelcome(false);
    setShowOnboarding(true);
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('orbitle_onboarding_complete', 'true');
  };

  return (
    <>
      {/* Welcome Screen */}
      <WelcomeScreen isOpen={showWelcome} onStart={handleStartOnboarding} />

      {/* Onboarding Wizard */}
      <OnboardingWizard isOpen={showOnboarding} onComplete={handleCompleteOnboarding} />

      {/* Dashboard Content */}
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const gradients = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-emerald-600',
              purple: 'from-purple-500 to-purple-600',
              orange: 'from-orange-500 to-red-500',
            }[stat.color];

            const shadows = {
              blue: 'shadow-blue-500/30',
              green: 'shadow-green-500/30',
              purple: 'shadow-purple-500/30',
              orange: 'shadow-orange-500/30',
            }[stat.color];

            return (
              <div key={stat.name} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-4 shadow-sm hover:shadow-lg transition-all duration-200 group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradients} flex items-center justify-center shadow-md ${shadows}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Top Performing Packages */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-200">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Top Performing Packages</h2>
                <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View All</span>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {topPackages.map((pkg, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/30">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{pkg.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-600">{pkg.enquiries} enquiries</span>
                        <span className="text-xs font-medium text-green-600">{pkg.trend}</span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{pkg.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Enquiries */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-200">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Recent Enquiries</h2>
                <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">View All</span>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {recentEnquiries.map((enquiry, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                      {enquiry.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 group-hover:text-green-600 transition-colors truncate">{enquiry.name}</p>
                      <p className="text-sm text-gray-600 truncate">
                        {enquiry.destination} • {enquiry.travelers} travelers
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold mb-1 ${
                        enquiry.status === 'new' 
                          ? 'bg-green-100 text-green-700 ring-1 ring-green-600/20' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {enquiry.status === 'new' ? '🆕' : '✓'}
                      </span>
                      <p className="text-xs text-gray-500">{enquiry.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}