import React, { useEffect, useState } from 'react';
import { Plus, X, Globe, Search } from 'lucide-react';
import { MASTER_DATA } from '../constants';
import { TimeZone, Theme } from '../types';

interface WorldClockProps {
    theme?: Theme;
    time?: Date; // Passed from parent
}

export const WorldClock: React.FC<WorldClockProps> = ({ theme, time = new Date() }) => {
  const [selectedZones, setSelectedZones] = useState<TimeZone[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load saved zones
  useEffect(() => {
    const saved = localStorage.getItem('glass_world_clock');
    if (saved) {
      setSelectedZones(JSON.parse(saved));
    } else {
      setSelectedZones([
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'New York')!,
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'London')!,
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'Tokyo')!,
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'Sydney')!,
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'Dubai')!,
        MASTER_DATA.TIME_ZONES.find(z => z.city === 'Paris')!,
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
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(time);
    } catch (e) {
      return "--:--:--";
    }
  };

  const getZoneDate = (zoneStr: string) => {
     try {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: zoneStr,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(time);
    } catch (e) {
      return "";
    }
  }

  const getOffset = (zoneStr: string) => {
    try {
        // Use formatToParts for reliable extraction of the timezone offset
        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: zoneStr,
            timeZoneName: 'shortOffset'
        }).formatToParts(time);
        
        const offsetPart = parts.find(p => p.type === 'timeZoneName');
        return offsetPart ? offsetPart.value : "";
    } catch (e) {
        return "";
    }
  }

  // Analog Clock Helpers
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
      } catch(e) {
          return { h:0, m:0, s:0, isDay: true };
      }
  }

  const filteredZones = MASTER_DATA.TIME_ZONES.filter(z => 
    z.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
    z.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const accentColor = theme?.colors.accent || '#3b82f6';

  return (
    <div className="flex flex-col w-full p-6 space-y-6">
        {/* Sticky Header Section */}
        <header className="flex flex-col space-y-4 shrink-0 relative z-40 sticky top-0 pt-2 pb-4 -mt-2 -mx-6 px-6 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 transition-colors">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-light tracking-tight text-white">World Clock</h2>
                    <p className="opacity-40 text-sm mt-1">International sync</p>
                </div>
                <button 
                    onClick={() => setIsAdding(!isAdding)}
                    className="p-3 rounded-full hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md z-30 relative shadow-lg"
                    style={{ backgroundColor: isAdding ? accentColor : 'rgba(255,255,255,0.05)' }}
                >
                    <Plus className={`w-6 h-6 text-white transition-transform duration-300 ${isAdding ? 'rotate-45' : ''}`} />
                </button>
            </div>

            {/* Search Bar - Fixed Top & High Z-Index */}
            <div className={`transition-all duration-300 ease-in-out overflow-visible ${isAdding ? 'opacity-100 translate-y-0 max-h-24' : 'opacity-0 -translate-y-4 max-h-0 pointer-events-none'}`}>
                 <div className="relative z-50">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 opacity-40" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search city..."
                        className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 shadow-xl relative z-50"
                        style={{ '--tw-ring-color': accentColor } as any}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {/* Search Results Dropdown */}
                    {searchQuery && (
                        <div className="absolute z-[60] w-full mt-2 bg-[#0f172a] border border-white/20 rounded-xl max-h-64 overflow-y-auto shadow-2xl ring-1 ring-black/10">
                            {filteredZones.map((z) => (
                                <button
                                    key={z.city}
                                    onClick={() => addZone(z)}
                                    className="w-full text-left px-4 py-3 hover:bg-white/10 flex justify-between items-center border-b border-white/5 last:border-0 transition-colors"
                                >
                                    <span className="text-white font-medium">{z.city}, {z.region}</span>
                                    <span className="text-xs opacity-50 bg-white/5 px-2 py-1 rounded">{z.zone}</span>
                                </button>
                            ))}
                            {filteredZones.length === 0 && (
                                <div className="px-4 py-3 text-white/40 text-sm">No cities found</div>
                            )}
                        </div>
                    )}
                 </div>
            </div>
        </header>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10 w-full">
            {selectedZones.map((zone) => {
                const timeStr = getZoneTime(zone.zone);
                const { h, m, s, isDay } = getHandAngles(zone.zone);

                return (
                    <div 
                        key={zone.city} 
                        className="rounded-2xl p-6 relative group transition-colors duration-300 border border-white/5 hover:border-white/10 overflow-hidden flex flex-col justify-between h-48 w-full shadow-lg" 
                        style={{ background: theme?.colors.glassCard }}
                    >
                        {/* Header Row */}
                        <div className="flex justify-between items-start relative z-10 w-full">
                            <div className="min-w-0 flex-1 mr-2 overflow-hidden">
                                <h3 className="text-xl font-medium truncate w-full" title={zone.city}>{zone.city}</h3>
                                <p className="text-sm opacity-50 truncate w-full">{getZoneDate(zone.zone)}</p>
                            </div>
                            <button 
                                onClick={() => removeZone(zone.city)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-red-400 transition-all shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        
                        {/* Time Row */}
                        <div className="flex items-end justify-between relative z-10 mt-2 w-full">
                             <div className="flex flex-col min-w-0 mr-4 flex-1">
                                <div className="text-4xl font-mono font-light tracking-tighter whitespace-nowrap overflow-hidden text-ellipsis">
                                    {timeStr}
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="text-xs font-bold bg-white/10 px-2 py-0.5 rounded opacity-70 whitespace-nowrap">
                                        {getOffset(zone.zone)}
                                    </span>
                                    {isDay ? (
                                        <Globe className="w-4 h-4 text-yellow-400/80 shrink-0" />
                                    ) : (
                                        <Globe className="w-4 h-4 text-blue-400/80 shrink-0" />
                                    )}
                                </div>
                            </div>
                            
                            {/* Analog Clock Visualization */}
                            <div className="w-24 h-24 shrink-0 relative rounded-full border-2 border-white/10 bg-black/20 shadow-inner">
                                {/* Markers */}
                                {[0, 90, 180, 270].map(deg => (
                                    <div key={deg} className="absolute w-1 h-1 bg-white/40 rounded-full" 
                                         style={{ 
                                             top: '50%', left: '50%', 
                                             transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-38px)` 
                                         }} 
                                    />
                                ))}

                                {/* Hands Container - Centered */}
                                <div className="absolute inset-0">
                                    {/* Hour Hand */}
                                    <div 
                                        className="absolute top-1/2 left-1/2 w-1.5 bg-white rounded-full shadow-sm z-10"
                                        style={{ 
                                            height: '25%', 
                                            transformOrigin: '50% 100%',
                                            transform: `translate(-50%, -100%) rotate(${h}deg)`,
                                            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
                                        }}
                                    />
                                    {/* Minute Hand */}
                                    <div 
                                        className="absolute top-1/2 left-1/2 w-1 bg-white/90 rounded-full shadow-sm z-20"
                                        style={{ 
                                            height: '38%', 
                                            transformOrigin: '50% 100%',
                                            transform: `translate(-50%, -100%) rotate(${m}deg)`,
                                            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
                                        }}
                                    />
                                    {/* Second Hand */}
                                    <div 
                                        className="absolute top-1/2 left-1/2 w-0.5 rounded-full shadow-sm z-30"
                                        style={{ 
                                            height: '42%', 
                                            backgroundColor: accentColor, 
                                            transformOrigin: '50% 100%',
                                            transform: `translate(-50%, -100%) rotate(${s}deg)`,
                                            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
                                        }}
                                    />
                                    {/* Center Cap */}
                                    <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-md border border-gray-300 z-40" />
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