"use client"

import Link from "next/link"

import { FluidParticles } from "@/components/fluid-particles"
import { OrganicBlob } from "@/components/organic-blob"
import { AmbientText } from "@/components/ambient-text"
import { NeuralGrid } from "@/components/neural-grid"
import { AmbientStatus } from "@/components/ambient-status"
import { FloatingNav } from "@/components/floating-nav"

const modules = [
  {
    title: "Live Surveillance",
    description: "Real-time AI object monitoring",
    route: "/surveillance",
  },
  {
    title: "AI Assistant",
    description: "Context-aware intelligence system",
    route: "/assistant",
  },
  {
    title: "Detection Analytics",
    description: "Activity trends and insights",
    route: "/analytics",
  },
  {
    title: "Incident Database",
    description: "Faces, vehicles, and event records",
    route: "/database",
  },
]

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">

      {/* Particles */}
      <FluidParticles
        particleCount={500}
        mouseInfluence={180}
      />

      {/* Navigation */}
      <FloatingNav />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24">

        {/* Breathing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] opacity-80 pointer-events-none">
          <OrganicBlob />
        </div>

        {/* Hero */}
        <div className="relative flex flex-col items-center gap-8 text-center max-w-5xl">

          {/* Status Badge */}
          <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-black/10 bg-black/[0.03] backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-black animate-pulse" />

            <span className="text-sm text-gray-700 font-medium tracking-[0.15em] uppercase">
              YOLO Engine Online
            </span>
          </div>

          {/* Main Heading */}
          <div className="flex flex-col items-center gap-4">

            <h1 className="text-6xl md:text-8xl font-semibold tracking-[0.28em] text-black">
              A.U.R.A
            </h1>

            <p className="text-xs md:text-sm tracking-[0.45em] uppercase text-gray-500">
              Autonomous Unified Recognition Assistant
            </p>

          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed opacity-0 animate-[fadeIn_1s_ease-out_1.1s_forwards]">
            A.U.R.A combines real-time computer vision,
            contextual AI reasoning, and ambient interaction
            design into one intelligent surveillance operating system.
          </p>

          {/* CTA */}
          <Link href="/dashboard">
            <button className="group relative mt-2 overflow-hidden rounded-full border border-black/10 bg-black/[0.03] px-8 py-4 text-sm font-medium tracking-[0.25em] text-black backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:bg-black/[0.06] hover:shadow-[0_0_30px_rgba(0,0,0,0.08)]">

              <span className="relative z-10">
                ENTER COMMAND CENTER
              </span>

            </button>
          </Link>

          {/* System Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10 w-full">

            {modules.map((module, index) => (
              <Link key={index} href={module.route}>

                <div className="group cursor-pointer rounded-3xl border border-black/10 bg-black/[0.03] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-black/[0.05] hover:shadow-[0_0_30px_rgba(0,0,0,0.06)]">

                  {/* Module Icon */}
                  <div className="mb-5 flex items-center justify-center w-14 h-14 rounded-2xl border border-black/10 bg-black/[0.04]">

                    <div className="w-3 h-3 rounded-full bg-black animate-pulse" />

                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-medium text-black transition-colors duration-300">
                    {module.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {module.description}
                  </p>

                </div>

              </Link>
            ))}

          </div>

          {/* Neural Grid */}
          <div className="mt-14 w-full opacity-70">
            <NeuralGrid />
          </div>

        </div>
      </div>

      {/* Ambient Status */}
      <AmbientStatus />

      {/* Bottom Fade */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

      {/* Ambient Light */}
      <div className="fixed top-0 left-0 w-[450px] h-[450px] bg-black/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="fixed bottom-0 right-0 w-[450px] h-[450px] bg-black/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </main>
  )
}