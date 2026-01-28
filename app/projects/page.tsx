'use client'

import { useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  status: 'completed' | 'in-progress' | 'planned'
  highlights?: string[]
  metrics?: {
    label: string
    value: string
  }[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Personal Blog Platform",
    description: "A production-grade serverless blog platform deployed on AWS S3 with CloudFront CDN and fully automated CI/CD pipeline. Built with AI-assistance to implement modern cloud architecture and DevOps best practices. Migrated from EC2 to serverless infrastructure for improved global performance, infinite scalability, and reduced operational overhead. Features static site generation with Next.js, automated deployments via GitHub Actions, CloudFront cache invalidation, and SSL/TLS encryption with AWS Certificate Manager. Delivers content from 400+ edge locations worldwide with sub-500ms page loads globally.",
    technologies: ["Next.js", "TypeScript", "AWS S3", "CloudFront", "GitHub Actions", "AWS Certificate Manager", "Tailwind CSS", "MDX"],
    githubUrl: "https://github.com/owais-io/blog",
    liveUrl: "https://owais.io",
    status: "completed",
    highlights: [
      "Built entirely with AI-assistance using Claude Code",
      "Serverless architecture with AWS S3 + CloudFront",
      "Global CDN delivery from 400+ edge locations",
      "Fully automated CI/CD with GitHub Actions",
      "Static site generation for optimal performance",
      "Automatic CloudFront cache invalidation",
      "SSL/TLS with AWS Certificate Manager (auto-renewal)",
      "99.99% uptime SLA with infinite scalability"
    ],
    metrics: [
      { label: "Deployment Time", value: "1-2 min" },
      { label: "Page Load", value: "<500ms" },
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Edge Locations", value: "400+" }
    ]
  },
  {
    id: 2,
    title: "padho.net - South Asian News Simplification",
    description: "An AI-powered news aggregation platform that leverages local LLMs (Ollama with 20B parameter gpt-oss model) to transform complex Guardian articles about India and Pakistan into accessible, simplified summaries. Built with AI-assistance to demonstrate practical application of open-source AI models for natural language processing. Features automated content fetching, intelligent filtering, prompt engineering for content transformation, and AWS S3 + CloudFront deployment with GitHub Actions CI/CD.",
    technologies: ["Next.js", "TypeScript", "Ollama", "SQLite", "MDX", "AWS S3", "CloudFront", "Tailwind CSS", "GitHub Actions"],
    githubUrl: "https://github.com/owais-io/padho",
    liveUrl: "https://padho.net",
    status: "completed",
    highlights: [
      "Built entirely with AI-assistance using Claude Code",
      "Production deployment on AWS S3 + CloudFront with custom domain",
      "Local LLM inference with 20B parameter model (no API costs)",
      "Automated Guardian API integration with smart filtering",
      "Custom prompt engineering for news simplification",
      "Processes 2-5 min per article with 60-80 word summaries",
      "SQLite-based three-table architecture for content pipeline",
      "GitHub Actions CI/CD with automated deployments"
    ],
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Model Size", value: "20B params" },
      { label: "Privacy", value: "100% Local" },
      { label: "Cost", value: "$0" }
    ]
  },
  {
    id: 3,
    title: "parho.net - AI News Transformation",
    description: "A production-deployed AI-powered platform that transforms complex news articles into accessible summaries using local large language models. Built with AI-assistance to showcase practical LLM integration with Next.js. Features the same 20B parameter Ollama model as padho.net, demonstrating content transformation pipeline from raw articles to static MDX files. Deployed to Vercel with automatic CI/CD, proving the viability of local AI models for production content generation.",
    technologies: ["Next.js", "TypeScript", "Ollama", "SQLite", "MDX", "Vercel", "Tailwind CSS"],
    githubUrl: "https://github.com/owais-io/parho",
    liveUrl: "https://parho.net",
    status: "completed",
    highlights: [
      "Built entirely with AI-assistance using Claude Code",
      "Production deployment on Vercel with custom domain",
      "Local LLM inference (privacy-first, zero API costs)",
      "Complete AI-driven content transformation pipeline",
      "Automated MDX file generation from AI summaries",
      "Static site generation for optimal performance",
      "Post-build security (admin pages excluded from production)",
      "Real-time processing with progress tracking"
    ],
    metrics: [
      { label: "Status", value: "Live" },
      { label: "Model", value: "20B params" },
      { label: "Deployment", value: "Vercel" },
      { label: "Cost", value: "$0" }
    ]
  }
]

const statusColors = {
  completed: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  "in-progress": "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
  planned: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
}

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned"
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Projects
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
          Here are some of the projects I've been working on. Click on any project card to view detailed information.
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden cursor-pointer hover:shadow-lg hover:border-cyan-500 transition-all duration-200 transform hover:-translate-y-1"
          >
            {/* Card Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 flex-1">
                  {project.title}
                </h2>
                <span
                  className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    statusColors[project.status]
                  }`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Top Technologies (show first 3) */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              {/* Quick Stats */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-200 dark:border-slate-600">
                  {project.metrics.slice(0, 2).map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100">{metric.value}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Click to view details
                </span>
                <svg className="w-4 h-4 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white dark:bg-slate-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 p-6 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {selectedProject.title}
                  </h2>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[selectedProject.status]
                    }`}
                  >
                    {statusLabels[selectedProject.status]}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="ml-4 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Key Highlights */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                        <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Project Metrics */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedProject.metrics.map((metric, index) => (
                    <div key={index} className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-100">{metric.value}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-500 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                )}

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-8 text-center">
        <div className="bg-white dark:bg-slate-700 rounded-lg p-8 border border-slate-200 dark:border-slate-600">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to contribute to interesting work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:owais.abbasi9@gmail.com"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="https://github.com/owais-io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-500 transition-colors"
            >
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
