import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SupportTicket {
  _id: string;
  agentId: string;
  type: 'billing' | 'technical' | 'feature' | 'general';
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  attachments: string[];
  replies: {
    message: string;
    from: 'agent' | 'superadmin';
    createdAt: string;
  }[];
  createdAt: string;
}

export interface CallRequest {
  _id: string;
  agentId: string;
  reason: string;
  phone: string;
  preferredTime: string;
  status: 'pending' | 'scheduled' | 'completed';
  createdAt: string;
}

export const supportApi = createApi({
  reducerPath: 'supportApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['Tickets', 'TicketDetail'],
  endpoints: (builder) => ({
    createTicket: builder.mutation<
      { success: boolean; data: SupportTicket },
      { type: string; subject?: string; message: string }
    >({
      query: (data) => ({
        url: '/support',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tickets'],
    }),
    getMyTickets: builder.query<{ success: boolean; data: SupportTicket[] }, void>({
      query: () => '/support',
      providesTags: ['Tickets'],
    }),
    getTicketDetail: builder.query<{ success: boolean; data: SupportTicket }, string>({
      query: (id) => `/support/${id}`,
      providesTags: (_result, _err, id) => [{ type: 'TicketDetail', id }],
    }),
    replyToTicket: builder.mutation<
      { success: boolean; data: SupportTicket },
      { id: string; message: string }
    >({
      query: ({ id, message }) => ({
        url: `/support/${id}/reply`,
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: (_result, _err, { id }) => ['Tickets', { type: 'TicketDetail', id }],
    }),
    createCallRequest: builder.mutation<
      { success: boolean; data: CallRequest },
      { reason?: string; phone?: string; preferredTime?: string }
    >({
      query: (data) => ({
        url: '/support/call-request',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetMyTicketsQuery,
  useGetTicketDetailQuery,
  useReplyToTicketMutation,
  useCreateCallRequestMutation,
} = supportApi;
