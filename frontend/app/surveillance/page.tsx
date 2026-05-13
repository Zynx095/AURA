export default function SurveillancePage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-12 font-sans selection:bg-emerald-900 selection:text-emerald-50">
      <header className="mb-12 border-b border-zinc-800 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            A.U.R.A <span className="text-zinc-600">//</span> Visual_Grid
          </h1>
        </div>
        <p className="text-zinc-500 font-mono text-sm tracking-wide">
          DETECTION MODEL: YOLOv8n.pt | THRESHOLD: 0.85
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((cam) => (
          <div key={cam} className="bg-zinc-950 border border-zinc-800/60 rounded-sm aspect-video relative group overflow-hidden">
            {/* Corner Crosshairs */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-900/50 group-hover:border-emerald-500 transition-colors" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-900/50 group-hover:border-emerald-500 transition-colors" />
            
            {/* HUD Elements */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-900 text-emerald-500 text-[10px] font-mono">REC</span>
              <span className="text-[10px] font-mono text-zinc-500">CAM_{cam.toString().padStart(2, '0')}</span>
            </div>
            
            {/* Placeholder Feed */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <span className="font-mono text-sm tracking-widest">AWAITING_SIGNAL</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}