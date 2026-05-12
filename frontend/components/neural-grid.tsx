"use client"

import { useState, useRef, useEffect } from "react"
import { Sparkles, Waves, Brain, Zap } from "lucide-react"

interface NeuralNodeProps {
  icon: React.ReactNode
  label: string
  delay: number
  active: boolean
  onClick: () => void
}

function NeuralNode({ icon, label, delay, active, onClick }: NeuralNodeProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex flex-col items-center gap-3 p-6 rounded-2xl
        transition-all duration-700 cursor-pointer
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${active 
          ? "bg-primary/20 border-primary/50 shadow-[0_0_40px_rgba(0,212,255,0.3)]" 
          : "bg-card/30 border-border/30 hover:bg-card/50 hover:border-primary/30"
        }
        border backdrop-blur-xl
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={`
          relative p-4 rounded-xl transition-all duration-500
          ${active 
            ? "bg-primary/30 text-primary shadow-[0_0_30px_rgba(0,212,255,0.5)]" 
            : "bg-secondary/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10"
          }
        `}
      >
        {icon}
        {active && (
          <div className="absolute inset-0 rounded-xl animate-ping bg-primary/20" />
        )}
      </div>
      <span
        className={`
          text-sm font-medium tracking-wide transition-colors duration-300
          ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}
        `}
      >
        {label}
      </span>
    </button>
  )
}

const nodes = [
  { icon: <Brain className="w-6 h-6" />, label: "Neural Processing" },
  { icon: <Waves className="w-6 h-6" />, label: "Fluid Dynamics" },
  { icon: <Sparkles className="w-6 h-6" />, label: "Generative AI" },
  { icon: <Zap className="w-6 h-6" />, label: "Real-time Sync" },
]

export function NeuralGrid() {
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
      {nodes.map((node, i) => (
        <NeuralNode
          key={i}
          icon={node.icon}
          label={node.label}
          delay={800 + i * 150}
          active={activeNode === i}
          onClick={() => setActiveNode(activeNode === i ? null : i)}
        />
      ))}
    </div>
  )
}
