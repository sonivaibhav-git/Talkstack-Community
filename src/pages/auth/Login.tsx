import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useLogin } from '../../features/auth/useLogin'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { mutateAsync, isPending } = useLogin()

  const validate = () => {
    const e: Record<string, string> = {}

    if (!username) e.username = 'Username required'
    if (!password) e.password = 'Password required'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!validate()) return

    try {
      await mutateAsync({ username, password })
      console.log('Logged in')
      navigate('/')
    } catch (err: any) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        'Invalid credentials'

      setFormError(message)
      console.error(message)
    }
  }

  return (
    <div className='h-screen w-full flex items-center justify-center bg-linear-to-br from-neutral-400 via-neutral-300 to-neutral-200'>
      <motion.div
        className='w-100 md:w-full h-fit md:h-full bg-white shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* LEFT PANEL */}
        <div className='hidden md:flex flex-col justify-between p-8 md:bg-linear-to-br bg-linear-to-b from-purple-200 via-purple-300 to-purple-400'>
          <img
            className='w-10 rounded-xl'
            src='https://i.ibb.co/RWgQGVG/Vector.jpg'
            loading='lazy'
          />

          <div>
            <p className='text-sm text-neutral-700 mb-2'>
              You can easily
            </p>
            <h2 className='text-4xl font-bold text-neutral-900 leading-snug'>
              Step into a shared space where ideas compound,
              <br />
              conversations scale,
              <br />& communities think out loud
            </h2>
          </div>

          <div />
        </div>

        {/* FORM */}
        <div className='flex flex-col gap-5 items-center justify-center p-6 sm:p-10'>
          <form
            onSubmit={submit}
            className='w-full max-w-sm flex flex-col gap-5'
          >
            <img
              className='md:hidden w-10 self-center rounded-xl'
              src='https://i.ibb.co/RWgQGVG/Vector.jpg'
              loading='lazy'
            />

            <h1 className='text-3xl text-center font-bold text-neutral-800'>
              Login to Account
            </h1>

            {formError && (
              <div className='w-full rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700'>
                {formError}
              </div>
            )}

            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-neutral-700'>
                Username
              </label>
              <input
                value={username}
                onChange={e => {
                  setUsername(e.target.value)
                  setErrors(p => ({ ...p, username: '' }))
                  setFormError(null)
                }}
                placeholder='Username'
                className='w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900'
              />
              {errors.username && (
                <span className='text-xs text-red-600'>
                  {errors.username}
                </span>
              )}
            </div>

            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-neutral-700'>
                Password
              </label>

              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    setErrors(p => ({ ...p, password: '' }))
                    setFormError(null)
                  }}
                  placeholder='Password'
                  className='w-full rounded-md border border-neutral-300 px-3 py-2 pr-12 text-sm outline-none focus:border-neutral-900'
                />

                <button
                  type='button'
                  onClick={() => setShowPassword(p => !p)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-neutral-900'
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>

              {errors.password && (
                <span className='text-xs text-red-600'>
                  {errors.password}
                </span>
              )}
            </div>

            <p className='text-xs text-neutral-600 text-center'>
              <Link
                to='/forgot-password'
                className='text-purple-500 font-medium hover:underline'
              >
                Forgot Password?
              </Link>
            </p>

            <button
              type='submit'
              disabled={isPending}
              className='mt-2 py-2 w-full rounded-md btn'
            >
              {isPending ? 'Logging in…' : 'Log In'}
            </button>

            <p className='text-xs text-neutral-600 text-center'>
              Create an Account{' '}
              <Link
                to='/register'
                className='text-purple-500 font-medium hover:underline'
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
