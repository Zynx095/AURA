export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-12 font-sans selection:bg-purple-900 selection:text-purple-50">
      <header className="mb-12 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            A.U.R.A <span className="text-zinc-600">//</span> Data_Matrix
          </h1>
        </div>
        <p className="text-zinc-500 font-mono text-sm tracking-wide">
          ANALYZING 24H HISTORICAL METRICS
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-zinc-950 border border-zinc-800/60 p-6 h-96 flex flex-col justify-end">
          <h2 className="text-sm font-mono text-purple-500 mb-auto uppercase tracking-widest">Detection_Frequency</h2>
          {/* Abstract Chart Representation */}
          <div className="flex items-end gap-2 h-48 border-b border-zinc-800 pb-2">
            {[...Array(24)].map((_, i) => {
              const height = Math.floor(Math.random() * 80) + 10;
              return (
                <div key={i} className="flex-1 bg-purple-900/30 hover:bg-purple-500/50 transition-colors relative group cursor-crosshair">
                  <div style={{ height: `${height}%` }} className="bg-purple-800 w-full absolute bottom-0" />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-mono text-zinc-600">
            <span>T-24H</span>
            <span>CURRENT</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-zinc-950 border border-zinc-800/60 p-6 flex-1">
             <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Confidence_Avg</h2>
             <p className="text-3xl font-light text-white mt-2">94.2%</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800/60 p-6 flex-1">
             <h2 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Anomalies</h2>
             <p className="text-3xl font-light text-purple-400 mt-2">003</p>
          </div>
        </div>
      </div>
    </div>
  )
}