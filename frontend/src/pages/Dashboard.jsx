import RecentAnalyses from "../components/analytics/RecentAnalyses";
import RiskTrendChart from "../components/analytics/RiskTrendChart";
import QuickInsights from "../components/analytics/QuickInsights";
import { getDashboardStats, getHistory } from "../lib/storage";

export default function Dashboard() {
  const stats = getDashboardStats();
  const history = getHistory();
  const latest = history.length > 0 ? history[0] : null;

  return (
    <div className="flex gap-8 pb-12">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-white mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/50 border border-white/10 p-4 rounded-xl">
            <p className="text-white/50 text-sm">Total Analyses</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
          </div>
          <div className="bg-slate-800/50 border border-white/10 p-4 rounded-xl">
            <p className="text-white/50 text-sm">High Risk</p>
            <p className="text-3xl font-bold text-orange-400 mt-1">{stats.highRisk}</p>
          </div>
          <div className="bg-slate-800/50 border border-white/10 p-4 rounded-xl">
            <p className="text-white/50 text-sm">Critical</p>
            <p className="text-3xl font-bold text-red-500 mt-1">{stats.critical}</p>
          </div>
          <div className="bg-slate-800/50 border border-white/10 p-4 rounded-xl">
            <p className="text-white/50 text-sm">Avg Impact Score</p>
            <p className="text-3xl font-bold text-blue-400 mt-1">{stats.avgScore}</p>
          </div>
        </div>

        <RiskTrendChart />
        <div className="mt-8">
            <QuickInsights />
        </div>
      </div>
      
      {/* Right Sidebar (Analytics) */}
      <div className="w-80 hidden xl:block flex-shrink-0">
        <RecentAnalyses />
        
        {latest && (
          <div className="mt-6 p-6 rounded-xl bg-slate-800/80 border border-white/10 relative overflow-hidden group">
            <h3 className="text-white font-bold text-lg mb-4">Latest Risk Summary</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Analyzed File</p>
                <p className="text-white text-sm break-all font-mono">{latest.changed_file || 'Unknown File'}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Risk Level</p>
                  <p className={`text-sm font-bold ${
                    latest.risk_level === 'CRITICAL' ? 'text-red-500' :
                    latest.risk_level === 'HIGH' ? 'text-orange-400' :
                    'text-green-400'
                  }`}>{latest.risk_level}</p>
                </div>
                <div>
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Impact Score</p>
                  <p className="text-white text-sm font-bold">{latest.impact_score}/100</p>
                </div>
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Timestamp</p>
                <p className="text-white text-sm">{latest.timestamp ? new Date(latest.timestamp).toLocaleString() : "Unknown Date"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
