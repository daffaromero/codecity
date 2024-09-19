import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { FC, ReactNode, useEffect } from 'react'
import { USER_ACCESS_TOKEN } from '@/config/token'

interface CheckingUserTokenProps {
  children: ReactNode
}

const CheckingUserToken: FC<CheckingUserTokenProps> = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const guestUrls = ['/login']

    if (!guestUrls.includes(router.pathname)) {
      if (getCookie(USER_ACCESS_TOKEN) === undefined) {
        router.push('/login')
      }
    } else if ([...guestUrls, '/'].includes(router.pathname) && getCookie(USER_ACCESS_TOKEN) !== undefined) {
      router.push('/examples')
    }
  }, [router.pathname])

  return <>{children}</>
}

export default CheckingUserToken
