import React, { createContext, useContext, useState, ReactNode } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
export type LeadSource = 'Hero Form' | 'Package Page' | 'Popup' | 'Manual Entry';
export type LeadStatus = 'pending' | 'contacted' | 'follow_up' | 'quoted' | 'converted' | 'cancelled';
export type Priority   = 'high' | 'medium' | 'low';

export interface BaseLead {
  id: number;
  name: string;
  phone: string;
  destination: string;
  date: string;
  source: LeadSource;
  status: LeadStatus;
  priority: Priority;
  dealValue?: number;
}

export interface PopupLead extends BaseLead {
  source: 'Popup';
  email?: string;
}

export interface FormLead extends BaseLead {
  source: 'Hero Form';
  email: string;
  fromCity: string;
  startDate: string;
  duration: string;
  travelers: number;
  budget: string;
  message: string;
}

export interface PackageLead extends BaseLead {
  source: 'Package Page';
  email?: string;
  packageName: string;
  fromCity: string;
  travelers: number;
  budget: string;
  startDate?: string;
}

export interface ManualLead extends BaseLead {
  source: 'Manual Entry';
  email?: string;
  fromCity?: string;
  startDate?: string;
  duration?: string;
  travelers?: number;
  budget?: string;
  message?: string;
}

export type Lead = PopupLead | FormLead | PackageLead | ManualLead;

// ── Mock Data ──────────────────────────────────────────────────────────────────
export const initialMockLeads: Lead[] = [
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
    name: 'Vikram Singh', phone: '+91 98765 43214',email: 'Vikram@example.com',
    fromCity: 'Bangalore',
    destination: 'Singapore', packageName: 'Singapore Explorer – 5N/6D',
    travelers: 5, budget: '₹2,00,000+',
    dealValue: 180000,startDate: '2026-05-01',
    date: '2026-03-23',
  },
  {
    id: 6, source: 'Popup', status: 'cancelled', priority: 'low',
    name: 'Neha Gupta', phone: '+91 98765 43215', email: 'neha@example.com',
    destination: 'Goa',
    date: '2026-03-23',
  },
];

// ── Context Setup ──────────────────────────────────────────────────────────────
interface CRMContextType {
  leadsData: Lead[];
  leadStatuses: Record<number, string>;
  dealValues: Record<number, number>;
  setLeadStatuses: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  setDealValues: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setLeadsData: React.Dispatch<React.SetStateAction<Lead[]>>;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
  const [leadsData, setLeadsData] = useState<Lead[]>(initialMockLeads);
  
  const [leadStatuses, setLeadStatuses] = useState<Record<number, string>>(
    initialMockLeads.reduce((acc, l) => ({ ...acc, [l.id]: l.status }), {})
  );

  const [dealValues, setDealValues] = useState<Record<number, number>>(
    initialMockLeads.reduce((acc, l) => ({ ...acc, [l.id]: l.dealValue || 0 }), {})
  );

  return (
    <CRMContext.Provider value={{
      leadsData, setLeadsData,
      leadStatuses, setLeadStatuses,
      dealValues, setDealValues
    }}>
      {children}
    </CRMContext.Provider>
  );
}

export function useCRMContext() {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRMContext must be used within a CRMProvider');
  }
  return context;
}
