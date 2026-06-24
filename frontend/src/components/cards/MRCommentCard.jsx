import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Download, Save } from "lucide-react";
import jsPDF from "jspdf";
import { saveReport } from "../../lib/storage";

export default function MRCommentCard({ result }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const commentText = result?.mr_comment_markdown || `No analysis available.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(commentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveReport = () => {
    if (!result) return;
    saveReport({ ...result });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = (format) => {
    if (!result) return;
    
    const filename = `orbitguard-analysis-${Date.now()}`;
    
    if (format === 'PDF') {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("OrbitGuard AI Analysis", 20, 20);
      doc.setFontSize(12);
      const splitText = doc.splitTextToSize(commentText, 170);
      doc.text(splitText, 20, 30);
      doc.save(`${filename}.pdf`);
    } else {
      const blob = new Blob([commentText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.${format.toLowerCase()}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6 mt-6 border-white/10"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <h3 className="text-white/80 font-medium text-sm">Merge Request Comment</h3>
        
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            onClick={() => handleExport('MD')}
            className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
          >
            <Download size={14} /> MD
          </button>
          <button 
            onClick={() => handleExport('TXT')}
            className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
          >
            <Download size={14} /> TXT
          </button>
          <button 
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
          >
            <Download size={14} /> PDF
          </button>
          <button 
            onClick={handleSaveReport}
            className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors border border-white/10"
          >
            {saved ? <Check size={14} className="text-success" /> : <Save size={14} />}
            {saved ? "Saved" : "Save"}
          </button>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs font-medium text-primary hover:text-indigo-400 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-lg transition-colors border border-primary/20"
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      
      <div className="bg-[#0b1120] rounded-lg p-4 border border-white/5 font-mono text-sm text-white/70 overflow-x-auto whitespace-pre-wrap">
        {commentText}
      </div>
    </motion.div>
  );
}
