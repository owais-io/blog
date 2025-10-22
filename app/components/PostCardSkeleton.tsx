export default function PostCardSkeleton() {
  return (
    <div className="card-elevated p-6 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      </div>

      <div className="flex gap-2">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  )
}
