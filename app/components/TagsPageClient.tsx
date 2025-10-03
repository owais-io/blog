'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import CategoryFilterButtons from './CategoryFilterButtons'
import TagFilterCollapsible from './TagFilterCollapsible'
import Pagination from './Pagination'
import { BlogPostMeta } from '../lib/blog'

interface TagsPageClientProps {
  posts: BlogPostMeta[]
  totalPages: number
  totalPosts: number
  currentPage: number
  availableCategories: string[]
  availableTags: string[]
  tagCounts: Record<string, number>
  categoryCounts: Record<string, number>
}

export default function TagsPageClient({
  posts,
  totalPages,
  totalPosts,
  currentPage,
  availableCategories,
  availableTags,
  tagCounts,
  categoryCounts
}: TagsPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const selectedTags = useMemo(() => {
    const tagsParam = searchParams.get('tags')
    return tagsParam ? tagsParam.split(',').filter(Boolean) : []
  }, [searchParams])
  
  const selectedCategories = useMemo(() => {
    const categoriesParam = searchParams.get('categories')
    return categoriesParam ? categoriesParam.split(',').filter(Boolean) : []
  }, [searchParams])

  const updateURL = useCallback((newTags: string[], newCategories: string[], page = 1) => {
    const params = new URLSearchParams()
    
    if (newTags.length > 0) {
      params.set('tags', newTags.join(','))
    }
    
    if (newCategories.length > 0) {
      params.set('categories', newCategories.join(','))
    }
    
    if (page > 1) {
      params.set('page', page.toString())
    }
    
    const url = params.toString() ? `/tags?${params.toString()}` : '/tags'
    router.push(url)
  }, [router])

  const handleCategoryToggle = useCallback((category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    
    updateURL(selectedTags, newCategories)
  }, [selectedCategories, selectedTags, updateURL])

  const handleTagToggle = useCallback((tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    
    updateURL(newTags, selectedCategories)
  }, [selectedTags, selectedCategories, updateURL])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Browse by Tags
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
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
              className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="font-medium">Filter by Tags</span>
                {selectedTags.length > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
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
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Active Filters ({selectedTags.length + selectedCategories.length})
                </h3>
                <button
                  onClick={() => updateURL([], [])}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center gap-1"
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-300 dark:border-green-700"
                  >
                    <span className="text-xs">📁</span>
                    {category}
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      className="ml-1 hover:text-green-900 dark:hover:text-green-100 font-bold"
                      aria-label={`Remove ${category} filter`}
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-700"
                  >
                    <span className="text-xs">#</span>
                    {tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-1 hover:text-blue-900 dark:hover:text-blue-100 font-bold"
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
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {totalPosts === 0 ? 'No posts found' :
                 totalPosts === 1 ? '1 post found' :
                 `${totalPosts} posts found`}
              </h2>
              {(selectedTags.length > 0 || selectedCategories.length > 0) && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Matching your {selectedTags.length + selectedCategories.length} filter
                  {selectedTags.length + selectedCategories.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Old Posts Count Info (kept for context) */}
          <div className="mb-6 hidden">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Showing {totalPosts} post{totalPosts !== 1 ? 's' : ''}</span>
              
              {selectedCategories.length > 0 && (
                <>
                  <span>•</span>
                  <span>Categories:</span>
                  {selectedCategories.map((category) => (
                    <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      {category}
                    </span>
                  ))}
                </>
              )}
              
              {selectedTags.length > 0 && (
                <>
                  <span>•</span>
                  <span>Tags:</span>
                  {selectedTags.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {tag}
                    </span>
                  ))}
                </>
              )}
              
              {(selectedCategories.length > 0 || selectedTags.length > 0) && (
                <>
                  <span>•</span>
                  <button
                    onClick={() => updateURL([], [])}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    Clear all filters
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Blog Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No posts found with the selected filters.
              </p>
              <button
                onClick={() => updateURL([], [])}
                className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                ← Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {/* <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMM d, yyyy')}
                    </time> */}
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  
                  {post.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.categories && post.categories.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {post.categories[0]}
                        </span>
                      )}
                      {post.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/tags"
                preserveParams={{
                  ...(selectedTags.length > 0 && { tags: selectedTags.join(',') }),
                  ...(selectedCategories.length > 0 && { categories: selectedCategories.join(',') })
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}