import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import { ThemeProvider } from './components/ThemeProvider'
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: {
    default: 'Owais.io - Personal Blog',
    template: '%s | Owais.io'
  },
  description: 'Personal blog and portfolio of Owais - sharing thoughts on technology, development, and life.',
  keywords: ['blog', 'technology', 'development', 'programming', 'personal'],
  authors: [{ name: 'Owais' }],
  creator: 'Owais',
  publisher: 'Owais',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://owais.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://owais.io',
    title: 'Owais.io - Personal Blog',
    description: 'Personal blog and portfolio of Owais - sharing thoughts on technology, development, and life.',
    siteName: 'Owais.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Owais.io - Personal Blog',
    description: 'Personal blog and portfolio of Owais - sharing thoughts on technology, development, and life.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="owais-blog-theme"
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} owais.io. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-GTL0QED6PK" />
      </body>
    </html>
  )
}