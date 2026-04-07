import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glow?: boolean;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = false, onClick }) => (
    <div
        onClick={onClick}
        className={`atlas-card p-5 ${glow ? 'glow-primary' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
        {children}
    </div>
);
