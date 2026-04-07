// ─── Meridian Aerospace — Precision Manufacturing Preset ──────────────────
// Aerospace/defense manufacturing facility

import type { AtlasConfig } from '../atlasConfig';

const meridian: AtlasConfig = {
  company: {
    name: 'Meridian Aerospace',
    tagline: 'Precision Without Compromise',
    industry: 'Aerospace Manufacturing',
    logoText: 'MA',
    subtitle: 'AERO INTELLIGENCE',
  },

  theme: {
    primary: '199 89% 48%',
    primaryHex: '#0ea5e9',
    accent: '172 66% 50%',
    accentHex: '#2dd4bf',
    surface: 'rgba(15, 23, 42, 0.8)',
    surfaceBorder: 'rgba(51, 65, 85, 0.5)',
    background: '#020617',
    sidebarBg: '#0c1222',
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
    info: '199 89% 48%',
    infoHex: '#0ea5e9',
  },

  terminology: {
    plant: 'Facility',
    plantName: 'Meridian Bay',
    shift: 'A (06:00 – 14:00)',
    unitId: 'Serial No.',
    unitName: 'Assembly',
    zone: 'Cell',
    zones: [
      { id: 'C-1', name: 'Cell 1 (Fuselage)', health: 99, load: 78, bottleneck: false, status: 'Optimal', reason: 'Normal operation' },
      { id: 'C-2', name: 'Cell 2 (Wing Spar)', health: 96, load: 90, bottleneck: false, status: 'Optimal', reason: 'Normal operation' },
      { id: 'C-3', name: 'Cell 3 (Avionics)', health: 82, load: 95, bottleneck: true, status: 'Warning', reason: 'Harness routing conflict — test bay congestion detected.' },
      { id: 'C-4', name: 'Cell 4 (Final Assy)', health: 94, load: 40, bottleneck: false, status: 'Underutilized', reason: 'Waiting for upstream integration' },
    ],
    productionLine: 'Assembly Flow',
    checkpoint1: 'NDT',
    checkpoint2: 'FAI',
    checkpoint1Label: 'Non-Destructive Testing',
    checkpoint2Label: 'First Article Inspection',
    assetType: 'Equipment',
    supplier: 'Vendor',
    entryPoint: 'Receiving Bay',
  },

  modules: [
    { id: 'dashboard', icon: 'LayoutDashboard', label: 'Overview', enabled: true },
    { id: 'checkpoints', icon: 'CheckCircle2', label: 'Quality Gates', enabled: true },
    { id: 'maintenance', icon: 'RefreshCw', label: 'Predictive Maint.', enabled: true },
    { id: 'supply', icon: 'Truck', label: 'Supply Chain', enabled: true },
    { id: 'production', icon: 'Factory', label: 'Assembly Flow', enabled: true },
    { id: 'rework', icon: 'Wrench', label: 'MRB Station', enabled: true },
    { id: 'schedule', icon: 'Calendar', label: 'Inspection Sched.', enabled: true },
  ],

  dashboardKPIs: [
    { label: 'Overall Health', value: '99.1%', icon: 'Activity', color: 'emerald', progress: 99.1 },
    { label: 'Active Agents', value: '384', icon: 'BrainCircuit', color: 'sky', subtext: 'Autonomous decisions/hr: 502' },
    { label: 'Facility Status', value: 'On Schedule', icon: 'Box', color: 'teal', subtext: 'All cells green for Shift A' },
    { label: 'Predicted Risks', value: '1', icon: 'ShieldAlert', color: 'amber', subtext: '1 Avionics harness delay' },
  ],

  oeeMetrics: [
    { name: 'Availability', value: 97.8, target: 98 },
    { name: 'Performance', value: 94.2, target: 95 },
    { name: 'Quality', value: 99.6, target: 99.5 },
  ],

  productionVolume: {
    actual: 24,
    goal: 28,
    startTime: '06:00',
    endTime: '14:00',
  },

  dashboardTitle: 'Meridian Operations Overview',
  cockpitTitle: 'Productivity Cockpit',
  cockpitSubtitle: 'Meridian Bay Digital Twin',

  assets: [
    { id: 'E-101', name: 'CNC Mill Alpha', zone: 'Machining', status: 'Optimal', health: 99, load: 75, nextService: '21 days' },
    { id: 'E-102', name: 'CNC Mill Beta', zone: 'Machining', status: 'Optimal', health: 97, load: 80, nextService: '28 days' },
    { id: 'E-205', name: 'Autoclave Unit 1', zone: 'Composites', status: 'Warning', health: 78, load: 55, nextService: '5 days' },
    { id: 'E-309', name: 'Riveting Station D', zone: 'Final Assy', status: 'Optimal', health: 95, load: 88, nextService: '14 days' },
  ],

  suppliers: [
    { id: 'V-01', name: 'Hexcel Composites', category: 'Carbon Fiber Prepreg', stability: 97, risk: 'Low', leadTime: '5 days' },
    { id: 'V-04', name: 'Ti-Alloy Corp', category: 'Titanium Forgings', stability: 62, risk: 'High', leadTime: '21 days', riskDetail: 'Titanium supply chain disruption risk detected (15-day window).', historicalNote: '"2024 Q2: Meridian mitigated via strategic stockpiling and alternate alloy qualification."', mitigations: ['Action: Strategic Reserve', 'Action: Alternate Alloy'] },
    { id: 'V-09', name: 'Avionics Direct', category: 'Flight Computers', stability: 94, risk: 'Low', leadTime: '10 days' },
  ],

  entryPoints: [
    { id: 'RB-A', name: 'Bay A (Air Freight)', status: 'Active', capacity: '88%' },
    { id: 'RB-B', name: 'Bay B (Road Logistics)', status: 'Active', capacity: '72%' },
    { id: 'RB-C', name: 'Bay C (Priority Lane)', status: 'Standby', capacity: '10%' },
  ],

  partLocations: [
    { id: 'CF-1', part: 'Carbon Fiber Prepreg Rolls', currentPort: 'RB-B', arrivalTime: '07:00', status: 'In Transit' },
    { id: 'TF-4', part: 'Titanium Forging V-04', currentPort: 'RB-A', arrivalTime: '15:00', status: 'Processing' },
  ],

  shortageData: [
    { name: 'Titanium Forgings', risk: 90, stock: 30 },
    { name: 'Carbon Fiber', risk: 15, stock: 92 },
    { name: 'Fasteners (AS9100)', risk: 25, stock: 85 },
    { name: 'Sealants/Adhesives', risk: 55, stock: 60 },
    { name: 'Avionics Modules', risk: 40, stock: 75 },
  ],

  shortageMitigations: [
    'Activate "Meridian-Reserve" Protocol: Release 8-week titanium strategic reserve.',
    'Multi-sourcing: Expedite qualification for Tier 2 titanium supplier in Japan.',
  ],

  shortageHistoricalNote: '"Model detected titanium supply pattern similar to 2022 sanctions event. Strategic reserves provided 6 weeks of buffer. Recommend immediate reserve release."',

  productionStages: [
    { id: 'ST-1', name: 'Machining', status: 'Optimal', output: 100, target: 100 },
    { id: 'ST-2', name: 'Composites', status: 'Warning', output: 85, target: 100, issue: 'Autoclave cycle time drift' },
    { id: 'ST-3', name: 'Sub-Assembly', status: 'Optimal', output: 98, target: 100 },
    { id: 'ST-4', name: 'Integration', status: 'Optimal', output: 96, target: 100 },
    { id: 'ST-5', name: 'Final Test', status: 'Optimal', output: 96, target: 100 },
  ],

  checkpointUnits: [
    { id: 'SN-4401', model: 'Wing Spar L-4', status: 'NDT', health: 'Healthy', timestamp: '2026-01-30 07:15', issues: 'None', powerOn: true },
    { id: 'SN-4402', model: 'Fuselage Frame 12', status: 'NDT', health: 'Minor Warning', timestamp: '2026-01-30 08:30', issues: 'Ultrasonic recheck required on Rib 4', powerOn: true },
    { id: 'SN-4501', model: 'Nacelle Assembly', status: 'FAI', health: 'Healthy', timestamp: '2026-01-30 06:45', issues: 'None', deliveryReady: true },
    { id: 'SN-4502', model: 'Landing Gear Strut', status: 'FAI', health: 'Healthy', timestamp: '2026-01-30 09:00', issues: 'None', deliveryReady: true },
  ],

  reworkInline: [
    { id: 'SN-3301', model: 'Wing Spar L-4', problem: 'Fastener Torque Out-of-Spec', location: 'Cell 2', timestamp: '08:45', steps: ['Remove fastener', 'Re-torque to spec', 'NDT verify'] },
  ],
  reworkOffline: [
    { id: 'SN-3102', model: 'Fuselage Panel', problem: 'Delamination on Composite Skin', location: 'MRB Station 1', timestamp: 'Yesterday 17:20', steps: ['Scarf repair', 'Autoclave cure', 'Ultrasonic test'] },
  ],
  reworkStats: { totalProduced: 24, totalRework: 2 },

  inspectionTasks: [
    { id: 'INS-01', asset: 'Autoclave Unit 1 (E-205)', originalDate: 'Oct 20', newDate: 'Oct 28', reason: 'Thermocouple drift within spec. Extended interval.', impact: '+8 Days', status: 'Optimized' },
    { id: 'INS-02', asset: 'CNC Mill Alpha (E-101)', originalDate: 'Nov 10', newDate: 'Oct 22', reason: 'Spindle vibration spike detected. Preventive check required.', impact: '-19 Days', status: 'Expedited' },
    { id: 'INS-03', asset: 'Riveting Station D', originalDate: 'Oct 25', newDate: 'Oct 25', reason: 'Routine interval matches wear patterns.', impact: 'No Change', status: 'Standard' },
    { id: 'INS-04', asset: 'Gantry Crane System', originalDate: 'Oct 28', newDate: 'Nov 18', reason: 'Load sensor calibration within tolerance. Postponed.', impact: '+21 Days', status: 'Optimized' },
  ],

  legacyInspections: 98,
  aiInspections: 54,
  savedInspections: 44,
  savedHours: 156,

  knowledgeBase: [
    {
      id: 'RK-001',
      issue: 'Fastener Torque Out-of-Spec',
      symptoms: 'Torque wrench reading below minimum threshold on Hi-Lok fasteners.',
      rootCause: 'Pneumatic torque tool calibration drift after 5,000 cycles.',
      solution: 'Recalibrate torque tool. Remove affected fastener. Re-install and torque to spec. Perform eddy current inspection.',
      historicalExamples: [
        { date: '2025-09-18', plant: 'Meridian Bay', resolution: 'Caught during in-process check — zero escapes to customer.' }
      ]
    },
    {
      id: 'RK-002',
      issue: 'Composite Delamination',
      symptoms: 'Ultrasonic C-scan shows void/disbond in layup.',
      rootCause: 'Autoclave vacuum bag leak during cure cycle (Zone 3).',
      solution: 'Scarf repair per SRM. Re-cure in autoclave with verified bag integrity. Full NDT re-inspection.',
      historicalExamples: [
        { date: '2025-06-12', plant: 'Meridian Bay', resolution: 'Root cause: bag sealant tape lot issue. Vendor notified.' }
      ]
    },
    {
      id: 'RK-003',
      issue: 'Avionics Boot Failure',
      symptoms: 'Flight computer fails POST (Power-On Self Test) on bench.',
      rootCause: 'Corrupt firmware image on maintenance laptop.',
      solution: 'Re-image maintenance laptop from master server. Reload firmware. Cycle power on LRU.',
      historicalExamples: [
        { date: '2026-01-05', plant: 'Meridian Bay', resolution: 'Resolved in 45 mins. Root cause traced to IT update.' }
      ]
    }
  ],

  simulation: {
    triggerLabel: 'Simulate Supply Disruption',
    resetLabel: 'Reset System',
    targetAssetId: 'E-101',
    targetStageId: 'ST-2',
    steps: [
      { delay: 0, msg: 'LOGISTICS ALERT: Tier 2 delay detected on Titanium Forgings (V-04).', type: 'warning' },
      { delay: 1500, msg: 'ANALYSIS: Synchronization Index dropping below 60%. Cell 3 starvation risk.', type: 'error' },
      { delay: 3000, msg: 'AGENT INTELLIGENCE: Scanning alternative receiving bays...', type: 'info' },
      { delay: 3000, msg: 'BAY C: Priority lane activated. Redirecting shipment #AF-550.', type: 'success' },
      { delay: 5000, msg: 'RESILIENCE ENGINE: Resequencing assembly flow in Cell 2.', type: 'info' },
      { delay: 5000, msg: 'DECISION: Releasing strategic titanium reserve for Cell 3.', type: 'action' },
      { delay: 7000, msg: 'OPTIMIZATION: Expedited air freight initiated for backup supply.', type: 'success' },
      { delay: 7000, msg: 'EXECUTION: Priority logistics dispatched for titanium delivery.', type: 'success' },
    ],
    spikeData: [
      { time: '21:00', throughput: 70, syncLevel: 75, oee: 68, vibration: 50, temp: 78 },
      { time: '22:00', throughput: 58, syncLevel: 40, oee: 50, vibration: 72, temp: 90 },
    ]
  },

  chartDataTemplate: [
    { time: '00:00', throughput: 88, syncLevel: 99, oee: 95, vibration: 8, temp: 42 },
    { time: '04:00', throughput: 90, syncLevel: 98, oee: 94, vibration: 10, temp: 43 },
    { time: '08:00', throughput: 94, syncLevel: 99, oee: 96, vibration: 9, temp: 44 },
    { time: '12:00', throughput: 92, syncLevel: 99, oee: 95, vibration: 11, temp: 45 },
    { time: '16:00', throughput: 88, syncLevel: 97, oee: 92, vibration: 14, temp: 47 },
    { time: '20:00', throughput: 85, syncLevel: 95, oee: 90, vibration: 12, temp: 46 },
  ],

  pageDescriptions: {
    dashboard: 'Real-time system overview monitoring active agents, facility efficiency, and global health metrics.',
    checkpoints: 'Quality gate monitoring for NDT and First Article Inspection pass/fail status.',
    maintenance: 'Predictive maintenance algorithms analyzing equipment telemetry to prevent failures.',
    supply: 'Real-time supply chain tracking for inbound materials and receiving bay management.',
    production: 'Live visualization of assembly flow topology, throughput, and bottleneck identification.',
    rework: 'MRB interface for inline and offline assembly rectification and defect resolution.',
    schedule: 'AI-optimized inspection scheduling based on predictive wear analysis and risk factors.',
  },

  initialLogs: [
    { id: 1, time: '06:00:01', type: 'info', msg: 'Meridian Bay Connectivity: 100% stable. All cells synchronized.' },
    { id: 2, time: '06:04:15', type: 'success', msg: 'Cleanroom Environment: Temperature and humidity within AS9100 spec.' },
    { id: 3, time: '06:11:30', type: 'action', msg: 'Material Verification: All composites for Shift A verified in Bay A.' },
  ],
};

export default meridian;
