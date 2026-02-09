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
        className="w-full h-screen text-white overflow-hidden flex flex-col md:flex-row transition-all duration-500"
        style={{ background: activeTheme.colors.bgGradient }}
    >
      {/* Sidebar Navigation */}
      <nav 
        className="md:w-20 w-full md:h-full h-16 md:flex-col flex-row flex items-center justify-between md:justify-center md:space-y-8 p-4 shrink-0 z-20"
        style={{ background: activeTheme.colors.glassPanel }}
      >
         <div className="hidden md:block mb-auto font-bold text-xl tracking-tighter cursor-pointer" onClick={() => setMode(AppMode.CLOCK)}>
            YC
         </div>
         
         <div className="flex md:flex-col flex-row w-full justify-around md:justify-center md:space-y-4">
            {navItems.map((item) => {
                const isActive = currentMode === item.mode;
                return (
                    <button 
                        key={item.mode}
                        onClick={() => setMode(item.mode)}
                        className={`p-3 rounded-2xl transition-all duration-300 ${isActive ? 'shadow-lg scale-110' : 'hover:bg-white/5'}`}
                        style={{ 
                            backgroundColor: isActive ? activeTheme.colors.accent : 'transparent',
                            color: isActive ? '#fff' : activeTheme.colors.textDim
                        }}
                        title={item.label}
                    >
                        <item.icon className="w-6 h-6" />
                    </button>
                )
            })}
         </div>

         <div className="hidden md:flex flex-col mt-auto space-y-4 items-center">
            <div className="flex flex-col space-y-2">
                {MASTER_DATA.THEMES.slice(0, 4).map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => setCurrentThemeId(theme.id)}
                        className={`w-4 h-4 rounded-full border border-white/20 transition-transform ${currentThemeId === theme.id ? 'scale-125 ring-2 ring-white/50' : 'hover:scale-110'}`}
                        style={{ background: theme.previewColor }}
                    />
                ))}
            </div>

            <button onClick={toggleNightMode} className="p-2 opacity-50 hover:opacity-100 transition-opacity">
                <Moon className="w-5 h-5" />
            </button>
         </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
          {/* Top Bar (Mobile Only / Status) */}
          <div className="h-16 flex justify-between items-center px-6 shrink-0 md:pt-4">
             <div className="flex flex-col">
                <div className="text-xs font-bold uppercase tracking-widest opacity-40">Precision Sync</div>
                <div className="text-sm font-medium opacity-80">
                    {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
             </div>
             
             <div className="md:hidden flex items-center space-x-4">
                <button onClick={toggleNightMode} className="p-2 opacity-50">
                    <Moon className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Page Content with scrollable Footer */}
          <div className="flex-1 overflow-hidden relative">
             <div 
                className="w-full h-full p-4 md:p-8 overflow-y-auto custom-scrollbar flex flex-col"
             >
                <div className="flex-1 min-h-0">
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
      </main>
    </div>
  );
};