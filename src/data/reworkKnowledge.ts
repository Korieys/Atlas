export const REWORK_KNOWLEDGE = [
    {
        id: 'RK-001',
        issue: 'Door Seal Alignment',
        symptoms: 'Wind noise at high speeds, water ingress during pressure test.',
        rootCause: 'Robotic Arm RS-402 pressure sensor decalibrated by 0.5mm.',
        solution: 'Recalibrate sensor RS-402. Manually adjust seal and re-run leak test.',
        historicalExamples: [
            { date: '2025-11-12', plant: 'Leipzig', resolution: 'Line stoppage avoided by offline adjustment.' }
        ]
    },
    {
        id: 'RK-002',
        issue: 'Paint Anomaly (Roof)',
        symptoms: 'Orange peel texture, slight color variation.',
        rootCause: 'Humidity spike in Paint Shop Zone 3 due to ventilation filter clog.',
        solution: 'Replace air filters. Sand down affected area and apply clear coat.',
        historicalExamples: [
            { date: '2025-08-05', plant: 'Munich', resolution: 'Batch audit performed; 12 vehicles reworked.' }
        ]
    },
    {
        id: 'RK-003',
        issue: 'Software Update Failure',
        symptoms: 'Infotainment system stuck on boot loop.',
        rootCause: 'Corrupt firmware package on local server mirror.',
        solution: 'Clear local cache. Re-download package from central BMW server. Perform hard reset on vehicle ECU.',
        historicalExamples: [
            { date: '2026-01-15', plant: 'Leipzig', resolution: 'Resolved within 20 mins via OTA override.' }
        ]
    }
];
