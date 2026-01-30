import React, { useState } from 'react';
import { Card } from '../common/Card';
import { REWORK_CARS, REWORK_STATS } from '../../data/mockData';
import { REWORK_KNOWLEDGE } from '../../data/reworkKnowledge';
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

export const ReworkView: React.FC = () => {
    const [activeSubTab, setActiveSubTab] = useState<'inline' | 'offline'>('inline');
    const [searchQuery, setSearchQuery] = useState('');
    const [chatResults, setChatResults] = useState<any[]>([]);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setChatResults([]);
            return;
        }
        const results = REWORK_KNOWLEDGE.filter(k =>
            k.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
            k.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setChatResults(results);
    };

    const ReworkCarCard = ({ car }: { car: any }) => (
        <div className="bg-slate-900 border border-slate-700/50 rounded-lg p-5 hover:border-blue-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-white font-bold">{car.id} - {car.model}</h4>
                    <p className="text-rose-400 text-sm font-medium flex items-center gap-1 mt-1">
                        <Info size={14} /> {car.problem}
                    </p>
                </div>
                <span className="bg-slate-800 text-slate-400 text-xs px-2 py-1 rounded border border-slate-700">
                    {car.timestamp}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin size={14} className="text-blue-400" />
                    <span>Location: <span className="text-white">{car.location}</span></span>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Required Repair Steps</p>
                {car.steps.map((step: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                        {step}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Stats Overview */}
            <div className="grid grid-cols-12 gap-6">
                <Card className="col-span-4 flex items-center gap-4 bg-gradient-to-br from-slate-900 to-blue-900/10">
                    <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                        <Activity size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Total Produced (Shift)</p>
                        <h3 className="text-3xl font-bold text-white">{REWORK_STATS.totalProduced}</h3>
                    </div>
                </Card>
                <Card className="col-span-4 flex items-center gap-4 bg-gradient-to-br from-slate-900 to-rose-900/10">
                    <div className="p-3 rounded-full bg-rose-500/10 text-rose-400">
                        <RefreshCcw size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Rework Quantity</p>
                        <h3 className="text-3xl font-bold text-white">{REWORK_STATS.totalRework}</h3>
                    </div>
                </Card>
                <Card className="col-span-4 flex items-center gap-4">
                    <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Rework Rate</p>
                        <h3 className="text-3xl font-bold text-white">
                            {((REWORK_STATS.totalRework / REWORK_STATS.totalProduced) * 100).toFixed(1)}%
                        </h3>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Active Rework Lists */}
                <div className="col-span-7 space-y-6">
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 w-fit">
                        <button
                            onClick={() => setActiveSubTab('inline')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeSubTab === 'inline' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Inline Rework ({REWORK_CARS.inline.length})
                        </button>
                        <button
                            onClick={() => setActiveSubTab('offline')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeSubTab === 'offline' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            Offline Rework ({REWORK_CARS.offline.length})
                        </button>
                    </div>

                    <div className="space-y-4">
                        {activeSubTab === 'inline' && REWORK_CARS.inline.map(car => <ReworkCarCard key={car.id} car={car} />)}
                        {activeSubTab === 'offline' && REWORK_CARS.offline.map(car => <ReworkCarCard key={car.id} car={car} />)}
                    </div>
                </div>

                {/* Knowledge Base Chat */}
                <div className="col-span-5">
                    <Card className="h-full border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]">
                        <div className="flex items-center gap-2 mb-6 text-blue-400">
                            <MessageSquare size={20} />
                            <h3 className="font-bold tracking-tight">Rework Intelligence Chat</h3>
                        </div>

                        <div className="relative mb-6">
                            <input
                                type="text"
                                placeholder="Search rework cases or solutions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-slate-200"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <button
                                onClick={handleSearch}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded text-white hover:bg-blue-500"
                            >
                                <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {chatResults.length > 0 ? (
                                chatResults.map((result, idx) => (
                                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3 animate-in fade-in slide-in-from-right-2">
                                        <h4 className="text-blue-400 font-bold border-b border-slate-800 pb-2">{result.issue}</h4>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Root Cause</p>
                                            <p className="text-xs text-slate-300">{result.rootCause}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Solution</p>
                                            <p className="text-xs text-emerald-400">{result.solution}</p>
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Historical Context (Leipzig)</p>
                                            {result.historicalExamples.map((ex: any, i: number) => (
                                                <p key={i} className="text-[10px] text-slate-400 italic">
                                                    • {ex.date}: {ex.resolution}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                                        <MessageSquare size={24} />
                                    </div>
                                    <p className="text-slate-500 text-sm">Ask me about previous rework codes,<br />root causes, or historical fixes.</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
