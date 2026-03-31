import { X, Upload, Tag, Award, TrendingUp, Plus, Trash2, Calendar, Palette, CheckCircle2, XCircle } from 'lucide-react';
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

interface BadgeDef {
  id: string;
  label: string;
  textColor: string;
  bgColor: string;
  isCustom?: boolean;
}

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/* ─── Tag Entry Field (for Inclusions / Exclusions) ──────────────── */
function TagEntryField({
  label,
  items,
  onAdd,
  onRemove,
  placeholder,
  accentColor,
  icon,
}: {
  label: string;
  items: string[];
  onAdd: (val: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
  accentColor: 'green' | 'red';
  icon: React.ReactNode;
}) {
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const colorMap = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-100',
      accent: 'text-green-600',
      tagBg: 'bg-green-100',
      tagText: 'text-green-800',
      tagRemove: 'hover:bg-green-200 text-green-500 hover:text-green-700',
      addBtn: 'bg-green-600 hover:bg-green-700',
      focusRing: 'focus:ring-green-400',
      addBorder: 'border-green-200 hover:border-green-400 text-green-600 hover:bg-green-50',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-100',
      accent: 'text-red-500',
      tagBg: 'bg-red-100',
      tagText: 'text-red-800',
      tagRemove: 'hover:bg-red-200 text-red-400 hover:text-red-700',
      addBtn: 'bg-red-500 hover:bg-red-600',
      focusRing: 'focus:ring-red-400',
      addBorder: 'border-red-200 hover:border-red-400 text-red-500 hover:bg-red-50',
    },
  };

  const c = colorMap[accentColor];

  const handleAdd = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    const wordCount = trimmed.split(/\s+/).length;
    if (wordCount > 4) {
      setError('Max 4 words per entry');
      return;
    }
    if (items.includes(trimmed)) {
      setError('Already added');
      return;
    }
    setError(null);
    onAdd(trimmed);
    setInputVal('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }
    if (e.key === 'Escape') { setInputVal(''); setError(null); }
  };

  const handleChange = (val: string) => {
    setInputVal(val);
    if (error) setError(null);
  };

  return (
    <div className={`${c.bg} rounded p-4 border ${c.border}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={c.accent}>{icon}</span>
        <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
        {items.length > 0 && (
          <span className={`ml-auto text-[10px] font-semibold ${c.accent} bg-white px-2 py-0.5 rounded-full border ${c.border}`}>
            {items.length} added
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mb-3">Add items one at a time · max 4 words each</p>

      {/* Tags list */}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {items.map((item, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.tagBg} ${c.tagText}`}
            >
              {item}
              <button
                onClick={() => onRemove(idx)}
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${c.tagRemove}`}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded focus:ring-2 ${c.focusRing} focus:border-transparent transition-all`}
          />
          {error && (
            <p className="mt-1 text-[10px] text-red-500 font-medium">{error}</p>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={!inputVal.trim()}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${c.addBtn}`}
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <p className="mt-2 text-[10px] text-gray-400 text-center">No items yet — type above and press Enter or Add</p>
      )}
    </div>
  );
}

/* ─── Tiny modal for custom category ─────────────────────────────── */
function CustomCategoryModal({
  onSave,
  onClose,
}: {
  onSave: (name: string) => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState('');
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-80 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">New Type</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
        <input
          autoFocus
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && value.trim()) { onSave(value.trim()); }
            if (e.key === 'Escape') onClose();
          }}
          placeholder="e.g., Eco Tour, Spiritual…"
          className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose}
            className="px-3 py-1.5 text-xs text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 font-medium">
            Cancel
          </button>
          <button
            disabled={!value.trim()}
            onClick={() => onSave(value.trim())}
            className="px-3 py-1.5 text-xs text-white bg-blue-600 rounded hover:bg-blue-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed">
            Save Type
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Image upload slot ───────────────────────────────────────────── */
function ImageUploadSlot({
  label, preview, onFile, onClear,
}: {
  label: string;
  preview: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE_BYTES) { setError(`File too large. Max ${MAX_FILE_SIZE_MB}MB.`); return; }
    setError(null);
    onFile(file);
  };

  return (
    <div className="w-full">
      <label className="block text-[10px] font-medium text-gray-500 mb-1">{label}</label>
      {preview ? (
        <div className="relative h-[140px] rounded overflow-hidden border border-gray-200">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <button onClick={onClear}
            className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xs">✕</button>
        </div>
      ) : (
        <div className="flex flex-col">
          <label
            className={`flex flex-col items-center justify-center gap-1.5 h-[140px] border-2 border-dashed rounded cursor-pointer transition-colors ${
              dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          >
            <input ref={fileRef} type="file" accept="image/*" className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            <Upload className="w-6 h-6 text-gray-300" />
            <span className="text-xs text-gray-500 font-medium text-center px-2">Click or drag &amp; drop</span>
            <span className="text-[10px] text-gray-400">JPG, PNG, WEBP · Max {MAX_FILE_SIZE_MB}MB</span>
          </label>
          {error && <p className="mt-1 text-[10px] text-red-500 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
}

/* ─── Badge pill preview ──────────────────────────────────────────── */
function BadgePill({ badge, selected, onClick }: { badge: BadgeDef; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: badge.bgColor, color: badge.textColor }}
      className={`relative inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all select-none
        ${selected
          ? 'ring-2 ring-offset-2 ring-gray-400 scale-105 shadow-md'
          : 'opacity-70 hover:opacity-100 hover:scale-105 hover:shadow-sm'
        }`}
    >
      {badge.label}
      {selected && <span className="ml-1.5 text-[9px] opacity-80">✓</span>}
    </button>
  );
}

/* ─── Custom badge builder ────────────────────────────────────────── */
function CustomBadgeBuilder({ onAdd }: { onAdd: (badge: BadgeDef) => void }) {
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#6366f1');
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd({ id: `custom-${Date.now()}`, label: text.trim(), textColor, bgColor, isCustom: true });
    setText('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border-2 border-dashed border-purple-300 text-purple-500 hover:border-purple-400 hover:bg-purple-50 transition-all"
      >
        <Plus className="w-3 h-3" /> Custom Badge
      </button>
    );
  }

  return (
    <div className="mt-3 p-3 bg-white rounded-lg border border-purple-200 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="w-3.5 h-3.5 text-purple-500" />
        <span className="text-xs font-semibold text-gray-700">Create Custom Badge</span>
        <button onClick={() => setOpen(false)} className="ml-auto text-gray-400 hover:text-gray-600">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 items-end">
        <div className="flex-1 min-w-[120px]">
          <label className="block text-[10px] font-medium text-gray-500 mb-1">Label</label>
          <input autoFocus type="text" value={text} onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
            placeholder="Badge text…"
            className="w-full px-2.5 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-[10px] font-medium text-gray-500 mb-1">Text</label>
          <div className="relative w-9 h-[30px]">
            <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="w-9 h-[30px] rounded border border-gray-300 cursor-pointer flex items-center justify-center text-[8px] font-bold overflow-hidden"
              style={{ backgroundColor: textColor, color: textColor === '#ffffff' ? '#666' : '#fff' }}>Aa</div>
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-medium text-gray-500 mb-1">Background</label>
          <div className="relative w-9 h-[30px]">
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="w-9 h-[30px] rounded border border-gray-300 cursor-pointer" style={{ backgroundColor: bgColor }} />
          </div>
        </div>
        {text.trim() && (
          <div className="flex flex-col items-start">
            <label className="block text-[10px] font-medium text-gray-500 mb-1">Preview</label>
            <span style={{ backgroundColor: bgColor, color: textColor }}
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-sm">{text}</span>
          </div>
        )}
        <button onClick={handleAdd} disabled={!text.trim()}
          className="px-3 py-1.5 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Add
        </button>
      </div>
    </div>
  );
}

/* ─── Main modal ──────────────────────────────────────────────────── */
export function PackageModal({ isOpen, onClose }: PackageModalProps) {
  const [originalPrice, setOriginalPrice]     = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [selectedBadgeIds, setSelectedBadgeIds] = useState<string[]>([]);
  const [hasOffer, setHasOffer]               = useState(false);
  const [isTrending, setIsTrending]           = useState(false);
  const [itineraryDays, setItineraryDays]     = useState<ItineraryDay[]>([]);
  const [imagePreviews, setImagePreviews]     = useState<[string | null, string | null]>([null, null]);

  // Inclusions & Exclusions
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);

  // Custom types
  const [customTypes, setCustomTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [showTypeModal, setShowTypeModal] = useState(false);

  const [badges, setBadges] = useState<BadgeDef[]>([
    { id: 'bestseller', label: 'Bestseller',      textColor: '#ffffff', bgColor: '#f59e0b' },
    { id: 'hot',        label: 'Hot Deal',         textColor: '#ffffff', bgColor: '#ef4444' },
    { id: 'new',        label: 'New',              textColor: '#ffffff', bgColor: '#10b981' },
    { id: 'limited',    label: 'Limited Time',     textColor: '#ffffff', bgColor: '#8b5cf6' },
    { id: 'premium',    label: 'Premium',          textColor: '#ffffff', bgColor: '#1f2937' },
    { id: 'family',     label: 'Family Friendly',  textColor: '#ffffff', bgColor: '#ec4899' },
  ]);

  const setPreview = (index: 0 | 1, src: string | null) =>
    setImagePreviews(prev => { const next: [string | null, string | null] = [...prev] as [string | null, string | null]; next[index] = src; return next; });

  const handleImageFile = (index: 0 | 1, file: File) => {
    const reader = new FileReader();
    reader.onload = e => setPreview(index, e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const calculateDiscount = () => {
    const original   = parseFloat(originalPrice.replace(/[^0-9.]/g, ''));
    const discounted = parseFloat(discountedPrice.replace(/[^0-9.]/g, ''));
    if (original && discounted && original > discounted)
      return ((original - discounted) / original * 100).toFixed(0);
    return '0';
  };

  const toggleBadge = (id: string) =>
    setSelectedBadgeIds(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const handleAddCustomBadge = (badge: BadgeDef) => {
    setBadges(prev => [...prev, badge]);
    setSelectedBadgeIds(prev => [...prev, badge.id]);
  };

  const addItineraryDay = () =>
    setItineraryDays(prev => [...prev, { id: Date.now().toString(), dayNumber: prev.length + 1, title: '', description: '' }]);

  const removeItineraryDay = (id: string) =>
    setItineraryDays(prev => prev.filter(d => d.id !== id));

  const updateItineraryDay = (id: string, field: 'title' | 'description', value: string) =>
    setItineraryDays(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));

  if (!isOpen) return null;

  const discountPercentage = calculateDiscount();
  const selectedBadges = badges.filter(b => selectedBadgeIds.includes(b.id));

  const inp = 'w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">

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
          <div className="p-5 overflow-y-auto flex-1 space-y-5">

            {/* TOP: fields + images */}
            <div className="flex gap-4">
              <div className="flex-1 space-y-3 min-w-0">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Package Name</label>
                  <input type="text" placeholder="e.g., Bali Paradise – 7D/6N" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Destination</label>
                  <input type="text" placeholder="e.g., Bali, Indonesia" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" placeholder="e.g., 7 Days / 6 Nights" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Package Category</label>
                  <select className={inp + ' font-medium'}>
                    <option value="">Select Category</option>
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Package Type</label>
                  <select value={selectedType}
                    onChange={e => { if (e.target.value === '__custom__') { setShowTypeModal(true); } else { setSelectedType(e.target.value); } }}
                    className={inp + ' font-medium'}>
                    <option value="">Select Package Type</option>
                    <option value="beach">Beach</option>
                    <option value="mountain">Mountain</option>
                    <option value="pilgrimage">Pilgrimage</option>
                    <option value="honeymoon">Honeymoon</option>
                    <option value="adventure">Adventure</option>
                    <option value="wildlife">Wildlife</option>
                    <option value="cultural">Cultural</option>
                    <option value="cruise">Cruise</option>
                    <option value="desert">Desert</option>
                    <option value="city">City Tour</option>
                    {customTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    <option value="__custom__">+ Add Custom Type…</option>
                  </select>
                </div>
              </div>
              <div className="w-100 flex-shrink-0">
                <label className="block text-xs font-medium text-gray-700 mb-1">Package Images</label>
                <div className="flex flex-col gap-2">
                  <ImageUploadSlot label="Image 1" preview={imagePreviews[0]} onFile={f => handleImageFile(0, f)} onClear={() => setPreview(0, null)} />
                  <ImageUploadSlot label="Image 2" preview={imagePreviews[1]} onFile={f => handleImageFile(1, f)} onClear={() => setPreview(1, null)} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} placeholder="Enter package description..." className={inp} />
            </div>

            {/* Itinerary */}
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

            {/* Pricing */}
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

            {/* Trending & Offer Toggles */}
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

            {/* Badges */}
            <div className="bg-purple-50 rounded p-4 border border-purple-100">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-semibold text-gray-900">Package Badges</h3>
              </div>
              <p className="text-xs text-gray-500 mb-3">Select badges to display on your package card. Click to toggle.</p>
              <div className="flex flex-wrap gap-2 items-center">
                {badges.map(badge => (
                  <BadgePill key={badge.id} badge={badge} selected={selectedBadgeIds.includes(badge.id)} onClick={() => toggleBadge(badge.id)} />
                ))}
                <CustomBadgeBuilder onAdd={handleAddCustomBadge} />
              </div>
              {selectedBadges.length > 0 && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-purple-100">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Preview — as shown on card</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBadges.map(badge => (
                      <span key={badge.id} style={{ backgroundColor: badge.bgColor, color: badge.textColor }}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide shadow-sm">
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Inclusions ── */}
            <TagEntryField
              label="Inclusions"
              items={inclusions}
              onAdd={val => setInclusions(prev => [...prev, val])}
              onRemove={idx => setInclusions(prev => prev.filter((_, i) => i !== idx))}
              placeholder="e.g., Daily breakfast, Airport transfer…"
              accentColor="green"
              icon={<CheckCircle2 className="w-4 h-4" />}
            />

            {/* ── Exclusions ── */}
            <TagEntryField
              label="Exclusions"
              items={exclusions}
              onAdd={val => setExclusions(prev => [...prev, val])}
              onRemove={idx => setExclusions(prev => prev.filter((_, i) => i !== idx))}
              placeholder="e.g., Airfare, Personal expenses…"
              accentColor="red"
              icon={<XCircle className="w-4 h-4" />}
            />

            {/* Terms & Conditions */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Terms &amp; Conditions</label>
              <textarea rows={4} placeholder={'Enter terms and conditions\n• Cancellation policy\n• Payment terms'} className={inp} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50">
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

      {showTypeModal && (
        <CustomCategoryModal onSave={name => { setCustomTypes(prev => [...prev, name]); setSelectedType(name); setShowTypeModal(false); }} onClose={() => setShowTypeModal(false)} />
      )}
    </>
  );
}