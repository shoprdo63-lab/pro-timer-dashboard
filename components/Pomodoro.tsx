import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';
import { useWorkerTimer } from '../hooks/useWorkerTimer';
import { playAlarmSound } from '../utils/audioUtils';
import { CLOCK_WORKER_CODE } from '../constants';

export const Pomodoro: React.FC = () => {
    const WORK_TIME = 25 * 60 * 1000;
    const BREAK_TIME = 5 * 60 * 1000;

    const [mode, setMode] = useState<'work' | 'break'>('work');
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isRunning, setIsRunning] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);

    // Use 1Hz worker for standard countdown
    useWorkerTimer(isRunning, () => {
        setTimeLeft(prev => {
            if (prev <= 1000) {
                setIsRunning(false);
                playAlarmSound('cosmic');
                if (mode === 'work') setCycleCount(c => (c + 1) % 5);
                return 0;
            }
            return prev - 1000;
        });
    }, CLOCK_WORKER_CODE);

    const toggle = () => setIsRunning(!isRunning);
    
    const switchMode = (newMode: 'work' | 'break') => {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(newMode === 'work' ? WORK_TIME : BREAK_TIME);
    };

    const format = (ms: number) => {
        const m = Math.floor(ms / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col h-full items-center p-6 w-full max-w-2xl mx-auto">
             <header className="w-full flex justify-between items-center mb-8 shrink-0">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-white">Focus</h2>
                    <p className="opacity-40 text-sm mt-1">Productivity cycles</p>
                </div>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center space-y-12 w-full">
                {/* Mode Switcher */}
                <div className="bg-white/5 p-1 rounded-full flex">
                    <button 
                        onClick={() => switchMode('work')}
                        className={`px-6 py-2 rounded-full flex items-center space-x-2 transition-all ${mode === 'work' ? 'bg-white/10 shadow-lg text-white' : 'text-white/40 hover:text-white'}`}
                    >
                        <Briefcase className="w-4 h-4" />
                        <span>Focus</span>
                    </button>
                    <button 
                        onClick={() => switchMode('break')}
                        className={`px-6 py-2 rounded-full flex items-center space-x-2 transition-all ${mode === 'break' ? 'bg-white/10 shadow-lg text-white' : 'text-white/40 hover:text-white'}`}
                    >
                        <Coffee className="w-4 h-4" />
                        <span>Break</span>
                    </button>
                </div>

                {/* Timer Display */}
                <div className="relative group cursor-pointer" onClick={toggle}>
                    <div className={`absolute inset-0 bg-gradient-to-tr ${mode === 'work' ? 'from-pink-500/20 to-violet-500/20' : 'from-green-500/20 to-teal-500/20'} rounded-full blur-3xl transition-all duration-1000 animate-pulse-slow`}></div>
                    <div className="relative text-[10rem] font-thin font-mono leading-none tracking-tighter text-white drop-shadow-2xl select-none">
                        {format(timeLeft)}
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <button 
                        onClick={toggle}
                        className="bg-white text-black hover:bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95"
                    >
                        {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </button>
                    <p className="text-white/30 text-sm tracking-widest uppercase">
                        {mode === 'work' ? 'Stay Focused' : 'Take a Breath'}
                    </p>
                    <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i < cycleCount ? 'bg-white' : 'bg-white/10'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};