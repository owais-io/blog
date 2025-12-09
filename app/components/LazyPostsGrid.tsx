'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'

interface Post {
  slug: string
  title: string
  description?: string
  readingTime: string
  categories: string[]
  date: string
}

interface LazyPostsGridProps {
  posts: Post[]
  selectedCategory?: string
  showTitle?: boolean
  initialCount?: number
  loadMoreCount?: number
  loadType?: 'infinite' | 'button'
  filterByCategory?: string | null
}

export default function LazyPostsGrid({
  posts,
  selectedCategory,
  showTitle = true,
  initialCount = 20,  // Show 20 posts initially
  loadMoreCount = 20,  // Load 20 more at a time
  loadType = 'button',  // Default to button (easier for users)
  filterByCategory = null
}: LazyPostsGridProps) {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([])
  const [loadedCount, setLoadedCount] = useState(initialCount)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Filter posts by category if specified
  const filteredPosts = filterByCategory
    ? posts.filter(post => post.categories.includes(filterByCategory))
    : posts

  useEffect(() => {
    // Reset loaded count when filter changes
    setLoadedCount(initialCount)
  }, [filterByCategory, initialCount])

  useEffect(() => {
    // Load initial posts (filtered)
    setVisiblePosts(filteredPosts.slice(0, loadedCount))
  }, [filteredPosts, loadedCount])

  useEffect(() => {
    // Setup intersection observer for infinite scroll only
    if (loadType !== 'infinite') return

    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadedCount < filteredPosts.length) {
          setLoadedCount((prev) => Math.min(prev + loadMoreCount, filteredPosts.length))
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [loadedCount, filteredPosts.length, loadType, loadMoreCount])

  const handleLoadMore = () => {
    setLoadedCount((prev) => Math.min(prev + loadMoreCount, filteredPosts.length))
  }

  return (
    <section>
      {showTitle && (
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">
          {selectedCategory ? `Posts in "${selectedCategory}"` : 'More Posts'}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post, index) => (
          <article
            key={post.slug}
            className={`card-elevated overflow-hidden hover:scale-[1.02] transition-transform group`}
          >
            <Link href={`/blog/${post.slug}`} className="block p-6">
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                </div>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>

              {post.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5">
                {post.categories.slice(0, 2).map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Load More Section */}
      {loadedCount < filteredPosts.length && (
        <div className="mt-12">
          {loadType === 'button' ? (
            // Button Mode
            <div className="text-center space-y-4">
              <button
                onClick={handleLoadMore}
                className="btn-primary px-8 py-3 text-base font-medium shadow-md hover:shadow-lg transition-shadow"
              >
                Load More Posts
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {loadedCount} of {filteredPosts.length} posts
                {filterByCategory && ` in "${filterByCategory}"`}
                <span className="mx-2">•</span>
                {filteredPosts.length - loadedCount} remaining
              </p>
            </div>
          ) : (
            // Infinite Scroll Mode
            <div ref={loadMoreRef} className="h-20 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-2"></div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Loading more...</p>
            </div>
          )}
        </div>
      )}

      {/* All Loaded Message */}
      {loadedCount >= filteredPosts.length && filteredPosts.length > initialCount && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            All {filteredPosts.length} posts{filterByCategory && ` in "${filterByCategory}"`} loaded
          </div>
        </div>
      )}

      {/* No Posts in Category */}
      {filteredPosts.length === 0 && filterByCategory && (
        <div className="mt-12 text-center py-12">
          <div className="mx-auto w-24 h-24 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No posts in "{filterByCategory}"
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try selecting a different category
          </p>
        </div>
      )}
    </section>
  )
}
