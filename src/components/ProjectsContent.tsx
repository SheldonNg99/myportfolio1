import { Link } from 'react-router-dom'
// src/components/ProjectsContent.tsx
import { useState } from 'react'

export default function ProjectsContent() {
  const [selectedFilter, setSelectedFilter] = useState<string>('All')

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
      title: 'Smart Contract Collection',
      tech: 'Solidity • Hardhat • OpenZeppelin',
      description: 'Various contracts for DeFi, NFTs, and token systems',
      type: 'Personal Project',
      github: 'https://github.com/yourusername/smart-contracts'
    },
    {
      title: '3D Interactive Portfolio',
      tech: 'React • Three.js • TypeScript',
      description: 'This portfolio - 3D ocean environment showcase',
      type: 'Personal Project',
      github: 'https://github.com/yourusername/3d-portfolio'
    }
  ]

  const filters = ['All', 'Personal Project', 'Confidential']
  
  const filteredProjects = selectedFilter === 'All' 
    ? projects 
    : projects.filter(p => p.type === selectedFilter)

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen text-white pointer-events-none z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-32"
      style={{
        backgroundColor: 'rgba(0, 30, 60, 0.3)',
        backdropFilter: 'blur(1px)'
      }}
    >
      <div className="pointer-events-auto max-w-4xl w-full h-full overflow-y-auto py-4 sm:py-6 md:py-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Projects</h1>
          <p className="text-sm md:text-base opacity-80 mb-4">
            {projects.length} projects completed • React, ERP systems, and Web3 development
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
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

        {/* Projects List */}
        <div className="space-y-4 mb-8">
          {filteredProjects.map((project, index) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full border w-fit ${
                  project.type === 'Personal Project' 
                    ? 'bg-green-500/20 border-green-400/30' 
                    : 'bg-yellow-500/20 border-yellow-400/30'
                }`}>
                  {project.type === 'Confidential' ? '🔒 ' : ''}
                  {project.type}
                </span>
              </div>
              
              <p className="text-sm opacity-80 mb-2">{project.description}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-blue-200 mb-2 sm:mb-0">{project.tech}</div>
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-4 py-2 rounded-full border border-gray-400/60 bg-gray-500/20 hover:bg-gray-500/30 transition-all duration-300 w-fit"
                  >
                    View Code →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Project Count */}
        <div className="text-center text-sm opacity-60 mb-4">
          Showing {filteredProjects.length} of {projects.length} projects
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
  )
}