import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const hackathons = [
  {
    name: 'Build with India Hackathon',
    description: 'Worked on an innovative solution focused on improving developer productivity using modern web technologies and scalable architecture.',
    level: 'National',
    date: '2024'
  },
  {
    name: 'Smart India Hackathon',
    description: 'Participated at national level and contributed to building a real-time data dashboard with efficient data visualization and backend integration.',
    level: 'National',
    date: '2024'
  },
  {
    name: 'SAP Hackfest 25',
    description: 'Led a team to develop an enterprise-level solution during this National-level hackathon, focusing on real-world problem solving and system design.',
    level: 'National',
    date: '2025'
  },
  {
    name: 'VaultHeist Hackathon',
    description: 'Competed in a national-level Hackathon and secured a position among the top 10 teams through strong analytical and problem-solving skills.',
    level: 'National',
    date: '2024'
  },
  {
    name: 'SwiftUI Workshop',
    description: 'Participated in an iOS development workshop focused on building modern mobile interfaces using SwiftUI and understanding Apple’s UI design principles.',
    level: 'Workshop',
    date: '2026'
  },
  {
  name: 'Adobe XD UI/UX Design Workshop',
  description: 'Participated in a certified workshop organized by Chitkara University, where I explored Adobe XD to design interactive UI/UX prototypes and create meaningful digital experiences.',
  level: 'Workshop',
  date: 'March 2025'
}
]

// 🔥 ADVANCED CARD
const HackathonCard = ({ hackathon, index }) => {
  const cardRef = useRef()

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = -(y - rect.height / 2) / 12
    const rotateY = (x - rect.width / 2) / 12

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative group h-[320px] rounded-3xl overflow-hidden cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-cyan-500/20 opacity-40 group-hover:opacity-70 blur-2xl transition duration-500" />

      {/* Glass Card */}
      <div className="relative h-full w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 group-hover:border-neon-purple/50 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]">

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition">
          {hackathon.name}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm leading-relaxed mt-2">
          {hackathon.description}
        </p>

        {/* Bottom */}
        <div className="flex justify-between items-center text-xs text-white/50 mt-4">
          <span className="px-3 py-1 border border-white/20 rounded-full backdrop-blur-sm">
            {hackathon.level}
          </span>
          <span>{hackathon.date}</span>
        </div>
      </div>

      {/* Floating Glow Orb */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-500" />
    </motion.div>
  )
}

// 🚀 MAIN SECTION
const Hackathons = () => {
  return (
    <section id="hackathons" className="section relative py-24">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-6">
            Hackathons & Competitions
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto rounded-full" />

          <p className="text-white/60 mt-6">
            Building • Competing • Innovating 
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon, index) => (
            <HackathonCard key={index} hackathon={hackathon} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Hackathons