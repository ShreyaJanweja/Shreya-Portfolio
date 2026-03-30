import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null)

  const projects = [
    {
      title: 'Suraksha Sathi',
      description: 'Women Safety Route Finder Web App. Helps women find safer routes using real-time data and safety scoring algorithms.',
      image: '/assets/SurakshaSathi.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Google Maps API'],
      github: 'https://github.com/Srishti2006-coder/Suraksha-sathi-react.git',
      live: 'https://suraksha-sathi.vercel.app',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Plan & Go',
      description: 'Intelligent trip planner web app for organizing travel destinations, budgets, and itineraries with AI recommendations.',
      image: '/assets/PlanGo.png',
      tech: ['React', 'Tailwind', 'Firebase', 'OpenAI API'],
      github: 'https://github.com/ShreyaJanweja/Plan-Go.git',
      live: 'https://plan-go-gamma.vercel.app/',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Interactive Quiz Application',
      description: 'A dynamic quiz application featuring multiple quiz types where users can test their knowledge, receive instant feedback, and view their final score.',
      image: '/assets/Quiz.png',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: '#',
      live: '#',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Sparkathon Hackathon Website',
      description: 'Official website for Sparkathon Hackathon. Features event registration, schedule, judging system, and live scoreboard.',
      image: '/assets/Hackathon.png',
      tech: ['Next.js', 'Tailwind', 'Supabase', 'Vercel'],
      github: 'https://github.com/ShreyaJanweja/S-Hackathon.git',
      live: 'https://s-hackathon.vercel.app/',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section id="projects" className="section relative z-10">
      <div className="container mx-auto">

        {/* Heading */}
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

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {projects.map((project, index) => (
            
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onHoverStart={() => setHoveredProject(project.title)}
              onHoverEnd={() => setHoveredProject(null)}

              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = ((y / rect.height) - 0.5) * 10;
                const rotateY = ((x / rect.width) - 0.5) * -10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
              }}

              className="group relative overflow-hidden rounded-3xl glass border border-white/10 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,255,0.3)]"
            >

              {/* Floating Effect */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >

                {/* Image */}
                <div className="relative h-64 lg:h-72 overflow-hidden rounded-t-3xl">
                  <div 
                    className="w-full h-full bg-gradient-to-br transition-all duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: hoveredProject === project.title 
                        ? 'grayscale(0%) brightness(1.2)' 
                        : 'grayscale(20%) brightness(0.8)'
                    }}
                  />

                  {/* Glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-purple/20 opacity-0 group-hover:opacity-100 transition duration-500" />

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

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      className="flex-1 px-6 py-3 border border-neon-purple text-neon-purple rounded-2xl font-semibold text-center relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="relative z-10">GitHub</span>
                      <div className="absolute inset-0 bg-neon-purple opacity-0 group-hover:opacity-20 transition duration-300" />
                    </motion.a>

                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        className="px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-blue text-dark-bg font-semibold rounded-2xl hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                      >
                        Live Demo →
                      </motion.a>
                    )}
                  </div>
                </div>

              </motion.div>
            </motion.div>

          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects