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
  Loader2,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';
import {
  useCreateTicketMutation,
  useCreateCallRequestMutation,
  useGetMyTicketsQuery,
  useGetTicketDetailQuery,
  useReplyToTicketMutation,
} from '../api/supportApi';
import { toast } from 'sonner';

type QueryType = 'billing' | 'technical' | 'feature' | 'general' | '';

const queryTypes: { value: QueryType; label: string; emoji: string }[] = [
  { value: 'billing', label: 'Billing & Payments', emoji: '💳' },
  { value: 'technical', label: 'Technical Issue', emoji: '🔧' },
  { value: 'feature', label: 'Feature Request', emoji: '✨' },
  { value: 'general', label: 'General Enquiry', emoji: '💬' },
];

export function Support() {
  const [activeTab, setActiveTab] = useState<'get-help' | 'my-tickets'>('get-help');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [called, setCalled] = useState(false);
  const [queryType, setQueryType] = useState<QueryType>('');
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [replyText, setReplyText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const [createTicket, { isLoading: isSubmitting }] = useCreateTicketMutation();
  const [createCallRequest, { isLoading: isScheduling }] = useCreateCallRequestMutation();
  const [replyToTicket, { isLoading: isReplying }] = useReplyToTicketMutation();

  // RTK queries for My Tickets tab
  const { data: ticketsData, isLoading: isTicketsLoading } = useGetMyTicketsQuery(undefined, {
    skip: activeTab !== 'my-tickets',
  });
  const { data: ticketDetailData, isLoading: isDetailLoading } = useGetTicketDetailQuery(
    selectedTicketId || '',
    { skip: !selectedTicketId }
  );

  const tickets = ticketsData?.data ?? [];
  const selectedTicket = ticketDetailData?.data;

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

  const canSubmit = queryType && message.trim().length >= MIN_CHARS && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      await createTicket({
        type: queryType,
        subject: `${queryType.charAt(0).toUpperCase() + queryType.slice(1)} Query`,
        message: message.trim(),
      }).unwrap();

      setSubmitted(true);
      toast.success('Query submitted successfully!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to submit query. Please try again.');
    }
  };

  const handleScheduleCall = async () => {
    try {
      await createCallRequest({}).unwrap();
      setCalled(true);
      toast.success('Call request submitted!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to schedule call. Please try again.');
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicketId) return;

    try {
      await replyToTicket({
        id: selectedTicketId,
        message: replyText.trim(),
      }).unwrap();
      setReplyText('');
      toast.success('Reply sent!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to send reply. Please try again.');
    }
  };

  const handleReset = () => {
    setQueryType('');
    setMessage('');
    setImages([]);
    setSubmitted(false);
  };

  const selectedType = queryTypes.find(q => q.value === queryType);

  const getTopicLabel = (type: string) => {
    if (type === 'billing') return '💳 Billing & Payments';
    if (type === 'technical') return '🔧 Technical Issue';
    if (type === 'feature') return '✨ Feature Request';
    return '💬 General Enquiry';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Support Center</h1>
          <p className="text-gray-500 text-sm mt-1">We're here to help — pick how you'd like to reach us</p>
        </div>

        {/* Tab switcher */}
        <div className="bg-gray-100 p-1.5 rounded-xl flex gap-1 self-start sm:self-center border border-gray-200/50 shadow-sm">
          <button
            onClick={() => {
              setActiveTab('get-help');
              setSelectedTicketId(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'get-help'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Get Help
          </button>
          <button
            onClick={() => {
              setActiveTab('my-tickets');
              setSelectedTicketId(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'my-tickets'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            My Tickets
          </button>
        </div>
      </div>

      {activeTab === 'get-help' ? (
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
                  { icon: Zap, text: 'Expert 1-on-1 platform guidance' },
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
                  onClick={handleScheduleCall}
                  disabled={isScheduling}
                  className="w-full py-2.5 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isScheduling ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <PhoneCall className="w-4 h-4" />
                  )}
                  {isScheduling ? 'Scheduling...' : 'Schedule Call'}
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
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Query'}
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
      ) : (
        /* ── MY TICKETS TAB ─────────────────────────────────────────────── */
        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-sm p-6 overflow-hidden">
          {!selectedTicketId ? (
            /* Ticket List View */
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900">Your Support Tickets</h2>
              {isTicketsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                </div>
              ) : tickets.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  You haven't submitted any support tickets yet.
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-100 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Topic</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map(ticket => (
                        <tr key={ticket._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="p-4 text-sm font-semibold text-gray-700 whitespace-nowrap">
                            {getTopicLabel(ticket.type)}
                          </td>
                          <td className="p-4 text-sm text-gray-900 font-medium max-w-xs truncate">
                            {ticket.subject}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                              ticket.status === 'open' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                              ticket.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                              'bg-green-50 text-green-700 border border-green-100'
                            }`}>
                              {ticket.status === 'in_progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedTicketId(ticket._id)}
                              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors"
                            >
                              View Ticket
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            /* Ticket Detail & Thread Chat View */
            <div className="space-y-6">
              <button
                onClick={() => setSelectedTicketId(null)}
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to all tickets
              </button>

              {isDetailLoading || !selectedTicket ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Ticket Summary Header */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        {getTopicLabel(selectedTicket.type)}
                      </span>
                      <h2 className="text-lg font-bold text-gray-900 mt-1">{selectedTicket.subject}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        selectedTicket.status === 'open' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        selectedTicket.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                        'bg-green-50 text-green-700 border border-green-100'
                      }`}>
                        Status: {selectedTicket.status === 'in_progress' ? 'In Progress' : selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(selectedTicket.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Conversation Thread */}
                  <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 max-h-[480px] overflow-y-auto space-y-4">
                    {/* Agent Original Message (Right) */}
                    <div className="flex items-start gap-3 max-w-[85%] ml-auto flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                        ME
                      </div>
                      <div className="bg-blue-600 border border-blue-700 text-white rounded-2xl rounded-tr-none p-4 shadow-sm">
                        <p className="text-[10px] text-blue-100 font-bold mb-1">Original Enquiry</p>
                        <p className="text-sm font-medium leading-relaxed">{selectedTicket.message}</p>
                        <p className="text-[9px] text-blue-200 mt-1 text-right">
                          {new Date(selectedTicket.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Replies */}
                    {selectedTicket.replies?.map((reply, i) => {
                      const isSA = reply.from === 'superadmin';
                      return (
                        <div
                          key={i}
                          className={`flex items-start gap-3 max-w-[85%] ${
                            isSA ? 'mr-auto' : 'ml-auto flex-row-reverse'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 shadow-sm ${
                            isSA ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-600 text-white'
                          }`}>
                            {isSA ? 'SA' : 'ME'}
                          </div>
                          <div className={`p-4 shadow-sm border rounded-2xl ${
                            isSA
                              ? 'bg-white text-gray-800 border-gray-200/80 rounded-tl-none'
                              : 'bg-blue-600 text-white border-blue-700 rounded-tr-none'
                          }`}>
                            <p className={`text-[10px] font-bold mb-1 ${isSA ? 'text-purple-600' : 'text-blue-100'}`}>
                              {isSA ? 'Orbitle Support' : 'Me'}
                            </p>
                            <p className="text-sm font-medium leading-relaxed">{reply.message}</p>
                            <p className={`text-[9px] mt-1 text-right ${isSA ? 'text-gray-400' : 'text-blue-200'}`}>
                              {new Date(reply.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reply Form */}
                  <div>
                    {selectedTicket.status === 'resolved' ? (
                      <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center text-sm font-medium text-green-800">
                        This support ticket has been resolved. If you have any further questions, please create a new ticket.
                      </div>
                    ) : (
                      <form onSubmit={handleSendReply} className="space-y-3">
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Type Reply
                        </label>
                        <textarea
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          rows={3}
                          placeholder="Type your response to support..."
                          className="w-full px-3.5 py-2.5 border border-gray-300 shadow-sm rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                          required
                          disabled={isReplying}
                        />
                        <button
                          type="submit"
                          disabled={isReplying || !replyText.trim()}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                          {isReplying ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          {isReplying ? 'Sending...' : 'Send Reply'}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
