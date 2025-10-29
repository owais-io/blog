import { BlogPost } from './blog'

export interface ArticleSchemaProps {
  post: BlogPost
  url: string
  authorUrl?: string
  imageUrl?: string
}

export interface OrganizationSchemaProps {
  name: string
  url: string
  logo?: string
  description?: string
  socialProfiles?: string[]
}

export interface BreadcrumbItem {
  name: string
  url: string
}

/**
 * Generates Article JSON-LD schema for blog posts
 * Helps search engines understand article content and display rich snippets
 */
export function generateArticleSchema({
  post,
  url,
  authorUrl = 'https://owais.io/about',
  imageUrl,
}: ArticleSchemaProps) {
  // Calculate word count from content
  const wordCount = post.content.trim().split(/\s+/).length

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date, // Use same as published if no modification date
    author: {
      '@type': 'Person',
      name: 'Owais',
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Owais.io',
      url: 'https://owais.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://owais.io/logo.png', // Update with actual logo path
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    keywords: post.tags.join(', '),
    articleSection: post.categories.join(', '),
    wordCount: wordCount,
    timeRequired: post.readingTime,
    inLanguage: 'en-US',
  }

  // Add image if provided
  if (imageUrl) {
    schema['image'] = {
      '@type': 'ImageObject',
      url: imageUrl,
    }
  }

  return schema
}

/**
 * Generates Organization JSON-LD schema for site identity
 * Helps search engines understand who owns/publishes the website
 */
export function generateOrganizationSchema({
  name,
  url,
  logo,
  description,
  socialProfiles = [],
}: OrganizationSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name,
    url: url,
    sameAs: socialProfiles,
  }

  if (logo) {
    schema.logo = {
      '@type': 'ImageObject',
      url: logo,
    }
  }

  if (description) {
    schema.description = description
  }

  return schema
}

/**
 * Generates BreadcrumbList JSON-LD schema for navigation
 * Helps search engines understand site hierarchy
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generates WebSite JSON-LD schema for search box
 * Enables site search in Google search results
 */
export function generateWebsiteSchema(url: string, name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    url: url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
