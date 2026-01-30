import { useState } from 'react';
import {
  INITIAL_ROBOTS,
  DEGRADATION_DATA_TEMPLATE
} from './data/mockData';
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
    { id: 1, time: '08:00:01', type: 'info', msg: 'System initialized. Monitoring 4,203 nodes.' },
    { id: 2, time: '08:05:22', type: 'success', msg: 'Inventory optimization complete. Reduced buffer stock by 4%.' },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [chartData, setChartData] = useState(DEGRADATION_DATA_TEMPLATE);

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
    addLog('SENSOR ALERT: High frequency vibration detected on R-101 (Welding Arm A).', 'warning');

    // Update chart to show spike
    const spikedData = [...DEGRADATION_DATA_TEMPLATE,
    { time: '21:00', vibration: 45, temp: 72 },
    { time: '22:00', vibration: 68, temp: 85 }
    ];
    setChartData(spikedData);

    // Update robot health
    setTimeout(() => {
      setRobots(prev => prev.map(r => r.id === 'R-101' ? { ...r, status: 'Critical', health: 32 } : r));
      addLog('ANALYSIS: Gearbox #GB-404 wear acceleration. Failure probability 99% within 48h.', 'error');
    }, 1500);

    // Step 2: Inventory & Supply Check
    setTimeout(() => {
      addLog('AGENT: Querying Global Inventory...', 'info');
      addLog('INVENTORY: Gearbox #GB-404 available in Warehouse B (Slot A-12).', 'success');
    }, 3000);

    // Step 3: Production Re-planning
    setTimeout(() => {
      addLog('RESILIENCE ENGINE: Calculating impact of immediate downtime...', 'info');
      addLog('DECISION: Re-routing Line 4 tasks to Robot R-102. Takt time adjusted +1.2s.', 'action');
      setRobots(prev => prev.map(r => r.id === 'R-102' ? { ...r, load: 98, status: 'Warning' } : r));
    }, 5000);

    // Step 4: Execution
    setTimeout(() => {
      addLog('EXECUTION: Maintenance Work Order #WO-9928 created automatically.', 'success');
      addLog('EXECUTION: AGV dispatched to Warehouse B for part pickup.', 'success');
      setRobots(prev => prev.map(r => r.id === 'R-101' ? { ...r, status: 'Action', nextService: 'Now' } : r));
      setIsSimulating(false);
    }, 7000);
  };

  const resetSimulation = () => {
    setRobots(INITIAL_ROBOTS);
    setChartData(DEGRADATION_DATA_TEMPLATE);
    addLog('System reset. Normal monitoring resumed.', 'info');
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
