export interface TOCHeading {
  id: string
  level: number
  text: string
  anchor: string
}

export interface TOCData {
  headings: TOCHeading[]
  hasContent: boolean
}

/**
 * Extract table of contents from MDX content
 * @param content - Raw MDX content string
 * @returns TOCData object with headings and metadata
 */
export function extractTableOfContents(content: string): TOCData {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: TOCHeading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length // Number of # characters
    const text = match[2].trim()

    // Skip headings that are inside code blocks
    const beforeMatch = content.substring(0, match.index)
    const codeBlockMatches = beforeMatch.match(/```/g)
    const isInsideCodeBlock = codeBlockMatches && codeBlockMatches.length % 2 === 1

    if (isInsideCodeBlock) {
      continue
    }

    // Remove markdown formatting from heading text
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1')     // Italic
      .replace(/`(.*?)`/g, '$1')       // Inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
      .replace(/[^\w\s\-\.]/g, '')     // Remove special chars except word chars, spaces, hyphens, dots
      .trim()

    // Generate anchor ID from heading text
    const anchor = cleanText
      .toLowerCase()
      .replace(/[^\w\s\-]/g, '')       // Remove non-word chars except spaces and hyphens
      .replace(/\s+/g, '-')            // Replace spaces with hyphens
      .replace(/-+/g, '-')             // Replace multiple hyphens with single
      .replace(/^-|-$/g, '')           // Remove leading/trailing hyphens

    if (anchor && level >= 1 && level <= 3) { // Only include h1, h2, h3
      headings.push({
        id: `toc-${headings.length + 1}`,
        level,
        text: cleanText,
        anchor: anchor
      })
    }
  }

  return {
    headings,
    hasContent: headings.length > 0
  }
}

/**
 * Generate TOC markdown from headings
 * @param headings - Array of TOC headings
 * @returns Markdown string for table of contents
 */
export function generateTOCMarkdown(headings: TOCHeading[]): string {
  if (headings.length === 0) return ''

  let tocMarkdown = '## Table of Contents\n\n'

  headings.forEach((heading) => {
    const indent = '  '.repeat(heading.level - 2) // Indent based on heading level
    tocMarkdown += `${indent}- [${heading.text}](#${heading.anchor})\n`
  })

  return tocMarkdown + '\n'
}

/**
 * Check if TOC should be enabled based on frontmatter and content
 * @param tocEnabled - toc value from frontmatter
 * @param headings - Extracted headings
 * @returns Boolean indicating if TOC should be shown
 */
export function shouldShowTOC(tocEnabled: boolean | undefined, headings: TOCHeading[]): boolean {
  // If explicitly disabled, don't show
  if (tocEnabled === false) return false

  // If explicitly enabled and has headings, show
  if (tocEnabled === true && headings.length > 0) return true

  // If not specified but has many headings, show by default
  if (tocEnabled === undefined && headings.length >= 3) return true

  return false
}

/**
 * Process content to add heading IDs for anchor links
 * Note: Since MDX has issues with {#id} syntax, we'll handle this in the component level
 * @param content - MDX content
 * @returns Content unchanged (IDs handled in components)
 */
export function addHeadingIds(content: string): string {
  // Return content unchanged - we'll handle IDs in React components
  return content
}