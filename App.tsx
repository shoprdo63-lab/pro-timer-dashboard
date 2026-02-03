import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { WorldClock } from './components/WorldClock';
import { AlarmView, MathChallenge } from './components/Alarm';
import { Timer } from './components/Timer';
import { Stopwatch } from './components/Stopwatch';
import { Pomodoro } from './components/Pomodoro';
import { NightMode } from './components/NightMode';
import { InfoView } from './components/InfoPages';
import { AppMode, Alarm } from './types';
import { playAlarmSound, stopAudio } from './utils/audioUtils';
import { useWorkerTimer } from './hooks/useWorkerTimer';
import { CLOCK_WORKER_CODE } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.CLOCK);
  const [isNightMode, setIsNightMode] = useState(false);
  const [activeAlarm, setActiveAlarm] = useState<Alarm | null>(null);
  const [time, setTime] = useState(new Date());

  // Use the 1-second worker to drive the main clock and alarm checks
  // This ensures checking happens even if the tab is throttled
  useWorkerTimer(true, () => {
    setTime(new Date());
  }, CLOCK_WORKER_CODE);

  // Global Alarm Checker - Runs on every time update (driven by worker)
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
          // Implement snooze logic if needed (update storage)
          setActiveAlarm(null);
      }
  };

  return (
    <>
        {isNightMode ? (
            <NightMode onExit={() => setIsNightMode(false)} time={time} />
        ) : (
            <Layout currentMode={mode} setMode={setMode} toggleNightMode={() => setIsNightMode(true)} time={time}>
                {mode === AppMode.CLOCK && <WorldClock time={time} />}
                {mode === AppMode.ALARM && <AlarmView onAlarmTrigger={setActiveAlarm} />}
                {mode === AppMode.TIMER && <Timer />}
                {mode === AppMode.STOPWATCH && <Stopwatch />}
                {mode === AppMode.POMODORO && <Pomodoro />}
                
                {/* Info Pages */}
                {(mode === AppMode.ABOUT || 
                  mode === AppMode.HOW_IT_WORKS || 
                  mode === AppMode.PRIVACY || 
                  mode === AppMode.TERMS || 
                  mode === AppMode.CONTACT) && <InfoView mode={mode} />}
            </Layout>
        )}

        {activeAlarm && (
            <MathChallenge 
                onSolved={handleAlarmSolved} 
                onSnooze={handleSnooze} 
                difficulty={activeAlarm.difficulty}
            />
        )}
    </>
  );
};

export default App;