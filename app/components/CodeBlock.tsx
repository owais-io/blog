'use client'

import { ReactNode } from 'react'
import CopyButton from './CopyButton'

interface CodeBlockProps {
  children: ReactNode
  className?: string
  [key: string]: any
}

export default function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  // Extract the text content from children for copying
  const getTextContent = (node: ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return node.toString()
    if (Array.isArray(node)) return node.map(getTextContent).join('')
    if (node && typeof node === 'object' && 'props' in node) {
      return getTextContent(node.props.children)
    }
    return ''
  }

  const codeText = getTextContent(children)

  return (
    <div className="relative group">
      <pre 
        className={`bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto mb-6 text-sm ${className || ''}`}
        {...props}
      >
        {children}
      </pre>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <CopyButton text={codeText} />
      </div>
    </div>
  )
}