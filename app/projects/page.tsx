import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore the projects I\'ve worked on - from web applications to open source contributions.',
}

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  status: 'completed' | 'in-progress' | 'planned'
}

const projects: Project[] = [
  {
    id: 1,
    title: "Personal Blog Platform",
    description: "A modern, SEO-optimized blog built with Next.js 14 and Tailwind CSS. Features MDX support, tag filtering, pagination, and automated sitemap generation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Vercel"],
    githubUrl: "https://github.com/owais/blog",
    liveUrl: "https://owais.io",
    status: "completed"
  },
  {
    id: 2,
    title: "Task Management Dashboard",
    description: "A comprehensive task management application with real-time updates, team collaboration features, and advanced filtering capabilities.",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Docker"],
    githubUrl: "https://github.com/owais/task-manager",
    liveUrl: "https://tasks.owais.io",
    status: "completed"
  },
  {
    id: 3,
    title: "E-commerce Analytics Platform",
    description: "A data visualization platform for e-commerce businesses to track sales, customer behavior, and inventory metrics with interactive charts and reports.",
    technologies: ["Vue.js", "Python", "FastAPI", "Chart.js", "Redis"],
    githubUrl: "https://github.com/owais/ecommerce-analytics",
    status: "in-progress"
  },
  {
    id: 4,
    title: "Open Source Component Library",
    description: "A collection of reusable React components with TypeScript support, comprehensive documentation, and Storybook integration.",
    technologies: ["React", "TypeScript", "Storybook", "Rollup", "Jest"],
    githubUrl: "https://github.com/owais/react-components",
    liveUrl: "https://components.owais.io",
    status: "in-progress"
  },
  {
    id: 5,
    title: "DevOps Automation Suite",
    description: "A collection of tools and scripts for automating deployment pipelines, monitoring, and infrastructure management across cloud providers.",
    technologies: ["Python", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    githubUrl: "https://github.com/owais/devops-suite",
    status: "planned"
  }
]

const statusColors = {
  completed: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  "in-progress": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  planned: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
}

const statusLabels = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned"
}

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          Here are some of the projects I've been working on. From web applications to open source contributions, 
          each project represents a journey of learning and problem-solving.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h2>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[project.status]
                }`}
              >
                {statusLabels[project.status]}
              </span>
            </div>

            {/* Project Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="flex items-center space-x-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
              )}
              
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to contribute to interesting work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@owais.io"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="https://github.com/owais"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}