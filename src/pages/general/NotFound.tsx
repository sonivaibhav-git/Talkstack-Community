import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-16">
      <div className="max-w-md mx-auto flex flex-col items-center text-center gap-4">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-neutral-900">
          404
        </h1>

        <p className="text-sm sm:text-base text-neutral-600">
          This page doesn’t exist, was moved, or never made it out of planning.
        </p>

        <Link
          to="/"
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition"
        >
          Go home
        </Link>
      </div>
    </section>
  )
}

export default NotFound

