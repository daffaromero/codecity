import React, { useEffect, useState } from 'react'
import UAParser, { IResult } from 'ua-parser-js'

import { appBuildSignature, appName, appVersion } from '@/config/env'
import Blank from '@/layouts/Blank'
import { useBrowserLayoutEffect } from '@/utils/hooks'

const HealthCard = () => {
  const [userAgent, setUserAgent] = useState<IResult | undefined>()
  const [screen, setScreen] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'App Name',
      value: appName,
    },
    {
      id: 2,
      name: 'App Version',
      value: appVersion,
    },
    {
      id: 3,
      name: 'Build Signature',
      value: appBuildSignature,
    },
    {
      id: 4,
      name: 'Screen Size',
      value: '-',
    },
    {
      id: 5,
      name: 'Browser',
      value: '-',
    },
    {
      id: 6,
      name: 'OS',
      value: '-',
    },
  ])

  useBrowserLayoutEffect(() => {
    const ua = new UAParser()

    setUserAgent(ua.getResult())

    const onResize = () => {
      setScreen({ width: window.screen.availWidth, height: window.screen.availHeight })
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (userAgent) {
      setItems(
        items.map((item) => {
          if (item.id === 4) {
            return {
              ...item,
              value: `${window.screen.availWidth} x ${window.screen.availHeight}`,
            }
          }

          if (item.id === 5) {
            return {
              ...item,
              value: `${userAgent.browser.name} (${userAgent.browser.version})`,
            }
          }

          if (item.id === 6) {
            return {
              ...item,
              value: `${userAgent.os.name} (${userAgent.os.version})`,
            }
          }

          return item
        })
      )
    }
  }, [userAgent])

  useEffect(() => {
    setItems(
      items.map((item) => {
        if (item.id === 4) {
          return {
            ...item,
            value: `${screen.width} x ${screen.height}`,
          }
        }

        return item
      })
    )
  }, [screen])

  return (
    <Blank title='Health Check'>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white p-4'>
          <div className='flex min-h-[80vh] flex-col items-center justify-center space-y-4 text-center'>
            {items.map((item) => (
              <div
                className='flex flex-col items-center justify-center space-y-1 text-center'
                key={item.id}
              >
                <div>{item.name}</div>

                <div className='break-all font-semibold italic'>{item.value}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default HealthCard
