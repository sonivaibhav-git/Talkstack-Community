import { useState } from 'react'
import { useCreateSubstack } from '../../features/substacks/substack.queries'
import PrimaryBtn from '../../components/buttons/PrimaryBtn'
import Modal from '../../components/lists/Modal'
import DestructiveBtn from '../../components/buttons/DestructiveBtn'

const CreateSubstackModal = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const { mutate, isPending } = useCreateSubstack()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState<File | null>(null)
  const [banner, setBanner] = useState<File | null>(null)

  const handleSubmit = () => {
    if (!name || !description) return

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    if (logo) formData.append('logoUrl', logo)
    if (banner) formData.append('bannerUrl', banner)

    mutate(formData, {
      onSuccess: () => {
        onClose()
        setName('')
        setDescription('')
        setLogo(null)
        setBanner(null)
      }
    })
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="bg-white p-6 rounded-2xl w-125 space-y-6 ">

        <h2 className="text-2xl text-center font-bold text-neutral-900">
          Create Substack
        </h2>

        <div className="space-y-4">
          <div>
            <label>Substack Name <span className='text-red-500'>*</span></label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl outline border border-neutral-300"
          />
          </div>
          
          <div> <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-neutral-300 "
          />
          </div>
          
          <div className='flex flex-col'>
            <label >Add Logo</label>
          <input
          name='logoInput'
            type="file"
            accept="image/*"
            className='px-3 py-2 border border-neutral-300 rounded-xl'
            onChange={e =>
              setLogo(e.target.files?.[0] || null)
            }
            
          /></div>
          
          <div className='flex flex-col'>
            <label>Add Banner</label>
          <input
            type="file"
            accept="image/*"
            className='px-3 py-2 border border-neutral-300 rounded-xl'
            onChange={e =>
              setBanner(e.target.files?.[0] || null)
            }
          /></div>
          

        </div>

        <div className="flex justify-end gap-3">
          <DestructiveBtn onClick={onClose}>
            Cancel
          </DestructiveBtn>

          <PrimaryBtn
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create'}
          </PrimaryBtn>
        </div>

      </div>
    </Modal>
  )
}

export default CreateSubstackModal