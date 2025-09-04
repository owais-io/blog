import fs from 'fs'

/**
 * Get the creation/modification date of a file
 * Prefers birthtime (creation) over mtime (modification)
 */
export function getFileDate(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath)
    // Use birthtime (creation time) if available, otherwise use mtime (modified time)
    return stats.birthtime || stats.mtime
  } catch (error) {
    console.warn(`Could not get file timestamp for ${filePath}:`, error)
    // Fallback to current date if file stats are unavailable
    return new Date()
  }
}

/**
 * Get a formatted ISO date string from a file timestamp
 */
export function getFileDateISO(filePath: string): string {
  const fileDate = getFileDate(filePath)
  return fileDate.toISOString()
}

/**
 * Get the date for a blog post, either from frontmatter or file timestamp
 */
export function getPostDate(frontmatterDate: string | undefined, filePath: string): string {
  if (frontmatterDate) {
    // Validate the frontmatter date
    const parsedDate = new Date(frontmatterDate)
    if (isNaN(parsedDate.getTime())) {
      console.warn(`Invalid date in frontmatter for ${filePath}: ${frontmatterDate}`)
      return getFileDateISO(filePath)
    }
    return frontmatterDate
  }
  
  // No date in frontmatter, use file timestamp
  return getFileDateISO(filePath)
}

/**
 * Format a date for display (e.g., "September 4, 2024")
 */
export function formatDisplayDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    console.warn('Could not format date:', dateString)
    return dateString
  }
}

/**
 * Get a relative time string (e.g., "2 days ago", "1 month ago")
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) {
      return 'Today'
    } else if (diffInDays === 1) {
      return '1 day ago'
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7)
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30)
      return months === 1 ? '1 month ago' : `${months} months ago`
    } else {
      const years = Math.floor(diffInDays / 365)
      return years === 1 ? '1 year ago' : `${years} years ago`
    }
  } catch (error) {
    console.warn('Could not calculate relative time:', dateString)
    return dateString
  }
}