/**
 * LeadCard.tsx
 *
 * Contains every piece of UI that makes up a single lead card:
 *   - CardWrapper   — highlight ring when navigated from Revenue page
 *   - CardHeader    — name, source badge, priority, status dropdown
 *   - RouteBlock    — dark From→To block with date / days / nights
 *   - CardActions   — Call + WhatsApp buttons
 *   - PopupCard     — card layout for Popup leads
 *   - FormCard      — card layout for Hero Form and Manual Entry leads
 *   - PackageCard   — card layout for Package Page leads
 *   - renderLeadCard — single function to call from Leads.tsx
 */

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  Users,
  IndianRupee,
  MessageSquare,
  AlarmClock,
  User,
  Sun,
  Moon,
  ArrowRightLeft,
  Package,
  Flame,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import {
  Lead,
  PopupLead,
  FormLead,
  PackageLead,
} from "../../context/CRMContext";
import { useCRMContext } from "../../context/CRMContext";
import {
  STATUS_CONFIG,
  SOURCE_CONFIG,
  STATUS_HEADER,
  ALL_STATUSES,
  formatDate,
} from "./leadConfig";

// ── Types ──────────────────────────────────────────────────────────────────────

interface CardWrapperProps {
  lead: Lead;
  highlightedId: string | number | null;
  cardRefs: React.MutableRefObject<Record<string | number, HTMLDivElement | null>>;
  children: React.ReactNode;
}

interface StatusDropdownProps {
  lead: Lead;
  openStatusDropdown: string | number | null;
  setOpenStatusDropdown: (id: string | number | null) => void;
  onStatusChange: (leadId: string | number, newStatus: string) => void;
}

// ── CardWrapper ────────────────────────────────────────────────────────────────
// Adds the indigo highlight ring when this card was navigated to from Revenue.

export function CardWrapper({
  lead,
  highlightedId,
  cardRefs,
  children,
}: CardWrapperProps) {
  const isHighlighted = highlightedId === lead.id;
  return (
    <div
      ref={(el) => {
        cardRefs.current[lead.id] = el;
      }}
      className={`transition-all duration-300 rounded-lg ${
        isHighlighted
          ? "ring-4 ring-indigo-400 ring-offset-2 shadow-xl shadow-indigo-200 scale-[1.02]"
          : ""
      }`}
    >
      {children}
    </div>
  );
}

// ── StatusDropdown ─────────────────────────────────────────────────────────────
// The small colored badge on each card that opens a status picker.

export function StatusDropdown({
  lead,
  openStatusDropdown,
  setOpenStatusDropdown,
  onStatusChange,
}: StatusDropdownProps) {
  const { leadStatuses } = useCRMContext();
  const currentStatus = leadStatuses[lead.id];
  const c = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.pending;
  const SIcon = c.icon;
  const isOpen = openStatusDropdown === lead.id;

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenStatusDropdown(isOpen ? null : lead.id);
        }}
        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold ring-1 transition-colors ${c.bg} ${c.color} ${c.ring}`}
      >
        <SIcon className="w-2.5 h-2.5" />
        {c.label}
        <span className="ml-0.5 opacity-60">▾</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpenStatusDropdown(null)}
          />
          <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 overflow-hidden min-w-[140px]">
            <div className="px-3 py-1.5 border-b border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                Set Status
              </p>
            </div>
            {ALL_STATUSES.map((s) => {
              const sc = STATUS_CONFIG[s];
              const SIcon = sc.icon;
              return (
                <button
                  key={s}
                  onClick={() => onStatusChange(lead.id, s)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-gray-50 ${
                    currentStatus === s
                      ? sc.bg + " " + sc.color
                      : "text-gray-700"
                  }`}
                >
                  <SIcon className={`w-3.5 h-3.5 flex-shrink-0 ${sc.color}`} />
                  {sc.label}
                  {currentStatus === s && (
                    <CheckCircle className="w-3 h-3 text-blue-500 ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ── CardHeader ─────────────────────────────────────────────────────────────────
// The colored top band: avatar, name, source badge, priority, status dropdown.

interface CardHeaderProps {
  lead: Lead;
  srcLabel: string;
  openStatusDropdown: string | number | null;
  setOpenStatusDropdown: (id: string | number | null) => void;
  onStatusChange: (leadId: string | number, newStatus: string) => void;
}

export function CardHeader({
  lead,
  srcLabel,
  openStatusDropdown,
  setOpenStatusDropdown,
  onStatusChange,
}: CardHeaderProps) {
  const { leadStatuses } = useCRMContext();
  const sh = STATUS_HEADER[leadStatuses[lead.id]] || STATUS_HEADER.pending;
  const srcCfg = SOURCE_CONFIG[lead.source as keyof typeof SOURCE_CONFIG] || SOURCE_CONFIG['hero_form'];

  return (
    <div className={`p-2.5 border-b ${sh.headerBg} ${sh.headerBorder}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${sh.iconBg} ${sh.iconColor}`}
          >
            <User className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
              {lead.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold ring-1 whitespace-nowrap ${srcCfg.bg} ${srcCfg.color} ${srcCfg.ring}`}
              >
                <srcCfg.icon className="w-2 h-2" />
                &#8202;{srcCfg.label}
              </span>
              {lead.priority === "high" && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-red-50 text-red-600 ring-1 ring-red-300 whitespace-nowrap">
                  <Flame className="w-2 h-2" /> High
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <StatusDropdown
            lead={lead}
            openStatusDropdown={openStatusDropdown}
            setOpenStatusDropdown={setOpenStatusDropdown}
            onStatusChange={onStatusChange}
          />
          <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <AlarmClock className="w-3 h-3" /> Enquired on {formatDate(lead.date)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── RouteBlock ─────────────────────────────────────────────────────────────────
// Dark From → To panel. Optional date / days / nights badges at the bottom.

interface RouteBlockProps {
  fromCity: string;
  toCity: string;
  date?: string;
  days?: number;
  nights?: number;
}

export function RouteBlock({
  fromCity,
  toCity,
  date,
  days,
  nights,
}: RouteBlockProps) {
  return (
    <div className="bg-slate-900 rounded-lg p-2.5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 min-w-0">
          <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">
            From
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="text-white font-bold text-xs truncate">
              {fromCity}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mx-2">
          <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
            <ArrowRightLeft className="w-3 h-3 text-slate-300" />
          </div>
        </div>
        <div className="flex-1 min-w-0 text-right">
          <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1">
            To
          </div>
          <div className="flex items-center justify-end gap-1">
            <span className="text-white font-bold text-xs truncate">
              {toCity}
            </span>
            <MapPin className="w-3 h-3 text-rose-400 flex-shrink-0" />
          </div>
        </div>
      </div>

      {(date || days !== undefined) && (
        <>
          <div className="h-px bg-slate-700 mb-2" />
          <div className="flex items-center justify-between">
            {date && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/20 rounded border border-amber-500/30">
                <Calendar className="w-3 h-3 text-amber-300" />
                <span className="text-[10px] font-semibold text-amber-200">
                  {date}
                </span>
              </div>
            )}
            {days !== undefined && nights !== undefined && (
              <div className="flex items-center gap-1.5 ml-auto">
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] font-bold text-white">
                    {days}D
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-800 rounded">
                  <Moon className="w-3 h-3 text-blue-300" />
                  <span className="text-[10px] font-bold text-white">
                    {nights}N
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ── CardActions ────────────────────────────────────────────────────────────────
// Call + WhatsApp buttons at the bottom of every card.

export function CardActions({ phone }: { phone: string }) {
  return (
    <div className="flex items-center gap-2 w-full">
      <a
        href={`tel:${phone}`}
        className="w-1/2 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all duration-200"
      >
        <Phone className="w-3.5 h-3.5" /> Call
      </a>
      <a
        href={`https://wa.me/${phone.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        className="w-1/2 flex items-center justify-center gap-1.5 py-2 rounded-md bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-xs shadow-sm transition-all duration-200"
      >
        <FaWhatsapp style={{ width: 14, height: 14 }} /> WhatsApp
      </a>
    </div>
  );
}

// ── ContactBlock ───────────────────────────────────────────────────────────────
// Shared phone + email block used in all three card variants.

function ContactBlock({ phone, email }: { phone: string; email?: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200">
      <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mb-2">
        Contact Details
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
            <Phone className="w-3 h-3 text-gray-600" />
          </div>
          <span className="text-xs font-semibold text-slate-800">{phone}</span>
        </div>
        {email && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <Mail className="w-3 h-3 text-gray-600" />
            </div>
            <span className="text-xs text-slate-500 truncate">{email}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TravelersAndBudget ─────────────────────────────────────────────────────────
// The purple/green stat grid shared by FormCard and PackageCard.

function TravelersAndBudget({
  travelers,
  budget,
}: {
  travelers: number;
  budget: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-purple-50 rounded-lg p-2 border border-purple-200">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
            <Users className="w-3 h-3 text-purple-700" />
          </div>
          <span className="text-[9px] font-bold text-purple-800 uppercase tracking-wide">
            Travelers
          </span>
        </div>
        <p className="text-sm font-bold text-slate-900">{travelers} pax</p>
      </div>
      <div className="bg-green-50 rounded-lg p-2 border border-green-200">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
            <IndianRupee className="w-3 h-3 text-green-700" />
          </div>
          <span className="text-[9px] font-bold text-green-800 uppercase tracking-wide">
            Budget
          </span>
        </div>
        <p className="text-xs font-bold text-slate-900 truncate">{budget}</p>
      </div>
    </div>
  );
}

// ── Shared card props ──────────────────────────────────────────────────────────

interface CardProps {
  lead: Lead;
  highlightedId: string | number | null;
  cardRefs: React.MutableRefObject<Record<string | number, HTMLDivElement | null>>;
  openStatusDropdown: string | number | null;
  setOpenStatusDropdown: (id: string | number | null) => void;
  onStatusChange: (leadId: string | number, newStatus: string) => void;
}

// ── PopupCard ──────────────────────────────────────────────────────────────────

export function PopupCard({
  lead,
  highlightedId,
  cardRefs,
  openStatusDropdown,
  setOpenStatusDropdown,
  onStatusChange,
}: CardProps) {
  const { leadStatuses } = useCRMContext();
  const sh = STATUS_HEADER[leadStatuses[lead.id]] || STATUS_HEADER.pending;
  const popup = lead as PopupLead;

  return (
    <CardWrapper lead={lead} highlightedId={highlightedId} cardRefs={cardRefs}>
      <div
        className={`flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${sh.cardBorder}`}
      >
        <CardHeader
          lead={lead}
        srcLabel={SOURCE_CONFIG['popup']?.label || 'Popup'}
          openStatusDropdown={openStatusDropdown}
          setOpenStatusDropdown={setOpenStatusDropdown}
          onStatusChange={onStatusChange}
        />

        <div className="p-2.5 space-y-2">
          <div className="bg-slate-900 rounded-lg p-3">
            <div className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-2">
              Destination
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span className="text-white font-bold text-sm">
                {popup.destination}
              </span>
            </div>
          </div>

          <ContactBlock phone={popup.phone} email={popup.email} />

          
        </div>

        <div className="mt-auto px-2.5 pb-2.5">
          <CardActions phone={popup.phone} />
        </div>
      </div>
    </CardWrapper>
  );
}

// ── FormCard ───────────────────────────────────────────────────────────────────
// Used for both Hero Form and Manual Entry leads (same data shape).

export function FormCard({
  lead,
  highlightedId,
  cardRefs,
  openStatusDropdown,
  setOpenStatusDropdown,
  onStatusChange,
}: CardProps) {
  const { leadStatuses } = useCRMContext();
  const sh = STATUS_HEADER[leadStatuses[lead.id]] || STATUS_HEADER.pending;
  const form = lead as FormLead;

  const n = parseInt((form as any).duration || "0");
  const nights = isNaN(n)
    ? 0
    : (form as any).duration?.includes("night")
      ? n
      : Math.max(0, n - 1);
  const days = isNaN(n)
    ? 0
    : (form as any).duration?.includes("night")
      ? n + 1
      : n;

  return (
    <CardWrapper lead={lead} highlightedId={highlightedId} cardRefs={cardRefs}>
      <div
        className={`flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${sh.cardBorder}`}
      >
        <CardHeader
          lead={lead}
          srcLabel={SOURCE_CONFIG[lead.source as keyof typeof SOURCE_CONFIG]?.label || lead.source}
          openStatusDropdown={openStatusDropdown}
          setOpenStatusDropdown={setOpenStatusDropdown}
          onStatusChange={onStatusChange}
        />

        <div className="p-2.5 space-y-2">
          <RouteBlock
            fromCity={form.fromCity}
            toCity={form.destination}
            date={form.startDate ? formatDate(form.startDate) : undefined}
            days={days}
            nights={nights}
          />

          <TravelersAndBudget travelers={form.travelers} budget={form.budget} />

          <ContactBlock phone={form.phone} email={form.email} />

          {form.message && (
            <div className="bg-rose-50 rounded-lg p-2 border border-rose-200">
              <div className="flex items-start gap-1.5">
                <div className="w-5 h-5 bg-rose-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-3 h-3 text-rose-700" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-rose-800 uppercase tracking-wide mb-0.5">
                    Note
                  </div>
                  <p className="text-xs text-slate-700 leading-snug line-clamp-2">
                    {form.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          
        </div>

        <div className="mt-auto px-2.5 pb-2.5">
          <CardActions phone={form.phone} />
        </div>
      </div>
    </CardWrapper>
  );
}

// ── PackageCard ────────────────────────────────────────────────────────────────

export function PackageCard({
  lead,
  highlightedId,
  cardRefs,
  openStatusDropdown,
  setOpenStatusDropdown,
  onStatusChange,
}: CardProps) {
  const { leadStatuses } = useCRMContext();
  const sh = STATUS_HEADER[leadStatuses[lead.id]] || STATUS_HEADER.pending;
  const pkg = lead as PackageLead;

  return (
    <CardWrapper lead={lead} highlightedId={highlightedId} cardRefs={cardRefs}>
      <div
        className={`flex flex-col bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${sh.cardBorder}`}
      >
        <CardHeader
          lead={lead}
          srcLabel={SOURCE_CONFIG['package_detail']?.label || 'Package Detail'}
          openStatusDropdown={openStatusDropdown}
          setOpenStatusDropdown={setOpenStatusDropdown}
          onStatusChange={onStatusChange}
        />

        <div className="p-2.5 space-y-2">
          <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border ${pkg.packageName ? 'bg-violet-50 border-violet-200' : 'bg-gray-50 border-gray-200'}`}>
            <Package className={`w-3.5 h-3.5 flex-shrink-0 ${pkg.packageName ? 'text-violet-600' : 'text-gray-400'}`} />
            <p className={`text-xs font-bold truncate ${pkg.packageName ? 'text-violet-900' : 'text-gray-400 italic'}`}>
              {pkg.packageName || 'Package name not recorded'}
            </p>
          </div>

          <RouteBlock
            fromCity={pkg.fromCity}
            toCity={pkg.destination}
            date={pkg.startDate ? formatDate(pkg.startDate) : undefined}
          />

          <TravelersAndBudget travelers={pkg.travelers} budget={pkg.budget} />

          <ContactBlock phone={pkg.phone} email={pkg.email} />

          
        </div>

        <div className="mt-auto px-2.5 pb-2.5">
          <CardActions phone={pkg.phone} />
        </div>
      </div>
    </CardWrapper>
  );
}

// ── renderLeadCard ─────────────────────────────────────────────────────────────
// Single function Leads.tsx calls — no source-switching logic lives in the page.

export function renderLeadCard(
  lead: Lead,
  sharedProps: Omit<CardProps, "lead">,
) {
  const props = { lead, ...sharedProps };
  if (lead.source === 'popup')          return <PopupCard   key={lead.id} {...props} />;
  if (lead.source === 'hero_form')      return <FormCard    key={lead.id} {...props} />;
  if (lead.source === 'plan_tour')      return <FormCard    key={lead.id} {...props} />;
  if (lead.source === 'package_detail') return <PackageCard key={lead.id} {...props} />;
  if (lead.source === 'chatbot')        return <PopupCard   key={lead.id} {...props} />;
  // Fallback: covers 'marketplace', old 'Marketplace' / 'Hero Form' / 'Package Page' etc.
  return <FormCard key={lead.id} {...props} />;
}
