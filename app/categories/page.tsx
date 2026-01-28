import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { getPostsMeta, getAllCategories } from '../lib/blog'
import CategoryFilter from '../components/CategoryFilter'
import Pagination from '../components/Pagination'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse posts by categories - Find articles organized by topic areas.',
}

export default function CategoriesPage() {
  // Show all posts - no pagination
  const { posts, totalPosts } = getPostsMeta(1, 1000)
  const allCategories = getAllCategories()

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar - Categories */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CategoryFilter categories={allCategories} selectedCategory={undefined} basePath="/categories" />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 mt-8 lg:mt-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">
              Browse by Categories
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Explore all {totalPosts} articles organized by categories and topic areas.
            </p>
          </div>

          {/* Blog Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">
                No posts available yet.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-slate-700 rounded-lg border border-slate-600 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMM d, yyyy')}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="text-xl font-semibold text-slate-100 mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {post.description && (
                    <p className="text-slate-300 mb-4 leading-relaxed">
                      {post.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {/* Categories */}
                      {post.categories.map((category) => (
                        <Link
                          key={category}
                          href={`/categories?category=${encodeURIComponent(category)}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 hover:bg-green-800/50 transition-colors"
                        >
                          📁 {category}
                        </Link>
                      ))}

                      {/* Tags */}
                      {post.tags.slice(0, 3).map((tag) => (
                        <Link
                          key={tag}
                          href={`/tags?tag=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-900/50 text-cyan-300 hover:bg-cyan-800/50 transition-colors"
                        >
                          #{tag}
                        </Link>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-sm text-slate-400">
                          +{post.tags.length - 3} tags
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-cyan-400 hover:text-cyan-300 font-medium text-sm"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
