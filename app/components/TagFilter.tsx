import Link from 'next/link'

interface TagFilterProps {
  tags: string[]
  selectedTag?: string
  basePath?: string
}

export default function TagFilter({ tags, selectedTag, basePath = '/tags' }: TagFilterProps) {
  return (
    <div className="bg-slate-700 rounded-lg border border-slate-600 p-6">
      <h3 className="text-lg font-semibold text-slate-100 mb-4">Filter by Tag</h3>

      <div className="space-y-2">
        <Link
          href={basePath}
          className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            !selectedTag
              ? 'bg-cyan-900 text-cyan-300'
              : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-500'
          }`}
        >
          All Posts
        </Link>

        {tags.map((tag) => (
          <Link
            key={tag}
            href={`${basePath}?tag=${encodeURIComponent(tag)}`}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTag === tag
                ? 'bg-cyan-900 text-cyan-300'
                : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-500'
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>

      {tags.length === 0 && (
        <p className="text-slate-400 text-sm">No tags available</p>
      )}
    </div>
  )
}
