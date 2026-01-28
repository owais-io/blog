import Image from 'next/image'

export default function SponsorAd() {
  return (
    <div className="sponsor-ad-wrapper my-6">
      <div className="sponsor-ad bg-gradient-to-br from-slate-200 dark:from-slate-800 via-slate-200 dark:via-slate-800 to-slate-100 dark:to-slate-700 rounded-xl border-2 border-cyan-600 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col items-center text-center">
          {/* Sponsor Badge */}
          <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-3 bg-cyan-100 dark:bg-cyan-900/50 px-3 py-1 rounded-full">
            Sponsored
          </div>

          {/* Logo */}
          <div className="mb-4">
            <Image
              src="/images/Alnafi-International-College-Logo.webp"
              alt="Al Nafi International College"
              width={180}
              height={70}
              className="max-w-full h-auto"
              priority={false}
            />
          </div>

          {/* Heading with attention-grabbing message */}
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
            Get Job-Ready in Emerging Tech
          </h3>
          <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
            UK-Accredited Diplomas • Pearson & EduQual
          </p>

          {/* Tech Specializations - Pill style */}
          <div className="flex flex-wrap gap-2 justify-center mb-5 text-xs">
            <span className="bg-gradient-to-r from-purple-200 dark:from-purple-900/50 to-blue-200 dark:to-blue-900/50 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">🤖 AI</span>
            <span className="bg-gradient-to-r from-blue-200 dark:from-blue-900/50 to-cyan-200 dark:to-cyan-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">⚙️ DevOps</span>
            <span className="bg-gradient-to-r from-red-200 dark:from-red-900/50 to-orange-200 dark:to-orange-900/50 text-red-700 dark:text-red-300 px-3 py-1 rounded-full font-medium">🔒 Cyber Security</span>
            <span className="bg-gradient-to-r from-green-200 dark:from-green-900/50 to-emerald-200 dark:to-emerald-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-medium">☁️ Cloud</span>
            <span className="bg-gradient-to-r from-indigo-200 dark:from-indigo-900/50 to-blue-200 dark:to-blue-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-medium">🛡️ Offensive Security</span>
            <span className="bg-gradient-to-r from-yellow-200 dark:from-yellow-900/50 to-amber-200 dark:to-amber-900/50 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full font-medium">⛓️ Blockchain</span>
          </div>

          {/* Key Benefits - Compact version */}
          <div className="bg-slate-100 dark:bg-slate-600/50 rounded-lg p-4 mb-5 w-full backdrop-blur-sm">
            <ul className="text-sm text-left text-slate-600 dark:text-slate-300 space-y-2.5">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✅</span>
                <span><strong>Practical, industry-aligned</strong> training</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✅</span>
                <span><strong>Job placement help</strong> + resume/interview prep</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✅</span>
                <span><strong>Student visa assistance</strong> for UK/USA/Canada</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✅</span>
                <span><strong>1-year internship certificate</strong> included</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 flex-shrink-0">✅</span>
                <span><strong>Study in 17+ languages</strong> globally</span>
              </li>
            </ul>
          </div>

          {/* Urgency message */}
          <div className="bg-gradient-to-r from-yellow-100 dark:from-yellow-900/30 to-orange-100 dark:to-orange-900/30 border border-yellow-500 dark:border-yellow-600 rounded-lg p-3 mb-4">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
              💡 Transform Learning Into Earning
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Join thousands advancing their tech careers worldwide
            </p>
          </div>

          {/* CTA Button - More prominent */}
          <a
            href="https://alnafi.com/?al_aid=6d5529727bec42a"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group relative w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              Start Free 7-Day Trial
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            No credit card required • Start learning today
          </p>
        </div>
      </div>
    </div>
  )
}
