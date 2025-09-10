import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  tag?: string
  category?: string
  basePath?: string
  preserveParams?: Record<string, string>
}

export default function Pagination({ currentPage, totalPages, tag, category, basePath = '/', preserveParams }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()
    
    // Add page parameter only if it's not page 1
    if (page > 1) {
      params.set('page', page.toString())
    }
    
    // Legacy support for single tag/category
    if (tag) params.set('tag', tag)
    if (category) params.set('category', category)
    
    // New support for preserving multiple parameters
    if (preserveParams) {
      Object.entries(preserveParams).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })
    }
    
    const queryString = params.toString()
    return queryString ? `${basePath}?${queryString}` : basePath
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  const visiblePages = getVisiblePages()

  return (
    <nav className="flex items-center justify-center" aria-label="Pagination">
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Previous
          </Link>
        ) : (
          <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 dark:text-gray-600 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
            Previous
          </span>
        )}

        {/* Page Numbers */}
        <div className="flex items-center space-x-1 mx-4">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  ...
                </span>
              )
            }

            const pageNumber = page as number
            const isActive = pageNumber === currentPage

            return (
              <Link
                key={pageNumber}
                href={createPageUrl(pageNumber)}
                className={`relative inline-flex items-center px-3 py-2 text-sm font-medium border rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700'
                    : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {pageNumber}
              </Link>
            )
          })}
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Next
          </Link>
        ) : (
          <span className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 dark:text-gray-600 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed">
            Next
          </span>
        )}
      </div>
    </nav>
  )
}