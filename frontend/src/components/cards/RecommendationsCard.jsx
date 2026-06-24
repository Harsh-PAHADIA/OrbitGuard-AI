import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export default function RecommendationsCard({ recommendations = [] }) {
  const displayRecs = recommendations.length > 0 ? recommendations : [
    { text: "Run full regression testing", priority: "High" },
    { text: "Review architecture boundaries", priority: "Medium" },
    { text: "Request senior developer review", priority: "High" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="glass-card glass-card-hover p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 size={16} className="text-success" />
        <h3 className="text-white/80 font-medium text-sm">Recommendations</h3>
      </div>
      
      <div className="space-y-3 mt-4">
        {displayRecs.map((rec, idx) => {
          const isHigh = rec.priority === "High";
          return (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={14} className="text-success" />
                <span className="text-sm text-white/70">{rec.text}</span>
              </div>
              <span className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded",
                isHigh ? "text-danger bg-danger/10" : "text-warning bg-warning/10"
              )}>
                {rec.priority}
              </span>
            </div>
          );
        })}
      </div>

      <button className="mt-4 text-xs text-primary hover:text-indigo-400 flex items-center gap-1 font-medium transition-colors">
        View All Recommendations <ChevronRight size={12} />
      </button>
    </motion.div>
  );
}
