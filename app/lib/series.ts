import { getPostsByCategory, BlogPostMeta } from './blog'

// Define which categories are considered "series"
// Add new series here as you create them
export const SERIES_CATEGORIES = [
  'Version Control',
  'LFCS',
  // Add more series categories here
] as const

export type SeriesCategory = typeof SERIES_CATEGORIES[number]

// Series metadata for display
export const SERIES_META: Record<SeriesCategory, { title: string; description: string; icon: string }> = {
  'Version Control': {
    title: 'Git & Version Control Series',
    description: 'Master Git from basics to advanced workflows',
    icon: '🔀',
  },
  'LFCS': {
    title: 'LFCS Certification Series',
    description: 'Linux Foundation Certified System Administrator',
    icon: '🐧',
  },
}

export interface SeriesPost {
  slug: string
  title: string
  date: string
  readingTime: string
  order: number
}

export interface SeriesData {
  category: SeriesCategory
  meta: typeof SERIES_META[SeriesCategory]
  posts: SeriesPost[]
  currentIndex: number
  prevPost: SeriesPost | null
  nextPost: SeriesPost | null
}

/**
 * Check if a category is a series category
 */
export function isSeriesCategory(category: string): category is SeriesCategory {
  return SERIES_CATEGORIES.includes(category as SeriesCategory)
}

/**
 * Get series data for a post if it belongs to a series
 */
export function getSeriesData(currentSlug: string, categories: string[]): SeriesData | null {
  // Find if this post belongs to any series category
  const seriesCategory = categories.find(cat => isSeriesCategory(cat)) as SeriesCategory | undefined

  if (!seriesCategory) {
    return null
  }

  // Get all posts in this series
  const allSeriesPosts = getPostsByCategory(seriesCategory)

  // Sort by date (oldest first for tutorial sequence)
  const sortedPosts = allSeriesPosts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((post, index) => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      readingTime: post.readingTime,
      order: index + 1,
    }))

  // Find current post index
  const currentIndex = sortedPosts.findIndex(post => post.slug === currentSlug)

  if (currentIndex === -1) {
    return null
  }

  return {
    category: seriesCategory,
    meta: SERIES_META[seriesCategory],
    posts: sortedPosts,
    currentIndex,
    prevPost: currentIndex > 0 ? sortedPosts[currentIndex - 1] : null,
    nextPost: currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null,
  }
}
