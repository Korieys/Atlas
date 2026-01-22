import React from 'react';

export type StatusType = 'Optimal' | 'Warning' | 'Critical' | 'Action' | 'Optimized' | 'Expedited' | 'Standard' | string;

interface BadgeProps {
    status: StatusType;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
    const colors: Record<string, string> = {
        Optimal: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        Warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        Critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]',
        Action: 'bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse',
        Optimized: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        Expedited: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        Standard: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    };
    const colorClass = colors[status] || colors.Optimal;

    return (
        <span className={`px-2 py-1 rounded text-xs font-medium border ${colorClass}`}>
            {status}
        </span>
    );
};
