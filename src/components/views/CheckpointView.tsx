import React from 'react';
import { Card } from '../common/Card';
import { CHECKPOINT_CARS } from '../../data/mockData';
import { Zap, Truck, AlertTriangle, ShieldCheck } from 'lucide-react';

export const CheckpointView: React.FC = () => {
    const f1Cars = CHECKPOINT_CARS.filter(car => car.status === 'F1');
    const f2Cars = CHECKPOINT_CARS.filter(car => car.status === 'F2');

    const CarCard = ({ car }: { car: any }) => (
        <Card className="hover:border-blue-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-white font-bold text-lg">{car.id}</h4>
                    <p className="text-slate-400 text-sm">{car.model}</p>
                </div>
                {car.health === 'Healthy' || car.health === 'Perfect' ? (
                    <ShieldCheck className="text-emerald-400" size={20} />
                ) : (
                    <AlertTriangle className="text-amber-400" size={20} />
                )}
            </div>

            <div className="space-y-3">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500 uppercase font-bold tracking-wider">Health Status</span>
                    <span className={car.health.includes('Warning') ? 'text-amber-400' : 'text-emerald-400'}>{car.health}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500 uppercase font-bold tracking-wider">Timestamp</span>
                    <span className="text-slate-300">{car.timestamp}</span>
                </div>
                <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
                    <span className="text-slate-500 uppercase font-bold tracking-wider">Issues</span>
                    <span className="text-slate-300 italic">{car.issues}</span>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                {car.powerOn && (
                    <span className="flex items-center gap-1 text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold">
                        <Zap size={10} /> POWER ON
                    </span>
                )}
                {car.deliveryReady && (
                    <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                        <Truck size={10} /> READY FOR DELIVERY
                    </span>
                )}
            </div>
        </Card>
    );

    return (
        <div className="grid grid-cols-12 gap-8 animate-in fade-in duration-500">
            {/* F1 Section */}
            <div className="col-span-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="p-2 rounded bg-blue-600/20 text-blue-400">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">F1 Checkpoint</h3>
                        <p className="text-sm text-slate-500">Power-on & Initial Diagnostics</p>
                    </div>
                    <span className="ml-auto bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md font-mono">
                        {f1Cars.length} UNITS
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {f1Cars.map(car => <CarCard key={car.id} car={car} />)}
                </div>
            </div>

            {/* F2 Section */}
            <div className="col-span-6 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="p-2 rounded bg-emerald-600/20 text-emerald-400">
                        <Truck size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">F2 Checkpoint</h3>
                        <p className="text-sm text-slate-500">Final Quality & Dispatch Ready</p>
                    </div>
                    <span className="ml-auto bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md font-mono">
                        {f2Cars.length} UNITS
                    </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                    {f2Cars.map(car => <CarCard key={car.id} car={car} />)}
                </div>
            </div>
        </div>
    );
};
