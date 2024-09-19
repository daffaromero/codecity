import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { apiBaseQuery } from '@/utils/api'
import { AuthRequest, AuthResponse } from '@/types/auth'

const api = createApi({
  reducerPath: 'auth',
  baseQuery: apiBaseQuery,
  tagTypes: ['Auth'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    postLogin: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    postLogout: builder.mutation<AuthResponse, AuthRequest>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { usePostLoginMutation } = api

export default api
