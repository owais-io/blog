'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SeriesData } from '../lib/series'

interface SeriesNavigationProps {
  seriesData: SeriesData
}

// Desktop Sidebar Version
export default function SeriesNavigation({ seriesData }: SeriesNavigationProps) {
  const { meta, posts, currentIndex } = seriesData

  return (
    <nav className="bg-slate-700 rounded-xl border border-slate-600 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-600 px-4 py-3 border-b border-slate-500">
        <div className="flex items-center gap-2">
          <span className="text-xl">{meta.icon}</span>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">{meta.title}</h3>
            <p className="text-xs text-slate-400">{posts.length} posts in series</p>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 16rem)' }}
      >
        <ul className="py-2">
          {posts.map((post, index) => {
            const isCurrent = index === currentIndex
            const isCompleted = index < currentIndex

            return (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                    isCurrent
                      ? 'bg-cyan-900/50 border-l-4 border-cyan-400'
                      : 'hover:bg-slate-600 border-l-4 border-transparent'
                  }`}
                >
                  {/* Order Number / Check */}
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-900'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-600 text-slate-300'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      post.order
                    )}
                  </span>

                  {/* Post Info */}
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm leading-snug line-clamp-2 ${
                        isCurrent
                          ? 'text-cyan-300 font-medium'
                          : 'text-slate-300'
                      }`}
                    >
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{post.readingTime}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Progress */}
      <div className="px-4 py-3 border-t border-slate-600 bg-slate-700">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>Progress</span>
          <span>{currentIndex + 1} of {posts.length}</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / posts.length) * 100}%` }}
          />
        </div>
      </div>
    </nav>
  )
}

// Mobile Collapsible Version
export function CompactSeriesNavigation({ seriesData }: SeriesNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { meta, posts, currentIndex } = seriesData

  return (
    <div className="bg-slate-700 rounded-xl border border-slate-600 overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-600 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{meta.icon}</span>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-slate-100">{meta.title}</h3>
            <p className="text-xs text-slate-400">
              Part {currentIndex + 1} of {posts.length}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="border-t border-slate-600">
          <ul className="py-2 max-h-64 overflow-y-auto">
            {posts.map((post, index) => {
              const isCurrent = index === currentIndex
              const isCompleted = index < currentIndex

              return (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                      isCurrent
                        ? 'bg-cyan-900/50 border-l-4 border-cyan-400'
                        : 'hover:bg-slate-600 border-l-4 border-transparent'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                        isCurrent
                          ? 'bg-cyan-500 text-slate-900'
                          : isCompleted
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-300'
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        post.order
                      )}
                    </span>
                    <span
                      className={`text-sm line-clamp-1 ${
                        isCurrent ? 'text-cyan-300 font-medium' : 'text-slate-300'
                      }`}
                    >
                      {post.title}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Progress Bar */}
          <div className="px-4 py-3 border-t border-slate-600">
            <div className="w-full bg-slate-600 rounded-full h-1.5">
              <div
                className="bg-cyan-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / posts.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
