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
            ? 'bg-cyan-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-500'
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
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
