'use client'

import { useState } from 'react'
// Simple chevron SVG components
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

const ChevronUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
)

interface CategoryFilterButtonsProps {
  categories: string[]
  selectedCategories: string[]
  onCategoryToggle: (category: string) => void
}

export default function CategoryFilterButtons({ 
  categories, 
  selectedCategories, 
  onCategoryToggle 
}: CategoryFilterButtonsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCategoryClick = (category: string) => {
    onCategoryToggle(category)
  }

  const selectedCount = selectedCategories.length

  return (
    <div className="mb-6">
      {/* Mobile Collapsible Header */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-2"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Categories
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedCount > 0 ? `${selectedCount} selected` : 'None selected'}
            </p>
          </div>
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filter by Categories
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {selectedCount > 0 ? `${selectedCount} selected` : 'Select categories to filter'}
        </p>
      </div>

      {/* Category Buttons */}
      <div className={`${
        !isExpanded ? 'hidden md:block' : 'block'
      } transition-all duration-200 ease-in-out`}>
        <div className="flex flex-wrap gap-2 p-4 md:p-0 bg-white md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent rounded-lg md:rounded-none border md:border-0 border-gray-200 dark:border-gray-700">
          {categories.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No categories available
            </p>
          ) : (
            categories.map((category) => {
              const isSelected = selectedCategories.includes(category)
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              )
            })
          )}
        </div>
        
        {selectedCount > 0 && (
          <div className="mt-3 p-4 md:p-0">
            <button
              onClick={() => selectedCategories.forEach(cat => onCategoryToggle(cat))}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Clear all categories
            </button>
          </div>
        )}
      </div>
    </div>
  )
}