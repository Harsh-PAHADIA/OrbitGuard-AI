import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Mon', risk: 40 },
  { name: 'Tue', risk: 65 },
  { name: 'Wed', risk: 45 },
  { name: 'Thu', risk: 85 },
  { name: 'Fri', risk: 55 },
  { name: 'Sat', risk: 75 },
  { name: 'Sun', risk: 40 },
];

export default function RiskTrendChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <h3 className="text-white/80 font-medium text-sm mb-4">Risk Trend (7 Days)</h3>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
            <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20', borderRadius: '8px' }}
              itemStyle={{ color: '#ef4444' }}
            />
            <Line 
              type="monotone" 
              dataKey="risk" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={{ fill: '#0f172a', stroke: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#ef4444', stroke: '#0f172a', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
