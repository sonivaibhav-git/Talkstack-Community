import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useRegister } from '../features/auth/useRegister'

export default function Register() {
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
      toast.success('Account created')
      navigate('/')
    } catch {
      toast.error('Registration failed')
    }
  }

  return (
     <div className='min-h-screen w-full flex items-center justify-center bg-neutral-100 px-4'>
      <div className='w-full max-w-sm sm:max-w-md'>
        <form
          onSubmit={submit}
          className='w-full bg-white border border-neutral-300 rounded-lg shadow-sm p-6 sm:p-8 flex flex-col gap-5'
        >
          <h1 className='text-3xl font-bold text-neutral-900 text-center'>
            Register
          </h1>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-neutral-700'>
              Username
            </label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder='Username'
              className='w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
            />
            {errors.username && (
              <span className='text-xs text-red-600'>{errors.username}</span>
            )}
          </div>

          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium text-neutral-700'>
              Email
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Email'
              className='w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
            />
            {errors.email && (
              <span className='text-xs text-red-600'>{errors.email}</span>
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
                onChange={e => setPassword(e.target.value)}
                placeholder='Password'
                className='w-full rounded-md border border-neutral-300 px-3 py-2 pr-16 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500'
              />
             <button
                type='button'
                onClick={() => setShowPassword(p => !p)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-lg font-medium text-red-600 hover:text-red-700 select-none'
              >
                {showPassword ?<IoEyeOffOutline />:<IoEyeOutline />}
              </button>
            </div>

            {errors.password && (
              <span className='text-xs text-red-600'>{errors.password}</span>
            )}
          </div>

          <button
            type='submit'
            className='mt-2 w-full rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-semibold py-2.5 transition-colors'
          >
            Register
          </button>

          <p className='text-xs text-neutral-600 text-center'>
            Already have an account?{' '}
            <Link to='/login' className='text-red-600 hover:underline'>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>

  )
}
