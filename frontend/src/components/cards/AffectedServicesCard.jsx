import { motion } from "framer-motion";
import { Server, Users, Lock, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const iconMap = {
  "Authentication": Lock,
  "Session Management": Users,
  "User Profile": Users,
  "JWT Security": Lock,
  "Login Testing": Server,
};

export default function AffectedServicesCard({ services = [], count = 5 }) {
  // Mock data if empty
  const displayServices = services.length > 0 ? services : [
    { name: "Authentication", risk: "HIGH" },
    { name: "Session Management", risk: "HIGH" },
    { name: "User Profile", risk: "MEDIUM" },
    { name: "JWT Security", risk: "HIGH" },
    { name: "Login Testing", risk: "LOW" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-card glass-card-hover p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white/80 font-medium text-sm">Affected Services</h3>
        <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
      </div>
      
      <div className="space-y-3 mt-4">
        {displayServices.map((service, idx) => {
          const Icon = iconMap[service.name] || Server;
          const riskColor = service.risk === "HIGH" ? "text-danger bg-danger/10 border-danger/20" : 
                            service.risk === "MEDIUM" ? "text-warning bg-warning/10 border-warning/20" : 
                            "text-success bg-success/10 border-success/20";
          return (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <Icon size={14} className="text-white/70" />
                </div>
                <span className="text-sm text-white/80">{service.name}</span>
              </div>
              <span className={cn("text-[10px] font-semibold px-2 py-1 rounded border", riskColor)}>
                {service.risk}
              </span>
            </div>
          );
        })}
      </div>
      
      <button className="mt-4 text-xs text-primary hover:text-indigo-400 flex items-center gap-1 font-medium transition-colors">
        View Architecture Map <ChevronRight size={12} />
      </button>
    </motion.div>
  );
}
