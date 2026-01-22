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
import { PRODUCTION_STAGES } from '../../data/mockData';
import { Card } from '../common/Card';

interface ProductionViewProps {
    isSimulating: boolean;
}

export const ProductionView: React.FC<ProductionViewProps> = ({ isSimulating }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Metrics Header */}
            <div className="grid grid-cols-4 gap-6">
                <Card className="flex items-center gap-4 hover:bg-slate-800/80 transition-colors">
                    <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Current Throughput</p>
                        <h3 className="text-2xl font-bold text-white">42 <span className="text-sm font-normal text-slate-500">units/hr</span></h3>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 hover:bg-slate-800/80 transition-colors">
                    <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Takt Time</p>
                        <h3 className="text-2xl font-bold text-white">58s <span className="text-sm font-normal text-emerald-500">(-2s)</span></h3>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 hover:bg-slate-800/80 transition-colors">
                    <div className="p-3 rounded-full bg-purple-500/10 text-purple-400">
                        <GitMerge size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Active Resilience Plans</p>
                        <h3 className="text-2xl font-bold text-white">1 <span className="text-sm font-normal text-slate-500">active</span></h3>
                    </div>
                </Card>
                <Card className="flex items-center gap-4 hover:bg-slate-800/80 transition-colors">
                    <div className="p-3 rounded-full bg-amber-500/10 text-amber-400">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Bottleneck Risk</p>
                        <h3 className="text-2xl font-bold text-white">Body Shop</h3>
                    </div>
                </Card>
            </div>

            {/* Topology Map */}
            <Card className="relative min-h-[400px] flex flex-col">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <GitPullRequest className="text-blue-400" />
                        Live Line Topology
                    </h3>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-500"></span>
                            <span className="text-slate-400">Station Idle</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                            <span className="text-slate-400">Running</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                            <span className="text-slate-400">AI Reroute</span>
                        </div>
                    </div>
                </div>

                {/* Visual Line Representation */}
                <div className="flex-1 flex items-center justify-between px-10 relative">
                    {/* Connecting Line Background */}
                    <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-800 -z-10"></div>

                    {/* Dynamic Render of Stations */}
                    {PRODUCTION_STAGES.map((stage, idx) => (
                        <div key={stage.id} className="relative group">
                            {/* Node Circle */}
                            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center bg-slate-900 z-20 transition-all duration-500 ${stage.status === 'Warning' ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' :
                                    isSimulating && stage.id === 'ST-2' ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' :
                                        'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                }`}>
                                <Factory size={24} className={stage.status === 'Warning' ? 'text-amber-500' : 'text-slate-300'} />
                            </div>

                            {/* Connecting Arrow */}
                            {idx < PRODUCTION_STAGES.length - 1 && (
                                <div className="absolute top-1/2 -right-[calc(50%-2rem)] -translate-y-1/2 text-slate-600">
                                    <ArrowRight size={20} />
                                </div>
                            )}

                            {/* Station Info Popover (Always visible for prototype) */}
                            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 bg-slate-800 p-3 rounded border border-slate-700 text-center shadow-xl">
                                <h4 className="font-bold text-white text-sm">{stage.name}</h4>
                                <div className="flex justify-between text-xs mt-2 text-slate-400">
                                    <span>Output</span>
                                    <span className="text-white">{stage.output}%</span>
                                </div>
                                {/* Simulation visual override for Body Shop */}
                                {isSimulating && stage.id === 'ST-2' && (
                                    <div className="mt-2 text-[10px] bg-blue-500/20 text-blue-300 px-1 py-0.5 rounded border border-blue-500/30 animate-pulse">
                                        Rerouting to R-102
                                    </div>
                                )}
                            </div>

                            {/* Alternative Path Visualization (If simulating) */}
                            {isSimulating && stage.id === 'ST-2' && (
                                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-32 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                                    <div className="text-xs text-blue-400 mb-1 font-bold tracking-wide">Resilience Path</div>
                                    <div className="w-1 h-12 bg-blue-500/50 mb-1"></div>
                                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
