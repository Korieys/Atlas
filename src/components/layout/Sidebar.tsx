import React from 'react';
import {
    LayoutDashboard,
    RefreshCw,
    Truck,
    Factory,
    Calendar,
    CheckCircle2,
    Wrench
} from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
        { id: 'checkpoints', icon: CheckCircle2, label: 'F1/F2 Checkpoints' },
        { id: 'maintenance', icon: RefreshCw, label: 'Predictive Maint.' },
        { id: 'supply', icon: Truck, label: 'Supply Chain' },
        { id: 'production', icon: Factory, label: 'Montage Flow' },
        { id: 'rework', icon: Wrench, label: 'Rework Station' },
        { id: 'schedule', icon: Calendar, label: 'Inspection Sched.' },
    ];

    return (
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50 shadow-2xl">
            <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                    A
                </div>
                <div>
                    <h1 className="text-white font-bold leading-none tracking-wide">BMW Atlas</h1>
                    <span className="text-[10px] text-blue-400 tracking-[0.2em] font-semibold">INTELLIGENCE</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${activeTab === item.id
                            ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] translate-x-1'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1'
                            }`}
                    >
                        <item.icon size={18} className={activeTab === item.id ? 'animate-pulse' : 'group-hover:text-blue-400 transition-colors'} />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800 bg-slate-950/30">
                <div className="bg-slate-950 rounded p-4 border border-slate-800 shadow-inner">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                        <span className="text-xs font-bold text-white tracking-wide">SYSTEM ONLINE</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">v2.4.0 • Latency: 12ms</p>
                </div>
            </div>
        </div>
    );
};
