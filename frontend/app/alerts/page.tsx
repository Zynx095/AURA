export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-12 font-sans selection:bg-rose-900 selection:text-rose-50">
      <header className="mb-12 border-b border-rose-950 pb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-rose-900/5 animate-pulse" />
        <div className="flex items-center gap-4 mb-2 relative z-10">
          <div className="h-2 w-2 bg-rose-500 rounded-full animate-ping" />
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            A.U.R.A <span className="text-zinc-600">//</span> Threat_Grid
          </h1>
        </div>
        <p className="text-rose-500/70 font-mono text-sm tracking-wide relative z-10">
          WARNING: 2 UNRESOLVED ANOMALIES DETECTED
        </p>
      </header>

      <div className="space-y-4">
        {/* Critical Alert */}
        <div className="bg-rose-950/20 border border-rose-900/50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
          <div className="flex items-start gap-4">
            <div className="mt-1 font-mono text-rose-500">{'[!]'}</div>
            <div>
              <h3 className="font-mono text-rose-400 text-sm mb-1 tracking-wider">UNAUTHORIZED_ENTRY_ATTEMPT</h3>
              <p className="text-xs text-zinc-500 font-mono">CAM_04 | CONFIDENCE: 98.2% | ZONE: RESTRICTED</p>
            </div>
          </div>
          <button className="px-6 py-2 border border-rose-900/80 text-rose-500 text-xs font-mono hover:bg-rose-900/20 transition-colors uppercase tracking-widest">
            Investigate
          </button>
        </div>

        {/* Resolved Alert */}
        <div className="bg-zinc-950 border border-zinc-800/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-60">
          <div className="flex items-start gap-4">
            <div className="mt-1 font-mono text-zinc-600">{'[X]'}</div>
            <div>
              <h3 className="font-mono text-zinc-400 text-sm mb-1 tracking-wider">MOTION_SENSOR_TRIPPED</h3>
              <p className="text-xs text-zinc-600 font-mono">CAM_01 | STATUS: FALSE_POSITIVE (DOMESTIC_ANIMAL)</p>
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-700 uppercase tracking-widest px-6">
            Archived
          </span>
        </div>
      </div>
    </div>
  )
}