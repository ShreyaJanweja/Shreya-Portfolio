import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const About = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const sectionRef = useRef(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="section relative z-10 overflow-hidden"
    >
      {/* Cursor Glow Effect Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block transition-all duration-150 ease-out"
        style={{
          background: `radial-gradient(circle 220px at ${cursorPos.x}px ${cursorPos.y}px, rgba(168, 85, 247, 0.25), rgba(34, 211, 238, 0.15) 45%, transparent 70%)`,
          mixBlendMode: 'screen', // neon glow feel ke liye
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } }
          }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left - Image/Avatar */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            className="relative"
          >
            <div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto rounded-3xl glass p-1 shadow-2xl hover:shadow-neon-glow hover:shadow-purple-500/50 transition-all duration-500 group overflow-hidden">
              <img 
                src="/assets/profilePic.png" 
                alt="Shreya" 
                className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: 75 }, visible: { opacity: 1, x: 0 } }}
            className="space-y-8"
          >
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent mb-6">
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mb-8" />
            </motion.div>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-xl md:text-2xl leading-relaxed text-white/80 max-w-lg"
            >
              I'm Shreya, a Computer Science Engineering student at Chitkara University with a strong passion for technology and innovation. I enjoy building modern, responsive web applications and creating immersive digital experiences that blend design with functionality.
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-lg text-white/70 max-w-lg"
            >
              My interests lie in full-stack development, where I work with technologies like React, Node.js, and modern web frameworks to develop scalable and user-friendly applications. I'm constantly exploring new tools and ideas in the fields of web development, artificial intelligence, and interactive UI design to push the boundaries of what I can create.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/2 right-10 hidden lg:block animate-float z-10">
        <div className="w-3 h-3 bg-neon-purple rounded-full opacity-60 animate-ping" />
      </div>
      <div className="absolute bottom-20 left-10 hidden xl:block animate-float delay-1000 z-10">
        <div className="w-4 h-4 bg-neon-cyan rounded-full opacity-50" />
      </div>
    </section>
  )
}

export default About