import Link from 'next/link'

interface TagFilterProps {
  tags: string[]
  selectedTag?: string
}

export default function TagFilter({ tags, selectedTag }: TagFilterProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filter by Tag</h3>
      
      <div className="space-y-2">
        <Link
          href="/"
          className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            !selectedTag
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
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
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>
      
      {tags.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm">No tags available</p>
      )}
    </div>
  )
}