
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { unfollowUserApi } from '../../api/user.api'
import { publicProfileKeys } from '../../features/profile/publicProfile.queries'

type Props = {
  username: string
  onSuccess?: () => void
}

const UnfollowButton = ({ username, onSuccess }: Props) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => unfollowUserApi(username),
    onSuccess: res => {
      alert(res.data.action)
      queryClient.invalidateQueries({
        queryKey: publicProfileKeys.byUsername(username)
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

export default UnfollowButton
