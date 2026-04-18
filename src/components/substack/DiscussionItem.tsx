import { Link } from 'react-router-dom'
import { useDiscussionSlug } from '../../features/discussions/discussion.queries'
import Loader from '../skeletons/Loader'

type Props = {
  slug: string
}

export default function DiscussionItem({ slug }: Props) {
  const { data, isLoading, isError } = useDiscussionSlug(slug)

  if (!slug) return null

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10">
        <Loader />
      </div>
    )
  }

  if (isError || !data) return null

  const discussions = Array.isArray(data) ? data : [data]

  if (!discussions.length) return null

  // 📊 Progress calculation
  // const completed = discussions.filter(d => d.answers?.length > 0).length
  // const progress = Math.round((completed / discussions.length) * 100)

  return (
    <div className="flex flex-col items-center gap-6">

      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl">

        <div className="flex flex-col gap-3">

          {discussions.map((d: any, index: number) => {
            const isAnswered = d.answers?.length > 0

            return (
              <Link
                key={d.id}
                to={`/discussion/${d.id}`}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300
                ${isAnswered 
                  ? 'bg-[#2a2a2d] hover:bg-[#323236]' 
                  : 'bg-[#222225] hover:bg-[#2c2c30]'
                }`}
              >
                {/* Icon */}
                <div className={`w-10 h-10 flex items-center justify-center rounded-full
                  ${isAnswered ? 'bg-purple-500/20' : 'bg-neutral-700'}
                `}>
                  {isAnswered ? (
                    <span className="text-purple-400">✓</span>
                  ) : (
                    <span className="text-gray-400">{index + 1}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1">
                  <h2 className="text-sm font-semibold text-white">
                    {d.title}
                  </h2>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {d.content}
                  </p>

                  {/* Meta */}
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>u/{d.authorUsername}</span>
                    <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Answers */}
                  <div className="mt-2 text-xs">
                    <span className="text-gray-400">
                      Answers:
                    </span>
                    <span className="text-white ml-1">
                      {d.answers?.length || 0}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

    
    </div>
  )
}