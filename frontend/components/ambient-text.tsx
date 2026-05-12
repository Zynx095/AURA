"use client"

import { useState, useEffect } from "react"

interface AmbientTextProps {
  text: string
  className?: string
  delay?: number
}

export function AmbientText({ text, className = "", delay = 0 }: AmbientTextProps) {
  const [visible, setVisible] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true)
    }, delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!visible) return
    if (charIndex >= text.length) return

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + 1)
    }, 40)

    return () => clearTimeout(timeout)
  }, [visible, charIndex, text.length])

  if (!visible) return null

  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500"
          style={{
            opacity: i < charIndex ? 1 : 0,
            transform: i < charIndex ? "translateY(0)" : "translateY(10px)",
            transitionDelay: `${i * 20}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}
