import Link from 'next/link'
import { format } from 'date-fns'
import { BlogPostMeta } from '../lib/blog'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Related Posts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          You might also enjoy reading these articles
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <article
            key={post.slug}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
          >
            {/* Post Meta */}
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMM d, yyyy')}
              </time>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>

            {/* Post Title */}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {post.title}
              </Link>
            </h3>

            {/* Post Description */}
            {post.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                {post.description}
              </p>
            )}

            {/* Tags and Read More */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 2 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 px-1">
                    +{post.tags.length - 2}
                  </span>
                )}
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                Read
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Show fourth post in full width if available */}
      {posts.length > 3 && (
        <article className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <time dateTime={posts[3].date}>
                  {format(new Date(posts[3].date), 'MMM d, yyyy')}
                </time>
                <span>•</span>
                <span>{posts[3].readingTime}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                <Link
                  href={`/blog/${posts[3].slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {posts[3].title}
                </Link>
              </h3>

              {posts[3].description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                  {posts[3].description}
                </p>
              )}

              <div className="flex flex-wrap gap-1">
                {posts[3].tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
                {posts[3].tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 px-1">
                    +{posts[3].tags.length - 3}
                  </span>
                )}
              </div>
            </div>

            <Link
              href={`/blog/${posts[3].slug}`}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors md:flex-shrink-0"
            >
              Read Article
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </article>
      )}
    </section>
  )
}