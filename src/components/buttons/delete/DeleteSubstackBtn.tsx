import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteSubstack } from '../../../features/substacks/substack.queries'
import DestructiveBtn from '../DestructiveBtn'
import Modal from '../../lists/Modal'
import PrimaryBtn from '../PrimaryBtn'

const DeleteSubstackBtn = ({ slug }: { slug: string }) => {
  const navigate = useNavigate()
  const { mutate, isPending } = useDeleteSubstack()

  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    mutate(slug, {
      onSuccess: () => {
        setOpen(false)
        navigate('/')
      }
    })
  }

  return (
    <>
      <DestructiveBtn onClick={() => setOpen(true)}>Delete</DestructiveBtn>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='bg-white rounded-2xl p-6 w-100 space-y-6 shadow-xl'>
          <div>
            <h2 className='text-lg font-semibold text-red-500'>
              Delete Substack
            </h2>
            <p className='text-sm text-neutral-600 mt-2'>
              This action cannot be undone. All posts inside this substack will
              be permanently removed.
            </p>
          </div>

          <div className='flex justify-end gap-3'>
            <PrimaryBtn onClick={() => setOpen(false)}>Cancel</PrimaryBtn>

            <DestructiveBtn onClick={handleDelete} disabled={isPending}>
              {isPending ? 'Deleting...' : 'Confirm Delete'}
            </DestructiveBtn>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DeleteSubstackBtn
