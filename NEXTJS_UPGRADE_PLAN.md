# Next.js 14 → 16 Upgrade Plan

## Context
The blog (owais.io) runs Next.js 14.2.32 with React 18, deployed as a static export to S3+CloudFront. `npm audit` flagged high-severity DoS vulnerabilities in Next.js that are only fully resolved by upgrading to v16. While the static deployment makes these CVEs non-exploitable, the user wants to upgrade anyway.

## Prerequisites
- **Node.js 20.9+ required** — currently on v18.19.1. Must upgrade via nvm before anything else.
- Next.js 16 **requires React 19** — React 18 is not supported.

## Step-by-step Plan

### 1. Upgrade Node.js locally
Run `nvm install 22` and `nvm use 22` (Node 22 LTS for longest support).

### 2. Update package.json dependencies
Update versions in `package.json`:

| Package | Current | Target |
|---------|---------|--------|
| `next` | ^14.2.32 | ^16.1.6 |
| `react` | ^18 | ^19 |
| `react-dom` | ^18 | ^19 |
| `@next/mdx` | ^14.2.5 | ^16.1.6 |
| `@next/third-parties` | ^15.5.4 | ^16.1.6 |
| `@types/react` | ^18 | ^19 |
| `@types/react-dom` | ^18 | ^19 |

Keep all other deps as-is (next-themes, next-mdx-remote, tailwind, etc.).

Run `npm install --legacy-peer-deps` (needed because next-themes declares React 18 as peer dep but works fine with 19 at runtime).

### 3. Fix async params in `app/blog/[slug]/page.tsx`
This is the **only** breaking code change. Next.js 16 requires `params` to be a Promise.

Changes needed:
- Change interface: `params: { slug: string }` → `params: Promise<{ slug: string }>`
- Make `BlogPostPage` function async, add `const { slug } = await params` at top
- Make `generateMetadata` use `const { slug } = await params` (function is already async)
- Replace all `params.slug` references with `slug` (lines 33, 61, 67, 68, 71, 119)

Note: `app/series/[slug]/page.tsx` already uses async params — no changes needed.

### 4. Update lint script in `package.json`
Next.js 16 removed the `next lint` command.

Change: `"lint": "next lint"` → `"lint": "eslint ."`

### 5. Create `eslint.config.mjs` at project root
Since there's no existing ESLint config, create a flat config file:
```js
import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat();
export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/", "out/", "node_modules/"] },
];
```

Install `@eslint/eslintrc` as a dev dependency if not already present.

### 6. Update GitHub Actions workflow
**File: `.github/workflows/deploy.yml`**

Change `node-version: '18'` → `node-version: '22'`

### 7. Verify and test
- `npm run build` — confirm static export generates `out/` correctly
- `npm run lint` — confirm ESLint works with new config
- `npm run dev` — spot-check homepage, a blog post, and series page

## Files to modify
1. `package.json` — dependency versions + lint script
2. `app/blog/[slug]/page.tsx` — async params migration
3. `.github/workflows/deploy.yml` — Node version bump
4. `eslint.config.mjs` — new file (ESLint flat config)

## Risks
- **Static export RSC 404 bug** ([#85374](https://github.com/vercel/next.js/issues/85374)): There's an open issue where `<Link>` prefetching fails with 404s on static exports in Next.js 16. Full page loads still work. We'll test during build and address if it manifests. For a blog, this is tolerable even if it occurs.
- **next-themes peer dep**: Only a warning during install, works at runtime with React 19.
