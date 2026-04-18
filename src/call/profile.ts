import { useMyFollowing, useMyProfile, useMyStats } from "../features/profile/profile.queries"


export const profileMeCall = ()=>{
  const following =useMyFollowing();
  const profile = useMyProfile();
  const stats  =useMyStats();
}