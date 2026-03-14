import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section relative z-10">
      <div className="container mx-auto">
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
            <div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto rounded-3xl glass p-1 shadow-2xl hover:shadow-neon-glow hover:shadow-purple-500/50 transition-all duration-500 group">
              <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-24 h-24 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.div>
              </div>
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
              Shreya is a{' '}
              <span className="text-neon-purple font-semibold">Computer Science Engineering student</span>{' '}
              at Chitkara University (2024–2028).
            </motion.p>

            <motion.p 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="text-lg text-white/70 max-w-lg"
            >
              Passionate about crafting{' '}
              <span className="text-neon-cyan font-semibold">modern web applications</span> and immersive user 
              experiences. Experienced in full-stack development with a focus on{' '}
              <span className="text-neon-blue font-semibold">React</span>,{' '}
              <span className="text-neon-purple font-semibold">Node.js</span>, and cutting-edge technologies.
            </motion.p>

            {/* Stats */}
            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
            >
              <div className="text-center p-6 glass rounded-2xl hover:bg-white/10 transition-all duration-300 group">
                <motion.div 
                  className="text-3xl font-black text-neon-purple mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  2024
                </motion.div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Started CSE</div>
              </div>

              <div className="text-center p-6 glass rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-black text-neon-cyan mb-2">5+</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Projects</div>
              </div>

              <div className="text-center p-6 glass rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-black text-neon-blue mb-2">10+</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Hackathons</div>
              </div>

              <div className="text-center p-6 glass rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl font-black text-neon-purple mb-2">React</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Expert</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/2 right-10 hidden lg:block animate-float">
        <div className="w-3 h-3 bg-neon-purple rounded-full opacity-60 animate-ping" />
      </div>
      <div className="absolute bottom-20 left-10 hidden xl:block animate-float delay-1000">
        <div className="w-4 h-4 bg-neon-cyan rounded-full opacity-50" />
      </div>
    </section>
  )
}

export default About

