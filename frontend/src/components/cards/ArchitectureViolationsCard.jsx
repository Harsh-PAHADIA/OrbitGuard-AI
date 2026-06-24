import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ArchitectureViolationsCard({ violations = [] }) {
  const displayViolations = violations.length > 0 ? violations : [
    "Frontend component directly depends on backend service"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="glass-card glass-card-hover p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={16} className="text-warning" />
        <h3 className="text-white/80 font-medium text-sm">Architecture Violations</h3>
      </div>
      
      <div className="space-y-3 mt-4">
        {displayViolations.map((violation, idx) => (
          <div key={idx} className="p-3 rounded-lg bg-warning/5 border border-warning/20">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
              <p className="text-sm text-white/70 leading-relaxed">{violation}</p>
            </div>
            <div className="mt-2 ml-3.5">
              <span className="text-[10px] font-medium text-warning bg-warning/10 px-2 py-0.5 rounded border border-warning/20">
                Violation
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
