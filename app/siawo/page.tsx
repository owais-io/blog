import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Siawo',
  description: 'Siawo page - coming soon.',
}

export default function SiawoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      <div className="mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden" style={{ aspectRatio: '1584/396' }}>
        <div className="flex w-full h-full" style={{ width: '100%', height: '396px', minHeight: '396px' }}>
          {/* Left section - 1/4 width */}
          <div className="w-1/4 p-8 flex flex-col justify-start">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">visit my blog</span>
              </div>
              <div className="relative">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  owais.io
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-700 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Right section - 3/4 width */}
          <div className="w-3/4 p-4 flex flex-col h-full">
            {/* Engineer Roles - Top */}
            <div className="grid grid-cols-3 gap-8 mb-6">
              {/* AIOps Engineer */}
              <div className="text-center space-y-3">
                <div className="w-full h-1 bg-blue-200 dark:bg-blue-800 rounded-full mb-4">
                  <div className="w-full h-1 bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AIOps</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">Engineer</p>
              </div>

              {/* DevSecOps Engineer */}
              <div className="text-center space-y-3">
                <div className="w-full h-1 bg-green-200 dark:bg-green-800 rounded-full mb-4">
                  <div className="w-full h-1 bg-green-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">DevSecOps</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">Engineer</p>
              </div>

              {/* Cloud Engineer */}
              <div className="text-center space-y-3">
                <div className="w-full h-1 bg-purple-200 dark:bg-purple-800 rounded-full mb-4">
                  <div className="w-full h-1 bg-purple-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Cloud</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300">Engineer</p>
              </div>
            </div>

            {/* Social Profiles - Bottom */}
            <div className="flex justify-center mt-12 items-center space-x-4">
              <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-lg">
                <svg className="w-3 h-3 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="font-medium text-gray-700 dark:text-gray-300">owais-io</span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-lg">
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                <span className="font-medium text-gray-700 dark:text-gray-300">owais_io</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Siawo
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Welcome to Siawo
            </p>
          </div>

          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <div className="grid gap-8 md:gap-12">
              <section>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                  Content coming soon...
                </p>
              </section>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}