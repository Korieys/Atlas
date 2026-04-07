import React, { useState } from 'react';
import {
    LayoutDashboard,
    RefreshCw,
    Truck,
    Factory,
    Calendar,
    CheckCircle2,
    Wrench,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useAtlas } from '../../config/ConfigContext';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, React.FC<any>> = {
    LayoutDashboard,
    RefreshCw,
    Truck,
    Factory,
    Calendar,
    CheckCircle2,
    Wrench,
};

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const { config, presetId, setPreset, presetList } = useAtlas();
    const [collapsed, setCollapsed] = useState(false);

    const enabledModules = config.modules.filter(m => m.enabled);

    return (
        <motion.div
            animate={{ width: collapsed ? 72 : 256 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed left-0 top-0 bottom-0 glass-surface-elevated flex flex-col z-50 border-r border-slate-800/50"
        >
            {/* Logo Area */}
            <div className="p-4 flex items-center gap-3 border-b border-slate-800/50 min-h-[64px]">
                <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{
                        background: `linear-gradient(135deg, hsl(var(--atlas-primary)), hsl(var(--atlas-accent)))`,
                        boxShadow: `0 0 20px hsl(var(--atlas-primary) / 0.4)`,
                    }}
                >
                    {config.company.logoText}
                </div>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <h1 className="text-white font-bold leading-none tracking-wide text-sm whitespace-nowrap">
                            {config.company.name}
                        </h1>
                        <span
                            className="text-[9px] tracking-[0.2em] font-semibold whitespace-nowrap"
                            style={{ color: `hsl(var(--atlas-primary))` }}
                        >
                            {config.company.subtitle}
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
                {enabledModules.map((item) => {
                    const Icon = ICON_MAP[item.icon] || LayoutDashboard;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`sidebar-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                                isActive
                                    ? 'sidebar-item-active text-white'
                                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                            }`}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon
                                size={18}
                                className={`shrink-0 transition-colors ${
                                    isActive ? '' : 'group-hover:text-slate-200'
                                }`}
                                style={isActive ? { color: `hsl(var(--atlas-primary))` } : undefined}
                            />
                            {!collapsed && (
                                <span className="whitespace-nowrap">{item.label}</span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Preset Switcher */}
            {!collapsed && (
                <div className="p-3 border-t border-slate-800/50">
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2 px-1">Configuration</p>
                    <div className="space-y-1">
                        {presetList.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => setPreset(preset.id)}
                                className={`preset-chip w-full text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                                    presetId === preset.id
                                        ? 'preset-chip-active text-white border-slate-600'
                                        : 'text-slate-400 border-slate-800 hover:text-slate-200'
                                }`}
                            >
                                <div className="font-semibold">{preset.label}</div>
                                <div className="text-[10px] text-slate-500">{preset.industry}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* System Status */}
            <div className="p-3 border-t border-slate-800/50">
                <div className="bg-slate-950/50 rounded-lg p-3 border border-slate-800/50">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="status-dot status-dot-active" />
                        {!collapsed && (
                            <span className="text-[10px] font-bold text-white tracking-wider">SYSTEM ONLINE</span>
                        )}
                    </div>
                    {!collapsed && (
                        <>
                            <p className="text-[9px] text-slate-500 font-mono">v3.0.0 • Latency: 12ms</p>
                            <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center justify-center">
                                <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                                    Powered by <span className="text-slate-300">Atlas</span>
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all z-50 shadow-lg"
            >
                {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>
        </motion.div>
    );
};
