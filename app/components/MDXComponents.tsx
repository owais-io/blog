import Image from 'next/image'
import Link from 'next/link'
import CodeBlock from './CodeBlock'

// Utility function to generate heading IDs
function generateHeadingId(text: string): string {
  if (!text) return ''

  return text
    .toLowerCase()
    .replace(/[^\w\s\-]/g, '') // Remove special chars except word chars, spaces, hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .replace(/^-|-$/g, '')     // Remove leading/trailing hyphens
}

export const mdxComponents = {
  // Custom components
  Image: (props: any) => (
    <Image
      {...props}
      className="rounded-lg shadow-md my-8"
      width={800}
      height={400}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  ),
  
  // Override default HTML elements with automatic ID generation
  h1: (props: any) => {
    const text = typeof props.children === 'string' ? props.children : ''
    const id = props.id || generateHeadingId(text)

    return (
      <h1
        id={id}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-8 first:mt-0 scroll-mt-24"
        {...props}
      >
        {props.children}
      </h1>
    )
  },

  h2: (props: any) => {
    const text = typeof props.children === 'string' ? props.children : ''
    const id = props.id || generateHeadingId(text)

    return (
      <h2
        id={id}
        className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 mt-8 scroll-mt-24"
        {...props}
      >
        {props.children}
      </h2>
    )
  },

  h3: (props: any) => {
    const text = typeof props.children === 'string' ? props.children : ''
    const id = props.id || generateHeadingId(text)

    return (
      <h3
        id={id}
        className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6 scroll-mt-24"
        {...props}
      >
        {props.children}
      </h3>
    )
  },

  h4: (props: any) => {
    const text = typeof props.children === 'string' ? props.children : ''
    const id = props.id || generateHeadingId(text)

    return (
      <h4
        id={id}
        className="text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-4 scroll-mt-24"
        {...props}
      >
        {props.children}
      </h4>
    )
  },
  
  p: (props: any) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
  ),
  
  a: (props: any) => {
    // Check if it's an external link
    const isExternal = props.href?.startsWith('http')
    
    if (isExternal) {
      return (
        <a
          {...props}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
          target="_blank"
          rel="noopener noreferrer"
        />
      )
    }
    
    return (
      <Link
        href={props.href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
        {...props}
      />
    )
  },
  
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  
  li: (props: any) => (
    <li className="text-gray-700 dark:text-gray-300" {...props} />
  ),
  
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 mb-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-r-lg" {...props} />
  ),
  
  code: (props: any) => {
    // For inline code, let CSS handle styling to avoid conflicts
    return <code {...props} />
  },
  
  pre: (props: any) => (
    <CodeBlock {...props} />
  ),
  
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  
  thead: (props: any) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props} />
  ),
  
  tbody: (props: any) => (
    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" {...props} />
  ),
  
  th: (props: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />
  ),
  
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300" {...props} />
  ),
  
  hr: (props: any) => (
    <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
  ),
  
  // Custom div with className support for MDX
  div: (props: any) => {
    // Pass through className and other props for custom styling
    return <div {...props} />
  },

  // Enhanced callout component
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'error' | 'success' }) => {
    const styles = {
      info: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        border: 'border-blue-200 dark:border-blue-700',
        text: 'text-blue-800 dark:text-blue-200',
        icon: '💡'
      },
      warning: {
        bg: 'bg-yellow-50 dark:bg-yellow-900/20',
        border: 'border-yellow-200 dark:border-yellow-700',
        text: 'text-yellow-800 dark:text-yellow-200',
        icon: '⚠️'
      },
      error: {
        bg: 'bg-red-50 dark:bg-red-900/20',
        border: 'border-red-200 dark:border-red-700',
        text: 'text-red-800 dark:text-red-200',
        icon: '🚨'
      },
      success: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        border: 'border-green-200 dark:border-green-700',
        text: 'text-green-800 dark:text-green-200',
        icon: '✅'
      }
    }
    
    const currentStyle = styles[type]
    
    return (
      <div className={`border-l-4 p-4 mb-6 rounded-r-lg ${currentStyle.bg} ${currentStyle.border} ${currentStyle.text}`}>
        <div className="flex items-start space-x-3">
          <span className="text-lg flex-shrink-0 mt-0.5">{currentStyle.icon}</span>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    )
  },

  // YouTube component
  YouTube: ({ id, title }: { id: string; title?: string }) => (
    <div className="my-8">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${id}`}
          title={title || 'YouTube video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  ),

  // Highlight box component
  HighlightBox: ({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' }) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
      yellow: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
      red: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700'
    }
    
    return (
      <div className={`p-6 rounded-lg border-2 my-6 ${colors[color]}`}>
        {children}
      </div>
    )
  },
}