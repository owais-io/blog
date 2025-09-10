import Link from 'next/link'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory?: string
  basePath?: string
}

export default function CategoryFilter({ categories, selectedCategory, basePath = '/' }: CategoryFilterProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center mb-6">
        <svg className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
      </div>
      
      <div className="space-y-2">
        <Link
          href={basePath}
          className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
            !selectedCategory
              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>All Posts</span>
            {!selectedCategory && (
              <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full" />
            )}
          </div>
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category}
            href={`${basePath}?category=${encodeURIComponent(category)}`}
            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
              selectedCategory === category
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="capitalize">{category}</span>
              {selectedCategory === category && (
                <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full" />
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {categories.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No categories available</p>
        </div>
      )}
    </div>
  )
}