import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Bell, Check, X, Calculator, Brain } from 'lucide-react';
import { Alarm, Theme, MathDifficultyLevel } from '../types';
import { MASTER_DATA } from '../constants';

interface AlarmProps {
  onAlarmTrigger: (alarm: Alarm) => void;
  theme?: Theme;
}

export const AlarmView: React.FC<AlarmProps> = ({ onAlarmTrigger, theme }) => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  
  // New Alarm State
  const [newTime, setNewTime] = useState("07:00");
  const [newLabel, setNewLabel] = useState("Wake up");
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
    <div className="flex flex-col h-full p-6 space-y-6">
        <header className="flex justify-between items-center">
             <div>
                <h2 className="text-3xl font-light tracking-tight">Alarm</h2>
                <p className="opacity-40 text-sm mt-1">Smart wake-up</p>
            </div>
            <button 
                onClick={() => setIsCreating(true)}
                className="p-3 rounded-full hover:bg-white/10 transition-all border border-white/10 backdrop-blur-md"
                style={{ backgroundColor: isCreating ? accentColor : 'rgba(255,255,255,0.05)' }}
            >
                <Plus className="w-6 h-6 text-white" />
            </button>
        </header>

        {isCreating && (
             <div className="p-6 rounded-2xl animate-in fade-in slide-in-from-top-4 space-y-4 border border-white/10" style={{ background: theme?.colors.glassCard }}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">New Alarm</h3>
                    <button onClick={() => setIsCreating(false)}><X className="w-5 h-5 opacity-50 hover:opacity-100" /></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs opacity-50 mb-1">Time</label>
                        <input 
                            type="time" 
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white text-2xl font-mono focus:outline-none focus:border-white/30"
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs opacity-50 mb-1">Label</label>
                            <input 
                                type="text" 
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/30"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs opacity-50 mb-1">Sound</label>
                                <select 
                                    value={newSound}
                                    onChange={(e) => setNewSound(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/30 appearance-none"
                                >
                                    {MASTER_DATA.ALARM_SOUNDS.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs opacity-50 mb-1">Math Difficulty</label>
                                <select 
                                    value={newDifficulty}
                                    onChange={(e) => setNewDifficulty(e.target.value as MathDifficultyLevel)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/30 appearance-none"
                                >
                                    {(Object.keys(MASTER_DATA.MATH_DIFFICULTIES) as MathDifficultyLevel[]).map(lvl => (
                                        <option key={lvl} value={lvl}>{lvl}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t border-white/5 mt-4">
                    <button onClick={() => setIsCreating(false)} className="px-4 py-2 rounded-lg opacity-60 hover:opacity-100">Cancel</button>
                    <button onClick={addAlarm} className="px-8 py-2 rounded-lg text-white font-medium shadow-lg hover:brightness-110 transition-all" style={{ backgroundColor: accentColor }}>
                        Save Alarm
                    </button>
                </div>
             </div>
        )}

        <div className="space-y-3 overflow-y-auto pb-20 custom-scrollbar">
            {alarms.length === 0 && !isCreating && (
                <div className="text-center opacity-20 py-10 flex flex-col items-center">
                    <Bell className="w-16 h-16 mb-4" />
                    <p className="text-lg">No alarms set</p>
                </div>
            )}
            {alarms.map(alarm => (
                <div 
                    key={alarm.id} 
                    className={`p-5 rounded-2xl flex items-center justify-between transition-all duration-300 border border-white/5 ${!alarm.enabled ? 'opacity-50 grayscale' : ''}`}
                    style={{ background: theme?.colors.glassCard }}
                >
                    <div className="flex flex-col">
                        <span className="text-5xl font-light tracking-tighter font-mono">{alarm.time}</span>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm opacity-50">{alarm.label}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5">
                                {alarm.difficulty}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        <div 
                            onClick={() => toggleAlarm(alarm.id)}
                            className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300`}
                            style={{ backgroundColor: alarm.enabled ? accentColor : 'rgba(255,255,255,0.1)' }}
                        >
                            <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${alarm.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                        <button onClick={() => deleteAlarm(alarm.id)} className="opacity-30 hover:opacity-100 hover:text-red-400 transition-colors">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

// Math Challenge Modal Component
export const MathChallenge: React.FC<{ onSolved: () => void, onSnooze: () => void, difficulty?: MathDifficultyLevel }> = ({ onSolved, onSnooze, difficulty = 'Medium' }) => {
    const [problem, setProblem] = useState({ q: "", a: 0 });
    const [answer, setAnswer] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        // Generate problem based on difficulty
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
            <div className="w-full max-w-md bg-[#0f172a] border border-white/10 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse"></div>
                
                <Brain className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                
                <h2 className="text-2xl font-bold mb-2 text-white">Wake Up!</h2>
                <p className="text-white/50 mb-8">Solve this <span className="text-blue-400 font-bold">{difficulty}</span> problem</p>
                
                <div className="text-4xl font-mono font-bold mb-8 text-white">
                    {problem.q} = <span className="text-blue-400">?</span>
                </div>

                <form onSubmit={checkAnswer} className="space-y-4">
                    <input 
                        type="number" 
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Answer"
                        className={`w-full text-center text-3xl font-mono bg-white/5 border-2 rounded-xl py-4 text-white focus:outline-none transition-colors ${error ? 'border-red-500 text-red-500' : 'border-white/10 focus:border-blue-500'}`}
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20">
                        Stop Alarm
                    </button>
                    <button type="button" onClick={onSnooze} className="w-full text-white/40 hover:text-white py-2 text-sm">
                        Snooze 5m
                    </button>
                </form>
            </div>
        </div>
    )
}