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
}

export default function TagsPageClient({
  posts,
  totalPages,
  totalPosts,
  currentPage,
  availableCategories,
  availableTags
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
          <div className="lg:hidden">
            <TagFilterCollapsible 
              tags={availableTags} 
              selectedTags={selectedTags}
              onTagToggle={handleTagToggle}
            />
          </div>

          {/* Posts Count and Filter Info */}
          <div className="mb-6">
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
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMM d, yyyy')}
                    </time>
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
                      {post.category && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          {post.category}
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