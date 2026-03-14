// Custom cursor hook (used by Cursor component)
import React, { useEffect } from 'react'

export const useCursor = (target, effect = 'none') => {
  useEffect(() => {
    const handleMouseEnter = () => {
      document.body.classList.add('cursor-custom-' + effect)
    }
    
    const handleMouseLeave = () => {
      document.body.classList.remove('cursor-custom-' + effect)
    }

    target.addEventListener('mouseenter', handleMouseEnter)
    target.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      target.removeEventListener('mouseenter', handleMouseEnter)
      target.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [target, effect])
}

