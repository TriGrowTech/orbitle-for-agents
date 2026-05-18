import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface LegalPageData {
  _id: string;
  agentId: string;
  pageType: 'privacy_policy' | 'terms_of_service' | 'refund_policy' | 'cancellation_policy';
  title: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export const legalApi = createApi({
  reducerPath: 'legalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['Legal'],
  endpoints: (builder) => ({
    getLegalPages: builder.query<{ success: boolean; data: LegalPageData[] }, void>({
      query: () => '/legal',
      providesTags: ['Legal'],
    }),
    getLegalPage: builder.query<{ success: boolean; data: LegalPageData | null }, string>({
      query: (pageType) => `/legal/${pageType}`,
      providesTags: ['Legal'],
    }),
    upsertLegalPage: builder.mutation<{ success: boolean; data: LegalPageData }, { pageType: string; data: Partial<LegalPageData> }>({
      query: ({ pageType, data }) => ({
        url: `/legal/${pageType}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Legal'],
    }),
    deleteLegalPage: builder.mutation<{ success: boolean }, string>({
      query: (pageType) => ({
        url: `/legal/${pageType}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Legal'],
    }),
  }),
});

export const {
  useGetLegalPagesQuery,
  useGetLegalPageQuery,
  useUpsertLegalPageMutation,
  useDeleteLegalPageMutation,
} = legalApi;
