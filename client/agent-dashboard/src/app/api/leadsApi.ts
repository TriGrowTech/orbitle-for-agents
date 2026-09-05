import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const leadsApi = createApi({
  reducerPath: 'leadsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['Lead'],
  endpoints: (builder) => ({
    getLeads: builder.query<{ success: boolean; data: any[] }, void>({
      query: () => '/leads',
      providesTags: ['Lead'],
    }),
    updateLeadStatus: builder.mutation<{ success: boolean; data: any }, { id: string; status: string; dealAmount?: number }>({
      query: ({ id, status, dealAmount }) => ({
        url: `/leads/${id}`,
        method: 'PUT',
        body: { status, dealAmount },
      }),
      invalidatesTags: ['Lead'],
    }),
    deleteLead: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/leads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lead'],
    }),
  }),
});

export const { 
  useGetLeadsQuery, 
  useUpdateLeadStatusMutation, 
  useDeleteLeadMutation 
} = leadsApi;
