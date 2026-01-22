import React, { useState } from 'react';
import {
    Zap,
    RefreshCw,
    Cog,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from 'recharts';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface MaintenanceViewProps {
    robots: any[];
    chartData: any[];
    isSimulating: boolean;
    onSimulate: () => void;
    onReset: () => void;
}

export const MaintenanceView: React.FC<MaintenanceViewProps> = ({
    robots,
    chartData,
    isSimulating,
    onSimulate,
    onReset
}) => {
    const [selectedRobotId, setSelectedRobotId] = useState(robots[0].id);

    const selectedRobot = robots.find(r => r.id === selectedRobotId) || robots[0];

    return (
        <div className="grid grid-cols-12 gap-6 animate-in slide-in-from-right-4 duration-500">
            {/* Robot List */}
            <div className="col-span-4 space-y-4">
                <h3 className="text-slate-400 font-semibold mb-2">Robotic Assets</h3>
                {robots.map((robot) => (
                    <div
                        key={robot.id}
                        onClick={() => setSelectedRobotId(robot.id)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedRobot.id === robot.id
                                ? 'bg-blue-900/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                                : 'bg-slate-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-white">{robot.name}</span>
                            <Badge status={robot.status} />
                        </div>
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Health: <span className={robot.health < 50 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>{robot.health}%</span></span>
                            <span>Load: {robot.load}%</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail & Simulation Panel */}
            <div className="col-span-8">
                <Card className="h-full relative overflow-hidden bg-slate-900/90">
                    {selectedRobot.id === 'R-101' && (
                        <div className="absolute top-0 right-0 p-6 z-10">
                            {!isSimulating && selectedRobot.health > 50 ? (
                                <button
                                    onClick={onSimulate}
                                    className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 text-sm transition-all hover:scale-105 active:scale-95"
                                >
                                    <Zap size={16} /> Simulate Gearbox Failure
                                </button>
                            ) : (
                                <button
                                    onClick={onReset}
                                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded shadow-lg flex items-center gap-2 text-sm transition-all hover:scale-105 active:scale-95"
                                >
                                    <RefreshCw size={16} /> Reset System
                                </button>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600 shadow-inner">
                            <Cog className={`text-slate-400 ${selectedRobot.status === 'Critical' ? 'animate-spin-slow text-rose-500' : ''}`} size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{selectedRobot.name}</h2>
                            <p className="text-slate-400">ID: {selectedRobot.id} • Zone: {selectedRobot.zone}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-slate-950/50 p-4 rounded border border-slate-800 backdrop-blur-sm">
                            <p className="text-slate-500 text-xs uppercase mb-1">Component Health Score</p>
                            <div className="flex items-end gap-2">
                                <span className={`text-4xl font-bold ${selectedRobot.health < 50 ? 'text-rose-500' : 'text-white'
                                    }`}>{selectedRobot.health}%</span>
                                <span className="text-slate-400 text-sm mb-1">/ 100</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 mt-3 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${selectedRobot.health < 50 ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'
                                        }`}
                                    style={{ width: `${selectedRobot.health}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-slate-950/50 p-4 rounded border border-slate-800 backdrop-blur-sm">
                            <p className="text-slate-500 text-xs uppercase mb-1">Predicted Remaining Life</p>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-white">
                                    {selectedRobot.status === 'Critical' ? '48' : '2,104'}
                                </span>
                                <span className="text-slate-400 text-sm mb-1">Hours</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                                {selectedRobot.status === 'Critical' ? (
                                    <span className="text-rose-400 flex items-center gap-1"><AlertTriangle size={12} /> Replacement Required</span>
                                ) : (
                                    <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={12} /> On Schedule</span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="h-64 w-full">
                        <h4 className="text-sm font-semibold text-slate-300 mb-4">Real-Time Sensor Data (Vibration Analysis)</h4>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="time" stroke="#64748b" />
                                <YAxis stroke="#64748b" />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                                <Line type="monotone" dataKey="vibration" stroke="#3b82f6" strokeWidth={3} dot={true} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
};
