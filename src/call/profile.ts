import { useMyFollowing, useMyProfile, useMyStats } from "../features/profile/profile.queries"


export const profileMeCall = ()=>{
  useMyFollowing();
  useMyProfile();
  useMyStats();
}