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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
          Related Articles
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Continue exploring with these handpicked articles that complement what you just read
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full mx-auto mt-6" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post, index) => (
          <article
            key={post.slug}
            className="card-elevated p-6 group hover:scale-105"
          >
            {/* Post Meta */}
            <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
              <div className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMM d, yyyy')}
                </time>
              </div>
              <span className="w-1 h-1 bg-current rounded-full" />
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {post.readingTime}
              </span>
            </div>

            {/* Post Title */}
            <h3 className="text-xl font-semibold text-slate-100 mb-3 leading-tight group-hover:text-cyan-400 transition-colors">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h3>

            {/* Post Description */}
            {post.description && (
              <p className="text-slate-300 mb-6 leading-relaxed line-clamp-3">
                {post.description}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="tag-primary text-xs"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full">
                  +{post.tags.length - 2} more
                </span>
              )}
            </div>

            {/* Read More */}
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center font-medium text-cyan-400 hover:text-cyan-300 group"
            >
              Read article
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </article>
        ))}
      </div>

      {/* Featured Fourth Post */}
      {posts.length > 3 && (
        <div className="mt-12 pt-12 border-t border-slate-600">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              More Reading
            </h3>
            <p className="text-slate-300">
              One more article you might find interesting
            </p>
          </div>

          <article className="card-elevated p-8 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                  <time dateTime={posts[3].date} className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {format(new Date(posts[3].date), 'MMM d, yyyy')}
                  </time>
                  <span className="w-1 h-1 bg-current rounded-full" />
                  <span className="inline-flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {posts[3].readingTime}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-slate-100 mb-4 leading-tight">
                  <Link
                    href={`/blog/${posts[3].slug}`}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    {posts[3].title}
                  </Link>
                </h3>

                {posts[3].description && (
                  <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                    {posts[3].description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {posts[3].tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="tag-primary">
                      #{tag}
                    </span>
                  ))}
                  {posts[3].tags.length > 4 && (
                    <span className="text-sm text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
                      +{posts[3].tags.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:flex-shrink-0 flex lg:flex-col justify-center">
                <Link
                  href={`/blog/${posts[3].slug}`}
                  className="btn-primary text-center group"
                >
                  Read Full Article
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* Back to Blog */}
      <div className="text-center mt-12">
        <Link href="/" className="btn-secondary">
          ← Back to All Posts
        </Link>
      </div>
    </section>
  )
}
