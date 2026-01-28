'use client'

import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import CategoryFilterButtons from './CategoryFilterButtons'
import TagFilterCollapsible from './TagFilterCollapsible'
import LazyPostsGrid from './LazyPostsGrid'
import { BlogPostMeta } from '../lib/blog'

interface TagsPageClientProps {
  allPosts: BlogPostMeta[]
  tagCounts: Record<string, number>
  categoryCounts: Record<string, number>
}

export default function TagsPageClient({
  allPosts,
  tagCounts,
  categoryCounts
}: TagsPageClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Client-side filtering
  const filteredPosts = useMemo(() => {
    let filtered = allPosts

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.some(tag =>
          post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
        )
      )
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(post =>
        selectedCategories.some(category =>
          post.categories.some(postCategory =>
            postCategory.toLowerCase() === category.toLowerCase()
          )
        )
      )
    }

    return filtered
  }, [allPosts, selectedTags, selectedCategories])

  // Get available categories based on selected tags
  const availableCategories = useMemo(() => {
    if (selectedTags.length === 0) {
      return Array.from(new Set(allPosts.flatMap(post => post.categories))).sort()
    }

    const categories = new Set<string>()
    allPosts.forEach(post => {
      const hasSelectedTag = selectedTags.some(tag =>
        post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
      )
      if (hasSelectedTag) {
        post.categories.forEach(cat => categories.add(cat))
      }
    })
    return Array.from(categories).sort()
  }, [allPosts, selectedTags])

  // Get available tags based on selected categories
  const availableTags = useMemo(() => {
    if (selectedCategories.length === 0) {
      return Array.from(new Set(allPosts.flatMap(post => post.tags))).sort()
    }

    const tags = new Set<string>()
    allPosts.forEach(post => {
      const hasSelectedCategory = selectedCategories.some(category =>
        post.categories.some(postCategory =>
          postCategory.toLowerCase() === category.toLowerCase()
        )
      )
      if (hasSelectedCategory) {
        post.tags.forEach(tag => tags.add(tag))
      }
    })
    return Array.from(tags).sort()
  }, [allPosts, selectedCategories])

  const handleCategoryToggle = useCallback((category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }, [])

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar - Desktop Only */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24">
            <TagFilterCollapsible
              tags={availableTags}
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
              tagCounts={tagCounts}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">
              Browse by Tags
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Explore articles organized by categories and tags.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <CategoryFilterButtons
            categories={availableCategories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
          />

          {/* Mobile Tag Filter */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => {
                const section = document.getElementById('mobile-tag-filter')
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                }
              }}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-500 transition-colors"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-medium">Filter by Tags</span>
                {selectedTags.length > 0 && (
                  <span className="bg-cyan-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                    {selectedTags.length}
                  </span>
                )}
              </span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div id="mobile-tag-filter" className="mt-2">
              <TagFilterCollapsible
                tags={availableTags}
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
                tagCounts={tagCounts}
              />
            </div>
          </div>

          {/* Enhanced Active Filters Bar */}
          {(selectedTags.length > 0 || selectedCategories.length > 0) && (
            <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-200">
                  Active Filters ({selectedTags.length + selectedCategories.length})
                </h3>
                <button
                  onClick={() => {
                    setSelectedTags([])
                    setSelectedCategories([])
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-900/50 text-green-300 border border-green-700"
                  >
                    <span className="text-xs">📁</span>
                    {category}
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      className="ml-1 hover:text-green-200 font-bold"
                      aria-label={`Remove ${category} filter`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-cyan-900/50 text-cyan-300 border border-cyan-700"
                  >
                    <span className="text-xs">#</span>
                    {tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-1 hover:text-cyan-200 font-bold"
                      aria-label={`Remove ${tag} filter`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Results Counter */}
          <div className="flex items-center justify-between mb-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                {filteredPosts.length === 0 ? 'No posts found' :
                 filteredPosts.length === 1 ? '1 post found' :
                 `${filteredPosts.length} posts found`}
              </h2>
              {(selectedTags.length > 0 || selectedCategories.length > 0) && (
                <p className="text-sm text-slate-400 mt-1">
                  Matching your {selectedTags.length + selectedCategories.length} filter
                  {selectedTags.length + selectedCategories.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            {(selectedTags.length > 0 || selectedCategories.length > 0) && (
              <button
                onClick={() => {
                  setSelectedTags([])
                  setSelectedCategories([])
                }}
                className="text-cyan-400 hover:text-cyan-300 font-medium text-sm"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Blog Posts with Lazy Loading */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                No posts found with the selected filters.
              </p>
              <button
                onClick={() => {
                  setSelectedTags([])
                  setSelectedCategories([])
                }}
                className="mt-4 inline-flex items-center text-cyan-400 hover:text-cyan-300"
              >
                ← Clear all filters
              </button>
            </div>
          ) : (
            <LazyPostsGrid
              posts={filteredPosts}
              showTitle={false}
              initialCount={20}
              loadMoreCount={20}
              loadType="button"
            />
          )}
        </div>
      </div>
    </div>
  )
}
