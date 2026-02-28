import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useUpdateMyProfile } from '../../features/profile/profile.queries'
import Modal from '../../components/lists/Modal'
import DestructiveBtn from '../../components/buttons/DestructiveBtn'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const EditProfileModal = ({ isOpen, onClose }: Props) => {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState('')

  const { mutate, isPending } = useUpdateMyProfile()

  const onDrop = useCallback((files: File[]) => {
    const file = files[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop
  })

  const submit = () => {
    mutate(
      { displayName, bio, avatarFile },
      {
        onSuccess: () => {
          onClose()
        }
      }
    )
  }

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className='relative bg-white p-6 w-104 max-w-lg rounded-2xl '>
        <h1 className='text-xl font-bold mb-4'>Edit Profile</h1>
        <div className="absolute top-5 right-5 "> <DestructiveBtn onClick={() => onClose()} disabled={isPending}>
            X
          </DestructiveBtn></div>
    
        <div
          {...getRootProps()}
          className={`w-fit flex justify-center items-center p-2 border-2 border-dashed rounded-lg text-center cursor-pointer ${
            isDragActive ? 'border-black' : 'border-neutral-300'
          }`}
        >
          <input {...getInputProps()} />
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className='w-50 h-50 mx-auto object-cover'
            />
          ) : (
            <p className='text-sm items-center text-neutral-500 min-h-40'>
              Drag & drop avatar here,
              <br />
              or click to upload
            </p>
          )}
        </div>

        <div className='mt-4'>
          <label className='text-sm font-medium'>Display Name
          <input
            className='mt-1 w-full border rounded-lg px-3 py-2'
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          </label>
        </div>

        <div className='mt-4'>
          <label className='text-sm font-medium'>Bio
          <textarea
            className='mt-1 w-full border rounded-lg px-3 py-2'
            rows={4}
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          </label>
        </div>
        <div className='flex flex-row gap-2 items-end h-fit '>
         
          <button
            onClick={submit}
            disabled={isPending}
            className='mt-6 w-full btn'
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default EditProfileModal
