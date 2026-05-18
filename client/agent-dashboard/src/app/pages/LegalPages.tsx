import { useState, useEffect } from 'react';
import { FileCheck, Shield, Save, Loader2, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useGetLegalPagesQuery, useUpsertLegalPageMutation } from '../api/legalApi';
import { toast } from 'sonner';

type TabKey = 'privacy_policy' | 'terms_of_service' | 'refund_policy' | 'cancellation_policy';

const TABS: { key: TabKey; label: string; icon: typeof Shield }[] = [
  { key: 'privacy_policy', label: 'Privacy Policy', icon: Shield },
  { key: 'terms_of_service', label: 'Terms & Conditions', icon: FileCheck },
  { key: 'refund_policy', label: 'Refund Policy', icon: RefreshCw },
  { key: 'cancellation_policy', label: 'Cancellation', icon: FileCheck },
];

export function LegalPages() {
  const [activeTab, setActiveTab] = useState<TabKey>('privacy_policy');
  const { data, isLoading } = useGetLegalPagesQuery();
  const [upsertLegal, { isLoading: isSaving }] = useUpsertLegalPageMutation();

  const [formData, setFormData] = useState<Record<TabKey, { title: string; content: string; isPublished: boolean }>>({
    privacy_policy: { title: 'Privacy Policy', content: '', isPublished: false },
    terms_of_service: { title: 'Terms & Conditions', content: '', isPublished: false },
    refund_policy: { title: 'Refund Policy', content: '', isPublished: false },
    cancellation_policy: { title: 'Cancellation Policy', content: '', isPublished: false },
  });

  useEffect(() => {
    if (data?.data) {
      const updated = { ...formData };
      for (const page of data.data) {
        if (page.pageType in updated) {
          updated[page.pageType as TabKey] = {
            title: page.title || '',
            content: page.content || '',
            isPublished: page.isPublished ?? false,
          };
        }
      }
      setFormData(updated);
    }
  }, [data]);

  const current = formData[activeTab];

  const handleSave = async (publish?: boolean) => {
    try {
      const isPublished = publish !== undefined ? publish : current.isPublished;
      await upsertLegal({
        pageType: activeTab,
        data: { title: current.title, content: current.content, isPublished },
      }).unwrap();
      if (publish !== undefined) {
        setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], isPublished: publish } }));
      }
      toast.success(`${TABS.find(t => t.key === activeTab)?.label} saved!`);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to save');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-blue-600 animate-spin" /></div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Legal Pages</h1>
        <p className="text-sm text-gray-600 mt-0.5">Manage your legal documents — they appear on your marketplace</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}>
                <Icon className="w-4 h-4" />{tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Page Title</label>
            <Input type="text" value={current.title}
              onChange={(e) => setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], title: e.target.value } }))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg h-auto" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Content</label>
            <Textarea rows={16} value={current.content}
              onChange={(e) => setFormData(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], content: e.target.value } }))}
              placeholder="Enter your legal content here..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg font-mono" />
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => handleSave(!current.isPublished)}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-medium transition-colors ${
                current.isPublished ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {current.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              {current.isPublished ? 'Published' : 'Draft — Click to Publish'}
            </button>
            <button onClick={() => handleSave()} disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm disabled:opacity-50">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
