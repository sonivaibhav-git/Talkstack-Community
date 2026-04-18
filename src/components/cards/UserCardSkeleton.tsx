const UserCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-row gap-2 items-center text-start animate-pulse">
      
      {/* Avatar */}
      <div className="w-16 h-16 rounded-xl bg-neutral-300" />

      {/* Content */}
      <div className="flex flex-col gap-2 w-full">
        
        {/* Name */}
        <div className="w-3/4 h-4 bg-neutral-300 rounded" />

        {/* Username */}
        <div className="w-1/2 h-3 bg-neutral-200 rounded" />

        {/* Bio */}
        <div className="w-full h-3 bg-neutral-200 rounded" />
        <div className="w-5/6 h-3 bg-neutral-200 rounded" />
      </div>

    </div>
  )
}

export default UserCardSkeleton