import { useEffect, useState, useCallback, useMemo } from 'react'
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
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [substackSlug, setSubstackSlug] = useState('')
  const [publishNow, setPublishNow] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  const handleImageChange = useCallback((file: File | null) => {
    if (imagePreview) URL.revokeObjectURL(imagePreview)

    setImage(file)
    setImagePreview(file ? URL.createObjectURL(file) : null)
  }, [imagePreview])

  const validate = useCallback(() => {
    if (!title || !substackSlug)
      return 'Title and community are required'

    if (!content) return 'Content is required'

    if (mode === 'image' && !image)
      return 'Image is required'

    if (mode === 'link' && !externalLink)
      return 'External link is required'

    return null
  }, [title, substackSlug, content, mode, image, externalLink])

  const payload = useMemo<CreatePostPayload>(() => ({
    title,
    substackSlug,
    publishNow,
    content,
    externalLink: mode === 'link' ? externalLink : undefined,
    image: mode === 'image' ? image ?? undefined : undefined
  }), [title, substackSlug, publishNow, content, mode, externalLink, image])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const err = validate()
    if (err) {
      setError(err)
      return
    }

    try {
      const res = await mutateAsync(payload)
      navigate(`/posts/${res.data.id}`)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create post')
    }
  }, [validate, mutateAsync, payload, navigate])

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col mt-8 md:mt-0">

      {/* Top Bar */}
      <header className="h-14 border-b bg-white flex items-center justify-between px-6">
        <h1 className="font-semibold text-lg">Create Post</h1>

        <div className="flex items-center gap-4">
       <label className="flex items-center justify-between gap-2 w-full max-w-xs cursor-pointer">
          <span className="text-sm font-medium text-neutral-700">
            Publish
          </span>

          <div className="relative">
            <input
              type="checkbox"
              checked={publishNow}
              onChange={e => setPublishNow(e.target.checked)}
              className="sr-only peer"
            />

            <div className="w-11 h-6 bg-neutral-300 rounded-full peer-checked:bg-purple-600 transition-colors"></div>

            <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
          </div>
</label>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="btn"
          >
            {isPending ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      {/*  Main */}
      <div className="max-w-6xl mx-auto w-full px-4 py-6 space-y-6">

        {error && (
          <div className="text-sm text-red-500 bg-red-50 border px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 bg-neutral-200 p-1 rounded-lg w-full">
          {(['text', 'image', 'link'] as Mode[]).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setMode(t)}
              className={`px-4 py-1.5 text-sm rounded-md ${
                mode === t
                  ? 'bg-white shadow text-purple-600'
                  : 'text-neutral-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Title */}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-2xl font-semibold bg-transparent outline-none"
        />

        {/* Community */}
        <input
          value={substackSlug}
          onChange={e => setSubstackSlug(e.target.value)}
          placeholder="Community"
          className="px-3 py-1 bg-neutral-200 rounded-full text-sm w-fit"
        />

        {/* ✅ ALWAYS AVAILABLE CONTENT */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write your post..."
          className="w-full min-h-45 bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
        />

        {/* LINK */}
        {mode === 'link' && (
          <input
            value={externalLink}
            onChange={e => setExternalLink(e.target.value)}
            placeholder="https://example.com"
            className="w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500"
          />
        )}

        {/* IMAGE */}
        {mode === 'image' && (
          <label className="relative w-full h-72 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-purple-500">
            <input
              type="file"
              className="hidden"
              onChange={e => handleImageChange(e.target.files?.[0] || null)}
            />

            {imagePreview ? (
              <img
                src={imagePreview}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <span className="text-neutral-500 text-sm">
                Upload image
              </span>
            )}
          </label>
        )}
      </div>
    </div>
  )
}

export default CreatePost