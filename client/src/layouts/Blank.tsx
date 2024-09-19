import { NextSeo } from 'next-seo'
import React, { FC } from 'react'

import { appName } from '@/config/env'

interface BlankLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
}

const Blank: FC<BlankLayoutProps> = ({ title, description, children }) => {
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate={`%s | ${appName}`}
        description={description}
      />

      <div>{children}</div>
    </>
  )
}

export default Blank
