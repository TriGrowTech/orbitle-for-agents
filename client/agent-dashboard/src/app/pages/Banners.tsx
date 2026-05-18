import { useState } from 'react';
import { Plus, Trash2, Upload, Eye, EyeOff, ImageIcon, Loader2, Tag, Percent } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useGetBannersQuery, useCreateBannerMutation, useUpdateBannerMutation, useDeleteBannerMutation } from '../api/bannerApi';
import { useGetSiteConfigQuery, useUpdateSiteConfigMutation } from '../api/siteConfigApi';
import { toast } from 'sonner';

const API_URL = (import.meta as any).env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:5000';

export function Banners() {
  const { data, isLoading } = useGetBannersQuery();
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  const { data: configData } = useGetSiteConfigQuery();
  const [updateConfig, { isLoading: isSavingConfig }] = useUpdateSiteConfigMutation();

  // Site config local state
  const config = configData?.data;
  const [topbarText, setTopbarText] = useState('');
  const [topbarCta, setTopbarCta] = useState('');
  const [topbarInit, setTopbarInit] = useState(false);
  const [cardText, setCardText] = useState('');
  const [cardColor, setCardColor] = useState('red');
  const [cardInit, setCardInit] = useState(false);

  // Populate topbar/card from API once
  if (config && !topbarInit) {
    setTopbarText(config.topbarOffer?.text || '');
    setTopbarCta(config.topbarOffer?.ctaText || '');
    setTopbarInit(true);
  }
  if (config && !cardInit) {
    setCardText(config.cardOffer?.text || '');
    setCardColor(config.cardOffer?.bgColor || 'red');
    setCardInit(true);
  }

  // Banner state
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newPreview, setNewPreview] = useState('');

  const allBanners = data?.data || [];
  const heroSlides = allBanners.filter(b => b.bannerType === 'hero_slide');
  const promoBanners = allBanners.filter(b => !b.bannerType || b.bannerType === 'promotional');

  const handleFileChange = (file: File | undefined) => {
    if (!file) return;
    setNewImage(file);
    setNewPreview(URL.createObjectURL(file));
  };

  const handleCreatePromo = async () => {
    if (!newTitle.trim()) { toast.error('Title is required'); return; }
    const fd = new FormData();
    fd.append('title', newTitle);
    fd.append('subtitle', newSubtitle);
    fd.append('linkUrl', newLinkUrl);
    fd.append('bannerType', 'promotional');
    if (newImage) fd.append('image', newImage);
    try {
      await createBanner(fd).unwrap();
      toast.success('Banner created!');
      setShowAdd(false); setNewTitle(''); setNewSubtitle(''); setNewLinkUrl(''); setNewImage(null); setNewPreview('');
    } catch (err: any) { toast.error(err?.data?.message || 'Failed to create'); }
  };

  const handleAddHeroSlide = async (file: File) => {
    const fd = new FormData();
    fd.append('title', `Hero Slide`);
    fd.append('bannerType', 'hero_slide');
    fd.append('image', file);
    try {
      await createBanner(fd).unwrap();
      toast.success('Slide added!');
    } catch (err: any) { toast.error(err?.data?.message || 'Failed to add slide'); }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const fd = new FormData();
    fd.append('isActive', String(!currentActive));
    try {
      await updateBanner({ id, data: fd }).unwrap();
      toast.success(currentActive ? 'Banner hidden' : 'Banner shown');
    } catch (err: any) { toast.error('Failed to update'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this banner?')) return;
    try { await deleteBanner(id).unwrap(); toast.success('Deleted!'); }
    catch (err: any) { toast.error('Failed to delete'); }
  };

  const saveTopbar = async (toggleActive?: boolean) => {
    try {
      await updateConfig({
        topbarOffer: {
          text: topbarText,
          ctaText: topbarCta,
          ctaLink: '',
          isActive: toggleActive !== undefined ? toggleActive : (config?.topbarOffer?.isActive ?? false),
        }
      }).unwrap();
      toast.success('Topbar offer saved!');
    } catch (err: any) { toast.error('Failed to save'); }
  };

  const saveCard = async (toggleActive?: boolean) => {
    try {
      await updateConfig({
        cardOffer: {
          text: cardText,
          bgColor: cardColor,
          isActive: toggleActive !== undefined ? toggleActive : (config?.cardOffer?.isActive ?? false),
        }
      }).unwrap();
      toast.success('Card offer saved!');
    } catch (err: any) { toast.error('Failed to save'); }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Banners &amp; Promotions</h1>
          <p className="text-sm text-gray-600 mt-0.5">Manage promotional banners and offers</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 w-fit text-sm h-auto">
          <Plus className="w-4 h-4" />{showAdd ? 'Cancel' : 'Add New Banner'}
        </Button>
      </div>

      {/* ─── Created Promotional Banners (TOP) ──────────────────────────── */}
      {promoBanners.length > 0 && (
        <div className="space-y-3">
          {promoBanners.map((banner) => (
            <div key={banner._id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden shadow-sm">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-96 aspect-[5/1] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  {banner.imageUrl && <img src={`${API_URL}/uploads/banners/${banner.imageUrl}`} alt={banner.title} className="absolute inset-0 w-full h-full object-cover" />}
                  <div className="relative text-center text-white px-6 z-10">
                    <h3 className="text-lg font-semibold mb-1 drop-shadow">{banner.title}</h3>
                    {banner.subtitle && <p className="text-sm opacity-80 drop-shadow">{banner.subtitle}</p>}
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Title</label><p className="text-sm font-medium">{banner.title}</p></div>
                    <div><label className="block text-xs font-medium text-gray-700 mb-1">Subtitle</label><p className="text-sm text-gray-600">{banner.subtitle || '—'}</p></div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <Button onClick={() => handleToggleActive(banner._id, banner.isActive)}
                      className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium h-auto border-none shadow-none ${
                        banner.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                      {banner.isActive ? <><Eye className="w-3 h-3" />Active</> : <><EyeOff className="w-3 h-3" />Hidden</>}
                    </Button>
                    <Button onClick={() => handleDelete(banner._id)}
                      className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2 text-xs h-auto bg-white shadow-none">
                      <Trash2 className="w-3 h-3" />Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {promoBanners.length === 0 && !showAdd && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><ImageIcon className="w-8 h-8 text-gray-400" /></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No promotional banners yet</h3>
          <p className="text-gray-600 mb-6">Add banners to showcase offers on your marketplace</p>
          <button onClick={() => setShowAdd(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
            <Plus className="w-5 h-5" />Add Your First Banner
          </button>
        </div>
      )}

      {/* ─── Add New Promo Banner Form ────────────────────────────────── */}
      {showAdd && (
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-5 space-y-4">
          <h3 className="font-semibold text-gray-900">New Promotional Banner</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Title *</label>
              <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Summer Sale - 30% Off" className="h-auto py-2 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Subtitle</label>
              <Input value={newSubtitle} onChange={e => setNewSubtitle(e.target.value)} placeholder="Book your dream vacation" className="h-auto py-2 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Banner Image (5:1)</label>
            {newPreview ? (
              <div className="relative rounded-lg overflow-hidden border border-gray-200">
                <img src={newPreview} alt="Preview" className="w-full h-40 object-cover" />
                <button onClick={() => { setNewImage(null); setNewPreview(''); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-black/50 text-white rounded-full flex items-center justify-center text-xs">✕</button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e.target.files?.[0])} />
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500">Click to upload (2000x400 recommended)</span>
              </label>
            )}
          </div>
          <button onClick={handleCreatePromo} disabled={isCreating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm disabled:opacity-50">
            {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {isCreating ? 'Creating...' : 'Create Banner'}
          </button>
        </div>
      )}

      {/* ─── Hero Background Carousel ─────────────────────────────────── */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
            <ImageIcon className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Hero Background Carousel</h2>
            <p className="text-xs text-gray-600">Main sliding background images for homepage hero section</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {heroSlides.map((slide) => (
            <div key={slide._id} className="relative group">
              <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                {slide.imageUrl ? (
                  <img src={`${API_URL}/uploads/banners/${slide.imageUrl}`} alt="Slide" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <Button onClick={() => handleDelete(slide._id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity h-auto">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
          {/* Upload new slide */}
          <label className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-blue-400 transition-colors cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleAddHeroSlide(f); e.target.value = ''; }} />
            <div className="text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Add Slide</p>
            </div>
          </label>
        </div>
      </div>

      {/* ─── Topbar Offer ─────────────────────────────────────────────── */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Topbar Offer Banner</h2>
            <p className="text-xs text-gray-600">Small banner displayed at the top of website</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Offer Text</label>
            <Input type="text" value={topbarText} onChange={e => setTopbarText(e.target.value)}
              placeholder="🎉 Limited Time: Get 20% OFF on all packages!"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg h-auto bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">CTA Button Text</label>
            <Input type="text" value={topbarCta} onChange={e => setTopbarCta(e.target.value)}
              placeholder="Claim Offer"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg h-auto bg-white" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <Button onClick={() => saveTopbar(!config?.topbarOffer?.isActive)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium transition-colors h-auto border-none shadow-none ${
              config?.topbarOffer?.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {config?.topbarOffer?.isActive ? <><Eye className="w-3 h-3" />Active</> : <><EyeOff className="w-3 h-3" />Inactive</>}
          </Button>
          <Button onClick={() => saveTopbar()} disabled={isSavingConfig}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs h-auto">
            {isSavingConfig ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* ─── Package Card Offer Strip ──────────────────────────────────── */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
            <Percent className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Package Card Offer Strip</h2>
            <p className="text-xs text-gray-600">Small offer banner shown on package cards</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Offer Text</label>
            <Input type="text" value={cardText} onChange={e => setCardText(e.target.value)}
              placeholder="Save 15% • Book Before April 30"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg h-auto bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Background Color</label>
            <Select value={cardColor} onValueChange={setCardColor}>
              <SelectTrigger className="w-full h-9 bg-white border border-gray-300 rounded-lg px-3 text-sm">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="red">Red (Urgent)</SelectItem>
                <SelectItem value="orange">Orange (Sale)</SelectItem>
                <SelectItem value="green">Green (Special)</SelectItem>
                <SelectItem value="blue">Blue (Info)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <Button onClick={() => saveCard(!config?.cardOffer?.isActive)}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium transition-colors h-auto border-none shadow-none ${
              config?.cardOffer?.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {config?.cardOffer?.isActive ? <><Eye className="w-3 h-3" />Active</> : <><EyeOff className="w-3 h-3" />Inactive</>}
          </Button>
          <Button onClick={() => saveCard()} disabled={isSavingConfig}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs h-auto">
            {isSavingConfig ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}