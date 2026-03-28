import { Plus, Upload, Star, Edit, Trash2 } from 'lucide-react';

const mockTestimonials = [
  {
    id: 1,
    name: 'Rahul & Priya Sharma',
    destination: 'Maldives',
    rating: 5,
    review: 'Amazing experience! The resort was beautiful and the planning was perfect. Highly recommend for honeymoon couples.',
    photo: '👫',
  },
  {
    id: 2,
    name: 'Amit Kumar',
    destination: 'Dubai',
    rating: 5,
    review: 'Great service from start to finish. The itinerary was well-planned and we covered all major attractions.',
    photo: '👨',
  },
  {
    id: 3,
    name: 'Sneha Patel',
    destination: 'Bali',
    rating: 4,
    review: 'Wonderful trip with family. Kids enjoyed water sports and we loved the cultural tours. Value for money!',
    photo: '👩',
  },
];

export function Testimonials() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and testimonials</p>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 w-fit">
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {mockTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Customer Info Form */}
              <div className="lg:w-80 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                    {testimonial.photo}
                  </div>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    defaultValue={testimonial.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <input
                    type="text"
                    defaultValue={testimonial.destination}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        className={`p-1 rounded ${
                          star <= testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Review Text
                  </label>
                  <textarea
                    rows={6}
                    defaultValue={testimonial.review}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Added on March 20, 2026
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (hidden when there are testimonials) */}
      {mockTestimonials.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials yet</h3>
          <p className="text-gray-600 mb-6">Start adding customer reviews to build trust and credibility</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto">
            <Plus className="w-5 h-5" />
            Add Your First Testimonial
          </button>
        </div>
      )}
    </div>
  );
}
