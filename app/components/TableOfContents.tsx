'use client'

import { useState, useEffect } from 'react'
import type { TOCHeading } from '../lib/toc'

interface TableOfContentsProps {
  headings: TOCHeading[]
  className?: string
}

export default function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const observerOptions = {
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.anchor)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headings])

  // Auto-scroll TOC to keep active item in view
  useEffect(() => {
    if (!activeId || !mounted) return

    const activeButton = document.querySelector(`button[aria-label="Navigate to ${headings.find(h => h.anchor === activeId)?.text}"]`)
    const tocContainer = document.querySelector('.toc-scrollable-container')

    if (activeButton && tocContainer) {
      const containerRect = tocContainer.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      // Check if button is outside the visible area
      const isAbove = buttonRect.top < containerRect.top
      const isBelow = buttonRect.bottom > containerRect.bottom

      if (isAbove || isBelow) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
      }
    }
  }, [activeId, headings, mounted])

  const scrollToHeading = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      const offsetTop = element.offsetTop - 100 // Offset for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  if (!mounted || headings.length === 0) {
    return null
  }

  return (
    <nav
      className={`${className}`}
      style={{ maxHeight: 'calc(100vh - 8rem)' }}
      aria-label="Table of Contents"
    >
      {/* Scrollable Content */}
      <div
        className="overflow-y-auto scrollbar-thin toc-scrollable-container"
        style={{
          maxHeight: 'calc(100vh - 8rem)',
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db transparent'
        }}
      >
        <ul className="space-y-1 text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.anchor
            const levelClasses = {
              1: 'ml-0 text-gray-900 dark:text-gray-100 font-medium',
              2: 'ml-4 text-gray-600 dark:text-gray-400',
              3: 'ml-8 text-gray-500 dark:text-gray-500',
            }

            return (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.anchor)}
                  className={`
                    block w-full text-left py-1.5 text-sm transition-colors duration-150
                    hover:text-gray-900 dark:hover:text-gray-100
                    ${levelClasses[heading.level as keyof typeof levelClasses]}
                    ${isActive
                      ? 'text-sky-600 dark:text-sky-400 border-l-2 border-sky-600 dark:border-sky-400 -ml-px pl-4'
                      : ''
                    }
                  `}
                  aria-label={`Navigate to ${heading.text}`}
                >
                  {heading.text}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

// Compact version for mobile/smaller displays
export function CompactTableOfContents({ headings, className = '' }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const observerOptions = {
      rootMargin: '-100px 0px -80% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    headings.forEach((heading) => {
      const element = document.getElementById(heading.anchor)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headings])

  // Auto-scroll TOC to keep active item in view (for compact version)
  useEffect(() => {
    if (!activeId || !mounted || !isOpen) return

    const activeButton = document.querySelector(`.compact-toc-container button[aria-label*="${headings.find(h => h.anchor === activeId)?.text}"]`)
    const tocContainer = document.querySelector('.compact-toc-scrollable')

    if (activeButton && tocContainer) {
      const containerRect = tocContainer.getBoundingClientRect()
      const buttonRect = activeButton.getBoundingClientRect()

      const isAbove = buttonRect.top < containerRect.top
      const isBelow = buttonRect.bottom > containerRect.bottom

      if (isAbove || isBelow) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        })
      }
    }
  }, [activeId, headings, mounted, isOpen])

  const scrollToHeading = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
      setIsOpen(false)
    }
  }

  if (!mounted || headings.length === 0) {
    return null
  }

  const currentHeading = headings.find(h => h.anchor === activeId)

  return (
    <div className={`${className} relative`}>
      {/* Fixed Mobile TOC Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          aria-expanded={isOpen}
          aria-label="Toggle table of contents"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Backdrop overlay when TOC is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Old button kept for backward compatibility */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        aria-expanded={isOpen}
        aria-label="Toggle table of contents"
        style={{ display: 'none' }}
      >
        <div className="flex items-center min-w-0">
          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium truncate">
            {currentHeading ? currentHeading.text : 'Table of Contents'}
          </span>
        </div>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-x-4 top-20 bottom-20 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 flex flex-col compact-toc-container">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Table of Contents
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close table of contents"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 compact-toc-scrollable">
            <ul className="space-y-1">
              {headings.map((heading) => {
                const isActive = activeId === heading.anchor
                const levelClasses = {
                  1: 'ml-0 font-semibold',
                  2: 'ml-4',
                  3: 'ml-8',
                }

                return (
                  <li key={heading.id}>
                    <button
                      onClick={() => scrollToHeading(heading.anchor)}
                      className={`
                        block w-full text-left py-3 px-3 rounded-lg text-sm transition-colors
                        hover:bg-primary-50 dark:hover:bg-primary-900/20
                        hover:text-primary-600 dark:hover:text-primary-400
                        ${levelClasses[heading.level as keyof typeof levelClasses]}
                        ${isActive
                          ? 'text-primary-700 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 font-medium'
                          : 'text-gray-700 dark:text-gray-300'
                        }
                      `}
                    >
                      {heading.text}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Progress indicator for mobile */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Reading Progress
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: activeId ? `${((headings.findIndex(h => h.anchor === activeId) + 1) / headings.length) * 100}%` : '0%'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}