import { Metadata } from 'next'
import { getAllPosts, getTagCounts, getCategoryCounts } from '../lib/blog'
import TagsPageClient from '../components/TagsPageClient'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse posts by tags - Find articles on specific topics and technologies.',
}

export default function TagsPage() {
  // Fetch all posts once - let client handle filtering
  const allPosts = getAllPosts().map(post => ({
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

  // Get tag and category counts (static data)
  const tagCounts = getTagCounts()
  const categoryCounts = getCategoryCounts()

  return (
    <TagsPageClient
      allPosts={allPosts}
      tagCounts={tagCounts}
      categoryCounts={categoryCounts}
    />
  )
}