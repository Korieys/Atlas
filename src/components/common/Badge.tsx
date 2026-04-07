import React from 'react';

export type StatusType = 'Optimal' | 'Warning' | 'Critical' | 'Action' | 'Optimized' | 'Expedited' | 'Standard' | 'Healthy' | string;

interface BadgeProps {
    status: StatusType;
    pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ status, pulse = false }) => {
    const colors: Record<string, string> = {
        Optimal: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        Healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        Warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        Critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20 glow-danger',
        Action: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        Optimized: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        Expedited: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        Standard: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        Underutilized: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    };
    const colorClass = colors[status] || colors.Optimal;

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border tracking-wide uppercase ${colorClass} ${pulse ? 'animate-pulse' : ''}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
                status === 'Optimal' || status === 'Healthy' ? 'bg-emerald-400' :
                status === 'Warning' ? 'bg-amber-400' :
                status === 'Critical' ? 'bg-rose-400' :
                status === 'Optimized' ? 'bg-purple-400' :
                status === 'Expedited' ? 'bg-rose-400' :
                status === 'Action' ? 'bg-blue-400' :
                'bg-slate-400'
            }`} />
            {status}
        </span>
    );
};
