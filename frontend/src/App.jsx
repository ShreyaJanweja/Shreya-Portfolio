import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <About />
      <div style={{height: '100vh'}} className="flex items-center justify-center">
        <h1 style={{fontSize: '4rem', fontWeight: 'bold'}}>All imports fixed! Portfolio renders.</h1>
      </div>
    </div>
  )
}

export default App

