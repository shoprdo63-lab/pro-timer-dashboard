import * as React from 'react';
import { useState, useEffect } from 'react';
import { Plus, Trash2, Bell, Check, X, Calculator, Brain, Clock, ChevronRight } from 'lucide-react';
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
  const [newLabel, setNewLabel] = useState("Deep Focus Session");
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
    <div className="flex flex-col space-y-10">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 shrink-0">
             <div className="space-y-2">
                <h2 className="text-5xl font-light tracking-tight text-white">Alarm</h2>
                <p className="opacity-40 text-sm tracking-[0.4em] uppercase font-bold">Cognitive-Barrier Wake System</p>
            </div>
            <button 
                onClick={() => setIsCreating(!isCreating)}
                className="flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all border border-white/10 backdrop-blur-md shadow-2xl group"
                style={{ backgroundColor: isCreating ? accentColor : 'rgba(255,255,255,0.05)' }}
            >
                <span className="text-xs font-bold uppercase tracking-widest">{isCreating ? 'Dismiss Editor' : 'Configure New Alarm'}</span>
                <Plus className={`w-4 h-4 transition-transform duration-300 ${isCreating ? 'rotate-45' : 'group-hover:rotate-90'}`} />
            </button>
        </header>

        {isCreating && (
             <div className="p-10 rounded-[40px] animate-in fade-in slide-in-from-top-10 space-y-10 border border-white/10 glass-panel shadow-[0_40px_80px_rgba(0,0,0,0.4)] relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="flex flex-col justify-center items-center">
                        <label className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 mb-8 block text-center">Temporal Target</label>
                        <input 
                            type="time" 
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-3xl p-10 text-white text-7xl font-mono focus:outline-none focus:border-white/30 text-center tabular-nums shadow-inner"
                        />
                    </div>
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 block">Task Identifier</label>
                            <input 
                                type="text" 
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 text-lg"
                                placeholder="e.g. Critical Sync Session"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 block">Aural Profile</label>
                                <select 
                                    value={newSound}
                                    onChange={(e) => setNewSound(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none appearance-none cursor-pointer"
                                >
                                    {MASTER_DATA.ALARM_SOUNDS.map(s => (
                                        <option key={s.id} value={s.id} className="bg-slate-900">{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-30 block">Cognitive Load</label>
                                <select 
                                    value={newDifficulty}
                                    onChange={(e) => setNewDifficulty(e.target.value as MathDifficultyLevel)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none appearance-none cursor-pointer"
                                >
                                    {(Object.keys(MASTER_DATA.MATH_DIFFICULTIES) as MathDifficultyLevel[]).map(lvl => (
                                        <option key={lvl} value={lvl} className="bg-slate-900">{lvl}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-white/5">
                    <button onClick={addAlarm} className="btn-primary" style={{ backgroundColor: accentColor }}>
                        Verify & Deploy Alarm
                    </button>
                </div>
             </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {alarms.length === 0 && !isCreating && (
                <div className="col-span-full py-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] opacity-20">
                    <Bell className="w-16 h-16 mb-6" />
                    <p className="text-xl uppercase tracking-[0.5em] font-light">No Active Alarms</p>
                </div>
            )}
            {alarms.map(alarm => (
                <div 
                    key={alarm.id} 
                    className={`p-8 rounded-[32px] flex items-center justify-between transition-all duration-700 glass-card ${!alarm.enabled ? 'opacity-30' : 'hover:scale-[1.01] hover:shadow-xl'}`}
                >
                    <div className="flex items-center space-x-8">
                        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 hidden sm:block">
                            <Clock className="w-6 h-6 opacity-30" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-5xl font-light tracking-tighter font-mono tabular-nums">{alarm.time}</span>
                            <div className="flex items-center space-x-3 mt-2">
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">{alarm.label}</span>
                                <span className="text-[8px] px-2 py-1 rounded-md bg-white/5 text-white/40 border border-white/10 uppercase font-black tracking-widest">
                                    {alarm.difficulty}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div 
                            onClick={() => toggleAlarm(alarm.id)}
                            className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-all duration-500 shadow-inner`}
                            style={{ backgroundColor: alarm.enabled ? accentColor : 'rgba(255,255,255,0.05)' }}
                        >
                            <div className={`w-6 h-6 rounded-full bg-white shadow-2xl transform transition-transform duration-500 ${alarm.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                        <button onClick={() => deleteAlarm(alarm.id)} className="opacity-10 hover:opacity-100 hover:text-red-400 transition-all p-2">
                            <Trash2 className="w-5 h-5" />
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-6">
            <div className="w-full max-w-xl glass-panel rounded-[56px] p-16 text-center shadow-[0_64px_128px_rgba(0,0,0,0.8)] relative overflow-hidden border-white/5 border-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 animate-pulse"></div>
                
                <div className="w-24 h-24 bg-blue-500/10 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <Brain className="w-12 h-12 text-blue-400" />
                </div>
                
                <h2 className="text-4xl font-light mb-2 text-white tracking-tight">Vigilance Required</h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.6em] opacity-30 mb-14">Verify Cognitive State to Deactivate</p>
                
                <div className="text-7xl font-mono font-light mb-16 text-white tracking-tighter tabular-nums drop-shadow-lg">
                    {problem.q} = <span className="text-blue-500">?</span>
                </div>

                <form onSubmit={checkAnswer} className="space-y-8 max-w-sm mx-auto">
                    <input 
                        type="number" 
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="ANSWER"
                        className={`w-full text-center text-5xl font-mono bg-black/40 border-2 rounded-[32px] py-8 text-white focus:outline-none transition-all placeholder:text-white/5 ${error ? 'border-red-500 text-red-500 animate-shake' : 'border-white/10 focus:border-blue-500/50 shadow-inner'}`}
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-3xl transition-all shadow-[0_20px_40px_rgba(37,99,235,0.4)] text-xs uppercase tracking-[0.4em] active:scale-95">
                        Deactivate Monitoring
                    </button>
                    <button type="button" onClick={onSnooze} className="w-full text-white/20 hover:text-white py-2 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors">
                        Snooze Synchronization (5m)
                    </button>
                </form>
            </div>
        </div>
    )
}