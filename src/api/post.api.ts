import type {
  CreatePostPayload,
  CreatePostResponse,
  Post,
  SubstackPost,
  UnifiedPost,
  VoteResponse
} from '../features/posts/post.types'
import { axiosPrivate } from '../lib/axios/axiosPrivate'

export const getPostById = async (postId: string): Promise<Post | null> => {
  try {
    const res = await axiosPrivate.get(`/posts/${postId}`)
    return res.data
  } catch {
    return null
  }
}

export const getSubstackPostsApi = async (slug: string) => {
  const res = await axiosPrivate.get<SubstackPost[]>(
    `/substacks/${slug}/posts`
  )
  return res.data
}

export const createPostApi = async (
  payload: CreatePostPayload
): Promise<CreatePostResponse> => {
  const formData = new FormData()

  formData.append('title', payload.title)
  formData.append('content', payload.content)
  formData.append('substackSlug', payload.substackSlug)
  formData.append('publishNow', String(payload.publishNow))

  if (payload.image) {
    formData.append('image', payload.image)
  }

  const res = await axiosPrivate.post(
    '/posts',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return res.data
}


export const getPersonalFeed = async (params: {
  cursor?: string;
  limit?: number;
}): Promise<UnifiedPost[]> => {
  const res = await axiosPrivate.get<UnifiedPost[]>('/users/me/feed', { params });
  return res.data;
};

export const getRandomPosts = async (params: {
  cursor?: string;
  limit?: number;
}): Promise<UnifiedPost[]> => {
  const res = await axiosPrivate.get<UnifiedPost[]>('/users/me/randompost', { params });
  return res.data;
};

// Votes
export const votePost = async ({
  id,
  type
}: {
  id: string
  type: 'up' | 'down'
}) => {
  const endpoint = type === 'up'
    ? `/posts/${id}/upvote`
    : `/posts/${id}/downvote`

  const { data } = await axiosPrivate.post<VoteResponse>(endpoint)
  return data
}