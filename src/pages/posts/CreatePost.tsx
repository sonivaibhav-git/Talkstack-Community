import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreatePost } from '../../features/posts/post.queries'
import type { CreatePostPayload } from '../../features/posts/post.types'

type Mode = 'text' | 'image' | 'link'

const CreatePost = () => {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useCreatePost()

  const [mode, setMode] = useState<Mode>('text')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [substackSlug, setSubstackSlug] = useState('')
  const [publishNow, setPublishNow] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title || !substackSlug) {
      setError('Title and community are required')
      return
    }

    if (mode === 'text' && !content) {
      setError('Text content is required')
      return
    }

    if (mode === 'image' && !image) {
      setError('Image is required')
      return
    }

    if (mode === 'link' && !externalLink) {
      setError('External link is required')
      return
    }

    const payload: CreatePostPayload = {
      title,
      substackSlug,
      publishNow,
      content:
        mode === 'text'
          ? content
          : mode === 'link'
          ? externalLink
          : '',
      image: mode === 'image' ? image ?? undefined : undefined
    }

    try {
      const res = await mutateAsync(payload)
      navigate(`/posts/${res.data.id}`)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create post')
    }
  }

  return (
    <div className='max-w-6xl h-full mx-auto p-6 bg-neutral-300 text-neutral-800 flex-1'>
      <h1 className='text-2xl font-semibold mb-4'>Create post</h1>

      <hr className='w-full h-px mb-4 bg-neutral-400' />

      <div className='flex gap-4 mb-6'>
        {(['text', 'image', 'link'] as Mode[]).map(t => (
          <button
            key={t}
            type='button'
            onClick={() => setMode(t)}
            className={`px-4 py-1 border-b-2 transition ${
              mode === t
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-neutral-600 hover:border-purple-400'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        {error && <p className='text-purple-600 text-sm'>{error}</p>}

        <input
          value={substackSlug}
          onChange={e => setSubstackSlug(e.target.value)}
          placeholder='Community / slug'
          className='w-fit rounded-full border px-4 py-2 bg-transparent'
        />

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Title *'
          className='w-full rounded-lg border px-4 py-2 bg-transparent'
        />

        {mode === 'text' && (
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder='Write your post...'
            className='w-full h-40 rounded-lg border px-4 py-2 bg-transparent resize-none'
          />
        )}

        {mode === 'image' && (
          <input
            type='file'
            accept='image/*'
            onChange={e => setImage(e.target.files?.[0] || null)}
            className='w-full border border-dashed border-neutral-700 p-4'
          />
        )}

        {mode === 'link' && (
          <input
            value={externalLink}
            onChange={e => setExternalLink(e.target.value)}
            placeholder='https://example.com'
            className='w-full rounded-lg border px-4 py-2 bg-transparent'
          />
        )}

        <div className='flex items-center gap-3'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={publishNow}
              onChange={e => setPublishNow(e.target.checked)}
              className='h-4 w-4 accent-purple-600'
            />
            <span className='text-sm'>Publish</span>
          </label>

          {!publishNow && (
            <span className='text-xs text-neutral-600'>
              Saved as draft
            </span>
          )}
        </div>

        <button disabled={isPending} className='btn'>
          {isPending ? 'Publishing…' : 'Post'}
        </button>
      </form>
    </div>
  )
}

export default CreatePost
