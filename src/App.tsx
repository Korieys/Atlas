import { useState } from 'react';
import {
  INITIAL_ROBOTS,
  DEGRADATION_DATA_TEMPLATE,
} from './data/mockData';
import type { ProductionData } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/views/DashboardView';
import { MaintenanceView } from './components/views/MaintenanceView';
import { SupplyView } from './components/views/SupplyView';
import { ProductionView } from './components/views/ProductionView';
import { ScheduleView } from './components/views/ScheduleView';
import { CheckpointView } from './components/views/CheckpointView';
import { ReworkView } from './components/views/ReworkView';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [robots, setRobots] = useState(INITIAL_ROBOTS);
  const [agentLogs, setAgentLogs] = useState([
    { id: 1, time: '08:00:01', type: 'info', msg: 'Leipzig Node Connectivity: 100% stable. Buffer states aligned.' },
    { id: 2, time: '08:05:22', type: 'success', msg: 'Energy Peak Shaving: Shifted HVAC load in Finger 3 to off-peak window.' },
    { id: 3, time: '08:12:45', type: 'action', msg: 'RFID Verification: All components for Shift B verified in Buffer A.' },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [chartData, setChartData] = useState<ProductionData[]>(DEGRADATION_DATA_TEMPLATE);

  // Helper to add logs
  const addLog = (msg: string, type: 'info' | 'success' | 'warning' | 'error' | 'action' = 'info') => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    setAgentLogs(prev => [...prev, { id: Date.now(), time, type, msg }]);
  };

  // --- The Simulation Logic (The "Agent") ---
  const simulateFailure = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    // Step 1: Anomaly Detection
    addLog('LOGISTICS ALERT: Tier 2 delay detected on Wiring Looms (A-2).', 'warning');

    // Update chart to show spike
    const spikedData = [...DEGRADATION_DATA_TEMPLATE,
    { time: '21:00', throughput: 75, syncLevel: 80, oee: 70, vibration: 45, temp: 72 },
    { time: '22:00', throughput: 62, syncLevel: 45, oee: 55, vibration: 68, temp: 85 }
    ];
    setChartData(spikedData);

    // Update robot health
    setTimeout(() => {
      setRobots(prev => prev.map(r => r.id === 'R-309' ? { ...r, status: 'Warning', load: 95 } : r));
      addLog('ANALYSIS: ASI (Synchronization Index) dropping below 60%. Finger 4 starvation risk.', 'error');
    }, 1500);

    // Step 2: Inventory & Supply Check
    setTimeout(() => {
      addLog('AGENT INTELLIGENCE: Scanning alternative inbound ports...', 'info');
      addLog('PORT C: Standby capacity active. Redirecting RFID batch #XB-202.', 'success');
    }, 3000);

    // Step 3: Production Re-planning
    setTimeout(() => {
      addLog('RESILIENCE ENGINE: Micro-calibrating Montage speed in Finger 2.', 'info');
      addLog('DECISION: Buffering 14.5% extra safety stock for Montage Finger 3.', 'action');
    }, 5000);

    // Step 4: Execution
    setTimeout(() => {
      addLog('OPTIMIZATION: Spot Buying initiated for safety stock buffer.', 'success');
      addLog('EXECUTION: Autonomous Tug (AGV-12) dispatched for emergency replenishment.', 'success');
      setIsSimulating(false);
    }, 7000);
  };

  const resetSimulation = () => {
    setRobots(INITIAL_ROBOTS);
    setChartData(DEGRADATION_DATA_TEMPLATE);
    addLog('Manual override: Synchronization Index reset. Normal operations resumed.', 'info');
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="pl-64 transition-all duration-300">
        <Header />

        {/* Viewport */}
        <main className="p-8">
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {activeTab === 'dashboard' && 'BMW Atlas Overview'}
                {activeTab === 'checkpoints' && 'F1/F2 Checkpoints'}
                {activeTab === 'maintenance' && 'Predictive Maintenance'}
                {activeTab === 'supply' && 'Supply Chain Intelligence'}
                {activeTab === 'production' && 'Montage Flow Intelligence'}
                {activeTab === 'rework' && 'Rework Station Intelligence'}
                {activeTab === 'schedule' && 'Inspection Scheduler'}
              </h2>
              <p className="text-slate-400">
                Unified Agentic Control Layer • Leipzig • {new Date().toLocaleDateString()}
              </p>
            </div>
            {activeTab === 'maintenance' && (
              <div className="flex gap-2">
                <span className="text-xs text-slate-500 self-center mr-2">Live stream active</span>
                <div className="w-24 h-8 bg-slate-900 rounded border border-slate-700 flex items-center px-2 relative overflow-hidden shadow-inner">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-1 bg-blue-500/50 h-3 rounded-full animate-pulse" style={{ height: Math.random() * 20 + 4 + 'px', animationDelay: i * 0.1 + 's' }}></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            {activeTab === 'dashboard' && <DashboardView chartData={chartData} agentLogs={agentLogs} />}
            {activeTab === 'checkpoints' && <CheckpointView />}
            {activeTab === 'maintenance' && (
              <MaintenanceView
                robots={robots}
                chartData={chartData}
                isSimulating={isSimulating}
                onSimulate={simulateFailure}
                onReset={resetSimulation}
              />
            )}
            {activeTab === 'supply' && <SupplyView />}
            {activeTab === 'production' && <ProductionView isSimulating={isSimulating} />}
            {activeTab === 'rework' && <ReworkView />}
            {activeTab === 'schedule' && <ScheduleView />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
