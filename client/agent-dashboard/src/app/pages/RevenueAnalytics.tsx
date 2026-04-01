import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { IndianRupee, TrendingUp, Target, ArrowUpRight, Award, ChevronRight, Calendar, MapPin, User, FileText, Search, ArrowUpDown, ArrowDown, ArrowUp, Download } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useCRMContext } from '../context/CRMContext';

type SortField = 'date' | 'price';
type SortDirection = 'asc' | 'desc';

export function RevenueAnalytics() {
  const navigate = useNavigate();
  const { dealValues, leadStatuses, leadsData } = useCRMContext();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const totalGenerated = Object.values(dealValues).reduce((a, b) => a + b, 0);
  const closedLeads = Object.values(leadStatuses).filter(s => s === 'converted').length;
  const avgDealSize = closedLeads > 0 ? Math.round(totalGenerated / closedLeads) : 0;

  // ── Sort handler ─────────────────────────────────────────
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />;
    return sortDirection === 'desc'
      ? <ArrowDown className="w-3.5 h-3.5 text-indigo-500" />
      : <ArrowUp className="w-3.5 h-3.5 text-indigo-500" />;
  };

  // ── Filtered + sorted closed leads ───────────────────────
  const filteredLeads = useMemo(() => {
    return leadsData
      .filter(lead => leadStatuses[lead.id] === 'converted')
      .filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.destination.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let valA: number, valB: number;
        if (sortField === 'price') {
          valA = dealValues[a.id] || 0;
          valB = dealValues[b.id] || 0;
        } else {
          valA = new Date(a.date).getTime();
          valB = new Date(b.date).getTime();
        }
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      });
  }, [leadsData, leadStatuses, dealValues, searchQuery, sortField, sortDirection]);

  // ── CSV Export ───────────────────────────────────────────
  const handleExportCSV = () => {
    const headers = ['Name', 'Destination', 'From City', 'Travelers', 'Source', 'Conversion Date', 'Deal Amount (₹)'];
    const rows = filteredLeads.map(lead => [
      lead.name,
      lead.destination,
      ('fromCity' in lead ? lead.fromCity : 'Unknown') as string,
      ('travelers' in lead ? lead.travelers : 'N/A') as string | number,
      lead.source,
      new Date(lead.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      dealValues[lead.id] || 0,
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `closed-deals-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ── Chart data ───────────────────────────────────────────
  const chartData = useMemo(() => {
    if (selectedMonth === 'All') {
      return [
        { name: 'Jan', revenue: selectedYear === '2026' ? 640000 : 420000 },
        { name: 'Feb', revenue: selectedYear === '2026' ? 890000 : 490000 },
        { name: 'Mar', revenue: selectedYear === '2026' ? 1050000 : 530000 },
        { name: 'Apr', revenue: selectedYear === '2026' ? 420000 : 580000 },
        { name: 'May', revenue: selectedYear === '2026' ? 510000 : 610000 },
        { name: 'Jun', revenue: selectedYear === '2026' ? 760000 : 640000 },
        { name: 'Jul', revenue: selectedYear === '2026' ? 820000 : 650000 },
        { name: 'Aug', revenue: selectedYear === '2026' ? 950000 : 700000 },
        { name: 'Sep', revenue: selectedYear === '2026' ? 1010000 : 680000 },
        { name: 'Oct', revenue: selectedYear === '2026' ? 1120000 : 740000 },
        { name: 'Nov', revenue: selectedYear === '2026' ? 1250000 : 810000 },
        { name: 'Dec', revenue: selectedYear === '2026' ? 1340000 : 920000 },
      ];
    } else {
      const base = selectedYear === '2026' ? 1 : 0.7;
      return [
        { name: '1-5',   revenue: Math.round(base * 140000) },
        { name: '6-10',  revenue: Math.round(base * 250000) },
        { name: '11-15', revenue: Math.round(base * 180000) },
        { name: '16-20', revenue: Math.round(base * 320000) },
        { name: '21-25', revenue: Math.round(base * 210000) },
        { name: '26-31', revenue: Math.round(base * 290000) },
      ];
    }
  }, [selectedYear, selectedMonth]);

  const sourceData = [
    { name: 'Package Catalog', value: 2450000, color: '#8b5cf6' },
    { name: 'Hero Form', value: 810000, color: '#0ea5e9' },
    { name: 'Referrals / Manual', value: 420000, color: '#10b981' },
    { name: 'Popups', value: 250000, color: '#f59e0b' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md border border-gray-100 p-3 rounded-xl shadow-xl flex flex-col gap-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</p>
          <p className="text-lg font-bold text-emerald-600">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-md border border-gray-100 p-3 rounded-xl shadow-xl flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
            <p className="text-xs font-bold text-gray-700">{payload[0].name}</p>
          </div>
          <p className="text-sm font-bold text-gray-900 mt-1">₹{payload[0].value.toLocaleString('en-IN')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Revenue Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Track business performance across all closed deals</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
              activeTab === 'overview' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-gray-500 hover:text-slate-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all ${
              activeTab === 'history' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-gray-500 hover:text-slate-700'
            }`}
          >
            History
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* ── KPI Widgets ────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-xl p-4 border border-indigo-800 shadow-lg relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all duration-500" />
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-indigo-200 uppercase tracking-widest">Total Generated</span>
                  <div className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/5">
                    <IndianRupee className="w-3.5 h-3.5 text-indigo-300" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-1">₹{(totalGenerated / 100000).toFixed(2)}L</h2>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +24% from last period
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Avg. Deal Size</span>
                <div className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center border border-emerald-100">
                  <Target className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">₹{avgDealSize.toLocaleString('en-IN')}</h2>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                Based on <strong className="text-slate-800">{closedLeads}</strong> closed leads
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200/60 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Top Package</span>
                <div className="w-7 h-7 rounded-md bg-purple-50 flex items-center justify-center border border-purple-100">
                  <Award className="w-3.5 h-3.5 text-purple-600" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-1 truncate" title="Maldives Honeymoon Lux – 4N/5D">
                Maldives Honeymoon Lux
              </h2>
              <p className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer flex items-center gap-1 transition-colors w-fit font-medium">
                View breakdown <ChevronRight className="w-3 h-3" />
              </p>
            </div>
          </div>

          {/* ── Charts Grid ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Revenue Growth</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedMonth === 'All' ? `Monthly overview for ${selectedYear}` : `Daily breakdown for ${selectedMonth} ${selectedYear}`}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <select 
                    value={selectedMonth} 
                    onChange={e => setSelectedMonth(e.target.value)}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option value="All">All Months</option>
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedYear} 
                    onChange={e => setSelectedYear(e.target.value)}
                    className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
              </div>
              <div className="p-6 h-[340px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => `₹${v / 100000}L`} />
                    <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', strokeWidth: 1 }} />
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, strokeWidth: 0, fill: '#059669' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-slate-900">Revenue by Source</h3>
                <p className="text-xs text-gray-500 mt-1">Where your highest paying leads originate</p>
              </div>
              <div className="p-6 h-[220px] w-full flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sourceData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={6} dataKey="value" stroke="none">
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="px-6 pb-6 flex-1 flex flex-col justify-end gap-3">
                {sourceData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-semibold text-slate-700">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">₹{(item.value / 100000).toFixed(1)}L</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in duration-300">

          {/* ── History Toolbar ──────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

            {/* Search */}
            <div className="flex bg-white rounded-xl border border-gray-200 p-2 shadow-sm w-full max-w-md">
              <div className="pl-3 pr-2 py-2 flex items-center justify-center text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Search closed deals by name, destination..."
                className="bg-transparent border-none outline-none w-full text-sm font-medium text-gray-800 placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Sort Controls */}
              <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden divide-x divide-gray-200">
                <button
                  onClick={() => handleSort('date')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors ${
                    sortField === 'date' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Date
                  <SortIcon field="date" />
                </button>
                <button
                  onClick={() => handleSort('price')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors ${
                    sortField === 'price' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <IndianRupee className="w-3.5 h-3.5" />
                  Price
                  <SortIcon field="price" />
                </button>
              </div>

              {/* Export CSV */}
              <button
                onClick={handleExportCSV}
                disabled={filteredLeads.length === 0}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-95 transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>
          </div>

          {/* ── History Table ────────────────────────────────────── */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50/80 text-gray-500 uppercase text-[11px] font-bold tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="px-5 py-4">Lead Details</th>
                    <th className="px-5 py-4">Destination / Property</th>
                    <th className="px-5 py-4">Source</th>
                    <th className="px-5 py-4">
                      <button
                        onClick={() => handleSort('date')}
                        className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-gray-500 hover:text-indigo-600 transition-colors"
                      >
                        Conversion Date
                        <SortIcon field="date" />
                      </button>
                    </th>
                    <th className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleSort('price')}
                        className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-bold text-gray-500 hover:text-indigo-600 transition-colors ml-auto"
                      >
                        Deal Amount
                        <SortIcon field="price" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/80">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 shadow-sm flex-shrink-0">
                            {lead.name.charAt(0)}
                          </div>
                          <div>
                            {/* ── Clickable lead name ── */}
                            <button
                              onClick={() => navigate('/leads', { state: { highlightId: lead.id } })}
                              className="font-bold text-gray-900 hover:text-indigo-600 hover:underline underline-offset-2 transition-colors text-left leading-tight"
                              title="Open lead card"
                            >
                              {lead.name}
                            </button>
                            <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                              <User className="w-3 h-3" /> Travelers: {('travelers' in lead) ? lead.travelers : 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-gray-800">{lead.destination}</div>
                        <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {'fromCity' in lead ? lead.fromCity : 'Unknown City'}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-[11px] font-bold border border-gray-200/60">
                          <FileText className="w-3.5 h-3.5" />
                          {lead.source}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          {new Date(lead.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center justify-end font-bold text-emerald-700 text-base bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                          ₹{(dealValues[lead.id] || 0).toLocaleString('en-IN')}
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <p className="font-medium text-gray-900">
                          {searchQuery ? 'No deals match your search' : 'No closed deals yet'}
                        </p>
                        <p className="text-sm mt-1">
                          {searchQuery ? 'Try a different name or destination.' : 'Convert your first lead from the Leads pipeline.'}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer row count */}
            {filteredLeads.length > 0 && (
              <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  {filteredLeads.length} deal{filteredLeads.length !== 1 ? 's' : ''} 
                  {searchQuery && ` matching "${searchQuery}"`}
                </span>
                <span className="text-xs font-bold text-emerald-700">
                  Total: ₹{filteredLeads.reduce((sum, l) => sum + (dealValues[l.id] || 0), 0).toLocaleString('en-IN')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}