export const DiscussionSkeleton = () => (
  <div className="bg-white rounded-2xl p-4 animate-pulse space-y-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="h-4 bg-neutral-300 rounded" />
    ))}
  </div>
)