import { useMutation, useQueryClient } from '@tanstack/react-query'
import { followUserApi } from '../../api/user.api'
import { publicProfileKeys } from '../../features/profile/publicProfile.queries'

type Props = {
  username: string
  onSuccess?: () => void
}

const FollowButton = ({ username, onSuccess }: Props) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: () => followUserApi(username),
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
      Follow
    </button>
  )
}

export default FollowButton
