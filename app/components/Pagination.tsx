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
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="btn-secondary inline-flex items-center group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Link>
        ) : (
          <span className="btn-secondary opacity-50 cursor-not-allowed inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </span>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1 mx-4">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  •••
                </span>
              )
            }

            const pageNumber = page as number
            const isActive = pageNumber === currentPage

            return (
              <Link
                key={pageNumber}
                href={createPageUrl(pageNumber)}
                className={`relative inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-medium scale-110'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
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
            className="btn-secondary inline-flex items-center group"
          >
            Next
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <span className="btn-secondary opacity-50 cursor-not-allowed inline-flex items-center">
            Next
            <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
      
      {/* Page Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Page <span className="font-medium text-primary-600 dark:text-primary-400">{currentPage}</span> of{' '}
          <span className="font-medium text-primary-600 dark:text-primary-400">{totalPages}</span>
        </p>
      </div>
    </nav>
  )
}