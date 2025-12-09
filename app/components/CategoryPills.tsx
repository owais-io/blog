'use client'

interface CategoryPillsProps {
  categories: string[]
  selectedCategory?: string
  onCategoryChange?: (category: string | null) => void
}

export default function CategoryPills({
  categories,
  selectedCategory,
  onCategoryChange
}: CategoryPillsProps) {
  const handleCategoryClick = (category: string | null) => {
    if (onCategoryChange) {
      onCategoryChange(category)
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          !selectedCategory
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        All Posts
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
