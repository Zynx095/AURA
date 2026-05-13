export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 md:p-12 font-sans selection:bg-amber-900 selection:text-amber-50 flex flex-col">
      <header className="mb-6 border-b border-zinc-800 pb-6 shrink-0">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-white uppercase">
            A.U.R.A <span className="text-zinc-600">//</span> Neural_Link
          </h1>
        </div>
        <p className="text-zinc-500 font-mono text-sm tracking-wide">
          NATURAL LANGUAGE PROCESSING: ENGAGED
        </p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Main Chat Area */}
        <div className="lg:col-span-3 bg-zinc-950 border border-zinc-800/60 rounded-sm flex flex-col relative overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            <div className="max-w-2xl text-sm font-mono leading-relaxed text-zinc-400 border-l-2 border-amber-900 pl-4">
              <span className="text-amber-500 block mb-2">System // AURA</span>
              Neural pathways initialized. How may I assist with the surveillance parameters today?
            </div>
            {/* User Message Placeholder */}
            <div className="max-w-2xl ml-auto text-sm font-mono leading-relaxed text-zinc-300 bg-zinc-900/50 p-4 border border-zinc-800">
              <span className="text-zinc-500 block mb-2">User // Root</span>
              [ Placeholder entry query ]
            </div>
          </div>
          
          <div className="p-4 border-t border-zinc-800/60 bg-black">
            <div className="flex items-center border border-zinc-700 bg-zinc-900/30 px-4 py-2 focus-within:border-amber-500/50 transition-colors">
              <span className="text-amber-500 font-mono mr-3">{'>'}</span>
              <input 
                type="text" 
                placeholder="Initialize protocol..." 
                className="w-full bg-transparent border-none outline-none text-zinc-200 font-mono text-sm placeholder-zinc-700"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Context Sidebar */}
        <div className="bg-zinc-950 border border-zinc-800/60 rounded-sm p-6 hidden lg:block">
          <h2 className="text-[10px] font-mono text-amber-500 mb-4 uppercase tracking-widest border-b border-zinc-900 pb-2">Context_Memory</h2>
          <ul className="space-y-3 font-mono text-xs text-zinc-500">
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-amber-500/50 rounded-full"/> Vision: Active</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-amber-500/50 rounded-full"/> DB: Connected</li>
            <li className="flex items-center gap-2"><span className="w-1 h-1 bg-zinc-800 rounded-full"/> Webhook: Idle</li>
          </ul>
        </div>
      </div>
    </div>
  )
}