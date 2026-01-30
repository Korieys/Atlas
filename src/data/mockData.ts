export const INITIAL_ROBOTS = [
    { id: 'R-101', name: 'Welding Arm A', zone: 'Body Shop', status: 'Optimal', health: 98, load: 85, nextService: '14 days' },
    { id: 'R-102', name: 'Welding Arm B', zone: 'Body Shop', status: 'Optimal', health: 96, load: 82, nextService: '21 days' },
    { id: 'R-205', name: 'Paint Sprayer X', zone: 'Paint Shop', status: 'Warning', health: 74, load: 60, nextService: '3 days' },
    { id: 'R-309', name: 'Montage Arm Delta', zone: 'Montage', status: 'Optimal', health: 92, load: 88, nextService: '30 days' },
];

export const INITIAL_SUPPLIERS = [
    { id: 'S-01', name: 'Bosch Dynamics', category: 'Sensors', stability: 98, risk: 'Low', leadTime: '2 days' },
    { id: 'S-04', name: 'Global Semicon', category: 'Chips', stability: 65, risk: 'High', leadTime: '14 days' },
    { id: 'S-09', name: 'SteelCo Euro', category: 'Raw Metal', stability: 92, risk: 'Low', leadTime: '5 days' },
];

export const SUPPLY_PORTS = [
    { id: 'P-A', name: 'Port A (North Quay)', status: 'Active', capacity: '92%' },
    { id: 'P-B', name: 'Port B (South Dock)', status: 'Active', capacity: '78%' },
    { id: 'P-C', name: 'Port C (Rail Terminal)', status: 'Standby', capacity: '15%' },
];

export const PART_LOCATIONS = [
    { id: 'WL-A', part: 'Welding Arm A', currentPort: 'P-B', arrivalTime: '06:00', status: 'In Transit' },
    { id: 'CS-4', part: 'Chips S-04', currentPort: 'P-A', arrivalTime: '14:30', status: 'Processing' },
];

export const DEGRADATION_DATA_TEMPLATE = [
    { time: '00:00', vibration: 12, temp: 45 },
    { time: '04:00', vibration: 14, temp: 46 },
    { time: '08:00', vibration: 13, temp: 48 },
    { time: '12:00', vibration: 15, temp: 47 },
    { time: '16:00', vibration: 18, temp: 50 },
    { time: '20:00', vibration: 16, temp: 49 },
];

export const PRODUCTION_STAGES = [
    { id: 'ST-1', name: 'Stamping', status: 'Optimal', output: 120, target: 120 },
    { id: 'ST-2', name: 'Body Shop', status: 'Warning', output: 95, target: 110, issue: 'R-101 Load Balancing' },
    { id: 'ST-3', name: 'Paint Shop', status: 'Optimal', output: 110, target: 110 },
    { id: 'ST-4', name: 'Montage', status: 'Optimal', output: 108, target: 110 },
    { id: 'ST-5', name: 'QA/Final', status: 'Optimal', output: 108, target: 110 },
];

export const CHECKPOINT_CARS = [
    { id: 'VIN-7721', model: 'BMW i4', status: 'F1', health: 'Healthy', timestamp: '2026-01-30 08:45', issues: 'None', powerOn: true },
    { id: 'VIN-8842', model: 'BMW 2-Series', status: 'F1', health: 'Minor Warning', timestamp: '2026-01-30 09:12', issues: 'Software Update Pending', powerOn: true },
    { id: 'VIN-9901', model: 'BMW iX', status: 'F2', health: 'Healthy', timestamp: '2026-01-30 07:30', issues: 'None', deliveryReady: true },
    { id: 'VIN-1245', model: 'BMW 1-Series', status: 'F2', health: 'Perfect', timestamp: '2026-01-30 09:30', issues: 'None', deliveryReady: true },
];

export const REWORK_CARS = {
    inline: [
        { id: 'VIN-5561', model: 'BMW i4', problem: 'Door Seal Alignment', location: 'Finger 4', timestamp: '09:15', steps: ['Reset seal', 'Visual verify'] },
    ],
    offline: [
        { id: 'VIN-2234', model: 'BMW 2-Series', problem: 'Paint Anomaly (Roof)', location: 'Rework Station 2', timestamp: 'Yesterday 16:40', steps: ['Sanding', 'Repaint', 'Clear coat'] },
    ]
};

export const REWORK_STATS = {
    totalProduced: 1240,
    totalRework: 42
};

export const INSPECTION_TASKS = [
    { id: 'INS-01', asset: 'Hydraulic Press 4', originalDate: 'Oct 24', newDate: 'Nov 02', reason: 'Vibration data indicates low wear. Extended interval.', impact: '+9 Days', status: 'Optimized' },
    { id: 'INS-02', asset: 'Welding Arm A (R-101)', originalDate: 'Nov 10', newDate: 'Oct 23', reason: 'Wear spike detected. Preventive check required.', impact: '-18 Days', status: 'Expedited' },
    { id: 'INS-03', asset: 'Conveyor Motor B', originalDate: 'Oct 25', newDate: 'Oct 25', reason: 'Routine interval matches wear patterns.', impact: 'No Change', status: 'Standard' },
    { id: 'INS-04', asset: 'AGV Fleet Lidar', originalDate: 'Oct 26', newDate: 'Nov 15', reason: 'Sensor drift within tolerance. Inspection postponed.', impact: '+20 Days', status: 'Optimized' },
];
