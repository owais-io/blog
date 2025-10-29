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
    <nav className="flex flex-col items-center gap-4" aria-label="Pagination">
      {/* Mobile-First: Buttons + Page indicator */}
      <div className="flex items-center justify-center gap-2 w-full">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="btn-secondary inline-flex items-center justify-center group min-w-[90px] sm:min-w-[110px]"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4 mr-1 sm:mr-2 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Previous</span>
          </Link>
        ) : (
          <span className="btn-secondary opacity-50 cursor-not-allowed inline-flex items-center justify-center min-w-[90px] sm:min-w-[110px]">
            <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Previous</span>
          </span>
        )}

        {/* Desktop Page Numbers - Hidden on mobile, visible on tablet+ */}
        <div className="hidden sm:flex items-center gap-1 mx-2 md:mx-4">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className="relative inline-flex items-center px-2 md:px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
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
                className={`relative inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-medium scale-110'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
                }`}
                aria-label={`Page ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
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
            className="btn-secondary inline-flex items-center justify-center group min-w-[90px] sm:min-w-[110px]"
            aria-label="Next page"
          >
            <span className="text-sm sm:text-base">Next</span>
            <svg className="w-4 h-4 ml-1 sm:ml-2 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <span className="btn-secondary opacity-50 cursor-not-allowed inline-flex items-center justify-center min-w-[90px] sm:min-w-[110px]">
            <span className="text-sm sm:text-base">Next</span>
            <svg className="w-4 h-4 ml-1 sm:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>
    </nav>
  )
}