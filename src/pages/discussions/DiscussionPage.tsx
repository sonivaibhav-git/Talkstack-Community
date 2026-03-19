import { useParams, Link } from 'react-router-dom'
import { useDiscussion } from '../../features/discussions/discussion.queries'
import AnswerInput from '../../components/cards/AnswerInput'
import AnswerCard from '../../components/cards/AnswerCard'
import Loader from '../../components/skeletons/Loader'
import type { Answer } from '../../features/answers/answer.types'

const DiscussionPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useDiscussion(id!)

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    )

  if (error || !data) return <div className="p-6">Discussion not found</div>

  return (
    <div className="w-full min-h-full bg-[#ececec] flex">
      <div className="w-full bg-[#f4f4f4] shadow-[0_40px_80px_rgba(0,0,0,0.15)] p-4 md:p-6">

        <div className="flex flex-col md:flex-row h-full relative gap-6 mb-10">

          {/* LEFT PANEL */}
          <div className="rounded-4xl flex-1 bg-[#efefef] order-2 md:order-1 p-6 md:p-10 relative shadow-inner">

            {/* TITLE */}
            <div className="flex flex-row">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-neutral-900 mb-4 text-wrap">
                {data.title}
              </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-5">

              {/* MAIN CONTENT */}
              <div className="flex flex-col w-full">

                {/* META (optional if you add author later) */}
                {data.author && (
                  <div className="flex items-center gap-3 text-sm text-neutral-600 mb-6">
                    <img
                      src={
                        data.author.avatar ||
                        'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'
                      }
                      className="w-8 h-8 rounded-full object-cover"
                    />

                    <Link
                      to={`/profile/${data.author.username}`}
                      className="hover:underline"
                    >
                      u/{data.author.username}
                    </Link>

                    <span>•</span>
                    <span>{data.timeAgo}</span>
                  </div>
                )}

                {/* DESCRIPTION */}
                <div className="text-neutral-700 leading-relaxed mb-6">
                  {data.description}
                </div>

                {/* ANSWER INPUT */}
                <div className="mt-6">
                  <AnswerInput discussionId={data.id} />
                </div>

                {/* ANSWERS */}
                <div className="mt-10 space-y-4">
                  {data.answers.map((ans: Answer) => (
                    <AnswerCard
                      key={ans.id}
                      answer={ans}
                      discussionId={data.id}
                    />
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscussionPage