export default function DatabasePage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-12 font-sans selection:bg-slate-700 selection:text-slate-50">
      <header className="mb-12 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-2 w-2 bg-slate-400 rounded-full shadow-[0_0_10px_rgba(148,163,184,0.8)]" />
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            A.U.R.A <span className="text-zinc-600">//</span> Memory_Core
          </h1>
        </div>
        <p className="text-zinc-500 font-mono text-sm tracking-wide">
          COLLECTION: DETECTIONS | INDEX: OPTIMIZED
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Storage Capacity */}
        <div className="bg-zinc-950 border border-zinc-800/60 p-6">
          <h2 className="text-sm font-mono text-slate-400 mb-6 uppercase tracking-widest">Volatile_Storage</h2>
          <div className="relative h-4 bg-zinc-900 rounded-sm overflow-hidden mb-2">
            <div className="absolute top-0 left-0 h-full bg-slate-600 w-[68%]" />
          </div>
          <div className="flex justify-between font-mono text-xs text-zinc-500">
            <span>68% USED</span>
            <span>2.1TB FREE</span>
          </div>
        </div>

        {/* Log Stream */}
        <div className="col-span-1 lg:col-span-2 bg-zinc-950 border border-zinc-800/60 p-6 flex flex-col h-96">
          <h2 className="text-sm font-mono text-slate-400 mb-4 uppercase tracking-widest border-b border-zinc-900 pb-2">Transaction_Log</h2>
          <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-2 font-mono text-xs">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-4 text-zinc-500 opacity-70 hover:opacity-100 transition-opacity cursor-default">
                <span className="text-zinc-600">[{new Date().toISOString().split('T')[1].slice(0, 8)}]</span>
                <span className={i % 3 === 0 ? "text-emerald-900" : "text-slate-600"}>{i % 3 === 0 ? "INSERT" : "QUERY"}</span>
                <span className="truncate flex-1">db.detections.find(&#123; confidence: &#123; $gt: 0.8 &#125; &#125;)</span>
                <span className="text-zinc-700">{i * 12 + 4}ms</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}