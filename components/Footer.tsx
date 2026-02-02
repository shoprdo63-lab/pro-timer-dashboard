import React from 'react';
import { MASTER_DATA } from '../constants';

export const Footer: React.FC = () => {
    return (
        <div className="w-full mt-12 pb-12 border-t border-white/10">
            {/* Divider */}
            <div className="flex items-center justify-center -mt-3 mb-10">
                <span className="bg-[#0f172a] px-4 text-xs font-bold text-white/30 uppercase tracking-widest">Sponsored Content</span>
            </div>

            {/* Ads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-10 mb-16">
                {MASTER_DATA.SPONSORED_ADS.map((ad) => (
                    <div 
                        key={ad.id} 
                        className="group relative bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    >
                        <div className="relative h-40 overflow-hidden">
                             <img src={ad.imageURL} alt={ad.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                             <span className="absolute top-2 right-2 bg-black/60 backdrop-blur text-[10px] px-2 py-0.5 rounded text-white/80 border border-white/10">
                                AD
                             </span>
                        </div>
                        <div className="p-4">
                            <div className="text-xs text-blue-400 font-bold mb-1 uppercase tracking-wider">{ad.category}</div>
                            <h4 className="text-sm font-semibold text-white mb-2 leading-tight">{ad.title}</h4>
                            <p className="text-xs text-white/50 leading-relaxed">{ad.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* SEO & Authority Section */}
            <div className="px-6 md:px-10 max-w-5xl mx-auto text-center border-t border-white/5 pt-12">
                <h3 className="text-2xl font-light text-white mb-6">Precision Timekeeping & Global Synchronization</h3>
                <div className="text-sm text-white/40 space-y-4 leading-relaxed text-justify md:text-center columns-1 md:columns-2 gap-8">
                    <p>
                        In our interconnected digital era, the accuracy of time measurement is not merely a convenience but a cornerstone of global infrastructure. 
                        GlassChronos utilizes browser-based high-precision APIs combined with Web Worker threads to minimize drift, mimicking the reliability of atomic clocks. 
                        From financial markets in New York to logistics hubs in Dubai, synchronized timekeeping ensures the seamless operation of the global economy.
                    </p>
                    <p>
                        Our suite of tools—including the advanced World Clock, Millisecond-Precision Stopwatch, and Pomodoro Focus Timer—is designed for professionals 
                        who demand exactitude. Whether you are a developer managing server cron jobs across multiple time zones (UTC, GMT, EST, PST) or a researcher 
                        timing critical experiments, reliability is paramount. The integration of local storage ensures your customized alarms and difficulty settings persist, 
                        respecting your workflow and privacy without external server dependencies.
                    </p>
                    <p>
                        We are committed to ethical technology. This platform is built to be a clean, distraction-free environment that promotes productivity and mental well-being. 
                        By combining aesthetic Glassmorphism design principles with robust engineering, we provide a utility that respects both your time and your visual attention. 
                        Thank you for trusting GlassChronos for your daily time management needs.
                    </p>
                </div>
                <div className="mt-8 text-xs text-white/20">
                    &copy; {new Date().getFullYear()} GlassChronos Utility Suite. All rights reserved. Precision. Ethics. Design.
                </div>
            </div>
        </div>
    );
};