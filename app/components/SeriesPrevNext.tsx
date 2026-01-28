import Link from 'next/link'
import type { SeriesData } from '../lib/series'

interface SeriesPrevNextProps {
  seriesData: SeriesData
  variant?: 'full' | 'compact'
}

export default function SeriesPrevNext({ seriesData, variant = 'full' }: SeriesPrevNextProps) {
  const { prevPost, nextPost, meta, currentIndex, posts } = seriesData

  if (!prevPost && !nextPost) {
    return null
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between gap-4">
        {/* Previous */}
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-lg transition-colors group"
          >
            <svg
              className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100">Previous</span>
          </Link>
        ) : (
          <div />
        )}

        {/* Series Info */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{meta.icon}</span>
          <span>{currentIndex + 1} / {posts.length}</span>
        </div>

        {/* Next */}
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-lg transition-colors group"
          >
            <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-100">Next</span>
            <svg
              className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    )
  }

  // Full variant with post titles
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Previous Post */}
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="group flex flex-col p-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-xl transition-all hover:border-slate-300 dark:hover:border-slate-500"
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous in series</span>
          </div>
          <p className="text-slate-800 dark:text-slate-100 font-medium line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
            {prevPost.title}
          </p>
        </Link>
      ) : (
        <div className="hidden sm:flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 border-dashed rounded-xl">
          <p className="text-sm text-slate-500">Start of series</p>
        </div>
      )}

      {/* Next Post */}
      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex flex-col p-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 rounded-xl transition-all hover:border-slate-300 dark:hover:border-slate-500 text-right"
        >
          <div className="flex items-center justify-end gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span>Next in series</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <p className="text-slate-800 dark:text-slate-100 font-medium line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
            {nextPost.title}
          </p>
        </Link>
      ) : (
        <div className="hidden sm:flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 border-dashed rounded-xl">
          <p className="text-sm text-slate-500">End of series</p>
        </div>
      )}
    </div>
  )
}
