import React from 'react'
import { motion } from 'framer-motion'

const Hackathons = () => {
  const hackathons = [
    {
      name: 'Build with India Hackathon',
      description: 'Participant - Innovative solution for developer productivity.',
      level: 'National',
      date: '2024',
      image: '/hackathons/build-with-india.png',
      badge: '🏆 Participant'
    },
    {
      name: 'Smart India Hackathon',
      description: 'National Level Participant - Developed real-time data dashboard.',
      level: 'National',
      date: '2024',
      image: '/hackathons/sih.png',
      badge: '🏆 Finalist'
    },
    {
      name: 'SAP Hackfest 25',
      description: 'Chitkara University - Enterprise solution hackathon.',
      level: 'University',
      date: '2025',
      image: '/hackathons/sap-hackfest.png',
      badge: '🏆 Team Lead'
    },
    {
      name: 'VaultHeist',
      description: 'National Level Cyber Security Challenge.',
      level: 'National',
      date: '2024',
      image: '/hackathons/vaultheist.png',
      badge: '🏆 Top 10'
    },
    {
      name: 'SwiftUI Challenge 26',
      description: 'iOS Development Challenge.',
      level: 'National',
      date: '2026',
      image: '/hackathons/swiftui.png',
      badge: '🏆 Participant'
    }
  ]

  return (
    <section id="hackathons" className="section bg-gradient-to-b from-dark-bg via-dark-card/30 to-dark-bg relative z-10">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-neon-purple to-orange-500 bg-clip-text text-transparent mb-6">
            Hackathons & Competitions
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-purple to-orange-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.name}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 rounded-3xl hover:shadow-neon-glow hover:shadow-purple-500/40 hover:-translate-y-4 transition-all duration-500 border border-white/10 group hover:border-neon-purple/50"
              whileHover={{ rotateX: 5, rotateY: 5 }}
            >
              {/* Badge */}
              <motion.div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 glass text-xs font-bold uppercase tracking-wider text-neon-purple border border-neon-purple rounded-full backdrop-blur-md"
                whileHover={{ scale: 1.1 }}
              >
                {hackathon.badge}
              </motion.div>

              {/* Image */}
              <div className="w-full h-40 rounded-2xl overflow-hidden mb-6 bg-dark-surface group-hover:bg-gradient-to-br group-hover:from-purple-500/10 group-hover:to-orange-500/10 transition-all duration-500">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${hackathon.image})` }}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-neon-purple transition-colors">
                {hackathon.name}
              </h3>
              
              <p className="text-white/70 mb-4 text-sm leading-relaxed">
                {hackathon.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-white/60 uppercase tracking-wider font-mono">
                <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${hackathon.level === 'National' ? 'from-orange-400/20 to-red-400/20 text-orange-300 border-orange-400/50' : 'from-emerald-400/20 to-teal-400/20 text-emerald-300 border-emerald-400/50'} border backdrop-blur-sm`}>
                  {hackathon.level}
                </span>
                <span>{hackathon.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Geometric decoration */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rotate-12 bg-neon-purple/10 rounded-2xl blur-xl opacity-50 hidden lg:block animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-24 h-24 rotate-[-15deg] bg-neon-orange/10 rounded-xl blur-xl opacity-40 hidden xl:block animate-pulse delay-1000" />
    </section>
  )
}

export default Hackathons

