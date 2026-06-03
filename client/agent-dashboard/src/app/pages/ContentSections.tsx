import { Plus, Save, Trash2, Upload, Globe2, Home, MapPin, Loader2, Award, ShieldCheck, BarChart3, BookOpen, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useGetContentSectionsQuery, useCreateContentSectionMutation, useUpdateContentSectionMutation, useDeleteContentSectionMutation } from '../api/contentSectionApi';
import type { ContentSectionData } from '../api/contentSectionApi';
import { useGetSiteConfigQuery, useUpdateSiteConfigMutation } from '../api/siteConfigApi';
import type { AboutUsData, AboutUsStat, AboutUsCredential, AboutUsAward, DestinationData } from '../api/siteConfigApi';
import { toast } from 'sonner';

const tabs = ['Travel Themes', 'Why Choose Us', 'FAQ', 'Destinations', 'About Us'];

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

// ── Destinations Tab (API-wired) ──────────────────────────────────────────────

type DestCategory = 'domestic' | 'international';

const MAX_DESTINATIONS = 18;

type DestMode = 'domestic' | 'international' | 'both';

function DestinationsTab() {
  const { data: configData, isLoading: configLoading } = useGetSiteConfigQuery();
  const [updateConfig, { isLoading: isSaving }] = useUpdateSiteConfigMutation();

  const [mode, setMode]               = useState<DestMode>('both');
  const [destinations, setDestinations] = useState<DestinationData[]>([]);
  const [addingTo, setAddingTo]       = useState<DestCategory | null>(null);
  const [newName, setNewName]         = useState('');
  const [hasChanges, setHasChanges]   = useState(false);

  // Load from API
  useEffect(() => {
    if (configData?.data?.destinations) {
      setDestinations(configData.data.destinations);
      setHasChanges(false);
    }
  }, [configData]);

  const visibleCategories: DestCategory[] = mode === 'both'
    ? ['domestic', 'international']
    : [mode];

  const getCount     = (cat: DestCategory)  => destinations.filter(d => d.category === cat).length;
  const toggleActive   = (idx: number) => { setDestinations(prev => prev.map((d, i) => i === idx ? { ...d, active: !d.active } : d)); setHasChanges(true); };
  const toggleTrending = (idx: number) => { setDestinations(prev => prev.map((d, i) => i === idx ? { ...d, trending: !d.trending } : d)); setHasChanges(true); };
  const deleteDest     = (idx: number) => { setDestinations(prev => prev.filter((_, i) => i !== idx)); setHasChanges(true); };

  const startAdding = (cat: DestCategory) => { setAddingTo(cat); setNewName(''); };
  const cancelAdd   = ()                  => { setAddingTo(null); setNewName(''); };

  const confirmAdd = (cat: DestCategory) => {
    if (!newName.trim() || getCount(cat) >= MAX_DESTINATIONS) return;
    setDestinations(prev => [
      ...prev,
      { name: newName.trim(), active: true, trending: false, category: cat, image: '' },
    ]);
    setAddingTo(null);
    setNewName('');
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await updateConfig({ destinations } as any).unwrap();
      toast.success('Destinations saved!');
      setHasChanges(false);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to save destinations');
    }
  };

  const modeButtons: { value: DestMode; label: string; icon: any }[] = [
    { value: 'domestic',      label: 'Domestic',      icon: Home   },
    { value: 'international', label: 'International', icon: Globe2 },
    { value: 'both',          label: 'Both',          icon: MapPin },
  ];

  if (configLoading) return <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-blue-600 animate-spin" /></div>;

  const renderCategoryBlock = (cat: DestCategory) => {
    const catDests = destinations.map((d, idx) => ({ ...d, _idx: idx })).filter(d => d.category === cat);
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
          {catDests.map((dest, displayIdx) => (
            <div key={dest._idx} className="border-b border-gray-100 last:border-0">
              <div
                className={`grid grid-cols-[2rem_1fr_5rem_5rem_3rem] gap-3 px-4 py-3 items-center transition-colors ${
                  !dest.active ? 'bg-gray-50/60 opacity-60' : 'hover:bg-gray-50/40'
                }`}
              >
                <span className="text-xs text-gray-400 font-medium">{displayIdx + 1}</span>

                <Input
                  type="text"
                  value={dest.name}
                  onChange={e => { setDestinations(prev => prev.map((d, i) => i === dest._idx ? { ...d, name: e.target.value } : d)); setHasChanges(true); }}
                  className="w-full px-2 py-1 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent h-auto"
                />

                {/* Trending toggle */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleTrending(dest._idx)}
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
                    onClick={() => toggleActive(dest._idx)}
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
                    onClick={() => deleteDest(dest._idx)}
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Image URL — only visible when trending is ON */}
              {dest.trending && (
                <div className="px-4 pb-3 pt-0">
                  <div className="flex items-center gap-3 bg-orange-50 rounded-lg px-3 py-2.5 border border-orange-100">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs">🖼️</span>
                      <span className="text-[10px] font-semibold text-orange-600 uppercase tracking-wide">Cover Image</span>
                    </div>
                    <Input
                      type="text"
                      value={dest.image}
                      onChange={e => { setDestinations(prev => prev.map((d, i) => i === dest._idx ? { ...d, image: e.target.value } : d)); setHasChanges(true); }}
                      placeholder="Paste image URL for carousel (e.g. https://images.unsplash.com/...)"
                      className="flex-1 px-2.5 py-1.5 border border-orange-200 rounded-md text-xs focus:ring-2 focus:ring-orange-400 focus:border-transparent h-auto bg-white placeholder:text-gray-400"
                    />
                    {dest.image && (
                      <img src={dest.image} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0 border border-orange-200" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    )}
                  </div>
                  <p className="text-[10px] text-orange-400 mt-1 ml-1">This image will appear in the "Trending Destinations" carousel on your marketplace homepage</p>
                </div>
              )}
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
          <div key={cat}>{renderCategoryBlock(cat)}</div>
        ))}
      </div>

      {/* Save Button */}
      {hasChanges && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Destinations
          </button>
        </div>
      )}
    </div>
  );
}

// ── About Us Tab (API-wired) ──────────────────────────────────────────────────

const emptyAboutUs: AboutUsData = {
  heroTitle: '',
  heroSubtitle: '',
  heroBackgroundImage: '',
  stats: [],
  storyTitle: '',
  storyParagraph1: '',
  storyParagraph2: '',
  storyBullets: [],
  storyImage1: '',
  storyImage2: '',
  yearsBadgeText: '',
  credentials: [],
  awards: [],
};

function AboutUsTab() {
  const { data: configData, isLoading } = useGetSiteConfigQuery();
  const [updateConfig, { isLoading: isSaving }] = useUpdateSiteConfigMutation();

  const [aboutUs, setAboutUs] = useState<AboutUsData>(emptyAboutUs);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (configData?.data?.aboutUs) {
      setAboutUs({ ...emptyAboutUs, ...configData.data.aboutUs });
      setHasChanges(false);
    }
  }, [configData]);

  const update = (partial: Partial<AboutUsData>) => {
    setAboutUs(prev => ({ ...prev, ...partial }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await updateConfig({ aboutUs } as any).unwrap();
      toast.success('About Us saved!');
      setHasChanges(false);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to save');
    }
  };

  // ── Stats helpers
  const addStat = () => { if (aboutUs.stats.length >= 6) return; update({ stats: [...aboutUs.stats, { value: '', label: '' }] }); };
  const removeStat = (idx: number) => update({ stats: aboutUs.stats.filter((_, i) => i !== idx) });
  const updateStat = (idx: number, field: keyof AboutUsStat, val: string) =>
    update({ stats: aboutUs.stats.map((s, i) => i === idx ? { ...s, [field]: val } : s) });

  // ── Bullet helpers
  const addBullet = () => { if (aboutUs.storyBullets.length >= 6) return; update({ storyBullets: [...aboutUs.storyBullets, ''] }); };
  const removeBullet = (idx: number) => update({ storyBullets: aboutUs.storyBullets.filter((_, i) => i !== idx) });
  const updateBullet = (idx: number, val: string) =>
    update({ storyBullets: aboutUs.storyBullets.map((b, i) => i === idx ? val : b) });

  // ── Credential helpers
  const addCredential = () => {
    if (aboutUs.credentials.length >= 4) return;
    update({ credentials: [...aboutUs.credentials, { label: '', number: '', description: '', color: 'blue' }] });
  };
  const removeCredential = (idx: number) => update({ credentials: aboutUs.credentials.filter((_, i) => i !== idx) });
  const updateCredential = (idx: number, field: keyof AboutUsCredential, val: string) =>
    update({ credentials: aboutUs.credentials.map((c, i) => i === idx ? { ...c, [field]: val } : c) });

  // ── Award helpers
  const addAward = () => { if (aboutUs.awards.length >= 8) return; update({ awards: [...aboutUs.awards, { year: '', title: '', org: '' }] }); };
  const removeAward = (idx: number) => update({ awards: aboutUs.awards.filter((_, i) => i !== idx) });
  const updateAward = (idx: number, field: keyof AboutUsAward, val: string) =>
    update({ awards: aboutUs.awards.map((a, i) => i === idx ? { ...a, [field]: val } : a) });

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-8">
      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-gray-900">
          <Info className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-semibold">Hero Banner</h3>
        </div>
        <p className="text-sm text-gray-500">The top section of your About Us page</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
            <Input
              value={aboutUs.heroTitle}
              onChange={e => update({ heroTitle: e.target.value })}
              placeholder="e.g. Crafting Unforgettable Indian Journeys Since 2012"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-auto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
            <Input
              value={aboutUs.heroBackgroundImage}
              onChange={e => update({ heroBackgroundImage: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-auto"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
          <Textarea
            rows={2}
            value={aboutUs.heroSubtitle}
            onChange={(e: any) => update({ heroSubtitle: e.target.value })}
            placeholder="Brief description shown below the title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* ── Stats Row ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold">Stats</h3>
            <span className="text-xs text-gray-400 ml-2">{aboutUs.stats.length}/6</span>
          </div>
          <button onClick={addStat} disabled={aboutUs.stats.length >= 6}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Stat
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {aboutUs.stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
              <Input value={stat.value} onChange={e => updateStat(idx, 'value', e.target.value)}
                placeholder="15,000+" className="w-24 px-2 py-1.5 border border-gray-200 rounded-md text-sm h-auto font-semibold" />
              <Input value={stat.label} onChange={e => updateStat(idx, 'label', e.target.value)}
                placeholder="Happy Travellers" className="flex-1 px-2 py-1.5 border border-gray-200 rounded-md text-sm h-auto" />
              <button onClick={() => removeStat(idx)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
        {aboutUs.stats.length === 0 && <p className="text-sm text-gray-400 text-center py-3">No stats yet</p>}
      </div>

      {/* ── Our Story ───────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center gap-2 text-gray-900">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-semibold">Our Story</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Story Title</label>
            <Input value={aboutUs.storyTitle} onChange={e => update({ storyTitle: e.target.value })}
              placeholder="e.g. Born in Mumbai, Trusted Across India"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-auto" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years Badge Text</label>
            <Input value={aboutUs.yearsBadgeText} onChange={e => update({ yearsBadgeText: e.target.value })}
              placeholder="e.g. 12+ Years of Excellence"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-auto" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 1</label>
          <Textarea rows={3} value={aboutUs.storyParagraph1}
            onChange={(e: any) => update({ storyParagraph1: e.target.value })}
            placeholder="Your founding story..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 2</label>
          <Textarea rows={3} value={aboutUs.storyParagraph2}
            onChange={(e: any) => update({ storyParagraph2: e.target.value })}
            placeholder="Growth and achievements..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Story Image 1 URL</label>
            <Input value={aboutUs.storyImage1} onChange={e => update({ storyImage1: e.target.value })}
              placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-lg h-auto" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Story Image 2 URL</label>
            <Input value={aboutUs.storyImage2} onChange={e => update({ storyImage2: e.target.value })}
              placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded-lg h-auto" />
          </div>
        </div>

        {/* Bullet highlights */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Key Highlights</label>
            <button onClick={addBullet} disabled={aboutUs.storyBullets.length >= 6}
              className="px-2.5 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <div className="space-y-2">
            {aboutUs.storyBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-green-500 text-sm">✓</span>
                <Input value={bullet} onChange={e => updateBullet(idx, e.target.value)}
                  placeholder="e.g. In-house visa assistance for 50+ countries"
                  className="flex-1 px-2.5 py-1.5 border border-gray-200 rounded-md text-sm h-auto" />
                <button onClick={() => removeBullet(idx)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Credentials ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold">Credentials & Registrations</h3>
            <span className="text-xs text-gray-400 ml-2">{aboutUs.credentials.length}/4</span>
          </div>
          <button onClick={addCredential} disabled={aboutUs.credentials.length >= 4}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Credential
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutUs.credentials.map((cred, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <select
                  value={cred.color}
                  onChange={e => updateCredential(idx, 'color', e.target.value)}
                  className="px-2 py-1 border border-gray-200 rounded-md text-xs font-medium bg-white"
                >
                  <option value="blue">🔵 Blue</option>
                  <option value="green">🟢 Green</option>
                  <option value="amber">🟡 Amber</option>
                  <option value="purple">🟣 Purple</option>
                </select>
                <button onClick={() => removeCredential(idx)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <Input value={cred.label} onChange={e => updateCredential(idx, 'label', e.target.value)}
                placeholder="e.g. IATA Accreditation" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm h-auto font-semibold" />
              <Input value={cred.number} onChange={e => updateCredential(idx, 'number', e.target.value)}
                placeholder="e.g. IATA: 14-3-1234" className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm h-auto font-mono" />
              <Textarea rows={2} value={cred.description}
                onChange={(e: any) => updateCredential(idx, 'description', e.target.value)}
                placeholder="Brief description of this credential..."
                className="w-full px-2.5 py-1.5 border border-gray-200 rounded-md text-sm" />
            </div>
          ))}
        </div>
        {aboutUs.credentials.length === 0 && <p className="text-sm text-gray-400 text-center py-3">No credentials yet</p>}
      </div>

      {/* ── Awards ───────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-900">
            <Award className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-semibold">Awards & Accolades</h3>
            <span className="text-xs text-gray-400 ml-2">{aboutUs.awards.length}/8</span>
          </div>
          <button onClick={addAward} disabled={aboutUs.awards.length >= 8}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" /> Add Award
          </button>
        </div>
        <div className="space-y-3">
          {aboutUs.awards.map((award, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
              <Input value={award.year} onChange={e => updateAward(idx, 'year', e.target.value)}
                placeholder="2024" className="w-20 px-2 py-1.5 border border-gray-200 rounded-md text-sm h-auto font-bold text-center" />
              <Input value={award.title} onChange={e => updateAward(idx, 'title', e.target.value)}
                placeholder="Award title" className="flex-1 px-2 py-1.5 border border-gray-200 rounded-md text-sm h-auto" />
              <Input value={award.org} onChange={e => updateAward(idx, 'org', e.target.value)}
                placeholder="Awarding organization" className="flex-1 px-2 py-1.5 border border-gray-200 rounded-md text-sm h-auto" />
              <button onClick={() => removeAward(idx)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
        </div>
        {aboutUs.awards.length === 0 && <p className="text-sm text-gray-400 text-center py-3">No awards yet</p>}
      </div>

      {/* Save */}
      {hasChanges && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save About Us
          </button>
        </div>
      )}
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
      {activeTab === 'Why Choose Us' && <WhyChooseUsTab />}

      {/* FAQ */}
      {activeTab === 'FAQ' && <FAQTab />}

      {/* About Us */}
      {activeTab === 'About Us' && <AboutUsTab />}

      {/* Save — only for non-API tabs */}
      {(activeTab === 'Travel Themes') && (
        <div className="flex justify-end">
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

// ── Why Choose Us Tab (API-wired) ─────────────────────────────────────────────

function WhyChooseUsTab() {
  const { data, isLoading } = useGetContentSectionsQuery();
  const [createSection, { isLoading: isCreating }] = useCreateContentSectionMutation();
  const [updateSection] = useUpdateContentSectionMutation();
  const [deleteSection] = useDeleteContentSectionMutation();

  const sections = (data?.data || []).filter(s => s.sectionType === 'why_choose_us');

  const handleAdd = async () => {
    try {
      await createSection({ sectionType: 'why_choose_us', title: 'New Card', content: 'Describe your strength' }).unwrap();
      toast.success('Card added!');
    } catch (err: any) { toast.error(err?.data?.message || 'Failed to add'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this card?')) return;
    try { await deleteSection(id).unwrap(); toast.success('Removed!'); }
    catch (err: any) { toast.error('Failed to remove'); }
  };

  const handleUpdate = async (id: string, updates: Partial<ContentSectionData>) => {
    try { await updateSection({ id, data: updates }).unwrap(); }
    catch (err: any) { toast.error('Failed to save'); }
  };

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Highlight your strengths — shown on marketplace</p>
        <button onClick={handleAdd} disabled={isCreating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium disabled:opacity-50">
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Card
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map(s => (
          <div key={s._id} className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                {s.items?.[0]?.icon || '⭐'}
              </div>
              <div className="flex-1 space-y-3">
                <Input type="text" defaultValue={s.title} placeholder="Card title"
                  onBlur={e => { if (e.target.value !== s.title) handleUpdate(s._id, { title: e.target.value }); }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg h-auto bg-white" />
                <Textarea rows={2} defaultValue={s.content} placeholder="Card description"
                  onBlur={(e: any) => { if (e.target.value !== s.content) handleUpdate(s._id, { content: e.target.value }); }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white" />
                <button onClick={() => handleDelete(s._id)}
                  className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-1">
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sections.length === 0 && (
        <div className="text-center py-8 text-sm text-gray-400">No cards yet — click <strong>Add Card</strong> to highlight your strengths.</div>
      )}
    </div>
  );
}

// ── FAQ Tab (API-wired) ──────────────────────────────────────────────────────

function FAQTab() {
  const { data, isLoading } = useGetContentSectionsQuery();
  const [createSection, { isLoading: isCreating }] = useCreateContentSectionMutation();
  const [deleteSection] = useDeleteContentSectionMutation();
  const [updateSection] = useUpdateContentSectionMutation();

  const faqs = (data?.data || []).filter(s => s.sectionType === 'custom');

  const handleAdd = async () => {
    try {
      await createSection({ sectionType: 'custom', title: 'New Question', content: 'Answer goes here...' }).unwrap();
      toast.success('Question added!');
    } catch (err: any) { toast.error(err?.data?.message || 'Failed to add'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this question?')) return;
    try { await deleteSection(id).unwrap(); toast.success('Removed!'); }
    catch (err: any) { toast.error('Failed to remove'); }
  };

  const handleUpdate = async (id: string, updates: Partial<ContentSectionData>) => {
    try { await updateSection({ id, data: updates }).unwrap(); }
    catch (err: any) { toast.error('Failed to save'); }
  };

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 text-blue-600 animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">Frequently asked questions — shown on marketplace</p>
        <button onClick={handleAdd} disabled={isCreating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium disabled:opacity-50">
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Question
        </button>
      </div>
      <div className="space-y-4">
        {faqs.map(faq => (
          <div key={faq._id} className="bg-white rounded-lg border border-gray-200 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <Input type="text" defaultValue={faq.title} placeholder="Question"
                onBlur={e => { if (e.target.value !== faq.title) handleUpdate(faq._id, { title: e.target.value }); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg h-auto bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
              <Textarea rows={3} defaultValue={faq.content}
                onBlur={(e: any) => { if (e.target.value !== faq.content) handleUpdate(faq._id, { content: e.target.value }); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" />
            </div>
            <button onClick={() => handleDelete(faq._id)}
              className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm flex items-center gap-1">
              <Trash2 className="w-4 h-4" /> Remove Question
            </button>
          </div>
        ))}
      </div>
      {faqs.length === 0 && (
        <div className="text-center py-8 text-sm text-gray-400">No FAQs yet — click <strong>Add Question</strong>.</div>
      )}
    </div>
  );
}
