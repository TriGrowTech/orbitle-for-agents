import { Check, Zap, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Monthly',
    price: '₹499',
    perDay: '₹17/day',
    billing: 'Billed monthly',
    tagline: 'Start anytime',
    savings: null,
    badge: null,
    popular: false,
    features: [
      'Travel marketplace website',
      'Full admin panel',
      'Bring your own domain',
      'Package management',
      'Enquiry tracking & pipeline',
      '1-week free trial',
    ],
    buttonText: 'Get Started',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: '6 Months',
    price: '₹2,499',
    perDay: '₹14/day',
    billing: 'Save ₹495',
    tagline: 'Save 17%',
    savings: '17%',
    badge: null,
    popular: false,
    features: [
      'Everything in Monthly',
      'Domain included (free for 6 months)',
      'Priority email support',
      'Package management',
      'Enquiry tracking & pipeline',
      '1-week free trial',
    ],
    buttonText: 'Get Started',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Yearly',
    price: '₹3,999',
    perDay: '₹11/day',
    billing: 'Save ₹1,989',
    tagline: 'Save 33%',
    savings: '33%',
    badge: 'Most Popular',
    popular: true,
    features: [
      'Everything in 6-Month',
      'Domain included (free for 6 months)',
      'Priority WhatsApp support',
      'Quarterly content updates',
      'SEO meta setup included',
      '1-week free trial',
    ],
    buttonText: 'Get Started',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Lifetime',
    price: '₹9,999',
    perDay: 'One-time',
    billing: 'Pay once, yours forever',
    tagline: '78 spots left',
    savings: null,
    badge: null,
    popular: false,
    features: [
      'Everything in Yearly',
      'Domain included (free for 6 months)',
      'Dedicated support',
      'Ongoing content updates',
      'First access to new features',
      'No renewal. Ever.',
    ],
    buttonText: 'Claim Lifetime',
    gradient: 'from-orange-500 to-red-500',
  },
];

export function Pricing() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
          <Zap className="w-4 h-4" />
          Flexible Pricing Plans
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-lg text-gray-600">
          Start with a free trial. Scale as you grow. No hidden fees.
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Current Plan</p>
            <h3 className="text-2xl font-bold">Yearly Plan</h3>
            <p className="text-blue-100 mt-1">Active until March 27, 2027</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-medium">
              Manage Plan
            </button>
            <button className="px-5 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all font-medium border border-white/30">
              View Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-white/80 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 overflow-hidden group hover:shadow-2xl ${
              plan.popular 
                ? 'border-purple-500 shadow-xl shadow-purple-500/20 scale-105' 
                : 'border-gray-200/50 hover:border-blue-300'
            }`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1.5 rounded-bl-xl rounded-tr-xl text-xs font-bold shadow-lg">
                {plan.badge}
              </div>
            )}

            {/* Gradient Top Bar */}
            <div className={`h-2 bg-gradient-to-r ${plan.gradient}`}></div>

            <div className="p-6">
              {/* Plan Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              
              {/* Tagline */}
              <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold mb-4 ${
                plan.savings 
                  ? 'bg-green-100 text-green-700 ring-1 ring-green-600/20' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {plan.tagline}
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.perDay} · {plan.billing}</p>
              </div>

              {/* CTA Button */}
              <button className={`w-full px-4 py-3 bg-gradient-to-r ${plan.gradient} text-white rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 font-semibold mb-6 group-hover:scale-105`}>
                {plan.buttonText}
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Domain Renewal Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm font-bold">ℹ</span>
          </div>
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">Domain Renewal Policy</h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Free domain is provided for the <strong>1 year only</strong>. After 1 year, domain renewal charges will apply to all plans (6 Months, Yearly, and Lifetime). Domain renewal costs are separate from the subscription plan.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h3>
            <p className="text-sm text-gray-600">Yes, you can cancel your subscription anytime. No questions asked.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
            <p className="text-sm text-gray-600">We offer a 7-day money-back guarantee for all monthly plans.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade my plan?</h3>
            <p className="text-sm text-gray-600">Yes, you can upgrade anytime and only pay the difference.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
            <p className="text-sm text-gray-600">We accept all major credit cards, debit cards, UPI, and net banking.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Need a custom plan?</h2>
        <p className="text-gray-600 mb-4">
          Contact us for enterprise solutions and custom pricing
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
          Contact Sales
        </button>
      </div>
    </div>
  );
}