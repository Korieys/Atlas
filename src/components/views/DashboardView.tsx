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
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { motion } from 'framer-motion';

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
                            <p className="text-slate-400 text-sm">Inventory Efficiency</p>
                            <h3 className="text-3xl font-bold text-purple-400 mt-1">JIT+</h3>
                        </div>
                        <Box className="text-slate-500" />
                    </div>
                    <p className="text-xs text-slate-500 mt-4">Overstock reduced by 12%</p>
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

            {/* Main Graph Area */}
            <div className="col-span-8">
                <Card className="h-96 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Production Line Resilience Score</h3>
                        <div className="flex space-x-2">
                            <Badge status="Optimal" />
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorVib" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="time" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }}
                                    itemStyle={{ color: '#e2e8f0' }}
                                />
                                <Area type="monotone" dataKey="vibration" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVib)" />
                                <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} />
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
