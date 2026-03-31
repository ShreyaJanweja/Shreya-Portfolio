import React, { useState } from 'react'
import { motion } from 'framer-motion'

const DigitalPresence = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Professional SVG Icons
  const IconLinkedIn = () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.81 0-9.728h3.554v1.375c.427-.659 1.191-1.595 2.897-1.595 2.117 0 3.704 1.385 3.704 4.362v5.586zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.704 0-.951.768-1.703 1.96-1.703 1.188 0 1.914.752 1.939 1.703 0 .946-.751 1.704-1.984 1.704zm1.581 10.019H3.656V9.724h3.262v9.728zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )

  const IconGitHub = () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )

  const IconLeetCode = () => (
    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.102 17.93h2.747l-7.846-11.155 5.92-6.231h-2.787l-5.644 5.882h-.02L8.294 0h-2.77l7.845 11.163-5.992 6.231h2.772l5.852-6.242h.02zM0 0v24h24V0zm8.899 10.735l-2.524 3.236H5.117L10.75 3.882h3.284l-5.135 6.853zm7.947 11.023H11.27l4.526-5.974h3.905z" />
    </svg>
  )

  const IconEmail = () => (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )

  const platforms = [
    {
      id: 1,
      name: 'LinkedIn',
      subtitle: 'Professional Network',
      link: 'https://www.linkedin.com/in/shreya-janweja-772a00347/',
      color: '#0A66C2',
      icon: <IconLinkedIn />,
      username: 'shreya-janweja'
    },
    {
      id: 2,
      name: 'GitHub',
      subtitle: 'Code Repository',
      link: 'https://github.com/ShreyaJanweja',
      color: '#ffffff',
      icon: <IconGitHub />,
      username: 'ShreyaJanweja'
    },
    {
      id: 3,
      name: 'LeetCode',
      subtitle: 'Problem Solving',
      link: 'https://leetcode.com/u/ShreyaJanweja/',
      color: '#FFA116',
      icon: <IconLeetCode />,
      username: 'ShreyaJanweja'
    },
    {
      id: 4,
      name: 'Email',
      subtitle: 'Direct Contact',
      link: 'mailto:shreyajanweja26@gmail.com',
      color: '#a855f7',
      icon: <IconEmail />,
      username: 'shreyajanweja26@gmail.com'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="digital-presence" className="section relative z-10 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-bg py-20 md:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(circle, #a855f7, transparent)',
          }}
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-neon-purple via-cyan-400 to-orange-500 bg-clip-text text-transparent mb-6">
            Connect With Me
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-40 h-1.5 bg-gradient-to-r from-neon-purple to-orange-500 rounded-full mx-auto mb-6"
          />
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Let's build something amazing together
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.id}
              href={platform.link}
              target={platform.name !== 'Email' ? '_blank' : undefined}
              rel={platform.name !== 'Email' ? 'noopener noreferrer' : undefined}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative h-64 cursor-pointer no-underline block"
            >
              {/* Card Background */}
              <div
                className="relative w-full h-full rounded-3xl overflow-hidden transition-all duration-500 flex flex-col justify-between p-8"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
                  border: hoveredIndex === index ? `2px solid ${platform.color}40` : '1px solid rgba(255,255,255,0.15)',
                  boxShadow: hoveredIndex === index 
                    ? `0 0 40px ${platform.color}25, inset 0 0 30px ${platform.color}08`
                    : `0 0 20px ${platform.color}08, inset 0 0 20px ${platform.color}05`,
                }}
              >
                {/* Animated glow background */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, ${platform.color}15, transparent 70%)`,
                    filter: 'blur(25px)'
                  }}
                />

                {/* Top section with icon and status */}
                <div className="relative z-10 flex items-start justify-between">
                  <motion.div
                    className="text-white/80"
                    style={{ color: hoveredIndex === index ? platform.color : 'rgba(255,255,255,0.8)' }}
                    animate={hoveredIndex === index ? { scale: 1.15, rotate: 10 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {platform.icon}
                  </motion.div>

                  {/* Online indicator */}
                  <motion.div
                    className="relative"
                    animate={hoveredIndex === index ? { scale: 1.2 } : { scale: 1 }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: platform.color,
                        boxShadow: `0 0 10px ${platform.color}, 0 0 20px ${platform.color}60`
                      }}
                    />
                  </motion.div>
                </div>

                {/* Middle section with title and subtitle */}
                <div className="relative z-10">
                  <h3
                    className="text-xl font-bold mb-2 transition-colors duration-300"
                    style={{
                      color: hoveredIndex === index ? platform.color : '#ffffff'
                    }}
                  >
                    {platform.name}
                  </h3>
                  <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300">
                    {platform.subtitle}
                  </p>
                </div>

                {/* Bottom section with username and arrow */}
                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-white/50 truncate group-hover:text-white/70 transition-colors duration-300 font-mono">
                    {platform.username}
                  </span>

                  {/* External link arrow */}
                  <motion.div
                    animate={hoveredIndex === index ? { x: 3, y: -3 } : { x: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-300"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </motion.div>
                </div>

                {/* Accent line on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${platform.color}, transparent)`
                  }}
                  initial={{ width: 0 }}
                  animate={hoveredIndex === index ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Call to action text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-white/50 text-sm">
            Click any card to connect • All links open in new tabs
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default DigitalPresence
