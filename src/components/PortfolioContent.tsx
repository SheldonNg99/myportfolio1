// src/components/PortfolioContent.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PortfolioContent() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div
      className={`
        fixed top-0 left-0 w-screen h-screen text-white pointer-events-none 
        flex ${isMobile ? 'items-start pt-6' : 'items-center'} 
        z-10 px-4 sm:px-6 md:px-8
      `}
      style={{
        backgroundColor: 'rgba(0, 30, 60, 0.3)',
        backdropFilter: 'blur(1px)'
      }}
    >
      <div
        className={`
          pointer-events-auto w-full max-w-4xl 
          ${isMobile ? 'max-h-full overflow-y-auto pb-6' : ''}
        `}
      >
      <div className="pointer-events-auto w-full max-w-4xl">
        {/* Name */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg tracking-tight break-words">
          Kai
        </h1>

        {/* Role */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium opacity-90 mb-4 text-blue-200">
          Full-Stack Engineer • React • Web3
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg opacity-90 leading-relaxed mb-6 md:mb-8 max-w-prose">
          Full-Stack Engineer building React applications for Japanese clients and ERP systems across multiple industries. 
          <span className="font-semibold text-blue-200"> 3+ years experience</span> in frontend development, Finance/Sales modules, 
          and system automation.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 text-sm">
          <div className="bg-white/10 rounded-lg p-3 border border-white/20">
            <div className="font-bold text-lg text-blue-200">3+</div>
            <div className="opacity-90">Years Experience</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 border border-white/20">
            <div className="font-bold text-lg text-blue-200">Multiple</div>
            <div className="opacity-90">ERP Modules</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 border border-white/20 col-span-1 xs:col-span-2 sm:col-span-1">
            <div className="font-bold text-lg text-blue-200">4</div>
            <div className="opacity-90">Languages - [JP/CN/MY/EN]</div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8 md:mb-10 space-y-4">
          <SkillSection
            title="Frontend & Modern Web"
            items={['React', 'JavaScript', 'TypeScript', 'Mobile-Responsive']}
            color="blue"
          />
          <SkillSection
            title="Backend & Systems"
            items={['SQL', 'PHP', 'REST APIs', 'ERP Systems']}
            color="green"
          />
          <SkillSection
            title="Web3 & Emerging Tech"
            items={['Solidity', 'Smart Contracts', 'DeFi Data', 'Web3 Integration']}
            color="purple"
          />
          <SkillSection
            title="Industry Experience"
            items={['Manufacturing', 'Healthcare', 'Retail', 'Finance']}
            color="yellow"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
          <Link 
            to="/projects"
            className="px-6 py-3 sm:px-6 md:px-8 sm:py-3 md:py-4 rounded-full border-2 border-blue-400/60 bg-blue-500/20 hover:bg-blue-500/30 hover:-translate-y-0.5 transition-all duration-300 font-medium text-sm md:text-base text-center"
          >
            View Projects
          </Link>
          <a 
            href="mailto:kaijinng@gmail.com"
            className="px-6 py-3 sm:px-6 md:px-8 sm:py-3 md:py-4 rounded-full border-2 border-green-400/40 bg-green-500/10 hover:bg-green-500/20 hover:-translate-y-0.5 transition-all duration-300 text-sm md:text-base text-center"
          >
            Contact
          </a>
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-8 text-xs opacity-60">
          🌐 Open to remote Web3/crypto roles • Multilingual: CN | EN | MY | JP
        </div>
      </div>
    </div>
    </div>
  )
}

function SkillSection({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div>
      <div className="text-xs opacity-60 mb-2">{title}</div>
      <div className="flex flex-wrap gap-1">
        {items.map(skill => (
          <span
            key={skill}
            className={`px-2 sm:px-3 py-1 bg-${color}-500/20 rounded-full border border-${color}-400/30 text-xs font-medium`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
