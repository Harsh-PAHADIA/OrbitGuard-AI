import { useState } from "react";
import { getHistory, clearHistory } from "../lib/storage";
import { useNavigate } from "react-router-dom";
import { Trash2, ExternalLink } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState(() => getHistory());
  const navigate = useNavigate();

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "CRITICAL": return "text-red-500 bg-red-500/10 border-red-500/20";
      case "HIGH": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
      case "MEDIUM": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default: return "text-green-400 bg-green-400/10 border-green-400/20";
    }
  };

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analysis History</h1>
          <p className="text-white/50">View all previous impact analyses.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors border border-red-400/20"
          >
            <Trash2 size={16} />
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-white/5">
          <p className="text-white/40">No history found. Run an analysis first!</p>
          <button 
            onClick={() => navigate('/analyze')}
            className="mt-4 px-6 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-colors"
          >
            Go to Analyze Impact
          </button>
        </div>
      ) : (
        <div className="bg-slate-800/50 rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-white/60 font-medium text-sm">File / URL</th>
                <th className="px-6 py-4 text-white/60 font-medium text-sm">Timestamp</th>
                <th className="px-6 py-4 text-white/60 font-medium text-sm">Risk Level</th>
                <th className="px-6 py-4 text-white/60 font-medium text-sm">Impact Score</th>
                <th className="px-6 py-4 text-white/60 font-medium text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-white font-medium break-all">{item.changed_file || "Unknown File"}</span>
                  </td>
                  <td className="px-6 py-4 text-white/60 text-sm">
                    {item.timestamp ? new Date(item.timestamp).toLocaleString() : "Unknown Date"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(item.risk_level)}`}>
                      {item.risk_level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">{item.impact_score}/100</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {/* In a real app we'd load the specific history item into context, for now just go back to analyze */}
                    <button 
                      onClick={() => navigate('/analyze')}
                      className="p-2 text-white/40 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
