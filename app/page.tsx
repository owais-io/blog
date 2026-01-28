import { Metadata } from 'next'
import HomePageClient from './components/HomePageClient'
import { getPostsMeta, getAllCategories, type CategorySortOrder } from './lib/blog'
import { getAllSeries } from './lib/series'

export const metadata: Metadata = {
  title: 'AI, Cloud & DevOps Tutorials - Tech Blog',
  description: 'Learn AI, Cloud Computing, DevOps, Operating Systems, Kubernetes, Docker, and Terraform through practical tutorials and guides. Daily tech insights from an AIOps Engineer.',
  openGraph: {
    title: 'AI, Cloud & DevOps Tutorials - Owais.io',
    description: 'Learn AI, Cloud Computing, DevOps, Operating Systems, Kubernetes, Docker, and Terraform through practical tutorials and guides.',
    type: 'website',
    url: 'https://owais.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI, Cloud & DevOps Tutorials - Owais.io',
    description: 'Learn AI, Cloud Computing, DevOps, Operating Systems, Kubernetes, Docker, and Terraform through practical tutorials and guides.',
  },
}

export default function HomePage() {
  // Server-side: Get all posts
  const categorySortOrder: CategorySortOrder = 'recency'
  const allCategories = getAllCategories(categorySortOrder)
  const { posts } = getPostsMeta(1, 1000)

  // Featured posts - first 2 posts
  const featuredPosts = posts.slice(0, 2)
  const gridPosts = posts.slice(2)

  // Get all series for Learning Tracks section
  const allSeries = getAllSeries()

  // Pass data to client component for filtering
  return (
    <HomePageClient
      featuredPosts={featuredPosts}
      gridPosts={gridPosts}
      allCategories={allCategories}
      allSeries={allSeries}
    />
  )
}