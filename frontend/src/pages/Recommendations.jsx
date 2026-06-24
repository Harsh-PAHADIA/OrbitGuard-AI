import { useState } from "react";
import { getHistory } from "../lib/storage";
import { Lightbulb, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Recommendations() {
  const [recommendations] = useState(() => {
    const history = getHistory();
    if (history.length > 0 && history[0].recommendations) {
      return history[0].recommendations;
    }
    return [];
  });

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Recommendations</h1>
        <p className="text-white/50">Actionable insights from your latest impact analysis.</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-white/5 flex flex-col items-center">
          <Lightbulb size={48} className="text-white/20 mb-4" />
          <p className="text-white/40">No recommendations available. Try running an analysis.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.map((rec, i) => (
            <div key={i} className="bg-slate-800/50 border border-white/10 p-6 rounded-xl flex items-start gap-4">
              <div className={`p-3 rounded-lg flex-shrink-0 ${
                rec.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                rec.priority === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {rec.priority === 'High' ? <AlertTriangle size={24} /> : 
                 rec.priority === 'Medium' ? <Lightbulb size={24} /> : <ShieldCheck size={24} />}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-white text-lg">{rec.text}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border ${
                    rec.priority === 'High' ? 'border-red-500/20 text-red-400 bg-red-500/10' :
                    rec.priority === 'Medium' ? 'border-orange-500/20 text-orange-400 bg-orange-500/10' :
                    'border-blue-500/20 text-blue-400 bg-blue-500/10'
                  }`}>
                    {rec.priority} Priority
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
