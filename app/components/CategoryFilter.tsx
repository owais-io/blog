import Link from 'next/link'
import { getCategoryCounts } from '../lib/blog'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory?: string
  basePath?: string
  showCounts?: boolean
  sortOrder?: string
  showSortOptions?: boolean
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  basePath = '/',
  showCounts = false,
  sortOrder = 'recency',
  showSortOptions = true
}: CategoryFilterProps) {
  const categoryCounts = showCounts ? getCategoryCounts() : {}

  const sortOptions = [
    { value: 'recency', label: 'Recent', icon: '📅', desc: 'Most recently updated' },
    { value: 'alphabetical', label: 'A-Z', icon: '🔤', desc: 'Alphabetical order' },
    { value: 'count', label: 'Popular', icon: '📊', desc: 'Most posts first' },
    { value: 'custom', label: 'Priority', icon: '⭐', desc: 'Custom priority order' }
  ]

  const currentSort = sortOptions.find(opt => opt.value === sortOrder) || sortOptions[0]

  const buildUrl = (newSort: string) => {
    const params = new URLSearchParams()
    if (newSort !== 'recency') params.set('sort', newSort)
    if (selectedCategory) params.set('category', selectedCategory)
    const query = params.toString()
    return query ? `${basePath}?${query}` : basePath
  }
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Categories</h3>
        </div>

        {/* Current sort indicator */}
        <div className="text-xs text-slate-500 dark:text-slate-400" title={currentSort.desc}>
          {currentSort.icon}
        </div>
      </div>

      {/* Sort options */}
      {showSortOptions && (
        <div className="mb-4">
          <div className="text-xs text-slate-600 dark:text-slate-300 mb-2">Sort by:</div>
          <div className="grid grid-cols-2 gap-1">
            {sortOptions.map((option) => (
              <Link
                key={option.value}
                href={buildUrl(option.value)}
                className={`px-2 py-1.5 rounded text-xs font-medium transition-all duration-200 text-center ${
                  sortOrder === option.value
                    ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300'
                    : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-500'
                }`}
                title={option.desc}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Link
          href={basePath}
          className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
            !selectedCategory
              ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>All Posts</span>
            {!selectedCategory && (
              <div className="w-2 h-2 bg-cyan-500 rounded-full" />
            )}
          </div>
        </Link>

        {categories.map((category) => (
          <Link
            key={category}
            href={`${basePath}?category=${encodeURIComponent(category)}`}
            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
              selectedCategory === category
                ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="capitalize">{category}</span>
              <div className="flex items-center gap-2">
                {showCounts && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full">
                    {categoryCounts[category] || 0}
                  </span>
                )}
                {selectedCategory === category && (
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <p className="text-slate-500 dark:text-slate-400 text-sm">No categories available</p>
        </div>
      )}
    </div>
  )
}
