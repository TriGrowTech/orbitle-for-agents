import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface BannerData {
  _id: string;
  agentId: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkUrl: string;
  bannerType: 'hero_slide' | 'promotional';
  position: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const bannerApi = createApi({
  reducerPath: 'bannerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['Banner'],
  endpoints: (builder) => ({
    getBanners: builder.query<{ success: boolean; data: BannerData[] }, void>({
      query: () => '/banners',
      providesTags: ['Banner'],
    }),
    createBanner: builder.mutation<{ success: boolean; data: BannerData }, FormData>({
      query: (formData) => ({
        url: '/banners',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Banner'],
    }),
    updateBanner: builder.mutation<{ success: boolean; data: BannerData }, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/banners/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Banner'],
    }),
    deleteBanner: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/banners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
  }),
});

export const {
  useGetBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
