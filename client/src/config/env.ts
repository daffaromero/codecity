import { tailingSlash } from '@/utils/formatter'

export const environment = process.env.NODE_ENV
export const isProduction = environment === 'production'

// app
export const appName = process.env.APP_NAME || 'App Name'
export const appVersion = process.env.APP_VERSION || 'v0.0.0'
export const appBuildSignature = process.env.APP_BUILD_SIGNATURE || 'local'

// api
export const apiBaseUrl = tailingSlash(process.env.API_BASE_URL || '')
export const apiClientId = process.env.API_CLIENT_ID || ''
export const apiClientSecret = process.env.API_CLIENT_SECRET || ''
export const apiPlatformId = Number(process.env.API_PLATFORM_ID || 0)

// mock api
export const mockApiBaseUrl = tailingSlash(process.env.MOCK_API_BASE_URL || '')
export const mockApiClientId = process.env.MOCK_API_CLIENT_ID || ''
export const mockApiClientSecret = process.env.MOCK_API_CLIENT_SECRET || ''
