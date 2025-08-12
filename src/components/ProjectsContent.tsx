import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ProjectsContent() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const projectsPerPage = 3

  const projects = [
    {
      title: 'Japanese Client Web Platform',
      tech: 'React • TypeScript • Tailwind CSS',
      description: 'Modern web application for Japanese market with localized UI/UX',
      type: 'Confidential'
    },
    {
      title: 'ERP Finance & Sales Modules',
      tech: 'PHP • SQL • VB.NET',
      description: 'Custom modules for manufacturing and healthcare companies',
      type: 'Confidential'
    },
    {
      title: 'Merukaji',
      tech: 'Typescript • ChatGPT API • Youtube API',
      description: 'Merukaji is a web application that helps users get key points from YouTube videos through AI-powered summarization',
      type: 'Personal Project',
      github: 'https://github.com/SheldonNg99/merukaji'
    },
    {
      title: 'Intel Test Automation',
      tech: 'Python • C++',
      description: 'Automated THC test content generation for system validation',
      type: 'Confidential'
    },
    {
      title: 'Crypto Tax Calculator for Japan',
      tech: 'TypeScript • React • Node.js • PostgreSQL • Prisma',
      description: 'Full-stack crypto tax calculator with FIFO calculations, CSV parsing, and automated Japan tax compliance reporting',
      type: 'Personal Project',
      github: 'https://github.com/SheldonNg99/blockzei',
    },
    {
      title: '3D Interactive Portfolio',
      tech: 'React • Three.js • TypeScript',
      description: 'This portfolio - 3D ocean environment showcase',
      type: 'Personal Project',
      github: 'https://github.com/SheldonNg99/myportfolio'
    }
  ]

  const filters = ['All', 'Personal Project', 'Confidential']
  
  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(p => p.type === selectedFilter)

  // Reset to page 1 when filter changes
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
    setCurrentPage(1)
  }

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = filteredProjects.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen text-white pointer-events-none z-10 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 30, 60, 0.3)',
        backdropFilter: 'blur(1px)'
      }}
    >
      <div className="pointer-events-auto max-w-6xl w-full max-h-full overflow-y-auto">
        <div className="">
          
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Projects</h1>
            <p className="text-sm md:text-base opacity-80 mb-4">
              {projects.length} projects completed • React, ERP systems, and Web3 development
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-blue-500/30 border-2 border-blue-400/60'
                    : 'bg-white/10 border-2 border-white/20 hover:bg-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid - Desktop vs Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            {currentProjects.map((project, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20 h-fit">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <h3 className="text-lg font-bold mb-2 sm:mb-0 flex-1">{project.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full border w-fit shrink-0 ${
                      project.type === 'Personal Project' 
                        ? 'bg-green-500/20 border-green-400/30' 
                        : 'bg-yellow-500/20 border-yellow-400/30'
                    }`}>
                      {project.type === 'Confidential' ? '🔒 ' : ''}
                      {project.type}
                    </span>
                  </div>
                  
                  <p className="text-sm opacity-80 mb-3 flex-1">{project.description}</p>
                  
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="text-xs text-blue-200">{project.tech}</div>
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-4 py-2 rounded-full border border-gray-400/60 bg-gray-500/20 hover:bg-gray-500/30 transition-all duration-300 w-fit text-center"
                      >
                        View Code →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mb-6">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}
              >
                ← Prev
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-blue-500/30 border-2 border-blue-400/60'
                        : 'bg-white/10 border border-white/20 hover:bg-white/20'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed'
                    : 'bg-white/10 border border-white/20 hover:bg-white/20'
                }`}
              >
                Next →
              </button>
            </div>
          )}

          {/* Project Count */}
          <div className="text-center text-sm opacity-60 mb-6">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} projects
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <Link 
              to="/"
              className="px-6 py-3 rounded-full border-2 border-white/30 bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}