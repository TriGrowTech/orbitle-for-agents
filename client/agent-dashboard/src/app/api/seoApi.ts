import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SEOSettingsData {
  _id: string;
  agentId: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string;
  googleAnalyticsId: string;
  headScripts: string;
  createdAt: string;
  updatedAt: string;
}

export const seoApi = createApi({
  reducerPath: 'seoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['SEO'],
  endpoints: (builder) => ({
    getSEOSettings: builder.query<{ success: boolean; data: SEOSettingsData }, void>({
      query: () => '/seo',
      providesTags: ['SEO'],
    }),
    updateSEOSettings: builder.mutation<{ success: boolean; data: SEOSettingsData }, Partial<SEOSettingsData>>({
      query: (body) => ({
        url: '/seo',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['SEO'],
    }),
  }),
});

export const {
  useGetSEOSettingsQuery,
  useUpdateSEOSettingsMutation,
} = seoApi;
