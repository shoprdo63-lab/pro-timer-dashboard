import React, { useState, useEffect } from 'react';
import { Clock, AlarmClock, Timer, TimerReset, Monitor, Moon, Palette, Sparkles } from 'lucide-react';
import { AppMode, Theme } from '../types';
import { MASTER_DATA } from '../constants';
import { Footer } from './Footer';
import { GoogleGenAI } from "@google/genai";

interface LayoutProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleNightMode: () => void;
  children: React.ReactNode;
  time: Date;
}

const SyncAIInsight: React.FC<{ mode: AppMode; time: Date }> = ({ mode, time }) => {
  const [insight, setInsight] = useState<string>("Synchronizing with global time nodes...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });
        const prompt = `Act as a world-class productivity expert. Provide a 1-sentence elite time-management or synchronization insight for a user currently using ${mode} mode at ${time.toLocaleTimeString()}. Keep it professional, authoritative, and slightly futuristic. Do not use quotes.`;
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });
        setInsight(response.text || "Precision is the foundation of excellence.");
      } catch (e) {
        setInsight("Your time is your most valuable asset.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsight();
    const interval = setInterval(fetchInsight, 300000); // Update every 5 mins
    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-right-4">
      <Sparkles className={`w-3 h-3 text-blue-400 ${loading ? 'animate-pulse' : ''}`} />
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/60 truncate max-w-[200px] md:max-w-md">
        {insight}
      </span>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ currentMode, setMode, toggleNightMode, children, time }) => {
  const [currentThemeId, setCurrentThemeId] = useState(MASTER_DATA.THEMES[0].id);
  const activeTheme = MASTER_DATA.THEMES.find(t => t.id === currentThemeId) || MASTER_DATA.THEMES[0];

  const navItems = [
    { mode: AppMode.CLOCK, icon: Clock, label: 'Clock' },
    { mode: AppMode.ALARM, icon: AlarmClock, label: 'Alarm' },
    { mode: AppMode.TIMER, icon: Timer, label: 'Timer' },
    { mode: AppMode.STOPWATCH, icon: TimerReset, label: 'Stopwatch' },
    { mode: AppMode.POMODORO, icon: Monitor, label: 'Focus' },
  ];

  return (
    <div 
        className="w-full h-screen text-white overflow-hidden flex flex-col md:flex-row transition-all duration-1000 mesh-bg"
        style={{ background: activeTheme.colors.bgGradient }}
    >
      {/* Sidebar - Premium Style */}
      <nav 
        className="md:w-24 w-full md:h-full h-20 md:flex-col flex-row flex items-center justify-between md:justify-center md:space-y-12 p-4 shrink-0 z-20 glass-premium border-r border-white/5"
      >
         <div className="hidden md:flex flex-col items-center mb-auto mt-4 font-bold text-2xl tracking-tighter group cursor-pointer" onClick={() => setMode(AppMode.CLOCK)}>
            <div className="w-10 h-10 rounded-full border-2 border-blue-500/50 flex items-center justify-center group-hover:border-blue-400 transition-colors">
                <span className="text-sm font-light">YC</span>
            </div>
         </div>
         
         <div className="flex md:flex-col flex-row w-full justify-around md:justify-center md:space-y-6">
            {navItems.map((item) => {
                const isActive = currentMode === item.mode;
                return (
                    <button 
                        key={item.mode}
                        onClick={() => setMode(item.mode)}
                        className={`group relative p-3.5 rounded-2xl transition-all duration-500 ${isActive ? 'shadow-[0_0_30px_rgba(59,130,246,0.4)] scale-110' : 'hover:bg-white/5 hover:scale-105'}`}
                        style={{ 
                            backgroundColor: isActive ? activeTheme.colors.accent : 'transparent',
                            color: isActive ? '#fff' : 'rgba(255,255,255,0.4)'
                        }}
                    >
                        <item.icon className={`w-5 h-5 ${isActive ? 'drop-shadow-sm' : ''}`} />
                        <span className="absolute left-16 bg-slate-900 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all hidden md:block pointer-events-none whitespace-nowrap z-50 translate-x-[-10px] group-hover:translate-x-0">
                            {item.label}
                        </span>
                    </button>
                )
            })}
         </div>

         <div className="hidden md:flex flex-col mt-auto space-y-6 items-center pb-4">
            <div className="flex flex-col space-y-3 px-1 py-4 border-t border-white/10">
                {MASTER_DATA.THEMES.slice(0, 5).map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => setCurrentThemeId(theme.id)}
                        className={`w-3 h-3 rounded-full border border-white/20 transition-all duration-300 ${currentThemeId === theme.id ? 'scale-150 ring-4 ring-white/10' : 'hover:scale-125 opacity-40 hover:opacity-100'}`}
                        style={{ background: theme.previewColor }}
                        title={theme.name}
                    />
                ))}
            </div>

            <button onClick={toggleNightMode} className="p-3 text-white/20 hover:text-white transition-colors">
                <Moon className="w-5 h-5" />
            </button>
         </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
          {/* Header Bar - World Class Finish */}
          <div className="h-20 flex justify-between items-center px-6 md:px-12 shrink-0 z-30">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-1">Current Sync</span>
                <div className="text-sm font-light text-white/60">
                    {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
             </div>
             
             <div className="flex items-center space-x-6">
                <SyncAIInsight mode={currentMode} time={time} />
                <div className="md:hidden flex items-center space-x-4">
                    <button onClick={toggleNightMode} className="p-2 opacity-60">
                        <Moon className="w-5 h-5" />
                    </button>
                </div>
             </div>
          </div>

          {/* Dynamic Content + Footer */}
          <div className="flex-1 overflow-hidden relative p-4 md:p-10 md:pt-0">
             <div 
                className="w-full h-full rounded-[40px] overflow-hidden shadow-2xl relative transition-all duration-1000 glass-premium flex flex-col group"
             >
                {/* Scrollable Inner container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="min-h-full flex flex-col">
                        <div className="flex-1">
                            {React.Children.map(children, child => {
                                if (React.isValidElement(child)) {
                                    return React.cloneElement(child as React.ReactElement<any>, { theme: activeTheme, time });
                                }
                                return child;
                            })}
                        </div>
                        <Footer onNavigate={setMode} />
                    </div>
                </div>
             </div>
          </div>
      </main>
    </div>
  );
};