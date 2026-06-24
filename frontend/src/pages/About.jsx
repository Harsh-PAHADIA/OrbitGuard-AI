export default function About() {
  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">About OrbitGuard AI</h1>
        <p className="text-white/50">AI-Powered Merge Request Risk Analyzer</p>
      </div>
      <div className="space-y-6">
        <div className="bg-slate-800/50 border border-white/10 p-6 rounded-xl">
          <p className="text-white/80 leading-relaxed">
            OrbitGuard AI helps developers understand the architectural impact of code changes before merging.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 border border-white/10 p-6 rounded-xl">
            <h2 className="text-lg font-bold text-white mb-4">Built With</h2>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> React</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> FastAPI</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Tailwind CSS</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> React Flow</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Local Storage</li>
            </ul>
          </div>
          
          <div className="bg-slate-800/50 border border-white/10 p-6 rounded-xl">
            <h2 className="text-lg font-bold text-white mb-4">Features</h2>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Impact Analysis</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Risk Scoring</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Dependency Visualization</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Report Export</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Historical Tracking</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-primary/20 to-indigo-900/20 border border-primary/20 p-6 rounded-xl text-center">
          <p className="text-white/80 font-medium">Developed for: Gappy AI Hackathon 2026</p>
        </div>
      </div>
    </div>
  );
}
