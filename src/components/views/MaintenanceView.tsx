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
import { AnimatedCounter } from '../common/AnimatedCounter';
import { motion } from 'framer-motion';
import { useAtlas } from '../../config/ConfigContext';

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
    const { config } = useAtlas();
    const assets = robots.length > 0 ? robots : config.assets;
    const [selectedAssetId, setSelectedAssetId] = useState(assets[0]?.id);
    const selectedAsset = assets.find((r: any) => r.id === selectedAssetId) || assets[0];
    const simTarget = config.simulation.targetAssetId;

    return (
        <div className="grid grid-cols-12 gap-5">
            {/* Asset List */}
            <div className="col-span-4 space-y-3">
                <h3 className="text-slate-400 font-semibold text-sm mb-1">{config.terminology.assetType} Assets</h3>
                {assets.map((asset: any, idx: number) => (
                    <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.06 }}
                    >
                        <div
                            onClick={() => setSelectedAssetId(asset.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                selectedAsset.id === asset.id
                                    ? 'border-slate-600 shadow-lg'
                                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                            }`}
                            style={selectedAsset.id === asset.id ? {
                                background: `hsl(var(--atlas-primary) / 0.08)`,
                                borderColor: `hsl(var(--atlas-primary) / 0.3)`,
                                boxShadow: `0 0 20px hsl(var(--atlas-primary) / 0.1)`,
                            } : undefined}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold text-white text-sm">{asset.name}</span>
                                <Badge status={asset.status} />
                            </div>
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Health: <span className={asset.health < 50 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-semibold'}>{asset.health}%</span></span>
                                <span>Load: {asset.load}%</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detail Panel */}
            <div className="col-span-8">
                <motion.div
                    key={selectedAsset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="h-full relative overflow-hidden">
                        {selectedAsset.id === simTarget && (
                            <div className="absolute top-5 right-5 z-10">
                                {!isSimulating && selectedAsset.health > 50 ? (
                                    <button
                                        onClick={onSimulate}
                                        className="text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                                        style={{
                                            background: `hsl(var(--atlas-danger))`,
                                            boxShadow: `0 0 20px hsl(var(--atlas-danger) / 0.3)`,
                                        }}
                                    >
                                        <Zap size={14} /> {config.simulation.triggerLabel}
                                    </button>
                                ) : (
                                    <button
                                        onClick={onReset}
                                        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
                                    >
                                        <RefreshCw size={14} /> {config.simulation.resetLabel}
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50">
                                <Cog
                                    className={`text-slate-400 ${selectedAsset.status === 'Critical' ? 'animate-spin-slow text-rose-500' : ''}`}
                                    size={28}
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gradient-primary">{selectedAsset.name}</h2>
                                <p className="text-slate-400 text-sm">ID: {selectedAsset.id} • Zone: {selectedAsset.zone}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5 mb-8">
                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Component Health Score</p>
                                <div className="flex items-end gap-2">
                                    <span className={`text-3xl font-bold ${selectedAsset.health < 50 ? 'text-rose-500' : 'text-white'}`}>
                                        <AnimatedCounter value={selectedAsset.health} suffix="%" />
                                    </span>
                                    <span className="text-slate-500 text-sm mb-1">/ 100</span>
                                </div>
                                <div className="w-full bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: `${selectedAsset.health}%` }}
                                        transition={{ duration: 0.8 }}
                                        className={`h-full rounded-full ${selectedAsset.health < 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                        style={{ boxShadow: selectedAsset.health < 50 ? '0 0 10px #f43f5e' : '0 0 10px #10b981' }}
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Predicted Remaining Life</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-white">
                                        {selectedAsset.status === 'Critical' ? '48' : '2,104'}
                                    </span>
                                    <span className="text-slate-500 text-sm mb-1">Hours</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                                    {selectedAsset.status === 'Critical' ? (
                                        <span className="text-rose-400 flex items-center gap-1"><AlertTriangle size={12} /> Replacement Required</span>
                                    ) : (
                                        <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={12} /> On Schedule</span>
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="h-56 w-full">
                            <h4 className="text-xs font-semibold text-slate-300 mb-3">Real-Time Sensor Data (Vibration Analysis)</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 10 }} />
                                    <YAxis stroke="#475569" tick={{ fontSize: 10 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px' }} />
                                    <Line type="monotone" dataKey="vibration" stroke="var(--atlas-primary-hex, #3b82f6)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="temp" stroke="var(--atlas-warning-hex, #f59e0b)" strokeWidth={1.5} strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
