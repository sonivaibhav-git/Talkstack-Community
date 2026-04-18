import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import type { Post } from '../../features/posts/post.types'

type Props = {
  posts: Post[]
}

export default function TopPostsGraph ({ posts }: Props) {
  const getConsensusWeight = (consensus?: string) => {
    if (consensus === 'HIGH') return 50
    if (consensus === 'MIXED') return 30
    return 10
  }

  const getScore = (post: Post) => {
    const votes = post.voteScore ?? 0
    const consensusScore = getConsensusWeight(
      post.credibilityResponseDto?.consensus
    )
    const dissentBoost = post.credibilityResponseDto?.dissent ? 100 : 0

    return votes + consensusScore + dissentBoost
  }

  const sortedPosts = [...posts].sort((a, b) => {
    return getScore(b) - getScore(a)
  })

  const topPosts = sortedPosts.slice(0, 5).map((post, index) => ({
    name: post.title || `Post ${index + 1}`,
    value: getScore(post) // 🔥 FIX: use computed score
  }))

  return (
    <div className='w-full h-64 bg-linear-to-b from-[#0f172a] to-[#1e293b] rounded-3xl p-4 text-white'>
      <div className='mb-2'>
        <h2 className='text-sm text-neutral-400'>Top Posts</h2>
        <h1 className='text-xl font-bold'>Performance</h1>
      </div>

      <ResponsiveContainer width='100%' height='75%'>
        <LineChart data={topPosts}>
          <CartesianGrid strokeDasharray='3 3' opacity={0.1} />

          <XAxis dataKey='name' tick={{ fontSize: 10, fill: '#9ca3af' }} />

          <Tooltip
            contentStyle={{
              backgroundColor: '#111827',
              border: 'none',
              borderRadius: '10px'
            }}
          />

          <Line
            type='monotone'
            dataKey='value'
            stroke='#22c55e'
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
