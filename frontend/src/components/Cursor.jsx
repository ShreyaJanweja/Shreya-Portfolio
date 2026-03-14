import React from 'react'
import { motion } from 'framer-motion'

export const Cursor = ({ pos }) => {
  return (
    <>
      <motion.div 
        className="cursor"
        animate={{
          x: pos.x - 10,
          y: pos.y - 10,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      />
      <motion.div 
        className="cursor-follower"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30
        }}
      />
    </>
  )
}

