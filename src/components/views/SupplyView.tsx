import React, { useState } from 'react';
import { INITIAL_SUPPLIERS, SUPPLY_PORTS, PART_LOCATIONS } from '../../data/mockData';
import {
    AlertTriangle,
    ShieldAlert,
    Anchor,
    MapPin,
    ArrowRight,
    History,
    Lightbulb,
    Timer,
    Zap
} from 'lucide-react';
import { Card } from '../common/Card';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';

export const SupplyView: React.FC = () => {
    const [locations, setLocations] = useState(PART_LOCATIONS);
    const [impact, setImpact] = useState<{ msg: string; type: 'warning' | 'info' | 'success' } | null>(null);

    const handleLocationChange = (partId: string, newPortId: string) => {
        const port = SUPPLY_PORTS.find(p => p.id === newPortId);
        const part = locations.find(l => l.id === partId);

        setLocations(prev => prev.map(l => l.id === partId ? { ...l, currentPort: newPortId } : l));

        // Simulating impact analysis
        if (newPortId === 'P-C') {
            setImpact({
                msg: `CRITICAL IMPACT: Switching ${part?.part} to Port C (Rail) adds 14.5 hours to delivery. Montage Finger 3 schedule may slip.`,
                type: 'warning'
            });
        } else if (newPortId === 'P-A') {
            setImpact({
                msg: `OPTIMIZATION: ${part?.part} redirected to Port A. Reducing inland transport by 2.1km. ETA improved by 45 mins.`,
                type: 'success'
            });
        } else {
            setImpact({
                msg: `OPERATIONAL CHANGE: ${part?.part} now arriving at ${port?.name}. Normal lead times apply.`,
                type: 'info'
            });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Row: Suppliers & Port Status */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 grid grid-cols-2 gap-6">
                    {INITIAL_SUPPLIERS.slice(0, 2).map(supplier => (
                        <Card key={supplier.id} className="relative overflow-hidden group">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 ${supplier.risk === 'High' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                            <div className="flex justify-between items-start mb-4 pl-2">
                                <div>
                                    <h3 className="text-white font-bold">{supplier.name}</h3>
                                    <p className="text-xs text-slate-400">{supplier.category}</p>
                                </div>
                                {supplier.risk === 'High' ? <AlertTriangle className="text-rose-500" size={18} /> : <ShieldAlert className="text-emerald-500" size={18} />}
                            </div>

                            <div className="space-y-3 pl-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Stability Score</span>
                                    <span className={supplier.stability < 70 ? 'text-rose-400' : 'text-emerald-400'}>{supplier.stability}/100</span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
                                    <span className="text-slate-400">Lead Time</span>
                                    <span className="text-white">{supplier.leadTime}</span>
                                </div>

                                {supplier.risk === 'High' && (
                                    <div className="mt-4 bg-rose-500/10 border border-rose-500/30 p-3 rounded space-y-3">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={14} />
                                            <p className="text-xs text-rose-200 font-medium">Global chip shortage risk detected (12-day window).</p>
                                        </div>
                                        <div className="border-t border-rose-500/20 pt-2">
                                            <p className="text-[10px] text-rose-400 font-bold uppercase mb-1 flex items-center gap-1">
                                                <History size={10} /> Historical Precedent
                                            </p>
                                            <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                                "2024 Q3 Shortage: BMW mitigated via spot-market buying and firmware optimization to use alternate controller types."
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">Action: Spot Buy</span>
                                            <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">Action: Alternate BOM</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Ports Control */}
                <div className="col-span-4">
                    <Card className="h-full border-slate-800">
                        <div className="flex items-center gap-2 mb-4 text-slate-300 border-b border-slate-800 pb-2">
                            <Anchor size={18} />
                            <h3 className="font-bold">Entry Points (Ports)</h3>
                        </div>
                        <div className="space-y-3">
                            {SUPPLY_PORTS.map(port => (
                                <div key={port.id} className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${port.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'}`}></div>
                                        <span className="text-xs text-white font-medium">{port.name}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500">Cap: {port.capacity}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Part Location Manager */}
                <div className="col-span-12">
                    <Card className="border-blue-500/20">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-blue-400" size={20} />
                                <h3 className="text-lg font-bold text-white">Dynamic Asset Logistics</h3>
                            </div>
                            {impact && (
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-md border animate-in slide-in-from-top-2 ${impact.type === 'warning' ? 'bg-rose-500/10 border-rose-500/30 text-rose-300' :
                                    impact.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
                                        'bg-blue-500/10 border-blue-500/30 text-blue-300'
                                    }`}>
                                    {impact.type === 'warning' ? <AlertTriangle size={16} /> : <Zap size={16} />}
                                    <span className="text-xs font-medium">{impact.msg}</span>
                                </div>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="bg-slate-950 uppercase text-[10px] font-bold text-slate-500 tracking-wider">
                                    <tr>
                                        <th className="px-4 py-3">Component / Part</th>
                                        <th className="px-4 py-3">Inbound Route</th>
                                        <th className="px-4 py-3">Arrival Window</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-right">Redirect</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {locations.map((loc) => (
                                        <tr key={loc.id} className="hover:bg-slate-800/20 transition-colors">
                                            <td className="px-4 py-4 font-bold text-white">{loc.part}</td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-300 border border-slate-700">
                                                        {SUPPLY_PORTS.find(p => p.id === loc.currentPort)?.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 flex items-center gap-2">
                                                <Timer size={14} className="text-slate-500" />
                                                <span className="font-mono">{loc.arrivalTime}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${loc.status === 'Processing' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                                                    }`}>
                                                    {loc.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {SUPPLY_PORTS.filter(p => p.id !== loc.currentPort).map(port => (
                                                        <button
                                                            key={port.id}
                                                            onClick={() => handleLocationChange(loc.id, port.id)}
                                                            className="px-2 py-1 bg-slate-800 hover:bg-blue-600 text-white text-[10px] rounded transition-all border border-slate-700"
                                                            title={`Redirect to ${port.name}`}
                                                        >
                                                            {port.id.split('-')[1]}
                                                        </button>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Shortage Forecast */}
            <Card>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-amber-500" size={20} />
                        <h3 className="text-lg font-bold text-white">Global Material Shortage Forecast</h3>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-slate-800 text-xs rounded text-white hover:bg-slate-700">Europe</button>
                        <button className="px-3 py-1 bg-slate-800 text-xs rounded text-white hover:bg-slate-700">Asia</button>
                        <button className="px-3 py-1 bg-blue-600 text-xs rounded text-white shadow-lg">North America</button>
                    </div>
                </div>
                <div className="h-48 w-full mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Microcontrollers', risk: 85, stock: 40 },
                            { name: 'Steel Sheet', risk: 20, stock: 90 },
                            { name: 'Rubber Seals', risk: 35, stock: 80 },
                            { name: 'Polymers', risk: 60, stock: 55 },
                            { name: 'Wiring Looms', risk: 45, stock: 70 },
                        ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                            <YAxis stroke="#64748b" />
                            <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Bar dataKey="stock" fill="#3b82f6" name="Current Stock" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="risk" fill="#f43f5e" name="Shortage Risk Index" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-6 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    <div>
                        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                            <Lightbulb className="text-amber-400" size={16} /> Recommended Mitigation
                        </h4>
                        <ul className="text-xs text-slate-400 space-y-2">
                            <li className="flex items-center gap-2"><ArrowRight size={12} className="text-blue-500" /> Activate "Leipzig-Buffer" Protocol: Increase safety stock for wiring looms by 15%.</li>
                            <li className="flex items-center gap-2"><ArrowRight size={12} className="text-blue-500" /> Multi-sourcing: Fast-track qualification for Tier 2 supplier in Mexico for Rubber Seals.</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                            <History size={16} className="text-slate-400" /> AI Reasoning (Historical)
                        </h4>
                        <p className="text-xs text-slate-500 italic leading-relaxed">
                            "Model detected shift in polymer availability similar to 2021 winter freeze event. Proactive buffering saved Leipzig plant 4 days of downtime during that period. Suggest repeating similar safety stock increase."
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
