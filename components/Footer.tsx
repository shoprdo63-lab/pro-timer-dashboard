import React from 'react';
import { AppMode } from '../types';
import { ArrowRight, BookOpen, ShieldCheck, Zap, Globe2 } from 'lucide-react';

interface FooterProps {
    onNavigate?: (mode: AppMode) => void;
}

export const Footer = React.memo<FooterProps>(({ onNavigate }) => {
    return (
        <div className="w-full mt-12 pb-12 border-t border-white/10">
            {/* Navigation Links */}
            {onNavigate && (
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 pt-8 text-sm font-medium text-white/50">
                    <button type="button" onClick={() => onNavigate(AppMode.ABOUT)} className="hover:text-white transition-colors cursor-pointer">About Us</button>
                    <button type="button" onClick={() => onNavigate(AppMode.HOW_IT_WORKS)} className="hover:text-white transition-colors cursor-pointer">How It Works</button>
                    <button type="button" onClick={() => onNavigate(AppMode.PRIVACY)} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
                    <button type="button" onClick={() => onNavigate(AppMode.TERMS)} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
                    <button type="button" onClick={() => onNavigate(AppMode.CONTACT)} className="hover:text-white transition-colors cursor-pointer">Contact Support</button>
                </div>
            )}

            {/* Professional Blog & Insights Section */}
            <div className="max-w-6xl mx-auto px-6 mb-24">
                <div className="flex flex-col items-center mb-16 text-center">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
                        <BookOpen className="w-3 h-3" />
                        <span>Chronometric Insights & Research</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-4">The Science of Time & Focus</h2>
                    <p className="text-white/40 max-w-2xl text-sm leading-relaxed">Exploring the intersection of temporal precision, cognitive performance, and digital sovereignty in the modern era.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Blog Post 1 */}
                    <article className="glass-card p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-blue-500/10 transition-colors">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Research / Focus</span>
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-4 leading-tight">Neural Intervals: Why The Pomodoro Technique Reshapes Focus</h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            Human cognitive architecture is not designed for indefinite concentration. Recent studies in neurobiology suggest that the "focus muscle" experiences fatigue similar to physical exertion. The structured 25-minute interval...
                        </p>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Read Time: 6 mins</span>
                            <button 
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onNavigate?.(AppMode.BLOG_FOCUS); }}
                                className="text-blue-400 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer relative z-20"
                            >
                                Explore Analysis →
                            </button>
                        </div>
                    </article>

                    {/* Blog Post 2 */}
                    <article className="glass-card p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                                <Globe2 className="w-6 h-6 text-emerald-400" />
                            </div>
                            <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Global / Dynamics</span>
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-4 leading-tight">The Physics of Synchronization in a Decentralized World</h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            In a globalized economy, time zones are no longer just geographic markers; they are the protocol for international trade. Synchronization across UTC, EST, and JST allows for the seamless execution...
                        </p>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Read Time: 8 mins</span>
                            <button 
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onNavigate?.(AppMode.BLOG_SYNC); }}
                                className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer relative z-20"
                            >
                                Explore Analysis →
                            </button>
                        </div>
                    </article>

                    {/* Blog Post 3 */}
                    <article className="glass-card p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-amber-500/10 transition-colors">
                                <ShieldCheck className="w-6 h-6 text-amber-400" />
                            </div>
                            <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Security / Ethics</span>
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-4 leading-tight">The Privacy Imperative: Why Client-Side Utility Matters</h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            Privacy is often sacrificed for convenience in modern web applications. However, professional utilities do not require centralized tracking to function. By keeping all calculations local...
                        </p>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Read Time: 5 mins</span>
                            <button 
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onNavigate?.(AppMode.BLOG_PRIVACY); }}
                                className="text-amber-400 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer relative z-20"
                            >
                                Explore Analysis →
                            </button>
                        </div>
                    </article>

                    {/* Blog Post 4 */}
                    <article className="glass-card p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-all group">
                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-purple-500/10 transition-colors">
                                <BookOpen className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="text-[10px] font-mono opacity-20 uppercase tracking-widest">Design / UX</span>
                        </div>
                        <h3 className="text-2xl font-medium text-white mb-4 leading-tight">Aesthetic Minimalism as a Tool for Cognitive Reduction</h3>
                        <p className="text-white/50 text-sm leading-relaxed mb-6">
                            Visual noise directly impacts decision-making speed. Glassmorphism is more than a design trend; it is an exercise in visual hierarchy. By using transparency and depth, we allow focus...
                        </p>
                        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Read Time: 7 mins</span>
                            <button 
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onNavigate?.(AppMode.BLOG_AESTHETICS); }}
                                className="text-purple-400 text-[10px] font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform cursor-pointer relative z-20"
                            >
                                Explore Analysis →
                            </button>
                        </div>
                    </article>
                </div>
            </div>

            {/* SEO & Authority Section */}
            <div className="px-6 md:px-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight leading-tight">
                    Yclock: The Ultimate Hub for<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-normal">Global Time Synchronization & Productivity</span>
                </h3>
                
                <div className="text-base text-white/60 space-y-8 leading-relaxed max-w-4xl mb-12 text-left md:text-justify">
                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">The Evolution of Precision: Timekeeping in the Digital Era</h4>
                        <p>In today's interconnected global economy, time is far more than a simple measurement—it is the essential fabric of global synchronization. From the historical reliance on maritime chronometers to the sophisticated atomic clocks powering modern GPS satellites, the human quest for precision has always defined our progress. Today, Yclock brings that legacy of exactitude directly to your browser. By leveraging high-precision browser APIs and Web Worker threads, we bridge the gap between basic system clocks and professional-grade synchronization utilities.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">Why Every Millisecond Matters: From Servers to Deep Work</h4>
                        <p>For the modern professional, a single second can be the difference between success and failure. For Developers: Managing server cron jobs across multiple time zones like UTC, GMT, EST, and PST requires absolute accuracy. A one-second drift can lead to catastrophic data overlaps or deployment failures. For Researchers: Conducting time-sensitive experiments demands the millisecond-accurate stopwatch capabilities that Yclock provides natively.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">Science-Backed Productivity: The Pomodoro Focus Timer</h4>
                        <p>Precision isn't just for machines; it's for human performance. The Yclock Pomodoro Timer is engineered based on cognitive science principles. By structuring work into 25-minute deep focus intervals followed by 5-minute recovery periods, users can effectively bypass the "procrastination threshold" and sustain peak mental clarity throughout the day.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">The Ethical Tech Revolution: Privacy-First Timekeeping</h4>
                        <p>The modern web is unfortunately cluttered with intrusive trackers, third-party cookies, and heavy scripts that compromise your privacy and slow down your device. Yclock is built on a foundation of Ethical Technology: Zero External Dependencies. Our suite runs entirely on your local machine using client-side logic. No Server-Side Calls. Whether you are checking the time in Tokyo, London, or New York, no data ever leaves your browser. Privacy by Design. We do not track your location, your focus cycles, or your habits. Your time is strictly your own.</p>
                    </div>
                </div>

                {/* CTA Button */}
                {onNavigate && (
                    <button 
                        type="button"
                        onClick={() => onNavigate(AppMode.POMODORO)}
                        className="group relative px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] flex flex-col items-center gap-1 overflow-hidden cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex items-center space-x-2 relative z-10">
                            <span className="text-lg font-medium text-white tracking-wide">Start Focusing</span>
                            <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors relative z-10">
                            Experience the standard of excellence
                        </span>
                    </button>
                )}

                <div className="mt-16 text-xs text-white/20 font-mono">
                    &copy; 2026 Yclock Utility Suite. All rights reserved. Precision. Ethics. Design.
                </div>
            </div>
        </div>
    );
});