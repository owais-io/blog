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
      <div className={`p-6 rounded-lg border-2 my-6 text-gray-900 dark:text-gray-100 ${colors[color]}`}>
        {children}
      </div>
    )
  },

  // Gradient box component for gradient backgrounds
  GradientBox: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg my-6">
        {children}
      </div>
    )
  },

  // Diagram Components - Mobile-first responsive design
  DiagramBox: ({ children, color = 'blue', className = '' }: { children: React.ReactNode; color?: 'blue' | 'green' | 'purple' | 'gray' | 'yellow'; className?: string }) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100',
      green: 'bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100',
      purple: 'bg-purple-100 dark:bg-purple-900/40 border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-100',
      gray: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100',
      yellow: 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100',
    }

    return (
      <div className={`border-2 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-center text-sm sm:text-base font-medium ${colors[color]} ${className}`}>
        {children}
      </div>
    )
  },

  Arrow: ({ direction = 'down', label }: { direction?: 'up' | 'down' | 'left' | 'right'; label?: string }) => {
    const arrows = {
      up: '↑',
      down: '↓',
      left: '←',
      right: '→',
    }

    const directionClasses = {
      up: 'flex-col-reverse items-center',
      down: 'flex-col items-center',
      left: 'flex-row-reverse items-center justify-center',
      right: 'flex-row items-center justify-center',
    }

    return (
      <div className={`flex ${directionClasses[direction]} gap-1 sm:gap-2 my-2 sm:my-3`}>
        <span className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-400 font-bold">
          {arrows[direction]}
        </span>
        {label && (
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic">
            {label}
          </span>
        )}
      </div>
    )
  },

  FlowDiagram: ({ children, title, className = '' }: { children: React.ReactNode; title?: string; className?: string }) => {
    return (
      <div className={`my-6 sm:my-8 ${className}`}>
        {title && (
          <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 text-center">
            {title}
          </h4>
        )}
        <div className="bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 overflow-x-auto">
          <div className="flex flex-col items-center min-w-min">
            {children}
          </div>
        </div>
      </div>
    )
  },

  ProcessGroup: ({ children, title }: { children: React.ReactNode; title: string }) => {
    return (
      <div className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 sm:p-4 my-3 sm:my-4 bg-white dark:bg-gray-900">
        <div className="text-sm sm:text-base font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
          {title}
        </div>
        <div className="space-y-2">
          {children}
        </div>
      </div>
    )
  },

  ProcessItem: ({ children, port }: { children: React.ReactNode; port?: string }) => {
    return (
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-700 dark:text-gray-300 px-2 sm:px-3 py-1 sm:py-2 bg-gray-50 dark:bg-gray-800 rounded">
        <span>{children}</span>
        {port && <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{port}</span>}
      </div>
    )
  },

  Timeline: ({ children, title }: { children: React.ReactNode; title?: string }) => {
    return (
      <div className="my-6 sm:my-8">
        {title && (
          <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
            {title}
          </h4>
        )}
        <div className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 sm:pl-6 space-y-4 sm:space-y-6">
          {children}
        </div>
      </div>
    )
  },

  TimelineItem: ({ time, children, status }: { time: string; children: React.ReactNode; status?: 'success' | 'error' | 'warning' | 'info' }) => {
    const statusColors = {
      success: 'bg-green-500 dark:bg-green-600',
      error: 'bg-red-500 dark:bg-red-600',
      warning: 'bg-yellow-500 dark:bg-yellow-600',
      info: 'bg-blue-500 dark:bg-blue-600',
    }

    return (
      <div className="relative">
        <div className={`absolute -left-[1.65rem] sm:-left-[2.15rem] w-3 h-3 sm:w-4 sm:h-4 rounded-full ${status ? statusColors[status] : 'bg-gray-400 dark:bg-gray-500'} border-2 sm:border-4 border-gray-50 dark:border-gray-900`} />
        <div className="text-xs sm:text-sm font-mono text-gray-600 dark:text-gray-400 mb-1">
          {time}
        </div>
        <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
          {children}
        </div>
      </div>
    )
  },

  ComparisonBox: ({ children, title, type = 'good' }: { children: React.ReactNode; title: string; type?: 'good' | 'bad' | 'neutral' }) => {
    const styles = {
      good: {
        border: 'border-green-300 dark:border-green-700',
        bg: 'bg-green-50 dark:bg-green-900/20',
        title: 'text-green-800 dark:text-green-200',
        icon: '✅'
      },
      bad: {
        border: 'border-red-300 dark:border-red-700',
        bg: 'bg-red-50 dark:bg-red-900/20',
        title: 'text-red-800 dark:text-red-200',
        icon: '❌'
      },
      neutral: {
        border: 'border-gray-300 dark:border-gray-600',
        bg: 'bg-gray-50 dark:bg-gray-800/50',
        title: 'text-gray-800 dark:text-gray-200',
        icon: '📋'
      }
    }

    const currentStyle = styles[type]

    return (
      <div className={`border-2 ${currentStyle.border} ${currentStyle.bg} rounded-lg p-4 sm:p-6 my-4 sm:my-6`}>
        <div className={`flex items-center gap-2 text-base sm:text-lg font-semibold ${currentStyle.title} mb-3 sm:mb-4`}>
          <span className="text-lg sm:text-xl">{currentStyle.icon}</span>
          <span>{title}</span>
        </div>
        <div className="text-sm sm:text-base text-gray-800 dark:text-gray-200 space-y-2">
          {children}
        </div>
      </div>
    )
  },

  SplitDiagram: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-8">
        {children}
      </div>
    )
  },

  CodeLabel: ({ children }: { children: React.ReactNode }) => {
    return (
      <span className="font-mono text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
        {children}
      </span>
    )
  },
}