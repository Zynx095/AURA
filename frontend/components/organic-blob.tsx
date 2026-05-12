"use client"

import { useEffect, useRef } from "react"

export function OrganicBlob({ className = "" }: { className?: string }) {
  const blobRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const blob = blobRef.current
    if (!blob) return

    let time = 0
    const animate = () => {
      time += 0.008
      const paths = blob.querySelectorAll("path")
      
      paths.forEach((path, i) => {
        const offset = i * 0.5
        const scale = 1 + Math.sin(time + offset) * 0.05
        const rotate = Math.sin(time * 0.5 + offset) * 5
        path.style.transform = `scale(${scale}) rotate(${rotate}deg)`
        path.style.transformOrigin = "center"
      })
      
      requestAnimationFrame(animate)
    }
    
    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <svg
      ref={blobRef}
      viewBox="0 0 400 400"
      className={`w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ff00d4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff00d4" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      
      <path
        d="M200,50 Q320,80 350,200 Q380,320 200,350 Q80,380 50,200 Q20,80 200,50"
        fill="url(#gradient1)"
        filter="url(#glow)"
        opacity="0.7"
      />
      <path
        d="M200,80 Q290,100 320,200 Q350,300 200,320 Q100,350 80,200 Q50,100 200,80"
        fill="url(#gradient2)"
        filter="url(#glow)"
        opacity="0.5"
      />
    </svg>
  )
}
