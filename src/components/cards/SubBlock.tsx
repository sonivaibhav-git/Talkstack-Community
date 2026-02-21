
import { Link } from 'react-router-dom'
import type { SubstackProfile } from '../../features/substacks/substack.types'


export default function SubBlock({ substack }: { substack: SubstackProfile }) {
  if (!substack || !substack.admin) {
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded border text-neutral-500">
        Substack data unavailable
      </div>
    )
  }

  return (
    <Link
      to={`/substack/${substack.slug}`}
      className=" w-full h-full flex flex-col justify-between gap-3 p-2 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
    >
      <div className="relative flex items-start gap-2">
        <img
          src={substack.logoUrl || 'https://i.ibb.co/RWgQGVG/Vector.jpg'}
          className="w-10 h-10 rounded-xl object-cover sticky top-2 left-2 shadow-xl"
          alt={substack.name}
          loading='lazy'
        />
         <div className='flex flex-col items-start'>
          <h3 className="font-semibold text-wrap text-lg ">{substack.name}</h3>
          <p className="text-xs text-neutral-500 ">
            {substack.slug}
          </p>
          <p className="text-xs text-neutral-500 text-wrap wrap">
            u/{substack.admin.username}
          </p>
        </div>
      </div>
     
      
      <span className="text-xs  text-neutral-500">
        {substack.subscriberCount} subscribers
      </span>
      <button className='btn'> Join</button>
    </Link>
  )
}
