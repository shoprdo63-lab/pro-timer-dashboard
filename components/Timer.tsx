import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { formatDuration } from '../utils/timeUtils';
import { useWorkerTimer } from '../hooks/useWorkerTimer';
import { playAlarmSound } from '../utils/audioUtils';
import { PRECISION_WORKER_CODE } from '../constants';

export const Timer: React.FC = () => {
    const [duration, setDuration] = useState(5 * 60 * 1000); // 5 min default
    const [remaining, setRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [inputHours, setInputHours] = useState(0);
    const [inputMins, setInputMins] = useState(5);
    const [inputSecs, setInputSecs] = useState(0);
    
    // Refs for drift-free calculation
    const endTimeRef = useRef<number | null>(null);

    const circumference = 2 * Math.PI * 120; // Radius 120
    const progress = Math.max(0, (remaining / duration) * circumference);

    // Use precision worker for smooth animation without drift
    useWorkerTimer(isRunning, () => {
        if (endTimeRef.current !== null) {
            const now = Date.now();
            const left = endTimeRef.current - now;
            
            if (left <= 0) {
                setRemaining(0);
                setIsRunning(false);
                setEndTimeRef(null);
                playAlarmSound('chime');
            } else {
                setRemaining(left);
            }
        }
    }, PRECISION_WORKER_CODE);

    const setEndTimeRef = (val: number | null) => {
        endTimeRef.current = val;
    };

    const toggleTimer = () => {
        if (isRunning) {
            // Pause: clear end time but keep current remaining
            setIsRunning(false);
            setEndTimeRef(null);
        } else {
            // Start: Calculate target end time based on current remaining
            if (remaining <= 0) {
                resetTimer();
                // We need to re-calc based on reset
                const newDuration = (inputHours * 3600 + inputMins * 60 + inputSecs) * 1000 || 5000;
                setEndTimeRef(Date.now() + newDuration);
                setIsRunning(true);
            } else {
                setEndTimeRef(Date.now() + remaining);
                setIsRunning(true);
            }
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        setEndTimeRef(null);
        const newDuration = (inputHours * 3600 + inputMins * 60 + inputSecs) * 1000;
        const validDuration = newDuration > 0 ? newDuration : 5000;
        setDuration(validDuration);
        setRemaining(validDuration);
    };

    // Update preset if inputs change while stopped and full duration
    useEffect(() => {
        if (!isRunning && !endTimeRef.current && (remaining === duration || remaining === 0)) {
             const newDuration = (inputHours * 3600 + inputMins * 60 + inputSecs) * 1000;
             if (newDuration > 0) {
                 setDuration(newDuration);
                 setRemaining(newDuration);
             }
        }
    }, [inputHours, inputMins, inputSecs]);

    return (
        <div className="flex flex-col h-full p-6 items-center">
            <header className="w-full flex justify-between items-center mb-8 shrink-0">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-white">Timer</h2>
                    <p className="opacity-40 text-sm mt-1">Countdown management</p>
                </div>
            </header>

            <div className="relative w-72 h-72 flex items-center justify-center mb-8">
                {/* Background Ring */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="120"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    {/* Progress Ring */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r="120"
                        stroke={remaining < 10000 && remaining > 0 ? "#ef4444" : "#3b82f6"} // Red if < 10s
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        className="transition-all duration-75"
                    />
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                     <span className="text-5xl font-mono font-bold tracking-tighter tabular-nums">
                        {formatDuration(remaining).split('.')[0]}
                     </span>
                     <span className="text-sm text-white/40 mt-2 font-mono">
                        .{Math.floor((remaining % 1000) / 10).toString().padStart(2, '0')}
                     </span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex space-x-6 mb-10">
                <button 
                    onClick={toggleTimer}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRunning ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30' : 'bg-green-500/20 text-green-500 hover:bg-green-500/30'}`}
                >
                    {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>
                <button 
                    onClick={resetTimer}
                    className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                >
                    <RotateCcw className="w-6 h-6" />
                </button>
            </div>

            {/* Inputs - Only editable when paused/stopped */}
            <div className={`grid grid-cols-3 gap-4 glass-card p-6 rounded-2xl transition-opacity duration-300 ${isRunning ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-white/40 mb-2">HOURS</span>
                    <input 
                        type="number" min="0" max="23" 
                        value={inputHours} onChange={(e) => setInputHours(parseInt(e.target.value) || 0)}
                        className="w-16 bg-black/20 rounded-lg p-2 text-center text-xl font-mono focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-white/40 mb-2">MINS</span>
                    <input 
                        type="number" min="0" max="59" 
                         value={inputMins} onChange={(e) => setInputMins(parseInt(e.target.value) || 0)}
                        className="w-16 bg-black/20 rounded-lg p-2 text-center text-xl font-mono focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs text-white/40 mb-2">SECS</span>
                    <input 
                        type="number" min="0" max="59" 
                         value={inputSecs} onChange={(e) => setInputSecs(parseInt(e.target.value) || 0)}
                        className="w-16 bg-black/20 rounded-lg p-2 text-center text-xl font-mono focus:ring-1 focus:ring-blue-500 outline-none" 
                    />
                </div>
            </div>
        </div>
    );
};