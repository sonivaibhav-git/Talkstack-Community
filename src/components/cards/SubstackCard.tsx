
import { Link } from 'react-router-dom'
import type { SubstackProfile } from '../../features/substacks/substack.types'


export default function SubstackCard({ substack }: { substack: SubstackProfile }) {
  if (!substack || !substack.admin) {
    return (
      <div className="flex flex-col gap-3 p-4 bg-white rounded-2xl border text-neutral-500">
        Substack data unavailable
      </div>
    )
  }

  return (
    <Link
      to={`/substack/${substack.slug}`}
      className="w-64 h-full flex flex-col gap-3 p-4 bg-white rounded-2xl  hover:shadow-md transition"
    >
      <div className="flex items-center gap-2">
        <img
          src={substack.logoUrl || 'https://i.ibb.co/ZR95Wbxg/Talkstack-Logo.png'}
          className="w-12 h-12 rounded-xl object-cover"
          alt={substack.name}
          loading='lazy'
        />
        <div>
          <h3 className="font-semibold">{substack.name}</h3>
          <p className="text-xs text-neutral-500">
            u/{substack.admin.username}
          </p>
        </div>
      </div>

      <span className="text-xs text-neutral-500">
        {substack.subscriberCount} subscribers
      </span>
    </Link>
  )
}
