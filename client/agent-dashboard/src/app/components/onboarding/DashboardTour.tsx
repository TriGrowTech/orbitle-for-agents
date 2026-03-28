import { useState } from 'react';
import { Check, Package, Users, Settings, CreditCard, Sparkles, TrendingUp } from 'lucide-react';

interface DashboardTourProps {
  onNext: () => void;
  onSkip: () => void;
}

export function DashboardTour({ onNext, onSkip }: DashboardTourProps) {
  const features = [
    {
      icon: Package,
      title: 'Packages Management',
      description: 'Create unlimited travel packages with beautiful layouts',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Leads & Enquiries',
      description: 'Track and manage all customer enquiries in one place',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Settings,
      title: 'Website Customization',
      description: 'Personalize colors, content, and branding anytime',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: TrendingUp,
      title: 'SEO & Analytics',
      description: 'Track website visitors and optimize for search engines',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/30">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">You're all set! 🎉</h2>
        <p className="text-lg text-gray-600">Here's what you can do with your admin panel</p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Completion checklist */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Setup Complete!</h3>
            <p className="text-sm text-gray-600">You've activated all essential features</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Website created & live</p>
              <p className="text-sm text-gray-600">Your travel website is accessible online</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">First package published</p>
              <p className="text-sm text-gray-600">Ready to showcase to customers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Enquiry system tested</p>
              <p className="text-sm text-gray-600">Know how to manage customer leads</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Admin panel ready</p>
              <p className="text-sm text-gray-600">Full control over your online business</p>
            </div>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">🚀 Recommended Next Steps</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Add 2-3 more packages</p>
              <p className="text-sm text-gray-600">More packages = More customer interest</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Customize your branding</p>
              <p className="text-sm text-gray-600">Make it uniquely yours with colors & content</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Share your website</p>
              <p className="text-sm text-gray-600">Post on social media & WhatsApp groups</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">4</span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Connect custom domain (optional)</p>
              <p className="text-sm text-gray-600">Use your own domain name for professional look</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trial info */}
      <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Your 7-day free trial has started</h3>
            <p className="text-sm text-gray-700 mb-3">
              Explore all features with no credit card required. You can upgrade anytime to continue after the trial.
            </p>
            <p className="text-xs text-gray-600">
              Trial expires on: <strong>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { dateStyle: 'long' })}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
