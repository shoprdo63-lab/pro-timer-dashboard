import React, { useState } from 'react';
import { Clock, AlarmClock, Timer, TimerReset, Monitor, Moon, Palette } from 'lucide-react';
import { AppMode, Theme } from '../types';
import { MASTER_DATA } from '../constants';
import { Footer } from './Footer';

interface LayoutProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleNightMode: () => void;
  children: React.ReactNode;
  time: Date;
}

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
        className="w-full h-screen text-white overflow-hidden flex flex-col md:flex-row transition-colors duration-700"
        style={{ background: activeTheme.colors.bgGradient, color: activeTheme.colors.textMain }}
    >
      {/* Sidebar / Bottom Nav */}
      <nav 
        className="md:w-24 w-full md:h-full h-20 md:flex-col flex-row flex items-center justify-between md:justify-center md:space-y-8 p-4 shrink-0 z-20 backdrop-blur-xl border-r border-white/10"
        style={{ background: activeTheme.colors.glassPanel }}
      >
         <div className="hidden md:block mb-auto mt-4 font-bold text-xl tracking-tighter" style={{ color: activeTheme.colors.accent }}>
            YC
         </div>
         
         <div className="flex md:flex-col flex-row w-full justify-around md:justify-center md:space-y-8">
            {navItems.map((item) => {
                const isActive = currentMode === item.mode;
                return (
                    <button 
                        key={item.mode}
                        onClick={() => setMode(item.mode)}
                        className={`group relative p-3 rounded-xl transition-all duration-300 ${isActive ? 'shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'hover:bg-white/10'}`}
                        style={{ 
                            backgroundColor: isActive ? activeTheme.colors.accent : 'transparent',
                            color: isActive ? '#fff' : activeTheme.colors.textDim
                        }}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="absolute left-14 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity hidden md:block pointer-events-none whitespace-nowrap z-50">
                            {item.label}
                        </span>
                    </button>
                )
            })}
         </div>

         <div className="hidden md:flex flex-col mt-auto space-y-4 items-center">
            {/* Theme Toggle */}
            <div className="flex flex-col space-y-2 mb-4 max-h-[200px] overflow-y-auto custom-scrollbar px-1 py-2">
                {MASTER_DATA.THEMES.map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => setCurrentThemeId(theme.id)}
                        className={`w-4 h-4 rounded-full border border-white/20 transition-transform ${currentThemeId === theme.id ? 'scale-125 ring-2 ring-white/50' : 'hover:scale-110'}`}
                        style={{ 
                            background: theme.previewColor
                        }}
                        title={theme.name}
                    />
                ))}
            </div>

            <button onClick={toggleNightMode} className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                <Moon className="w-6 h-6" />
            </button>
         </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
          {/* Header Bar */}
          <div className="h-16 flex justify-between items-center px-6 md:px-10 shrink-0">
             <div className="text-sm font-medium opacity-60">
                {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
             </div>
             <div className="md:hidden flex items-center space-x-4">
                <button onClick={() => {
                    const idx = MASTER_DATA.THEMES.findIndex(t => t.id === currentThemeId);
                    const next = MASTER_DATA.THEMES[(idx + 1) % MASTER_DATA.THEMES.length];
                    setCurrentThemeId(next.id);
                }} className="p-2 opacity-60">
                    <Palette className="w-5 h-5" />
                </button>
                <button onClick={toggleNightMode} className="p-2 opacity-60">
                    <Moon className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Dynamic Content + Footer (Scrollable Container) */}
          <div className="flex-1 overflow-hidden relative p-4 md:p-8">
             <div 
                className="w-full h-full rounded-3xl overflow-y-auto shadow-2xl relative transition-colors duration-700 custom-scrollbar flex flex-col"
                style={{ background: activeTheme.colors.glassPanel, borderColor: 'rgba(255,255,255,0.1)', borderWidth: '1px', borderStyle: 'solid' }}
             >
                {/* View Content */}
                <div className="flex-shrink-0 min-h-[calc(100%-80px)]">
                    {React.Children.map(children, child => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child as React.ReactElement<any>, { theme: activeTheme, time });
                        }
                        return child;
                    })}
                </div>

                {/* Footer */}
                <Footer onNavigate={setMode} />
             </div>
          </div>
      </main>
    </div>
  );
};