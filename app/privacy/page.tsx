import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Owais.io - Learn how we collect, use, and protect your information.',
}

// Static page - no dynamic content
export const dynamic = 'force-static'

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 overflow-hidden">
        <div className="px-6 py-8 sm:px-8 sm:py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Last updated: October 22, 2025
            </p>
          </div>

          {/* Content sections */}
          <div className="prose prose-lg prose-slate max-w-none space-y-8">

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Introduction</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Welcome to Owais.io. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website. Please read this privacy policy carefully. If you
                do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Information We Collect</h2>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 mt-6">Personal Information</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                <li>Subscribe to our newsletter</li>
                <li>Contact us via email or contact forms</li>
                <li>Leave comments on blog posts (if applicable)</li>
                <li>Interact with our social media accounts</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                This information may include your name, email address, and any other information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URLs</li>
                <li>Pages viewed and time spent on pages</li>
                <li>Device information (mobile vs desktop)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">How We Use Your Information</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                <li>To provide, operate, and maintain our website</li>
                <li>To improve, personalize, and expand our website</li>
                <li>To understand and analyze how you use our website</li>
                <li>To develop new products, services, features, and functionality</li>
                <li>To communicate with you, including for customer service and updates</li>
                <li>To send you newsletters and marketing communications (with your consent)</li>
                <li>To prevent fraud and enhance website security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain
                information. Cookies are files with a small amount of data that are sent to your browser from a website
                and stored on your device.
              </p>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 mt-6">Types of Cookies We Use</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements to you</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Third-Party Services</h2>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 mt-6">Google Analytics</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We use Google Analytics to monitor and analyze web traffic. Google Analytics collects information
                such as how often users visit our site, what pages they visit, and what other sites they used prior
                to coming to our site. We use this information to improve our website and services.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Google's ability to use and share information collected by Google Analytics is restricted by the
                Google Analytics Terms of Service and the Google Privacy Policy. You can opt-out of Google Analytics
                by installing the Google Analytics Opt-out Browser Add-on.
              </p>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 mt-6">Google AdSense</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve
                ads based on your prior visits to our website or other websites. Google's use of advertising cookies
                enables it and its partners to serve ads based on your visits to this site and/or other sites on the Internet.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                You may opt out of personalized advertising by visiting{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 dark:text-cyan-500 hover:underline"
                >
                  Google Ads Settings
                </a>
                . Alternatively, you can opt out of third-party vendor's use of cookies for personalized advertising by
                visiting{' '}
                <a
                  href="http://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 dark:text-cyan-500 hover:underline"
                >
                  www.aboutads.info
                </a>
                .
              </p>

              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3 mt-6">Other Third-Party Services</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We may use other third-party services such as email marketing platforms, social media platforms,
                and content delivery networks. These services may collect information as described in their respective
                privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Data Security</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Regular security audits and updates</li>
                <li>Restricted access to personal information</li>
                <li>Secure hosting infrastructure</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we
                strive to use commercially acceptable means to protect your personal information, we cannot guarantee
                its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Your Data Protection Rights</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                <li><strong>Right to Access:</strong> Request copies of your personal information</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate information</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation on how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data to another organization</li>
                <li><strong>Right to Object:</strong> Object to our processing of your personal information</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Children's Privacy</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us, and we will delete such information from our systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Links to Other Websites</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Our website may contain links to third-party websites that are not operated by us. If you click on a
                third-party link, you will be directed to that third party's site. We strongly advise you to review the
                Privacy Policy of every site you visit. We have no control over and assume no responsibility for the
                content, privacy policies, or practices of any third-party sites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Contact Us</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none space-y-2 text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:owais.abbasi9@gmail.com"
                    className="text-cyan-600 dark:text-cyan-500 hover:underline"
                  >
                    owais.abbasi9@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Website:</strong>{' '}
                  <a
                    href="https://owais.io"
                    className="text-cyan-600 dark:text-cyan-500 hover:underline"
                  >
                    https://owais.io
                  </a>
                </li>
              </ul>
            </section>

            <section className="border-t border-slate-200 dark:border-slate-600 pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">GDPR Compliance</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                For users in the European Economic Area (EEA), we process your personal data in accordance with the
                General Data Protection Regulation (GDPR). Our legal basis for collecting and using personal information
                depends on the specific context in which we collect it:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                <li>You have given us consent to do so</li>
                <li>We need it to perform a contract with you</li>
                <li>Processing is in our legitimate interests and not overridden by your rights</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">California Privacy Rights (CCPA)</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                If you are a California resident, you have specific rights regarding your personal information under
                the California Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 ml-4">
                <li>Right to know what personal information is collected, used, shared, or sold</li>
                <li>Right to delete personal information held by businesses</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising CCPA rights</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                We do not sell your personal information to third parties.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
