"use client"

import { FluidParticles } from "@/components/fluid-particles"
import { OrganicBlob } from "@/components/organic-blob"
import { AmbientText } from "@/components/ambient-text"
import { NeuralGrid } from "@/components/neural-grid"
import { AIPromptInput } from "@/components/ai-prompt-input"
import { AmbientStatus } from "@/components/ambient-status"
import { FloatingNav } from "@/components/floating-nav"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Fluid particle background */}
      <FluidParticles
        particleCount={100}
        mouseInfluence={180}
        colors={["#00d4ff", "#ff00d4", "#00ff88", "#ffaa00"]}
      />
      
      {/* Floating navigation */}
      <FloatingNav />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24">
        {/* Central organic blob visualization */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 pointer-events-none">
          <OrganicBlob />
        </div>
        
        {/* Hero content */}
        <div className="relative flex flex-col items-center gap-8 text-center max-w-4xl">
          {/* Ambient badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium tracking-wide">
              Ambient Intelligence Active
            </span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-balance">
            <AmbientText 
              text="The future is built on" 
              className="text-foreground"
              delay={200}
            />
            <br />
            <span className="font-medium bg-gradient-to-r from-primary via-accent to-glow-green bg-clip-text text-transparent">
              <AmbientText 
                text="Artificial Intelligence." 
                delay={800}
              />
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
            Experience an organic interface that breathes, responds, and evolves. 
            Fluid physics meet ambient intelligence in a new paradigm of human-AI interaction.
          </p>
          
          {/* AI prompt input */}
          <div className="w-full mt-4">
            <AIPromptInput />
          </div>
          
          {/* Neural grid */}
          <div className="mt-12 w-full">
            <NeuralGrid />
          </div>
        </div>
      </div>
      
      {/* Ambient status indicators */}
      <AmbientStatus />
      
      {/* Bottom gradient fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      
      {/* Corner accent glows */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Global styles for fade animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
