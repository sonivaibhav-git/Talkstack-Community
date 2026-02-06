import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useLogin } from '../../features/auth/useLogin'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
    if (!validate()) return
    try {
      await mutateAsync({ username, password })
      toast.success('Logged in')
      navigate('/')
    } catch {
      toast.error('Invalid credentials')
    }
  }
  return (
    <div className='h-screen w-full flex items-center justify-center bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 p-4'>
      <motion.div
        className='w-100 md:w-full h-fit md:h-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className=' md:flex flex-col justify-between p-8 md:bg-gradient-to-br bg-gradient-to-b from-purple-200 via-purple-300 to-purple-400'>
          <div className='text-center md:text-left text-lg md:text-sm font-bold text-neutral-800 lowercase'>
            TalkStack
          </div>

          <div>
            <p className=' hidden md:flex text-sm text-neutral-700 mb-2'>
              You can easily
            </p>
            <h2 className='hidden md:flex text-4xl font-bold text-neutral-900 leading-snug'>
              Step into a shared space where ideas compound, <br />
              conversations scale, <br />& communities think out loud
            </h2>
          </div>

          <div />
        </div>

        <div className='flex items-center justify-center p-6 sm:p-10'>
          <form
            onSubmit={submit}
            className='w-full max-w-sm flex flex-col gap-5'
          >
            <h1 className='text-3xl text-center font-bold text-neutral-900'>
              Login to Account
            </h1>

            <p className='text-sm text-neutral-500'>
              Access conversations, insights, and shared ideas anytime.
            </p>

            <div className='flex flex-col gap-1'>
              <label className='text-sm font-medium text-neutral-700'>
                Username
              </label>
              <input
                value={username}
                onChange={e => {
                  setUsername(e.target.value)
                  setErrors(p => ({ ...p, username: '' }))
                }}
                placeholder='Username'
                className='w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900'
              />
              {errors.username && (
                <span className='text-xs text-purple-600'>
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
                <span className='text-xs text-purple-600'>
                  {errors.password}
                </span>
              )}
            </div>

            <p className='text-xs text-neutral-600 text-center'>
              <Link
                to='/'
                className='text-neutral-900 font-medium hover:underline'
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
                className='text-neutral-900 font-medium hover:underline'
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

/*<div className='min-h-screen w-full flex items-center justify-center bg-neutral-100 px-4 '>
      <div className='w-full max-w-sm sm:max-w-md'>
        <form
          onSubmit={submit}
          className='w-full bg-white border border-neutral-300 rounded-lg shadow-xl p-6 sm:p-8 flex flex-col gap-5'
        >
          <h1 className='text-3xl font-bold text-neutral-900 text-center'>
            Login
          </h1>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-neutral-700'>
              Username
            </label>
            <input
              value={username}
              onChange={e => {
                setUsername(e.target.value)
                setErrors(p => ({ ...p, username: '' }))
              }}
              placeholder='Username'
              className='w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
            />
            {errors.username && (
              <span className='text-xs text-purple-600'>{errors.username}</span>
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
                }}
                placeholder='Password'
                className='w-full rounded-md border border-neutral-300 px-3 py-2 pr-16 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
              />

              <button
                type='button'
                onClick={() => setShowPassword(p => !p)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-lg font-medium text-purple-600 hover:text-purple-700 select-none'
              >
                {showPassword ?
                <HoverLabel label='Hide' ><IoEyeOffOutline /></HoverLabel> : <HoverLabel label='Show' ><IoEyeOutline /></HoverLabel>}
              </button>
            </div>

            {errors.password && (
              <span className='text-xs text-purple-600'>{errors.password}</span>
            )}
          </div>

          <button
            type='submit'
            className='mt-2 w-full rounded-full bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white text-sm font-semibold py-2.5 transition-colors'
          >
            Log In
          </button>

          <p className='text-xs text-neutral-600 text-center'>
            New to Talkstacks?{' '}
            <Link to='/register' className='text-purple-600 hover:underline'>
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div> */
