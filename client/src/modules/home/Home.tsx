import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Language from '@/components/Language'
import Blank from '@/layouts/Blank'

const Home: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation(['common', 'home'])

  return (
    <Blank title={t('home:title')}>
      <main className='min-h-screen bg-gray-100'>
        <section className='mx-auto min-h-screen max-w-screen-sm bg-white py-10'>
          <div className='flex flex-row items-center justify-between px-6 text-center'>
            <h1 className='font-primary text-2xl font-bold md:text-4xl'>{t('common:titles.home')}</h1>

            <Language />
          </div>

          <div className='flex flex-row justify-center'>
            <Link
              href={{ pathname: '/examples', query: { lang: router.query.lang } }}
              locale={router.locale}
            >
              <a className='mt-6 py-2 px-4 text-sm font-medium underline'>{t('home:example')}</a>
            </Link>
          </div>
        </section>
      </main>
    </Blank>
  )
}

export default Home
