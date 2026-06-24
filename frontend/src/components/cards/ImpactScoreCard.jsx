import { motion } from "framer-motion";
import { PieChart, Pie, Cell } from "recharts";

export default function ImpactScoreCard({ score = 85 }) {
  const data = [
    { name: "Score", value: score },
    { name: "Remaining", value: 100 - score }
  ];
  
  let color = "#10b981"; // success
  if (score >= 80) color = "#ef4444"; // danger
  else if (score >= 50) color = "#f59e0b"; // warning

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="glass-card glass-card-hover p-6 flex flex-col justify-between"
    >
      <h3 className="text-white/60 font-medium text-sm mb-2">Impact Score</h3>
      
      <div className="flex items-center justify-between mt-2">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">{score}</span>
            <span className="text-sm text-white/40">/100</span>
          </div>
          <p className="text-xs text-white/50 mt-2">
            {score >= 80 ? "Very High Impact" : score >= 50 ? "Moderate Impact" : "Low Impact"}
          </p>
        </div>
        
        <div className="w-24 h-24 relative">
            <PieChart width={96} height={96}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                startAngle={180}
                endAngle={0}
                dataKey="value"
                stroke="none"
              >
                <Cell key="cell-0" fill={color} />
                <Cell key="cell-1" fill="#1e293b" />
              </Pie>
            </PieChart>
          <div className="absolute inset-0 flex items-center justify-center -mt-4">
             <span className="text-xs font-semibold" style={{ color }}>{score}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
