import { useState } from "react";
import TopNavbar from "./layout/TopNavbar";
import Sidebar from "./layout/Sidebar";
import OrbitAssistantModal from "./layout/OrbitAssistantModal";

export default function Layout({ children }) {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text flex flex-col relative overflow-hidden">
      {/* Background ambient light */}
      <div className="fixed top-0 left-[20%] w-[800px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <TopNavbar />
      
      <div className="flex flex-1">
        <Sidebar onOpenAssistant={() => setIsAssistantOpen(true)} />
        
        <main className="flex-1 ml-64 p-6 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      <OrbitAssistantModal isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
}
