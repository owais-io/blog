import Link from 'next/link'
import { getPostsMeta, getAllCategories } from './lib/blog'

export default function NotFound() {
  const { posts } = getPostsMeta(1, 6)
  const categories = getAllCategories('recency').slice(0, 8)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gradient mb-4">404</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <p className="text-xl">Looks like this page got lost in the cloud</p>
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors mb-16"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>

        {/* Popular Categories */}
        {categories.length > 0 && (
          <div className="mb-16">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Browse by Category
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/?category=${encodeURIComponent(category)}`}
                  className="px-4 py-2 rounded-lg font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recent Posts */}
        {posts.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Posts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card-elevated p-6 hover:scale-[1.02] transition-transform group text-left"
                >
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  {post.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {post.readingTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
