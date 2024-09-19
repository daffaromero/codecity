import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Language: React.FC = () => {
  const router = useRouter()
  const { i18n } = useTranslation()

  const [locale, setLocale] = useState(router.query.lang)

  useEffect(() => {
    if (router.query.lang) {
      setLocale(router.query.lang)
    }
  }, [router.query])

  useEffect(() => {
    i18n.changeLanguage(String(locale))
  }, [locale])

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    const { value } = e.target

    const { pathname, query } = router

    setLocale(locale)

    router.push({ pathname, query: { ...query, lang: value } })
  }

  return (
    <select
      className='mt-1 block w-32 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-600 focus:outline-none focus:ring-gray-600 sm:text-sm'
      onChange={handleChangeLanguage}
      value={locale}
    >
      <option value='id'>Bahasa</option>
    </select>
  )
}

export default React.memo(Language)
