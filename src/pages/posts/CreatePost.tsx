import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreatePost } from '../../features/posts/post.queries'
import RichTextEditor from '../../components/posts/RichTextEditor'

const CreatePost = () => {
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useCreatePost()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [substackSlug, setSubstackSlug] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!title || !content || !substackSlug) {
      setError('Required fields missing')
      return
    }

    try {
      const res = await mutateAsync({
        title,
        content, // HTML from editor
        substackSlug,
        publishNow: true
      })

      navigate(`/posts/${res.data.id}`)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create post')
    }
  }

  return (
    <div className='max-w-5xl w-full h-fit mx-auto p-6 bg-neutral-100 text-neutral-700'>
      <h1 className='text-2xl font-semibold mb-6'>Create post</h1>

      <form onSubmit={handleSubmit} className='space-y-4'>
        {error && <p className='text-purple-500 text-sm'>{error}</p>}
        <input
          value={substackSlug}
          onChange={e => setSubstackSlug(e.target.value)}
          placeholder='Community / slug'
          className='w-fit rounded-full border px-4 py-2 '
        />

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Title *'
          className='w-full rounded-lg border px-4 py-2 '
        />

        <RichTextEditor value={content} s onChange={setContent} />

        <button disabled={isPending} className='btn'>
          {isPending ? 'Publishing…' : 'Post'}
        </button>
      </form>
    </div>
  )
}

export default CreatePost
