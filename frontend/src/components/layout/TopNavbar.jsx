import { ShieldAlert } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md flex h-16 items-center px-6 justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-danger text-white">
          <ShieldAlert size={20} />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight tracking-tight text-text">OrbitGuard AI</span>
          <span className="text-[10px] text-white/50 leading-tight">AI-Powered Merge Request Risk Analyzer</span>
        </div>
        
        <div className="ml-6 px-3 py-1 rounded-full bg-slate-800/50 border border-primary/30 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
          <span className="text-xs font-medium text-primary">GitLab Orbit Powered</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-px h-6 bg-white/10 mx-1"></div>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-sm font-semibold border border-white/10 group-hover:border-primary/50 transition-colors">
            D
          </div>
          <div className="flex flex-col hidden sm:flex">
            <span className="text-sm font-medium text-text group-hover:text-primary transition-colors">Dev User</span>
            <span className="text-[10px] text-white/50">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
