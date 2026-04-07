import React from 'react';
import { Card } from '../common/Card';
import { Zap, Truck, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAtlas } from '../../config/ConfigContext';

export const CheckpointView: React.FC = () => {
    const { config } = useAtlas();
    const cp1 = config.terminology.checkpoint1;
    const cp2 = config.terminology.checkpoint2;
    const cp1Cars = config.checkpointUnits.filter(car => car.status === cp1);
    const cp2Cars = config.checkpointUnits.filter(car => car.status === cp2);

    const UnitCard = ({ car, idx }: { car: any; idx: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
        >
            <Card className="group">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h4 className="text-white font-semibold text-base">{car.id}</h4>
                        <p className="text-slate-400 text-xs mt-0.5">{car.model}</p>
                    </div>
                    {car.health === 'Healthy' || car.health === 'Perfect' ? (
                        <ShieldCheck className="text-emerald-400" size={18} />
                    ) : (
                        <AlertTriangle className="text-amber-400" size={18} />
                    )}
                </div>

                <div className="space-y-2.5">
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-500 uppercase font-bold tracking-wider text-[10px]">Health Status</span>
                        <span className={car.health.includes('Warning') ? 'text-amber-400' : 'text-emerald-400'}>{car.health}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-slate-500 uppercase font-bold tracking-wider text-[10px]">Timestamp</span>
                        <span className="text-slate-300 font-mono text-[11px]">{car.timestamp}</span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-slate-800/50 pt-2">
                        <span className="text-slate-500 uppercase font-bold tracking-wider text-[10px]">Issues</span>
                        <span className="text-slate-300 italic text-[11px]">{car.issues}</span>
                    </div>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                    {car.powerOn && (
                        <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-md font-bold border" style={{
                            background: `hsl(var(--atlas-primary) / 0.08)`,
                            borderColor: `hsl(var(--atlas-primary) / 0.2)`,
                            color: `hsl(var(--atlas-primary))`,
                        }}>
                            <Zap size={9} /> ACTIVE
                        </span>
                    )}
                    {car.deliveryReady && (
                        <span className="flex items-center gap-1 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold">
                            <Truck size={9} /> READY
                        </span>
                    )}
                </div>
            </Card>
        </motion.div>
    );

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Checkpoint 1 */}
            <div className="col-span-6 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-800/50 pb-4">
                    <div className="p-2 rounded-lg" style={{
                        background: `hsl(var(--atlas-primary) / 0.15)`,
                    }}>
                        <Zap size={20} style={{ color: `hsl(var(--atlas-primary))` }} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{cp1} Checkpoint</h3>
                        <p className="text-xs text-slate-500">{config.terminology.checkpoint1Label}</p>
                    </div>
                    <span className="ml-auto bg-slate-800/60 text-slate-300 text-[10px] px-2 py-1 rounded-md font-mono border border-slate-700/50">
                        {cp1Cars.length} UNITS
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {cp1Cars.map((car, idx) => <UnitCard key={car.id} car={car} idx={idx} />)}
                </div>
            </div>

            {/* Checkpoint 2 */}
            <div className="col-span-6 space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-800/50 pb-4">
                    <div className="p-2 rounded-lg bg-emerald-600/15">
                        <Truck size={20} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{cp2} Checkpoint</h3>
                        <p className="text-xs text-slate-500">{config.terminology.checkpoint2Label}</p>
                    </div>
                    <span className="ml-auto bg-slate-800/60 text-slate-300 text-[10px] px-2 py-1 rounded-md font-mono border border-slate-700/50">
                        {cp2Cars.length} UNITS
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {cp2Cars.map((car, idx) => <UnitCard key={car.id} car={car} idx={idx} />)}
                </div>
            </div>
        </div>
    );
};
