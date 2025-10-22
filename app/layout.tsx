import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import { ThemeProvider } from './components/ThemeProvider'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

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
  other: {
    'google-adsense-account': 'ca-pub-2882914404730852',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2882914404730852"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
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
                <div className="flex justify-center gap-4 mt-3 mb-4 text-sm">
                  <a href="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Privacy Policy
                  </a>
                  <span>•</span>
                  <a href="/about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    About
                  </a>
                  <span>•</span>
                  <a href="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Contact
                  </a>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <a
                    href="https://linkedin.com/in/owais-io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/owais-io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-GTL0QED6PK" />
      </body>
    </html>
  )
}