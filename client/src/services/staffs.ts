import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

import { StaffBrowseRequest, StaffBrowseResponse, StaffDetailResponse } from '@/types/staff'
import { apiBaseQuery, mockApiBaseQuery } from '@/utils/api'

const api = createApi({
  reducerPath: 'staff',
  baseQuery: apiBaseQuery,
  tagTypes: ['Staff'],
  refetchOnMountOrArgChange: true,
  keepUnusedDataFor: 259200, // 3 days
  endpoints: (builder) => ({
    getListStaffs: builder.query<StaffBrowseResponse, StaffBrowseRequest>({
      query: (params) => ({
        params,
        url: '/staffs',
        providesTags: ['Staff'],
      }),
    }),
    getDetailStaff: builder.query<StaffDetailResponse, string>({
      query: (id) => ({
        url: `/staffs/${id}`,
      }),
      providesTags: ['Staff'],
    }),
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
})

// Export hooks for usage in functional components
export const { useGetListStaffsQuery, useGetDetailStaffQuery, util: exampleUtil } = api

export default api
