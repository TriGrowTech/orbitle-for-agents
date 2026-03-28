import { X, Upload, Tag, Award, TrendingUp, Plus, Trash2, Calendar } from 'lucide-react';
import { useState, useRef } from 'react';

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ItineraryDay {
  id: string;
  dayNumber: number;
  title: string;
  description: string;
}

export function PackageModal({ isOpen, onClose }: PackageModalProps) {
  const [originalPrice, setOriginalPrice]     = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [selectedBadges, setSelectedBadges]   = useState<string[]>([]);
  const [hasOffer, setHasOffer]               = useState(false);
  const [isTrending, setIsTrending]           = useState(false);
  const [itineraryDays, setItineraryDays]     = useState<ItineraryDay[]>([]);
  const [imagePreview, setImagePreview]       = useState<string | null>(null);
  const [dragging, setDragging]               = useState(false);
  const fileRef                               = useRef<HTMLInputElement>(null);

  const calculateDiscount = () => {
    const original   = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
    const discounted = parseFloat(discountedPrice.replace(/[^0-9.]/g, ''));
    if (original && discounted && original > discounted)
      return ((original - discounted) / original * 100).toFixed(0);
    return '0';
  };

  const availableBadges = [
    { id: 'bestseller',    label: 'Bestseller',     color: 'from-yellow-500 to-orange-500' },
    { id: 'hot',           label: 'Hot Deal',       color: 'from-red-500 to-pink-500'      },
    { id: 'new',           label: 'New',            color: 'from-green-500 to-emerald-500' },
    { id: 'limited',       label: 'Limited Time',   color: 'from-purple-500 to-indigo-500' },
    { id: 'premium',       label: 'Premium',        color: 'from-gray-700 to-gray-900'     },
    { id: 'familyFriendly',label: 'Family Friendly',color: 'from-pink-500 to-rose-500'     },
  ];

  const toggleBadge = (id: string) =>
    setSelectedBadges(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const addItineraryDay = () =>
    setItineraryDays(prev => [...prev, {
      id: Date.now().toString(),
      dayNumber: prev.length + 1,
      title: '', description: '',
    }]);

  const removeItineraryDay = (id: string) =>
    setItineraryDays(prev => prev.filter(d => d.id !== id));

  const updateItineraryDay = (id: string, field: 'title' | 'description', value: string) =>
    setItineraryDays(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const discountPercentage = calculateDiscount();

  // shared input class
  const inp = 'w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal — low border-radius throughout */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Add New Package</h2>
            <p className="text-xs text-gray-500 mt-0.5">Fill in the details to create a new travel package</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-128px)] space-y-5">

          {/* ── TOP: Left fields + Right image ──────────────────────────── */}
          <div className="flex gap-4">

            {/* Left column — fields stacked */}
            <div className="flex-1 space-y-3 min-w-0">
              {/* Package Name full width */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Package Name</label>
                <input type="text" placeholder="e.g., Bali Paradise – 7D/6N" className={inp} />
              </div>

              {/* Destination */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Destination</label>
                <input type="text" placeholder="e.g., Bali, Indonesia" className={inp} />
              </div>

              {/* Duration — below destination, same width */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                <input type="text" placeholder="e.g., 7 Days / 6 Nights" className={inp} />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Package Category</label>
                <select className={inp + ' font-medium'}>
                  <option value="">Select Category</option>
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>

              {/* Package Type — below category */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Package Type</label>
                <select className={inp + ' font-medium'}>
                  <option value="">Select Package Type</option>
                  <option value="beach">🏖️ Beach</option>
                  <option value="mountain">⛰️ Mountain</option>
                  <option value="pilgrimage">🕉️ Pilgrimage</option>
                  <option value="honeymoon">💑 Honeymoon</option>
                  <option value="adventure">🧗 Adventure</option>
                  <option value="wildlife">🦁 Wildlife</option>
                  <option value="cultural">🏛️ Cultural</option>
                  <option value="cruise">🚢 Cruise</option>
                  <option value="desert">🏜️ Desert</option>
                  <option value="city">🏙️ City Tour</option>
                </select>
              </div>
            </div>

            {/* Right column — big image upload */}
            <div className="w-56 flex-shrink-0">
              <label className="block text-xs font-medium text-gray-700 mb-1">Package Image</label>
              {imagePreview ? (
                <div className="relative h-[calc(100%-1.5rem)] min-h-[220px] rounded overflow-hidden border border-gray-200">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xs"
                  >✕</button>
                </div>
              ) : (
                <label
                  className={`flex flex-col items-center justify-center gap-2 h-[calc(100%-1.5rem)] min-h-[220px] border-2 border-dashed rounded cursor-pointer transition-colors ${
                    dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                  onDragOver={e => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleImageFile(f); }}
                >
                  <input ref={fileRef} type="file" accept="image/*" className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }} />
                  <Upload className="w-8 h-8 text-gray-300" />
                  <span className="text-xs text-gray-500 font-medium text-center px-2">Click to upload<br />or drag &amp; drop</span>
                  <span className="text-[10px] text-gray-400">JPG, PNG, WEBP</span>
                </label>
              )}
            </div>
          </div>

          {/* ── Description ─────────────────────────────────────────────── */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={3} placeholder="Enter package description..." className={inp} />
          </div>

          {/* ── Itinerary ────────────────────────────────────────────────── */}
          <div className="bg-indigo-50 rounded p-4 border border-indigo-100">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-gray-900">Day-Wise Itinerary</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">Add daily schedule and activities for your package</p>
            <div className="space-y-3">
              {itineraryDays.map((day, index) => (
                <div key={day.id} className="bg-white rounded p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                        <span className="text-[11px] font-bold text-white">{index + 1}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">Day {index + 1}</span>
                    </div>
                    <button onClick={() => removeItineraryDay(day.id)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input type="text" placeholder="e.g., Arrival in Bali" value={day.title}
                      onChange={e => updateItineraryDay(day.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                    <textarea rows={2} placeholder="Describe the day's activities, meals, accommodation…" value={day.description}
                      onChange={e => updateItineraryDay(day.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                  </div>
                </div>
              ))}
              <button onClick={addItineraryDay}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border-2 border-dashed border-indigo-300 text-indigo-600 rounded hover:bg-indigo-50 hover:border-indigo-400 transition-all text-sm font-medium">
                <Plus className="w-4 h-4" /> Add Day {itineraryDays.length + 1}
              </button>
            </div>
          </div>

          {/* ── Pricing ──────────────────────────────────────────────────── */}
          <div className="bg-green-50 rounded p-4 border border-green-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Pricing &amp; Discount</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Original Price</label>
                <input type="text" placeholder="e.g., ₹50,000" value={originalPrice}
                  onChange={e => setOriginalPrice(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Discounted Price</label>
                <input type="text" placeholder="e.g., ₹45,000" value={discountedPrice}
                  onChange={e => setDiscountedPrice(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            {parseFloat(discountPercentage) > 0 && (
              <div className="mt-3 p-3 bg-white rounded border border-green-200 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Discount</p>
                  <p className="text-xl font-bold text-green-600">{discountPercentage}% OFF</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">You Save</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{(parseFloat(originalPrice.replace(/[^0-9.]/g, '')) - parseFloat(discountedPrice.replace(/[^0-9.]/g, ''))).toFixed(0)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Trending & Offer Toggles ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded p-4 border border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Mark as Trending</p>
                    <p className="text-xs text-gray-500">Show in trending section</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isTrending} onChange={e => setIsTrending(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-red-500" />
                </label>
              </div>
            </div>
            <div className="bg-blue-50 rounded p-4 border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Tag className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Special Offer</p>
                    <p className="text-xs text-gray-500">Show offer badge</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={hasOffer} onChange={e => setHasOffer(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500" />
                </label>
              </div>
            </div>
          </div>

          {/* ── Badges ───────────────────────────────────────────────────── */}
          <div className="bg-purple-50 rounded p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-semibold text-gray-900">Package Badges</h3>
            </div>
            <p className="text-xs text-gray-500 mb-3">Select badges to highlight this package</p>
            <div className="flex flex-wrap gap-2">
              {availableBadges.map(badge => (
                <button key={badge.id} onClick={() => toggleBadge(badge.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                    selectedBadges.includes(badge.id)
                      ? `bg-gradient-to-r ${badge.color} text-white shadow ring-2 ring-offset-1 ring-purple-400`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                  }`}>
                  {badge.label}{selectedBadges.includes(badge.id) && ' ✓'}
                </button>
              ))}
            </div>
            {selectedBadges.length > 0 && (
              <div className="mt-3 px-3 py-2 bg-white rounded border border-purple-100">
                <p className="text-xs text-gray-500">Selected: <span className="font-semibold text-purple-600">{selectedBadges.length} badge{selectedBadges.length !== 1 ? 's' : ''}</span></p>
              </div>
            )}
          </div>

          {/* ── Inclusions ───────────────────────────────────────────────── */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Inclusions</label>
            <textarea rows={4} placeholder={'Enter inclusions (one per line)\n• Accommodation\n• Meals\n• Sightseeing'} className={inp} />
          </div>

          {/* ── Exclusions ───────────────────────────────────────────────── */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Exclusions</label>
            <textarea rows={3} placeholder={'Enter exclusions (one per line)\n• Airfare\n• Personal expenses'} className={inp} />
          </div>

          {/* ── Terms & Conditions ───────────────────────────────────────── */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Terms &amp; Conditions</label>
            <textarea rows={4} placeholder={'Enter terms and conditions\n• Cancellation policy\n• Payment terms'} className={inp} />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors font-medium">
            Cancel
          </button>
          <button className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors font-medium">
            Create Package
          </button>
        </div>
      </div>
    </div>
  );
}