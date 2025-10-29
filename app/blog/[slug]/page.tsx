import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '../../components/MDXComponents'
import RelatedPosts from '../../components/RelatedPosts'
import ShareButton from '../../components/ShareButton'
import TableOfContents, { CompactTableOfContents } from '../../components/TableOfContents'
import { generateArticleSchema, generateBreadcrumbSchema } from '../../lib/schema'
import Breadcrumb from '../../components/Breadcrumb'
import SponsorAd from '../../components/SponsorAd'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  // Generate OG image URL
  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.categories[0] || '')}`

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, 4)

  // Generate JSON-LD structured data
  const postUrl = `https://owais.io/blog/${params.slug}`
  const ogImageUrl = `https://owais.io/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.categories[0] || '')}`

  const articleSchema = generateArticleSchema({
    post,
    url: postUrl,
    imageUrl: ogImageUrl,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://owais.io' },
    { name: 'Blog', url: 'https://owais.io' },
    { name: post.title, url: postUrl },
  ])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Back Navigation */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
        </div>
      </div>

      {/* Main Layout Container */}
      {/* <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="pt-6 pb-4">
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: '/' },
              { name: post.title, href: `/blog/${params.slug}`, current: true },
            ]}
          />
        </div>

        <div className="flex gap-8 pb-8">

          {/* Desktop TOC Sidebar */}
          {post.tocEnabled && post.toc.hasContent && (
            <aside className="hidden lg:block w-80 flex-shrink-0">
            {/* <aside className="hidden lg:block w-80 flex-shrink-0"> */}
              <div className="sticky top-24">
                <TableOfContents headings={post.toc.headings} />
              </div>
            </aside>
          )}

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Article Header */}
            <header className="mb-12 text-center">
              <div className="max-w-4xl mx-auto">
              {/* <div className="max-w-5xl mx-auto"> */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {post.title}
                </h1>

                {post.description && (
                  <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {post.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 dark:text-gray-400 mb-8">
                  <div className="inline-flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <time dateTime={post.date} className="font-medium">
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </time>
                  </div>
                  <span className="w-1 h-1 bg-current rounded-full" />
                  <div className="inline-flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{post.readingTime}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-12" />
              </div>
            </header>

            {/* Mobile TOC */}
            {post.tocEnabled && post.toc.hasContent && (
              <div className="lg:hidden mb-8">
                <CompactTableOfContents headings={post.toc.headings} />
              </div>
            )}

            {/* Article Content */}
            <article className="max-w-4xl mx-auto">
            {/* <article className="max-w-7xl mx-auto"> */}
              <div className="prose-enhanced max-w-none">
                <MDXRemote source={post.content} components={mdxComponents} />
              </div>
            </article>

            {/* Article Footer */}
            <footer className="max-w-4xl mx-auto border-t border-gray-200 dark:border-gray-700 pt-12 mt-16 mb-16">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Thank you for reading!
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Published on {format(new Date(post.date), 'MMMM d, yyyy')}
                  </p>
                </div>

                <div className="flex gap-3">
                  <Link href="/" className="btn-secondary">
                    ← All Posts
                  </Link>
                  <ShareButton title={post.title} description={post.description} />
                </div>
              </div>
            </footer>

            {/* Author Bio */}
            <section className="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 mb-16">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/profile.png"
                    alt="Owais"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Written by Owais
                  </h3>
                  <div className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed space-y-3">
                    <p>
                      I'm an AIOps Engineer with a passion for AI, Operating Systems, Cloud, and Security—sharing insights that matter in today's tech world.
                    </p>
                    <p>
                      I completed the UK's Eduqual Level 6 Diploma in AIOps from Al Nafi International College, a globally recognized program that's changing careers worldwide. This diploma is:
                    </p>
                    <ul className="list-none space-y-1 ml-0">
                      <li>✅ Available online in 17+ languages</li>
                      <li>✅ Includes free student visa guidance for Master's programs in Computer Science fields across the UK, USA, Canada, and more</li>
                      <li>✅ Comes with job placement support and a 90-day success plan once you land a role</li>
                      <li>✅ Offers a 1-year internship experience letter while you study—all with no hidden costs</li>
                    </ul>
                    <p>
                      It's not just a diploma—it's a career accelerator.
                    </p>
                    <p>
                      👉 <a href="https://alnafi.com/?al_aid=6d5529727bec42a" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">Start your journey today with a 7-day free trial</a>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Link href="/about" className="btn-ghost text-sm">
                      About Me
                    </Link>
                    {/* <Link href="/projects" className="btn-ghost text-sm">
                      Projects
                    </Link> */}
                  </div>
                </div>
              </div>
            </section>

            {/* Sponsor Ad - After Blog Post */}
            <div className="max-w-4xl mx-auto mb-16">
              <SponsorAd />
            </div>
          </main>

        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  )
}