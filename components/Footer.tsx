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
            <div className="px-6 md:px-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight leading-tight">
                    Yclocktb: The Ultimate Hub for<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-normal">Global Time Synchronization & Productivity</span>
                </h3>
                
                <div className="text-base text-white/60 space-y-8 leading-relaxed max-w-4xl mb-12 text-left md:text-justify">
                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">The Evolution of Precision: Timekeeping in the Digital Era</h4>
                        <p>In today's interconnected global economy, time is far more than a simple measurement—it is the essential fabric of global synchronization. From the historical reliance on maritime chronometers to the sophisticated atomic clocks powering modern GPS satellites, the human quest for precision has always defined our progress. Today, Yclocktb brings that legacy of exactitude directly to your browser. By leveraging high-precision browser APIs and Web Worker threads, we bridge the gap between basic system clocks and professional-grade synchronization utilities.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">Why Every Millisecond Matters: From Servers to Deep Work</h4>
                        <p>For the modern professional, a single second can be the difference between success and failure. For Developers: Managing server cron jobs across multiple time zones like UTC, GMT, EST, and PST requires absolute accuracy. A one-second drift can lead to catastrophic data overlaps or deployment failures. For Researchers: Conducting time-sensitive experiments demands the millisecond-accurate stopwatch capabilities that Yclocktb provides natively.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">Science-Backed Productivity: The Pomodoro Focus Timer</h4>
                        <p>Precision isn't just for machines; it's for human performance. The Yclocktb Pomodoro Timer is engineered based on cognitive science principles. By structuring work into 25-minute deep focus intervals followed by 5-minute recovery periods, users can effectively bypass the "procrastination threshold" and sustain peak mental clarity throughout the day.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">The Ethical Tech Revolution: Privacy-First Timekeeping</h4>
                        <p>The modern web is unfortunately cluttered with intrusive trackers, third-party cookies, and heavy scripts that compromise your privacy and slow down your device. Yclocktb is built on a foundation of Ethical Technology: Zero External Dependencies. Our suite runs entirely on your local machine using client-side logic. No Server-Side Calls. Whether you are checking the time in Tokyo, London, or New York, no data ever leaves your browser. Privacy by Design. We do not track your location, your focus cycles, or your habits. Your time is strictly your own.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">Master Your Global Workflow with Yclocktb Utilities</h4>
                        <p>Our suite is designed to be the "silent partner" in your daily productivity stack. Professional World Clock: A comprehensive dashboard for digital nomads and global team leaders. Monitor financial markets or international logistics hubs with millisecond-accurate synchronization. High-Resolution Stopwatch: Engineered for those who demand the highest resolution of time measurement for technical calibration or athletic timing. Minimalist Pomodoro Engine: A distraction-free interface designed to induce the "Flow State," stripped of all unnecessary noise to focus purely on your next breakthrough.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">Glassmorphism Design: Where Aesthetic Meets High Performance</h4>
                        <p>We believe professional tools should be as beautiful as they are functional. Yclocktb utilizes Glassmorphism design principles—characterized by transparency, multi-layered blur, and subtle borders—to create a light, unobtrusive visual environment. This distraction-free UI ensures your cognitive load is spent on your work, not on navigating the tool.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">Global Connectivity: The Future of Synchronicity in 2026</h4>
                        <p>As we move through 2026, the boundaries of physical office spaces continue to vanish. With developers in Tel Aviv collaborating in real-time with designers in San Francisco and managers in Dubai, a shared source of truth for time is the only thing keeping global projects on track. Yclocktb serves as your Global Synchronization Hub, ensuring you are perfectly aligned with the pulse of the world, regardless of your coordinates.</p>
                    </div>

                    <div>
                        <h4 className="text-white font-medium mb-2 text-center md:text-left">A Professional Commitment to Excellence</h4>
                        <p>Yclocktb is more than just a website; it is a commitment to precision, ethics, and world-class design. We continuously refine our local algorithms to ensure the time displayed is the most accurate representation possible within a browser environment.</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/5">
                        <p>Thank you for choosing Yclocktb as your trusted partner for daily time management and global synchronization. Experience the standard of excellence.</p>
                    </div>
                </div>

                {/* CTA Button */}
                {onNavigate && (
                    <button 
                        onClick={() => onNavigate(AppMode.POMODORO)}
                        className="group relative px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.15)] hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] flex flex-col items-center gap-1 overflow-hidden"
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
                    &copy; 2026 Yclocktb Utility Suite. All rights reserved. Precision. Ethics. Design.
                </div>
            </div>
        </div>
    );
};