import { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { 
  getPostsMetaAdvanced, 
  getCategoriesByTags, 
  getTagsByCategories 
} from '../lib/blog'
import TagsPageClient from '../components/TagsPageClient'

interface TagsPageProps {
  searchParams: {
    page?: string
    tags?: string
    categories?: string
  }
}

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse posts by tags - Find articles on specific topics and technologies.',
}

export default function TagsPage({ searchParams }: TagsPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10)
  
  // Parse URL parameters for multiple tags and categories
  const selectedTags = searchParams.tags ? searchParams.tags.split(',').filter(Boolean) : []
  const selectedCategories = searchParams.categories ? searchParams.categories.split(',').filter(Boolean) : []
  
  // Get filtered data based on bidirectional filtering
  const availableCategories = getCategoriesByTags(selectedTags)
  const availableTags = getTagsByCategories(selectedCategories)
  
  // Get posts with advanced filtering
  const { posts, totalPages, totalPosts } = getPostsMetaAdvanced(
    currentPage,
    10,
    selectedTags.length > 0 ? selectedTags : undefined,
    selectedCategories.length > 0 ? selectedCategories : undefined
  )

  return (
    <TagsPageClient
      posts={posts}
      totalPages={totalPages}
      totalPosts={totalPosts}
      currentPage={currentPage}
      availableCategories={availableCategories}
      availableTags={availableTags}
    />
  )
}