import {
  Clock, PhoneCall, MessageSquare, IndianRupee,
  CheckCircle, XCircle, FileText, Package, Zap, Plus,
} from 'lucide-react';
import { LeadSource, LeadStatus } from '../../context/CRMContext';

// ── Status config ──────────────────────────────────────────────────────────────
// Controls the badge color, icon, and card border for every status value.
// To add a new status: add an entry here — nothing else needs to change.

export const STATUS_CONFIG: Record<string, {
  label: string;
  icon: any;
  color: string;
  bg: string;
  ring: string;
  border: string;
}> = {
  pending:   { label: 'Pending',   icon: Clock,         color: 'text-orange-700', bg: 'bg-orange-50',  ring: 'ring-orange-400/40', border: 'border-orange-300' },
  contacted: { label: 'Contacted', icon: PhoneCall,      color: 'text-blue-700',   bg: 'bg-blue-50',    ring: 'ring-blue-400/40',   border: 'border-blue-300'   },
  follow_up: { label: 'Follow Up', icon: MessageSquare,  color: 'text-purple-700', bg: 'bg-purple-50',  ring: 'ring-purple-400/40', border: 'border-purple-300' },
  quoted:    { label: 'Quoted',    icon: IndianRupee,    color: 'text-indigo-700', bg: 'bg-indigo-50',  ring: 'ring-indigo-400/40', border: 'border-indigo-300' },
  converted: { label: 'Converted', icon: CheckCircle,    color: 'text-green-700',  bg: 'bg-green-50',   ring: 'ring-green-400/40',  border: 'border-green-300'  },
  cancelled: { label: 'Cancelled', icon: XCircle,        color: 'text-red-700',    bg: 'bg-red-50',     ring: 'ring-red-400/40',    border: 'border-red-300'    },
};

// ── Source config ──────────────────────────────────────────────────────────────
// Controls badge color and icon for each lead source.
// To add a new source: add an entry here and update the LeadSource type in CRMContext.

export const SOURCE_CONFIG: Record<LeadSource, {
  label: string;
  color: string;
  bg: string;
  ring: string;
  accent: string;
  avatarGrad: string;
  icon: any;
}> = {
  'Hero Form':    { label: 'Hero Form',    color: 'text-sky-700',    bg: 'bg-sky-50',    ring: 'ring-sky-400/40',    accent: 'bg-sky-500',    avatarGrad: 'from-sky-500 to-cyan-500',      icon: FileText },
  'Package Page': { label: 'Package Page', color: 'text-violet-700', bg: 'bg-violet-50', ring: 'ring-violet-400/40', accent: 'bg-violet-500', avatarGrad: 'from-violet-500 to-purple-600', icon: Package  },
  'Popup':        { label: 'Popup',        color: 'text-amber-700',  bg: 'bg-amber-50',  ring: 'ring-amber-400/40',  accent: 'bg-amber-400',  avatarGrad: 'from-amber-500 to-orange-500',  icon: Zap      },
  'Manual Entry': { label: 'Manual Entry', color: 'text-teal-700',   bg: 'bg-teal-50',   ring: 'ring-teal-400/40',   accent: 'bg-teal-500',   avatarGrad: 'from-teal-500 to-emerald-500',  icon: Plus     },
};

// ── Card header styles (driven by status) ─────────────────────────────────────
// Controls the colored header band at the top of each lead card.

export const STATUS_HEADER: Record<string, {
  headerBg: string;
  headerBorder: string;
  iconBg: string;
  iconColor: string;
  cardBorder: string;
}> = {
  pending:   { headerBg: 'bg-orange-50/70', headerBorder: 'border-orange-100', iconBg: 'bg-orange-100', iconColor: 'text-orange-600', cardBorder: 'border-orange-300' },
  contacted: { headerBg: 'bg-blue-50/70',   headerBorder: 'border-blue-100',   iconBg: 'bg-blue-100',   iconColor: 'text-blue-600',   cardBorder: 'border-blue-300'   },
  follow_up: { headerBg: 'bg-purple-50/70', headerBorder: 'border-purple-100', iconBg: 'bg-purple-100', iconColor: 'text-purple-600', cardBorder: 'border-purple-300' },
  quoted:    { headerBg: 'bg-indigo-50/70', headerBorder: 'border-indigo-100', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600', cardBorder: 'border-indigo-300' },
  converted: { headerBg: 'bg-green-50/70',  headerBorder: 'border-green-100',  iconBg: 'bg-green-100',  iconColor: 'text-green-600',  cardBorder: 'border-green-400'  },
  cancelled: { headerBg: 'bg-red-50/70',    headerBorder: 'border-red-100',    iconBg: 'bg-red-100',    iconColor: 'text-red-600',    cardBorder: 'border-red-300'    },
};

export const ALL_STATUSES = Object.keys(STATUS_CONFIG) as LeadStatus[];

export const ALL_SOURCES = Object.keys(SOURCE_CONFIG) as LeadSource[];

// ── Helpers ────────────────────────────────────────────────────────────────────

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
}