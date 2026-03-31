import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative z-10 py-20 bg-gradient-to-t from-dark-bg via-dark-card/50 to-transparent">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <motion.div 
              className="text-3xl font-black bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
           
            </motion.div>

          </div>

          <div className="border-t border-white/10 pt-8 pb-12">
            <p className="text-white/40 text-sm text-center">
              © 2025 Shreya. Built with love❤️.{' '}
              <a href="#" className="text-neon-purple hover:text-neon-cyan transition-colors">
                View Source
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

