import React, { useState } from 'react';
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
import { motion } from 'framer-motion';
import { useAtlas } from '../../config/ConfigContext';

interface SupplyViewProps {
    addToast?: (msg: string, type: 'success' | 'warning' | 'info' | 'error') => void;
}

export const SupplyView: React.FC<SupplyViewProps> = ({ addToast: _addToast }) => {
    const { config } = useAtlas();
    const [locations, setLocations] = useState(config.partLocations);
    const [impact, setImpact] = useState<{ msg: string; type: 'warning' | 'info' | 'success' } | null>(null);

    const handleLocationChange = (partId: string, newPortId: string) => {
        const port = config.entryPoints.find(p => p.id === newPortId);
        const part = locations.find(l => l.id === partId);

        setLocations(prev => prev.map(l => l.id === partId ? { ...l, currentPort: newPortId } : l));

        const lastPort = config.entryPoints[config.entryPoints.length - 1];
        if (newPortId === lastPort?.id) {
            setImpact({
                msg: `CRITICAL IMPACT: Switching ${part?.part} to ${port?.name} adds 14.5 hours to delivery. ${config.terminology.zones[2]?.name || 'Zone 3'} schedule may slip.`,
                type: 'warning'
            });
        } else if (newPortId === config.entryPoints[0]?.id) {
            setImpact({
                msg: `OPTIMIZATION: ${part?.part} redirected to ${port?.name}. Reducing transport by 2.1km. ETA improved by 45 mins.`,
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
        <div className="space-y-5">
            {/* Suppliers & Entry Points */}
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-8 grid grid-cols-2 gap-5">
                    {config.suppliers.slice(0, 2).map((supplier, idx) => (
                        <motion.div
                            key={supplier.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="relative overflow-hidden group">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${supplier.risk === 'High' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                                <div className="flex justify-between items-start mb-4 pl-2">
                                    <div>
                                        <h3 className="text-white font-semibold">{supplier.name}</h3>
                                        <p className="text-[11px] text-slate-400">{supplier.category}</p>
                                    </div>
                                    {supplier.risk === 'High' ? <AlertTriangle className="text-rose-500" size={16} /> : <ShieldAlert className="text-emerald-500" size={16} />}
                                </div>

                                <div className="space-y-3 pl-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-400">Stability Score</span>
                                        <span className={supplier.stability < 70 ? 'text-rose-400 font-semibold' : 'text-emerald-400 font-semibold'}>{supplier.stability}/100</span>
                                    </div>
                                    <div className="flex justify-between text-xs pt-2 border-t border-slate-800/50">
                                        <span className="text-slate-400">Lead Time</span>
                                        <span className="text-white">{supplier.leadTime}</span>
                                    </div>

                                    {supplier.risk === 'High' && (
                                        <div className="mt-3 bg-rose-500/5 border border-rose-500/20 p-3 rounded-lg space-y-2.5">
                                            <div className="flex items-start gap-2">
                                                <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={12} />
                                                <p className="text-[11px] text-rose-200 font-medium">{supplier.riskDetail}</p>
                                            </div>
                                            {supplier.historicalNote && (
                                                <div className="border-t border-rose-500/15 pt-2">
                                                    <p className="text-[9px] text-rose-400 font-bold uppercase mb-1 flex items-center gap-1">
                                                        <History size={9} /> Historical Precedent
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 italic leading-relaxed">{supplier.historicalNote}</p>
                                                </div>
                                            )}
                                            {supplier.mitigations && (
                                                <div className="flex gap-2 flex-wrap">
                                                    {supplier.mitigations.map((m, i) => (
                                                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded border" style={{
                                                            background: `hsl(var(--atlas-primary) / 0.1)`,
                                                            borderColor: `hsl(var(--atlas-primary) / 0.2)`,
                                                            color: `hsl(var(--atlas-primary))`,
                                                        }}>{m}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Entry Points */}
                <div className="col-span-4">
                    <Card className="h-full">
                        <div className="flex items-center gap-2 mb-4 text-slate-300 border-b border-slate-800/50 pb-2">
                            <Anchor size={16} />
                            <h3 className="font-semibold text-sm">Entry Points ({config.terminology.entryPoint}s)</h3>
                        </div>
                        <div className="space-y-2.5">
                            {config.entryPoints.map(port => (
                                <div key={port.id} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${port.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-slate-600'}`} />
                                        <span className="text-xs text-white font-medium">{port.name}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500">Cap: {port.capacity}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Dynamic Asset Logistics */}
            <Card>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <MapPin size={18} style={{ color: `hsl(var(--atlas-primary))` }} />
                        <h3 className="text-base font-bold text-white">Dynamic Asset Logistics</h3>
                    </div>
                    {impact && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-medium ${
                                impact.type === 'warning' ? 'bg-rose-500/5 border-rose-500/20 text-rose-300' :
                                impact.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300' :
                                'bg-blue-500/5 border-blue-500/20 text-blue-300'
                            }`}
                        >
                            {impact.type === 'warning' ? <AlertTriangle size={14} /> : <Zap size={14} />}
                            <span>{impact.msg}</span>
                        </motion.div>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950/50 uppercase text-[10px] font-bold text-slate-500 tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Component / Part</th>
                                <th className="px-4 py-3">Inbound Route</th>
                                <th className="px-4 py-3">Arrival Window</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 text-right">Redirect</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {locations.map((loc) => (
                                <tr key={loc.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="px-4 py-3.5 font-semibold text-white text-sm">{loc.part}</td>
                                    <td className="px-4 py-3.5">
                                        <span className="bg-slate-800/60 px-2 py-1 rounded text-[10px] text-slate-300 border border-slate-700/50">
                                            {config.entryPoints.find(p => p.id === loc.currentPort)?.name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3.5 flex items-center gap-2">
                                        <Timer size={13} className="text-slate-500" />
                                        <span className="font-mono">{loc.arrivalTime}</span>
                                    </td>
                                    <td className="px-4 py-3.5">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold border ${
                                            loc.status === 'Processing' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                                        }`}>{loc.status}</span>
                                    </td>
                                    <td className="px-4 py-3.5 text-right">
                                        <div className="flex justify-end gap-1.5">
                                            {config.entryPoints.filter(p => p.id !== loc.currentPort).map(port => (
                                                <button
                                                    key={port.id}
                                                    onClick={() => handleLocationChange(loc.id, port.id)}
                                                    className="px-2 py-1 bg-slate-800/60 hover:bg-slate-700 text-white text-[10px] rounded-md transition-all border border-slate-700/50 hover:border-slate-600"
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

            {/* Shortage Forecast */}
            <Card>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-amber-500" size={18} />
                        <h3 className="text-base font-bold text-white">Global Material Shortage Forecast</h3>
                    </div>
                </div>
                <div className="h-44 w-full mb-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={config.shortageData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#475569" tick={{ fontSize: 10 }} />
                            <YAxis stroke="#475569" tick={{ fontSize: 10 }} />
                            <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px' }} />
                            <Bar dataKey="stock" fill="var(--atlas-primary-hex, #3b82f6)" name="Current Stock" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="risk" fill="var(--atlas-danger-hex, #ef4444)" name="Shortage Risk Index" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-5 bg-slate-950/30 p-4 rounded-xl border border-slate-800/50">
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <Lightbulb className="text-amber-400" size={14} /> Recommended Mitigation
                        </h4>
                        <ul className="text-xs text-slate-400 space-y-2">
                            {config.shortageMitigations.map((m, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <ArrowRight size={11} className="shrink-0 mt-0.5" style={{ color: `hsl(var(--atlas-primary))` }} />
                                    <span>{m}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                            <History size={14} className="text-slate-400" /> AI Reasoning (Historical)
                        </h4>
                        <p className="text-xs text-slate-500 italic leading-relaxed">{config.shortageHistoricalNote}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
