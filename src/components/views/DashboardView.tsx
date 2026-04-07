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
import { AnimatedCounter } from '../common/AnimatedCounter';
import { motion } from 'framer-motion';
import { useAtlas } from '../../config/ConfigContext';

const ICON_MAP: Record<string, React.FC<any>> = {
    Activity, BrainCircuit, Box, ShieldAlert,
};

interface DashboardViewProps {
    chartData: any[];
    agentLogs: any[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({ chartData, agentLogs }) => {
    const logEndRef = useRef<HTMLDivElement>(null);
    const { config } = useAtlas();

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [agentLogs]);

    const volumeProgress = (config.productionVolume.actual / config.productionVolume.goal) * 100;

    return (
        <div className="grid grid-cols-12 gap-5">
            {/* KPI Row */}
            <div className="col-span-12 grid grid-cols-4 gap-5">
                {config.dashboardKPIs.map((kpi, idx) => {
                    const Icon = ICON_MAP[kpi.icon] || Activity;
                    return (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Card>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-slate-400 text-xs font-medium">{kpi.label}</p>
                                        <h3 className={`text-2xl font-bold mt-1 ${
                                            kpi.color === 'emerald' ? 'text-emerald-400' :
                                            kpi.color === 'blue' || kpi.color === 'sky' ? 'text-blue-400' :
                                            kpi.color === 'purple' || kpi.color === 'teal' ? 'text-purple-400' :
                                            kpi.color === 'green' ? 'text-emerald-400' :
                                            'text-amber-400'
                                        }`}>
                                            {kpi.value}
                                        </h3>
                                    </div>
                                    <div className="p-2 rounded-lg bg-slate-800/50">
                                        <Icon size={18} className="text-slate-500" />
                                    </div>
                                </div>
                                {kpi.progress && (
                                    <div className="mt-3 h-1 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${kpi.progress}%` }}
                                            transition={{ duration: 1.2, ease: 'easeOut' }}
                                            className="h-full rounded-full"
                                            style={{ background: `hsl(var(--atlas-success))`, boxShadow: `0 0 8px hsl(var(--atlas-success) / 0.5)` }}
                                        />
                                    </div>
                                )}
                                {kpi.subtext && (
                                    <p className="text-[10px] text-slate-500 mt-3">{kpi.subtext}</p>
                                )}
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Productivity Cockpit */}
            <div className="col-span-8 space-y-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Card className="p-6">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: `hsl(var(--atlas-primary))` }}>
                                    {config.cockpitSubtitle}
                                </span>
                                <h3 className="text-xl font-bold text-white mt-1">{config.cockpitTitle}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Shift Volume (Actual/Goal)</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-2xl font-mono font-bold text-white">
                                        <AnimatedCounter value={config.productionVolume.actual} />
                                    </span>
                                    <span className="text-slate-600 text-lg">/</span>
                                    <span className="text-slate-400 text-lg">{config.productionVolume.goal}</span>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-[9px] text-slate-500 mb-2 uppercase font-bold tracking-wider">
                                <span>0 units</span>
                                <span>{volumeProgress.toFixed(1)}% OF DAILY TARGET</span>
                                <span>{config.productionVolume.goal} units</span>
                            </div>
                            <div className="h-2.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/30">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${volumeProgress}%` }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="h-full rounded-full relative"
                                    style={{
                                        background: `linear-gradient(90deg, hsl(var(--atlas-primary)), hsl(var(--atlas-accent)))`,
                                    }}
                                >
                                    <div className="absolute inset-0 rounded-full opacity-40 animate-shimmer" style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                                        backgroundSize: '200% 100%',
                                    }} />
                                </motion.div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {/* OEE Metrics */}
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border-l-2 pl-2" style={{ borderColor: `hsl(var(--atlas-accent))` }}>
                                    OEE Performance Decomposition
                                </h4>
                                <div className="space-y-4">
                                    {config.oeeMetrics.map(metric => (
                                        <div key={metric.name}>
                                            <div className="flex justify-between text-xs mb-1.5">
                                                <span className="text-slate-300">{metric.name}</span>
                                                <span className="text-white font-mono font-semibold">{metric.value}%</span>
                                            </div>
                                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${metric.value}%` }}
                                                    transition={{ duration: 1, ease: 'easeOut' }}
                                                    className={`h-full rounded-full ${metric.value >= metric.target ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                    style={{
                                                        boxShadow: metric.value >= metric.target
                                                            ? '0 0 8px rgba(16,185,129,0.4)'
                                                            : '0 0 8px rgba(245,158,11,0.4)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Zone Health Matrix */}
                            <div>
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border-l-2 pl-2" style={{ borderColor: `hsl(var(--atlas-primary))` }}>
                                    {config.terminology.zone} Health Matrix
                                </h4>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {config.terminology.zones.map(zone => (
                                        <div key={zone.id} className={`p-3 rounded-lg border flex flex-col justify-between min-h-20 transition-all group relative overflow-hidden ${
                                            zone.status === 'Warning' ? 'bg-amber-500/5 border-amber-500/20' :
                                            zone.status === 'Underutilized' ? 'bg-blue-500/5 border-blue-500/20' :
                                            'bg-slate-800/30 border-slate-700/30'
                                        }`}>
                                            <div className="flex justify-between items-start">
                                                <span className="text-[9px] font-bold text-slate-500">{zone.id}</span>
                                                <div className={`w-2 h-2 rounded-full ${
                                                    zone.status === 'Warning' ? 'bg-amber-500 animate-pulse' :
                                                    zone.status === 'Optimal' ? 'bg-emerald-500' : 'bg-blue-400'
                                                }`} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-white font-semibold truncate">{zone.name}</p>
                                                <div className="flex justify-between items-center mt-1 group-hover:opacity-20 transition-opacity">
                                                    <span className="text-[9px] text-slate-500">Load: {zone.load}%</span>
                                                    <span className={`text-[9px] font-semibold ${
                                                        zone.health > 90 ? 'text-emerald-400' :
                                                        zone.health > 80 ? 'text-slate-400' : 'text-amber-400'
                                                    }`}>{zone.health}%</span>
                                                </div>
                                                {(zone.status === 'Warning' || zone.status === 'Underutilized') && zone.reason && (
                                                    <div className="absolute inset-x-0 bottom-0 bg-slate-900/95 p-2 border-t border-slate-700/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                                                        <p className="text-[9px] text-slate-300 leading-tight">
                                                            <span className="font-bold text-slate-500">Reason:</span> {zone.reason}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* OEE Trend */}
                <Card className="p-4 h-28 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global OEE Historical Trend (24h)</span>
                        <Badge status="Optimal" />
                    </div>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorOee" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--atlas-success-hex, #10b981)" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="var(--atlas-success-hex, #10b981)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" hide />
                                <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px' }}
                                    labelStyle={{ display: 'none' }}
                                />
                                <Area name="OEE %" type="monotone" dataKey="oee" stroke="var(--atlas-success-hex, #10b981)" strokeWidth={2} fillOpacity={1} fill="url(#colorOee)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Agent Activity Feed */}
            <div className="col-span-4">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <Card className="h-[500px] flex flex-col" glow>
                        <div className="flex items-center gap-2 mb-4" style={{ color: `hsl(var(--atlas-primary))` }}>
                            <Cpu size={16} />
                            <h3 className="font-mono font-bold tracking-wider text-sm">AGENT_LOGS</h3>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-2.5 font-mono text-[11px] pr-2 custom-scrollbar">
                            {agentLogs.map((log) => (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={log.id}
                                    className="border-l-2 border-slate-800 pl-3 py-1"
                                >
                                    <div className="flex justify-between text-slate-500 mb-0.5">
                                        <span className="text-[10px]">{log.time}</span>
                                        <span className={`uppercase font-bold text-[9px] ${
                                            log.type === 'error' ? 'text-rose-500' :
                                            log.type === 'warning' ? 'text-amber-500' :
                                            log.type === 'action' ? 'text-blue-400' :
                                            log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'
                                        }`}>{log.type}</span>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed text-[11px]">{log.msg}</p>
                                </motion.div>
                            ))}
                            <div ref={logEndRef} />
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
