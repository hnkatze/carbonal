export function PlayerCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200 mb-3" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2" />
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
      <div className="h-5 bg-gray-200 rounded-full w-16 mx-auto" />
    </div>
  )
}

export function TeamSectionSkeleton() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto">
        <div className="h-9 bg-gray-200 rounded w-48 mx-auto mb-12 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <PlayerCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
