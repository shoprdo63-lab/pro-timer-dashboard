import React, { useState, useEffect, Suspense, lazy } from 'react';
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

// Loading Fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.CLOCK);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);
  const [time, setTime] = useState(new Date());

  // Use the 1-second worker to drive the main clock and alarm checks
  useWorkerTimer(true, () => {
    setTime(new Date());
  }, CLOCK_WORKER_CODE);

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
                    {mode === AppMode.CLOCK && <WorldClock time={time} />}
                    {mode === AppMode.ALARM && <AlarmView onAlarmTrigger={setActiveAlarm} />}
                    {mode === AppMode.TIMER && <Timer />}
                    {mode === AppMode.STOPWATCH && <Stopwatch />}
                    {mode === AppMode.POMODORO && <Pomodoro />}
                    
                    {isInfoMode && <InfoView mode={mode} />}
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