// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Ocean from './components/3d/Ocean'
import Shark from './components/3d/Shark'
import PortfolioContent from './components/PortfolioContent'
import ProjectsContent from './components/ProjectsContent'
import './App.css'

function App() {
  return (
    <Router>
      <div className="h-screen w-screen">
        <Ocean>
          <Shark />
        </Ocean>
        
        <Routes>
          <Route path="/" element={<PortfolioContent />} />
          <Route path="/projects" element={<ProjectsContent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App