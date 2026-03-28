import { useState } from 'react';
import { Send, Check, Mail, Phone, MapPin, Package, ArrowRight } from 'lucide-react';

interface TestEnquiryProps {
  onNext: () => void;
  onSkip: () => void;
}

export function TestEnquiry({ onNext, onSkip }: TestEnquiryProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSendTest = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        onNext(); // Auto-advance after showing the enquiry
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {!isSent ? (
        <>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-3">
              <Send className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-900">SEE IT IN ACTION</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's test your enquiry system 🧪</h2>
            <p className="text-gray-600">We'll create a sample enquiry to show you how it works</p>
          </div>

          {/* Test enquiry preview */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Sample Customer Enquiry</h3>
                  <p className="text-sm text-gray-600">This is how real enquiries will look</p>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  New
                </div>
              </div>

              <div className="space-y-4">
                {/* Customer details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">PS</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Customer Name</p>
                      <p className="font-semibold text-gray-900">Priya Sharma</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-600">City</p>
                      <p className="font-semibold text-gray-900">Mumbai</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">priya@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Package interest */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-semibold text-gray-900">Interested Package</p>
                  </div>
                  <p className="text-lg font-bold text-blue-600">Goa - 3 Nights / 4 Days</p>
                </div>

                {/* Message */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Message:</p>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                    Hi, I'm interested in the Goa package for 2 adults. Can you share more details about the itinerary and hotels included?
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <Check className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-semibold text-green-900 mb-1">Real-time Notifications</p>
              <p className="text-xs text-green-700">Get instant alerts when customers enquire</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <Mail className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-semibold text-blue-900 mb-1">Email & SMS Alerts</p>
              <p className="text-xs text-blue-700">Never miss a potential customer</p>
            </div>
          </div>

          {/* Send test button */}
          <button
            onClick={handleSendTest}
            disabled={isSending}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              isSending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30 text-white'
            }`}
          >
            {isSending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Test Enquiry...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-6 h-6" />
                Send Test Enquiry
              </span>
            )}
          </button>
        </>
      ) : (
        /* Success state */
        <div className="text-center py-12 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30 animate-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            🎉 Test enquiry received!
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Great! Your enquiry system is working perfectly
          </p>

          <div className="max-w-md mx-auto bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-semibold">Enquiry added to your dashboard</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-semibold">You can manage & respond to it</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-semibold">Real enquiries work the same way</span>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-purple-200 rounded-xl">
            <p className="text-sm text-gray-600">Redirecting to Enquiries dashboard</p>
            <ArrowRight className="w-4 h-4 text-purple-600 animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
