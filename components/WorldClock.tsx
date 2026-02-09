import React, { useEffect, useState } from 'react';
import { Plus, X, Globe, Search } from 'lucide-react';
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
    <div className="flex flex-col w-full p-6 space-y-6">
        <header className="flex justify-between items-center shrink-0">
            <div>
                <h2 className="text-3xl font-light tracking-tight">World Clock</h2>
                <p className="opacity-40 text-sm mt-1">Global synchronization hub</p>
            </div>
            <button 
                onClick={() => setIsAdding(!isAdding)}
                className={`p-3 rounded-full transition-all border border-white/10 backdrop-blur-md`}
                style={{ backgroundColor: isAdding ? accentColor : 'rgba(255,255,255,0.05)' }}
            >
                <Plus className={`w-6 h-6 text-white transition-transform ${isAdding ? 'rotate-45' : ''}`} />
            </button>
        </header>

        {isAdding && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-4 space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                    <input 
                        type="text" 
                        placeholder="Search city or country..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/30"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
                    {filteredZones.map(z => (
                        <button 
                            key={z.city}
                            onClick={() => addZone(z)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm transition-colors"
                        >
                            {z.city}, {z.region}
                        </button>
                    ))}
                </div>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedZones.map((zone) => (
                <div 
                    key={zone.city} 
                    className="p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-40 group relative overflow-hidden"
                    style={{ background: theme?.colors.glassCard }}
                >
                    <div className="flex justify-between items-start z-10">
                        <div>
                            <h3 className="text-xl font-medium">{zone.city}</h3>
                            <p className="text-xs opacity-40 uppercase tracking-widest">{zone.region}</p>
                        </div>
                        <button onClick={() => removeZone(zone.city)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/10 rounded text-red-400">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="z-10">
                        <div className="text-4xl font-mono font-bold tracking-tighter tabular-nums">
                            {getZoneTime(zone.zone)}
                        </div>
                    </div>
                    {/* Background Icon Decoration */}
                    <Globe className="absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.03] rotate-12" />
                </div>
            ))}
        </div>
    </div>
  );
};