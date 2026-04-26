import { Plus, Save, Trash2, Upload, Globe2, Home, MapPin } from 'lucide-react';
import { useState } from 'react';
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const tabs = ['Travel Themes', 'Why Choose Us', 'FAQ', 'Destinations'];

// ── Travel Themes ──────────────────────────────────────────────────────────────

const initialThemes = [
  { id: 1, name: 'Adventure', emoji: '🏔️', active: true  },
  { id: 2, name: 'Beach',     emoji: '🏖️', active: true  },
  { id: 3, name: 'Honeymoon', emoji: '💑',  active: true  },
  { id: 4, name: 'Family',    emoji: '👨‍👩‍👧', active: false },
  { id: 5, name: 'Wildlife',  emoji: '🦁',  active: true  },
  { id: 6, name: 'Spiritual', emoji: '🕌',  active: false },
];

function TravelThemesTable() {
  const [themes, setThemes]     = useState(initialThemes);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle]  = useState('');
  const [newImage, setNewImage]  = useState<string | null>(null);
  const [dragging, setDragging]  = useState(false);

  const toggleActive = (id: number) =>
    setThemes(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));

  const deleteTheme = (id: number) =>
    setThemes(prev => prev.filter(t => t.id !== id));

  const updateName = (id: number, name: string) =>
    setThemes(prev => prev.map(t => t.id === id ? { ...t, name } : t));

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => setNewImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddTheme = () => {
    if (!newTitle.trim()) return;
    setThemes(prev => [...prev, { id: Date.now(), name: newTitle.trim(), emoji: '✈️', active: true }]);
    closeModal();
  };

  const closeModal = () => { setShowModal(false); setNewTitle(''); setNewImage(null); };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Manage travel theme categories displayed on the homepage</p>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Theme
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Head */}
        <div className="grid grid-cols-[2.5rem_1fr_1fr_7rem_5rem] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <span>#</span>
          <span>Theme Name</span>
          <span>Image</span>
          <span>Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        {themes.map((theme, index) => (
          <div
            key={theme.id}
            className={`grid grid-cols-[2.5rem_1fr_1fr_7rem_5rem] gap-4 px-5 py-3.5 items-center border-b border-gray-100 last:border-0 transition-colors ${
              !theme.active ? 'bg-gray-50/60 opacity-70' : 'hover:bg-gray-50/40'
            }`}
          >
            <span className="text-sm text-gray-400 font-medium">{index + 1}</span>

            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl flex-shrink-0">{theme.emoji}</span>
              <Input
                type="text"
                value={theme.name}
                onChange={e => updateName(theme.id, e.target.value)}
                className="flex-1 min-w-0 px-2.5 py-1.5 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto"
              />
            </div>

            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs text-gray-600 hover:bg-gray-50 transition-colors w-fit">
              <Upload className="w-3.5 h-3.5" /> Change Image
            </button>

            <div className="flex items-center gap-2 w-fit">
              <span className={`text-xs font-semibold ${theme.active ? 'text-blue-600' : 'text-gray-500'}`}>
                {theme.active ? 'Active' : 'Inactive'}
              </span>
              <button
                onClick={() => toggleActive(theme.id)}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  theme.active ? 'bg-blue-500' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={theme.active}
              >
                <span className="sr-only">Toggle Active</span>
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    theme.active ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => deleteTheme(theme.id)}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {themes.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            No themes yet — click <strong>Add Theme</strong> to get started.
          </div>
        )}
      </div>

      {/* ── Add Theme Modal ─────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />

          {/* Panel */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Add Travel Theme</h2>
                <p className="text-xs text-gray-500 mt-0.5">Upload a cover image and give it a title</p>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">

              {/* Title input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Theme Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddTheme()}
                  placeholder="e.g. Adventure, Beach, Honeymoon..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
                  autoFocus
                />
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>

                {newImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-gray-200">
                    <img src={newImage} alt="Preview" className="w-full h-44 object-cover" />
                    <button
                      onClick={() => setNewImage(null)}
                      className="absolute top-2 right-2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label
                    className={`flex flex-col items-center justify-center gap-2 w-full h-44 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                      dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={e => {
                      e.preventDefault();
                      setDragging(false);
                      const f = e.dataTransfer.files[0];
                      if (f) handleImageFile(f);
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f); }}
                    />
                    <Upload className="w-8 h-8 text-gray-300" />
                    <span className="text-sm text-gray-500 font-medium">Click to upload or drag &amp; drop</span>
                    <span className="text-xs text-gray-400">PNG, JPG, WEBP up to 5 MB</span>
                  </label>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTheme}
                disabled={!newTitle.trim()}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors"
              >
                Add Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Destinations Tab ──────────────────────────────────────────────────────────

type DestCategory = 'domestic' | 'international';

interface Destination {
  id: number;
  name: string;
  active: boolean;
  trending: boolean;
  category: DestCategory;
}

const MAX_DESTINATIONS = 18;

const initialDestinations: Destination[] = [
  { id: 1, name: 'Goa',       active: true,  trending: true,  category: 'domestic' },
  { id: 2, name: 'Manali',    active: true,  trending: false, category: 'domestic' },
  { id: 3, name: 'Kerala',    active: false, trending: false, category: 'domestic' },
  { id: 4, name: 'Bali',      active: true,  trending: true,  category: 'international' },
  { id: 5, name: 'Dubai',     active: true,  trending: false, category: 'international' },
  { id: 6, name: 'Singapore', active: false, trending: false, category: 'international' },
];

type DestMode = 'domestic' | 'international' | 'both';

function DestinationsTab() {
  const [mode, setMode]               = useState<DestMode>('both');
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [addingTo, setAddingTo]       = useState<DestCategory | null>(null);
  const [newName, setNewName]         = useState('');

  const visibleCategories: DestCategory[] = mode === 'both'
    ? ['domestic', 'international']
    : [mode];

  const getCount     = (cat: DestCategory)  => destinations.filter(d => d.category === cat).length;
  const toggleActive   = (id: number) => setDestinations(prev => prev.map(d => d.id === id ? { ...d, active:   !d.active   } : d));
  const toggleTrending = (id: number) => setDestinations(prev => prev.map(d => d.id === id ? { ...d, trending: !d.trending } : d));
  const deleteDest     = (id: number) => setDestinations(prev => prev.filter(d => d.id !== id));

  const startAdding = (cat: DestCategory) => { setAddingTo(cat); setNewName(''); };
  const cancelAdd   = ()                  => { setAddingTo(null); setNewName(''); };

  const confirmAdd = (cat: DestCategory) => {
    if (!newName.trim() || getCount(cat) >= MAX_DESTINATIONS) return;
    setDestinations(prev => [
      ...prev,
      { id: Date.now(), name: newName.trim(), active: true, trending: false, category: cat },
    ]);
    setAddingTo(null);
    setNewName('');
  };

  const modeButtons: { value: DestMode; label: string; icon: any }[] = [
    { value: 'domestic',      label: 'Domestic',      icon: Home   },
    { value: 'international', label: 'International', icon: Globe2 },
    { value: 'both',          label: 'Both',          icon: MapPin },
  ];

  const CategoryBlock = ({ cat }: { cat: DestCategory }) => {
    const catDests = destinations.filter(d => d.category === cat);
    const count    = catDests.length;
    const isAdding = addingTo === cat;

    return (
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
            cat === 'domestic' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {cat === 'domestic' ? <Home className="w-3.5 h-3.5" /> : <Globe2 className="w-3.5 h-3.5" />}
            {cat === 'domestic' ? 'Domestic' : 'International'}
          </div>
          <span className="text-xs text-gray-400 font-medium">{count} / {MAX_DESTINATIONS}</span>
          {count >= MAX_DESTINATIONS && <span className="text-xs text-red-500 font-semibold">Limit reached</span>}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Head */}
          <div className="grid grid-cols-[2rem_1fr_5rem_5rem_3rem] gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <span>#</span>
            <span>Name</span>
            <span>Trending</span>
            <span>Status</span>
            <span className="text-right">Del</span>
          </div>

          {/* Empty state */}
          {catDests.length === 0 && !isAdding && (
            <div className="py-7 text-center text-sm text-gray-400">
              No destinations yet — click <strong>+ Add</strong> below.
            </div>
          )}

          {/* Rows */}
          {catDests.map((dest, idx) => (
            <div
              key={dest.id}
              className={`grid grid-cols-[2rem_1fr_5rem_5rem_3rem] gap-3 px-4 py-3 items-center border-b border-gray-100 last:border-0 transition-colors ${
                !dest.active ? 'bg-gray-50/60 opacity-60' : 'hover:bg-gray-50/40'
              }`}
            >
              <span className="text-xs text-gray-400 font-medium">{idx + 1}</span>

              <Input
                type="text"
                value={dest.name}
                onChange={e => setDestinations(prev => prev.map(d => d.id === dest.id ? { ...d, name: e.target.value } : d))}
                className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto"
              />

              {/* Trending toggle */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleTrending(dest.id)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    dest.trending ? 'bg-orange-400' : 'bg-gray-200'
                  }`}
                  role="switch" aria-checked={dest.trending}
                >
                  <span className="sr-only">Mark as Trending</span>
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${dest.trending ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-sm leading-none">{dest.trending ? '🔥' : ''}</span>
              </div>

              {/* Active toggle */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleActive(dest.id)}
                  className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                    dest.active ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                  role="switch" aria-checked={dest.active}
                >
                  <span className="sr-only">Toggle Active</span>
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${dest.active ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Delete */}
              <div className="flex justify-end">
                <button
                  onClick={() => deleteDest(dest.id)}
                  className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Inline add row */}
          {isAdding ? (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50/60 border-t border-blue-100">
              <Input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') confirmAdd(cat); if (e.key === 'Escape') cancelAdd(); }}
                placeholder="Destination name…"
                className="flex-1 px-2.5 py-1.5 border border-blue-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white"
                autoFocus
              />
              <button
                onClick={() => confirmAdd(cat)}
                disabled={!newName.trim() || count >= MAX_DESTINATIONS}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-md text-xs font-semibold transition-colors"
              >
                Add
              </button>
              <button
                onClick={cancelAdd}
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-md text-xs font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            count < MAX_DESTINATIONS && (
              <button
                onClick={() => startAdding(cat)}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50/50 transition-colors border-t border-gray-100 font-medium"
              >
                <Plus className="w-4 h-4" /> Add destination
              </button>
            )
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Mode selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-sm text-gray-500 hidden sm:block">Show:</p>
        <div className="inline-flex rounded-xl border border-gray-200 bg-gray-50 p-1 gap-1">
          {modeButtons.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => { setMode(value); cancelAdd(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === value
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400 hidden sm:block">Max {MAX_DESTINATIONS} per category</span>
      </div>

      {/* Side by side on desktop, stacked on mobile */}
      <div className={mode === 'both' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''}>
        {visibleCategories.map(cat => (
          <CategoryBlock key={cat} cat={cat} />
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function ContentSections() {
  const [activeTab, setActiveTab] = useState('Travel Themes');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Content Sections</h1>
        <p className="text-gray-600 mt-1">Manage homepage content and sections</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Travel Themes */}
      {activeTab === 'Travel Themes' && <TravelThemesTable />}

      {/* Destinations */}
      {activeTab === 'Destinations' && <DestinationsTab />}

      {/* Why Choose Us */}
      {activeTab === 'Why Choose Us' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Maximum 4 cards to highlight your strengths</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
              <Plus className="w-4 h-4" /> Add Card
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🏆', title: 'Best Prices',    desc: 'We offer competitive rates with no hidden charges' },
              { icon: '⚡', title: 'Quick Response', desc: '24/7 customer support for all your queries' },
              { icon: '✈️', title: 'Expert Planning',desc: 'Professional team with years of experience' },
              { icon: '🛡️', title: 'Safe & Secure',  desc: 'Your bookings are completely protected' },
            ].map((card, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                    {card.icon}
                  </div>
                  <div className="flex-1 space-y-3">
                    <Input type="text" defaultValue={card.title} placeholder="Card title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white" />
                    <Textarea rows={2} defaultValue={card.desc} placeholder="Card description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white" />
                    <button className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-1">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ */}
      {activeTab === 'FAQ' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Frequently asked questions to help customers</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>
          <div className="space-y-4">
            {[
              { q: 'How do I book a package?',          a: 'You can book by contacting us via WhatsApp or filling the enquiry form.' },
              { q: 'What is your cancellation policy?', a: 'Cancellation charges vary based on the package and timing. Contact us for details.' },
              { q: 'Do you provide travel insurance?',  a: 'Yes, we offer comprehensive travel insurance with all our packages.' },
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                  <Input type="text" defaultValue={faq.q}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                  <Textarea rows={3} defaultValue={faq.a}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white" />
                </div>
                <button className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Remove Question
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save */}
      <div className="flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Save className="w-5 h-5" /> Save Changes
        </button>
      </div>
    </div>
  );
}
