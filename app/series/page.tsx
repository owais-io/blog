import { Metadata } from 'next'
import Link from 'next/link'
import { getAllSeries } from '../lib/series'

export const metadata: Metadata = {
  title: 'Learning Tracks - Structured Tutorial Series',
  description: 'Master new skills with our comprehensive learning tracks. From Git to Linux certifications, follow structured paths to expertise.',
  openGraph: {
    title: 'Learning Tracks - Owais.io',
    description: 'Master new skills with our comprehensive learning tracks. Structured tutorial series for Git, LFCS, CKA, and more.',
    type: 'website',
  },
}

export default function SeriesPage() {
  const allSeries = getAllSeries()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-6">
              Learning{' '}
              <span className="text-gradient">Tracks</span>
            </h1>
            <p className="text-xl text-slate-300 mb-4 max-w-2xl mx-auto">
              Structured tutorial series to master new skills from beginner to advanced.
            </p>
            <p className="text-base text-slate-400 max-w-xl mx-auto">
              Each track is a complete learning path with hands-on tutorials, examples, and real-world projects.
            </p>
          </div>
        </div>
      </section>

      {/* Series Grid */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {allSeries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allSeries.map((series) => (
              <Link
                key={series.category}
                href={`/series/${encodeURIComponent(series.category.toLowerCase().replace(/\s+/g, '-'))}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start gap-5 mb-6">
                    <span className="text-5xl">{series.meta.icon}</span>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                        {series.meta.title}
                      </h2>
                      <p className="text-slate-400">
                        {series.meta.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="flex items-center gap-6 mb-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      <span className="font-medium text-slate-300">{series.postCount} posts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-slate-300">
                        {Math.floor(series.totalReadingTime / 60)}h {series.totalReadingTime % 60}m total
                      </span>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="mb-6">
                    <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full w-0 group-hover:w-full transition-all duration-700" />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-base font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      Start this track
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Beginner to Advanced
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No learning tracks available yet.</p>
          </div>
        )}

        {/* Coming Soon Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-100 mb-8 text-center">Coming Soon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '☸️', title: 'CKA Certification', description: 'Certified Kubernetes Administrator' },
              { icon: '☸️', title: 'CKAD Certification', description: 'Certified Kubernetes Application Developer' },
              { icon: '🐳', title: 'Docker Mastery', description: 'Containerization from basics to production' },
            ].map((upcoming) => (
              <div
                key={upcoming.title}
                className="relative overflow-hidden rounded-xl border border-slate-700/30 bg-slate-800/30 p-6 opacity-60"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl grayscale">{upcoming.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-300 mb-1">
                      {upcoming.title}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {upcoming.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
