# Claude Code Blog Writing Guidelines

This document contains important guidelines for creating MDX blog posts to prevent parsing errors and ensure consistent quality.

## 🚨 Critical MDX Rules

### ❌ NEVER use double curly braces in JSX `<code>` elements:
```jsx
// This WILL cause MDX parsing errors:
<td><code>{{key: "value"}}</code></td>
<td><code>{{"name": "John"}}</code></td>
```

### ✅ Safe alternatives:

**Option 1: Template literals with backticks**
```jsx
<td><code>{`{key: "value"}`}</code></td>
<td><code>{`{"name": "John"}`}</code></td>
```

**Option 2: Markdown code blocks (preferred for JSON examples)**
````markdown
```json
{
  "key": "value",
  "name": "John"
}
```
````

**Option 3: HTML entities**
```jsx
<td><code>&lbrace;&lbrace;key: "value"&rbrace;&rbrace;</code></td>
```

## 📝 Content Guidelines

### For Code Examples
- **JSON/Object examples**: Always use markdown code blocks with language syntax highlighting
- **Short inline code**: Use `<code>` tags with template literals if curly braces needed
- **Complex examples**: Create separate files and import them

### For Tables with Code
- Prefer markdown tables when possible
- If using HTML tables, use template literals for any code containing `{}`
- Test locally before committing

### For Terminal/Command Examples
- Use markdown code blocks with `bash` syntax highlighting
- Include clear comments explaining what each command does
- Show both the command and expected output

## 🔧 Development Workflow

### Pre-commit Protection
- Pre-commit hook automatically scans for dangerous patterns
- Will block commits containing `<code>{{...}}</code>` patterns
- Follow the suggested fixes when hook triggers

### Testing New Posts
1. Create the MDX file
2. Test locally with `npm run dev`
3. Check the URL loads without 500 errors
4. Commit (pre-commit hook will validate)

### Commands to Remember
```bash
# Start development server
npm run dev

# Test specific blog post
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/blog/your-post-slug

# Lint and typecheck (run before finalizing)
npm run lint
npm run build
```

## 🎯 Quality Checklist for New Posts

- [ ] All JSON examples use markdown code blocks
- [ ] No `<code>{{...}}</code>` patterns in JSX
- [ ] Post loads locally without 500 errors
- [ ] Pre-commit hook passes
- [ ] Images have alt text
- [ ] Code examples are tested and work
- [ ] SEO metadata is complete

## 🚀 Best Practices

### Structure
- Start with clear introduction and what readers will learn
- Use consistent heading hierarchy (##, ###)
- Include practical examples throughout
- End with summary or next steps

### Code Quality
- Test all code examples before publishing
- Include error handling where relevant
- Show both success and failure scenarios
- Use realistic data in examples

### SEO & Readability
- Use descriptive headings and subheadings
- Include relevant tags and categories
- Write meta descriptions that summarize content
- Use callouts for important information

---

**Remember**: The pre-commit hook is your safety net, but following these guidelines prevents issues entirely. When in doubt, use markdown code blocks for any JSON or object examples.