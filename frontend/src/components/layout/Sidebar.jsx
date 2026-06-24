
import { LayoutDashboard, Activity, History, Map, FileText, Settings, Info, Lightbulb } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Activity, label: "Analyze Impact", href: "/analyze" },
  { icon: History, label: "History", href: "/history" },
  { icon: Map, label: "Architecture Map", href: "/map" },
  { icon: FileText, label: "Saved Reports", href: "/reports" },
  { icon: Lightbulb, label: "Recommendations", href: "/recommendations" },
];

export default function Sidebar({ onOpenAssistant }) {
  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-white/10 bg-card/50 backdrop-blur-sm flex flex-col justify-between overflow-y-auto">
      <div className="py-6 flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative overflow-hidden",
              isActive
                ? "text-primary bg-primary/10 border border-primary/20"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                )}
                <item.icon size={18} className={cn("transition-colors", isActive ? "text-primary" : "text-white/40 group-hover:text-white/70")} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
        
        <div className="h-px bg-white/10 my-4 mx-3"></div>
        
        <NavLink to="/settings" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group", isActive ? "text-primary bg-primary/10" : "text-white/60 hover:text-white hover:bg-white/5")}>
          <Settings size={18} className={cn("transition-colors", window.location.pathname === "/settings" ? "text-primary" : "text-white/40 group-hover:text-white/70")} />
          Settings
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group", isActive ? "text-primary bg-primary/10" : "text-white/60 hover:text-white hover:bg-white/5")}>
          <Info size={18} className={cn("transition-colors", window.location.pathname === "/about" ? "text-primary" : "text-white/40 group-hover:text-white/70")} />
          About
        </NavLink>
      </div>

      <div className="p-4 m-4 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
        <h4 className="font-semibold text-white mb-1 relative z-10 flex items-center gap-2">
          Orbit Assistant
        </h4>
        <p className="text-xs text-white/50 mb-3 relative z-10">
          Ask anything about your codebase...
        </p>
        <button onClick={onOpenAssistant} className="w-full py-2 bg-primary hover:bg-indigo-400 text-white text-sm font-medium rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] relative z-10">
          Ask Orbit
        </button>
      </div>
    </aside>
  );
}
