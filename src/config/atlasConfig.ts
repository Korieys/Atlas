// ─── Atlas Configuration System ────────────────────────────────────────────
// Every company-specific value flows from this config.
// Swap one preset file → entire app transforms.

export interface AtlasTheme {
  primary: string;       // HSL values e.g. "217 91% 60%"
  primaryHex: string;    // Hex for recharts etc
  accent: string;
  accentHex: string;
  surface: string;       // Card backgrounds
  surfaceBorder: string;
  background: string;    // Page background
  sidebarBg: string;
  headerBg: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  success: string;
  successHex: string;
  warning: string;
  warningHex: string;
  danger: string;
  dangerHex: string;
  info: string;
  infoHex: string;
}

export interface AtlasTerminology {
  plant: string;           // "Plant", "Facility", "Factory"
  plantName: string;       // "Sheffield Mill", "Meridian Bay"
  shift: string;           // Current shift label
  unitId: string;          // "VIN", "Serial No.", "Batch ID", "Lot No."
  unitName: string;        // "Vehicle", "Assembly", "Batch", "Unit"
  zone: string;            // "Finger", "Zone", "Bay", "Cell"
  zones: ZoneConfig[];
  productionLine: string;  // "Montage", "Assembly Line", "Process Line"
  checkpoint1: string;     // "F1", "QC-1", "Stage 1"
  checkpoint2: string;     // "F2", "QC-2", "Stage 2"
  checkpoint1Label: string;
  checkpoint2Label: string;
  assetType: string;       // "Robot", "Machine", "Equipment"
  supplier: string;        // "Supplier", "Vendor", "Partner"
  entryPoint: string;      // "Port", "Dock", "Receiving Bay"
}

export interface ZoneConfig {
  id: string;
  name: string;
  health: number;
  load: number;
  bottleneck: boolean;
  status: 'Optimal' | 'Warning' | 'Underutilized';
  reason: string;
}

export interface AssetConfig {
  id: string;
  name: string;
  zone: string;
  status: 'Optimal' | 'Warning' | 'Critical';
  health: number;
  load: number;
  nextService: string;
}

export interface SupplierConfig {
  id: string;
  name: string;
  category: string;
  stability: number;
  risk: 'Low' | 'Medium' | 'High';
  leadTime: string;
  riskDetail?: string;
  historicalNote?: string;
  mitigations?: string[];
}

export interface EntryPointConfig {
  id: string;
  name: string;
  status: 'Active' | 'Standby' | 'Offline';
  capacity: string;
}

export interface PartLocationConfig {
  id: string;
  part: string;
  currentPort: string;
  arrivalTime: string;
  status: 'In Transit' | 'Processing' | 'Arrived' | 'Delayed';
}

export interface ProductionStageConfig {
  id: string;
  name: string;
  status: 'Optimal' | 'Warning' | 'Critical';
  output: number;
  target: number;
  issue?: string;
}

export interface CheckpointUnitConfig {
  id: string;
  model: string;
  status: string;       // checkpoint1 or checkpoint2 value
  health: string;
  timestamp: string;
  issues: string;
  powerOn?: boolean;
  deliveryReady?: boolean;
}

export interface ReworkUnitConfig {
  id: string;
  model: string;
  problem: string;
  location: string;
  timestamp: string;
  steps: string[];
}

export interface InspectionTaskConfig {
  id: string;
  asset: string;
  originalDate: string;
  newDate: string;
  reason: string;
  impact: string;
  status: 'Optimized' | 'Expedited' | 'Standard';
}

export interface KnowledgeEntryConfig {
  id: string;
  issue: string;
  symptoms: string;
  rootCause: string;
  solution: string;
  historicalExamples: { date: string; plant: string; resolution: string }[];
}

export interface OEEMetric {
  name: string;
  value: number;
  target: number;
}

export interface ProductionVolumeConfig {
  actual: number;
  goal: number;
  startTime: string;
  endTime: string;
}

export interface ShortageItem {
  name: string;
  risk: number;
  stock: number;
}

export interface SimulationConfig {
  triggerLabel: string;
  resetLabel: string;
  steps: {
    delay: number;
    msg: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'action';
  }[];
  targetAssetId: string;
  targetStageId: string;
  spikeData: { time: string; throughput: number; syncLevel: number; oee: number; vibration: number; temp: number }[];
}

export interface DashboardKPI {
  label: string;
  value: string;
  icon: string; // lucide icon name
  color: string;
  subtext?: string;
  progress?: number;
}

export interface SidebarModule {
  id: string;
  icon: string;
  label: string;
  enabled: boolean;
}

export interface AtlasConfig {
  // Identity
  company: {
    name: string;
    tagline: string;
    industry: string;
    logoText: string;      // 1-2 char for text logo
    subtitle: string;      // e.g., "INTELLIGENCE" under logo
  };

  // Theme
  theme: AtlasTheme;

  // Terminology
  terminology: AtlasTerminology;

  // Navigation
  modules: SidebarModule[];

  // Dashboard
  dashboardKPIs: DashboardKPI[];
  oeeMetrics: OEEMetric[];
  productionVolume: ProductionVolumeConfig;
  dashboardTitle: string;
  cockpitTitle: string;
  cockpitSubtitle: string;

  // Maintenance / Assets
  assets: AssetConfig[];

  // Supply
  suppliers: SupplierConfig[];
  entryPoints: EntryPointConfig[];
  partLocations: PartLocationConfig[];
  shortageData: ShortageItem[];
  shortageMitigations: string[];
  shortageHistoricalNote: string;

  // Production
  productionStages: ProductionStageConfig[];

  // Checkpoints
  checkpointUnits: CheckpointUnitConfig[];

  // Rework
  reworkInline: ReworkUnitConfig[];
  reworkOffline: ReworkUnitConfig[];
  reworkStats: { totalProduced: number; totalRework: number };

  // Schedule
  inspectionTasks: InspectionTaskConfig[];
  legacyInspections: number;
  aiInspections: number;
  savedInspections: number;
  savedHours: number;

  // Knowledge Base
  knowledgeBase: KnowledgeEntryConfig[];

  // Simulation
  simulation: SimulationConfig;

  // Chart data template
  chartDataTemplate: { time: string; throughput: number; syncLevel: number; oee: number; vibration: number; temp: number }[];

  // Page descriptions (config driven)
  pageDescriptions: Record<string, string>;

  // Initial agent logs
  initialLogs: { id: number; time: string; type: string; msg: string }[];
}
