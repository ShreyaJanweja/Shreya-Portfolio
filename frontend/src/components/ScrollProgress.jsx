import React from 'react'
import { motion } from 'framer-motion'

export const ScrollProgress = ({ progress }) => {
  return (
    <motion.div 
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan z-40 origin-left"
      style={{ scaleX: progress / 100 }}
      initial={false}
    />
  )
}

