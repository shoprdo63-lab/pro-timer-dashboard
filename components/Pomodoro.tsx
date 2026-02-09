import React, { useState, useRef } from 'react';
import { Play, Pause, Coffee, Briefcase, RefreshCcw, Monitor } from 'lucide-react';
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
        const totalSeconds = Math.floor(ms / 1000);
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = (timeLeft / (mode === 'work' ? WORK_TIME : BREAK_TIME)) * 100;

    return (
        <div className="flex flex-col items-center">
             <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16 shrink-0">
                <div className="space-y-2">
                    <h2 className="text-5xl font-light tracking-tight text-white">Focus Engine</h2>
                    <p className="opacity-40 text-sm tracking-[0.4em] uppercase font-bold">Productivity Acceleration System</p>
                </div>
            </header>

            <div className="flex flex-col items-center justify-center w-full max-w-2xl">
                <div className="flex space-x-4 mb-16 glass-panel p-2 rounded-3xl border border-white/5">
                    <button 
                        onClick={() => switchMode('work')}
                        className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all flex items-center space-x-3 ${mode === 'work' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>DEEP FOCUS</span>
                    </button>
                    <button 
                        onClick={() => switchMode('break')}
                        className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-[0.2em] transition-all flex items-center space-x-3 ${mode === 'break' ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-600/20' : 'text-white/40 hover:text-white/60'}`}
                    >
                        <Coffee className="w-3.5 h-3.5" />
                        <span>NEURAL BREAK</span>
                    </button>
                </div>

                <div className="relative w-80 h-80 sm:w-[400px] sm:h-[400px] flex items-center justify-center group">
                    {/* Glow effect */}
                    <div 
                        className="absolute inset-0 rounded-full blur-[60px] opacity-20 transition-all duration-1000"
                        style={{ backgroundColor: mode === 'work' ? '#3b82f6' : '#10b981', transform: isRunning ? 'scale(1.1)' : 'scale(1)' }}
                    ></div>

                    <div className="absolute inset-0 rounded-full border-[1px] border-white/5" />
                    
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="48%"
                            stroke={mode === 'work' ? '#3b82f6' : '#10b981'}
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray="1200"
                            strokeDashoffset={1200 - (1200 * progress / 100)}
                            strokeLinecap="round"
                            className="transition-all duration-500 ease-out"
                        />
                    </svg>
                    
                    <div className="flex flex-col items-center z-10">
                        <div className="text-8xl sm:text-9xl font-mono font-bold tracking-tighter tabular-nums drop-shadow-2xl">
                            {format(timeLeft)}
                        </div>
                        <div className="mt-4 flex space-x-2">
                             {[...Array(4)].map((_, i) => (
                                <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i < cycleCount ? 'bg-blue-400 scale-125' : 'bg-white/10'}`} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-12 mt-20">
                    <button 
                        onClick={reset}
                        className="p-5 rounded-full bg-white/5 border border-white/10 text-white/30 hover:text-white hover:bg-white/10 transition-all hover:rotate-180 duration-500"
                    >
                        <RefreshCcw className="w-6 h-6" />
                    </button>

                    <button 
                        onClick={toggle}
                        className={`w-24 h-24 rounded-[32px] flex items-center justify-center shadow-2xl transition-all transform active:scale-90 border-2 border-white/10 ${isRunning ? 'bg-white/10 text-white' : 'bg-white text-slate-950'}`}
                    >
                        {isRunning ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-2 fill-current" />}
                    </button>

                    <div className="p-5 text-white/10">
                        <Monitor className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </div>
    );
};