import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';
import { useAtlas } from '../../config/ConfigContext';

interface HeaderProps {
    onNotification?: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotification }) => {
    const { config } = useAtlas();
    const [time, setTime] = useState(new Date());
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <header className="h-14 border-b border-slate-800/50 flex items-center justify-between px-6 glass-surface-elevated sticky top-0 z-40">
            {/* Left: Plant & Shift Info */}
            <div className="flex items-center gap-4 text-slate-400 text-xs">
                <div className="flex items-center gap-2">
                    <div className="status-dot status-dot-active" />
                    <span>
                        {config.terminology.plant}: <span className="text-white font-semibold">{config.terminology.plantName}</span>
                    </span>
                </div>
                <span className="text-slate-700">|</span>
                <span>
                    Shift: <span className="text-white font-semibold">{config.terminology.shift}</span>
                </span>
                <span className="text-slate-700">|</span>
                <span className="font-mono text-slate-500">
                    {time.toLocaleTimeString('en-US', { hour12: false })}
                </span>
            </div>

            {/* Right: Search, Notifications, Avatar */}
            <div className="flex items-center gap-3">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-slate-300 transition-colors" size={14} />
                    <input
                        type="text"
                        placeholder="Search assets, parts, or alerts..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className={`w-72 bg-slate-900/50 border rounded-lg pl-9 pr-10 py-1.5 text-xs focus:outline-none transition-all text-slate-200 placeholder-slate-600 ${
                            searchFocused
                                ? 'border-slate-600 shadow-lg shadow-black/20'
                                : 'border-slate-800'
                        }`}
                    />
                    <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-mono hidden group-focus-within:hidden sm:inline-block">
                        ⌘K
                    </kbd>
                </div>

                <button
                    onClick={() => onNotification?.('No new critical alerts. System operating within normal parameters.')}
                    className="p-2 text-slate-400 hover:text-white relative hover:bg-slate-800/50 rounded-lg transition-all"
                >
                    <Bell size={16} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `hsl(var(--atlas-warning))` }} />
                </button>

                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white cursor-pointer hover:ring-2 ring-offset-2 ring-offset-slate-900 transition-all"
                    style={{
                        background: `linear-gradient(135deg, hsl(var(--atlas-primary)), hsl(var(--atlas-accent)))`,
                    }}
                >
                    AD
                </div>
            </div>
        </header>
    );
};
