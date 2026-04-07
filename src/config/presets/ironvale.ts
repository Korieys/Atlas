// ─── Ironvale Steel — Heavy Manufacturing Preset ─────────────────────────
// Default showcase preset: Steel manufacturing facility

import type { AtlasConfig } from '../atlasConfig';

const ironvale: AtlasConfig = {
  company: {
    name: 'Ironvale Steel',
    tagline: 'Forging the Future',
    industry: 'Steel Manufacturing',
    logoText: 'IV',
    subtitle: 'INTELLIGENCE',
  },

  theme: {
    primary: '220 70% 55%',
    primaryHex: '#3b7dd8',
    accent: '262 60% 55%',
    accentHex: '#8b5cf6',
    surface: 'rgba(15, 23, 42, 0.8)',
    surfaceBorder: 'rgba(51, 65, 85, 0.5)',
    background: '#020617',
    sidebarBg: '#0f172a',
    headerBg: 'rgba(2, 6, 23, 0.8)',
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#475569',
    success: '160 84% 39%',
    successHex: '#10b981',
    warning: '38 92% 50%',
    warningHex: '#f59e0b',
    danger: '0 84% 60%',
    dangerHex: '#ef4444',
    info: '217 91% 60%',
    infoHex: '#3b82f6',
  },

  terminology: {
    plant: 'Facility',
    plantName: 'Sheffield Mill',
    shift: 'B (14:00 – 22:00)',
    unitId: 'Heat No.',
    unitName: 'Coil',
    zone: 'Bay',
    zones: [
      { id: 'B-1', name: 'Bay 1 (Melt Shop)', health: 98, load: 85, bottleneck: false, status: 'Optimal', reason: 'Normal operation' },
      { id: 'B-2', name: 'Bay 2 (Caster)', health: 94, load: 88, bottleneck: false, status: 'Optimal', reason: 'Normal operation' },
      { id: 'B-3', name: 'Bay 3 (Hot Roll)', health: 76, load: 92, bottleneck: true, status: 'Warning', reason: 'Roll gap variance detected — torque exceeding threshold on Stand 3.' },
      { id: 'B-4', name: 'Bay 4 (Finishing)', health: 92, load: 45, bottleneck: false, status: 'Underutilized', reason: 'Waiting for upstream batch' },
    ],
    productionLine: 'Rolling Line',
    checkpoint1: 'QC-1',
    checkpoint2: 'QC-2',
    checkpoint1Label: 'Surface & Dimension Check',
    checkpoint2Label: 'Final Certification & Dispatch',
    assetType: 'Machine',
    supplier: 'Supplier',
    entryPoint: 'Receiving Dock',
  },

  modules: [
    { id: 'dashboard', icon: 'LayoutDashboard', label: 'Overview', enabled: true },
    { id: 'checkpoints', icon: 'CheckCircle2', label: 'Quality Gates', enabled: true },
    { id: 'maintenance', icon: 'RefreshCw', label: 'Predictive Maint.', enabled: true },
    { id: 'supply', icon: 'Truck', label: 'Supply Chain', enabled: true },
    { id: 'production', icon: 'Factory', label: 'Line Flow', enabled: true },
    { id: 'rework', icon: 'Wrench', label: 'Rework Station', enabled: true },
    { id: 'schedule', icon: 'Calendar', label: 'Inspection Sched.', enabled: true },
  ],

  dashboardKPIs: [
    { label: 'Overall Health', value: '97.4%', icon: 'Activity', color: 'emerald', progress: 97.4 },
    { label: 'Active Agents', value: '612', icon: 'BrainCircuit', color: 'blue', subtext: 'Autonomous decisions/hr: 948' },
    { label: 'Facility Status', value: 'On Schedule', icon: 'Box', color: 'purple', subtext: 'Buffer levels optimized for Shift B' },
    { label: 'Predicted Risks', value: '3', icon: 'ShieldAlert', color: 'amber', subtext: '2 Supply, 1 Mechanical' },
  ],

  oeeMetrics: [
    { name: 'Availability', value: 94.2, target: 95 },
    { name: 'Performance', value: 91.5, target: 92 },
    { name: 'Quality', value: 98.8, target: 99 },
  ],

  productionVolume: {
    actual: 1240,
    goal: 1400,
    startTime: '06:00',
    endTime: '14:00',
  },

  dashboardTitle: 'Ironvale Operations Overview',
  cockpitTitle: 'Productivity Cockpit',
  cockpitSubtitle: 'Sheffield Digital Twin',

  assets: [
    { id: 'M-101', name: 'Arc Furnace Alpha', zone: 'Melt Shop', status: 'Optimal', health: 98, load: 85, nextService: '14 days' },
    { id: 'M-102', name: 'Arc Furnace Beta', zone: 'Melt Shop', status: 'Optimal', health: 96, load: 82, nextService: '21 days' },
    { id: 'M-205', name: 'Caster Unit X', zone: 'Caster Bay', status: 'Warning', health: 74, load: 60, nextService: '3 days' },
    { id: 'M-309', name: 'Rolling Stand Delta', zone: 'Hot Roll', status: 'Optimal', health: 92, load: 88, nextService: '30 days' },
  ],

  suppliers: [
    { id: 'S-01', name: 'Nordic Alloys', category: 'Ferro-alloys', stability: 98, risk: 'Low', leadTime: '2 days' },
    { id: 'S-04', name: 'RareMet Global', category: 'Scrap & Feedstock', stability: 65, risk: 'High', leadTime: '14 days', riskDetail: 'Scrap metal price volatility detected (8-day window).', historicalNote: '"2024 Q3 Shortage: Ironvale mitigated via spot-market buying and alternate feedstock blends."', mitigations: ['Action: Spot Buy', 'Action: Alternate Feedstock'] },
    { id: 'S-09', name: 'Chem-Tech Europe', category: 'Refractories', stability: 92, risk: 'Low', leadTime: '5 days' },
  ],

  entryPoints: [
    { id: 'D-A', name: 'Dock A (North Rail)', status: 'Active', capacity: '92%' },
    { id: 'D-B', name: 'Dock B (South Road)', status: 'Active', capacity: '78%' },
    { id: 'D-C', name: 'Dock C (River Terminal)', status: 'Standby', capacity: '15%' },
  ],

  partLocations: [
    { id: 'FA-1', part: 'Ferro-alloy Batch A', currentPort: 'D-B', arrivalTime: '06:00', status: 'In Transit' },
    { id: 'SC-4', part: 'Scrap Feedstock S-04', currentPort: 'D-A', arrivalTime: '14:30', status: 'Processing' },
  ],

  shortageData: [
    { name: 'Scrap Metal', risk: 85, stock: 40 },
    { name: 'Ferro-alloys', risk: 20, stock: 90 },
    { name: 'Refractories', risk: 35, stock: 80 },
    { name: 'Electrodes', risk: 60, stock: 55 },
    { name: 'Flux Materials', risk: 45, stock: 70 },
  ],

  shortageMitigations: [
    'Activate "Sheffield-Buffer" Protocol: Increase safety stock for scrap metal by 15%.',
    'Multi-sourcing: Fast-track qualification for Tier 2 supplier in Turkey for Ferro-alloys.',
  ],

  shortageHistoricalNote: '"Model detected shift in scrap metal availability similar to 2023 energy crisis event. Proactive buffering saved Sheffield Mill 4 days of downtime during that period. Suggest repeating similar safety stock increase."',

  productionStages: [
    { id: 'ST-1', name: 'Melt Shop', status: 'Optimal', output: 120, target: 120 },
    { id: 'ST-2', name: 'Caster', status: 'Warning', output: 95, target: 110, issue: 'M-102 Load Balancing' },
    { id: 'ST-3', name: 'Hot Roll', status: 'Optimal', output: 110, target: 110 },
    { id: 'ST-4', name: 'Cold Roll', status: 'Optimal', output: 108, target: 110 },
    { id: 'ST-5', name: 'Finishing', status: 'Optimal', output: 108, target: 110 },
  ],

  checkpointUnits: [
    { id: 'HT-7721', model: 'HR Coil 4.5mm', status: 'QC-1', health: 'Healthy', timestamp: '2026-01-30 08:45', issues: 'None', powerOn: true },
    { id: 'HT-8842', model: 'CR Sheet 2.0mm', status: 'QC-1', health: 'Minor Warning', timestamp: '2026-01-30 09:12', issues: 'Edge trim variance +0.3mm', powerOn: true },
    { id: 'HT-9901', model: 'Galv. Coil 1.2mm', status: 'QC-2', health: 'Healthy', timestamp: '2026-01-30 07:30', issues: 'None', deliveryReady: true },
    { id: 'HT-1245', model: 'Plate 12mm', status: 'QC-2', health: 'Healthy', timestamp: '2026-01-30 09:30', issues: 'None', deliveryReady: true },
  ],

  reworkInline: [
    { id: 'HT-5561', model: 'HR Coil 4.5mm', problem: 'Surface Scale Adhesion', location: 'Bay 4', timestamp: '09:15', steps: ['Re-descale', 'Visual verify'] },
  ],
  reworkOffline: [
    { id: 'HT-2234', model: 'CR Sheet 2.0mm', problem: 'Edge Crack (Left Side)', location: 'Rework Station 2', timestamp: 'Yesterday 16:40', steps: ['Trim edges', 'Re-roll pass', 'Dimension verify'] },
  ],
  reworkStats: { totalProduced: 1240, totalRework: 42 },

  inspectionTasks: [
    { id: 'INS-01', asset: 'Hydraulic Shear 4', originalDate: 'Oct 24', newDate: 'Nov 02', reason: 'Vibration data indicates low wear. Extended interval.', impact: '+9 Days', status: 'Optimized' },
    { id: 'INS-02', asset: 'Arc Furnace Alpha (M-101)', originalDate: 'Nov 10', newDate: 'Oct 23', reason: 'Electrode wear spike detected. Preventive check required.', impact: '-18 Days', status: 'Expedited' },
    { id: 'INS-03', asset: 'Conveyor Motor B', originalDate: 'Oct 25', newDate: 'Oct 25', reason: 'Routine interval matches wear patterns.', impact: 'No Change', status: 'Standard' },
    { id: 'INS-04', asset: 'Crane Hoist System', originalDate: 'Oct 26', newDate: 'Nov 15', reason: 'Load cell drift within tolerance. Inspection postponed.', impact: '+20 Days', status: 'Optimized' },
  ],

  legacyInspections: 142,
  aiInspections: 86,
  savedInspections: 56,
  savedHours: 112,

  knowledgeBase: [
    {
      id: 'RK-001',
      issue: 'Surface Scale Adhesion',
      symptoms: 'Rough surface finish, scale embedded after rolling.',
      rootCause: 'Descaler nozzle PSI drop to 85% on Header 3.',
      solution: 'Replace nozzle tips on Header 3. Increase water pressure by 12%. Re-run test strip.',
      historicalExamples: [
        { date: '2025-11-12', plant: 'Sheffield', resolution: 'Caught by inline camera — avoided full coil rejection.' }
      ]
    },
    {
      id: 'RK-002',
      issue: 'Edge Crack (Left Side)',
      symptoms: 'Hairline cracks along left edge, visible after cold reduction.',
      rootCause: 'Hot strip edge temperature drop below 880°C on Transfer Table.',
      solution: 'Adjust edge heater setpoint by +15°C. Add edge masking to coilbox.',
      historicalExamples: [
        { date: '2025-08-05', plant: 'Sheffield', resolution: 'Batch rework: 8 coils re-edged and re-rolled.' }
      ]
    },
    {
      id: 'RK-003',
      issue: 'Thickness Deviation',
      symptoms: 'Coil thickness exceeding ±0.05mm tolerance.',
      rootCause: 'AGC gain drift in Stand 4 after roll change.',
      solution: 'Recalibrate AGC controller. Verify roll crown profile. Run calibration pass.',
      historicalExamples: [
        { date: '2026-01-15', plant: 'Sheffield', resolution: 'Resolved within 30 mins — zero coils lost.' }
      ]
    }
  ],

  simulation: {
    triggerLabel: 'Simulate Furnace Fault',
    resetLabel: 'Reset System',
    targetAssetId: 'M-101',
    targetStageId: 'ST-2',
    steps: [
      { delay: 0, msg: 'LOGISTICS ALERT: Tier 2 delay detected on Scrap Feedstock (S-04).', type: 'warning' },
      { delay: 1500, msg: 'ANALYSIS: Synchronization Index dropping below 60%. Bay 3 starvation risk.', type: 'error' },
      { delay: 3000, msg: 'AGENT INTELLIGENCE: Scanning alternative inbound docks...', type: 'info' },
      { delay: 3000, msg: 'DOCK C: Standby capacity active. Redirecting batch #XB-202.', type: 'success' },
      { delay: 5000, msg: 'RESILIENCE ENGINE: Micro-calibrating rolling speed in Bay 2.', type: 'info' },
      { delay: 5000, msg: 'DECISION: Buffering 14.5% extra safety stock for Hot Roll Bay 3.', type: 'action' },
      { delay: 7000, msg: 'OPTIMIZATION: Spot Buying initiated for scrap metal buffer.', type: 'success' },
      { delay: 7000, msg: 'EXECUTION: Autonomous transport dispatched for emergency replenishment.', type: 'success' },
    ],
    spikeData: [
      { time: '21:00', throughput: 75, syncLevel: 80, oee: 70, vibration: 45, temp: 72 },
      { time: '22:00', throughput: 62, syncLevel: 45, oee: 55, vibration: 68, temp: 85 },
    ]
  },

  chartDataTemplate: [
    { time: '00:00', throughput: 85, syncLevel: 98, oee: 92, vibration: 12, temp: 45 },
    { time: '04:00', throughput: 88, syncLevel: 97, oee: 91, vibration: 14, temp: 46 },
    { time: '08:00', throughput: 92, syncLevel: 99, oee: 94, vibration: 13, temp: 48 },
    { time: '12:00', throughput: 90, syncLevel: 98, oee: 93, vibration: 15, temp: 47 },
    { time: '16:00', throughput: 85, syncLevel: 95, oee: 89, vibration: 18, temp: 50 },
    { time: '20:00', throughput: 82, syncLevel: 92, oee: 88, vibration: 16, temp: 49 },
  ],

  pageDescriptions: {
    dashboard: 'Real-time system overview monitoring active agents, facility efficiency, and global health metrics.',
    checkpoints: 'Quality gate monitoring for product-specific QC-1/QC-2 pass/fail status.',
    maintenance: 'Predictive maintenance algorithms analyzing machine telemetry to prevent equipment failures.',
    supply: 'Real-time supply chain tracking for inbound materials and dock capacity management.',
    production: 'Live visualization of production line topology, throughput, and bottleneck identification.',
    rework: 'Management interface for inline and offline product rectification and defect resolution.',
    schedule: 'AI-optimized inspection scheduling based on predictive wear analysis and risk factors.',
  },

  initialLogs: [
    { id: 1, time: '08:00:01', type: 'info', msg: 'Sheffield Node Connectivity: 100% stable. Buffer states aligned.' },
    { id: 2, time: '08:05:22', type: 'success', msg: 'Energy Peak Shaving: Shifted furnace load to off-peak window.' },
    { id: 3, time: '08:12:45', type: 'action', msg: 'Material Verification: All feedstock for Shift B verified in Dock A.' },
  ],
};

export default ironvale;
