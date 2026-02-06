import { AiOutlineEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import FollowSubstackBtn from '../substack/FollowSubstackBtn'
import UnfollowSubstackBtn from '../substack/UnfollowSubstackBtn'
type Props = {
  data: any
}

function SubstackProfileCard ({ data }: Props) {
  const navigate = useNavigate()
  return (
    <div
    className='w-full
    h-fit
    rounded-xl
    col-span-2
    lg:col-span-1
    max-w-full
    bg-white
    shadow-lg
    overflow-hidden
    md:sticky md:top-0 p-2 mb-10'
    >
      {/* Banner */}
      {data.bannerUrl && (
        <div className='w-full h-48 bg-neutral-100'>
          <img
            src={data.bannerUrl}
            className='w-full h-full object-cover'
            loading='lazy'
          />
        </div>
      )}

      {/* Content */}
      <div className=' w-full p-2 flex flex-col gap-4'>
        {/* Logo */}
        <div className='flex flex-row gap-2'>
          <img
            src={data.logoUrl || 'https://i.ibb.co/ZR95Wbxg/Talkstack-Logo.png'}
            className='w-24 h-24 rounded-xl border-4 border-white object-cover shadow-md'
            loading='lazy'
          />
          <div>
            {' '}
            <h1 className='text-2xl font-bold text-neutral-900'>{data.name}</h1>
            <p className='text-sm text-neutral-500'>s/{data.slug}</p>
          </div>
        </div>

        <div className='w-full'>
          <p className='text-neutral-700 leading-relaxed'>
            {data.description || 'This substack has no description yet.'}
          </p>
        </div>

        {/* Description */}

        {/* Meta */}
        <div className='flex flex-row justify-evenly w-full rounded-xl gap-6 border border-neutral-300 text-lg text-neutral-600'>
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

          {data.viewer.me && data.viewer.following ? (
            <UnfollowSubstackBtn slug={data.slug} />
          ) : (
            <FollowSubstackBtn slug={data.slug} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SubstackProfileCard
