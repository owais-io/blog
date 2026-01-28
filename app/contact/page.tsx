import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Owais - reach out for collaborations, questions, or technology discussions.',
}

// Static page - no dynamic content
export const dynamic = 'force-static'

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Let's Connect
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              I'm always excited to connect with fellow developers, discuss new projects, or explore collaboration opportunities.
            </p>
          </div>

          <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6">Get In Touch</h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Email</h3>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">
                        Drop me a line for any inquiries or collaboration opportunities.
                      </p>
                      <a
                        href="mailto:owais.abbasi9@gmail.com"
                        className="mt-2 inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                      >
                        owais.abbasi9@gmail.com
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">GitHub</h3>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">
                        Check out my projects, contributions, and code examples.
                      </p>
                      <a
                        href="https://github.com/owais-io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                      >
                        github.com/owais-io
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Twitter */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Twitter</h3>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">
                        Follow for tech insights, updates, and quick discussions.
                      </p>
                      <a
                        href="https://twitter.com/owais_io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                      >
                        @owais_io
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/50 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">LinkedIn</h3>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">
                        Connect professionally and explore collaboration opportunities.
                      </p>
                      <a
                        href="https://www.linkedin.com/in/owais-io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                      >
                        linkedin.com/in/owais-io
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Response Time</h3>
                      <p className="mt-1 text-slate-600 dark:text-slate-300">
                        I typically respond within 24-48 hours during weekdays.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* What I'm Looking For */}
              <section className="border-t border-slate-200 dark:border-slate-600 pt-8">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">What I'm Interested In</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                    <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">🤝 Collaborations</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Open source projects, technical writing, or AI/DevOps implementations
                    </p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                    <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">💡 Discussions</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      AIOps, cloud architecture, automation, or emerging technologies
                    </p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                    <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">🎓 Learning</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Knowledge sharing, mentoring, or exploring new tech stacks
                    </p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
                    <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">🚀 Opportunities</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Consulting, technical advisory, or interesting project partnerships
                    </p>
                  </div>
                </div>
              </section>

              {/* Quick Contact Links */}
              <section className="border-t border-slate-200 dark:border-slate-600 pt-8">
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-6 text-center">Ready to Connect?</h2>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="mailto:owais.abbasi9@gmail.com?subject=Quick Contact from Blog"
                    className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send Email
                  </a>
                  <a
                    href="https://twitter.com/owais_io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Follow Twitter
                  </a>
                  <a
                    href="https://github.com/owais-io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-500 transition-colors focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/owais-io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect LinkedIn
                  </a>
                </div>
              </section>
            </div>
        </div>
      </div>
    </div>
  )
}
