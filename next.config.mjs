import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static HTML export
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    unoptimized: true, // Required for static export (next/image won't optimize)
  },
  // Optional: Add trailing slashes for better S3 compatibility
  trailingSlash: true,
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig)