import Image from 'next/image'
import Link from 'next/link'

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
  
  // Override default HTML elements
  h1: (props: any) => (
    <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0" {...props} />
  ),
  
  h2: (props: any) => (
    <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8" {...props} />
  ),
  
  h3: (props: any) => (
    <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6" {...props} />
  ),
  
  h4: (props: any) => (
    <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4" {...props} />
  ),
  
  p: (props: any) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props} />
  ),
  
  a: (props: any) => {
    // Check if it's an external link
    const isExternal = props.href?.startsWith('http')
    
    if (isExternal) {
      return (
        <a
          {...props}
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        />
      )
    }
    
    return (
      <Link
        href={props.href}
        className="text-blue-600 hover:text-blue-800 underline"
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
    <li className="text-gray-700" {...props} />
  ),
  
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 bg-gray-50 rounded-r-lg" {...props} />
  ),
  
  code: (props: any) => {
    // Check if it's inline code or code block
    if (typeof props.children === 'string' && !props.children.includes('\n')) {
      return (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800" {...props} />
      )
    }
    
    return (
      <code className="font-mono" {...props} />
    )
  },
  
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm" {...props} />
  ),
  
  table: (props: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-200" {...props} />
    </div>
  ),
  
  thead: (props: any) => (
    <thead className="bg-gray-50" {...props} />
  ),
  
  tbody: (props: any) => (
    <tbody className="bg-white divide-y divide-gray-200" {...props} />
  ),
  
  th: (props: any) => (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />
  ),
  
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" {...props} />
  ),
  
  hr: (props: any) => (
    <hr className="my-8 border-gray-200" {...props} />
  ),
  
  // Custom callout component
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'error' | 'success' }) => {
    const styles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800',
    }
    
    return (
      <div className={`border-l-4 p-4 mb-6 rounded-r-lg ${styles[type]}`}>
        {children}
      </div>
    )
  },
}