import { useState, useEffect } from 'react';
import { Upload, Save, Loader2, Building2 } from 'lucide-react';
import { ThemeManagement } from '../components/ThemeManagement';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useGetSiteConfigQuery, useUpdateSiteConfigMutation } from '../api/siteConfigApi';
import { toast } from 'sonner';

export function BrandingSettings() {
  const { data, isLoading } = useGetSiteConfigQuery();
  const [updateConfig, { isLoading: isSaving }] = useUpdateSiteConfigMutation();
  const [isSavingBranding, setIsSavingBranding] = useState(false);

  const config = data?.data;

  // Local form state
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [defaultWhatsappMessage, setDefaultWhatsappMessage] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [timezone, setTimezone] = useState('IST');
  const [initialized, setInitialized] = useState(false);

  // Populate from API once
  useEffect(() => {
    if (config && !initialized) {
      setCompanyName(config.companyName || '');
      setContactEmail(config.contactEmail || '');
      setContactPhone(config.contactPhone || '');
      setWhatsappNumber(''); // whatsapp is on Agent model, not site config
      setAddress(config.address || '');
      setFacebookUrl(config.facebookUrl || '');
      setInstagramUrl(config.instagramUrl || '');
      setDefaultWhatsappMessage(config.defaultWhatsappMessage || '');
      setCurrency(config.currency || 'INR');
      setTimezone(config.timezone || 'IST');
      setInitialized(true);
    }
  }, [config, initialized]);

  const handleSaveBranding = async () => {
    setIsSavingBranding(true);
    try {
      await updateConfig({
        companyName,
        contactEmail,
        contactPhone,
        address,
        facebookUrl,
        instagramUrl,
      }).unwrap();
      toast.success('Company information saved!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to save');
    } finally {
      setIsSavingBranding(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateConfig({
        companyName,
        contactEmail,
        contactPhone,
        address,
        facebookUrl,
        instagramUrl,
        defaultWhatsappMessage,
        currency,
        timezone,
      }).unwrap();
      toast.success('Branding settings saved successfully!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to save settings');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Branding & Site Settings</h1>
        <p className="text-gray-600 mt-1 text-sm">Manage your company information and site appearance. These details are shown on your marketplace.</p>
      </div>

      {/* Company Info */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
          <p className="text-xs text-gray-600 mt-0.5">These details appear in your marketplace's topbar, footer, and contact sections</p>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Company Name
              </label>
              <Input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Your Travel Agency Name"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <Input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="info@youragency.com"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>
              <Input
                type="tel"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                WhatsApp Number
              </label>
              <Input
                type="tel"
                value={whatsappNumber}
                disabled
                placeholder="Managed in Profile section"
                className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl h-auto text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">WhatsApp number is managed from your Profile page</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Office Address
            </label>
            <Textarea
              rows={2}
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="123 Travel Street, Mumbai, Maharashtra 400001"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Logo Upload
            </label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50 hover:border-blue-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
              <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium text-sm">
                Upload Logo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Facebook URL
              </label>
              <Input
                type="url"
                value={facebookUrl}
                onChange={e => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/yourpage"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Instagram URL
              </label>
              <Input
                type="url"
                value={instagramUrl}
                onChange={e => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/yourpage"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>
          </div>
        </div>

        {/* Save button for Company Info */}
        <div className="flex justify-end px-5 pb-5 pt-2 border-t border-gray-100 mx-0">
          <button
            onClick={handleSaveBranding}
            disabled={isSavingBranding}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 font-medium text-sm disabled:opacity-50"
          >
            {isSavingBranding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Building2 className="w-4 h-4" />}
            {isSavingBranding ? 'Saving...' : 'Save Company Info'}
          </button>
        </div>
      </div>

      {/* Advanced Theme Management */}
      <ThemeManagement />

      {/* Basic Site Settings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Basic Site Settings</h2>
          <p className="text-xs text-gray-600 mt-0.5">Configure general settings</p>
        </div>
        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Currency
              </label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-full h-[46px] bg-gray-50 border-gray-200 rounded-xl text-sm px-4">
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">₹ INR - Indian Rupee</SelectItem>
                  <SelectItem value="USD">$ USD - US Dollar</SelectItem>
                  <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Timezone
              </label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger className="w-full h-[46px] bg-gray-50 border-gray-200 rounded-xl text-sm px-4">
                  <SelectValue placeholder="Timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IST">IST - Indian Standard Time</SelectItem>
                  <SelectItem value="UTC">UTC - Coordinated Universal Time</SelectItem>
                  <SelectItem value="GST">GST - Gulf Standard Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Default WhatsApp Message
            </label>
            <Textarea
              rows={2}
              value={defaultWhatsappMessage}
              onChange={e => setDefaultWhatsappMessage(e.target.value)}
              placeholder="Hi! I'm interested in your travel packages. Can you help me plan my trip?"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 font-medium disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}