export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-12 font-sans selection:bg-cyan-900 selection:text-cyan-50">
      {/* Header */}
      <header className="mb-12 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            A.U.R.A <span className="text-zinc-600">//</span> System_Core
          </h1>
        </div>
        <p className="text-zinc-500 font-mono text-sm tracking-wide">
          STATUS: OPTIMAL | UPTIME: 99.9% | CLUSTER: ALPHA
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1 */}
        <div className="col-span-1 md:col-span-2 bg-zinc-950 border border-zinc-800/60 rounded-sm p-6 relative overflow-hidden group hover:border-cyan-900/50 transition-colors duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl">01</div>
          <h2 className="text-sm font-mono text-cyan-500 mb-6 uppercase tracking-widest">Active_Processes</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center border-b border-zinc-900 pb-2">
                <span className="font-mono text-sm text-zinc-400">SYS_THREAD_{i}</span>
                <div className="w-1/2 h-1 bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500/50 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2 */}
        <div className="bg-zinc-950 border border-zinc-800/60 rounded-sm p-6 group hover:border-cyan-900/50 transition-colors duration-500">
          <h2 className="text-sm font-mono text-cyan-500 mb-6 uppercase tracking-widest">Network_I/O</h2>
          <div className="flex flex-col items-center justify-center h-40">
            <div className="text-4xl font-light text-white mb-2">1.2<span className="text-lg text-zinc-500">TB/s</span></div>
            <div className="flex gap-1 items-end h-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-2 bg-cyan-900/40 animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}