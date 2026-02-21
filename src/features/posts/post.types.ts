export type PostAuthor = {
  id: string
  username: string
  avatar?: string
}

export type CreatePostPayload = {
  title: string
  content: string
  substackSlug: string
  publishNow: boolean
  image?: File
}

export type CreatePostResponse = {
  success: boolean
  message: string
  data: Post
}

export type UnifiedPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  externalLink: string | null;
  slug?: string;
  substackSlug?: string;
  author: PostAuthor;
  authorDto?: PostAuthor;
  voteScore: number;
  upvotes?: number;
  downvotes?: number;
  createdAt: string;
  timeAgo: string;
  credibilityResponseDto?: {
    consensus: string;
    trustQuality: string;
    dissent: boolean;
  };
};

export type Post = UnifiedPost;
export type SubstackPost = UnifiedPost;
export type PostFromFeed = UnifiedPost;
export type MyPost = UnifiedPost;

export type FeedMode = 'feed' | 'random';