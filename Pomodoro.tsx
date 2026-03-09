import * as React from 'react';
import { useState } from 'react';
import { Clock, AlarmClock, Timer, TimerReset, Monitor, Moon, Settings, Sun, BookOpen } from 'lucide-react';
import { AppMode, Theme } from '../types';
import { MASTER_DATA } from '../constants';
import { Footer } from './Footer';
import { BlogSection } from './BlogSection';

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
    { mode: AppMode.BLOG, icon: BookOpen, label: 'Blog' },
  ];

  return (
    <div 
        className="w-full h-screen text-white flex flex-col md:flex-row transition-all duration-700 overflow-hidden"
        style={{ background: activeTheme.colors.bgGradient }}
    >
      {/* Sidebar Navigation - Desktop Side / Mobile Bottom */}
      <nav 
        className="md:w-24 w-full md:h-full h-20 md:flex-col flex-row flex items-center justify-between md:justify-start md:pt-10 p-4 shrink-0 z-50 glass-panel border-t md:border-t-0 md:border-r border-white/5 order-last md:order-first"
      >
         <div className="hidden md:flex flex-col items-center mb-10 font-bold text-2xl tracking-tighter cursor-pointer hover:scale-110 transition-transform" onClick={() => setMode(AppMode.CLOCK)}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: activeTheme.colors.accent }}>
              <span className="text-sm text-white">YC</span>
            </div>
         </div>
         
         <div className="flex md:flex-col flex-row w-full justify-around md:justify-center items-center md:space-y-4">
            {navItems.map((item) => {
                const isActive = currentMode === item.mode;
                return (
                    <button 
                        key={item.mode}
                        onClick={() => setMode(item.mode)}
                        className={`group relative p-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/10 shadow-xl scale-110' : 'hover:bg-white/5 opacity-40 hover:opacity-100'}`}
                        style={{ color: isActive ? activeTheme.colors.accent : '#fff' }}
                        title={item.label}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="absolute left-24 bg-slate-900 px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all hidden md:block pointer-events-none border border-white/10 z-50 whitespace-nowrap">
                            {item.label}
                        </span>
                    </button>
                )
            })}
         </div>

         <div className="hidden md:flex flex-col mt-auto space-y-6 items-center pb-8">
            <div className="flex flex-col space-y-3">
                {MASTER_DATA.THEMES.slice(0, 5).map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => setCurrentThemeId(theme.id)}
                        className={`w-3 h-3 rounded-full border border-white/20 transition-all ${currentThemeId === theme.id ? 'scale-150 ring-4 ring-white/10' : 'hover:scale-125 opacity-40'}`}
                        style={{ background: theme.previewColor }}
                    />
                ))}
            </div>
            <button onClick={toggleNightMode} className="p-2 opacity-30 hover:opacity-100 transition-opacity">
                <Moon className="w-5 h-5" />
            </button>
         </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
          {/* Top Bar */}
          <header className="h-20 shrink-0 flex justify-between items-center px-6 md:px-12 z-40">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">Universal Synchronization</span>
                <div className="text-sm font-medium opacity-70">
                    {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
             </div>
             
             <div className="flex items-center space-x-6">
                <div className="hidden sm:block text-right">
                    <div className="text-2xl font-mono font-light tracking-tighter opacity-80 tabular-nums">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                    </div>
                </div>
                <button onClick={toggleNightMode} className="md:hidden p-2 opacity-50"><Moon className="w-5 h-5" /></button>
                <button className="p-2 opacity-20 hover:opacity-100 transition-opacity">
                    <Settings className="w-5 h-5" />
                </button>
             </div>
          </header>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="view-container px-6 md:px-12">
              <div className="min-h-[calc(100vh-280px)]">
                  {React.Children.map(children, child => {
                      if (React.isValidElement(child)) {
                          return React.cloneElement(child as React.ReactElement<any>, { theme: activeTheme, time });
                      }
                      return child;
                  })}
              </div>
              
              {/* Pillar SEO Content - Only show if not in dedicated blog mode */}
              {currentMode !== AppMode.BLOG && <BlogSection />}

              <Footer onNavigate={setMode} />
            </div>
          </div>
      </main>
    </div>
  );
};
