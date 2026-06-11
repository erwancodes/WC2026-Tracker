/** Skeleton reproduisant la structure d'une MatchCard pendant le premier fetch. */
export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-surface">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="skeleton h-6 w-24 rounded-full" />
        <div className="skeleton h-3 w-28 rounded" />
      </div>
      <div className="mx-3 h-36 rounded-lg skeleton" />
      <div className="px-4 py-3">
        <div className="skeleton h-3 w-40 rounded" />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 border-b border-edge px-4 py-3">
      <div className="skeleton size-6 rounded-sm" />
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton mx-auto h-3 w-12 rounded" />
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton size-6 rounded-sm" />
    </div>
  )
}
