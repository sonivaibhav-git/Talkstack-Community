const PostCardSkeleton = () => {
  return (
    <div className="w-full mx-auto ">
      <div className="relative p-4 grid gap-2 bg-white rounded-4xl shadow-xl animate-pulse">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-neutral-300" />

          <div className="flex flex-col gap-2">
            <div className="w-24 h-3 bg-neutral-300 rounded" />
            <div className="w-16 h-2 bg-neutral-200 rounded" />
          </div>

          <div className="ml-auto">
            <div className="w-20 h-6 bg-neutral-200 rounded-full" />
          </div>
        </div>

        {/* Image
        <div className="w-full h-8 bg-neutral-300 rounded-3xl" /> */}

        {/* Content */}
        <div className="mt-6 px-2 flex flex-col gap-3">
          <div className="w-3/4 h-5 bg-neutral-300 rounded" />
          <div className="w-full h-3 bg-neutral-200 rounded" />
          <div className="w-5/6 h-3 bg-neutral-200 rounded" />
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-4 px-2">
          <div className="w-24 h-3 bg-neutral-200 rounded" />
        </div>

        {/* Vote Buttons */}
       

      </div>
    </div>
  )
}

export default PostCardSkeleton