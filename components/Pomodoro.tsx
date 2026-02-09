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
        const totalSeconds = Math.floor(ms / 1000);
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = (timeLeft / (mode === 'work' ? WORK_TIME : BREAK_TIME)) * 100;

    return (
        <div className="flex flex-col h-full items-center p-6">
             <header className="w-full flex justify-between items-center mb-12 shrink-0">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-white">Pomodoro</h2>
                    <p className="opacity-40 text-sm mt-1">Productivity focus tool</p>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center w-full">
                <div className="flex space-x-2 mb-10">
                    <button 
                        onClick={() => switchMode('work')}
                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${mode === 'work' ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/40'}`}
                    >
                        <div className="flex items-center space-x-2">
                            <Briefcase className="w-3 h-3" />
                            <span>FOCUS</span>
                        </div>
                    </button>
                    <button 
                        onClick={() => switchMode('break')}
                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${mode === 'break' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/40'}`}
                    >
                        <div className="flex items-center space-x-2">
                            <Coffee className="w-3 h-3" />
                            <span>BREAK</span>
                        </div>
                    </button>
                </div>

                <div className="relative w-80 h-80 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-[10px] border-white/5" />
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="150"
                            stroke={mode === 'work' ? '#3b82f6' : '#10b981'}
                            strokeWidth="10"
                            fill="transparent"
                            strokeDasharray="942"
                            strokeDashoffset={942 - (942 * progress / 100)}
                            strokeLinecap="round"
                            className="transition-all duration-300"
                        />
                    </svg>
                    
                    <div className="text-7xl font-mono font-bold tracking-tighter tabular-nums z-10">
                        {format(timeLeft)}
                    </div>
                </div>

                <div className="flex items-center space-x-6 mt-12">
                    <button 
                        onClick={reset}
                        className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all"
                    >
                        <RefreshCcw className="w-5 h-5" />
                    </button>

                    <button 
                        onClick={toggle}
                        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all transform active:scale-95 ${isRunning ? 'bg-white/10 text-white' : 'bg-white text-slate-900'}`}
                    >
                        {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </button>

                    <div className="w-12 h-12 flex items-center justify-center">
                        <div className="flex space-x-1">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full ${i < cycleCount ? 'bg-blue-400' : 'bg-white/10'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};