/**
 * Leads.tsx
 *
 * Page shell for the Leads & Enquiries section.
 * Responsible for:
 *   - Reading + writing CRM state
 *   - Filtering leads by search / status / source
 *   - Highlight-on-navigate (from Revenue Analytics)
 *   - Laying out the header, stats bar, filter panel, and card grid
 *
 * Card rendering  → leads/LeadCard.tsx
 * Modal rendering → leads/LeadModals.tsx
 * Config/helpers  → leads/leadConfig.ts
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Search, Download, Filter, CheckCircle, Globe,
  Inbox, Bell, IndianRupee, TrendingUp, Plus,
} from 'lucide-react';

import { useCRMContext, Lead, PackageLead } from '../context/CRMContext';
import { STATUS_CONFIG, SOURCE_CONFIG, ALL_STATUSES, ALL_SOURCES } from '../components/leads/leadConfig';
import { renderLeadCard } from '../components/leads/LeadCard';
import { ManualEntryModal, ConversionModal, ManualFormData } from '../components/leads/LeadModals';
import { Input } from "../components/ui/input";
import { useUpdateLeadStatusMutation } from '../api/leadsApi';

export function Leads() {
  const navigate = useNavigate();
  const location = useLocation();
  const { leadsData, setLeadsData, leadStatuses, setLeadStatuses, dealValues, setDealValues } = useCRMContext();
  const [updateStatus] = useUpdateLeadStatusMutation();

  // ── Filter state ───────────────────────────────────────────────────────────
  const [searchTerm,   setSearchTerm]   = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');

  // ── UI open/close state ────────────────────────────────────────────────────
  const [openStatusDropdown, setOpenStatusDropdown] = useState<string | number | null>(null);
  const [openSourceDropdown, setOpenSourceDropdown] = useState(false);
  const [isManualModalOpen,  setIsManualModalOpen]  = useState(false);
  const [conversionLead,     setConversionLead]     = useState<Lead | undefined>();

  // ── Highlight state (navigated here from Revenue Analytics) ───────────────
  const [highlightedId, setHighlightedId] = useState<string | number | null>(null);
  const cardRefs = useRef<Record<string | number, HTMLDivElement | null>>({});

  useEffect(() => {
    const state = location.state as { highlightId?: number } | null;
    if (!state?.highlightId) return;

    const targetId = state.highlightId;
    setSearchTerm('');
    setFilterStatus('all');
    setFilterSource('all');
    setHighlightedId(targetId);

    const timer = setTimeout(() => {
      cardRefs.current[targetId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => setHighlightedId(null), 2500);
    }, 100);

    window.history.replaceState({}, '');
    return () => clearTimeout(timer);
  }, [location.state]);

  // ── Status change handler ──────────────────────────────────────────────────
  // Intercepts "converted" to open the deal-value modal first.
  const handleStatusChange = async (leadId: string | number, newStatus: string) => {
    if (newStatus === 'converted') {
      setConversionLead(leadsData.find(l => l.id === leadId));
      setOpenStatusDropdown(null);
    } else {
      setLeadStatuses(prev => ({ ...prev, [leadId]: newStatus }));
      setOpenStatusDropdown(null);
      // Update backend if it's a real lead (string ID)
      if (typeof leadId === 'string') {
        try {
          await updateStatus({ id: leadId, status: newStatus }).unwrap();
        } catch (error) {
          console.error('Failed to update status:', error);
        }
      }
    }
  };

  // ── Manual entry submit ────────────────────────────────────────────────────
  const handleManualSubmit = (data: ManualFormData) => {
    const newId = Math.max(...leadsData.map(l => l.id), 0) + 1;
    setLeadsData([
      { id: newId, source: 'Manual Entry', status: 'pending', priority: 'high', date: new Date().toISOString().split('T')[0], ...data },
      ...leadsData,
    ]);
    setLeadStatuses(prev => ({ ...prev, [newId]: 'pending' }));
    setIsManualModalOpen(false);
  };

  // ── Conversion submit ──────────────────────────────────────────────────────
  const handleConversionSubmit = async (leadId: string | number, amount: number) => {
    setLeadStatuses(prev => ({ ...prev, [leadId]: 'converted' }));
    setDealValues(prev => ({ ...prev, [leadId]: amount }));
    setConversionLead(undefined);
    // Update backend if it's a real lead (string ID)
    if (typeof leadId === 'string') {
      try {
        await updateStatus({ id: leadId, status: 'converted', dealAmount: amount }).unwrap();
      } catch (error) {
        console.error('Failed to update status:', error);
      }
    }
  };

  // ── Filtered leads ─────────────────────────────────────────────────────────
  const filteredLeads = leadsData.filter(lead => {
    const pkg = lead.source === 'Package Page' ? (lead as PackageLead).packageName : '';
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      pkg?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || leadStatuses[lead.id] === filterStatus;
    const matchesSource = filterSource === 'all' || lead.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  // Shared props passed to every card — defined once here, not repeated per card
  const sharedCardProps = {
    highlightedId,
    cardRefs,
    openStatusDropdown,
    setOpenStatusDropdown,
    onStatusChange: handleStatusChange,
  };

  // ── Stats bar config ───────────────────────────────────────────────────────
  const stats = [
    { icon: Inbox,       label: 'Total Leads', value: leadsData.length,                                                                    change: '+12%', grad: 'from-blue-500 to-blue-600',     shadow: 'shadow-blue-500/30'   },
    { icon: CheckCircle, label: 'Contacted',   value: Object.values(leadStatuses).filter(s => s === 'contacted').length,                   change: '+8%',  grad: 'from-sky-500 to-cyan-500',      shadow: 'shadow-cyan-500/30'   },
    { icon: Bell,        label: 'Pending',     value: Object.values(leadStatuses).filter(s => s === 'pending').length,                     change: 'New',  grad: 'from-orange-500 to-red-500',    shadow: 'shadow-orange-500/30' },
    { icon: IndianRupee, label: 'Revenue',     value: `₹${Object.values(dealValues).reduce((a, b) => a + b, 0).toLocaleString('en-IN')}`,  change: '+15%', grad: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/30'  },
    { icon: TrendingUp,  label: 'Converted',   value: Object.values(leadStatuses).filter(s => s === 'converted').length,                   change: 'Won',  grad: 'from-purple-500 to-pink-500',   shadow: 'shadow-purple-500/30' },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-5">

      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads &amp; Enquiries</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage customer enquiries</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 text-sm font-medium shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" /> Manual Entry
          </button>
        </div>
      </div>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {stats.map(s => (
          <div
            key={s.label}
            onClick={s.label === 'Revenue' ? () => navigate('/revenue') : undefined}
            className={`bg-white rounded-2xl p-4 border border-gray-200/60 shadow-sm transition-all ${
              s.label === 'Revenue' ? 'cursor-pointer hover:shadow-green-500/20 hover:border-green-300' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-lg ${s.shadow}`}>
                <s.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s.change}</span>
            </div>
            <p className="text-xl lg:text-2xl font-bold text-gray-900 truncate" title={String(s.value)}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filter panel ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/60 shadow-sm space-y-3">

        {/* Row 1: Search + source dropdown */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search name, phone, destination..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-auto"
            />
          </div>

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
              <span className="hidden sm:inline">{filterSource === 'all' ? 'Source' : filterSource}</span>
              {filterSource !== 'all' && <span className="w-2 h-2 rounded-full bg-blue-500 sm:hidden" />}
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
                  {ALL_SOURCES.map(src => {
                    const c = SOURCE_CONFIG[src];
                    return (
                      <button
                        key={src}
                        onClick={() => { setFilterSource(src); setOpenSourceDropdown(false); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-50 ${filterSource === src ? c.bg + ' ' + c.color : 'text-gray-700'}`}
                      >
                        <c.icon className={`w-4 h-4 ${c.color}`} /> {c.label}
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

      {/* ── Cards grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLeads.map(lead => renderLeadCard(lead, sharedCardProps))}
      </div>

      {/* ── Empty state ───────────────────────────────────────────────── */}
      {filteredLeads.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/60 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">No leads found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* ── Modals ────────────────────────────────────────────────────── */}
      <ManualEntryModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        onSubmit={handleManualSubmit}
      />

      <ConversionModal
        lead={conversionLead}
        isOpen={!!conversionLead}
        onClose={() => setConversionLead(undefined)}
        onSubmit={handleConversionSubmit}
      />
    </div>
  );
}