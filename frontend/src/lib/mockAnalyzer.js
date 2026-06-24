export const generateMockAnalysis = (filePathOrUrl) => {
  // Simple heuristic to generate different results based on string contents
  const isHighRisk = filePathOrUrl.includes('auth') || filePathOrUrl.includes('login') || filePathOrUrl.includes('db');
  const isCritical = filePathOrUrl.includes('payment') || filePathOrUrl.includes('security');
  
  let riskLevel = 'LOW';
  let impactScore = 20 + Math.floor(Math.random() * 30); // 20-50
  
  if (isCritical) {
    riskLevel = 'CRITICAL';
    impactScore = 90 + Math.floor(Math.random() * 10); // 90-100
  } else if (isHighRisk) {
    riskLevel = 'HIGH';
    impactScore = 70 + Math.floor(Math.random() * 20); // 70-89
  } else if (filePathOrUrl.includes('components')) {
    riskLevel = 'MEDIUM';
    impactScore = 50 + Math.floor(Math.random() * 20); // 50-69
  }

  return {
    id: Date.now().toString(),
    file: filePathOrUrl,
    timestamp: new Date().toISOString(),
    risk_level: riskLevel,
    impact_score: impactScore,
    risk_reason: riskLevel === 'CRITICAL' ? 'Core security/payment flow modified.' :
                 riskLevel === 'HIGH' ? 'Authentication or database layer affected.' :
                 'Minor component changes detected.',
    affected_services: [
      { name: 'Frontend App', status: 'affected' },
      { name: 'Auth Service', status: isHighRisk || isCritical ? 'affected' : 'safe' },
      { name: 'Database API', status: isCritical ? 'affected' : 'safe' },
      { name: 'Payment Gateway', status: isCritical ? 'affected' : 'safe' },
      { name: 'User Service', status: isHighRisk ? 'affected' : 'safe' },
    ].filter(s => s.status === 'affected'),
    architecture_violations: [
      riskLevel === 'CRITICAL' ? { rule: 'Direct DB access from frontend', severity: 'High', description: 'Found direct query execution in client-side code.' } : null,
      isHighRisk ? { rule: 'Missing Auth middleware', severity: 'Medium', description: 'Route missing proper authentication guard.' } : null,
      { rule: 'Large bundle size', severity: 'Low', description: 'Component imports entire lodash library.' }
    ].filter(Boolean),
    recommendations: [
      riskLevel === 'CRITICAL' ? { title: 'Implement Payment Gateway Sandbox', priority: 'High', impact: 'Prevents live transactions during dev' } : null,
      isHighRisk ? { title: 'Add JWT Validation', priority: 'High', impact: 'Secures endpoint from unauthorized access' } : null,
      { title: 'Use targeted imports', priority: 'Low', impact: 'Reduces bundle size by 15%' }
    ].filter(Boolean),
    mr_comment_markdown: `## OrbitGuard AI Analysis\n\n**Risk Level:** ${riskLevel}\n**Impact Score:** ${impactScore}/100\n\n### Summary\n${riskLevel === 'CRITICAL' ? 'This merge request contains critical changes that affect core security or payment flows. **Immediate review required.**' : 'Changes analyzed successfully.'}`
  };
};
