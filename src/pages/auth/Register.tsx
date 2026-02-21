import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useRegister } from '../../features/auth/useRegister'

export default function Register () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const navigate = useNavigate()
  const { mutateAsync, isPending } = useRegister()

  const validate = () => {
    const e: Record<string, string> = {}
    if (!username) e.username = 'Username required'
    if (!email) e.email = 'Email required'
    if (!password || password.length < 8) e.password = 'Minimum 8 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await mutateAsync({ username, email, password })
      console.log('Account created')
      navigate('/')
    } catch {
      console.error('Registration failed')
    }
  }

  return (
    <div className='h-screen w-full flex items-center justify-center bg-linear-to-br from-neutral-200 via-neutral-300 to-neutral-400 p-4'>
      <motion.div
        className='w-100 md:w-full h-fit md:h-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className=' hidden md:flex flex-col justify-between p-8 bg-linear-to-br from-purple-200 via-purple-300 to-purple-400'>
          <img
            className='w-10 rounded-xl'
            src='https://i.ibb.co/RWgQGVG/Vector.jpg'
            loading='lazy'
          />

          <div>
            <p className='hidden md:flex text-sm text-neutral-700 mb-2'>
              Join the conversation
            </p>
            <h2 className='hidden md:flex text-4xl font-bold text-neutral-900 leading-snug'>
              Build ideas in public, scale discussions, and grow communities
              that think together
            </h2>
          </div>

          <div />
        </div>

        <div className='flex flex-col gap-2 items-center justify-center p-6 sm:p-10'>
          <form
            onSubmit={submit}
            className='w-full max-w-sm flex flex-col gap-5'
          >
            <img
              className='md:hidden w-10 self-center rounded-xl'
              src='https://i.ibb.co/RWgQGVG/Vector.jpg'
              loading='lazy'
            />
            <h1 className='text-3xl text-center font-bold text-neutral-900'>
              Create Account
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
                Email
              </label>
              <input
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setErrors(p => ({ ...p, email: '' }))
                }}
                placeholder='Email'
                className='w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900'
              />
              {errors.email && (
                <span className='text-xs text-purple-600'>{errors.email}</span>
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

            <button
              type='submit'
              disabled={isPending}
              className='mt-2 w-full py-2 rounded-md btn'
            >
              {isPending ? 'Creating account…' : 'Register'}
            </button>

            <p className='text-xs text-neutral-600 text-center'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='text-purple-500 font-medium hover:underline'
              >
                Log in
              </Link>
            </p>
          </form>
          {/* <p className='text-sm text-neutral-600 flex flex-row w-full items-center'>
            {' '}
            <hr className='w-full' />
            <span className='px-2 '>or </span> <hr className='w-full' />
          </p>
          <div className='max-w-sm flex flex-col justify-center gap-5'>
            <button className='shadow-lg hover:shadow-xl border border-neutral-200 px-4 py-2 w-fit text-sm flex items-center gap-5 bg-neutral-200'>
              {' '}
              <img
                className='w-4 h-4 object-cover'
                src='https://i.ibb.co/dwrxRtJ7/image-removebg-preview.png'
                loading= "lazy"
              />{' '}
              SignUp with Google
            </button>
          </div> */}
        </div>
      </motion.div>
    </div>
  )
}
