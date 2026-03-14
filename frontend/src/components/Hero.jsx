import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const titles = [
    'CSE Student',
    'Frontend Developer', 
    'Open Source Contributor',
    'AI Enthusiast'
  ]
  const [currentTitle, setCurrentTitle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden section z-10">
      {/* Particles BG - CSS only */}
      <div className="absolute inset-0">
        <div className="particles absolute inset-0 pointer-events-none" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Name */}
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-[#A78BFA] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent mb-8 drop-shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          SHREYA
        </motion.h1>

        {/* Typing Title */}
        <motion.div 
          className="text-xl md:text-3xl lg:text-4xl font-mono mb-12 relative overflow-hidden"
          style={{ whiteSpace: 'nowrap' }}
        >
          <motion.span 
            key={currentTitle}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            {titles[currentTitle]}
          </motion.span>
          <span className="inline-block w-1 h-8 md:h-12 bg-gradient-to-b from-[#A78BFA] to-[#3B82F6] ml-1 animate-pulse" />
        </motion.div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <motion.a
            href="#projects"
            className="px-10 py-4 glass text-xl font-bold border-2 border-[#A78BFA] text-[#A78BFA] hover:bg-[#A78BFA] hover:text-black rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(167,139,250,0.6)] backdrop-blur-md"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects →
          </motion.a>
          
          <motion.a
            href="/resume.pdf"
            download
            className="px-10 py-4 glass text-xl font-bold border-2 border-[#06B6D4] text-[#06B6D4] hover:bg-[#06B6D4] hover:text-black rounded-full transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] backdrop-blur-md"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </div>

        <motion.p 
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Computer Science Engineering student at Chitkara University crafting futuristic web experiences with{' '}
          <span className="text-[#A78BFA]">React</span>,{' '}
          <span className="text-[#3B82F6]">Three.js</span>, and{' '}
          <span className="text-[#06B6D4]">AI</span>.
        </motion.p>
      </div>

      <style jsx>{`
        .particles::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(167,139,250,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59,130,246,0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(6,182,212,0.3) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </section>
  )
}

export default Hero

