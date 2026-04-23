const SkeletonCard = () => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#222225] animate-pulse">
      
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-neutral-700" />

      {/* Content */}
      <div className="flex flex-col flex-1 gap-2">

        {/* Title */}
        <div className="h-3 w-3/4 bg-neutral-700 rounded" />

        {/* Content lines */}
        <div className="h-2 w-full bg-neutral-700 rounded" />
        <div className="h-2 w-5/6 bg-neutral-700 rounded" />

        {/* Meta */}
        <div className="flex justify-between mt-2">
          <div className="h-2 w-20 bg-neutral-700 rounded" />
          <div className="h-2 w-16 bg-neutral-700 rounded" />
        </div>

        {/* Answers */}
        <div className="h-2 w-24 bg-neutral-700 rounded mt-2" />
      </div>
    </div>
  )
}

export default function DiscussionItemSkeleton() {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-2xl">
      <div className="flex flex-col gap-3">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}