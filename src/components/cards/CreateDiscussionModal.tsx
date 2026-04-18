import { useState } from 'react'

import { useCreateDiscussion } from '../../features/discussions/discussion.queries'
import type { CreateDiscussionPayload } from '../../features/discussions/discussion.types'
import Modal from '../lists/Modal'
import PrimaryBtn from '../buttons/PrimaryBtn'
import SecondaryBtn from '../buttons/SecondaryBtn'

interface Props {
  open: boolean
  onClose: () => void
  substackSlug: string
}

const CreateDiscussionModal = ({ open, onClose, substackSlug }: Props) => {
  const { mutate, isPending } = useCreateDiscussion()

  const [form, setForm] = useState({
    title: '',
    description: '',
    externalLink: ''
  })

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    if (!form.title || !form.description) return

    const payload: CreateDiscussionPayload = {
      title: form.title,
      description: form.description,
      substackSlug,
      externalLink: form.externalLink || undefined
    }

    mutate(payload, {
      onSuccess: () => {
        
        onClose()
        setForm({ title: '', description: '', externalLink: '' })
      }
    })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-neutral-200 p-6 rounded-2xl w-90 md:w-fit space-y-5">

        <h2 className="text-neutral-700 font-semibold text-2xl text-center">
         Ask a Question
        </h2>

        <input
          value={form.title}
          onChange={e => handleChange('title', e.target.value)}
          placeholder="Title"
          className="w-full p-2 bg-neutral-300 text-neutral-800 rounded"
        />

        <textarea
          value={form.description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Description"
          className="w-full p-2 text-neutral-800 bg-neutral-300 rounded"
        />

        <input
          value={form.externalLink}
          onChange={e => handleChange('externalLink', e.target.value)}
          placeholder="External link (optional)"
          className="w-full p-2 text-neutral-800 bg-neutral-300 rounded"
        />

        <div className="flex justify-end gap-3">
          <SecondaryBtn onClick={onClose}>Cancel</SecondaryBtn>

          <PrimaryBtn onClick={handleSubmit} disabled={isPending}>
            {isPending ? 'Posting...' : 'Post'}
          </PrimaryBtn>
        </div>

      </div>
    </Modal>
  )
}

export default CreateDiscussionModal