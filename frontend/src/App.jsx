import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AnalyzeImpact from "./pages/AnalyzeImpact";
import History from "./pages/History";
import ArchitectureMap from "./pages/ArchitectureMap";
import SavedReports from "./pages/SavedReports";
import Recommendations from "./pages/Recommendations";
import Settings from "./pages/Settings";
import About from "./pages/About";
import "./index.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzeImpact />} />
        <Route path="/history" element={<History />} />
        <Route path="/map" element={<ArchitectureMap />} />
        <Route path="/reports" element={<SavedReports />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Layout>
  );
}

export default App;