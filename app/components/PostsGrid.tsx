import Link from 'next/link'

interface Post {
  slug: string
  title: string
  description?: string
  readingTime: string
  categories: string[]
}

interface PostsGridProps {
  posts: Post[]
  selectedCategory?: string
  showTitle?: boolean
}

export default function PostsGrid({ posts, selectedCategory, showTitle = true }: PostsGridProps) {
  return (
    <section>
      {showTitle && (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-10 tracking-tight">
          {selectedCategory ? `Posts in "${selectedCategory}"` : 'More Posts'}
        </h2>
      )}

      {/* Mobile-First Grid: 1 column on mobile, 2 on tablet and desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {posts.map((post, index) => (
          <article
            key={post.slug}
            className={`card-elevated overflow-hidden hover:scale-[1.02] transition-transform group stagger-fade-in stagger-${Math.min(index % 6 + 1, 6)}`}
          >
            <Link href={`/blog/${post.slug}`} className="block p-4 sm:p-6">
              {/* Reading Time */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{post.readingTime}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>

              {/* Description */}
              {post.description && (
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              )}

              {/* Categories */}
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
  )
}
