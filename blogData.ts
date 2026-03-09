import * as React from 'react';
import { useState, useEffect, Suspense, lazy, useRef, useMemo } from 'react';
import { useLocation, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AppMode, Alarm } from './types';
import { playAlarmSound, stopAudio } from './utils/audioUtils';
import { useWorkerTimer } from './hooks/useWorkerTimer';
import { CLOCK_WORKER_CODE } from './constants';

// Lazy load components for code splitting
const WorldClock = lazy(() => import('./components/WorldClock').then(module => ({ default: module.WorldClock })));
const AlarmView = lazy(() => import('./components/Alarm').then(module => ({ default: module.AlarmView })));
const MathChallenge = lazy(() => import('./components/Alarm').then(module => ({ default: module.MathChallenge })));
const Timer = lazy(() => import('./components/Timer').then(module => ({ default: module.Timer })));
const Stopwatch = lazy(() => import('./components/Stopwatch').then(module => ({ default: module.Stopwatch })));
const Pomodoro = lazy(() => import('./components/Pomodoro').then(module => ({ default: module.Pomodoro })));
const NightMode = lazy(() => import('./components/NightMode').then(module => ({ default: module.NightMode })));
const InfoView = lazy(() => import('./components/InfoPages').then(module => ({ default: module.InfoView })));
const BlogSection = lazy(() => import('./components/BlogSection').then(module => ({ default: module.BlogSection })));

// Loading Fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

const MODE_TO_PATH: Record<AppMode, string> = {
  [AppMode.CLOCK]: '/',
  [AppMode.ALARM]: '/alarm',
  [AppMode.TIMER]: '/timer',
  [AppMode.STOPWATCH]: '/stopwatch',
  [AppMode.POMODORO]: '/focus',
  [AppMode.BLOG]: '/blog',
  [AppMode.ABOUT]: '/about',
  [AppMode.HOW_IT_WORKS]: '/how-it-works',
  [AppMode.PRIVACY]: '/privacy',
  [AppMode.TERMS]: '/terms',
  [AppMode.CONTACT]: '/contact',
  [AppMode.BLOG_FOCUS]: '/blog/focus',
  [AppMode.BLOG_SYNC]: '/blog/sync',
  [AppMode.BLOG_PRIVACY]: '/blog/privacy',
  [AppMode.BLOG_AESTHETICS]: '/blog/aesthetics'
};

const PATH_TO_MODE: Record<string, AppMode> = Object.entries(MODE_TO_PATH).reduce((acc, [mode, path]) => {
  acc[path] = mode as AppMode;
  return acc;
}, {} as Record<string, AppMode>);

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const mode = useMemo(() => {
    const path = location.pathname;
    return PATH_TO_MODE[path] || AppMode.CLOCK;
  }, [location.pathname]);

  const setMode = (newMode: AppMode) => {
    navigate(MODE_TO_PATH[newMode] || '/');
  };

  const [isNightMode, setIsNightMode] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);
  const [time, setTime] = useState(new Date());

  // Use the 1-second worker to drive the main clock and alarm checks
  useWorkerTimer(true, () => {
    setTime(new Date());
  }, CLOCK_WORKER_CODE);

  // Scroll to top when mode changes
  useEffect(() => {
    const scrollable = document.querySelector('.overflow-y-auto');
    if (scrollable) {
      scrollable.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [mode]);

  // Global Alarm Checker
  useEffect(() => {
    let currentAlarms: Alarm[] = [];
    try {
        currentAlarms = JSON.parse(localStorage.getItem('glass_alarms') || '[]');
    } catch (e) {}

    const currentTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const currentDay = time.getDay(); 

    const triggered = currentAlarms.find(a => 
        a.enabled && 
        a.time === currentTime && 
        a.days.includes(currentDay) && 
        !a.snoozedUntil &&
        (!activeAlarm || activeAlarm.id !== a.id)
    );

    if (triggered && !activeAlarm) {
        setActiveAlarm(triggered);
        const soundInterval = setInterval(() => {
             playAlarmSound(triggered.sound);
        }, 2000); 
        (window as any).alarmInterval = soundInterval;
    }
  }, [time, activeAlarm]);

  const handleAlarmSolved = () => {
      stopAudio();
      clearInterval((window as any).alarmInterval);
      setActiveAlarm(null);
  };

  const handleSnooze = () => {
      stopAudio();
      clearInterval((window as any).alarmInterval);
      if (activeAlarm) {
          setActiveAlarm(null);
      }
  };

  const isInfoMode = [
    AppMode.ABOUT, 
    AppMode.HOW_IT_WORKS, 
    AppMode.PRIVACY, 
    AppMode.TERMS, 
    AppMode.CONTACT,
    AppMode.BLOG_FOCUS,
    AppMode.BLOG_SYNC,
    AppMode.BLOG_PRIVACY,
    AppMode.BLOG_AESTHETICS
  ].includes(mode);

  return (
    <>
        {isNightMode ? (
            <Suspense fallback={<div className="bg-black w-full h-screen" />}>
                <NightMode onExit={() => setIsNightMode(false)} time={time} />
            </Suspense>
        ) : (
            <Layout currentMode={mode} setMode={setMode} toggleNightMode={() => setIsNightMode(true)} time={time}>
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<WorldClock time={time} />} />
                        <Route path="/alarm" element={<AlarmView onAlarmTrigger={setActiveAlarm} />} />
                        <Route path="/timer" element={<Timer />} />
                        <Route path="/stopwatch" element={<Stopwatch />} />
                        <Route path="/focus" element={<Pomodoro />} />
                        <Route path="/blog" element={<BlogSection isStandalone={true} />} />
                        <Route path="/blog/:postId" element={<BlogSection isStandalone={true} />} />
                        
                        {/* Info Pages */}
                        <Route path="/about" element={<InfoView mode={AppMode.ABOUT} />} />
                        <Route path="/how-it-works" element={<InfoView mode={AppMode.HOW_IT_WORKS} />} />
                        <Route path="/privacy" element={<InfoView mode={AppMode.PRIVACY} />} />
                        <Route path="/terms" element={<InfoView mode={AppMode.TERMS} />} />
                        <Route path="/contact" element={<InfoView mode={AppMode.CONTACT} />} />
                        
                        {/* Research Articles */}
                        <Route path="/blog/focus" element={<InfoView mode={AppMode.BLOG_FOCUS} />} />
                        <Route path="/blog/sync" element={<InfoView mode={AppMode.BLOG_SYNC} />} />
                        <Route path="/blog/privacy" element={<InfoView mode={AppMode.BLOG_PRIVACY} />} />
                        <Route path="/blog/aesthetics" element={<InfoView mode={AppMode.BLOG_AESTHETICS} />} />

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </Layout>
        )}

        {activeAlarm && (
            <Suspense fallback={null}>
                <MathChallenge 
                    onSolved={handleAlarmSolved} 
                    onSnooze={handleSnooze} 
                    difficulty={activeAlarm.difficulty}
                />
            </Suspense>
        )}
    </>
  );
};

export default App;