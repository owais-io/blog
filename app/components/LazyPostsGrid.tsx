'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  description?: string
  readingTime: string
  categories: string[]
}

interface LazyPostsGridProps {
  posts: Post[]
  selectedCategory?: string
  showTitle?: boolean
}

export default function LazyPostsGrid({ posts, selectedCategory, showTitle = true }: LazyPostsGridProps) {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([])
  const [loadedCount, setLoadedCount] = useState(4) // Load 4 initially (2 rows of 2)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load initial posts
    setVisiblePosts(posts.slice(0, loadedCount))
  }, [posts, loadedCount])

  useEffect(() => {
    // Setup intersection observer for lazy loading
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadedCount < posts.length) {
          setLoadedCount((prev) => Math.min(prev + 4, posts.length))
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
  }, [loadedCount, posts.length])

  return (
    <section>
      {showTitle && (
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">
          {selectedCategory ? `Posts in "${selectedCategory}"` : 'More Posts'}
        </h2>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visiblePosts.map((post, index) => (
          <article
            key={post.slug}
            className={`card-elevated overflow-hidden hover:scale-[1.02] transition-transform group stagger-fade-in stagger-${Math.min(index % 6 + 1, 6)}`}
          >
            <Link href={`/blog/${post.slug}`} className="block p-6">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {post.readingTime}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>

              {post.description && (
                <p className="text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
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

      {/* Intersection observer target */}
      {loadedCount < posts.length && (
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </section>
  )
}
