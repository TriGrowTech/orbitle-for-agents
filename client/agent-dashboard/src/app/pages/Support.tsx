import { useState, useRef } from 'react';
import {
  PhoneCall,
  CheckCircle2,
  Send,
  Image as ImageIcon,
  X,
  ChevronDown,
  Headphones,
  MessageSquare,
  Clock,
  Zap,
} from 'lucide-react';

type QueryType = 'billing' | 'technical' | 'feature' | 'general' | '';

const queryTypes: { value: QueryType; label: string; emoji: string }[] = [
  { value: 'billing', label: 'Billing & Payments', emoji: '💳' },
  { value: 'technical', label: 'Technical Issue', emoji: '🔧' },
  { value: 'feature', label: 'Feature Request', emoji: '✨' },
  { value: 'general', label: 'General Enquiry', emoji: '💬' },
];

export function Support() {
  const [called, setCalled] = useState(false);
  const [queryType, setQueryType] = useState<QueryType>('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const MAX_IMAGES = 3;
  const MIN_CHARS = 20;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = MAX_IMAGES - images.length;
    Array.from(files).slice(0, remaining).forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        setImages(prev => [...prev, { name: file.name, url: e.target?.result as string }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx: number) =>
    setImages(prev => prev.filter((_, i) => i !== idx));

  const canSubmit = queryType && message.trim().length >= MIN_CHARS;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setQueryType('');
    setMessage('');
    setImages([]);
    setSubmitted(false);
  };

  const selectedType = queryTypes.find(q => q.value === queryType);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Support Center</h1>
        <p className="text-gray-500 text-sm mt-1">We're here to help — pick how you'd like to reach us</p>
      </div>

      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm flex flex-col lg:flex-row overflow-hidden">
        
        {/* ── Left Column: Call ───────────────────────────────────────────── */}
        <div className="flex-1 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-between relative bg-white">
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mb-5">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Schedule a Call</h2>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Connect directly with our support specialist. Click the button below and we'll reach out to your registered contact details.
            </p>

            <div className="space-y-3 mb-6">
              {[
                { icon: Clock, text: 'Response within 1 business day' },
                { icon: Zap,   text: 'Expert 1-on-1 platform guidance' },
                { icon: Headphones, text: 'Available Mon-Fri, 9am - 6pm' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{text}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50/80 rounded-xl p-4 mb-8 border border-gray-100">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Commonly Discussed</h3>
              <ul className="space-y-2.5">
                {[
                  { color: 'bg-blue-400', label: 'Platform Onboarding & Setup' },
                  { color: 'bg-purple-400', label: 'Billing & Plan Upgrades' },
                  { color: 'bg-emerald-400', label: 'Technical Troubleshooting' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color} flex-shrink-0`} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {!called ? (
              <button
                onClick={() => setCalled(true)}
                className="w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Schedule Call
              </button>
            ) : (
              <div className="flex flex-col items-center gap-2 py-4 text-center animate-in fade-in zoom-in-95 duration-200 bg-gray-50 rounded-xl border border-gray-100">
                <CheckCircle2 className="w-5 h-5 text-green-600 mb-1" />
                <h3 className="font-semibold text-gray-900 text-sm">Call Scheduled</h3>
                <p className="text-gray-500 text-xs px-4">Expect to hear back from us soon.</p>
                <button
                  onClick={() => setCalled(false)}
                  className="mt-2 text-xs text-blue-600 font-medium hover:underline"
                >
                  Schedule another
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right Column: Written Query ─────────────────────────────────── */}
        <div className="flex-[1.4] p-6 lg:p-8 bg-gray-50/30">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-purple-50 text-purple-600 mb-5">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Send us a message</h2>
          <p className="text-sm text-gray-500 mb-6">Describe your issue and attach any screenshots if needed.</p>

          {!submitted ? (
            <div className="space-y-5">
              {/* Query Type Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Topic <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(o => !o)}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 border border-gray-300 shadow-sm rounded-lg text-sm bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <span className={selectedType ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                      {selectedType ? `${selectedType.emoji} ${selectedType.label}` : 'Select topic…'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                      {queryTypes.map(qt => (
                        <button
                          key={qt.value}
                          type="button"
                          onClick={() => { setQueryType(qt.value); setDropdownOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm text-left transition-colors hover:bg-gray-50 ${queryType === qt.value ? 'bg-blue-50/50 text-blue-700 font-semibold' : 'text-gray-700'}`}
                        >
                          <span className="text-base">{qt.emoji}</span>
                          {qt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-[10px] font-medium transition-colors ${message.trim().length >= MIN_CHARS ? 'text-green-600' : 'text-gray-400'}`}>
                    {message.trim().length} / {MIN_CHARS}
                  </span>
                </div>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Describe your issue or question in detail..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 shadow-sm rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                />
              </div>

              {/* Image Attachments */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Attachments <span className="text-gray-400 font-normal lowercase tracking-normal">(up to {MAX_IMAGES})</span>
                </label>

                <div className="flex gap-3 items-start">
                  {/* Existing previews */}
                  {images.map((img, i) => (
                    <div key={i} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm shrink-0">
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}

                  {images.length < MAX_IMAGES && (
                    <label
                      className={`flex flex-col items-center justify-center w-16 h-16 border border-dashed rounded-lg cursor-pointer transition-colors shrink-0 ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50 bg-white'}`}
                      onDragOver={e => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
                    >
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={e => handleFiles(e.target.files)}
                      />
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </label>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full mt-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Query
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[340px] text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-green-50/50">
                <CheckCircle2 className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Query Submitted</h3>
              <p className="text-gray-500 text-sm max-w-sm mb-6">
                Your message has been securely sent to our support team. We'll respond to your registered email typically within 1 business day.
              </p>
              <button
                onClick={handleReset}
                className="px-5 py-2 inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              >
                Send Another
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
