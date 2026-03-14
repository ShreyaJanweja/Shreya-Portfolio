// Animation hook for GSAP/Framer integration
import React, { useEffect } from 'react'
import { gsap } from 'gsap'

export const useAnimations = (ref, triggers = []) => {
  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(ref.current.children, 
      { 
        opacity: 0, 
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
        }
      }
    )
  }, triggers)
}

