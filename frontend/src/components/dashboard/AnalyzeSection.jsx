import { Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyzeSection({ file, setFile, analyzeImpact, isLoading }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <h1 className="text-2xl font-bold text-white mb-2">Analyze Code Change Impact</h1>
      <p className="text-sm text-white/50 mb-6">Enter the file path you changed in your merge request</p>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
            placeholder="e.g. frontend/Login.jsx"
          />
        </div>
        <button
          onClick={analyzeImpact}
          disabled={isLoading}
          className="flex items-center gap-2 bg-primary hover:bg-indigo-500 text-white font-medium py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Zap size={18} className="fill-white/20" />
          )}
          Analyze Impact
        </button>
      </div>
    </motion.div>
  );
}
