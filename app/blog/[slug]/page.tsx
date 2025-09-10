import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '../../components/MDXComponents'
import RelatedPosts from '../../components/RelatedPosts'
import ShareButton from '../../components/ShareButton'

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
    <div className="min-h-screen">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center link hover:no-underline group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
        </nav>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="mb-12 text-center">
          <div className="max-w-3xl mx-auto">
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
          </div>

          {/* Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mb-12" />
        </header>

        {/* Article Content */}
        <div className="prose-enhanced mx-auto mb-16">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Article Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-12 mb-16">
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
        <section className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 mb-16">
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
                <Link href="/projects" className="btn-ghost text-sm">
                  Projects
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />
    </div>
  )
}