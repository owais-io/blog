# 🚀 MDX Quick Reference Card

## 📋 Essential Frontmatter

```yaml
---
title: "Compelling Title (Under 60 Chars)"
description: "Clear description for SEO (150-160 chars)"
tags: ["tag1", "tag2", "tag3"]
author: "Your Name"
category: "Development"
published: true

# OPTIONAL: date auto-generated from file timestamp if omitted
# date: "2024-01-01T10:00:00.000Z"
---
```

## 🎨 Custom Components

### Callouts
```mdx
<Callout type="info">💡 **Tip**: Information</Callout>
<Callout type="warning">⚠️ **Warning**: Be careful</Callout>
<Callout type="error">🚨 **Error**: Critical issue</Callout>
<Callout type="success">✅ **Success**: Great job!</Callout>
```

### Code Blocks
```mdx
```javascript title="example.js" showLineNumbers
const example = () => console.log('Hello!')
```
```

### Highlight Boxes
```mdx
<HighlightBox color="blue">
### 🚀 Pro Tips
- Important point
- Key insight
</HighlightBox>
```

### YouTube
```mdx
<YouTube id="video-id" title="Optional title" />
```

### Custom Layout
```mdx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

## 📝 Common Patterns

### Post Structure
1. Hook (problem/question)
2. Overview callout
3. Main content sections
4. Practical examples
5. Key takeaways
6. Next steps
7. Call-to-action

### Section Headers
```mdx
## 🏗️ Main Section
### Subsection Name
#### Implementation Details
```

### Code Examples
```mdx
```typescript title="types.ts" showLineNumbers
interface User {
  id: string
  name: string
}
```

<Callout type="success">
✅ **Best Practice**: Always include TypeScript types
</Callout>
```

### Comparison Boxes
```mdx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">

#### ❌ Don't Do This
```javascript
// Bad example
```

</div>

<div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">

#### ✅ Do This Instead  
```javascript
// Good example
```

</div>

</div>
```

### Key Takeaways
```mdx
<div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 p-6 rounded-lg my-8">

### ✅ Key Points
1. **Main concept**: Brief explanation
2. **Best practice**: Key recommendation
3. **Common mistake**: What to avoid

</div>
```

## 🏷️ Tag Guidelines

**Format**: lowercase-with-dashes
**Max**: 5 tags per post
**Mix**: 1-2 broad + 2-3 specific

Common tags:
- `javascript`, `typescript`, `react`, `next-js`
- `web-development`, `tutorial`, `best-practices`
- `beginner`, `intermediate`, `advanced`

## 📊 Content Types

### Tutorial Posts
```mdx
<Callout type="info">
🎯 **What You'll Build**: [End result]
**Prerequisites**: [Required knowledge]  
**Time**: ~X minutes
</Callout>
```

### Guide Posts
```mdx
<Callout type="info">
📚 **What You'll Learn**:
- Key concept #1
- Important skill #2
- Advanced technique #3
</Callout>
```

### Opinion Posts
```mdx
<Callout type="warning">
💭 **Disclaimer**: This is my personal opinion based on [experience/research]. Your mileage may vary.
</Callout>
```

## 🖼️ Images

```mdx
<Image 
  src="/images/blog/slug/hero.jpg"
  alt="Descriptive alt text"
  width={800}
  height={400}
/>
```

**Requirements**:
- Featured: 1200x630px
- Content: Max 800px wide
- Always include alt text
- Store in `/public/images/blog/post-slug/`

## 🔗 Links

```mdx
[Internal link](/other-post)
[External link](https://example.com)
```

Internal links automatically use Next.js Link component.

## ✅ Quick Checklist

**Before Publishing**:
- [ ] Title under 60 chars
- [ ] Description 150-160 chars  
- [ ] All required frontmatter
- [ ] Code examples tested
- [ ] Images have alt text
- [ ] Links work
- [ ] Builds locally
- [ ] Grammar checked

**SEO Check**:
- [ ] Keyword in title
- [ ] Keywords in content
- [ ] Proper heading hierarchy
- [ ] Meta description compelling

## 🛠️ Commands

```bash
# Start development
npm run dev

# Build for production  
npm run build

# Check for errors
npm run lint
```

## 📱 Responsive Design

Use Tailwind responsive classes:
```mdx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Content adapts to screen size -->
</div>
```

## 🎯 Call-to-Action Examples

```mdx
<Callout type="success">
💬 **Your Turn**: Have you tried this approach? Share your experience in the comments!
</Callout>
```

```mdx
<div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mt-8">

**📬 Stay Updated**: Get weekly tutorials and insights delivered to your inbox.

[Subscribe to Newsletter →](link)

</div>
```

---

**Need more details?** Check the full [MDX Guide](./mdx-guide.md) for comprehensive documentation.