import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

import { useState } from "react";
import { getHistory } from "../../lib/storage";

export default function RecentAnalyses() {
  const [analyses] = useState(() => getHistory().slice(0, 5));

  const formatTime = (isoString) => {
    if (!isoString) return "Unknown time";
    const date = new Date(isoString);
    const diffMins = Math.floor((new Date() - date) / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <h3 className="text-white/80 font-medium text-sm mb-4">Recent Analyses</h3>
      
      <div className="space-y-3">
        {analyses.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-1 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-white/90">{item.changed_file || 'Unknown File'}</span>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded",
                item.risk_level === "CRITICAL" ? "bg-red-600/20 text-red-500 border border-red-600/30" :
                item.risk_level === "HIGH" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20" :
                "bg-green-500/10 text-green-400 border border-green-500/20"
              )}>
                {item.risk_level || "UNKNOWN"}
              </span>
            </div>
            <span className="text-xs text-white/40">{formatTime(item.timestamp)}</span>
          </div>
        ))}
      </div>
      {analyses.length === 0 && (
        <p className="text-white/40 text-sm text-center py-4">No analyses performed yet</p>
      )}
    </motion.div>
  );
}
