import { useState } from 'react';
import { Upload, MapPin, Clock, IndianRupee, Sparkles, Eye, Check } from 'lucide-react';

interface FirstPackageProps {
  onNext: () => void;
  onSkip: () => void;
}

export function FirstPackage({ onNext, onSkip }: FirstPackageProps) {
  const [destination, setDestination] = useState('Goa');
  const [duration, setDuration] = useState('3 Nights / 4 Days');
  const [price, setPrice] = useState('15,999');
  const [highlights, setHighlights] = useState(['Beach resort stay', 'Water sports', 'North & South Goa tour']);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
    }, 2000);
  };

  const handlePreview = () => {
    window.open('https://saratravels.orbitle.in', '_blank');
  };

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-3">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-semibold text-orange-900">MOST IMPORTANT STEP</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add your first package 📦</h2>
        <p className="text-gray-600">This makes your website ready to receive enquiries</p>
      </div>

      {!isPublished ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-5">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Goa, Bali, Dubai"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 3 Nights / 4 Days"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <IndianRupee className="w-4 h-4 inline mr-1" />
                Price (per person)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-700">₹</span>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="15,999"
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-semibold"
                />
              </div>
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Top 3 Highlights
              </label>
              <div className="space-y-2">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder={`Highlight ${index + 1}`}
                      className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Image upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
              </div>
            </div>

            {/* Publish button */}
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isPublishing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/30 text-white'
              }`}
            >
              {isPublishing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publishing Package...
                </span>
              ) : (
                '📦 Publish Package'
              )}
            </button>
          </div>

          {/* Preview */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600">PACKAGE PREVIEW</span>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center">
                <Upload className="w-16 h-16 text-white/50" />
              </div>

              {/* Package details */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {destination || 'Destination'} - {duration || 'Duration'}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-blue-600">₹{price || '0'}</span>
                  <span className="text-sm text-gray-600">per person</span>
                </div>

                <div className="space-y-2 mb-4">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold">
                  Enquire Now
                </button>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-900">
                This is how customers will see your package on your website
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Success state */
        <div className="text-center py-12 animate-fadeIn">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 animate-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-3">
            🎉 Your package is live!
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Congratulations! Your website now has its first package
          </p>

          <div className="max-w-md mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-semibold">{destination} package created</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-semibold">Visible on your website</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-900 font-semibold">Ready to receive enquiries</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePreview}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <Eye className="w-6 h-6" />
            Preview My Website
          </button>

          <p className="text-sm text-gray-500 mt-4">Opens in new tab</p>
        </div>
      )}
    </div>
  );
}
