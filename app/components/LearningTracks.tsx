'use client'

import Link from 'next/link'

interface SeriesInfo {
  category: string
  meta: {
    title: string
    description: string
    icon: string
  }
  postCount: number
  firstPostSlug: string
  totalReadingTime: number
}

interface LearningTracksProps {
  series: SeriesInfo[]
}

export default function LearningTracks({ series }: LearningTracksProps) {
  if (series.length === 0) return null

  return (
    <section className="mb-20">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight">
          Learning Tracks
        </h2>
        <Link
          href="/series"
          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
        >
          View all
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {series.map((s) => (
          <Link
            key={s.category}
            href={`/series/${encodeURIComponent(s.category.toLowerCase().replace(/\s+/g, '-'))}`}
            className="group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              {/* Icon and title */}
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{s.meta.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {s.meta.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {s.meta.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  <span>{s.postCount} posts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{Math.round(s.totalReadingTime / 60)}h {s.totalReadingTime % 60}m</span>
                </div>
              </div>

              {/* Start button */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <span className="inline-flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Start learning
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
