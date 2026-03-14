import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [
    {
      title: 'Suraksha Sathi',
      description: 'Women Safety Route Finder Web App. Helps women find safer routes using real-time data and safety scoring algorithms.',
      image: '/projects/suraksha-sathi.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      github: '#',
      live: 'https://suraksha-sathi.vercel.app',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Plan & Go',
      description: 'Intelligent trip planner web app for organizing travel destinations, budgets, and itineraries with AI recommendations.',
      image: '/projects/plan-go.png',
      tech: ['React', 'Tailwind', 'Firebase', 'OpenAI API'],
      github: '#',
      live: 'https://planandgo.vercel.app',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Personal Portfolio Website',
      description: 'This very portfolio! Futuristic 3D React portfolio with full-stack contact form, AI chatbot, and immersive animations.',
      image: '/projects/portfolio.png',
      tech: ['React', 'Three.js', 'Framer Motion', 'GSAP', 'Express'],
      github: '#',
      live: '#',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Sparkathon Hackathon Website',
      description: 'Official website for Sparkathon Hackathon. Features event registration, schedule, judging system, and live scoreboard.',
      image: '/projects/sparkathon.png',
      tech: ['Next.js', 'Tailwind', 'Supabase', 'Vercel'],
      github: '#',
      live: 'https://sparkathon.vercel.app',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section id="projects" className="section relative z-10">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.title)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative overflow-hidden rounded-3xl glass border border-white/10 hover:border-neon-purple/50 transition-all duration-500 hover:shadow-2xl hover:shadow-neon-glow"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-72 overflow-hidden rounded-t-3xl">
                <div 
                  className="w-full h-full bg-gradient-to-br transition-all duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: hoveredProject === project.title ? 'grayscale(0%) brightness(1.2)' : 'grayscale(20%) brightness(0.8)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-neon-purple transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-white/70 mb-6 leading-relaxed text-lg line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 glass text-sm font-medium border border-white/20 rounded-full backdrop-blur-sm hover:border-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    className="flex-1 px-6 py-3 glass text-neon-purple border-2 border-neon-purple rounded-2xl font-semibold text-center hover:bg-neon-purple hover:text-dark-bg transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    GitHub
                  </motion.a>
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-semibold rounded-2xl hover:shadow-neon-glow hover:shadow-cyan-500/50 transition-all duration-300 whitespace-nowrap"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Live Demo →
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

