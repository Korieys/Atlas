// ─── NovaPharma — Pharmaceutical Manufacturing Preset ─────────────────────
// GMP-regulated pharmaceutical production facility

import type { AtlasConfig } from '../atlasConfig';

const novapharma: AtlasConfig = {
  company: {
    name: 'NovaPharma',
    tagline: 'Science. Precision. Life.',
    industry: 'Pharmaceutical Manufacturing',
    logoText: 'NP',
    subtitle: 'GMP INTELLIGENCE',
  },

  theme: {
    primary: '142 71% 45%',
    primaryHex: '#22c55e',
    accent: '280 67% 55%',
    accentHex: '#a855f7',
    surface: 'rgba(15, 23, 42, 0.8)',
    surfaceBorder: 'rgba(51, 65, 85, 0.5)',
    background: '#020617',
    sidebarBg: '#091018',
    headerBg: 'rgba(2, 6, 23, 0.8)',
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#475569',
    success: '142 71% 45%',
    successHex: '#22c55e',
    warning: '38 92% 50%',
    warningHex: '#f59e0b',
    danger: '0 84% 60%',
    dangerHex: '#ef4444',
    info: '280 67% 55%',
    infoHex: '#a855f7',
  },

  terminology: {
    plant: 'Site',
    plantName: 'Basel Facility',
    shift: 'A (06:00 – 14:00)',
    unitId: 'Batch No.',
    unitName: 'Batch',
    zone: 'Suite',
    zones: [
      { id: 'S-1', name: 'Suite 1 (API Synthesis)', health: 99, load: 82, bottleneck: false, status: 'Optimal', reason: 'Normal operation' },
      { id: 'S-2', name: 'Suite 2 (Formulation)', health: 95, load: 88, bottleneck: false, status: 'Optimal', reason: 'Normal operation' },
      { id: 'S-3', name: 'Suite 3 (Fill & Finish)', health: 80, load: 94, bottleneck: true, status: 'Warning', reason: 'Isolator glove integrity alert — pressure differential drift.' },
      { id: 'S-4', name: 'Suite 4 (Packaging)', health: 96, load: 38, bottleneck: false, status: 'Underutilized', reason: 'Waiting for QA release from upstream' },
    ],
    productionLine: 'Process Train',
    checkpoint1: 'IPC',
    checkpoint2: 'QA Release',
    checkpoint1Label: 'In-Process Control',
    checkpoint2Label: 'Quality Assurance Release',
    assetType: 'Equipment',
    supplier: 'Vendor',
    entryPoint: 'Warehouse Bay',
  },

  modules: [
    { id: 'dashboard', icon: 'LayoutDashboard', label: 'Overview', enabled: true },
    { id: 'checkpoints', icon: 'CheckCircle2', label: 'Quality Gates', enabled: true },
    { id: 'maintenance', icon: 'RefreshCw', label: 'Predictive Maint.', enabled: true },
    { id: 'supply', icon: 'Truck', label: 'Supply Chain', enabled: true },
    { id: 'production', icon: 'Factory', label: 'Process Flow', enabled: true },
    { id: 'rework', icon: 'Wrench', label: 'Deviation Mgmt.', enabled: true },
    { id: 'schedule', icon: 'Calendar', label: 'Calibration Sched.', enabled: true },
  ],

  dashboardKPIs: [
    { label: 'GMP Compliance', value: '99.8%', icon: 'Activity', color: 'emerald', progress: 99.8 },
    { label: 'Active Agents', value: '256', icon: 'BrainCircuit', color: 'green', subtext: 'Environmental monitors: 128 active' },
    { label: 'Site Status', value: 'On Schedule', icon: 'Box', color: 'purple', subtext: 'All cleanrooms at Grade A/B' },
    { label: 'Active Deviations', value: '2', icon: 'ShieldAlert', color: 'amber', subtext: '1 Environmental, 1 Process' },
  ],

  oeeMetrics: [
    { name: 'Availability', value: 96.5, target: 97 },
    { name: 'Performance', value: 93.8, target: 94 },
    { name: 'Quality', value: 99.9, target: 99.8 },
  ],

  productionVolume: {
    actual: 84,
    goal: 96,
    startTime: '06:00',
    endTime: '14:00',
  },

  dashboardTitle: 'NovaPharma Operations Overview',
  cockpitTitle: 'Production Cockpit',
  cockpitSubtitle: 'Basel Digital Twin',

  assets: [
    { id: 'EQ-101', name: 'Reactor Vessel R-1', zone: 'API Synthesis', status: 'Optimal', health: 99, load: 82, nextService: '30 days' },
    { id: 'EQ-102', name: 'Reactor Vessel R-2', zone: 'API Synthesis', status: 'Optimal', health: 97, load: 78, nextService: '45 days' },
    { id: 'EQ-205', name: 'Filling Line FL-1', zone: 'Fill & Finish', status: 'Warning', health: 76, load: 58, nextService: '4 days' },
    { id: 'EQ-309', name: 'Tablet Press TP-3', zone: 'Formulation', status: 'Optimal', health: 94, load: 90, nextService: '21 days' },
  ],

  suppliers: [
    { id: 'V-01', name: 'ChemBridge AG', category: 'API Intermediates', stability: 99, risk: 'Low', leadTime: '7 days' },
    { id: 'V-04', name: 'GlobalExcip', category: 'Excipients', stability: 68, risk: 'High', leadTime: '18 days', riskDetail: 'Excipient supply disruption risk detected (10-day window).', historicalNote: '"2024 Q4: NovaPharma mitigated via qualified alternate vendor and strategic inventory release."', mitigations: ['Action: Alt. Vendor', 'Action: Strategic Release'] },
    { id: 'V-09', name: 'PackSteri Corp', category: 'Primary Packaging', stability: 95, risk: 'Low', leadTime: '5 days' },
  ],

  entryPoints: [
    { id: 'WB-A', name: 'Bay A (Temperature Controlled)', status: 'Active', capacity: '85%' },
    { id: 'WB-B', name: 'Bay B (Ambient)', status: 'Active', capacity: '70%' },
    { id: 'WB-C', name: 'Bay C (Quarantine)', status: 'Standby', capacity: '12%' },
  ],

  partLocations: [
    { id: 'AI-1', part: 'API Intermediate Batch', currentPort: 'WB-A', arrivalTime: '06:30', status: 'Processing' },
    { id: 'EX-4', part: 'Excipient Lot V-04', currentPort: 'WB-B', arrivalTime: '14:00', status: 'In Transit' },
  ],

  shortageData: [
    { name: 'Excipients', risk: 80, stock: 35 },
    { name: 'API Intermediates', risk: 15, stock: 95 },
    { name: 'Vial Glass', risk: 30, stock: 82 },
    { name: 'Stoppers/Seals', risk: 50, stock: 65 },
    { name: 'Labels (Serialized)', risk: 40, stock: 72 },
  ],

  shortageMitigations: [
    'Activate "Basel-Reserve" Protocol: Release strategic excipient inventory for 3-week buffer.',
    'Multi-sourcing: Expedite qualification of backup excipient vendor in India (audit complete).',
  ],

  shortageHistoricalNote: '"Model detected excipient supply pattern similar to 2023 logistics crisis. Strategic reserves provided 4 weeks of production continuity. Recommend immediate inventory release."',

  productionStages: [
    { id: 'ST-1', name: 'API Synthesis', status: 'Optimal', output: 100, target: 100 },
    { id: 'ST-2', name: 'Formulation', status: 'Warning', output: 88, target: 100, issue: 'Granulator moisture drift' },
    { id: 'ST-3', name: 'Fill & Finish', status: 'Optimal', output: 96, target: 100 },
    { id: 'ST-4', name: 'Inspection', status: 'Optimal', output: 95, target: 100 },
    { id: 'ST-5', name: 'Packaging', status: 'Optimal', output: 95, target: 100 },
  ],

  checkpointUnits: [
    { id: 'BN-7721', model: 'Omeprazole 20mg Tab', status: 'IPC', health: 'Healthy', timestamp: '2026-01-30 07:00', issues: 'None', powerOn: true },
    { id: 'BN-8842', model: 'Metformin 500mg Tab', status: 'IPC', health: 'Minor Warning', timestamp: '2026-01-30 08:15', issues: 'Dissolution test pending', powerOn: true },
    { id: 'BN-9901', model: 'Insulin Pre-filled Pen', status: 'QA Release', health: 'Healthy', timestamp: '2026-01-30 06:30', issues: 'None', deliveryReady: true },
    { id: 'BN-1245', model: 'Amoxicillin 250mg Cap', status: 'QA Release', health: 'Healthy', timestamp: '2026-01-30 09:00', issues: 'None', deliveryReady: true },
  ],

  reworkInline: [
    { id: 'BN-5561', model: 'Omeprazole 20mg Tab', problem: 'Weight Variation (+2.5%)', location: 'Suite 2', timestamp: '08:30', steps: ['Adjust fill weight', 'Re-sample 20 units', 'Run dissolution'] },
  ],
  reworkOffline: [
    { id: 'BN-2234', model: 'Insulin Pre-filled Pen', problem: 'Particulate Contamination (visual)', location: 'Deviation Bay 1', timestamp: 'Yesterday 16:00', steps: ['Root cause investigation', 'Filter integrity test', 'Environmental sample review'] },
  ],
  reworkStats: { totalProduced: 84, totalRework: 3 },

  inspectionTasks: [
    { id: 'CAL-01', asset: 'Filling Line FL-1 (EQ-205)', originalDate: 'Oct 20', newDate: 'Oct 30', reason: 'Fill weight accuracy within spec. Extended interval.', impact: '+10 Days', status: 'Optimized' },
    { id: 'CAL-02', asset: 'Reactor Vessel R-1 (EQ-101)', originalDate: 'Nov 15', newDate: 'Oct 25', reason: 'Temperature probe drift detected. Preventive calibration.', impact: '-21 Days', status: 'Expedited' },
    { id: 'CAL-03', asset: 'Tablet Press TP-3', originalDate: 'Oct 25', newDate: 'Oct 25', reason: 'Routine calibration matches GMP schedule.', impact: 'No Change', status: 'Standard' },
    { id: 'CAL-04', asset: 'HVAC System (Grade A)', originalDate: 'Oct 28', newDate: 'Nov 12', reason: 'Particle counter readings well within spec. Postponed.', impact: '+15 Days', status: 'Optimized' },
  ],

  legacyInspections: 168,
  aiInspections: 102,
  savedInspections: 66,
  savedHours: 198,

  knowledgeBase: [
    {
      id: 'RK-001',
      issue: 'Weight Variation',
      symptoms: 'Individual tablet weight exceeding ±3% of target weight.',
      rootCause: 'Powder flow inconsistency in hopper — bridging above feed frame.',
      solution: 'Clear hopper bridge. Adjust feed frame speed. Re-sample per USP <905>.',
      historicalExamples: [
        { date: '2025-10-20', plant: 'Basel', resolution: 'Resolved with feed frame adjustment — zero batch rejections.' }
      ]
    },
    {
      id: 'RK-002',
      issue: 'Particulate Contamination',
      symptoms: 'Visible particles detected during 100% visual inspection.',
      rootCause: 'HEPA filter integrity failure in Grade A zone — pinhole leak.',
      solution: 'Replace HEPA filter. Smoke test new filter. Full environmental monitoring re-qualification.',
      historicalExamples: [
        { date: '2025-07-15', plant: 'Basel', resolution: 'Batch quarantined. Filter replaced. Zone re-qualified in 8 hours.' }
      ]
    },
    {
      id: 'RK-003',
      issue: 'Dissolution Failure',
      symptoms: 'Drug release below 80% at 30 minutes (USP spec).',
      rootCause: 'API particle size distribution shift — milling parameters drifted.',
      solution: 'Re-mill API batch. Verify PSD meets spec. Reformulate and re-test.',
      historicalExamples: [
        { date: '2026-01-08', plant: 'Basel', resolution: 'Caught at IPC — no out-of-spec product released.' }
      ]
    }
  ],

  simulation: {
    triggerLabel: 'Simulate Process Deviation',
    resetLabel: 'Reset System',
    targetAssetId: 'EQ-101',
    targetStageId: 'ST-2',
    steps: [
      { delay: 0, msg: 'PROCESS ALERT: Excipient delivery delay detected (V-04).', type: 'warning' },
      { delay: 1500, msg: 'ANALYSIS: Production continuity index dropping below 60%. Suite 3 starvation risk.', type: 'error' },
      { delay: 3000, msg: 'AGENT INTELLIGENCE: Scanning alternative warehouse bays...', type: 'info' },
      { delay: 3000, msg: 'BAY C: Quarantine release approved. Redirecting excipient lot #QR-118.', type: 'success' },
      { delay: 5000, msg: 'RESILIENCE ENGINE: Resequencing formulation schedule in Suite 2.', type: 'info' },
      { delay: 5000, msg: 'DECISION: Releasing strategic excipient reserve for Suite 3.', type: 'action' },
      { delay: 7000, msg: 'OPTIMIZATION: Expedited vendor shipment initiated for backup supply.', type: 'success' },
      { delay: 7000, msg: 'EXECUTION: Temperature-controlled logistics dispatched for delivery.', type: 'success' },
    ],
    spikeData: [
      { time: '21:00', throughput: 72, syncLevel: 78, oee: 65, vibration: 42, temp: 70 },
      { time: '22:00', throughput: 55, syncLevel: 42, oee: 48, vibration: 65, temp: 82 },
    ]
  },

  chartDataTemplate: [
    { time: '00:00', throughput: 90, syncLevel: 99, oee: 96, vibration: 6, temp: 40 },
    { time: '04:00', throughput: 92, syncLevel: 99, oee: 95, vibration: 8, temp: 41 },
    { time: '08:00', throughput: 95, syncLevel: 99, oee: 97, vibration: 7, temp: 42 },
    { time: '12:00', throughput: 93, syncLevel: 99, oee: 96, vibration: 9, temp: 43 },
    { time: '16:00', throughput: 90, syncLevel: 98, oee: 93, vibration: 12, temp: 45 },
    { time: '20:00', throughput: 87, syncLevel: 96, oee: 91, vibration: 10, temp: 44 },
  ],

  pageDescriptions: {
    dashboard: 'Real-time GMP compliance overview monitoring active agents, site efficiency, and process health.',
    checkpoints: 'Quality gate monitoring for In-Process Control and QA Release status.',
    maintenance: 'Predictive maintenance algorithms analyzing equipment telemetry for GMP-critical assets.',
    supply: 'Real-time supply chain tracking for inbound materials and warehouse management.',
    production: 'Live visualization of process train topology, throughput, and deviation identification.',
    rework: 'Deviation management interface for inline and offline product investigation and CAPA.',
    schedule: 'AI-optimized calibration scheduling based on predictive drift analysis and GMP requirements.',
  },

  initialLogs: [
    { id: 1, time: '06:00:01', type: 'info', msg: 'Basel Site Connectivity: 100% stable. All suites environmentally qualified.' },
    { id: 2, time: '06:03:45', type: 'success', msg: 'Environmental Monitoring: All Grade A/B zones within particle count limits.' },
    { id: 3, time: '06:10:20', type: 'action', msg: 'Material Release: All excipients for Shift A verified and released from QA hold.' },
  ],
};

export default novapharma;
