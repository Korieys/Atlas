import React from 'react';
import {
    TrendingUp,
    Clock,
    GitMerge,
    Activity,
    GitPullRequest,
    Factory,
    ArrowRight
} from 'lucide-react';
import { Card } from '../common/Card';
import { motion } from 'framer-motion';
import { useAtlas } from '../../config/ConfigContext';

interface ProductionViewProps {
    isSimulating: boolean;
}

export const ProductionView: React.FC<ProductionViewProps> = ({ isSimulating }) => {
    const { config } = useAtlas();
    const stages = config.productionStages;
    const simStageId = config.simulation.targetStageId;

    return (
        <div className="space-y-5">
            {/* Metrics Header */}
            <div className="grid grid-cols-4 gap-5">
                {[
                    { icon: TrendingUp, label: 'Current Throughput', value: '42', unit: 'units/hr', color: 'primary' },
                    { icon: Clock, label: 'Takt Time', value: '58s', extra: '(-2s)', color: 'success' },
                    { icon: GitMerge, label: 'Active Resilience Plans', value: '1', unit: 'active', color: 'accent' },
                    { icon: Activity, label: 'Bottleneck Risk', value: stages.find(s => s.status === 'Warning')?.name || stages[0].name, color: 'warning', issue: stages.find(s => s.status === 'Warning')?.issue },
                ].map((metric, idx) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                    >
                        <Card className="flex items-center gap-4 group relative overflow-hidden">
                            <div className="p-2.5 rounded-lg" style={{
                                background: metric.color === 'primary' ? `hsl(var(--atlas-primary) / 0.1)` :
                                    metric.color === 'success' ? `hsl(var(--atlas-success) / 0.1)` :
                                    metric.color === 'accent' ? `hsl(var(--atlas-accent) / 0.1)` :
                                    `hsl(var(--atlas-warning) / 0.1)`,
                            }}>
                                <metric.icon size={20} style={{
                                    color: metric.color === 'primary' ? `hsl(var(--atlas-primary))` :
                                        metric.color === 'success' ? `hsl(var(--atlas-success))` :
                                        metric.color === 'accent' ? `hsl(var(--atlas-accent))` :
                                        `hsl(var(--atlas-warning))`,
                                }} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">{metric.label}</p>
                                <h3 className="text-xl font-bold text-white">
                                    {metric.value}
                                    {metric.unit && <span className="text-sm font-normal text-slate-500 ml-1">{metric.unit}</span>}
                                    {metric.extra && <span className="text-sm font-normal text-emerald-500 ml-1">{metric.extra}</span>}
                                </h3>
                            </div>
                            {metric.issue && (
                                <div className="absolute inset-x-0 bottom-0 bg-slate-900/95 p-2 border-t border-slate-700/50 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                                    <p className="text-[9px] text-slate-300"><span className="font-bold text-slate-500">Reason:</span> {metric.issue}</p>
                                </div>
                            )}
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Topology Map */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="relative min-h-[380px] flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                            <GitPullRequest size={18} style={{ color: `hsl(var(--atlas-primary))` }} />
                            Live {config.terminology.productionLine} Topology
                        </h3>
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-500" />
                                <span className="text-slate-400">Idle</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-slate-400">Running</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px]" style={{
                                    background: `hsl(var(--atlas-primary))`,
                                    boxShadow: `0 0 8px hsl(var(--atlas-primary) / 0.5)`,
                                }} />
                                <span className="text-slate-400">AI Reroute</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Line */}
                    <div className="flex-1 flex items-center justify-between px-10 relative">
                        <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-slate-800 -z-10" />

                        {stages.map((stage, idx) => {
                            const isWarning = stage.status === 'Warning';
                            const isRerouting = isSimulating && stage.id === simStageId;
                            return (
                                <div key={stage.id} className="relative group">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.4 + idx * 0.1, type: 'spring', stiffness: 200 }}
                                        className={`w-14 h-14 rounded-full border-[3px] flex items-center justify-center bg-slate-900 z-20 transition-all duration-500 ${
                                            isWarning ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' :
                                            isRerouting ? 'shadow-[0_0_20px]' :
                                            'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                                        }`}
                                        style={isRerouting ? {
                                            borderColor: `hsl(var(--atlas-primary))`,
                                            boxShadow: `0 0 20px hsl(var(--atlas-primary) / 0.5)`,
                                        } : undefined}
                                    >
                                        <Factory size={20} className={isWarning ? 'text-amber-500' : 'text-slate-300'} />
                                    </motion.div>

                                    {idx < stages.length - 1 && (
                                        <div className="absolute top-1/2 -right-[calc(50%-1.5rem)] -translate-y-1/2 text-slate-600">
                                            <ArrowRight size={16} />
                                        </div>
                                    )}

                                    <div className="absolute top-18 left-1/2 -translate-x-1/2 w-36 bg-slate-800/80 p-3 rounded-lg border border-slate-700/50 text-center shadow-xl backdrop-blur-sm">
                                        <h4 className="font-semibold text-white text-xs">{stage.name}</h4>
                                        <div className="flex justify-between text-[10px] mt-2 text-slate-400">
                                            <span>Output</span>
                                            <span className="text-white font-semibold">{stage.output}%</span>
                                        </div>
                                        {isRerouting && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="mt-2 text-[9px] px-1 py-0.5 rounded border animate-pulse"
                                                style={{
                                                    background: `hsl(var(--atlas-primary) / 0.15)`,
                                                    borderColor: `hsl(var(--atlas-primary) / 0.3)`,
                                                    color: `hsl(var(--atlas-primary))`,
                                                }}
                                            >
                                                Rerouting...
                                            </motion.div>
                                        )}
                                    </div>

                                    {isRerouting && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute -top-20 left-1/2 -translate-x-1/2 w-28 flex flex-col items-center"
                                        >
                                            <div className="text-[10px] font-bold tracking-wide" style={{ color: `hsl(var(--atlas-primary))` }}>Resilience Path</div>
                                            <div className="w-0.5 h-10 mt-1 mb-1 rounded-full" style={{ background: `hsl(var(--atlas-primary) / 0.5)` }} />
                                            <div className="w-2.5 h-2.5 rounded-full" style={{
                                                background: `hsl(var(--atlas-primary))`,
                                                boxShadow: `0 0 10px hsl(var(--atlas-primary))`,
                                            }} />
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};
