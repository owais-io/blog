import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { SERIES_CATEGORIES, SERIES_META, SeriesCategory } from '../../lib/series'
import { getPostsByCategory } from '../../lib/blog'

interface SeriesDetailPageProps {
  params: Promise<{ slug: string }>
}

// Convert slug to category name
function slugToCategory(slug: string): SeriesCategory | null {
  const decodedSlug = decodeURIComponent(slug).toLowerCase()

  for (const category of SERIES_CATEGORIES) {
    if (category.toLowerCase().replace(/\s+/g, '-') === decodedSlug) {
      return category
    }
  }
  return null
}

export async function generateStaticParams() {
  return SERIES_CATEGORIES.map((category) => ({
    slug: category.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export async function generateMetadata({ params }: SeriesDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = slugToCategory(slug)

  if (!category) {
    return { title: 'Series Not Found' }
  }

  const meta = SERIES_META[category]

  return {
    title: `${meta.title} - Learning Track`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} - Owais.io`,
      description: meta.description,
      type: 'website',
    },
  }
}

export default async function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  const { slug } = await params
  const category = slugToCategory(slug)

  if (!category) {
    notFound()
  }

  const meta = SERIES_META[category]
  const posts = getPostsByCategory(category)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Calculate total reading time
  const totalReadingTime = posts.reduce((total, post) => {
    const minutes = parseInt(post.readingTime.replace(/\D/g, '')) || 0
    return total + minutes
  }, 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li>
                <Link href="/series" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Series</Link>
              </li>
              <li>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="text-slate-700 dark:text-slate-300">{meta.title}</li>
            </ol>
          </nav>

          <div className="flex items-start gap-6">
            <span className="text-6xl">{meta.icon}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
                {meta.title}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 max-w-2xl">
                {meta.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span>{posts.length} posts</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{Math.floor(totalReadingTime / 60)}h {totalReadingTime % 60}m total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts List */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Start CTA */}
          {posts.length > 0 && (
            <div className="mb-8 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">Ready to start learning?</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Begin from the first post and work your way through.</p>
                </div>
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="inline-flex items-center px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium rounded-lg transition-colors"
                >
                  Start with Post 1
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          {/* Posts Timeline */}
          <div className="space-y-4">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white/30 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all"
              >
                {/* Order number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1 mb-1">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                      {post.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 self-center">
                  <svg className="w-5 h-5 text-slate-400 dark:text-slate-600 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
