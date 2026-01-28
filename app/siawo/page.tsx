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
      <div className="mb-8 bg-slate-700 border border-slate-600 rounded-xl shadow-sm overflow-hidden" style={{ aspectRatio: '1584/396' }}>
        <div className="flex w-full h-full" style={{ width: '100%', height: '396px', minHeight: '396px' }}>
          {/* Left section - 1/4 width */}
          <div className="w-1/4 p-8 flex flex-col justify-start">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-slate-700 rounded-full">
                <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm font-medium text-slate-300">visit my blog</span>
              </div>
              <div className="relative">
                <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  owais.io
                </div>
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 rounded-full opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Right section - 3/4 width */}
          <div className="w-3/4 p-4 flex flex-col h-full">
            {/* Engineer Role - Top */}
            <div className="flex justify-center mb-6">
              <div className="text-center space-y-3">
                <div className="w-full h-1 bg-cyan-800 rounded-full mb-4">
                  <div className="w-full h-1 bg-cyan-500 rounded-full"></div>
                </div>
                <div className="w-12 h-12 mx-auto bg-cyan-900/50 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-4xl font-bold text-slate-100">DevOps Engineer</h3>
                <p className="text-2xl text-slate-300">Kubestronaut track</p>
              </div>
            </div>

            {/* Contact Info - Bottom */}
            <div className="flex justify-center mt-6 items-center flex-wrap gap-4">
              <div className="flex items-center space-x-1 px-2 py-1 bg-slate-700 rounded text-lg">
                <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-slate-300">owais.abbasi9@gmail.com</span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-slate-700 rounded text-lg">
                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium text-slate-300">+92-301-2316329</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
