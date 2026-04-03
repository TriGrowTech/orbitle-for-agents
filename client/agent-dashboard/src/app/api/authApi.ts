import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  isOnboarded: boolean;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<{ success: boolean; agent: any }, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    checkSubdomain: builder.query<{ success: boolean; isAvailable: boolean }, string>({
      query: (subdomain) => `/auth/check-subdomain?subdomain=${subdomain}`,
    }),
    forgotPassword: builder.mutation<{ success: boolean; message: string }, { email: string }>({
      query: (data) => ({
        url: '/auth/forgotpassword',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ success: boolean; token: string }, { otp: string; password: string; email: string }>({
      query: (data) => ({
        url: '/auth/resetpassword',
        method: 'PUT',
        body: data,
      }),
    }),
    completeOnboarding: builder.mutation<{ success: boolean; isOnboarded: boolean }, FormData>({
      query: (formData) => ({
        url: '/auth/complete-onboarding',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation<{ success: boolean; agent: any }, { name?: string; email?: string; whatsapp?: string }>({
      query: (data) => ({
        url: '/auth/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation<{ success: boolean; token: string }, { currentPassword: string; newPassword: string }>({
      query: (data) => ({
        url: '/auth/password',
        method: 'PUT',
        body: data,
      }),
    }),
    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useGetMeQuery, 
  useCheckSubdomainQuery,
  useCompleteOnboardingMutation, 
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation 
} = authApi;
