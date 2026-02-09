import React, { useEffect, useState } from 'react';
import { Plus, X, Globe, Search, ArrowRight, MapPin, Info } from 'lucide-react';
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

  const getZoneDetails = (zoneStr: string) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: zoneStr,
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        weekday: 'short',
        hour12: false,
        timeZoneName: 'shortOffset'
      });
      
      const parts = formatter.formatToParts(time);
      const getPart = (type: string) => parts.find(p => p.type === type)?.value || '';
      
      const hour = getPart('hour');
      const minute = getPart('minute');
      const second = getPart('second');
      const offset = getPart('timeZoneName'); // e.g., GMT-5
      const weekday = getPart('weekday');

      // Calculate relative day
      const localDay = time.toLocaleDateString('en-US', { weekday: 'short' });
      let dayLabel = "Today";
      if (weekday !== localDay) {
        // Simple logic for Tomorrow/Yesterday based on weekday order
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const localIdx = days.indexOf(localDay);
        const targetIdx = days.indexOf(weekday);
        if (targetIdx === (localIdx + 1) % 7) dayLabel = "Tomorrow";
        else if (targetIdx === (localIdx - 1 + 7) % 7) dayLabel = "Yesterday";
      }

      return { hour, minute, second, offset, dayLabel };
    } catch (e) {
      return { hour: '--', minute: '--', second: '--', offset: 'UTC', dayLabel: 'Today' };
    }
  };

  const accentColor = theme?.colors.accent || '#3b82f6';
  const filteredZones = MASTER_DATA.TIME_ZONES.filter(z => 
    z.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    z.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-10">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-2">
                <h2 className="text-5xl font-light tracking-tight text-white">World Clock</h2>
                <p className="opacity-40 text-sm tracking-[0.4em] uppercase font-bold">Global Synchronization Hub</p>
            </div>
            
            <div className="relative z-30">
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center space-x-3 px-8 py-4 rounded-2xl transition-all border border-white/10 backdrop-blur-md shadow-2xl group"
                    style={{ backgroundColor: isAdding ? accentColor : 'rgba(255,255,255,0.05)' }}
                >
                    <span className="text-xs font-bold uppercase tracking-widest">{isAdding ? 'Exit Search' : 'Add Time Zone'}</span>
                    <Plus className={`w-4 h-4 transition-transform duration-300 ${isAdding ? 'rotate-45' : 'group-hover:rotate-90'}`} />
                </button>

                {isAdding && (
                    <div className="absolute top-20 right-0 w-80 glass-panel rounded-3xl p-6 shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/10 animate-in fade-in zoom-in-95">
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Search major cities..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-white/40 text-white placeholder:opacity-30"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="max-h-72 overflow-y-auto space-y-1 custom-scrollbar pr-2">
                            {filteredZones.slice(0, 30).map(z => (
                                <button 
                                    key={z.city}
                                    onClick={() => addZone(z)}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-sm flex justify-between items-center group transition-colors"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">{z.city}</span>
                                        <span className="text-[10px] opacity-40 uppercase tracking-tighter">{z.region}</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </button>
                            ))}
                            {filteredZones.length === 0 && <div className="p-4 text-center opacity-30 text-xs italic">No matching zones found.</div>}
                        </div>
                    </div>
                )}
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedZones.map((zone) => {
                const details = getZoneDetails(zone.zone);
                return (
                    <div 
                        key={zone.city} 
                        className="p-10 rounded-[40px] border border-white/5 flex flex-col justify-between h-72 group relative overflow-hidden glass-card transition-all hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                    >
                        <div className="flex justify-between items-start z-10 relative">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                    <MapPin className="w-3 h-3 opacity-30" />
                                    <h3 className="text-2xl font-light tracking-tight">{zone.city}</h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <p className="text-[10px] opacity-40 uppercase tracking-[0.4em] font-bold">{zone.region}</p>
                                    <span className={`text-[8px] px-1.5 py-0.5 rounded border border-white/10 font-black tracking-widest uppercase ${details.dayLabel === 'Today' ? 'opacity-20' : 'text-blue-400 border-blue-400/30 opacity-100'}`}>
                                        {details.dayLabel}
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => removeZone(zone.city)} className="opacity-0 group-hover:opacity-100 transition-opacity p-3 hover:bg-red-500/10 rounded-2xl text-red-400">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="z-10 relative flex flex-col items-start gap-4">
                            <div className="text-7xl font-mono font-light tracking-tighter tabular-nums leading-none flex items-baseline">
                                {details.hour}:{details.minute}
                                <span className="text-3xl opacity-20 ml-2 font-light">:{details.second}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                                    <Globe className="w-3 h-3 opacity-40" />
                                    <span className="text-[10px] font-mono font-bold tracking-widest opacity-60">
                                        {details.offset.replace('GMT', 'UTC ')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Background Icon Decoration */}
                        <Globe className="absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 rotate-12 group-hover:rotate-45" style={{ color: accentColor }} />
                    </div>
                );
            })}
            
            {selectedZones.length === 0 && (
                <div className="col-span-full py-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[40px] opacity-20">
                    <Globe className="w-16 h-16 mb-6" />
                    <p className="text-xl uppercase tracking-[0.5em] font-light">Hub Offline</p>
                </div>
            )}
        </div>
    </div>
  );
};