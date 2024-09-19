import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'

import '@/styles/theme.css'

import Loading from '@/components/Loading'
import i18n from '@/config/i18n'
import { wrapper } from '@/store'
import CheckingUserToken from '@/layouts/CheckingUserToken'

const MyApp: React.FC<AppProps> = (props) => {
  const { Component, pageProps } = props

  const router = useRouter()

  const [progress, setProgress] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  })

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setProgress((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }))
    }

    const handleRouteChangeEnd = () => {
      setProgress((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }))
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router.events])

  return (
    <I18nextProvider i18n={i18n}>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
      </Head>

      <Loading
        key={progress.loadingKey}
        isRouteChanging={progress.isRouteChanging}
      />

      <CheckingUserToken>
        <Component {...pageProps} />
      </CheckingUserToken>
    </I18nextProvider>
  )
}

export default wrapper.withRedux(MyApp)
