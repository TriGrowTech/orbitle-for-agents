import { Save, Upload, TrendingUp, Eye } from 'lucide-react';

export function SEOAnalytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">SEO & Analytics</h1>
        <p className="text-gray-600 mt-1">Manage search engine optimization and tracking</p>
      </div>

      {/* SEO Settings */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">SEO Settings</h2>
          <p className="text-sm text-gray-600 mt-1">Optimize your site for search engines</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Meta Title
            </label>
            <input
              type="text"
              defaultValue="Orbitle Travel - Best Travel Packages & Tour Deals"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Meta Description
            </label>
            <textarea
              rows={3}
              defaultValue="Explore amazing travel packages to Bali, Dubai, Maldives & more. Best prices, expert planning, 24/7 support. Book your dream vacation today!"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OG Image (Social Media Preview)
            </label>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mb-2">
                  <Upload className="w-4 h-4" />
                  Upload Image
                </button>
                <p className="text-xs text-gray-500">Recommended: 1200x630px</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              defaultValue="travel packages, tour packages, bali packages, dubai tour, maldives honeymoon"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Analytics Tracking */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Analytics & Tracking</h2>
          <p className="text-sm text-gray-600 mt-1">Connect analytics tools to track performance</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Analytics ID
            </label>
            <input
              type="text"
              placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Get your Google Analytics ID →
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook Pixel ID
            </label>
            <input
              type="text"
              placeholder="Enter your Pixel ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              <a href="https://business.facebook.com/events_manager2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Get your Facebook Pixel ID →
              </a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Tag Manager ID (Optional)
            </label>
            <input
              type="text"
              placeholder="GTM-XXXXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-semibold text-blue-600">12,453</p>
              <p className="text-sm text-gray-600 mt-1">Total Visitors</p>
              <p className="text-xs text-green-600 mt-1">+15% this month</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-3xl font-semibold text-green-600">3.2%</p>
              <p className="text-sm text-gray-600 mt-1">Conversion Rate</p>
              <p className="text-xs text-green-600 mt-1">+0.8% this month</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-semibold text-purple-600">2:45</p>
              <p className="text-sm text-gray-600 mt-1">Avg. Time on Site</p>
              <p className="text-xs text-green-600 mt-1">+12s this month</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Connect Google Analytics to see real-time data
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
