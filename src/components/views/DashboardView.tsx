import React, { useRef, useEffect } from 'react';
import {
    Activity,
    BrainCircuit,
    Box,
    ShieldAlert,
    Cpu
} from 'lucide-react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { motion } from 'framer-motion';

import { FINGER_STATUS, OEE_DATA, PRODUCTION_VOLUME } from '../../data/mockData';

interface DashboardViewProps {
    chartData: any[];
    agentLogs: any[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ chartData, agentLogs }) => {
    const logEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logs
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [agentLogs]);

    const volumeProgress = (PRODUCTION_VOLUME.actual / PRODUCTION_VOLUME.goal) * 100;

    return (
        <div className="grid grid-cols-12 gap-6 animate-in fade-in duration-500">
            {/* KPI Row */}
            <div className="col-span-12 grid grid-cols-4 gap-6">
                <Card className="hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm">Overall Health</p>
                            <h3 className="text-3xl font-bold text-emerald-400 mt-1">98.2%</h3>
                        </div>
                        <Activity className="text-slate-500" />
                    </div>
                    <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[98%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                </Card>
                <Card className="hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm">Active Agents</p>
                            <h3 className="text-3xl font-bold text-blue-400 mt-1">842</h3>
                        </div>
                        <BrainCircuit className="text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500 mt-4">Autonomous decisions/hr: 1,204</p>
                </Card>
                <Card className="hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm">Plant Efficiency</p>
                            <h3 className="text-3xl font-bold text-purple-400 mt-1">On Schedule</h3>
                        </div>
                        <Box className="text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500 mt-4">Buffer levels optimized for Shift B</p>
                </Card>
                <Card className="hover:scale-[1.02] transition-transform">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-slate-400 text-sm">Predicted Risks</p>
                            <h3 className="text-3xl font-bold text-amber-400 mt-1">3</h3>
                        </div>
                        <ShieldAlert className="text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500 mt-4">2 Supply, 1 Mechanical</p>
                </Card>
            </div>

            {/* Productivity Cockpit */}
            <div className="col-span-8 space-y-6">
                <Card className="p-6 bg-slate-900/50">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Leipzig Digital Twin</span>
                            <h3 className="text-2xl font-bold text-white mt-1">Productivity Cockpit</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Shift Volume (Actual/Goal)</p>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-2xl font-mono font-bold text-white">{PRODUCTION_VOLUME.actual}</span>
                                <span className="text-slate-600 text-lg">/</span>
                                <span className="text-slate-400 text-lg">{PRODUCTION_VOLUME.goal}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-10">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-2 uppercase font-bold tracking-tighter">
                            <span>0 units</span>
                            <span>{volumeProgress.toFixed(1)}% OF DAILY TARGET</span>
                            <span>{PRODUCTION_VOLUME.goal} units</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden p-[2px] border border-slate-700 shadow-inner">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${volumeProgress}%` }}
                                className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full relative"
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {/* OEE Metrics */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-l-2 border-indigo-500 pl-2">OEE Performance Decomposition</h4>
                            <div className="space-y-4">
                                {OEE_DATA.map(metric => (
                                    <div key={metric.name}>
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-300">{metric.name}</span>
                                            <span className="text-white font-mono">{metric.value}%</span>
                                        </div>
                                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${metric.value >= metric.target ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                style={{ width: `${metric.value}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Finger Health Matrix */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-l-2 border-blue-500 pl-2">Finger Health Matrix</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {FINGER_STATUS.map(finger => (
                                    <div key={finger.id} className={`p-3 rounded-lg border flex flex-col justify-between h-20 transition-colors ${finger.status === 'Warning' ? 'bg-amber-500/10 border-amber-500/20' :
                                        finger.status === 'Underutilized' ? 'bg-blue-500/10 border-blue-500/20' :
                                            'bg-slate-800/50 border-slate-700/50'
                                        }`}>
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-bold text-slate-400">{finger.id}</span>
                                            <div className={`w-2 h-2 rounded-full ${finger.status === 'Warning' ? 'bg-amber-500 animate-pulse' :
                                                finger.status === 'Optimal' ? 'bg-emerald-500' : 'bg-blue-400'
                                                }`}></div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-white font-bold truncate">{finger.name}</p>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-[9px] text-slate-500 uppercase">Load: {finger.load}%</span>
                                                <span className={`text-[9px] font-bold ${finger.health > 90 ? 'text-emerald-400' :
                                                    finger.health > 80 ? 'text-slate-400' : 'text-amber-400'
                                                    }`}>{finger.health}% Health</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Smaller Real-time OEE Trend */}
                <Card className="p-4 h-32 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global OEE Historical Trend (24h)</span>
                        <Badge status="Optimal" />
                    </div>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorOee" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" hide />
                                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                                    itemStyle={{ fontSize: '10px' }}
                                    labelStyle={{ display: 'none' }}
                                />
                                <Area name="OEE %" type="monotone" dataKey="oee" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorOee)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Agent Activity Feed (Right Side) */}
            <div className="col-span-4">
                <Card className="h-96 flex flex-col border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center gap-2 mb-4 text-blue-400">
                        <Cpu size={18} />
                        <h3 className="font-mono font-bold tracking-wider">AGENT_LOGS</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs pr-2 custom-scrollbar">
                        {agentLogs.map((log) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={log.id}
                                className="border-l-2 border-slate-700 pl-3 py-1"
                            >
                                <div className="flex justify-between text-slate-500 mb-1">
                                    <span>{log.time}</span>
                                    <span className={`uppercase font-bold ${log.type === 'error' ? 'text-rose-500' :
                                        log.type === 'warning' ? 'text-amber-500' :
                                            log.type === 'action' ? 'text-blue-400' :
                                                log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'
                                        }`}>{log.type}</span>
                                </div>
                                <p className="text-slate-300 leading-relaxed">{log.msg}</p>
                            </motion.div>
                        ))}
                        <div ref={logEndRef} />
                    </div>
                </Card>
            </div>
        </div>
    );
};
