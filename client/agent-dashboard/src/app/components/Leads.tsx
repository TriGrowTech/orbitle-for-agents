import {
  Search, Download, Phone, Mail, MapPin, Calendar,
  Filter, CheckCircle, Clock, PhoneCall, MessageSquare, IndianRupee,
  XCircle, Users, FileText, Package, Zap, AlarmClock,
  User, Sun, Moon, Globe, ArrowRightLeft, Inbox, Bell, TrendingUp, Flame
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

type LeadSource = 'Hero Form' | 'Package Page' | 'Popup';
type LeadStatus = 'pending' | 'contacted' | 'follow_up' | 'quoted' | 'converted' | 'cancelled';
type Priority   = 'high' | 'medium' | 'low';

interface BaseLead {
  id: number;
  name: string;
  phone: string;
  destination: string;
  date: string;           // enquiry date (common to all)
  source: LeadSource;
  status: LeadStatus;
  priority: Priority;
}

interface PopupLead extends BaseLead {
  source: 'Popup';
  email?: string;
}

interface FormLead extends BaseLead {
  source: 'Hero Form';
  email: string;
  fromCity: string;       // traveler's departure city
  startDate: string;
  duration: string;
  travelers: number;
  budget: string;
  message: string;
}

interface PackageLead extends BaseLead {
  source: 'Package Page';
  email?: string;
  packageName: string;
  fromCity: string;       // traveler's departure city
  travelers: number;
  budget: string;
  startDate?: string;
}

type Lead = PopupLead | FormLead | PackageLead;

// ── Mock Data ──────────────────────────────────────────────────────────────────

const mockLeads: Lead[] = [
  {
    id: 1, source: 'Hero Form', status: 'pending', priority: 'high',
    name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@example.com',
    fromCity: 'Mumbai',
    destination: 'Bali', startDate: '2026-04-15', duration: '7 nights',
    travelers: 2, budget: '₹40,000 – ₹50,000',
    message: 'Looking for a honeymoon package with beach resort.',
    date: '2026-03-25',
  },
  {
    id: 2, source: 'Package Page', status: 'contacted', priority: 'high',
    name: 'Priya Patel', phone: '+91 98765 43211', email: 'priya@example.com',
    fromCity: 'Delhi',
    destination: 'Dubai', packageName: 'Dubai Delight – 6N/7D',
    travelers: 4, budget: '₹1,50,000+', startDate: '2026-05-01',
    date: '2026-03-25',
  },
  {
    id: 3, source: 'Popup', status: 'follow_up', priority: 'medium',
    name: 'Amit Kumar', phone: '+91 98765 43212', email: 'amit@example.com',
    destination: 'Maldives',
    date: '2026-03-24',
  },
  {
    id: 4, source: 'Hero Form', status: 'quoted', priority: 'medium',
    name: 'Sneha Reddy', phone: '+91 98765 43213', email: 'sneha@example.com',
    fromCity: 'Hyderabad',
    destination: 'Thailand', startDate: '2026-04-20', duration: '5 nights',
    travelers: 3, budget: '₹1,00,000 – ₹1,50,000',
    message: 'Interested in adventure + beach combo. Flexible on dates.',
    date: '2026-03-24',
  },
  {
    id: 5, source: 'Package Page', status: 'converted', priority: 'high',
    name: 'Vikram Singh', phone: '+91 98765 43214',
    fromCity: 'Bangalore',
    destination: 'Singapore', packageName: 'Singapore Explorer – 5N/6D',
    travelers: 5, budget: '₹2,00,000+',
    date: '2026-03-23',
  },
  {
    id: 6, source: 'Popup', status: 'cancelled', priority: 'low',
    name: 'Neha Gupta', phone: '+91 98765 43215', email: 'neha@example.com',
    destination: 'Goa',
    date: '2026-03-23',
  },
];

// ── Config helpers ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, {
  label: string; icon: any;
  color: string; bg: string; ring: string; border: string;
}> = {
  pending:   { label: 'Pending',   icon: Clock,        color: 'text-orange-700', bg: 'bg-orange-50',  ring: 'ring-orange-400/40', border: 'border-orange-300' },
  contacted: { label: 'Contacted', icon: PhoneCall,     color: 'text-blue-700',   bg: 'bg-blue-50',    ring: 'ring-blue-400/40',   border: 'border-blue-300'   },
  follow_up: { label: 'Follow Up', icon: MessageSquare, color: 'text-purple-700', bg: 'bg-purple-50',  ring: 'ring-purple-400/40', border: 'border-purple-300' },
  quoted:    { label: 'Quoted',    icon: IndianRupee,   color: 'text-indigo-700', bg: 'bg-indigo-50',  ring: 'ring-indigo-400/40', border: 'border-indigo-300' },
  converted: { label: 'Converted', icon: CheckCircle,   color: 'text-green-700',  bg: 'bg-green-50',   ring: 'ring-green-400/40',  border: 'border-green-300'  },
  cancelled: { label: 'Cancelled', icon: XCircle,       color: 'text-red-700',    bg: 'bg-red-50',     ring: 'ring-red-400/40',    border: 'border-red-300'    },
};

const SOURCE_CONFIG: Record<LeadSource, {
  label: string;
  color: string; bg: string; ring: string;
  accent: string;
  avatarGrad: string;
  icon: any;
}> = {
  'Hero Form':    { label: 'Hero Form',    color: 'text-sky-700',    bg: 'bg-sky-50',    ring: 'ring-sky-400/40',    accent: 'bg-sky-500',    avatarGrad: 'from-sky-500 to-cyan-500',      icon: FileText  },
  'Package Page': { label: 'Package Page', color: 'text-violet-700', bg: 'bg-violet-50', ring: 'ring-violet-400/40', accent: 'bg-violet-500', avatarGrad: 'from-violet-500 to-purple-600', icon: Package   },
  'Popup':        { label: 'Popup',        color: 'text-amber-700',  bg: 'bg-amber-50',  ring: 'ring-amber-400/40',  accent: 'bg-amber-400',  avatarGrad: 'from-amber-500 to-orange-500',  icon: Zap       },
};

// Status-driven card styles
const STATUS_HEADER: Record<string, {
  headerBg: string; headerBorder: string;
  iconBg: string;   iconColor: string;
  cardBorder: string;
}> = {
  pending:   { headerBg: 'bg-orange-50/70', headerBorder: 'border-orange-100', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', cardBorder: 'border-orange-300' },
  contacted: { headerBg: 'bg-blue-50/70',   headerBorder: 'border-blue-100',   iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   cardBorder: 'border-blue-300'   },
  follow_up: { headerBg: 'bg-purple-50/70', headerBorder: 'border-purple-100', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', cardBorder: 'border-purple-300' },
  quoted:    { headerBg: 'bg-indigo-50/70', headerBorder: 'border-indigo-100', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', cardBorder: 'border-indigo-300' },
  converted: { headerBg: 'bg-green-50/70',  headerBorder: 'border-green-100',  iconBg: 'bg-green-100',  iconColor: 'text-green-600',  cardBorder: 'border-green-400'  },
  cancelled: { headerBg: 'bg-red-50/70',    headerBorder: 'border-red-100',    iconBg: 'bg-red-100',    iconColor: 'text-red-600',    cardBorder: 'border-red-300'    },
};

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as LeadStatus[];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
}

// ── Component ──────────────────────────────────────────────────────────────────

export function Leads() {
  const [searchTerm, setSearchTerm]           = useState('');
  const [filterStatus, setFilterStatus]       = useState<string>('all');
  const [filterSource, setFilterSource]       = useState<string>('all');
  const [leadStatuses, setLeadStatuses]       = useState<Record<number, string>>(
    mockLeads.reduce((acc, l) => ({ ...acc, [l.id]: l.status }), {})
  );
  const [openStatusDropdown, setOpenStatusDropdown] = useState<number | null>(null);
  const [openSourceDropdown, setOpenSourceDropdown] = useState(false);

  const allSources = Object.keys(SOURCE_CONFIG) as LeadSource[];

  const updateLeadStatus = (leadId: number, newStatus: string) => {
    setLeadStatuses(prev => ({ ...prev, [leadId]: newStatus }));
    setOpenStatusDropdown(null);
  };

  const filteredLeads = mockLeads.filter(lead => {
    const currentStatus = leadStatuses[lead.id];
    const pkg = lead.source === 'Package Page' ? (lead as PackageLead).packageName : '';
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      pkg?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || currentStatus === filterStatus;
    const matchesSource = filterSource === 'all' || lead.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  // ── Status dropdown ────────────────────────────────────────────────────────
  const StatusDropdown = ({ lead }: { lead: Lead }) => {
    const currentStatus = leadStatuses[lead.id];
    const c = STATUS_CONFIG[currentStatus];
    const SIcon = c.icon;
    const isOpen = openStatusDropdown === lead.id;
    return (
      <div className="relative">
        <button
          onClick={e => { e.stopPropagation(); setOpenStatusDropdown(isOpen ? null : lead.id); }}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold ring-1 transition-colors ${c.bg} ${c.color} ${c.ring}`}
        >
          <SIcon className="w-2.5 h-2.5" />
          {c.label}
          <span className="ml-0.5 opacity-60">▾</span>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpenStatusDropdown(null)} />
            <div className="absolute right-0 top-full mt-1.5 w-38 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden min-w-[140px]">
              <div className="px-3 py-1.5 border-b border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Set Status</p>
              </div>
              {ALL_STATUSES.map(s => {
                const c = STATUS_CONFIG[s];
                const SIcon = c.icon;
                return (
                  <button
                    key={s}
                    onClick={() => updateLeadStatus(lead.id, s)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 ${currentStatus === s ? c.bg + ' ' + c.color : 'text-gray-700'}`}
                  >
                    <SIcon className={`w-3.5 h-3.5 flex-shrink-0 ${c.color}`} />
                    {c.label}
                    {currentStatus === s && <CheckCircle className="w-3 h-3 text-blue-500 ml-auto" />}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  };

  // ── Shared action bar ──────────────────────────────────────────────────────
  const CardActions = ({ phone }: { phone: string }) => (
    <div className="flex items-center gap-2 w-full">
      <a
        href={`tel:${phone}`}
        className="w-1/2 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all duration-200"
        title="Call"
      >
        <Phone className="w-3.5 h-3.5" /> Call
      </a>
      <a
        href={`https://wa.me/${phone.replace(/\D/g, '')}`}
        target="_blank" rel="noreferrer"
        className="w-1/2 flex items-center justify-center gap-1.5 py-2 rounded-md bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-xs shadow-sm transition-all duration-200"
        title="WhatsApp"
      >
        <FaWhatsapp style={{ width: 14, height: 14 }} /> WhatsApp
      </a>
    </div>
  );

  // ── Shared card header ─────────────────────────────────────────────────────
  const CardHeader = ({ lead, srcCfg, srcLabel }: { lead: Lead; srcCfg: typeof SOURCE_CONFIG['Popup']; srcLabel: string }) => {
    const sh = STATUS_HEADER[leadStatuses[lead.id]] || STATUS_HEADER.pending;
    return (
      <div className={`p-2.5 border-b ${sh.headerBg} ${sh.headerBorder}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${sh.iconBg} ${sh.iconColor}`}>
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">{lead.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold ring-1 whitespace-nowrap ${srcCfg.bg} ${srcCfg.color} ${srcCfg.ring}`}>
                  <srcCfg.icon className="w-2 h-2" />&#8202;{srcLabel}
                </span>
                {lead.priority === 'high' && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-red-50 text-red-600 ring-1 ring-red-300 whitespace-nowrap">
                    <Flame className="w-2 h-2" /> High
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <StatusDropdown lead={lead} />
            <span className="text-[10px] text-slate-400 font-medium">{formatDate(lead.date)}</span>
          </div>
        </div>
      </div>
    );
  };

  // ── Shared From→To route block ─────────────────────────────────────────────
  const RouteBlock = ({
    fromCity, toCity,
    date, days, nights,
  }: {
    fromCity: string; toCity: string;
    date?: string; days?: number; nights?: number;
  }) => (
    <div className="bg-slate-900 rounded-lg p-2.5">
      {/* From / Arrow / To */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">From</div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="text-white font-bold text-xs truncate">{fromCity}</span>
          </div>
        </div>
        <div className="flex-shrink-0 mx-2">
          <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
            <ArrowRightLeft className="w-3 h-3 text-slate-300" />
          </div>
        </div>
        <div className="flex-1 min-w-0 text-right">
          <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">To</div>
          <div className="flex items-center justify-end gap-1">
            <span className="text-white font-bold text-xs truncate">{toCity}</span>
            <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Date + D/N badges */}
      {(date || days) && (
        <>
          <div className="h-px bg-slate-700 mb-2" />
          <div className="flex items-center justify-between">
            {date && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/20 rounded border border-amber-500/30">
                <Calendar className="w-3 h-3 text-amber-300" />
                <span className="text-[10px] font-semibold text-amber-200">{date}</span>
              </div>
            )}
            {(days !== undefined && nights !== undefined) && (
              <div className="flex items-center gap-1.5 ml-auto">
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-bold text-white">{days}D</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded">
                  <Moon className="w-3 h-3 text-blue-300" />
                  <span className="text-[10px] font-bold text-white">{nights}N</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  // ── Card: Popup ────────────────────────────────────────────────────────────
  const PopupCard = ({ lead }: { lead: PopupLead }) => {
    const src = SOURCE_CONFIG['Popup'];
    const sh  = STATUS_HEADER[leadStatuses[lead.id]] || STATUS_HEADER.pending;
    return (
      <div className={`flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${sh.cardBorder}`}>
        <CardHeader lead={lead} srcCfg={src} srcLabel="Popup" />

        <div className="p-2.5 space-y-2">
          {/* Simple destination (Popup has no fromCity) */}
          <div className="bg-slate-900 rounded-lg p-3">
            <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-2">Destination</div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span className="text-white font-bold text-sm">{lead.destination}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-2">Contact Details</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-xs font-semibold text-slate-800">{lead.phone}</span>
              </div>
              {lead.email && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-xs text-slate-500 truncate">{lead.email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <AlarmClock className="w-3 h-3" />
            Enquired {formatDate(lead.date)}
          </div>
        </div>

        <div className="mt-auto px-2.5 pb-2.5">
          <CardActions phone={lead.phone} />
        </div>
      </div>
    );
  };

  // ── Card: Hero Form ────────────────────────────────────────────────────────
  const FormCard = ({ lead }: { lead: FormLead }) => {
    const src = SOURCE_CONFIG['Hero Form'];
    const sh  = STATUS_HEADER[leadStatuses[lead.id]] || STATUS_HEADER.pending;
    const n      = parseInt(lead.duration);
    const nights = isNaN(n) ? 0 : (lead.duration.includes('night') ? n : Math.max(0, n - 1));
    const days   = isNaN(n) ? 0 : (lead.duration.includes('night') ? n + 1 : n);
    return (
      <div className={`flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${sh.cardBorder}`}>
        <CardHeader lead={lead} srcCfg={src} srcLabel="Hero Form" />

        <div className="p-2.5 space-y-2">
          {/* From → To route block */}
          <RouteBlock
            fromCity={lead.fromCity}
            toCity={lead.destination}
            date={formatDate(lead.startDate)}
            days={days}
            nights={nights}
          />

          {/* Stat grid: Travelers + Budget */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                  <Users className="w-3 h-3 text-purple-700" />
                </div>
                <span className="text-[9px] font-bold text-purple-800 uppercase tracking-wide">Travelers</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{lead.travelers} pax</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 border border-green-200">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                  <IndianRupee className="w-3 h-3 text-green-700" />
                </div>
                <span className="text-[9px] font-bold text-green-800 uppercase tracking-wide">Budget</span>
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">{lead.budget}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-2">Contact Details</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-xs font-semibold text-slate-800">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-xs text-slate-500 truncate">{lead.email}</span>
              </div>
            </div>
          </div>

          {/* Message */}
          {lead.message && (
            <div className="bg-rose-50 rounded-lg p-2 border border-rose-200">
              <div className="flex items-start gap-1.5">
                <div className="w-5 h-5 bg-rose-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-3 h-3 text-rose-700" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-rose-800 uppercase tracking-wide mb-0.5">Note</div>
                  <p className="text-xs text-slate-700 leading-snug line-clamp-2">{lead.message}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <AlarmClock className="w-3 h-3" />
            Enquired {formatDate(lead.date)}
          </div>
        </div>

        <div className="mt-auto px-2.5 pb-2.5">
          <CardActions phone={lead.phone} />
        </div>
      </div>
    );
  };

  // ── Card: Package Page ─────────────────────────────────────────────────────
  const PackageCard = ({ lead }: { lead: PackageLead }) => {
    const src = SOURCE_CONFIG['Package Page'];
    const sh  = STATUS_HEADER[leadStatuses[lead.id]] || STATUS_HEADER.pending;
    return (
      <div className={`flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${sh.cardBorder}`}>
        <CardHeader lead={lead} srcCfg={src} srcLabel="Package" />

        <div className="p-2.5 space-y-2">
          {/* Package name banner */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-violet-50 rounded-lg border border-violet-200">
            <Package className="w-3.5 h-3.5 text-violet-600 flex-shrink-0" />
            <p className="text-xs font-bold text-violet-900 truncate">{lead.packageName}</p>
          </div>

          {/* From → To route block */}
          <RouteBlock
            fromCity={lead.fromCity}
            toCity={lead.destination}
            date={lead.startDate ? formatDate(lead.startDate) : undefined}
          />

          {/* Stat grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
                  <Users className="w-3 h-3 text-purple-700" />
                </div>
                <span className="text-[9px] font-bold text-purple-800 uppercase tracking-wide">Travelers</span>
              </div>
              <p className="text-sm font-bold text-slate-900">{lead.travelers} pax</p>
            </div>
            <div className="bg-green-50 rounded-lg p-2 border border-green-200">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                  <IndianRupee className="w-3 h-3 text-green-700" />
                </div>
                <span className="text-[9px] font-bold text-green-800 uppercase tracking-wide">Budget</span>
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">{lead.budget}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-2">Contact Details</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3 h-3 text-gray-600" />
                </div>
                <span className="text-xs font-semibold text-slate-800">{lead.phone}</span>
              </div>
              {lead.email && (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-xs text-slate-500 truncate">{lead.email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <AlarmClock className="w-3 h-3" />
            Enquired {formatDate(lead.date)}
          </div>
        </div>

        <div className="mt-auto px-2.5 pb-2.5">
          <CardActions phone={lead.phone} />
        </div>
      </div>
    );
  };

  // ── Render card based on source ────────────────────────────────────────────
  const renderCard = (lead: Lead) => {
    if (lead.source === 'Popup')        return <PopupCard   key={lead.id} lead={lead as PopupLead}   />;
    if (lead.source === 'Hero Form')    return <FormCard    key={lead.id} lead={lead as FormLead}    />;
    if (lead.source === 'Package Page') return <PackageCard key={lead.id} lead={lead as PackageLead} />;
    return null;
  };

  // ── Main render ────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads &amp; Enquiries</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage customer enquiries</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center gap-2 w-fit text-sm font-medium">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { Icon: Inbox,      label: 'Total Leads', value: '127', change: '+12%', grad: 'from-blue-500 to-blue-600',     shadow: 'shadow-blue-500/30'   },
          { Icon: CheckCircle,label: 'Contacted',   value: '45',  change: '+8%',  grad: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/30'  },
          { Icon: Bell,       label: 'Pending',     value: '82',  change: 'New',  grad: 'from-orange-500 to-red-500',    shadow: 'shadow-orange-500/30' },
          { Icon: TrendingUp, label: 'Conversion',  value: '24%', change: '+15%', grad: 'from-purple-500 to-pink-500',   shadow: 'shadow-purple-500/30' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-lg ${s.shadow}`}>
                <s.Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-green-600">{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter Panel */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/60 shadow-sm space-y-3">

        {/* Row 1: Search + Source Dropdown */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, phone, destination..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Source filter button */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setOpenSourceDropdown(!openSourceDropdown)}
              className={`h-full px-3.5 rounded-xl border text-sm font-medium flex items-center gap-2 transition-all ${
                filterSource !== 'all'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">
                {filterSource === 'all' ? 'Source' : filterSource}
              </span>
              {filterSource !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-blue-500 sm:hidden" />
              )}
            </button>

            {openSourceDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenSourceDropdown(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Filter by Source</p>
                  </div>
                  <button
                    onClick={() => { setFilterSource('all'); setOpenSourceDropdown(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 ${filterSource === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                  >
                    <Globe className="w-4 h-4 text-gray-400" /> All Sources
                    {filterSource === 'all' && <CheckCircle className="w-3.5 h-3.5 text-blue-500 ml-auto" />}
                  </button>
                  {allSources.map(src => {
                    const c = SOURCE_CONFIG[src];
                    const SrcIcon = c.icon;
                    return (
                      <button
                        key={src}
                        onClick={() => { setFilterSource(src); setOpenSourceDropdown(false); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 ${filterSource === src ? c.bg + ' ' + c.color : 'text-gray-700'}`}
                      >
                        <SrcIcon className={`w-4 h-4 ${c.color}`} /> {c.label}
                        {filterSource === src && <CheckCircle className="w-3.5 h-3.5 text-blue-500 ml-auto" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Row 2: Status pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Status</span>
          {(['all', ...ALL_STATUSES] as const).map(s => {
            const isAll = s === 'all';
            const c = isAll ? null : STATUS_CONFIG[s];
            const active = filterStatus === s;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  active
                    ? isAll
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : `${c!.bg} ${c!.color} ring-1 ${c!.ring}`
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {isAll ? 'All' : c!.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLeads.map(renderCard)}
      </div>

      {/* Empty State */}
      {filteredLeads.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/60 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">No leads found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
