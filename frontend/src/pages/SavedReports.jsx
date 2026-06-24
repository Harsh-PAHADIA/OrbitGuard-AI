import { useState } from "react";
import { getSavedReports, deleteReport } from "../lib/storage";
import { FileText, Download, Trash2 } from "lucide-react";
import jsPDF from "jspdf";

export default function SavedReports() {
  const [reports, setReports] = useState(() => getSavedReports());

  const handleDelete = (id) => {
    deleteReport(id);
    setReports(getSavedReports());
  };

  const handleExportPDF = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`OrbitGuard AI Report: ${report.changed_file || 'Unknown File'}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Risk Level: ${report.risk_level}`, 20, 40);
    doc.text(`Impact Score: ${report.impact_score}`, 20, 50);
    doc.text(`Timestamp: ${report.timestamp ? new Date(report.timestamp).toLocaleString() : 'Unknown Date'}`, 20, 60);
    doc.text(`Reason: ${report.risk_reason || 'N/A'}`, 20, 80);
    doc.save(`orbitguard-report-${report.id}.pdf`);
  };

  return (
    <div className="pb-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Saved Reports</h1>
        <p className="text-white/50">Manage and export your saved analysis reports.</p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/30 rounded-xl border border-white/5 flex flex-col items-center">
          <FileText size={48} className="text-white/20 mb-4" />
          <p className="text-white/40">No reports saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-slate-800/50 border border-white/10 p-6 rounded-xl relative group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <FileText size={24} />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  report.risk_level === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                  report.risk_level === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {report.risk_level}
                </div>
              </div>
              
              <h3 className="font-bold text-white truncate mb-1" title={report.changed_file || 'Unknown File'}>{report.changed_file || 'Unknown File'}</h3>
              <p className="text-xs text-white/50 mb-6">{report.timestamp ? new Date(report.timestamp).toLocaleString() : 'Unknown Date'}</p>
              
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                <button 
                  onClick={() => handleExportPDF(report)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={16} /> PDF
                </button>
                <button 
                  onClick={() => handleDelete(report.id)}
                  className="p-2 text-red-400 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
                  title="Delete Report"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
