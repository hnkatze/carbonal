export function MatchCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-gray-200 animate-pulse">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center w-2/5">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-8" />
          <div className="flex flex-col items-center w-2/5">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MatchesSectionSkeleton() {
  return (
    <div>
      <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse" />
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <MatchCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
