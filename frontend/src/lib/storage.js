export const STORAGE_KEYS = {
  HISTORY: 'orbitguard_history',
  SAVED_REPORTS: 'orbitguard_saved_reports',
};

// History functions
export const getHistory = () => {
  const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
  return data ? JSON.parse(data) : [];
};

export const saveToHistory = (analysisResult) => {
  const history = getHistory();
  const entry = { ...analysisResult, timestamp: analysisResult.timestamp || new Date().toISOString() };
  // Ensure we don't have duplicates for the exact same timestamp
  const newHistory = [entry, ...history].slice(0, 50); // Keep last 50
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
};

// Saved Reports functions
export const getSavedReports = () => {
  const data = localStorage.getItem(STORAGE_KEYS.SAVED_REPORTS);
  return data ? JSON.parse(data) : [];
};

export const saveReport = (report) => {
  const reports = getSavedReports();
  const entry = { 
    ...report, 
    id: report.id || Date.now().toString(),
    timestamp: report.timestamp || new Date().toISOString()
  };
  const newReports = [entry, ...reports];
  localStorage.setItem(STORAGE_KEYS.SAVED_REPORTS, JSON.stringify(newReports));
};

export const deleteReport = (id) => {
  const reports = getSavedReports();
  const newReports = reports.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.SAVED_REPORTS, JSON.stringify(newReports));
};

export const getDashboardStats = () => {
  const history = getHistory();
  if (history.length === 0) {
    return {
      total: 0,
      highRisk: 0,
      critical: 0,
      avgScore: 0
    };
  }

  const highRisk = history.filter(h => h.risk_level === 'HIGH').length;
  const critical = history.filter(h => h.risk_level === 'CRITICAL').length;
  const avgScore = Math.round(history.reduce((acc, curr) => acc + curr.impact_score, 0) / history.length);

  return {
    total: history.length,
    highRisk,
    critical,
    avgScore
  };
};
