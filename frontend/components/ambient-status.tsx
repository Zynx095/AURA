"use client"

import { useEffect, useState } from "react"

interface StatusIndicatorProps {
  label: string
  value: string
  delay: number
}

function StatusIndicator({ label, value, delay }: StatusIndicatorProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <div
      className={`
        flex items-center gap-3 transition-all duration-700
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="absolute inset-0 w-2 h-2 rounded-full bg-primary animate-ping opacity-75" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-mono text-foreground">{value}</span>
    </div>
  )
}

export function AmbientStatus() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="fixed bottom-8 left-8 flex flex-col gap-2 z-10">
      <StatusIndicator label="Neural" value="Active" delay={2000} />
      <StatusIndicator label="Sync" value={formatTime(time)} delay={2200} />
      <StatusIndicator label="Latency" value="12ms" delay={2400} />
    </div>
  )
}
