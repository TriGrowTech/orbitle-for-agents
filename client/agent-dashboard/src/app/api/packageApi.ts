import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ItineraryItem {
  dayNumber: number;
  title: string;
  description: string;
  _id?: string;
}

export interface PackageData {
  _id: string;
  agentId: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  category: 'domestic' | 'international';
  packageType: string;
  imageUrl1?: string;
  imageUrl2?: string;
  itinerary: ItineraryItem[];
  originalPrice: number;
  discountedPrice?: number;
  isTrending: boolean;
  hasOffer: boolean;
  badges: string[];
  inclusions: string[];
  exclusions: string[];
  termsAndConditions?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const packageApi = createApi({
  reducerPath: 'packageApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    credentials: 'include',
  }),
  tagTypes: ['Package'],
  endpoints: (builder) => ({
    getPackages: builder.query<{ success: boolean; data: PackageData[] }, void>({
      query: () => '/packages',
      providesTags: ['Package'],
    }),
    createPackage: builder.mutation<{ success: boolean; data: PackageData }, FormData>({
      query: (pkg) => ({
        url: '/packages',
        method: 'POST',
        body: pkg,
      }),
      invalidatesTags: ['Package'],
    }),
    updatePackage: builder.mutation<{ success: boolean; data: PackageData }, { id: string; data: FormData | Partial<PackageData> }>({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Package'],
    }),
    deletePackage: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/packages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Package'],
    })
  })
});

export const {
  useGetPackagesQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;
