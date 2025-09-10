import Link from 'next/link'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory?: string
  basePath?: string
}

export default function CategoryFilter({ categories, selectedCategory, basePath = '/' }: CategoryFilterProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter by Category</h3>
      
      <div className="space-y-2">
        <Link
          href={basePath}
          className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          All Posts
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category}
            href={`${basePath}?category=${encodeURIComponent(category)}`}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
      
      {categories.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">No categories available</p>
      )}
    </div>
  )
}