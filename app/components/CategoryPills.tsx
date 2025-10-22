'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import PostCardSkeleton from './PostCardSkeleton'

interface CategoryPillsProps {
  categories: string[]
  selectedCategory?: string
}

export default function CategoryPills({ categories, selectedCategory }: CategoryPillsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [clickedCategory, setClickedCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string | null) => {
    setClickedCategory(category)
    startTransition(() => {
      if (category === null) {
        router.push('/')
      } else {
        router.push(`/?category=${encodeURIComponent(category)}`)
      }
    })
  }

  const isLoading = (category: string | null) => {
    return isPending && clickedCategory === category
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleCategoryClick(null)}
        disabled={isPending}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          !selectedCategory
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading(null) ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            All Posts
          </span>
        ) : (
          'All Posts'
        )}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          disabled={isPending}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading(category) ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {category}
            </span>
          ) : (
            category
          )}
        </button>
      ))}
    </div>
  )
}
