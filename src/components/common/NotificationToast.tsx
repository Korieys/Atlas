import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, X, Zap } from 'lucide-react';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationToastProps {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}

const ICONS = {
  success: CheckCircle,
  error: AlertTriangle,
  warning: Zap,
  info: Info,
};

const COLORS = {
  success: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: 'text-emerald-400',
    text: 'text-emerald-200',
  },
  error: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    icon: 'text-rose-400',
    text: 'text-rose-200',
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: 'text-amber-400',
    text: 'text-amber-200',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
    text: 'text-blue-200',
  },
};

export const NotificationToast: React.FC<NotificationToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastItem: React.FC<{ toast: Toast; onDismiss: (id: number) => void }> = ({ toast, onDismiss }) => {
  const [progress, setProgress] = useState(100);
  const duration = toast.duration || 4000;
  const colors = COLORS[toast.type];
  const Icon = ICONS[toast.type];

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onDismiss(toast.id);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [toast.id, duration, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden rounded-xl border ${colors.bg} ${colors.border} backdrop-blur-xl shadow-2xl`}
    >
      <div className="flex items-start gap-3 p-4 pr-10">
        <Icon size={18} className={`${colors.icon} shrink-0 mt-0.5`} />
        <p className={`text-sm font-medium ${colors.text} leading-relaxed`}>{toast.message}</p>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
      {/* Progress bar */}
      <div className="h-0.5 bg-slate-800/50">
        <div
          className={`h-full transition-all duration-100 ease-linear ${
            toast.type === 'success' ? 'bg-emerald-500/60' :
            toast.type === 'error' ? 'bg-rose-500/60' :
            toast.type === 'warning' ? 'bg-amber-500/60' : 'bg-blue-500/60'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

// ─── Hook for toast management ─────────────────────────────────────────────
export const useToasts = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info', duration?: number) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, dismissToast };
};
