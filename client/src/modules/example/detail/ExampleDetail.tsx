import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Blank from '@/layouts/Blank'
import { useGetDetailStaffQuery } from '@/services/staffs'

const ExampleDetail: FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'example'])

  const { data } = useGetDetailStaffQuery(String(router.query.id))


  return (
    <Blank title={data?.data?.[0]?.attributes?.firstName || 'Loading...'}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
            <h1 className='font-primary text-2xl font-bold md:text-4xl'>{data?.data?.[0]?.attributes?.firstName || 'Loading...'}</h1>

            <Language />
          </div>

          <div className='flex flex-row justify-center'>
            <Link href={{ pathname: '/examples', query: { lang: router.query.lang } }}>
              <a className='mt-6 py-2 px-4 text-sm font-medium underline'>
                {t('common:backTo', { page: t('common:titles.example') })}
              </a>
            </Link>
          </div>

          <div className='mx-3 mt-6 grid w-full place-items-center'>
            <div className='group relative'>
              <div className='aspect-w-1 aspect-h-1 lg:aspect-none h-80 w-80 overflow-hidden rounded-md bg-gray-200 lg:h-80'>
                <img
                  src={`https://ui-avatars.com/api/?name=${data?.data?.[0].attributes?.firstName}+${data?.data?.[0].attributes?.lastName}&background=0D8ABC&color=fff`}
                  alt={data?.data?.[0]?.attributes?.firstName}
                  className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                  loading='lazy'
                />
              </div>

              <div className='mt-4 text-center'>
                <h3 className='text-sm text-gray-700'>{data?.data?.[0]?.attributes?.fullName || 'Loading...'}</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default ExampleDetail
