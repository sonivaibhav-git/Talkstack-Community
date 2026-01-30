// components/substack/FollowSubstackBtn.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { followSubstackApi } from '../../api/substack.api'

type Props = {
  slug: string
  onSuccess?: () => void
}

const FollowSubstackBtn = ({ slug, onSuccess }: Props) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => followSubstackApi(slug),
    onSuccess: res => {
      toast.success(res.data.action)
      queryClient.invalidateQueries({
        queryKey: ['substack', slug]
      })
      onSuccess?.()
    }
  })

  return (
    <button
      disabled={isPending}
      onClick={() => mutate()}
      className='btn w-full md:w-fit'
    >
      Follow
    </button>
  )
}

export default FollowSubstackBtn
