import { useParams, Link } from 'react-router-dom'
import { useDiscussion } from '../../features/discussions/discussion.queries'
import AnswerInput from '../../components/cards/AnswerInput'
import AnswerCard from '../../components/cards/AnswerCard'
import type { Answer } from '../../features/answers/answer.types'
import { useAuthContext } from '../../context/AuthContext'

const DiscussionPage = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useDiscussion(id!)
  const { user } = useAuthContext();
  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <DiscussionSkeleton />
      </div>
    )

  if (error || !data) return <div className="p-6">Discussion not found</div>

  return (
    <div className="w-full min-h-screen bg-[#ececec] p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* LEFT: DISCUSSION */}
        <div className="flex-1 bg-[#f4f4f4] rounded-3xl shadow-lg p-6 md:p-8">
          
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {data.title}
          </h1>

          {data.author && (
            <div className="flex items-center gap-3 text-sm text-neutral-600 mb-6">
              <img
                src={
                  data.author.avatar ||
                  'https://i.ibb.co/F4qtygsQ/profile-Pic.jpg'
                }
                className="w-8 h-8 rounded-full object-cover"
              />
              <Link to={`/profile/${data.author.username}`}>
                u/{data.author.username}
              </Link>
            </div>
          )}

          <p className="text-neutral-700 mb-6 leading-relaxed">
            {data.description}
          </p>

          <AnswerInput discussionId={data.id} />
        </div>

        {/* RIGHT: ANSWERS PANEL */}
        <div className="w-full lg:w-105 bg-white rounded-3xl shadow-lg p-5 flex flex-col max-h-[80vh]">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-neutral-800">
              Answers ({data.answers.length})
            </h2>
          </div>

          {/* Scrollable answers */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1">
            {data.answers.map((ans: Answer) => (
              <AnswerCard
                key={ans.id}
                answer={ans}
                discussionId={data.id}
                author={data.author.username}
                me={user?.username!}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
const DiscussionSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-[#ececec] p-4 md:p-6 animate-pulse">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* LEFT */}
        <div className="flex-1 bg-[#f4f4f4] rounded-3xl p-6 md:p-8 space-y-4">
          <div className="h-8 w-3/4 bg-neutral-300 rounded-lg" />
          <div className="h-4 w-1/3 bg-neutral-300 rounded" />
          <div className="h-20 w-full bg-neutral-300 rounded" />
          <div className="h-24 w-full bg-neutral-300 rounded-xl" />
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-105 bg-white rounded-3xl p-5 space-y-4">
          <div className="h-6 w-1/2 bg-neutral-300 rounded" />

          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full bg-neutral-200 rounded" />
              <div className="h-4 w-5/6 bg-neutral-200 rounded" />
              <div className="h-8 w-24 bg-neutral-200 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DiscussionPage