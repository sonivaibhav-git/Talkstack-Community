import { AiOutlineEdit } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import FollowSubstackBtn from '../substack/FollowSubstackBtn'
import UnfollowSubstackBtn from '../substack/UnfollowSubstackBtn'
import type { ReactNode } from 'react'
import SecondaryBtn from '../buttons/SecondaryBtn'
import DeleteSubstackBtn from '../buttons/delete/DeleteSubstackBtn'
type Props = {
  data: any
  postCount: ReactNode
}

function SubstackProfileCard ({ data, postCount }: Props) {
  const navigate = useNavigate()
  return (
    <div
      className='w-full
    h-fit
    rounded-xl
    col-span-2
    max-w-full
    bg-white
    shadow-lg
    overflow-hidden
    md:sticky md:top-0 p-2 '
    >
      {/* Banner */}
      {data.bannerUrl && (
        <div className='w-full h-48 overflow-hidden mask-b-to-100%'>
          <img
            src={data.bannerUrl}
            className='w-full h-full object-cover'
            loading='lazy'
            alt=''
          />
        </div>
      )}

      {/* Content */}
      <div className=' w-full p-2 flex flex-col gap-4'>
        {/* Logo */}
        <div className='flex flex-row gap-2'>
          <img
            src={data.logoUrl || 'https://i.ibb.co/RWgQGVG/Vector.jpg'}
            className='w-24 h-24 rounded-3xl border-4 border-white object-cover shadow-md'
            loading='lazy'
          />
          <div>
            {' '}
            <h1 className='text-2xl font-bold text-neutral-900'>{data.name}</h1>
            <p className='text-sm text-neutral-500'>s/ {data.slug}</p>
          </div>
        </div>

        <div className='w-full'>
          <p className='text-neutral-700 leading-relaxed'>
            {data.description || 'This substack has no description yet.'}
          </p>
        </div>


        {/* Meta */}
        <div className='flex flex-row justify-evenly w-fit px-3 py-2 rounded-xl gap-6 border border-neutral-300 text-lg text-neutral-600'>
          <div className='flex flex-col items-center '>
            <span className='font-semibold text-neutral-800'>
              {data.subscriberCount}
            </span>{' '}
            Subscribers
          </div>
          <div className='flex flex-col items-center '>
            <span className='font-semibold text-neutral-800'>
              {postCount ? postCount : '0'}
            </span>{' '}
            Posts
          </div>

          <div className='flex flex-col items-center'>
            <Link
              to={`/profile/${data.admin.username}`}
              className='font-medium text-neutral-900 hover:text-purple-500'
            >
              u/
              <span> {data.admin.username}</span>
            </Link>
            Admin{' '}
          </div>
        </div>

        {/* Actions */}
        <div className='mt-4 w-fit flex flex-row  gap-2'>
          {data.viewer.me && (
            <div className='flex flex-row gap-2 '>
              <SecondaryBtn
                onClick={() => navigate(`/substacks/${data.slug}/edit`)}
              >
                <AiOutlineEdit/>
                Edit Substack
              </SecondaryBtn>
              <DeleteSubstackBtn slug={data.slug} />
            </div>
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
