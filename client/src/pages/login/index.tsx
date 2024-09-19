import dynamic from 'next/dynamic'

const Page = dynamic(() => import('@/modules/login'), { ssr: false })

export default Page
