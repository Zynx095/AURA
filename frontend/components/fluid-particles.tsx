"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  life: number
  maxLife: number
  color: string
}

interface FluidParticlesProps {
  particleCount?: number
  mouseInfluence?: number
}

export function FluidParticles({
  particleCount = 220,
  mouseInfluence = 180,
}: FluidParticlesProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const particlesRef = useRef<Particle[]>([])

  const mouseRef = useRef({
    x: 0,
    y: 0,
    isActive: false,
  })

  const animationRef = useRef<number>(0)

  const ambientColors = [
    "rgba(0,0,0,0.95)",
    "rgba(0,0,0,0.82)",
    "rgba(170,190,255,0.75)",
    "rgba(255,190,235,0.65)",
    "rgba(200,220,255,0.55)",
  ]

  const createParticle = useCallback(
    (canvas: HTMLCanvasElement): Particle => {

      return {

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,

        radius: Math.random() * 3 + 1.2,

        alpha: Math.random() * 0.5 + 0.3,

        life: 0,

        maxLife: Math.random() * 500 + 300,

        color:
          ambientColors[
            Math.floor(Math.random() * ambientColors.length)
          ],
      }
    },
    []
  )

  useEffect(() => {

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    window.addEventListener("resize", resizeCanvas)

    particlesRef.current = Array.from(
      { length: particleCount },
      () => createParticle(canvas)
    )

    const handleMouseMove = (e: MouseEvent) => {

      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isActive: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false
    }

    window.addEventListener("mousemove", handleMouseMove)

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    )

    const animate = () => {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      )

      particlesRef.current.forEach((particle, index) => {

        particle.life++

        /* Mouse interaction */
        if (mouseRef.current.isActive) {

          const dx =
            mouseRef.current.x - particle.x

          const dy =
            mouseRef.current.y - particle.y

          const dist =
            Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseInfluence) {

            const force =
              (1 - dist / mouseInfluence) * 0.015

            particle.vx += dx * force
            particle.vy += dy * force
          }
        }

        /* Organic wandering */
        particle.vx +=
          (Math.random() - 0.5) * 0.008

        particle.vy +=
          (Math.random() - 0.5) * 0.008

        /* Friction */
        particle.vx *= 0.985
        particle.vy *= 0.985

        /* Position update */
        particle.x += particle.vx
        particle.y += particle.vy

        /* Screen wrapping */
        if (particle.x < 0)
          particle.x = canvas.width

        if (particle.x > canvas.width)
          particle.x = 0

        if (particle.y < 0)
          particle.y = canvas.height

        if (particle.y > canvas.height)
          particle.y = 0

        /* Breathing effect */
        const pulseAlpha =
          particle.alpha *
          (
            0.65 +
            0.35 *
            Math.sin(
              (particle.life * 0.015) + index
            )
          )

        /* Ink speck */
        ctx.beginPath()

        ctx.fillStyle = particle.color

        ctx.globalAlpha = pulseAlpha

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        )

        ctx.fill()

        /* Ambient glow */
        ctx.beginPath()

        const glow =
          ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.radius * 8
          )

        glow.addColorStop(
          0,
          particle.color
        )

        glow.addColorStop(
          1,
          "transparent"
        )

        ctx.fillStyle = glow

        ctx.globalAlpha =
          pulseAlpha * 0.18

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius * 8,
          0,
          Math.PI * 2
        )

        ctx.fill()

        ctx.globalAlpha = 1

      })

      /* Neural threads */
      particlesRef.current.forEach((p1, i) => {

        particlesRef.current
          .slice(i + 1)
          .forEach((p2) => {

            const dx = p1.x - p2.x
            const dy = p1.y - p2.y

            const dist =
              Math.sqrt(dx * dx + dy * dy)

            if (dist < 140) {

              ctx.beginPath()

              ctx.strokeStyle = p1.color

              ctx.globalAlpha =
                (1 - dist / 140) * 0.12

              ctx.lineWidth = 1

              ctx.moveTo(p1.x, p1.y)

              ctx.lineTo(p2.x, p2.y)

              ctx.stroke()

              ctx.globalAlpha = 1
            }
          })
      })

      animationRef.current =
        requestAnimationFrame(animate)
    }

    animate()

    return () => {

      window.removeEventListener(
        "resize",
        resizeCanvas
      )

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      )

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      )

      cancelAnimationFrame(
        animationRef.current
      )
    }

  }, [
    particleCount,
    mouseInfluence,
    createParticle,
  ])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
      }}
    />
  )
}