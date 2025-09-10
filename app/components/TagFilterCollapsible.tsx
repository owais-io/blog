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

interface TagFilterCollapsibleProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export default function TagFilterCollapsible({ 
  tags, 
  selectedTags, 
  onTagToggle 
}: TagFilterCollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleTagClick = (tag: string) => {
    onTagToggle(tag)
  }

  const selectedCount = selectedTags.length

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
              Tags
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

      {/* Desktop/Mobile Content */}
      <div className={`${
        !isExpanded ? 'hidden md:block' : 'block'
      } transition-all duration-200 ease-in-out`}>
        {/* Desktop version - sidebar style */}
        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter by Tag</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCount === 0
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All Posts
            </button>
            
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
          
          {tags.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No tags available</p>
          )}
        </div>

        {/* Mobile version - button style */}
        <div className="md:hidden p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {tags.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No tags available
              </p>
            ) : (
              tags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                )
              })
            )}
          </div>
          
          {selectedCount > 0 && (
            <div className="mt-3">
              <button
                onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Clear all tags
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}