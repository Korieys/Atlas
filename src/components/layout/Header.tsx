import React from 'react';
import { Search, AlertTriangle } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4 text-slate-400 text-sm">
                <span>Plant: <span className="text-white font-medium">Spartanburg</span></span>
                <span className="text-slate-700">|</span>
                <span>Shift: <span className="text-white font-medium">B (14:00 - 22:00)</span></span>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search assets, parts, or alerts..."
                        className="bg-slate-900 border border-slate-700 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-64 transition-all focus:w-80 focus:shadow-[0_0_15px_rgba(59,130,246,0.2)] text-slate-200 placeholder-slate-600"
                    />
                </div>
                <button className="p-2 text-slate-400 hover:text-white relative hover:bg-slate-800 rounded-full transition-colors">
                    <AlertTriangle size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-lg cursor-pointer hover:ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900 transition-all">
                    AD
                </div>
            </div>
        </header>
    );
};
