import Link from 'next/link'

export interface BreadcrumbItem {
  name: string
  href: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.href} className="flex items-center gap-1 sm:gap-2">
              {!isLast ? (
                <>
                  <Link
                    href={item.href}
                    className="text-slate-500 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors truncate max-w-[120px] sm:max-w-none"
                  >
                    {item.name}
                  </Link>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              ) : (
                <span
                  className="text-slate-800 dark:text-slate-100 font-medium truncate max-w-[180px] sm:max-w-[300px] md:max-w-none"
                  aria-current="page"
                >
                  {item.name}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
