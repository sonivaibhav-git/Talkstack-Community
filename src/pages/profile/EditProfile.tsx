import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { useUpdateMyProfile } from '../../features/profile/profile.queries'

const EditProfile = () => {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState('')
  const navigate = useNavigate()

  const onDrop = useCallback((files: File[]) => {
    const file = files[0]
    if (!file) return

    setAvatarFile(file)
    const previewUrl = URL.createObjectURL(file)
    setAvatarPreview(previewUrl)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop
  })

  const { mutate, isPending } = useUpdateMyProfile()

  const submit = () => {
    mutate(
      { displayName, bio, avatarFile },
      {
        onSuccess: () => {
          navigate(-1)
        }
      }
    )
  }

  return (
    <div className='m-2 bg-white p-5 rounded-xl  shadow'>
      <h1 className='text-xl font-semibold mb-4'>Edit Profile</h1>

      {/* Avatar */}
      <div
        {...getRootProps()}
        className={`w-fit p-2 border-2 border-dashed rounded-lg  text-center cursor-pointer ${
          isDragActive ? 'border-black' : 'border-neutral-300'
        }`}
      >
        <input {...getInputProps()}  />
        {avatarPreview ? (
          <img
            src={avatarPreview}
            className='w-48 h-48 mx-auto object-center'
            loading='lazy'
          />
        ) : (
          <p className='text-sm  text-neutral-500 min-h-40'>
            Drag & drop avatar here, <br/> or click to upload
          </p>
        )}
      </div>

      {/* Display Name */}
      <div className='mt-4'>
        <label className='text-sm font-medium'>Display Name</label>
        <input
          className='mt-1 w-full border rounded-lg px-3 py-2'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
        />
      </div>

      {/* Bio */}
      <div className='mt-4'>
        <label className='text-sm font-medium'>Bio</label>
        <textarea
          className='mt-1 w-full border rounded-lg px-3 py-2'
          rows={4}
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
      </div>

      {/* Submit */}
      <button onClick={submit} disabled={isPending} className='mt-6 w-full btn'>
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

export default EditProfile
