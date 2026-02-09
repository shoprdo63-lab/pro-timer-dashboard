import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Bell, Check, X, Calculator, Brain, Clock } from 'lucide-react';
import { Alarm, Theme, MathDifficultyLevel } from '../types';
import { MASTER_DATA } from '../constants';

interface AlarmProps {
  onAlarmTrigger: (alarm: Alarm) => void;
  theme?: Theme;
}

export const AlarmView: React.FC<AlarmProps> = ({ onAlarmTrigger, theme }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  const [newTime, setNewTime] = useState("07:00");
  const [newLabel, setNewLabel] = useState("Focus session");
  const [newSound, setNewSound] = useState(MASTER_DATA.ALARM_SOUNDS[0].id);
  const [newDifficulty, setNewDifficulty] = useState<MathDifficultyLevel>('Medium');

  useEffect(() => {
    const saved = localStorage.getItem('glass_alarms');
    if (saved) {
      setAlarms(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('glass_alarms', JSON.stringify(alarms));
    const event = new CustomEvent('alarmsUpdated', { detail: alarms });
    window.dispatchEvent(event);
  }, [alarms]);

  const addAlarm = () => {
    const alarm: Alarm = {
      id: Date.now().toString(),
      time: newTime,
      label: newLabel,
      enabled: true,
      days: [0,1,2,3,4,5,6], 
      sound: newSound,
      difficulty: newDifficulty
    };
    setAlarms([...alarms, alarm]);
    setIsCreating(false);
  };

  const toggleAlarm = (id: string) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(a => a.id !== id));
  };

  const accentColor = theme?.colors.accent || '#3b82f6';

  return (
    <div className="flex flex-col space-y-8">
        <header className="flex justify-between items-end shrink-0">
             <div>
                <h2 className="text-4xl font-light tracking-tight text-white">Alarm</h2>
                <p className="opacity-40 text-sm mt-2 tracking-widest uppercase">Cognitive-Barrier Wake System</p>
            </div>
            <button 
                onClick={() => setIsCreating(!isCreating)}
                className="flex items-center space-x-3 px-6 py-3 rounded-full transition-all border border-white/10 backdrop-blur-md shadow-xl"
                style={{ backgroundColor: isCreating ? accentColor : 'rgba(255,255,255,0.05)' }}
            >
                <span className="text-xs font-bold uppercase tracking-widest">{isCreating ? 'Cancel' : 'Set Alarm'}</span>
                <Plus className={`w-4 h-4 transition-transform duration-300 ${isCreating ? 'rotate-45' : ''}`} />
            </button>
        </header>

        {isCreating && (
             <div className="p-8 rounded-[32px] animate-in fade-in slide-in-from-top-6 space-y-6 border border-white/10 glass-panel shadow-2xl relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col justify-center">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-4 block">Select Time</label>
                        <input 
                            type="time" 
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-6xl font-mono focus:outline-none focus:border-white/30 text-center tabular-nums"
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-2 block">Descriptor</label>
                            <input 
                                type="text" 
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                                placeholder="e.g. Deep Work Start"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-2 block">Audio Profile</label>
                                <select 
                                    value={newSound}
                                    onChange={(e) => setNewSound(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none appearance-none"
                                >
                                    {MASTER_DATA.ALARM_SOUNDS.map(s => (
                                        <option key={s.id} value={s.id} className="bg-slate-900">{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 mb-2 block">Math Barrier</label>
                                <select 
                                    value={newDifficulty}
                                    onChange={(e) => setNewDifficulty(e.target.value as MathDifficultyLevel)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none appearance-none"
                                >
                                    {(Object.keys(MASTER_DATA.MATH_DIFFICULTIES) as MathDifficultyLevel[]).map(lvl => (
                                        <option key={lvl} value={lvl} className="bg-slate-900">{lvl}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-white/5">
                    <button onClick={addAlarm} className="px-10 py-4 rounded-2xl text-white font-bold tracking-widest uppercase text-xs shadow-2xl hover:brightness-110 transition-all active:scale-95" style={{ backgroundColor: accentColor }}>
                        Verify & Activate
                    </button>
                </div>
             </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {alarms.length === 0 && !isCreating && (
                <div className="col-span-full py-24 flex flex-col items-center opacity-10">
                    <Bell className="w-20 h-20 mb-6" />
                    <p className="text-xl font-light tracking-widest uppercase">No Active Monitors</p>
                </div>
            )}
            {alarms.map(alarm => (
                <div 
                    key={alarm.id} 
                    className={`p-6 rounded-3xl flex items-center justify-between transition-all duration-500 glass-card ${!alarm.enabled ? 'opacity-30' : 'hover:scale-[1.01]'}`}
                >
                    <div className="flex items-center space-x-6">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <Clock className="w-5 h-5 opacity-40" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-light tracking-tighter font-mono tabular-nums">{alarm.time}</span>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{alarm.label}</span>
                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-white/5 text-white/30 border border-white/5 uppercase font-bold tracking-tighter">
                                    {alarm.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div 
                            onClick={() => toggleAlarm(alarm.id)}
                            className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-all duration-500`}
                            style={{ backgroundColor: alarm.enabled ? accentColor : 'rgba(255,255,255,0.05)' }}
                        >
                            <div className={`w-5 h-5 rounded-full bg-white shadow-xl transform transition-transform duration-500 ${alarm.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                        <button onClick={() => deleteAlarm(alarm.id)} className="opacity-20 hover:opacity-100 hover:text-red-400 transition-colors p-2">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export const MathChallenge: React.FC<{ onSolved: () => void, onSnooze: () => void, difficulty?: MathDifficultyLevel }> = ({ onSolved, onSnooze, difficulty = 'Medium' }) => {
    const [problem, setProblem] = useState({ q: "", a: 0 });
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const generate = () => {
            let num1, num2, num3;
            let qStr = "";
            let ans = 0;

            switch(difficulty) {
                case 'Easy': 
                    num1 = Math.floor(Math.random() * 15) + 5;
                    num2 = Math.floor(Math.random() * 10) + 1;
                    qStr = `${num1} + ${num2}`;
                    ans = num1 + num2;
                    break;
                case 'Hard':
                    num1 = Math.floor(Math.random() * 15) + 5;
                    num2 = Math.floor(Math.random() * 12) + 2;
                    qStr = `${num1} × ${num2}`;
                    ans = num1 * num2;
                    break;
                case 'Expert':
                    num1 = Math.floor(Math.random() * 20) + 10;
                    num2 = Math.floor(Math.random() * 10) + 2;
                    num3 = Math.floor(Math.random() * 50) + 10;
                    qStr = `(${num1} × ${num2}) - ${num3}`;
                    ans = (num1 * num2) - num3;
                    break;
                case 'Medium':
                default:
                    num1 = Math.floor(Math.random() * 50) + 10;
                    num2 = Math.floor(Math.random() * 40) + 5;
                    if (Math.random() > 0.5) {
                        qStr = `${num1} + ${num2}`;
                        ans = num1 + num2;
                    } else {
                        qStr = `${num1} - ${num2}`;
                        ans = num1 - num2;
                    }
                    break;
            }
            setProblem({ q: qStr, a: ans });
        };
        generate();
    }, [difficulty]);

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (parseInt(answer) === problem.a) {
            onSolved();
        } else {
            setError(true);
            setAnswer("");
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-6">
            <div className="w-full max-w-md glass-panel rounded-[48px] p-12 text-center shadow-2xl relative overflow-hidden border-white/5">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"></div>
                
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Brain className="w-10 h-10 text-blue-400" />
                </div>
                
                <h2 className="text-3xl font-light mb-2 text-white tracking-tight">System Locked</h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mb-10">Solve to Verify Consciousness</p>
                
                <div className="text-5xl font-mono font-light mb-12 text-white tracking-tighter tabular-nums">
                    {problem.q} = <span className="text-blue-400">?</span>
                </div>

                <form onSubmit={checkAnswer} className="space-y-6">
                    <input 
                        type="number" 
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="0"
                        className={`w-full text-center text-4xl font-mono bg-white/5 border-2 rounded-2xl py-6 text-white focus:outline-none transition-all ${error ? 'border-red-500 text-red-500 animate-shake' : 'border-white/5 focus:border-blue-500/50'}`}
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all shadow-2xl shadow-blue-600/30 text-xs uppercase tracking-[0.3em]">
                        Deactivate Alarm
                    </button>
                    <button type="button" onClick={onSnooze} className="w-full text-white/20 hover:text-white py-2 text-[10px] font-bold uppercase tracking-widest transition-colors">
                        Snooze 5 Minutes
                    </button>
                </form>
            </div>
        </div>
    )
}