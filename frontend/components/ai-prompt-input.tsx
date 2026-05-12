"use client"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"

export function AIPromptInput() {
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timeout)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    // Handle submission
    setValue("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        relative w-full max-w-2xl transition-all duration-1000
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
    >
      <div
        className={`
          relative flex items-center gap-3 p-2 rounded-2xl
          bg-card/40 backdrop-blur-xl border transition-all duration-500
          ${focused 
            ? "border-primary/50 shadow-[0_0_40px_rgba(0,212,255,0.2)]" 
            : "border-border/30 hover:border-border/50"
          }
        `}
      >
        {/* Animated border glow */}
        {focused && (
          <div 
            className="absolute inset-0 rounded-2xl opacity-50 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)`,
              animation: "shimmer 2s infinite",
            }}
          />
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Ask the ambient intelligence..."
          className="flex-1 bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
        />
        
        <button
          type="submit"
          disabled={!value.trim()}
          className={`
            p-3 rounded-xl transition-all duration-300
            ${value.trim() 
              ? "bg-primary text-primary-foreground hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]" 
              : "bg-secondary text-muted-foreground"
            }
          `}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      
      {/* Floating suggestion pills */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {["Create something", "Explain concepts", "Generate ideas", "Analyze data"].map((suggestion, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setValue(suggestion)}
            className={`
              px-4 py-2 text-sm rounded-full bg-secondary/30 text-muted-foreground
              border border-border/20 hover:border-primary/30 hover:text-foreground
              hover:bg-secondary/50 transition-all duration-300
              ${visible ? "opacity-100" : "opacity-0"}
            `}
            style={{ transitionDelay: `${1800 + i * 100}ms` }}
          >
            {suggestion}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </form>
  )
}
