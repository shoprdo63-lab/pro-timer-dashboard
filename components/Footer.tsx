import React from 'react';
import { AppMode } from '../types';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
    onNavigate?: (mode: AppMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <div className="w-full mt-12 pb-12 border-t border-white/10">
            {/* Navigation Links */}
            {onNavigate && (
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 pt-8 text-sm font-medium text-white/50">
                    <button onClick={() => onNavigate(AppMode.ABOUT)} className="hover:text-white transition-colors">About Us</button>
                    <button onClick={() => onNavigate(AppMode.HOW_IT_WORKS)} className="hover:text-white transition-colors">How It Works</button>
                    <button onClick={() => onNavigate(AppMode.PRIVACY)} className="hover:text-white transition-colors">Privacy Policy</button>
                    <button onClick={() => onNavigate(AppMode.TERMS)} className="hover:text-white transition-colors">Terms of Service</button>
                    <button onClick={() => onNavigate(AppMode.CONTACT)} className="hover:text-white transition-colors">Contact Support</button>
                </div>
            )}

            {/* SEO & Authority Section */}
            <div className="px-6 md:px-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight leading-tight">
                    Master Every Second.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-normal">Sync Your Ambition.</span>
                </h3>
                
                <div className="text-base md:text-lg text-white/60 space-y-6 leading-relaxed max-w-2xl mb-12">
                    <p>
                        In a world that never sleeps, precision isn’t a luxury—it’s your competitive edge. Yclock is a high-performance engine for your most valuable resource: Time. By utilizing atomic-grade synchronization and browser-native precision, we eliminate the lag of the modern web, delivering the exactitude required by New York’s trading floors and Dubai’s global logistics hubs.
                    </p>
                    <p>
                        Whether you are a developer managing mission-critical infrastructure across UTC, GMT, and PST, or a professional crushing deep-work sessions with our Pomodoro engine, Yclock provides world-class reliability. No tracking, no external dependencies—just pure, ethical technology designed for those who build the future.
                    </p>
                </div>

                {/* CTA Button */}
                {onNavigate && (
                    <button 
                        onClick={() => onNavigate(AppMode.POMODORO)}
                        className="group relative px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] flex flex-col items-center gap-1 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex items-center space-x-2 relative z-10">
                            <span className="text-lg font-medium text-white tracking-wide">Optimize My Time</span>
                            <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors relative z-10">
                            Join the elite syncing their world with millisecond precision
                        </span>
                    </button>
                )}

                <div className="mt-16 text-xs text-white/20 font-mono">
                    &copy; 2026 Yclock Utility Suite. All rights reserved. Precision. Ethics. Design.
                </div>
            </div>
        </div>
    );
};