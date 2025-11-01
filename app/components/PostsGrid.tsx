import Link from 'next/link'
import { format } from 'date-fns'
import SponsorAd from './SponsorAd'

interface Post {
  slug: string
  title: string
  description?: string
  date: string
  readingTime: string
  categories: string[]
}

interface PostsGridProps {
  posts: Post[]
  selectedCategory?: string
  showTitle?: boolean
}

export default function PostsGrid({ posts, selectedCategory, showTitle = true }: PostsGridProps) {
  // Insert sponsor ad after every 6 posts (after 3rd row on desktop 2-column grid)
  const postsWithAds: Array<Post | 'ad'> = []
  posts.forEach((post, index) => {
    postsWithAds.push(post)
    // Add ad after every 6 posts (3 rows on desktop grid)
    if ((index + 1) % 6 === 0 && index < posts.length - 1) {
      postsWithAds.push('ad')
    }
  })

  return (
    <section>
      {showTitle && (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-10 tracking-tight">
          {selectedCategory ? `Posts in "${selectedCategory}"` : 'More Posts'}
        </h2>
      )}

      {/* Mobile-First Grid: 1 column on mobile, 2 on tablet and desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {postsWithAds.map((item, index) => {
          // Sponsor Ad
          if (item === 'ad') {
            return (
              <div key={`ad-${index}`} className="sm:col-span-2">
                <SponsorAd />
              </div>
            )
          }

          // Regular Post
          const post = item

          return (
            <article
              key={post.slug}
              className={`card-elevated overflow-hidden hover:scale-[1.02] transition-transform group stagger-fade-in stagger-${Math.min(index % 6 + 1, 6)}`}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Date and Reading Time */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
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
                </div>
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
