import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Sponsors',
  description: 'Supporting partners who make this blog possible. Learn about Al Nafi International College and their UK-accredited tech diplomas.',
}

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section - Mobile First */}
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-850 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Our Sponsors
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're proud to partner with organizations that share our commitment to advancing tech education and careers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sponsor Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sponsor Card - Mobile First Design */}
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 rounded-2xl border-2 border-blue-300 dark:border-blue-800 p-6 sm:p-8 lg:p-12 shadow-2xl">

            {/* Logo Section */}
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-block bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg mb-6">
                <Image
                  src="/images/Alnafi-International-College-Logo.webp"
                  alt="Al Nafi International College"
                  width={300}
                  height={120}
                  className="max-w-full h-auto"
                  priority
                />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Al Nafi International College
              </h2>
              <p className="text-base sm:text-lg text-blue-600 dark:text-blue-400 font-semibold">
                UK-Accredited Tech Education • Pearson & EduQual Endorsed
              </p>
            </div>

            {/* Main Description */}
            <div className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none mb-8 sm:mb-10">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center mb-6">
                Al Nafi International College offers online courses, certificates, and diplomas in emerging technology fields.
                They provide <strong>job-ready skills</strong> and practical training aligned with industry requirements.
              </p>
            </div>

            {/* Tech Specializations */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                Available Programs
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                <span className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  🤖 Artificial Intelligence
                </span>
                <span className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  ⚙️ DevOps
                </span>
                <span className="bg-gradient-to-r from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 text-cyan-700 dark:text-cyan-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  🔧 SysOps
                </span>
                <span className="bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  🔒 Cyber Security
                </span>
                <span className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  ☁️ Cloud Computing
                </span>
                <span className="bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  🛡️ Offensive Security
                </span>
                <span className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  ⛓️ Blockchain
                </span>
                <span className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  🔐 DevSecOps
                </span>
                <span className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 text-violet-700 dark:text-violet-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  🚀 DevSysOps
                </span>
                <span className="bg-gradient-to-r from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full font-medium text-sm sm:text-base">
                  🤖 AIOps
                </span>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8 sm:mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
                What Makes It Special
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Feature Cards */}
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">🎓</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                        UK-Accredited Diplomas
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Recognized certifications through Pearson and EduQual awarding bodies
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">🌍</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                        Global Accessibility
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Available online in 17+ languages, study from anywhere in the world
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">💼</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                        Job Placement Support
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Resume building, interview preparation, and 90-day success plan after landing a role
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-orange-200 dark:border-orange-800">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">✈️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                        Student Visa Guidance
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Free immigration assistance for Master&apos;s programs in UK, USA, Canada, and more
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-teal-200 dark:border-teal-800">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">📜</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                        Internship Experience
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        1-year internship experience letter included while you study, no hidden costs
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl">⚡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                        Industry-Aligned Training
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Practical, hands-on training designed to meet current industry demands
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Box */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-6 sm:p-8 text-center mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                💡 Not Just a Diploma—A Career Accelerator
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6">
                Join thousands of students worldwide who are transforming their tech careers with Al Nafi International College
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a
                  href="https://alnafi.com/?al_aid=6d5529727bec42a"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center text-sm sm:text-base">
                    Start Your Free 7-Day Trial
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-4">
                No credit card required • Start learning today • Cancel anytime
              </p>
            </div>

            {/* Why We Partner */}
            <div className="text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 italic">
                We partner with Al Nafi International College because they share our mission of making quality tech education
                accessible to everyone, everywhere. Their practical, industry-focused approach aligns perfectly with the
                hands-on learning philosophy we promote on this blog.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Sponsor Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Interested in Sponsoring?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
            If you&apos;re interested in becoming a sponsor and reaching our engaged tech audience,
            we&apos;d love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-xl text-sm sm:text-base"
          >
            Get in Touch
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
