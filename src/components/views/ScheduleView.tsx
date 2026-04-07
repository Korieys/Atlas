import React from 'react';
import { CheckCircle, Settings } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { AnimatedCounter } from '../common/AnimatedCounter';
import { motion } from 'framer-motion';
import { useAtlas } from '../../config/ConfigContext';

interface ScheduleViewProps {
    addToast?: (msg: string, type: 'success' | 'warning' | 'info' | 'error') => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ addToast }) => {
    const { config } = useAtlas();

    return (
        <div className="space-y-5">
            {/* Value Props */}
            <div className="grid grid-cols-2 gap-5">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
                    <Card className="bg-gradient-to-br from-slate-900 to-slate-800/50 border-l-4 border-l-purple-500/60">
                        <h3 className="text-slate-400 text-xs font-medium">Legacy Fixed Schedule</h3>
                        <div className="mt-2 flex items-end gap-2">
                            <span className="text-3xl font-bold text-slate-500 line-through decoration-rose-500/60">
                                <AnimatedCounter value={config.legacyInspections} />
                            </span>
                            <span className="text-xs text-slate-500 mb-1">inspections/mo</span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2">Static intervals based on calendar days.</p>
                    </Card>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card className="border-l-4 border-l-emerald-500/60">
                        <h3 className="text-xs font-medium" style={{ color: `hsl(var(--atlas-primary))` }}>AI Risk-Based Schedule</h3>
                        <div className="mt-2 flex items-end gap-2">
                            <span className="text-3xl font-bold text-white">
                                <AnimatedCounter value={config.aiInspections} />
                            </span>
                            <span className="text-xs text-emerald-400 mb-1">inspections/mo</span>
                        </div>
                        <p className="text-[10px] text-emerald-400/80 mt-2">
                            <span className="font-bold">{config.savedInspections} unnecessary checks prevented</span> • {config.savedHours} labor hours saved
                        </p>
                    </Card>
                </motion.div>
            </div>

            {/* Inspection Queue */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card>
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-base font-bold text-white">Dynamic Inspection Queue</h3>
                        <button
                            onClick={() => addToast?.('All recommendations approved. Schedule updated.', 'success')}
                            className="px-4 py-2 rounded-lg text-white text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                            style={{
                                background: `hsl(var(--atlas-primary))`,
                                boxShadow: `0 0 20px hsl(var(--atlas-primary) / 0.25)`,
                            }}
                        >
                            Approve All Recommendations
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-slate-950/30 uppercase text-[10px] font-bold text-slate-500 tracking-wider">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-lg">Asset</th>
                                    <th className="px-4 py-3">Legacy Date</th>
                                    <th className="px-4 py-3">AI Proposed Date</th>
                                    <th className="px-4 py-3">Logic / Reasoning</th>
                                    <th className="px-4 py-3">Impact</th>
                                    <th className="px-4 py-3 rounded-tr-lg">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {config.inspectionTasks.map((task, idx) => (
                                    <motion.tr
                                        key={task.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.06 }}
                                        className="hover:bg-slate-800/20 transition-colors group"
                                    >
                                        <td className="px-4 py-3.5 font-medium text-white text-sm">{task.asset}</td>
                                        <td className="px-4 py-3.5 text-slate-500">{task.originalDate}</td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-semibold">{task.newDate}</span>
                                                <Badge status={task.status} />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3.5 max-w-xs truncate text-xs" title={task.reason}>
                                            {task.reason}
                                        </td>
                                        <td className={`px-4 py-3.5 font-mono font-bold text-sm ${
                                            task.impact.includes('+') ? 'text-emerald-400' :
                                            task.impact.includes('-') ? 'text-rose-400' : 'text-slate-400'
                                        }`}>
                                            {task.impact}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex gap-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => addToast?.(`Approved inspection for ${task.asset}`, 'success')}
                                                    className="p-1.5 rounded-md hover:bg-emerald-500/15 text-emerald-400 transition-colors"
                                                    title="Approve"
                                                >
                                                    <CheckCircle size={15} />
                                                </button>
                                                <button
                                                    onClick={() => addToast?.(`Editing schedule for ${task.asset}`, 'info')}
                                                    className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Settings size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};
