import React from 'react';

export const Footer: React.FC = () => {
    return (
        <div className="w-full mt-12 pb-12 border-t border-white/10">
            {/* SEO & Authority Section */}
            <div className="px-6 md:px-10 max-w-5xl mx-auto text-center pt-12">
                <h3 className="text-2xl font-light text-white mb-6">Precision Timekeeping & Global Synchronization</h3>
                <div className="text-sm text-white/40 space-y-4 leading-relaxed text-justify md:text-center columns-1 md:columns-2 gap-8">
                    <p>
                        In our interconnected digital era, the accuracy of time measurement is not merely a convenience but a cornerstone of global infrastructure. 
                        Yclock utilizes browser-based high-precision APIs combined with Web Worker threads to minimize drift, mimicking the reliability of atomic clocks. 
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
                        Thank you for trusting Yclock for your daily time management needs.
                    </p>
                </div>
                <div className="mt-8 text-xs text-white/20">
                    &copy; {new Date().getFullYear()} Yclock Utility Suite. All rights reserved. Precision. Ethics. Design.
                </div>
            </div>
        </div>
    );
};