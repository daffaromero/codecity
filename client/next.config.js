/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  distDir: process.env.NODE_ENV === 'production' ? '.next' : '.next-dev',

  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'id'],
  //   localeDetection: false,
  // },

  eslint: {
    dirs: ['src'],
  },

  env: {
    // APP
    APP_NAME: process.env.APP_NAME,
    APP_URL: process.env.APP_URL,
    APP_VERSION: process.env.APP_VERSION,
    APP_BUILD_SIGNATURE: process.env.APP_BUILD_SIGNATURE,

    // API
    API_BASE_URL: process.env.API_BASE_URL,
    API_CLIENT_ID: process.env.API_CLIENT_ID,
    API_CLIENT_SECRET: process.env.API_CLIENT_SECRET,
    API_PLATFORM_ID: process.env.API_PLATFORM_ID,

    // MOCK API
    MOCK_API_BASE_URL: process.env.MOCK_API_BASE_URL,
    MOCK_API_CLIENT_ID: process.env.MOCK_API_CLIENT_ID,
    MOCK_API_CLIENT_SECRET: process.env.MOCK_API_CLIENT_SECRET,
  },

  webpack(config, { isServer }) {
    // Module not found: Can't resolve 'fs' in Next.js application
    // See: https://stackoverflow.com/q/64926174/13701519
    if (!isServer) {
      config.resolve.fallback.fs = false
    }

    // Critical dependency warning when compiling NextJS pages
    // See: https://github.com/i18next/next-i18next/issues/1545
    // See: https://github.com/i18next/next-i18next/issues/1545#issuecomment-1088813871
    config.module.exprContextCritical = false

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    })

    return config
  },
}
