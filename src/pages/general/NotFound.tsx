import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <section className='w-full px-4 sm:px-6 py-16'>
      <div className='max-w-md mx-auto flex flex-col items-center text-center gap-4'>
        <h1 className='text-6xl sm:text-7xl md:text-8xl font-extrabold  text-purple-500'>
          404
        </h1>

        <p className='text-sm sm:text-base text-neutral-600'>
          This page doesn’t exist, was moved, or never made it out of planning.
        </p>

        <Link to='/' className='btn'>
          Go home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
