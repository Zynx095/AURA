"use client"

import { useState, useEffect } from "react"

const navItems = [
  "A.U.R.A"
]

export function FloatingNav() {
  const [visible, setVisible] = useState(false)
  const [activeItem, setActiveItem] = useState<number | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <nav
      className={`
        fixed top-8 left-1/2 -translate-x-1/2 z-20
        transition-all duration-1000
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
      `}
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-card/30 backdrop-blur-xl border border-border/20">
        {navItems.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveItem(activeItem === i ? null : i)}
            className={`
              px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${activeItem === i 
                ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,212,255,0.3)]" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }
            `}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  )
}
