import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditSubstack } from '../../features/substacks/substack.queries'

export default function EditSubstackProfile () {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()

  if (!slug) throw new Error('Substack slug missing')

  const { mutateAsync, isPending } = useEditSubstack(slug)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [bannerUrl, setBannerUrl] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name || !description) {
      setError('Name and description are required')
      return
    }

    try {
      await mutateAsync({
        name,
        description,
        logoUrl: logoUrl || undefined,
        bannerUrl: bannerUrl || undefined
      })
      navigate(`/substacks/${slug}`)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Update failed')
    }
  }

  return (
    <div className='max-w-7xl h-full mx-auto p-6'>
      <h1 className='text-2xl font-semibold mb-6'>Edit Substack Profile</h1>

      <form onSubmit={submit} className='space-y-5'>
        {error && (
          <div className='border border-red-500 bg-red-50 text-red-700 px-4 py-2 rounded'>
            {error}
          </div>
        )}

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-neutral-700'>
            Substack Name
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Substack name'
            className='w-full border rounded-md px-3 py-2'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-neutral-700'>
            Description
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Description....'
            className='w-full border rounded-md px-3 py-2 h-28 resize-none'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-neutral-700'>
            Logo URL
          </label>
          <input
            value={logoUrl}
            onChange={e => setLogoUrl(e.target.value)}
            placeholder='Logo URL'
            className='w-full border rounded-md px-3 py-2'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-neutral-700'>
            Banner URL
          </label>
          <input
            value={bannerUrl}
            onChange={e => setBannerUrl(e.target.value)}
            placeholder='Banner URL'
            className='w-full border rounded-md px-3 py-2'
          />
        </div>

        <button disabled={isPending} className='btn w-fit'>
          {isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
