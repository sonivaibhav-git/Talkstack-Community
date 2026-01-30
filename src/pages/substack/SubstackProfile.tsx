import { useParams, Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useSubstackProfile } from '../../features/substacks/substack.queries'

import NotFound from '../general/NotFound'
import FollowSubstackBtn from '../../components/substack/FollowSubstackBtn'
import UnfollowSubstackBtn from '../../components/substack/UnfollowSubstackBtn'
import { AiOutlineEdit } from 'react-icons/ai'

const SubstackProfileInner = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data, isLoading, error } = useSubstackProfile(slug!)
  console.log(data)

  if (isLoading)
    return (
      <div className='p-6 text-center text-neutral-500'>Loading substack…</div>
    )

  if (error) {
    const err = error as AxiosError

    if (err.response?.status === 404) {
      return <NotFound />
    }

    return (
      <div className='p-6 text-center text-red-600'>
        Failed to load substack. Try again later.
      </div>
    )
  }

  if (!data) {
    return (
      <div className='p-6 text-center text-neutral-600'>No data available.</div>
    )
  }

  return (
    <div className='w-full flex justify-center bg-neutral-100 p-2'>
      <div className='w-full bg-white rounded-3xl shadow-lg overflow-hidden'>
        {/* Banner */}
        <div className='w-full h-48 bg-neutral-200'>
          {data.bannerUrl && (
            <img
              src={data.bannerUrl}
              className='w-full h-full object-cover'
              loading='lazy'
            />
          )}
        </div>

        {/* Content */}
        <div className='relative p-6 flex flex-col gap-4'>
          {/* Logo */}
          <div className='absolute -top-12 left-6'>
            <img
              src={
                data.logoUrl || 'https://i.ibb.co/ZR95Wbxg/Talkstack-Logo.png'
              }
              className='w-24 h-24 rounded-xl border-4 border-white object-cover shadow-md'
              loading='lazy'
            />
          </div>

          <div className='pt-14'>
            <h1 className='text-2xl font-bold text-neutral-900'>{data.name}</h1>

            <p className='text-sm text-neutral-500'>{data.slug}</p>
          </div>

          {/* Description */}
          <p className='text-neutral-700 leading-relaxed'>
            {data.description || 'This substack has no description yet.'}
          </p>

          {/* Meta */}
          <div className='flex flex-wrap w-fit px-4 py-2 rounded-xl  gap-6 border border-neutral-400 text-lg text-neutral-600'>
            <div className='flex flex-col items-center '>
              <span className='font-semibold text-neutral-800'>
                {data.subscriberCount}
              </span>{' '}
              Subscribers
            </div>

            <div className='flex flex-col items-center'>
              <Link
                to={`/profile/${data.admin.username}`}
                className='font-medium  hover:underline'
              >
                u/
                <span className='text-neutral-900'> {data.admin.username}</span>
              </Link>
              Admin{' '}
            </div>
          </div>

          {/* Actions */}
          <div className='mt-4 flex gap-3 w-full'>
            {data.viewer.me && (
              <button
                onClick={() => navigate(`/substacks/${data.slug}/edit`)}
                className='px-4 py-1 w-full md:w-fit text-neutral-900 flex flex-row items-center gap-2'
              >
                <AiOutlineEdit size={24} /> Edit Substack
              </button>
            )}

            {!data.viewer.me && data.viewer.following && (
              <UnfollowSubstackBtn slug={data.slug} />
            )}

            {!data.viewer.me && !data.viewer.following && (
              <FollowSubstackBtn slug={data.slug} />
            )}

            <button className='px-4 py-1 rounded-xl border'>View Posts</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubstackProfileInner
