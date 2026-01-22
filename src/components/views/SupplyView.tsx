import React from 'react';
import { INITIAL_SUPPLIERS } from '../../data/mockData';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
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
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-3 gap-6">
                {INITIAL_SUPPLIERS.map(supplier => (
                    <Card key={supplier.id} className="relative overflow-hidden group hover:scale-[1.02] transition-transform">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${supplier.risk === 'High' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`}></div>
                        <div className="flex justify-between items-start mb-4 pl-2">
                            <div>
                                <h3 className="text-white font-bold">{supplier.name}</h3>
                                <p className="text-xs text-slate-400">{supplier.category}</p>
                            </div>
                            {supplier.risk === 'High' ? <AlertTriangle className="text-rose-500" /> : <ShieldAlert className="text-emerald-500" />}
                        </div>

                        <div className="space-y-3 pl-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Stability Score</span>
                                <span className={supplier.stability < 70 ? 'text-rose-400' : 'text-emerald-400'}>{supplier.stability}/100</span>
                            </div>
                            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${supplier.stability < 70 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                    style={{ width: `${supplier.stability}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
                                <span className="text-slate-400">Lead Time</span>
                                <span className="text-white">{supplier.leadTime}</span>
                            </div>
                        </div>

                        {supplier.risk === 'High' && (
                            <div className="mt-4 bg-rose-500/10 border border-rose-500/30 p-3 rounded">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={14} />
                                    <div>
                                        <p className="text-xs text-rose-200 font-medium leading-relaxed">
                                            AI Warning: Global chip shortage projected to impact this supplier in 12 days.
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-[10px] text-rose-400/70 uppercase font-bold tracking-wider">Sources:</span>
                                            <div className="flex gap-1.5">
                                                <span className="text-[10px] bg-rose-950/50 border border-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">Reuters API</span>
                                                <span className="text-[10px] bg-rose-950/50 border border-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">Tier 2 Supplier Email</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                ))}
            </div>

            <Card>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Global Material Shortage Forecast</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-slate-800 text-xs rounded text-white hover:bg-slate-700 transition-colors">Europe</button>
                        <button className="px-3 py-1 bg-slate-800 text-xs rounded text-white hover:bg-slate-700 transition-colors">Asia</button>
                        <button className="px-3 py-1 bg-blue-600 text-xs rounded text-white shadow-lg shadow-blue-600/20">North America</button>
                    </div>
                </div>
                <div className="h-64 w-full">
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
            </Card>
        </div>
    );
};
