"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "../context/ThemeContext"

function AnimatedGradientBackground() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", resize)
    resize()

    // Colors based on theme
    const isDark = theme === "dark"

    // Create gradient colors (lighter versions for both themes)
    const primaryColor = isDark ? "rgba(16, 185, 129, 0.07)" : "rgba(16, 185, 129, 0.05)"
    const secondaryColor = isDark ? "rgba(236, 72, 153, 0.07)" : "rgba(236, 72, 153, 0.05)"
    const backgroundColor = isDark ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.9)"
    
    // Orb colors
    const orbColors = [
      isDark ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)",  // Light green
      isDark ? "rgba(236, 72, 153, 0.15)" : "rgba(236, 72, 153, 0.1)",  // Light pink
      isDark ? "rgba(125, 211, 252, 0.15)" : "rgba(125, 211, 252, 0.1)", // Light blue
    ];

    // Create gradient points (larger, more subtle)
    const points = [
      { x: width * 0.1, y: height * 0.2, radius: Math.max(width, height) * 0.5, color: primaryColor },
      { x: width * 0.8, y: height * 0.3, radius: Math.max(width, height) * 0.6, color: secondaryColor },
      { x: width * 0.3, y: height * 0.7, radius: Math.max(width, height) * 0.5, color: primaryColor },
      { x: width * 0.9, y: height * 0.8, radius: Math.max(width, height) * 0.6, color: secondaryColor },
    ]
    
    // Create floating orbs
    const orbs = [];
    const orbCount = Math.floor(width * height / 25000); // Adjust density based on screen size
    
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: orbColors[Math.floor(Math.random() * orbColors.length)],
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2
      });
    }

    // Animation variables
    let animationFrameId
    let time = 0

    // Animation function
    const animate = () => {
      time += 0.001 // Slowed down slightly for more subtle motion

      // Clear canvas
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)

      // Draw base gradients
      points.forEach((point, i) => {
        // Update point positions with very subtle movement
        point.x = width * (i % 2 === 0 ? 0.1 : 0.8) + Math.sin(time * 0.8 + i) * width * 0.03
        point.y = height * (i < 2 ? 0.3 : 0.7) + Math.cos(time * 0.8 + i) * height * 0.03
        
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })

      // Update and draw orbs
      orbs.forEach(orb => {
        // Update position with gentle wave-like motion
        orb.x += Math.sin(time * 2 + orb.angle) * 0.3
        orb.y += orb.speed
        
        // Reset if out of bounds
        if (orb.y > height + 20) {
          orb.y = -20
          orb.x = Math.random() * width
        }
        if (orb.x < -20) orb.x = width + 20
        if (orb.x > width + 20) orb.x = -20
        
        // Draw orb
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fillStyle = orb.color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  // Add pointer-events-none to ensure clicks pass through the canvas
  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-full w-full pointer-events-none" aria-hidden="true" />
}

export default AnimatedGradientBackground