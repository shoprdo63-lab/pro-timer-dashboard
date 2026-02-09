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

  const accentColor = theme?.colors.accent || '#3b82f6';
  const filteredZones = MASTER_DATA.TIME_ZONES.filter(z => 
    z.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    z.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 shrink-0">
            <div>
                <h2 className="text-4xl font-light tracking-tight text-white">World Clock</h2>
                <p className="opacity-40 text-sm mt-2 tracking-widest uppercase">Global Synchronization Dashboard</p>
            </div>
            
            <div className="relative">
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center space-x-3 px-6 py-3 rounded-full transition-all border border-white/10 backdrop-blur-md shadow-xl"
                    style={{ backgroundColor: isAdding ? accentColor : 'rgba(255,255,255,0.05)' }}
                >
                    <span className="text-xs font-bold uppercase tracking-widest">{isAdding ? 'Close' : 'Add Region'}</span>
                    <Plus className={`w-4 h-4 text-white transition-transform duration-300 ${isAdding ? 'rotate-45' : ''}`} />
                </button>

                {isAdding && (
                    <div className="absolute top-16 right-0 w-80 glass-panel rounded-3xl p-4 shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 z-[100]">
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Search city or zone..."
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/40"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="max-h-64 overflow-y-auto space-y-1 custom-scrollbar">
                            {filteredZones.slice(0, 20).map(z => (
                                <button 
                                    key={z.city}
                                    onClick={() => addZone(z)}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-sm flex justify-between items-center group transition-colors"
                                >
                                    <span>{z.city}, {z.region}</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedZones.map((zone) => (
                <div 
                    key={zone.city} 
                    className="p-8 rounded-[32px] border border-white/5 flex flex-col justify-between h-52 group relative overflow-hidden glass-card transition-all hover:scale-[1.02] hover:shadow-2xl"
                >
                    <div className="flex justify-between items-start z-10">
                        <div>
                            <h3 className="text-2xl font-light tracking-tight">{zone.city}</h3>
                            <p className="text-[10px] opacity-40 uppercase tracking-[0.3em] font-bold mt-1">{zone.region}</p>
                        </div>
                        <button onClick={() => removeZone(zone.city)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-full text-red-400">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="z-10 flex items-end justify-between">
                        <div className="text-5xl font-mono font-light tracking-tighter tabular-nums leading-none">
                            {getZoneTime(zone.zone).split(':').slice(0, 2).join(':')}
                            <span className="text-2xl opacity-20 ml-1">:{getZoneTime(zone.zone).split(':')[2]}</span>
                        </div>
                        <div className="bg-white/5 px-2 py-1 rounded-md text-[9px] font-bold tracking-widest opacity-40 uppercase">
                            {zone.zone.split('/')[0]}
                        </div>
                    </div>
                    {/* Background Icon Decoration */}
                    <Globe className="absolute -bottom-6 -right-6 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rotate-12" />
                </div>
            ))}
        </div>
    </div>
  );
};