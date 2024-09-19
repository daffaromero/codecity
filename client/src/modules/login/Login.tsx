import { USER_ACCESS_TOKEN } from '@/config/token'
import MobileLayout from '@/layouts/MobileLayout'
import { usePostLoginMutation } from '@/services/auth'
import { AuthForm } from '@/types/auth'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<AuthForm>({
    mode: 'onChange',
  })

  const [doLogin, { isSuccess, data: authData }] = usePostLoginMutation()

  const onSubmit = async (authForm: AuthForm) => {
    const payload = {
      data: {
        attributes: { ...authForm },
      },
    }

    await doLogin(payload)
  }

  useEffect(() => {
    if (isSuccess && authData) {
      if (authData.data.length > 0) {
        const {
          attributes: { accessToken },
        } = authData.data[0]

        setCookie(USER_ACCESS_TOKEN, accessToken)
      }

      router.push('/')
    }
  }, [isSuccess, authData])

  return (
    <MobileLayout title='Login'>
      <div className='min-w-screen flex min-h-screen grow flex-col items-center justify-center space-y-10 px-10'>
        <h1 className='text-[24px]'>Wellcome to HR System</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col space-y-5'
        >
          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='username'
              className='text-sm font-semibold text-black'
            >
              Username
            </label>

            <input
              {...register('username', { required: 'Username is required!' })}
              id='username'
              type='text'
              className='placeholder:text-placeholder w-full rounded border border-solid border-[#EAEAEA] py-3 px-2.5 text-sm font-semibold text-black placeholder:font-bold focus:border-[#EAEAEA] focus:ring-transparent'
            />
          </div>

          <div className='flex flex-col space-y-2'>
            <label
              htmlFor='password'
              className='text-sm font-semibold text-black'
            >
              Password
            </label>

            <input
              {...register('password', { required: 'Password is required!' })}
              id='password'
              type='password'
              className='placeholder:text-placeholder w-full rounded border border-solid border-[#EAEAEA] py-3 px-2.5 text-sm font-semibold text-black placeholder:font-bold focus:border-[#EAEAEA] focus:ring-transparent'
            />
          </div>

          <button className='w-full rounded-md border bg-blue-500 py-2 text-[24px] text-white hover:bg-blue-400'>
            Login
          </button>
        </form>
      </div>
    </MobileLayout>
  )
}

export default Login
