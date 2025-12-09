'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import LazyPostsGrid from './LazyPostsGrid'
import CategoryPills from './CategoryPills'

interface Post {
  slug: string
  title: string
  description?: string
  date: string
  categories: string[]
  tags: string[]
  readingTime: string
}

interface HomePageClientProps {
  featuredPosts: Post[]
  gridPosts: Post[]
  allCategories: string[]
}

export default function HomePageClient({
  featuredPosts,
  gridPosts,
  allCategories
}: HomePageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-19">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 animate-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6 fade-in-up leading-tight">
              Welcome to my{' '}
              <span className="text-gradient">blog</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed stagger-fade-in stagger-1">
              Sharing daily tutorials on AI, Cloud, Operating Systems, and related technologies.
            </p>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed stagger-fade-in stagger-2">
              Exploring the intersection of AI with infrastructure automation and intelligent systems.
            </p>
            <div className="flex items-center justify-center stagger-fade-in stagger-3">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Updated regularly
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">Latest Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="card-elevated overflow-hidden hover:scale-[1.02] transition-transform group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="p-6">
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
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        {allCategories.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">Browse by Category</h2>
            <CategoryPills
              categories={allCategories}
              selectedCategory={selectedCategory || undefined}
              onCategoryChange={setSelectedCategory}
            />
          </section>
        )}

        {/* All Posts with Lazy Loading + Category Filter */}
        {gridPosts.length > 0 && (
          <LazyPostsGrid
            posts={gridPosts}
            selectedCategory={selectedCategory || undefined}
            showTitle={!!selectedCategory}
            initialCount={20}
            loadMoreCount={20}
            loadType="button"
            filterByCategory={selectedCategory}
          />
        )}
      </div>
    </div>
  )
}
