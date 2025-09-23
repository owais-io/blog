import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { getPostsMeta, getAllCategories } from './lib/blog'
import CategoryFilter from './components/CategoryFilter'
import Pagination from './components/Pagination'

interface HomePageProps {
  searchParams: {
    page?: string
    category?: string
  }
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Owais.io - A personal blog sharing insights on technology, development, and life.',
}

export default function HomePage({ searchParams }: HomePageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10)
  const selectedCategory = searchParams.category
  
  const { posts, totalPages, totalPosts } = getPostsMeta(currentPage, 10, undefined, selectedCategory)
  const allCategories = getAllCategories()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to my{' '}
              <span className="text-gradient">blog</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Sharing daily tutorials on AI, Cloud, Operating Systems, and related technologies.
              <br />
              <span className="text-lg text-gray-500 dark:text-gray-400">
                Exploring the intersection of AI with infrastructure automation and intelligent systems.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {totalPosts} articles published
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full" />
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
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CategoryFilter categories={allCategories} selectedCategory={selectedCategory} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Posts Count and Filter Info */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedCategory ? `Posts in "${selectedCategory}"` : 'Latest Posts'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedCategory ? (
                    <>
                      {totalPosts} post{totalPosts !== 1 ? 's' : ''} found
                    </>
                  ) : (
                    <>Discover insights across {totalPosts} articles</>
                  )}
                </p>
              </div>
              {selectedCategory && (
                <Link
                  href="/"
                  className="btn-secondary"
                >
                  View all posts
                </Link>
              )}
            </div>

            {/* Blog Posts */}
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedCategory ? 'No posts in this category' : 'No posts available yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedCategory 
                    ? 'Try browsing other categories or view all posts.' 
                    : 'New content is coming soon. Check back later!'
                  }
                </p>
                {selectedCategory && (
                  <Link href="/" className="btn-primary">
                    Browse All Posts
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <article 
                    key={post.slug} 
                    className="card-elevated p-8 hover:scale-[1.02] group"
                  >
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {/* <time 
                        dateTime={post.date}
                        className="inline-flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {format(new Date(post.date), 'MMM d, yyyy')}
                      </time> */}
                      <span className="w-1 h-1 bg-current rounded-full" />
                      <span className="inline-flex items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {post.readingTime}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    {post.description && (
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                        {post.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {/* Categories */}
                        {post.categories.slice(0, 2).map((category) => (
                          <Link
                            key={category}
                            href={`/?category=${encodeURIComponent(category)}`}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                          >
                            📁 {category}
                          </Link>
                        ))}
                        {post.categories.length > 2 && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            +{post.categories.length - 2} categories
                          </span>
                        )}

                        {/* Tags */}
                        {post.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            href={`/tags?tag=${encodeURIComponent(tag)}`}
                            className="tag-primary"
                          >
                            #{tag}
                          </Link>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            +{post.tags.length - 3} tags
                          </span>
                        )}
                      </div>
                      
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium group"
                      >
                        Read article
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  category={selectedCategory}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}