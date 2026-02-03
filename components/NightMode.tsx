import React, { useState } from 'react';
import { Maximize2, Minimize2, Moon } from 'lucide-react';

interface NightModeProps {
    onExit: () => void;
    time: Date;
}

export const NightMode: React.FC<NightModeProps> = ({ onExit, time }) => {
    const [dimmed, setDimmed] = useState(false);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((e) => console.log(e));
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer overflow-hidden transition-opacity duration-1000"
            onClick={() => setDimmed(!dimmed)}
        >
            {/* Background Ambient Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] transition-opacity duration-1000 ${dimmed ? 'opacity-0' : 'opacity-100'}`}></div>

            <div className={`text-center transition-all duration-1000 ${dimmed ? 'opacity-30 scale-90' : 'opacity-100 scale-100'}`}>
                <div className="text-[25vw] leading-none font-bold text-white/90 font-mono tracking-tighter select-none tabular-nums animate-pulse" style={{ animationDuration: '4s' }}>
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
                {!dimmed && (
                    <div className="text-white/40 text-2xl mt-4 font-light uppercase tracking-[0.5em]">
                        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                )}
            </div>

            <div className={`absolute bottom-8 right-8 flex space-x-4 transition-opacity duration-500 ${dimmed ? 'opacity-0' : 'opacity-100'}`}>
                <button 
                    onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                    className="p-4 bg-white/10 rounded-full hover:bg-white/20 text-white"
                >
                    <Maximize2 className="w-6 h-6" />
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); onExit(); }}
                    className="p-4 bg-red-500/20 rounded-full hover:bg-red-500/40 text-red-200"
                >
                    <Minimize2 className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};