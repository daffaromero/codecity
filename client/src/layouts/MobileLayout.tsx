import { NextSeo } from 'next-seo'
import { FC } from 'react'

import { appName } from '@/config/env'

export type MobileLayoutProps = {
  title: string
  description?: string
  children: React.ReactNode
}

const MobileLayout: FC<MobileLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${appName}`}
        description={description}
      />

      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-[480px] bg-white'>{children}</section>
      </main>
    </>
  )
}

export default MobileLayout
