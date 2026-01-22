import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
    <div className={`bg-slate-900/80 border border-slate-700/50 rounded-lg p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-blue-900/20 hover:border-slate-600 ${className}`}>
        {children}
    </div>
);
