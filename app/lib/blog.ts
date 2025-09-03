import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  content: string
  readingTime: string
  published: boolean
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readingTime: string
  published: boolean
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Ensure posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.mdx'))
    
    const allPostsData = fileNames.map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        content,
        readingTime: readingTime(content).text,
        published: data.published !== false,
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

    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      content,
      readingTime: readingTime(content).text,
      published: data.published !== false,
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

export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts()
  return posts.filter(post => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

export function getPostsMeta(page = 1, limit = 10, tag?: string): {
  posts: BlogPostMeta[]
  totalPages: number
  currentPage: number
  totalPosts: number
} {
  let posts = getAllPosts()
  
  if (tag) {
    posts = getPostsByTag(tag)
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
    readingTime: post.readingTime,
    published: post.published,
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
  
  // Calculate tag similarity scores
  const postsWithScores = otherPosts.map(post => {
    const commonTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    ).length
    
    return {
      post,
      score: commonTags,
    }
  })
  
  // Sort by tag similarity (highest first), then by date (newest first)
  postsWithScores.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score // Higher score first
    }
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime() // Newer first
  })
  
  // Hybrid approach:
  // 1. First try to get posts with at least 2 shared tags
  const highSimilarity = postsWithScores.filter(item => item.score >= 2)
  
  // 2. If not enough, include posts with at least 1 shared tag
  const mediumSimilarity = postsWithScores.filter(item => item.score >= 1)
  
  // 3. Fallback to recent posts if still not enough
  const allSorted = postsWithScores
  
  let relatedPosts: BlogPostMeta[] = []
  
  if (highSimilarity.length >= limit) {
    // We have enough high-similarity posts
    relatedPosts = highSimilarity.slice(0, limit).map(item => ({
      slug: item.post.slug,
      title: item.post.title,
      description: item.post.description,
      date: item.post.date,
      tags: item.post.tags,
      readingTime: item.post.readingTime,
      published: item.post.published,
    }))
  } else if (mediumSimilarity.length >= limit) {
    // Use posts with at least 1 shared tag
    relatedPosts = mediumSimilarity.slice(0, limit).map(item => ({
      slug: item.post.slug,
      title: item.post.title,
      description: item.post.description,
      date: item.post.date,
      tags: item.post.tags,
      readingTime: item.post.readingTime,
      published: item.post.published,
    }))
  } else {
    // Fallback to most recent posts
    relatedPosts = allSorted.slice(0, limit).map(item => ({
      slug: item.post.slug,
      title: item.post.title,
      description: item.post.description,
      date: item.post.date,
      tags: item.post.tags,
      readingTime: item.post.readingTime,
      published: item.post.published,
    }))
  }
  
  return relatedPosts
}