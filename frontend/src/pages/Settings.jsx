export default function Settings() {
  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-white/50">Application settings and configuration.</p>
      </div>
      <div className="bg-slate-800/50 border border-white/10 p-6 rounded-xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Application Settings</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/70">Theme</span>
              <span className="text-white font-medium">Dark Theme (Current)</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/70">Storage</span>
              <span className="text-white font-medium">Local Storage Enabled</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/70">Version</span>
              <span className="text-white font-medium">OrbitGuard AI v1.0</span>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-white/70">Backend</span>
              <span className="text-green-400 font-medium">FastAPI Connected</span>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <span className="text-white/70">GitLab</span>
              <span className="text-indigo-400 font-medium">Orbit Integration Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
