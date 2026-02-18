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

            {/* SEO & Authority Section - REWRITTEN FOR HIGH VALUE CONTENT */}
            <div className="px-6 md:px-10 max-w-5xl mx-auto text-left flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-light text-white mb-12 tracking-tight leading-tight text-center">
                    The Temporal Blueprint: <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 font-normal">Global Synchronization and Personal focus in the Digital Era</span>
                </h1>
                
                <div className="text-base text-white/70 space-y-10 leading-relaxed max-w-4xl mb-16 text-justify">
                    <section>
                        <h2 className="text-2xl text-white font-medium mb-4">Time is the invisible operating system of the human experience.</h2>
                        <p>In a world characterized by hyper-connectivity and decentralized labor, the concept of a "single time" has vanished. We no longer live in a world of shared sunsets; we live in a world of shared <strong>synchronization</strong>. For the modern professional, time is not merely a quantity to be spent, but a protocol to be mastered. <strong>YClockTB</strong> was engineered to provide the high-fidelity tools necessary to navigate this complex temporal landscape with scientific precision and cognitive clarity.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-medium mb-4">The Evolution of Global Synchronization</h2>
                        <h3 className="text-lg text-white font-semibold mb-2">The Architecture of Coordinated Universal Time (UTC)</h3>
                        <p>Modern global commerce relies on the silent authority of <strong>Coordinated Universal Time (UTC)</strong>. Maintained by a network of over 400 atomic clocks worldwide, UTC is the heartbeat of every financial transaction, server log, and communication packet. When a developer in London schedules a deployment for a client in Tokyo, they are relying on a shared temporal ledger that bridges 6,000 miles of geographic separation. <strong>World Clock</strong> utilities are the interface for this ledger, transforming abstract offsets into actionable data points for remote teams.</p>
                        
                        <h3 className="text-lg text-white font-semibold mb-2 mt-6">Resolving Scheduling Friction in Remote Teams</h3>
                        <p>The "collision of latitudes" occurs when the biological rhythms of a team are out of sync with their professional obligations. Asynchronous work depends on <strong>asymmetric time management</strong>. By utilizing an authoritative World Clock hub, leaders can visualize the "golden window"—the brief overlap where multiple time zones are within working hours—maximizing collaborative output while respecting individual boundaries. This visualization reduces <strong>decision fatigue</strong> and eliminates the cognitive overhead of mental math during high-stakes planning.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-medium mb-4">The Cognitive Science of Time Management</h2>
                        <h3 className="text-lg text-white font-semibold mb-2">The Psychology of the Countdown: Why Timers Work</h3>
                        <p>Neurobiologically, the human brain is sensitive to <strong>Parkinson’s Law</strong>: the adage that work expands to fill the time available for its completion. Without a defined temporal boundary, tasks often drift into a state of "infinite extension," leading to burnout and decreased quality of work. <strong>Countdown timers</strong> introduce a psychological element of "productive urgency." By creating a finite window for concentration, the brain enters a state of <strong>Cortical Arousal</strong>, increasing the speed of task processing and filtering out extraneous digital noise.</p>
                        
                        <h3 className="text-lg text-white font-semibold mb-2 mt-6">The Pomodoro Technique and Neural Recovery</h3>
                        <p>The <strong>Pomodoro Technique</strong>—the practice of working in 25-minute intervals separated by 5-minute breaks—is more than a productivity hack; it is a management strategy for the <strong>Ultradian Rhythm</strong>. Our brains operate in cycles of high focus followed by necessary recovery. Continuous exertion without periodic "neural resets" leads to the accumulation of metabolic waste products in the prefrontal cortex. Structured <strong>Focus Timers</strong> enforce these breaks, ensuring that the "cognitive tank" is never fully depleted, allowing for <strong>sustained peak performance</strong> throughout a 12-hour duty cycle.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-medium mb-4">Technical Precision: Why Milliseconds Matter</h2>
                        <h3 className="text-lg text-white font-semibold mb-2">Network Time Protocols and Developer Operations</h3>
                        <p>For developers, traders, and data scientists, precision isn't just a luxury—it's a technical requirement. <strong>Network Time Protocol (NTP)</strong> synchronization ensures that distributed systems remain coherent. In <strong>High-Frequency Trading (HFT)</strong>, a 10-millisecond drift can result in substantial financial slippage. In software development, inconsistent timestamps can corrupt <strong>database integrity</strong> and make debugging distributed architectures nearly impossible. <strong>YClockTB</strong> leverages high-resolution browser APIs to provide a reference point that mirrors the precision required for enterprise-grade operations.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-medium mb-4">Optimizing Your Daily Routine with YClockTB</h2>
                        <p>Mastering time requires a multi-faceted approach. Here are five practical ways to integrate authoritative time tools into your professional life:</p>
                        <ul className="list-disc pl-6 space-y-4 mt-4">
                            <li><strong>The Global Anchor:</strong> Keep a World Clock open with your three most frequent collaborator zones. This builds "temporal empathy," allowing you to know exactly when to send an urgent ping versus a delayed email.</li>
                            <li><strong>Vigilance Alarms:</strong> Use our <strong>Math-Based Wake System</strong> not just for waking up, but for "shifting states." If you struggle to transition from deep coding to a management meeting, set an alarm that requires cognitive engagement to dismiss.</li>
                            <li><strong>Sprint Tracking:</strong> Use the <strong>Stopwatch</strong> to time "standard tasks." Knowing that writing a technical brief takes exactly 42 minutes allows you to schedule your day with surgical accuracy.</li>
                            <li><strong>Micro-Break Enforcement:</strong> Set a <strong>Timer</strong> for 60 minutes of hydration and posture checks. Digital workers often forget their physical needs; temporal reminders act as a safety net for physical longevity.</li>
                            <li><strong>Focus Engine:</strong> Dedicate the first 3 hours of your day to <strong>Pomodoro Focus</strong> sessions. By the time the world starts sending emails, your most difficult tasks are already complete.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-white font-medium mb-4 text-center">Conclusion: Sovereignty Over the Clock</h2>
                        <p className="italic text-center">"Time is what we want most, but what we use worst." — William Penn</p>
                        <p className="mt-6">The goal of <strong>YClockTB</strong> is to transform time from a chaotic force of nature into a structured tool for human excellence. By combining the physics of global synchronization with the psychology of focus, we provide a unified interface for the modern digital worker. True productivity is not about working more hours; it is about reclaiming <strong>sovereignty</strong> over the hours you have. In the digital era, the most valuable currency is focused attention, and the most powerful asset is a precisely synchronized life.</p>
                    </section>
                </div>

                {/* CTA Button */}
                {onNavigate && (
                    <button 
                        type="button"
                        onClick={() => onNavigate(AppMode.POMODORO)}
                        className="group relative px-10 py-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_50px_rgba(59,130,246,0.2)] hover:shadow-[0_0_80px_rgba(59,130,246,0.4)] flex flex-col items-center gap-1 overflow-hidden cursor-pointer mb-20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="flex items-center space-x-3 relative z-10">
                            <span className="text-xl font-medium text-white tracking-wide">Enter the Focus Hub</span>
                            <ArrowRight className="w-6 h-6 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.4em] text-white/40 group-hover:text-white/70 transition-colors relative z-10 font-bold">
                            Experience the standard of professional excellence
                        </span>
                    </button>
                )}

                <div className="mt-16 text-xs text-white/20 font-mono flex items-center gap-4">
                    <span>&copy; 2026 YclockTB Authority.</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                    <span>NTP Stratum 1 Precision.</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                    <span>Privacy First Architecture.</span>
                </div>
            </div>
        </div>
    );
});