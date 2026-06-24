import { motion } from "framer-motion";
import { Activity, ShieldAlert, AlertOctagon, Zap } from "lucide-react";

export default function QuickInsights() {
  const insights = [
    { label: "Total Analyses", value: "24", icon: Activity, color: "text-primary" },
    { label: "High Risks", value: "8", icon: ShieldAlert, color: "text-danger" },
    { label: "Critical Risks", value: "3", icon: AlertOctagon, color: "text-red-500" },
    { label: "Avg Impact Score", value: "62", icon: Zap, color: "text-success" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-8"
    >
      <h3 className="text-white/80 font-medium text-sm mb-4">Quick Insights</h3>
      
      <div className="space-y-3">
        {insights.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-3">
              <item.icon size={14} className={item.color} />
              <span className="text-sm text-white/70">{item.label}</span>
            </div>
            <span className="text-sm font-bold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
