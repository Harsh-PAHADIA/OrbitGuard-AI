import { useState } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { getHistory } from "../../lib/storage";

export default function OrbitAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm OrbitAssistant. Ask me anything about your recent analyses or codebase risks." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response based on latest analysis
    setTimeout(() => {
      const history = getHistory();
      const latest = history[0];
      
      let response = "I'm not sure about that.";
      const lowerInput = input.toLowerCase();
      
      if (!latest) {
        response = "It looks like you haven't run any analyses yet. Try analyzing a file first!";
      } else if (lowerInput.includes("why is this risk high") || lowerInput.includes("reason")) {
        response = `The risk for ${latest.changed_file || 'the file'} is ${latest.risk_level} because: ${latest.risk_reason}`;
      } else if (lowerInput.includes('services') || lowerInput.includes('affected')) {
        response = `Based on the latest analysis of ${latest.changed_file || 'the file'}, you should focus on testing these affected services: ${latest.affected_services.map(s => s.name).join(', ')}.`;
      } else if (lowerInput.includes('score') || lowerInput.includes('impact')) {
        response = `The impact score for ${latest.changed_file || 'the file'} is ${latest.impact_score}/100.`;
      } else if (lowerInput.includes('fix') || lowerInput.includes('recommend')) {
        response = `Here is a recommendation: ${latest.recommendations[0]?.text || 'No specific recommendations'}.`;
      } else {
        response = `Based on the latest analysis of ${latest?.changed_file || 'your code'}, the overall risk score is ${latest?.impact_score || 'N/A'}/100. Let me know if you want to know about affected services or specific recommendations!`;
      }

      setMessages(msgs => [...msgs, { role: 'assistant', text: response }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 max-h-[600px] flex flex-col bg-slate-900 border border-primary/30 shadow-2xl rounded-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="p-4 bg-gradient-to-r from-primary/20 to-indigo-900/40 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="text-primary" size={20} />
          <h3 className="font-bold text-white">Orbit Assistant</h3>
        </div>
        <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[400px] flex flex-col gap-4 bg-slate-900">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-primary/20 text-primary'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 border border-white/10 text-white/90 rounded-tl-none'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 bg-slate-900">
        <div className="flex items-center gap-2 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about your codebase..."
            className="w-full bg-slate-800 border border-white/10 rounded-lg py-2 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-indigo-400 p-1"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
