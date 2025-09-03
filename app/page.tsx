import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { getPostsMeta, getAllTags } from './lib/blog'
import TagFilter from './components/TagFilter'
import Pagination from './components/Pagination'

interface HomePageProps {
  searchParams: {
    page?: string
    tag?: string
  }
}

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Owais.io - A personal blog sharing insights on technology, development, and life.',
}

export default function HomePage({ searchParams }: HomePageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10)
  const selectedTag = searchParams.tag
  
  const { posts, totalPages, totalPosts } = getPostsMeta(currentPage, 10, selectedTag)
  const allTags = getAllTags()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Sidebar - Tags */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <TagFilter tags={allTags} selectedTag={selectedTag} />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 mt-8 lg:mt-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Welcome to my blog
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Sharing thoughts on technology, development, and life.
            </p>
          </div>

          {/* Posts Count and Filter Info */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {selectedTag ? (
                <>
                  Showing {totalPosts} post{totalPosts !== 1 ? 's' : ''} tagged with{' '}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {selectedTag}
                  </span>
                </>
              ) : (
                <>Showing {totalPosts} post{totalPosts !== 1 ? 's' : ''}</>
              )}
            </p>
          </div>

          {/* Blog Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                {selectedTag ? 'No posts found for this tag.' : 'No posts available yet.'}
              </p>
              {selectedTag && (
                <Link
                  href="/"
                  className="mt-4 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  ← View all posts
                </Link>
              )}
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
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/?tag=${encodeURIComponent(tag)}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          {tag}
                        </Link>
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
                tag={selectedTag}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}