import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { getPostsMeta, getAllCategories, type CategorySortOrder } from './lib/blog'
import LazyPostsGrid from './components/LazyPostsGrid'
import CategoryPills from './components/CategoryPills'

interface HomePageProps {
  searchParams: {
    page?: string
    category?: string
    sort?: string
  }
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Owais.io - A personal blog sharing insights on technology, development, and life.',
}

export default function HomePage({ searchParams }: HomePageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10)
  const selectedCategory = searchParams.category

  // Get sort order from URL parameter, fallback to 'recency'
  const sortParam = searchParams.sort
  const categorySortOrder: CategorySortOrder =
    (sortParam && ['alphabetical', 'recency', 'count', 'custom'].includes(sortParam))
      ? sortParam as CategorySortOrder
      : 'recency'

  const { posts, totalPages, totalPosts } = getPostsMeta(1, 1000, undefined, selectedCategory)
  const allCategories = getAllCategories(categorySortOrder)

  // Get category counts
  const categoryCounts = new Map<string, number>()
  const allPosts = getPostsMeta(1, 1000).posts
  allPosts.forEach(post => {
    post.categories.forEach(category => {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)
    })
  })

  // Split posts: first 2 are featured, rest are regular
  const featuredPosts = posts.slice(0, 2)
  const remainingPosts = posts.slice(2)

  return (
    <div className="min-h-screen">
      {/* Hero Section - Only show when no category is selected */}
      {!selectedCategory && (
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
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 ${selectedCategory ? 'pt-16' : ''}`}>
        {/* Featured Posts - Only show when no category is selected */}
        {!selectedCategory && featuredPosts.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">Latest Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="card-elevated overflow-hidden hover:scale-[1.02] transition-transform group"
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
          </section>
        )}

        {/* Categories Section */}
        {allCategories.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">Browse by Category</h2>
            <CategoryPills categories={allCategories} selectedCategory={selectedCategory} />
          </section>
        )}

        {/* Posts Grid with Lazy Loading */}
        {/* Show remainingPosts when no category selected, all posts when category selected */}
        {(selectedCategory ? posts : remainingPosts).length > 0 && (
          <LazyPostsGrid
            posts={selectedCategory ? posts : remainingPosts}
            selectedCategory={selectedCategory}
            showTitle={selectedCategory ? true : false}
          />
        )}

        {/* Empty State */}
        {posts.length === 0 && (
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
        )}
      </div>
    </div>
  )
}