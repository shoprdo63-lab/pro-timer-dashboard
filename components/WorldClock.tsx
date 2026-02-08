import React, { useEffect, useState } from 'react';
import { Plus, X, Globe, Search, ArrowRight } from 'lucide-react';
import { MASTER_DATA } from '../constants';
import { TimeZone, Theme } from '../types';

interface WorldClockProps {
    theme?: Theme;
    time?: Date;
}

export const WorldClock: React.FC<WorldClockProps> = ({ theme, time = new Date() }) => {
  const [selectedZones, setSelectedZones] = useState<TimeZone[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('glass_world_clock');
    if (saved) {
      setSelectedZones(JSON.parse(saved));
    } else {
      setSelectedZones([
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'New York')!,
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'London')!,
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'Tokyo')!,
      ].filter(Boolean));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('glass_world_clock', JSON.stringify(selectedZones));
  }, [selectedZones]);

  const addZone = (zone: TimeZone) => {
    if (!selectedZones.find(z => z.city === zone.city)) {
      setSelectedZones([...selectedZones, zone]);
    }
    setIsAdding(false);
    setSearchQuery("");
  };

  const removeZone = (city: string) => {
    setSelectedZones(selectedZones.filter(z => z.city !== city));
  };

  const getZoneTime = (zoneStr: string) => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: zoneStr,
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
      }).format(time);
    } catch (e) { return "--:--:--"; }
  };

  const getHandAngles = (zoneStr: string) => {
      try {
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: zoneStr,
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        }).formatToParts(time);
        
        const h = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
        const m = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
        const s = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);
        
        const sAngle = (s / 60) * 360;
        const mAngle = ((m + s/60) / 60) * 360;
        const hAngle = (((h % 12) + m/60) / 12) * 360;

        return { h: hAngle, m: mAngle, s: sAngle, isDay: h >= 6 && h < 18 };
      } catch(e) { return { h:0, m:0, s:0, isDay: true }; }
  }

  const accentColor = theme?.colors.accent || '#3b82f6';
  const filteredZones = MASTER_DATA.TIME_ZONES.filter(z => 
    z.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    z.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full p-8 space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 relative z-40">
            <div>
                <h2 className="text-5xl font-extralight tracking-tight text-white mb-2">Synchronicity</h2>
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">
                    <Globe className="w-3 h-3" />
                    <span>Multi-Zone Authority</span>
                </div>
            </div>
            
            <div className="relative flex items-center">
                 <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="group flex items-center space-x-3 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full border border-white/10 transition-all shadow-xl"
                >
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white">Add Node</span>
                    <Plus className={`w-4 h-4 text-white transition-transform duration-500 ${isAdding ? 'rotate-45' : ''}`} />
                </button>

                {isAdding && (
                    <div className="absolute top-16 right-0 w-80 glass-premium rounded-3xl p-4 shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 z-50">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Search location..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 ring-blue-500/50"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-1 custom-scrollbar">
                            {filteredZones.slice(0, 10).map(z => (
                                <button 
                                    key={z.city}
                                    onClick={() => addZone(z)}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 flex justify-between items-center group transition-colors"
                                >
                                    <span className="text-sm font-medium">{z.city}</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedZones.map((zone) => {
                const { h, m, s, isDay } = getHandAngles(zone.zone);
                return (
                    <div 
                        key={zone.city} 
                        className="group relative h-64 bg-white/[0.02] hover:bg-white/[0.05] rounded-[40px] border border-white/5 p-8 flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
                    >
                        {/* Decorative background number */}
                        <div className="absolute -bottom-10 -right-4 text-[120px] font-black text-white/[0.02] select-none italic tracking-tighter">
                            {zone.city.substring(0, 3).toUpperCase()}
                        </div>

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h3 className="text-2xl font-light tracking-tight">{zone.city}</h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mt-1">{zone.region}</p>
                            </div>
                            <button onClick={() => removeZone(zone.city)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-full text-red-500/50 hover:text-red-500">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex flex-col">
                                <div className="text-4xl font-mono font-medium tracking-tighter tabular-nums mb-1">
                                    {getZoneTime(zone.zone).split(':').slice(0, 2).join(':')}
                                    <span className="text-xl text-white/30 ml-1">:{getZoneTime(zone.zone).split(':')[2]}</span>
                                </div>
                                <div className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold tracking-widest uppercase ${isDay ? 'bg-amber-500/10 text-amber-500' : 'bg-indigo-500/10 text-indigo-400'}`}>
                                    {isDay ? 'Solar Day' : 'Nocturnal'}
                                </div>
                            </div>

                            {/* Luxury Analog Face */}
                            <div className="w-24 h-24 rounded-full border border-white/10 relative shadow-2xl bg-gradient-to-br from-white/5 to-transparent">
                                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
                                    <div key={deg} className={`absolute w-[1px] ${deg % 90 === 0 ? 'h-2 bg-white/40' : 'h-1 bg-white/10'} rounded-full`} 
                                         style={{ top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-40px)` }} 
                                    />
                                ))}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {/* Hands */}
                                    <div className="absolute w-1 bg-white rounded-full shadow-lg clock-hand-smooth" 
                                         style={{ height: '22%', transformOrigin: '50% 100%', transform: `translateY(-11px) rotate(${h}deg)` }} />
                                    <div className="absolute w-0.5 bg-white/60 rounded-full shadow-lg clock-hand-smooth" 
                                         style={{ height: '35%', transformOrigin: '50% 100%', transform: `translateY(-17px) rotate(${m}deg)` }} />
                                    <div className="absolute w-[0.5px] rounded-full shadow-md" 
                                         style={{ height: '40%', backgroundColor: accentColor, transformOrigin: '50% 100%', transform: `translateY(-20px) rotate(${s}deg)`, transition: 'transform 0.1s linear' }} />
                                    <div className="w-1.5 h-1.5 bg-white rounded-full z-10 shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
};