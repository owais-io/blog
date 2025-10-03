import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { getPostDate } from './dateUtils'
import { extractTableOfContents, addHeadingIds, type TOCData } from './toc'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  categories: string[]  // Changed from single category to array
  content: string
  readingTime: string
  published: boolean
  toc: TOCData
  tocEnabled: boolean
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  categories: string[]  // Changed from single category to array
  readingTime: string
  published: boolean
  tocEnabled: boolean
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Ensure posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

// Helper function to normalize categories from frontmatter
function normalizeCategories(data: any): string[] {
  // Handle both new format (categories array) and legacy format (single category)
  let categories: string[] = []

  if (Array.isArray(data.categories)) {
    // New format: categories: ["Cat1", "Cat2", "Cat3"]
    categories = data.categories
  } else if (data.category && typeof data.category === 'string') {
    // Legacy format: category: "Single Category"
    categories = [data.category]
  } else if (data.categories && typeof data.categories === 'string') {
    // Handle case where categories is accidentally a string
    categories = [data.categories]
  }

  // Validate and clean categories
  return categories
    .filter(cat => cat && typeof cat === 'string' && cat.trim().length > 0)
    .map(cat => cat.trim())
    .slice(0, 5) // Enforce max 5 categories limit
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.mdx'))
    
    const allPostsData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // Get date from frontmatter or file timestamp
      const postDate = getPostDate(data.date, fullPath)

      // Extract table of contents
      const tocData = extractTableOfContents(content)
      const tocEnabled = data.toc === true || (data.toc !== false && tocData.headings.length >= 3)

      // Add heading IDs to content for anchor links
      const processedContent = tocEnabled ? addHeadingIds(content) : content

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: postDate,
        tags: data.tags || [],
        categories: normalizeCategories(data),
        content: processedContent,
        readingTime: readingTime(content).text,
        published: data.published !== false,
        toc: tocData,
        tocEnabled,
      }
    })

    // Sort posts by date (newest first) and filter published posts
    return allPostsData
      .filter(post => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.warn('No posts directory found or error reading posts:', error)
    return []
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Get date from frontmatter or file timestamp
    const postDate = getPostDate(data.date, fullPath)

    // Extract table of contents
    const tocData = extractTableOfContents(content)
    const tocEnabled = data.toc === true || (data.toc !== false && tocData.headings.length >= 3)

    // Add heading IDs to content for anchor links
    const processedContent = tocEnabled ? addHeadingIds(content) : content

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: postDate,
      tags: data.tags || [],
      categories: normalizeCategories(data),
      content: processedContent,
      readingTime: readingTime(content).text,
      published: data.published !== false,
      toc: tocData,
      tocEnabled,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()

  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })

  return Array.from(tags).sort()
}

// Get tag counts for display
export function getTagCounts(): Record<string, number> {
  const posts = getAllPosts()
  const counts: Record<string, number> = {}

  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (tag && tag.trim()) {
        counts[tag] = (counts[tag] || 0) + 1
      }
    })
  })

  return counts
}

// Category sorting options
export type CategorySortOrder = 'alphabetical' | 'recency' | 'count' | 'custom'

export function getAllCategories(sortOrder: CategorySortOrder = 'recency'): string[] {
  const posts = getAllPosts()
  const categoryData = new Map<string, { lastDate: Date; count: number }>()

  // Collect data for all categories
  posts.forEach(post => {
    const postDate = new Date(post.date)
    post.categories.forEach(category => {
      if (category && category.trim()) {
        const cleanCategory = category.trim()
        const current = categoryData.get(cleanCategory)

        if (!current) {
          categoryData.set(cleanCategory, { lastDate: postDate, count: 1 })
        } else {
          categoryData.set(cleanCategory, {
            lastDate: postDate > current.lastDate ? postDate : current.lastDate,
            count: current.count + 1
          })
        }
      }
    })
  })

  const categories = Array.from(categoryData.keys())

  switch (sortOrder) {
    case 'alphabetical':
      return categories.sort((a, b) => a.localeCompare(b))

    case 'count':
      // Sort by post count (descending), then alphabetically
      return categories.sort((a, b) => {
        const countA = categoryData.get(a)!.count
        const countB = categoryData.get(b)!.count
        const countDiff = countB - countA
        return countDiff !== 0 ? countDiff : a.localeCompare(b)
      })

    case 'custom':
      // Define priority order for important categories
      const priorityOrder = [
        'Version Control',
        'Git',
        'GitHub',
        'Development',
        'Tutorial',
        'Docker',
        'Python',
        'AI',
        'Artificial Intelligence',
        'Data Science'
      ]

      const priorityCategories = priorityOrder.filter(cat => categories.includes(cat))
      const remainingCategories = categories
        .filter(cat => !priorityOrder.includes(cat))
        .sort((a, b) => a.localeCompare(b))

      return [...priorityCategories, ...remainingCategories]

    case 'recency':
    default:
      // Sort by most recent date first, then alphabetically for categories with same date
      return categories.sort((a, b) => {
        const dateA = categoryData.get(a)!.lastDate
        const dateB = categoryData.get(b)!.lastDate
        const dateDiff = dateB.getTime() - dateA.getTime()
        // If dates are the same, fall back to alphabetical order
        return dateDiff !== 0 ? dateDiff : a.localeCompare(b)
      })
  }
}

// Helper function to get category counts for display
export function getCategoryCounts(): Record<string, number> {
  const posts = getAllPosts()
  const counts: Record<string, number> = {}

  posts.forEach(post => {
    post.categories.forEach(category => {
      if (category && category.trim()) {
        const cleanCategory = category.trim()
        counts[cleanCategory] = (counts[cleanCategory] || 0) + 1
      }
    })
  })

  return counts
}

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post =>
    // Check if the post has this category in its categories array
    post.categories.some(postCategory =>
      postCategory.toLowerCase() === category.toLowerCase()
    )
  )
}

export function getPostsMeta(page = 1, limit = 10, tag?: string, category?: string): {
  posts: BlogPostMeta[]
  totalPages: number
  currentPage: number
  totalPosts: number
} {
  let posts = getAllPosts()
  
  if (tag) {
    posts = getPostsByTag(tag)
  } else if (category) {
    posts = getPostsByCategory(category)
  }
  
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  const paginatedPosts = posts.slice(startIndex, endIndex).map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    categories: post.categories,
    readingTime: post.readingTime,
    published: post.published,
    tocEnabled: post.tocEnabled,
  }))
  
  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    totalPosts,
  }
}

// Get categories that have posts with the specified tags
export function getCategoriesByTags(tags: string[]): string[] {
  if (!tags || tags.length === 0) {
    return getAllCategories()
  }
  
  const posts = getAllPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    // Check if post has any of the selected tags
    const hasSelectedTag = tags.some(tag => 
      post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    )
    
    if (hasSelectedTag) {
      post.categories.forEach(category => {
        if (category) {
          categories.add(category)
        }
      })
    }
  })
  
  return Array.from(categories).sort()
}

// Get tags that are in posts with the specified categories
export function getTagsByCategories(categories: string[]): string[] {
  if (!categories || categories.length === 0) {
    return getAllTags()
  }
  
  const posts = getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    // Check if post belongs to any of the selected categories
    const hasSelectedCategory = categories.some(category =>
      post.categories.some(postCategory =>
        postCategory.toLowerCase() === category.toLowerCase()
      )
    )
    
    if (hasSelectedCategory) {
      post.tags.forEach(tag => tags.add(tag))
    }
  })
  
  return Array.from(tags).sort()
}

// Get posts filtered by both tags and categories
export function getPostsByTagsAndCategories(tags?: string[], categories?: string[]): BlogPost[] {
  let posts = getAllPosts()
  
  if (tags && tags.length > 0) {
    posts = posts.filter(post => 
      tags.some(tag => 
        post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
      )
    )
  }
  
  if (categories && categories.length > 0) {
    posts = posts.filter(post => 
      categories.some(category =>
        post.categories.some(postCategory =>
          postCategory.toLowerCase() === category.toLowerCase()
        )
      )
    )
  }
  
  return posts
}

// Updated getPostsMeta to handle multiple tags and categories
export function getPostsMetaAdvanced(
  page = 1, 
  limit = 10, 
  tags?: string[], 
  categories?: string[]
): {
  posts: BlogPostMeta[]
  totalPages: number
  currentPage: number
  totalPosts: number
} {
  let posts = getPostsByTagsAndCategories(tags, categories)
  
  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  const paginatedPosts = posts.slice(startIndex, endIndex).map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    categories: post.categories,
    readingTime: post.readingTime,
    published: post.published,
    tocEnabled: post.tocEnabled,
  }))
  
  return {
    posts: paginatedPosts,
    totalPages,
    currentPage: page,
    totalPosts,
  }
}

export function getRelatedPosts(currentSlug: string, limit = 4): BlogPostMeta[] {
  const allPosts = getAllPosts()
  const currentPost = allPosts.find(post => post.slug === currentSlug)
  
  if (!currentPost) {
    return []
  }
  
  // Exclude the current post
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug)
  
  if (otherPosts.length === 0) {
    return []
  }
  
  // Enhanced scoring system: Categories + Tags + Recency
  const postsWithScores = otherPosts.map(post => {
    let score = 0
    
    // 1. Category matching (highest priority) - 3 points per shared category
    const sharedCategories = post.categories.filter(category =>
      currentPost.categories.some(currentCategory =>
        currentCategory.toLowerCase() === category.toLowerCase()
      )
    ).length
    const sameCategory = sharedCategories > 0
    if (sameCategory) {
      score += 3 * sharedCategories // More shared categories = higher score
    }
    
    // 2. Tag similarity (medium priority) - 1 point per shared tag
    const commonTags = post.tags.filter(tag => 
      currentPost.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    ).length
    score += commonTags
    
    // 3. Recency bonus (low priority) - 0.1 points for posts within last 30 days
    const daysSincePublished = Math.floor(
      (new Date().getTime() - new Date(post.date).getTime()) / (1000 * 60 * 60 * 24)
    )
    if (daysSincePublished <= 30) {
      score += 0.1
    }
    
    return {
      post,
      score,
      sameCategory,
      commonTags,
      daysSincePublished
    }
  })
  
  // Sort by total score (highest first), then by date (newest first)
  postsWithScores.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score // Higher score first
    }
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime() // Newer first
  })
  
  // Intelligent selection with multiple tiers:
  // Tier 1: Same category + shared tags (score >= 4)
  const tier1 = postsWithScores.filter(item => item.score >= 4)
  
  // Tier 2: Same category only (score >= 3) 
  const tier2 = postsWithScores.filter(item => item.score >= 3 && item.score < 4)
  
  // Tier 3: Shared tags only (score >= 2)
  const tier3 = postsWithScores.filter(item => item.score >= 2 && item.score < 3)
  
  // Tier 4: At least 1 shared tag (score >= 1)
  const tier4 = postsWithScores.filter(item => item.score >= 1 && item.score < 2)
  
  // Tier 5: Fallback - most recent posts
  const tier5 = postsWithScores
  
  let relatedPosts: BlogPostMeta[] = []
  
  // Fill posts by priority, ensuring diversity when possible
  const addPosts = (tierPosts: typeof postsWithScores, maxToAdd: number) => {
    const toAdd = tierPosts.slice(0, maxToAdd).map(item => ({
      slug: item.post.slug,
      title: item.post.title,
      description: item.post.description,
      date: item.post.date,
      tags: item.post.tags,
      categories: item.post.categories,
      readingTime: item.post.readingTime,
      published: item.post.published,
      tocEnabled: item.post.tocEnabled,
    }))
    relatedPosts = relatedPosts.concat(toAdd)
  }
  
  // Smart filling strategy
  if (tier1.length >= limit) {
    // Best case: enough high-quality matches
    addPosts(tier1, limit)
  } else {
    // Fill with best available from each tier
    if (tier1.length > 0) addPosts(tier1, Math.min(tier1.length, limit))
    
    const remaining = limit - relatedPosts.length
    if (remaining > 0 && tier2.length > 0) {
      addPosts(tier2, Math.min(tier2.length, remaining))
    }
    
    const remaining2 = limit - relatedPosts.length
    if (remaining2 > 0 && tier3.length > 0) {
      addPosts(tier3, Math.min(tier3.length, remaining2))
    }
    
    const remaining3 = limit - relatedPosts.length
    if (remaining3 > 0 && tier4.length > 0) {
      addPosts(tier4, Math.min(tier4.length, remaining3))
    }
    
    const remaining4 = limit - relatedPosts.length
    if (remaining4 > 0) {
      addPosts(tier5, remaining4)
    }
  }
  
  return relatedPosts.slice(0, limit)
}