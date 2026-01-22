import React from 'react';
import {
    CheckCircle,
    Settings
} from 'lucide-react';
import { INSPECTION_TASKS } from '../../data/mockData';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const ScheduleView: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Value Props */}
            <div className="grid grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-l-4 border-l-purple-500 hover:scale-[1.01] transition-transform">
                    <h3 className="text-slate-400 text-sm font-medium">Legacy Fixed Schedule</h3>
                    <div className="mt-2 flex items-end gap-2">
                        <span className="text-3xl font-bold text-slate-500 line-through decoration-rose-500">142</span>
                        <span className="text-sm text-slate-500 mb-1">inspections/mo</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Static intervals based on calendar days.</p>
                </Card>
                <Card className="bg-gradient-to-br from-slate-900 to-blue-900/20 border-l-4 border-l-emerald-500 hover:scale-[1.01] transition-transform">
                    <h3 className="text-blue-400 text-sm font-medium">AI Risk-Based Schedule</h3>
                    <div className="mt-2 flex items-end gap-2">
                        <span className="text-3xl font-bold text-white">86</span>
                        <span className="text-sm text-emerald-400 mb-1">inspections/mo</span>
                    </div>
                    <p className="text-xs text-emerald-400/80 mt-2">
                        <span className="font-bold">56 unnecessary checks prevented</span> • 112 labor hours saved
                    </p>
                </Card>
            </div>

            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Dynamic Inspection Queue</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded bg-blue-600 text-white text-xs font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                            Approve All Recommendations
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950/50 uppercase text-xs font-medium text-slate-500">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-lg">Asset</th>
                                <th className="px-4 py-3">Legacy Date</th>
                                <th className="px-4 py-3">AI Proposed Date</th>
                                <th className="px-4 py-3">Logic / Reasoning</th>
                                <th className="px-4 py-3">Impact</th>
                                <th className="px-4 py-3 rounded-tr-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {INSPECTION_TASKS.map((task) => (
                                <tr key={task.id} className="hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-4 py-4 font-medium text-white">{task.asset}</td>
                                    <td className="px-4 py-4 text-slate-500 decoration-slate-600">{task.originalDate}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white font-bold">{task.newDate}</span>
                                            <Badge status={task.status} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 max-w-xs truncate" title={task.reason}>
                                        {task.reason}
                                    </td>
                                    <td className={`px-4 py-4 font-mono font-bold ${task.impact.includes('+') ? 'text-emerald-400' :
                                            task.impact.includes('-') ? 'text-rose-400' : 'text-slate-400'
                                        }`}>
                                        {task.impact}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 rounded hover:bg-emerald-500/20 text-emerald-400 transition-colors" title="Approve">
                                                <CheckCircle size={16} />
                                            </button>
                                            <button className="p-1.5 rounded hover:bg-slate-700 text-slate-400 transition-colors" title="Edit">
                                                <Settings size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
