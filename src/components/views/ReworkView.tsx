import React, { useState } from 'react';
import { Card } from '../common/Card';
import {
    Activity,
    RefreshCcw,
    MessageSquare,
    Search,
    MapPin,
    CheckCircle,
    Info,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAtlas } from '../../config/ConfigContext';
import { AnimatedCounter } from '../common/AnimatedCounter';

export const ReworkView: React.FC = () => {
    const { config } = useAtlas();
    const [activeSubTab, setActiveSubTab] = useState<'inline' | 'offline'>('inline');
    const [searchQuery, setSearchQuery] = useState('');
    const [chatResults, setChatResults] = useState<any[]>([]);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setChatResults([]);
            return;
        }
        const results = config.knowledgeBase.filter(k =>
            k.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
            k.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setChatResults(results);
    };

    const ReworkUnitCard = ({ car, idx }: { car: any; idx: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="atlas-card p-5"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-white font-semibold">{car.id} — {car.model}</h4>
                    <p className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1">
                        <Info size={12} /> {car.problem}
                    </p>
                </div>
                <span className="bg-slate-800/60 text-slate-400 text-[10px] px-2 py-1 rounded-md border border-slate-700/50 font-mono">
                    {car.timestamp}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin size={12} style={{ color: `hsl(var(--atlas-primary))` }} />
                    <span>Location: <span className="text-white font-medium">{car.location}</span></span>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Required Repair Steps</p>
                {car.steps.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: `hsl(var(--atlas-primary))` }} />
                        {step}
                    </div>
                ))}
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-12 gap-5">
                {[
                    { label: 'Total Produced (Shift)', value: config.reworkStats.totalProduced, icon: Activity, gradient: 'from-slate-900 to-blue-900/10' },
                    { label: 'Rework Quantity', value: config.reworkStats.totalRework, icon: RefreshCcw, gradient: 'from-slate-900 to-rose-900/10' },
                    { label: 'Rework Rate', value: parseFloat(((config.reworkStats.totalRework / config.reworkStats.totalProduced) * 100).toFixed(1)), icon: CheckCircle, gradient: '', suffix: '%', decimals: 1 },
                ].map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        className="col-span-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                    >
                        <Card className={`flex items-center gap-4 ${stat.gradient ? `bg-gradient-to-br ${stat.gradient}` : ''}`}>
                            <div className={`p-2.5 rounded-lg ${
                                idx === 0 ? 'bg-blue-500/10' : idx === 1 ? 'bg-rose-500/10' : 'bg-emerald-500/10'
                            }`}>
                                <stat.icon size={20} className={
                                    idx === 0 ? 'text-blue-400' : idx === 1 ? 'text-rose-400' : 'text-emerald-400'
                                } />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-white">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                                </h3>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Active Rework Lists */}
                <div className="col-span-7 space-y-4">
                    <div className="flex bg-slate-900/60 p-1 rounded-lg border border-slate-800/50 w-fit backdrop-blur-sm">
                        <button
                            onClick={() => setActiveSubTab('inline')}
                            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                                activeSubTab === 'inline'
                                    ? 'text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                            style={activeSubTab === 'inline' ? {
                                background: `hsl(var(--atlas-primary))`,
                                boxShadow: `0 0 15px hsl(var(--atlas-primary) / 0.3)`,
                            } : undefined}
                        >
                            Inline Rework ({config.reworkInline.length})
                        </button>
                        <button
                            onClick={() => setActiveSubTab('offline')}
                            className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${
                                activeSubTab === 'offline'
                                    ? 'text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                            style={activeSubTab === 'offline' ? {
                                background: `hsl(var(--atlas-primary))`,
                                boxShadow: `0 0 15px hsl(var(--atlas-primary) / 0.3)`,
                            } : undefined}
                        >
                            Offline Rework ({config.reworkOffline.length})
                        </button>
                    </div>

                    <div className="space-y-3">
                        {activeSubTab === 'inline' && config.reworkInline.map((car, idx) => <ReworkUnitCard key={car.id} car={car} idx={idx} />)}
                        {activeSubTab === 'offline' && config.reworkOffline.map((car, idx) => <ReworkUnitCard key={car.id} car={car} idx={idx} />)}
                    </div>
                </div>

                {/* Knowledge Base Chat */}
                <div className="col-span-5">
                    <Card className="h-full" glow>
                        <div className="flex items-center gap-2 mb-5" style={{ color: `hsl(var(--atlas-primary))` }}>
                            <MessageSquare size={18} />
                            <h3 className="font-bold tracking-tight text-sm">Rework Intelligence</h3>
                        </div>

                        <div className="relative mb-5">
                            <input
                                type="text"
                                placeholder="Search rework cases or solutions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full bg-slate-950/50 border border-slate-800/50 rounded-lg pl-9 pr-12 py-2.5 text-xs focus:outline-none transition-all text-slate-200 placeholder-slate-600"
                                style={{ borderColor: searchQuery ? `hsl(var(--atlas-primary) / 0.3)` : undefined }}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-white"
                                style={{ background: `hsl(var(--atlas-primary))` }}
                            >
                                <ArrowRight size={12} />
                            </button>
                        </div>

                        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                            {chatResults.length > 0 ? (
                                chatResults.map((result, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-slate-950/50 border border-slate-800/50 rounded-xl p-4 space-y-3"
                                    >
                                        <h4 className="font-semibold border-b border-slate-800/50 pb-2 text-sm" style={{ color: `hsl(var(--atlas-primary))` }}>{result.issue}</h4>
                                        <div>
                                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Root Cause</p>
                                            <p className="text-xs text-slate-300">{result.rootCause}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Solution</p>
                                            <p className="text-xs text-emerald-400">{result.solution}</p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Historical Context</p>
                                            {result.historicalExamples.map((ex: any, i: number) => (
                                                <p key={i} className="text-[10px] text-slate-400 italic">
                                                    • {ex.date} ({ex.plant}): {ex.resolution}
                                                </p>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-500">
                                        <MessageSquare size={22} />
                                    </div>
                                    <p className="text-slate-500 text-xs">Ask about previous rework codes,<br />root causes, or historical fixes.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
