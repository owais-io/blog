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
  tagCounts?: Record<string, number>
}

export default function TagFilterCollapsible({
  tags,
  selectedTags,
  onTagToggle,
  tagCounts = {}
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
          className="w-full flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600 mb-2"
        >
          <div>
            <h3 className="text-lg font-semibold text-slate-100">
              Tags
            </h3>
            <p className="text-sm text-slate-400">
              {selectedCount > 0 ? `${selectedCount} selected` : 'None selected'}
            </p>
          </div>
          {isExpanded ? (
            <ChevronUpIcon className="h-5 w-5 text-slate-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-slate-400" />
          )}
        </button>
      </div>

      {/* Desktop/Mobile Content */}
      <div className={`${
        !isExpanded ? 'hidden md:block' : 'block'
      } transition-all duration-200 ease-in-out`}>
        {/* Desktop version - sidebar style */}
        <div className="hidden md:block bg-slate-700 rounded-lg border border-slate-600 p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Filter by Tag</h3>

          <div className="space-y-2">
            <button
              onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCount === 0
                  ? 'bg-cyan-900 text-cyan-300'
                  : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-500'
              }`}
            >
              All Posts
            </button>

            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              const count = tagCounts[tag] || 0
              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-900 text-cyan-300'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-500'
                  }`}
                >
                  <span>{tag}</span>
                  {count > 0 && (
                    <span className="ml-2 text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {tags.length === 0 && (
            <p className="text-slate-400 text-sm">No tags available</p>
          )}
        </div>

        {/* Mobile version - button style */}
        <div className="md:hidden p-4 bg-slate-700 rounded-lg border border-slate-600">
          <div className="flex flex-wrap gap-2">
            {tags.length === 0 ? (
              <p className="text-slate-400 text-sm">
                No tags available
              </p>
            ) : (
              tags.map((tag) => {
                const isSelected = selectedTags.includes(tag)
                const count = tagCounts[tag] || 0
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-500'
                    }`}
                  >
                    <span>{tag}</span>
                    {count > 0 && (
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-600'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                )
              })
            )}
          </div>

          {selectedCount > 0 && (
            <div className="mt-3">
              <button
                onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
                className="text-sm text-cyan-400 hover:text-cyan-300 font-medium"
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
