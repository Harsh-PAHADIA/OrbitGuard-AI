import { ShieldAlert, ShieldCheck, ShieldOff } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function RiskCard({ level = "HIGH", reason = "Dependent components may be affected." }) {
  const getRiskConfig = (level) => {
    switch (level?.toUpperCase()) {
      case "CRITICAL":
        return { color: "text-red-600", bg: "bg-red-600/10", border: "border-red-600/30", icon: ShieldAlert, glow: "shadow-[0_0_20px_rgba(220,38,38,0.3)]" };
      case "HIGH":
        return { color: "text-danger", bg: "bg-danger/10", border: "border-danger/30", icon: ShieldAlert, glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]" };
      case "MEDIUM":
        return { color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", icon: ShieldOff, glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]" };
      case "LOW":
      default:
        return { color: "text-success", bg: "bg-success/10", border: "border-success/30", icon: ShieldCheck, glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]" };
    }
  };

  const config = getRiskConfig(level);
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("glass-card glass-card-hover p-6 relative overflow-hidden group", config.border)}
    >
      <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20", config.bg)}></div>
      
      <h3 className="text-white/60 font-medium text-sm mb-4">Risk Level</h3>
      
      <div className="flex items-center gap-4 mb-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", config.bg, config.color, config.glow)}>
          <Icon size={24} />
        </div>
        <div className={cn("text-4xl font-bold tracking-tight", config.color)}>
          {level?.toUpperCase() || "LOW"}
        </div>
      </div>
      
      <p className="text-xs text-white/50 border-t border-white/5 pt-3 mt-4">
        <span className={cn("font-medium", config.color)}>{level?.toUpperCase()} risk detected</span>
        {reason && <span className="block mt-1">{reason}</span>}
      </p>
    </motion.div>
  );
}
