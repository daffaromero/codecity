import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import qs from 'qs'

import { apiBaseUrl, mockApiBaseUrl } from '@/config/env'
import { APP_ACCESS_TOKEN, USER_ACCESS_TOKEN } from '@/config/token'

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: apiBaseUrl,
  paramsSerializer: (params) => qs.stringify(params),
  prepareHeaders: (headers) => {
    const appAccessToken = getCookie(APP_ACCESS_TOKEN)
    const userAccessToken = getCookie(USER_ACCESS_TOKEN)
    console.log(userAccessToken)

    if (userAccessToken) {
      headers.set('Authorization', `Bearer ${userAccessToken}`)
    } else if (appAccessToken) {
      headers.set('Authorization', `Bearer ${appAccessToken}`)
    }

    return headers
  },
})

export const mockApiBaseQuery = fetchBaseQuery({
  baseUrl: mockApiBaseUrl,
  paramsSerializer: (params) => qs.stringify(params),
  prepareHeaders: (headers) => {
    const appAccessToken = getCookie(APP_ACCESS_TOKEN)
    const userAccessToken = getCookie(USER_ACCESS_TOKEN)

    if (userAccessToken) {
      headers.set('Authorization', `Bearer ${userAccessToken}`)
    } else if (appAccessToken) {
      headers.set('Authorization', `Bearer ${appAccessToken}`)
    }

    return headers
  },
})

export const openApiBaseQuery = fetchBaseQuery()
