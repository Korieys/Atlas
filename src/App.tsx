import { useState, useCallback, useEffect } from 'react';
import { ConfigProvider, useAtlas } from './config/ConfigContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/views/DashboardView';
import { MaintenanceView } from './components/views/MaintenanceView';
import { SupplyView } from './components/views/SupplyView';
import { ProductionView } from './components/views/ProductionView';
import { ScheduleView } from './components/views/ScheduleView';
import { CheckpointView } from './components/views/CheckpointView';
import { ReworkView } from './components/views/ReworkView';
import { PageTransition } from './components/common/PageTransition';
import { NotificationToast, useToasts } from './components/common/NotificationToast';

function AppShell() {
  const { config } = useAtlas();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [assets, setAssets] = useState(config.assets);
  const [chartData, setChartData] = useState(config.chartDataTemplate);
  const [agentLogs, setAgentLogs] = useState(config.initialLogs);
  const [isSimulating, setIsSimulating] = useState(false);
  const { toasts, addToast, dismissToast } = useToasts();

  // Reset state when preset/config changes
  useEffect(() => {
    setAssets(config.assets);
    setChartData(config.chartDataTemplate);
    setAgentLogs(config.initialLogs);
    setIsSimulating(false);
  }, [config]);

  // Helper to add logs
  const addLog = useCallback((msg: string, type: 'info' | 'success' | 'warning' | 'error' | 'action' = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setAgentLogs(prev => [...prev, { id: Date.now(), time, type, msg }]);
  }, []);

  // --- The Simulation Logic ---
  const simulateFailure = useCallback(() => {
    if (isSimulating) return;
    setIsSimulating(true);

    const sim = config.simulation;

    // Group steps by delay
    const stepsByDelay = new Map<number, typeof sim.steps>();
    for (const step of sim.steps) {
      const existing = stepsByDelay.get(step.delay) || [];
      existing.push(step);
      stepsByDelay.set(step.delay, existing);
    }

    // Process first step immediately (delay 0)
    const immediateSteps = stepsByDelay.get(0) || [];
    for (const step of immediateSteps) {
      addLog(step.msg, step.type);
    }

    // Spike chart data
    const spikedData = [...config.chartDataTemplate, ...sim.spikeData];
    setChartData(spikedData);

    // Process remaining steps with timeouts
    const delays = Array.from(stepsByDelay.keys()).filter(d => d > 0).sort((a, b) => a - b);
    
    for (const delay of delays) {
      const steps = stepsByDelay.get(delay) || [];
      setTimeout(() => {
        for (const step of steps) {
          addLog(step.msg, step.type);
        }
      }, delay);
    }

    // Update asset health for the target
    setTimeout(() => {
      setAssets(prev => prev.map(r =>
        r.id === sim.targetAssetId ? { ...r, status: 'Warning' as const, load: 95 } : r
      ));
    }, 1500);

    // End simulation
    const maxDelay = Math.max(...Array.from(stepsByDelay.keys()));
    setTimeout(() => {
      setIsSimulating(false);
    }, maxDelay + 500);
  }, [isSimulating, config, addLog]);

  const resetSimulation = useCallback(() => {
    setAssets(config.assets);
    setChartData(config.chartDataTemplate);
    addLog('Manual override: Synchronization Index reset. Normal operations resumed.', 'info');
    setIsSimulating(false);
  }, [config, addLog]);

  // Page titles & descriptions from config
  const pageTitles: Record<string, string> = {
    dashboard: config.dashboardTitle,
    checkpoints: `${config.terminology.checkpoint1}/${config.terminology.checkpoint2} Checkpoints`,
    maintenance: 'Predictive Maintenance',
    supply: 'Supply Chain Intelligence',
    production: `${config.terminology.productionLine} Intelligence`,
    rework: 'Rework Station Intelligence',
    schedule: 'Inspection Scheduler',
  };

  return (
    <div className="min-h-screen bg-noise selection:bg-blue-500/30">
      <NotificationToast toasts={toasts} onDismiss={dismissToast} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content — responsive to sidebar */}
      <div className="pl-64 transition-all duration-300">
        <Header onNotification={(msg) => addToast(msg, 'info')} />

        <main className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1.5 tracking-tight">
                {pageTitles[activeTab] || 'Atlas'}
              </h2>
              <div className="flex items-center gap-2 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-slate-800/50 backdrop-blur-sm max-w-2xl">
                <span className="text-[10px] font-bold tracking-wider" style={{ color: `hsl(var(--atlas-primary))` }}>CONTEXT</span>
                <p className="text-slate-400 text-xs">
                  {config.pageDescriptions[activeTab] || ''}
                </p>
              </div>
              <p className="text-slate-500 text-[10px] mt-2 uppercase tracking-[0.15em] opacity-60">
                ATLAS PLATFORM • Unified Agentic Control Layer • {config.terminology.plantName} • {new Date().toLocaleDateString()}
              </p>
            </div>
            {activeTab === 'maintenance' && (
              <div className="flex gap-2 items-center">
                <span className="text-[10px] text-slate-500">Live stream active</span>
                <div className="w-20 h-7 bg-slate-900/60 rounded-lg border border-slate-700/50 flex items-center px-2 relative overflow-hidden">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className="w-1 rounded-full animate-pulse"
                        style={{
                          height: Math.random() * 16 + 4 + 'px',
                          animationDelay: i * 0.1 + 's',
                          background: `hsl(var(--atlas-primary) / 0.5)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Views */}
          <div className="mt-4">
            <PageTransition activeKey={activeTab}>
              {activeTab === 'dashboard' && <DashboardView chartData={chartData} agentLogs={agentLogs} />}
              {activeTab === 'checkpoints' && <CheckpointView />}
              {activeTab === 'maintenance' && (
                <MaintenanceView
                  robots={assets}
                  chartData={chartData}
                  isSimulating={isSimulating}
                  onSimulate={simulateFailure}
                  onReset={resetSimulation}
                />
              )}
              {activeTab === 'supply' && <SupplyView addToast={addToast} />}
              {activeTab === 'production' && <ProductionView isSimulating={isSimulating} />}
              {activeTab === 'rework' && <ReworkView />}
              {activeTab === 'schedule' && <ScheduleView addToast={addToast} />}
            </PageTransition>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ConfigProvider>
      <AppShell />
    </ConfigProvider>
  );
}

export default App;
