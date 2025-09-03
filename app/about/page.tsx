import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Owais - developer, writer, and technology enthusiast.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-12">
          {/* Header with profile image */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-6">
              <Image
                src="/profile.jpg"
                alt="Owais"
                width={120}
                height={120}
                className="rounded-full mx-auto object-cover shadow-md"
                priority
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Hi, I'm Owais! Welcome to my corner of the internet where I share my thoughts on technology, development, and life.
            </p>
          </div>

          {/* Content sections */}
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            <div className="grid gap-8 md:gap-12">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Who I Am</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a passionate software developer with a love for creating meaningful digital experiences. 
                  My journey in technology has taken me through various domains, from web development to 
                  system architecture, always with a focus on building solutions that make a difference.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What I Do</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Currently, I work as a full-stack developer, crafting applications with modern technologies 
                  like React, Next.js, Node.js, and various cloud platforms. I'm particularly interested in:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Modern web development and user experience design</li>
                  <li>Cloud architecture and scalable system design</li>
                  <li>Open source contributions and community building</li>
                  <li>Continuous learning and sharing knowledge</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why I Write</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  This blog serves as my digital notebook where I document my learning journey, share 
                  insights from projects I've worked on, and explore new technologies. Writing helps me 
                  organize my thoughts and hopefully provides value to others facing similar challenges.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Beyond Code</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me reading about emerging technologies, contributing to 
                  open source projects, or exploring new places. I believe in maintaining a healthy 
                  work-life balance and am always curious about how technology can improve our daily lives.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Get In Touch</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  I'm always interested in connecting with fellow developers, discussing new projects, 
                  or simply having a conversation about technology. Feel free to reach out!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:hello@owais.io"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                  <a
                    href="https://github.com/owais"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com/owais"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}