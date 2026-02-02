import React, { useState, useRef } from 'react';
import { Play, Pause, Flag, RotateCcw } from 'lucide-react';
import { formatDuration } from '../utils/timeUtils';
import { useWorkerTimer } from '../hooks/useWorkerTimer';
import { Lap, Theme } from '../types';
import { PRECISION_WORKER_CODE } from '../constants';

interface StopwatchProps {
    theme?: Theme;
}

export const Stopwatch: React.FC<StopwatchProps> = ({ theme }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<Lap[]>([]);
    
    // Use performance.now() for high precision
    const startTimeRef = useRef<number>(0);
    const storedTimeRef = useRef<number>(0); 

    useWorkerTimer(isRunning, () => {
        const now = performance.now();
        // Calculate total time: accumulated previously + time since last start
        setTime(storedTimeRef.current + (now - startTimeRef.current));
    }, PRECISION_WORKER_CODE);

    const toggle = () => {
        if (isRunning) {
            setIsRunning(false);
            // When pausing, store the exact duration accumulated so far
            storedTimeRef.current = time;
        } else {
            setIsRunning(true);
            // When starting, mark the current performance timestamp
            startTimeRef.current = performance.now();
        }
    };

    const reset = () => {
        setIsRunning(false);
        setTime(0);
        storedTimeRef.current = 0;
        setLaps([]);
    };

    const lap = () => {
        const lastLapTime = laps.length > 0 ? laps[0].time : 0;
        const newLap: Lap = {
            id: laps.length + 1,
            time: time,
            split: time - lastLapTime
        };
        setLaps([newLap, ...laps]);
    };

    const accentColor = theme?.colors.accent || '#3b82f6';

    return (
        <div className="flex flex-col h-full p-6 items-center w-full max-w-4xl mx-auto">
             <header className="w-full flex justify-between items-center mb-4 shrink-0">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-white">Stopwatch</h2>
                    <p className="opacity-40 text-sm mt-1">Precision tracking</p>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center w-full min-h-[350px] relative">
                {/* Visual Pulse Ring */}
                {isRunning && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/5 animate-ping opacity-20" style={{ borderColor: accentColor }}></div>
                )}
                {isRunning && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 animate-pulse opacity-10" style={{ borderColor: accentColor, animationDuration: '2s' }}></div>
                )}

                <div className="font-mono text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl z-10">
                    {formatDuration(time)}
                </div>
                
                <div className="flex space-x-6 mt-16 z-10">
                     <button 
                        onClick={toggle}
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-lg ${isRunning ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'}`}
                    >
                        {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                    </button>
                    
                    <button 
                        onClick={isRunning ? lap : reset}
                        className="w-20 h-20 rounded-full hover:bg-white/20 text-white flex items-center justify-center transition-all transform active:scale-95 border border-white/10"
                        style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                    >
                        {isRunning ? <Flag className="w-8 h-8" /> : <RotateCcw className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Laps Table */}
            <div className="w-full rounded-2xl overflow-hidden flex-1 max-h-[40%] flex flex-col border border-white/5" style={{ background: theme?.colors.glassCard }}>
                <div className="flex justify-between p-4 border-b border-white/10 text-xs font-bold opacity-40 uppercase tracking-wider bg-white/5">
                    <span>Lap #</span>
                    <span>Split</span>
                    <span>Total</span>
                </div>
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    {laps.map((l, i) => (
                        <div key={l.id} className="flex justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors text-mono group">
                            <span className="opacity-60">Lap {l.id}</span>
                            <span className={i === 0 ? "font-bold" : ""} style={{ color: i === 0 ? accentColor : 'inherit' }}>
                                +{formatDuration(l.split)}
                            </span>
                            <span className="font-medium">{formatDuration(l.time)}</span>
                        </div>
                    ))}
                    {laps.length === 0 && (
                        <div className="p-8 text-center opacity-20 text-sm">
                            No laps recorded
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};