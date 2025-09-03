import Link from 'next/link'

interface TagFilterProps {
  tags: string[]
  selectedTag?: string
}

export default function TagFilter({ tags, selectedTag }: TagFilterProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Tag</h3>
      
      <div className="space-y-2">
        <Link
          href="/"
          className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            !selectedTag
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          All Posts
        </Link>
        
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/?tag=${encodeURIComponent(tag)}`}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedTag === tag
                ? 'bg-blue-100 text-blue-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>
      
      {tags.length === 0 && (
        <p className="text-gray-500 text-sm">No tags available</p>
      )}
    </div>
  )
}