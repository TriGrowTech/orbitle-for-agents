import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useGetLeadsQuery } from '../api/leadsApi';

// ── Types ─────────────────────────────────────────────────────────────────────
export type LeadSource = 'hero_form' | 'package_detail' | 'popup' | 'plan_tour' | 'chatbot' | 'marketplace';
export type LeadStatus = 'pending' | 'contacted' | 'follow_up' | 'quoted' | 'converted' | 'cancelled';
export type Priority   = 'high' | 'medium' | 'low';

export interface BaseLead {
  id: string | number;
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
  source: 'popup' | 'chatbot';
  email?: string;
}

export interface FormLead extends BaseLead {
  source: 'hero_form' | 'plan_tour' | 'marketplace';
  email: string;
  fromCity: string;
  startDate: string;
  duration: string;
  travelers: number;
  budget: string;
  message: string;
}

export interface PackageLead extends BaseLead {
  source: 'package_detail';
  email?: string;
  packageName: string;
  fromCity: string;
  travelers: number;
  budget: string;
  startDate?: string;
}

export type Lead = PopupLead | FormLead | PackageLead;

// ── Mock Data ──────────────────────────────────────────────────────────────────
export const initialMockLeads: Lead[] = [
  {
    id: 1, source: 'Hero Form', status: 'pending', priority: 'high',
    name: 'Rahul Sharma (Demo)', phone: '+91 98765 43210', email: 'rahul@example.com',
    fromCity: 'Mumbai',
    destination: 'Bali', startDate: '2026-04-15', duration: '7 nights',
    travelers: 2, budget: '₹40,000 – ₹50,000',
    message: 'Looking for a honeymoon package with beach resort.',
    date: '2026-03-25',
  }
];

// ── Context Setup ──────────────────────────────────────────────────────────────
interface CRMContextType {
  leadsData: Lead[];
  leadStatuses: Record<string | number, string>;
  dealValues: Record<string | number, number>;
  setLeadStatuses: React.Dispatch<React.SetStateAction<Record<string | number, string>>>;
  setDealValues: React.Dispatch<React.SetStateAction<Record<string | number, number>>>;
  setLeadsData: React.Dispatch<React.SetStateAction<Lead[]>>;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export function CRMProvider({ children }: { children: ReactNode }) {
  const { data: leadsResponse, isLoading } = useGetLeadsQuery();
  const [leadsData, setLeadsData] = useState<Lead[]>(initialMockLeads);
  
  const [leadStatuses, setLeadStatuses] = useState<Record<string | number, string>>(
    initialMockLeads.reduce((acc, l) => ({ ...acc, [l.id]: l.status }), {})
  );

  const [dealValues, setDealValues] = useState<Record<string | number, number>>(
    initialMockLeads.reduce((acc, l) => ({ ...acc, [l.id]: l.dealValue || 0 }), {})
  );

  useEffect(() => {
    if (leadsResponse?.success && leadsResponse.data) {
      if (leadsResponse.data.length > 0) {
        const transformedLeads: Lead[] = leadsResponse.data.map((l: any) => ({
          id: l._id,
          name: l.name,
          phone: l.phone,
          email: l.email,
          destination: l.toLocation || '',
          packageName: l.packageName || '',
          date: l.createdAt.split('T')[0],
          source: (l.source as LeadSource) || 'marketplace',
          status: (l.status as LeadStatus) || 'pending',
          priority: 'medium',
          fromCity: l.fromLocation || '',
          startDate: l.departureDate?.split('T')[0],
          duration: l.numberOfDays ? `${l.numberOfDays} days` : '',
          travelers: (l.adults || 0) + (l.children || 0),
          budget: l.budgetRupees ? `₹${l.budgetRupees}` : '',
          message: l.specialRequests || ''
        }));
        setLeadsData(transformedLeads);

        // Sync statuses and deal values
        const statuses: Record<string | number, string> = {};
        const values: Record<string | number, number> = {};
        transformedLeads.forEach(l => {
          statuses[l.id] = l.status;
          values[l.id] = l.dealValue || 0;
        });
        setLeadStatuses(statuses);
        setDealValues(values);
      } else {
        // If no real leads, show the demo lead
        setLeadsData(initialMockLeads);
      }
    }
  }, [leadsResponse]);

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
