import { useState } from "react";
import AnalyzeSection from "../components/dashboard/AnalyzeSection";
import RiskCard from "../components/cards/RiskCard";
import ImpactScoreCard from "../components/cards/ImpactScoreCard";
import AffectedServicesCard from "../components/cards/AffectedServicesCard";
import ArchitectureViolationsCard from "../components/cards/ArchitectureViolationsCard";
import RecommendationsCard from "../components/cards/RecommendationsCard";
import MRCommentCard from "../components/cards/MRCommentCard";
import { analyzeImpactApi } from "../services/api";
import { saveToHistory } from "../lib/storage";

export default function AnalyzeImpact() {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const res = await analyzeImpactApi(file);
      // Map API response to expected frontend format if needed
      // The backend returns: changed_file, affected_files, risk, impact_score, risk_reason, affected_services, recommendations, architecture_violations, mr_comment
      // Frontend expects: risk_level, impact_score, risk_reason, affected_services, architecture_violations, recommendations
      setResult(res);
      saveToHistory(res);

      if (res.risk_level === "LOW") {
        import("canvas-confetti").then((confetti) => {
          confetti.default({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10b981', '#3b82f6', '#6366f1']
          });
        });
      }
    } catch (error) {
      console.error("Analysis failed", error);
      // Fallback or error handling
      alert("Analysis failed to connect to backend.");
    } finally {
      setIsLoading(false);
    }
  };

  const riskLevel = result?.risk_level || "UNKNOWN";
  const score = result?.impact_score || 0;

  return (
    <div className="pb-12">
      <AnalyzeSection 
        file={file} 
        setFile={setFile} 
        analyzeImpact={handleAnalyze} 
        isLoading={isLoading} 
      />
      
      {isLoading && (
        <div className="mt-8 animate-pulse grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 bg-slate-800/50 rounded-xl border border-white/5"></div>
            <div className="h-40 bg-slate-800/50 rounded-xl border border-white/5"></div>
            <div className="h-40 bg-slate-800/50 rounded-xl border border-white/5"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-slate-800/50 rounded-xl border border-white/5"></div>
            <div className="h-64 bg-slate-800/50 rounded-xl border border-white/5"></div>
          </div>
          <div className="h-48 bg-slate-800/50 rounded-xl border border-white/5"></div>
        </div>
      )}

      {result && !isLoading && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <RiskCard level={riskLevel} reason={result?.risk_reason} />
            <ImpactScoreCard score={score} />
            <AffectedServicesCard services={result?.affected_services} count={result?.affected_services?.length || 0} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ArchitectureViolationsCard violations={result?.architecture_violations} />
            <RecommendationsCard recommendations={result?.recommendations} />
          </div>
          
          <MRCommentCard result={result} />
        </div>
      )}
    </div>
  );
}
