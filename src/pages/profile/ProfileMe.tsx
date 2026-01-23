import { refreshApi } from "../../api/auth.api"
import { useMyPosts, useMyProfile, useMyStats } from "../../features/profile/profile.queries"

const ProfileMe = () => {
  refreshApi()
  const profile = useMyProfile()
  const stats = useMyStats()
  // const posts = useMyPosts()

  if (profile.isLoading || stats.isLoading
    //  || posts.isLoading
    )
    return <div>Loading...</div>

  if (profile.isError ||
     stats.isError 
    //  || posts.isError
    )
    return <div>Something went wrong</div>

  return (
    <div className="flex flex-col w-full gap-4 ">
      <h1>My Profile</h1>

      <img src={profile.data!.avatarUrl} width={80} />
      <p>Username: {profile.data!.username}</p>
      <p>Bio: {profile.data!.bio}</p>

      <h2>Stats</h2>
      <p>Followers: {stats.data!.followers}</p>
      <p>Following Users: {stats.data!.followingUsers}</p>
      <p>Following Substacks: {stats.data!.followingSubstacks}</p>
      <p>Posts: {stats.data!.posts}</p>
      <p>Trust: {stats.data!.impact.trust}</p>
      <p>Talkscore: {stats.data!.impact.talkscore}</p>

      {/* <h2>My Posts</h2>
      {posts.data!.map(post => (
        <div key={post.id} >
          <p>{post.title}</p>
          <p>{post.substackSlug}</p>
          <p>Votes: {post.voteScore}</p>
          <p>{post.createdAt}</p>
        </div>
      ))} */}
    </div>
  )
}

export default ProfileMe
