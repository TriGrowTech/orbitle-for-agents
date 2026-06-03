import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Notification {
  _id: string;
  agentId: string | null;
  type: 'offer' | 'trial_ending' | 'new_lead' | 'required_action' | 'support_resolution';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['Notifications', 'UnreadCount'],
  endpoints: (builder) => ({
    getNotifications: builder.query<{ success: boolean; data: Notification[] }, void>({
      query: () => '/notifications',
      providesTags: ['Notifications'],
    }),
    getUnreadCount: builder.query<{ success: boolean; count: number }, void>({
      query: () => '/notifications/unread-count',
      providesTags: ['UnreadCount'],
    }),
    markAsRead: builder.mutation<{ success: boolean; data: Notification }, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications', 'UnreadCount'],
    }),
    markAllAsRead: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: '/notifications/read-all',
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications', 'UnreadCount'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi;
