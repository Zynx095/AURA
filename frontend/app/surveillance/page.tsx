"use client"

import { useEffect, useState } from "react"

interface Detection {
  label: string
  confidence: number
  track_id: number
  box: number[]
}

interface TrackedObject {
  label: string
  duration: number
  confidence: number
  box: number[]
}

interface Event {
  type: string
  track_id: number
  message: string
  severity: string
}
interface Summary {
  message: string
}
export default function SurveillancePage() {

  const [detections, setDetections] =
    useState<Detection[]>([])

  const [trackedObjects, setTrackedObjects] =
    useState<Record<string, TrackedObject>>({})

  const [events, setEvents] =
    useState<Event[]>([])
  const [summaries, setSummaries] =
  useState<string[]>([])
  useEffect(() => {

  const socket =
    new WebSocket(
      "ws://127.0.0.1:8000/ws"
    )

  socket.onmessage = (event) => {

    const data = JSON.parse(event.data)

    setDetections(
      data.detections || []
    )

    setTrackedObjects(
      data.tracked_objects || {}
    )

    setEvents(
      data.events || []
    )

    setSummaries(
      data.summaries || []
    )
  }

  socket.onerror = () => {

  console.log(
    "WebSocket reconnecting..."
  )
}

  socket.onclose = () => {

  console.log(
    "Realtime stream closed"
  )
}

  return () => {

    socket.close()
  }

}, [])
  return (

    <main className="min-h-screen bg-white text-black px-8 py-10">

      {/* Header */}
      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-semibold tracking-[0.25em]">
            A.U.R.A
          </h1>

          <p className="mt-3 text-gray-500 tracking-wide">
            Autonomous Unified Recognition Assistant
          </p>

        </div>

        {/* Live Status */}
        <div className="rounded-full border border-black/10 bg-black/[0.03] px-5 py-2 backdrop-blur-xl">

          <div className="flex items-center gap-3">

            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

            <span className="text-sm tracking-[0.15em] uppercase text-gray-700">
              System Active
            </span>

          </div>

        </div>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Left Side */}
        <div className="xl:col-span-2 space-y-8">

          {/* Live Feed */}
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-black/[0.03] backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">

              <div>

                <h2 className="text-xl font-medium">
                  Live Surveillance Feed
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Real-time object monitoring
                </p>

              </div>

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />

                <span className="text-xs uppercase tracking-[0.15em] text-gray-500">
                  Live
                </span>

              </div>

            </div>

            <img
              src="http://127.0.0.1:8000/video_feed"
              alt="Live Feed"
              className="w-full object-cover"
            />

          </div>

          {/* Active Detections */}
          <div className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.04)]">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-medium">
                  Active Detections
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Live YOLO object tracking
                </p>

              </div>

              <div className="rounded-full bg-black/5 px-4 py-2 text-sm text-gray-600">

                {detections.length} Active

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {detections.length === 0 && (

                <div className="text-gray-500">
                  No active detections
                </div>
              )}

              {detections.map((det, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.06)]"
                >

                  <div className="flex items-center justify-between">

                    <span className="font-medium capitalize text-lg">
                      {det.label}
                    </span>

                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-gray-600">
                      ID #{det.track_id}
                    </span>

                  </div>

                  <div className="mt-4">

                    <div className="flex items-center justify-between text-sm text-gray-500">

                      <span>Confidence</span>

                      <span>
                        {(det.confidence * 100).toFixed(1)}%
                      </span>

                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/5">

                      <div
                        className="h-full rounded-full bg-black"
                        style={{
                          width: `${det.confidence * 100}%`
                        }}
                      />

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="space-y-8">
          {/* AI Assistant */}
<div className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.04)] overflow-hidden">

  {/* Header */}
  <div className="flex items-center justify-between mb-6">

    <div>

      <h2 className="text-2xl font-medium">
        A.U.R.A Intelligence
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Ambient scene interpretation
      </p>

    </div>

    <div className="flex items-center gap-2">

      <div className="h-2 w-2 rounded-full bg-black animate-pulse" />

      <span className="text-xs uppercase tracking-[0.15em] text-gray-500">
        Active
      </span>

    </div>

  </div>

  {/* AI Feed */}
  <div className="space-y-4">

    {summaries.length === 0 && (

      <div className="rounded-2xl border border-black/10 bg-white/50 p-5 text-gray-500">

        Awaiting scene analysis...

      </div>
    )}

    {summaries.map((summary, index) => (

      <div
        key={index}
        className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur-xl transition-all duration-500 animate-[fadeIn_0.6s_ease]"
      >

        <div className="flex items-start gap-4">

          {/* Pulse */}
          <div className="mt-2 h-2 w-2 rounded-full bg-black animate-pulse" />

          {/* Text */}
          <p className="text-sm leading-relaxed text-gray-700">

            {summary}

          </p>

        </div>

      </div>
    ))}

  </div>

</div>

          {/* AI Event Feed */}
          <div className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.04)]">

            <div className="mb-6">

              <h2 className="text-2xl font-medium">
                AI Event Feed
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Behavioral intelligence analysis
              </p>

            </div>

            <div className="space-y-4">

              {events.length === 0 && (

                <div className="rounded-2xl border border-black/10 bg-white/50 p-5 text-gray-500">
                  No active alerts
                </div>
              )}

              {events.map((event, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-red-200 bg-red-50 p-5"
                >

                  <div className="flex items-center justify-between">

                    <span className="font-medium capitalize text-red-700">
                      {event.type.replace("_", " ")}
                    </span>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs uppercase tracking-[0.12em] text-red-500">
                      {event.severity}
                    </span>

                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-red-600">
                    {event.message}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Tracking Intelligence */}
          <div className="rounded-[2rem] border border-black/10 bg-black/[0.03] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.04)]">

            <div className="mb-6">

              <h2 className="text-2xl font-medium">
                Tracking Intelligence
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Persistent object memory
              </p>

            </div>

            <div className="space-y-4">

              {Object.entries(trackedObjects).length === 0 && (

                <div className="rounded-2xl border border-black/10 bg-white/50 p-5 text-gray-500">
                  No tracked objects
                </div>
              )}

              {Object.entries(trackedObjects).map(
                ([id, obj]) => (

                  <div
                    key={id}
                    className="rounded-2xl border border-black/10 bg-white/60 p-5 backdrop-blur-xl"
                  >

                    <div className="flex items-center justify-between">

                      <span className="capitalize font-medium text-lg">
                        {obj.label}
                      </span>

                      <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-gray-600">
                        ID #{id}
                      </span>

                    </div>

                    <div className="mt-4 space-y-2 text-sm text-gray-500">

                      <div className="flex items-center justify-between">

                        <span>Active Duration</span>

                        <span>
                          {obj.duration.toFixed(1)}s
                        </span>

                      </div>

                      <div className="flex items-center justify-between">

                        <span>Confidence</span>

                        <span>
                          {(obj.confidence * 100).toFixed(1)}%
                        </span>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>
    <style jsx global>{`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
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