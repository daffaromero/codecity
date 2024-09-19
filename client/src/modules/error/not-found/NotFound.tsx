import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Blank from '@/layouts/Blank'

const NotFound: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'error'])

  return (
    <Blank title={t('error:ERR_1')}>
      <main className='flex h-screen w-full flex-col items-center justify-center bg-[#1A2238]'>
        <h1 className='select-none text-9xl font-extrabold tracking-widest text-white'>404</h1>

        <div className='absolute rotate-12 select-none rounded bg-[#FF6A3D] px-2 text-sm'>{t('error:ERR_1')}</div>

        <button className='mt-5'>
          <div className='group relative inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500'>
            <div className='absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-y-0 group-hover:translate-x-0' />

            <div className='relative block border border-current bg-[#1A2238] px-8 py-3'>
              <Link
                href='/'
                locale={router.locale}
              >
                <a>{t('common:backTo', { page: t('common:titles.home') })}</a>
              </Link>
            </div>
          </div>
        </button>
      </main>
    </Blank>
  )
}

export default NotFound
