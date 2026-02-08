import React, { useState, useRef } from 'react';
import { Play, Pause, Coffee, Briefcase, RefreshCcw } from 'lucide-react';
import { useWorkerTimer } from '../hooks/useWorkerTimer';
import { playAlarmSound } from '../utils/audioUtils';
import { PRECISION_WORKER_CODE } from '../constants';

export const Pomodoro: React.FC = () => {
    const WORK_TIME = 25 * 60 * 1000;
    const BREAK_TIME = 5 * 60 * 1000;

    const [mode, setMode] = useState<'work' | 'break'>('work');
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);

    const endTimeRef = useRef<number | null>(null);

    useWorkerTimer(isRunning, () => {
        if (endTimeRef.current) {
            const now = Date.now();
            const diff = endTimeRef.current - now;
            
            if (diff <= 0) {
                setTimeLeft(0);
                setIsRunning(false);
                endTimeRef.current = null;
                playAlarmSound('cosmic');
                if (mode === 'work') setCycleCount(c => (c + 1) % 5);
            } else {
                setTimeLeft(diff);
            }
        }
    }, PRECISION_WORKER_CODE);

    const toggle = () => {
        if (isRunning) {
            setIsRunning(false);
            endTimeRef.current = null;
        } else {
            const duration = timeLeft > 0 ? timeLeft : (mode === 'work' ? WORK_TIME : BREAK_TIME);
            endTimeRef.current = Date.now() + duration;
            setIsRunning(true);
        }
    };
    
    const reset = () => {
        setIsRunning(false);
        endTimeRef.current = null;
        setTimeLeft(mode === 'work' ? WORK_TIME : BREAK_TIME);
    };

    const switchMode = (newMode: 'work' | 'break') => {
        setIsRunning(false);
        endTimeRef.current = null;
        setMode(newMode);
        setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
    };

    const format = (ms: number) => {
        const safeMs = Math.max(0, ms);
        const totalSeconds = Math.floor(safeMs / 1000);
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        const msPart = safeMs % 1000;

        return (
            <div className="flex flex-col items-center">
                <div className="text-[12vw] md:text-[8vw] font-extralight tracking-tighter tabular-nums leading-none">
                    {m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
                </div>
                <div className="text-xl font-mono text-white/20 mt-4 tracking-widest uppercase">
                    .{msPart.toString().padStart(3, '0')}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full items-center p-10 w-full max-w-4xl mx-auto">
             <header className="w-full flex justify-between items-center mb-12 shrink-0">
                <div>
                    <h2 className="text-4xl font-extralight tracking-tight text-white mb-1">Flow State</h2>
                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                        <span>Cognitive Synchronization</span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => switchMode('work')}
                        className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${mode === 'work' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-white/40 hover:text-white'}`}
                    >
                        Focus
                    </button>
                    <button 
                        onClick={() => switchMode('break')}
                        className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${mode === 'break' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-white/40 hover:text-white'}`}
                    >
                        Recovery
                    </button>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center w-full relative">
                {/* Flow Visualization */}
                <div className={`absolute w-[400px] h-[400px] rounded-full transition-all duration-1000 blur-[80px] ${isRunning ? 'opacity-30 scale-125' : 'opacity-10 scale-100'} ${mode === 'work' ? 'bg-blue-600' : 'bg-emerald-600'}`} />
                
                <div className="relative z-10 animate-in zoom-in-95 duration-700">
                    {format(timeLeft)}
                </div>

                <div className="flex items-center space-x-8 mt-16 z-10">
                    <button 
                        onClick={reset}
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-all active:scale-90"
                    >
                        <RefreshCcw className="w-5 h-5" />
                    </button>

                    <button 
                        onClick={toggle}
                        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${isRunning ? 'bg-white/10 text-white border border-white/20' : 'bg-white text-slate-900'}`}
                    >
                        {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </button>

                    <div className="w-12 h-12 flex items-center justify-center">
                        <div className="flex space-x-1.5">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i < cycleCount ? 'bg-blue-400 scale-125' : 'bg-white/10'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className={`text-[10px] uppercase tracking-[0.6em] font-black transition-all duration-1000 ${isRunning ? 'text-white/40 opacity-100' : 'text-white/10 opacity-50'}`}>
                        {mode === 'work' ? 'Executing Objective' : 'Neural Rejuvenation'}
                    </p>
                </div>
            </div>
        </div>
    );
};