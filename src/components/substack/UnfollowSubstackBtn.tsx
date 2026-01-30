// components/substack/UnfollowSubstackBtn.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { unfollowSubstackApi } from '../../api/substack.api'

type Props = {
  slug: string
  onSuccess?: () => void
}

const UnfollowSubstackBtn = ({ slug, onSuccess }: Props) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => unfollowSubstackApi(slug),
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
      Unfollow
    </button>
  )
}

export default UnfollowSubstackBtn
