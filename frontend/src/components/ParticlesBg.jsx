import React, { useEffect } from 'react'

export const ParticlesBg = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    document.body.appendChild(canvas)
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.className = 'particles z-[-1] fixed inset-0 pointer-events-none'

    const particlesArray = []
    const numberOfParticles = 100

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height - canvas.height
        this.size = Math.random() * 5 + 1
        this.speedY = Math.random() * 1 + 0.5
        this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`
      }
      update() {
        this.y += this.speedY
        if (this.y > canvas.height) {
          this.y = -this.size
          this.x = Math.random() * canvas.width
        }
      }
      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const initParticles = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.body.removeChild(canvas)
    }
  }, [])

  return null
}

