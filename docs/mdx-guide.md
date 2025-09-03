# 📝 MDX Blog Post Guide

This guide covers best practices for creating high-quality MDX blog posts using our enhanced template and components.

## 🎯 Overview

Our blog uses MDX (Markdown + JSX) which allows you to:
- Write in familiar Markdown syntax
- Use React components inline
- Create interactive and visually appealing content
- Maintain consistent styling and functionality

## 📋 Quick Start

1. **Copy the template**: Start with `/content/posts/_template.mdx`
2. **Update frontmatter**: Fill in all required fields
3. **Write your content**: Follow the structure guidelines
4. **Use components**: Leverage our custom components
5. **Test locally**: Run `npm run dev` to preview
6. **Publish**: Set `published: true` when ready

## 🗂️ Frontmatter Reference

### Required Fields

```yaml
title: "Your compelling title (under 60 chars)"
description: "SEO-friendly description (150-160 chars)"  
date: "2024-01-01T10:00:00.000Z"  # ISO format with timezone
tags: ["tag1", "tag2", "tag3"]     # Max 5 tags, lowercase
published: true                     # false for drafts
```

### Recommended Fields

```yaml
author: "Your Name"
category: "Development"             # Development, Tutorial, Opinion, etc.
featuredImage: "/images/slug.jpg"  # 1200x630 for social sharing
featuredImageAlt: "Alt text"
readingTime: "5 min read"          # Auto-calculated if omitted
```

### SEO Fields

```yaml
seo:
  canonical: "https://yourdomain.com/blog/slug"
  keywords: ["keyword1", "keyword2"]
  
twitter:
  card: "summary_large_image"
  site: "@yourhandle" 
```

### Optional Features

```yaml
toc: true           # Table of contents
newsletter: true    # Newsletter signup
comments: true      # Comments section
featured: false     # Feature on homepage
series: "Series"    # Series name
seriesOrder: 1      # Order in series
```

## 🎨 Custom Components

### Callouts

Use callouts to highlight important information:

```mdx
<Callout type="info">
💡 **Tip**: This is an informational callout with an icon.
</Callout>

<Callout type="warning">  
⚠️ **Warning**: This alerts users to potential issues.
</Callout>

<Callout type="error">
🚨 **Error**: This highlights critical problems.
</Callout>

<Callout type="success">
✅ **Success**: This celebrates achievements or best practices.
</Callout>
```

### Code Blocks

Enhanced code blocks with syntax highlighting and copy functionality:

```mdx
```javascript title="example.js" showLineNumbers
const exampleFunction = () => {
  console.log('This code block has a title and line numbers')
}
```

### Highlight Boxes

Create visually distinct content sections:

```mdx
<HighlightBox color="blue">
### 🚀 Pro Tips
- Important point #1
- Key insight #2  
- Expert advice #3
</HighlightBox>
```

Available colors: `blue`, `green`, `yellow`, `red`, `purple`

### YouTube Embeds

Embed YouTube videos responsively:

```mdx
<YouTube id="video-id" title="Optional title" />
```

### Custom Styling

Use Tailwind CSS classes in divs for custom layouts:

```mdx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">

<div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
Left column content
</div>

<div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">  
Right column content
</div>

</div>
```

## ✍️ Writing Best Practices

### Structure

1. **Hook**: Start with a compelling problem or question
2. **Overview**: Use a Callout to set expectations
3. **Content**: Break into logical sections with clear headings
4. **Examples**: Include practical, tested code examples
5. **Conclusion**: Summarize key points and next steps
6. **CTA**: End with engagement (comments, sharing, etc.)

### Content Guidelines

- **Length**: 1,500-3,000 words for technical content
- **Paragraphs**: Keep to 3-4 sentences maximum
- **Headings**: Use proper hierarchy (H1 > H2 > H3)
- **Lists**: Use bullets for easier scanning
- **Code**: Always test examples before publishing
- **Images**: Include descriptive alt text

### Tone and Style

- **Conversational**: Write like you're explaining to a friend
- **Clear**: Avoid jargon unless necessary (then define it)
- **Helpful**: Focus on solving problems
- **Actionable**: Include practical steps and examples
- **Inclusive**: Use "you" and "we" to include readers

## 🔤 Markdown Syntax

### Basic Formatting

```markdown
**Bold text**
*Italic text*  
~~Strikethrough~~
`Inline code`
[Link text](https://example.com)
```

### Lists

```markdown
- Unordered list item
- Another item
  - Nested item
  
1. Ordered list item
2. Second item
   1. Nested numbered item
```

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Data A   | Data B   | Data C   |
```

### Blockquotes

```markdown
> This is a blockquote
> It can span multiple lines
> 
> And include multiple paragraphs
```

## 🏷️ Tag Guidelines

### Tag Best Practices

- Use **lowercase** with dashes: `web-development`, `next-js`
- Maximum **5 tags** per post
- Be **specific**: `react-hooks` vs `react`  
- Use **consistent** terminology across posts
- Include **1-2 broad** tags and **2-3 specific** ones

### Common Tag Categories

**Languages**: `javascript`, `typescript`, `python`, `css`
**Frameworks**: `react`, `next-js`, `vue`, `svelte`  
**Topics**: `web-development`, `api-design`, `testing`, `performance`
**Levels**: `beginner`, `intermediate`, `advanced`
**Types**: `tutorial`, `guide`, `opinion`, `news`

## 🖼️ Images and Media

### Image Requirements

- **Featured images**: 1200x630px for social sharing
- **Content images**: Max 800px wide, optimized for web
- **Alt text**: Always include descriptive alt text
- **Format**: Use WebP when possible, fallback to PNG/JPG

### Image Organization

```
/public/images/
  /blog/
    /post-slug/
      hero.jpg
      diagram-1.png
      screenshot-2.jpg
```

### Image Usage

```mdx
<Image 
  src="/images/blog/post-slug/hero.jpg"
  alt="Descriptive alt text"
  width={800}
  height={400}
/>
```

## 🔍 SEO Best Practices

### Title Optimization

- **Length**: 50-60 characters
- **Keywords**: Include primary keyword naturally
- **Clarity**: Make it clear what the post covers
- **Uniqueness**: Don't duplicate existing titles

### Description Optimization  

- **Length**: 150-160 characters
- **Keywords**: Include 1-2 relevant keywords
- **Action**: Use active voice and action verbs
- **Value**: Clearly state what readers will gain

### Content SEO

- **Keywords**: Use naturally throughout content
- **Headings**: Include keywords in H2 and H3 tags
- **Links**: Link to related internal and external content
- **Structure**: Use proper heading hierarchy

## ✅ Pre-Publish Checklist

### Content Review

- [ ] Title is compelling and under 60 characters
- [ ] Description is clear and 150-160 characters  
- [ ] All frontmatter fields are completed
- [ ] Introduction hooks the reader
- [ ] Content follows logical structure
- [ ] Code examples are tested and working
- [ ] Grammar and spelling are correct

### Technical Check

- [ ] All links work correctly
- [ ] Images load and have alt text
- [ ] Post builds without errors
- [ ] Mobile formatting looks good
- [ ] Components render properly

### SEO Verification

- [ ] Primary keyword in title and description
- [ ] Keywords naturally integrated in content
- [ ] Proper heading hierarchy used
- [ ] Meta description is compelling
- [ ] Internal links are relevant

### Engagement

- [ ] Clear call-to-action at end
- [ ] Questions to encourage comments
- [ ] Social sharing encouragement  
- [ ] Related posts are linked

## 🚀 Publishing Workflow

1. **Draft**: Create with `published: false`
2. **Review**: Use the checklist above
3. **Test**: Preview locally with `npm run dev`
4. **Finalize**: Update `published: true`
5. **Deploy**: Commit and push changes
6. **Share**: Promote on social media
7. **Monitor**: Check analytics and engagement

## 🛠️ Local Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

### File Watching

The development server automatically:
- Rebuilds when files change
- Updates the browser
- Shows build errors
- Validates frontmatter

### Testing Posts

- Check responsive design on different screen sizes
- Test dark/light mode rendering  
- Verify all links and components work
- Review reading experience and flow

## 📊 Analytics and Performance

### Key Metrics to Track

- **Page views**: Overall traffic to posts
- **Time on page**: Engagement indicator  
- **Bounce rate**: Content relevance
- **Social shares**: Content virality
- **Comments**: Community engagement

### Performance Optimization

- **Images**: Use next/image for optimization
- **Code splitting**: Lazy load components
- **Bundle size**: Monitor JavaScript payload
- **Core Web Vitals**: Track loading performance

## 🤝 Community Guidelines

### Writing for Readers

- **Solve problems**: Address real challenges
- **Be inclusive**: Use welcoming language
- **Stay current**: Keep information up-to-date
- **Credit sources**: Link to references and inspiration
- **Encourage discussion**: Ask questions and respond to comments

### Content Standards

- **Accuracy**: Verify all technical information
- **Originality**: Don't copy content from other sources
- **Quality**: Maintain high writing and code standards
- **Respect**: Be respectful of different approaches and opinions

## 📚 Resources

### Writing Resources

- [Hemingway Editor](https://hemingwayapp.com/) - Improve readability
- [Grammarly](https://grammarly.com/) - Grammar and style checking
- [Unsplash](https://unsplash.com/) - Free high-quality images

### Technical Resources

- [MDX Documentation](https://mdxjs.com/) - Official MDX guide
- [Tailwind CSS](https://tailwindcss.com/) - Styling reference
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation

### SEO Tools

- [Google Search Console](https://search.google.com/search-console)
- [Ahrefs Keyword Generator](https://ahrefs.com/keyword-generator)  
- [Schema Markup Validator](https://validator.schema.org/)

---

## 🆘 Need Help?

If you run into issues or have questions:

1. **Check the template**: Reference `_template.mdx` for examples
2. **Review this guide**: Search for relevant sections
3. **Test locally**: Use `npm run dev` to debug
4. **Ask for help**: Reach out via [contact method]

**Happy writing!** 🎉