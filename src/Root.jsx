import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import App from './App'
import './Root.css'

function RootContent() {
  const location = useLocation()
  const [visitStats, setVisitStats] = useState({})

  useEffect(() => {
    // Load stats from localStorage
    const savedStats = localStorage.getItem('visitStats')
    const stats = savedStats ? JSON.parse(savedStats) : {}
    
    const path = location.pathname || '/'
    stats[path] = (stats[path] || 0) + 1
    
    // Save to localStorage
    localStorage.setItem('visitStats', JSON.stringify(stats))
    setVisitStats(stats)
    
    // Log to console
    const totalVisits = Object.values(stats).reduce((a, b) => a + b, 0)
    console.log(`📍 Visited: ${path}`)
    console.log(`👥 Path visits: ${stats[path]}`)
    console.log(`📊 Total visits: ${totalVisits}`)
    console.log(`📈 All stats:`, stats)
  }, [location.pathname])

  return (
    <div className="root">
      <Routes>
        <Route path="/se" element={<App careerPath="se" />} />
        <Route path="/pm" element={<App careerPath="pm" />} />
        <Route path="/aie" element={<App careerPath="aie" />} />
        <Route path="/" element={<App careerPath="aie" />} />
      </Routes>
    </div>
  )
}

function Root() {
  return (
    <BrowserRouter>
      <RootContent />
    </BrowserRouter>
  )
}

export default Root
