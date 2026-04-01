import { Upload, Globe, Palette, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Save } from 'lucide-react';
import { ThemeManagement } from '../components/ThemeManagement';
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

export function BrandingSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Branding & Site Settings</h1>
        <p className="text-gray-600 mt-2">Manage your company information and site appearance</p>
      </div>

      {/* Company Info */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
          <p className="text-sm text-gray-600 mt-1">Update your business details</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name
              </label>
              <Input
                type="text"
                defaultValue="Orbitle Travel"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                defaultValue="info@orbitle.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                defaultValue="+91 98765 43210"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <Input
                type="tel"
                defaultValue="+91 98765 43210"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Office Address
            </label>
            <Textarea
              rows={3}
              defaultValue="123 Travel Street, Mumbai, Maharashtra 400001"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Logo Upload
            </label>
            <div className="flex items-center gap-4">
              <div className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50 hover:border-blue-400 transition-colors">
                <Upload className="w-10 h-10 text-gray-400" />
              </div>
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all font-medium">
                Upload Logo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook URL
              </label>
              <Input
                type="url"
                placeholder="https://facebook.com/yourpage"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instagram URL
              </label>
              <Input
                type="url"
                placeholder="https://instagram.com/yourpage"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Theme Management */}
      <ThemeManagement />

      {/* Basic Site Settings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Basic Site Settings</h2>
          <p className="text-sm text-gray-600 mt-1">Configure general settings</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Currency
              </label>
              <Select defaultValue="INR">
                <SelectTrigger className="w-full h-[52px] bg-gray-50 border-gray-200 rounded-xl text-sm px-4">
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Timezone
              </label>
              <Select defaultValue="IST">
                <SelectTrigger className="w-full h-[52px] bg-gray-50 border-gray-200 rounded-xl text-sm px-4">
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Default WhatsApp Message
            </label>
            <Textarea
              rows={3}
              defaultValue="Hi! I'm interested in your travel packages. Can you help me plan my trip?"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 font-medium">
          <Save className="w-5 h-5" />
          Save All Changes
        </button>
      </div>
    </div>
  );
}