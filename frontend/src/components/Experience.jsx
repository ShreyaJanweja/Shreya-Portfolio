import React from 'react'
import { motion } from 'framer-motion'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

const Experience = () => {
  const experiences = [
    {
      title: 'Technical Team Executive',
      company: 'Coding Ninjas CUIET',
      date: '2024 - Present',
      icon: '👨‍💻',
      color: '#A78BFA',
      description: 'Developing technical event websites and community platforms. Leading web development initiatives for university coding events.'
    },
    {
      title: 'Open Source Contributor',
      company: 'Open Source India Connect',
      date: '2024',
      icon: '🌐',
      color: '#3B82F6',
      description: 'Collaborated with developers worldwide on open source projects. Contributed to documentation, bug fixes, and new features.'
    },
    {
      title: 'Web Development Intern',
      company: 'SkillCraft Technology',
      date: 'Summer 2024',
      icon: '💼',
      color: '#06B6D4',
      description: 'Built responsive web applications using React, Node.js, and modern technologies. Implemented full-stack features and optimized performance.'
    }
  ]

  return (
    <section id="experience" className="section bg-dark-card/20 relative z-10 py-32">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan bg-clip-text text-transparent mb-6">
            Experience
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full mx-auto" />
        </motion.div>

        <VerticalTimeline lineColor="#A78BFA">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <VerticalTimelineElement
                className="vertical-timeline-element--work glass border border-white/10 backdrop-blur-md"
                contentStyle={{
                  background: 'rgba(26, 26, 26, 0.8)',
                  color: '#fff',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
                contentArrowStyle={{ borderRight: '15px solid rgba(26, 26, 26, 0.8)' }}
                date={exp.date}
                dateClassName="text-neon-cyan font-mono text-sm uppercase tracking-wider"
                iconStyle={{ 
                  background: exp.color, 
                  color: '#fff',
                  boxShadow: `0 0 20px ${exp.color}40`
                }}
                icon={<span className="text-xl">{exp.icon}</span>}
              >
                <h3 className="text-xl font-bold text-white mb-3 neon-text">{exp.title}</h3>
                <h4 className="font-semibold text-neon-cyan mb-4">{exp.company}</h4>
                <p className="text-white/80 leading-relaxed">{exp.description}</p>
              </VerticalTimelineElement>
            </motion.div>
          ))}
        </VerticalTimeline>

        {/* Future placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mt-24 p-12 glass rounded-3xl max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-neon-purple mb-4">More to Come</h3>
          <p className="text-white/70">Excited for more opportunities in software engineering, AI, and open source. Stay tuned!</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience

