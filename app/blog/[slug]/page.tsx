import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '../../components/MDXComponents'
import RelatedPosts from '../../components/RelatedPosts'
import ShareButton from '../../components/ShareButton'
import TableOfContents, { CompactTableOfContents } from '../../components/TableOfContents'

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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(params.slug, 4)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">

          {/* Desktop TOC Sidebar */}
          {post.tocEnabled && post.toc.hasContent && (
            <aside className="hidden lg:block w-80 flex-shrink-0">
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

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mb-12">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/?tag=${encodeURIComponent(tag)}`}
                        className="tag-primary"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}

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
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  O
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Written by Owais
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Passionate developer sharing insights on technology, development, and the art of building great software.
                  </p>
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
          </main>

        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  )
}