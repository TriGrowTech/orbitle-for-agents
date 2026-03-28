import { useState } from 'react';
import { FileCheck, Shield, Save } from 'lucide-react';

export function LegalPages() {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Legal Pages</h1>
        <p className="text-sm text-gray-600 mt-0.5">Manage Privacy Policy and Terms & Conditions</p>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'privacy'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Shield className="w-4 h-4" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'terms'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            Terms & Conditions
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'privacy' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Privacy Policy Title
                </label>
                <input
                  type="text"
                  defaultValue="Privacy Policy"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Last Updated Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-03-27"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Privacy Policy Content
                </label>
                <textarea
                  rows={16}
                  defaultValue={`Welcome to Orbitle Travel! Your privacy is important to us.

1. Information We Collect
We collect information that you provide directly to us, including your name, email address, phone number, and travel preferences.

2. How We Use Your Information
We use the information we collect to provide, maintain, and improve our services, including to process bookings, send confirmations, and provide customer support.

3. Information Sharing
We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our business.

4. Data Security
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.

5. Your Rights
You have the right to access, update, or delete your personal information at any time.

6. Cookies
We use cookies to enhance your experience on our website and analyze site traffic.

7. Contact Us
If you have any questions about this Privacy Policy, please contact us at privacy@orbitle.com.`}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
                  <Save className="w-4 h-4" />
                  Save Privacy Policy
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Terms & Conditions Title
                </label>
                <input
                  type="text"
                  defaultValue="Terms & Conditions"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Last Updated Date
                </label>
                <input
                  type="date"
                  defaultValue="2026-03-27"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Terms & Conditions Content
                </label>
                <textarea
                  rows={16}
                  defaultValue={`Terms & Conditions for Orbitle Travel Services

1. Acceptance of Terms
By accessing and using Orbitle Travel services, you accept and agree to be bound by these Terms and Conditions.

2. Booking and Payment
All bookings are subject to availability. Payment must be made in full at the time of booking unless otherwise specified.

3. Cancellation Policy
Cancellations must be made in writing. Cancellation fees may apply depending on the timing of cancellation and the specific package terms.

4. Travel Documents
It is your responsibility to ensure you have valid passports, visas, and other required travel documents.

5. Liability
Orbitle Travel acts as an intermediary between travelers and service providers. We are not liable for acts or omissions of third-party service providers.

6. Changes to Bookings
We reserve the right to make changes to itineraries due to circumstances beyond our control. We will notify you of any significant changes.

7. Travel Insurance
We strongly recommend that you purchase comprehensive travel insurance.

8. Complaints
Any complaints must be reported to us in writing within 30 days of the end of your trip.

9. Governing Law
These terms are governed by the laws of India.

10. Contact
For any questions regarding these terms, contact us at legal@orbitle.com.`}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm">
                  <Save className="w-4 h-4" />
                  Save Terms & Conditions
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
