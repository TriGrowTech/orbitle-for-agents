import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface AboutUsStat {
  value: string;
  label: string;
}

export interface AboutUsCredential {
  label: string;
  number: string;
  description: string;
  color: 'blue' | 'green' | 'amber' | 'purple';
}

export interface AboutUsAward {
  year: string;
  title: string;
  org: string;
}

export interface AboutUsData {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  stats: AboutUsStat[];
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyBullets: string[];
  storyImage1: string;
  storyImage2: string;
  yearsBadgeText: string;
  credentials: AboutUsCredential[];
  awards: AboutUsAward[];
}

export interface DestinationData {
  name: string;
  category: 'domestic' | 'international';
  active: boolean;
  trending: boolean;
  image: string;
}

export interface SiteConfigData {
  _id: string;
  agentId: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  defaultWhatsappMessage: string;
  currency: string;
  timezone: string;
  topbarOffer: {
    text: string;
    ctaText: string;
    ctaLink: string;
    isActive: boolean;
  };
  cardOffer: {
    text: string;
    bgColor: string;
    isActive: boolean;
  };
  aboutUs: AboutUsData;
  destinations: DestinationData[];
  createdAt: string;
  updatedAt: string;
}

export const siteConfigApi = createApi({
  reducerPath: 'siteConfigApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['SiteConfig'],
  endpoints: (builder) => ({
    getSiteConfig: builder.query<{ success: boolean; data: SiteConfigData }, void>({
      query: () => '/site-config',
      providesTags: ['SiteConfig'],
    }),
    updateSiteConfig: builder.mutation<{ success: boolean; data: SiteConfigData }, Partial<SiteConfigData>>({
      query: (body) => ({
        url: '/site-config',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['SiteConfig'],
    }),
  }),
});

export const {
  useGetSiteConfigQuery,
  useUpdateSiteConfigMutation,
} = siteConfigApi;
