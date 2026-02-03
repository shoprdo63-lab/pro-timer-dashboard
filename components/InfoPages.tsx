import React from 'react';
import { AppMode, Theme } from '../types';
import { Mail, Shield, FileText, Info, Cpu, CheckCircle } from 'lucide-react';

interface InfoViewProps {
  mode: AppMode;
  theme?: Theme;
}

export const InfoView = React.memo<InfoViewProps>(({ mode, theme }) => {
  const accentColor = theme?.colors.accent || '#3b82f6';

  const renderContent = () => {
    switch (mode) {
      case AppMode.ABOUT:
        return (
          <>
            <div className="flex items-center space-x-3 mb-8">
                <Info className="w-8 h-8" style={{ color: accentColor }} />
                <h2 className="text-3xl font-light">About Us</h2>
            </div>
            <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl">
                <p className="text-lg">
                    Welcome to <strong>Yclocktb</strong>, a premium digital utility suite engineered for precision, focus, and digital ethics.
                </p>
                <p>
                    In a digital landscape often cluttered with distractions and invasive tracking, we sought to build a sanctuary of utility. 
                    Our philosophy is grounded in <strong>Calm Technology</strong>: tools that serve you quietly and reliably, without demanding your attention unnecessarily.
                </p>
                <p>
                    We are a team of dedicated developers passionate about chronometry—the science of time measurement. We meticulously craft every pixel and optimize every line of code to ensure that when you check the time, set an alarm, or engage in a deep work session, the experience is seamless, beautiful, and respectful.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                        <Shield className="w-8 h-8 mb-3 opacity-80" />
                        <h3 className="font-bold text-white mb-1">Integrity</h3>
                        <p className="text-xs opacity-70">Zero tracking. Zero data selling. Your privacy is non-negotiable.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                        <CheckCircle className="w-8 h-8 mb-3 opacity-80" />
                        <h3 className="font-bold text-white mb-1">Quality</h3>
                        <p className="text-xs opacity-70">Atomic-grade precision using advanced browser APIs.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                        <Info className="w-8 h-8 mb-3 opacity-80" />
                        <h3 className="font-bold text-white mb-1">Modesty</h3>
                        <p className="text-xs opacity-70">Clean content, safe for all environments and ages.</p>
                    </div>
                </div>
            </div>
          </>
        );
      case AppMode.HOW_IT_WORKS:
        return (
            <>
              <div className="flex items-center space-x-3 mb-8">
                  <Cpu className="w-8 h-8" style={{ color: accentColor }} />
                  <h2 className="text-3xl font-light">How It Works</h2>
              </div>
              <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl">
                  <p>
                      Yclocktb leverages the latest capabilities of modern web browsers to deliver a native-app-like experience directly in your browser, without requiring any downloads.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-green-400"></span> Web Workers
                          </h3>
                          <p className="text-sm opacity-70">
                              Standard websites often pause or "throttle" when you switch tabs to save battery, causing timers to drift. We utilize independent "Web Worker" threads that run in the background, ensuring your stopwatch and timer stay accurate to the millisecond, even when the tab is hidden or minimized.
                          </p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-blue-400"></span> Local Storage
                          </h3>
                          <p className="text-sm opacity-70">
                              We operate without a central database. Your alarms, world clock cities, and theme preferences are encrypted and stored directly in your browser's Local Storage. This guarantees that your data physically remains on your device and is never transmitted to us.
                          </p>
                      </div>
                  </div>
              </div>
            </>
        );
      case AppMode.PRIVACY:
        return (
            <>
              <div className="flex items-center space-x-3 mb-8">
                  <Shield className="w-8 h-8" style={{ color: accentColor }} />
                  <h2 className="text-3xl font-light">Privacy Policy</h2>
              </div>
              <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl">
                  <p className="text-sm opacity-50 uppercase tracking-widest border-b border-white/10 pb-4 mb-4">Last Updated: 2026</p>
                  <p>
                      Your privacy is paramount. Unlike many free tools online, <strong>Yclocktb operates on a strict Zero-Data policy.</strong>
                  </p>
                  
                  <section>
                    <h3 className="text-xl font-medium text-white mb-2">1. Data Collection</h3>
                    <p>
                        We do not collect, log, store, or share any personal information. We do not have servers that receive your usage data. When you set an alarm labeled "Important Meeting," that text exists solely in your browser's volatile memory and local storage.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-medium text-white mb-2">2. Cookies & Tracking</h3>
                    <p>
                        We do not use tracking cookies or pixels. We use "Local Storage" strictly for functional purposes—to remember your settings between visits. This is technically essential for the app to function and is not used for analytics or advertising.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-medium text-white mb-2">3. Third Parties</h3>
                    <p>
                        We do not integrate with third-party ad networks, social media trackers, or analytics providers. Your browsing habits remain your own.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-medium text-white mb-2">4. Safety & Content</h3>
                    <p>
                        Our application is designed to be safe for all ages and environments. We do not display inappropriate content, ads, or external links to unsafe domains.
                    </p>
                  </section>
              </div>
            </>
        );
      case AppMode.TERMS:
        return (
            <>
              <div className="flex items-center space-x-3 mb-8">
                  <FileText className="w-8 h-8" style={{ color: accentColor }} />
                  <h2 className="text-3xl font-light">Terms of Service</h2>
              </div>
              <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl">
                  <p>
                      By accessing and using Yclocktb, you agree to the following terms and conditions.
                  </p>
                  
                  <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-medium text-white mb-2">1. Usage License</h3>
                        <p>
                            Yclocktb is free for personal, educational, and commercial use. You may use our timers and clocks for presentations, livestreams, or personal productivity without attribution, though it is appreciated.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium text-white mb-2">2. Limitation of Liability</h3>
                        <p>
                            <strong>The service is provided "as is".</strong> While we implement advanced drift-correction algorithms and fail-safes, Yclocktb is a web-based utility dependent on your browser version, battery status, and device hardware. We are not liable for any consequential damages resulting from missed alarms, timers, or scheduling errors (e.g., missed flights, medication times). For critical life-safety applications, please use dedicated hardware.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium text-white mb-2">3. User Conduct</h3>
                        <p>
                            You agree not to misuse the application, attempt to reverse-engineer the code for malicious purposes, or use the platform in violation of any local laws.
                        </p>
                      </div>
                  </div>
              </div>
            </>
        );
      case AppMode.CONTACT:
        return (
            <>
              <div className="flex items-center space-x-3 mb-8">
                  <Mail className="w-8 h-8" style={{ color: accentColor }} />
                  <h2 className="text-3xl font-light">Contact Support</h2>
              </div>
              <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl">
                  <p className="text-lg">
                      We value your feedback. Whether you have found a bug, want to request a feature, or simply want to say hello, we are here to listen.
                  </p>
                  
                  <div className="p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 mt-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden group">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Mail className="w-12 h-12 mb-6 opacity-80" style={{ color: accentColor }} />
                      <h3 className="text-xl font-medium text-white mb-2">Get in Touch</h3>
                      <div className="mb-8 flex flex-col items-center gap-2">
                         <p className="opacity-60">We aim to respond to all respectful inquiries within 24 hours.</p>
                         <p className="text-sm bg-white/10 px-4 py-2 rounded-full text-white/90 font-bold border border-white/20">
                             Important: Please mention you are contacting us from <span style={{ color: accentColor }}>Yclocktb</span> in your email.
                         </p>
                      </div>
                      <a href="mailto:magic.reviewsite@gmail.com" className="text-xl md:text-3xl font-mono font-bold hover:opacity-80 transition-all select-all break-all" style={{ color: accentColor }}>
                          magic.reviewsite@gmail.com
                      </a>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10">
                      <h3 className="text-lg font-medium text-white mb-6">Common Questions</h3>
                      <div className="space-y-4">
                          <details className="group bg-white/5 rounded-xl p-4 cursor-pointer border border-white/5 hover:border-white/10 transition-colors">
                              <summary className="font-medium flex justify-between items-center list-none text-white/90">
                                  <span>Why didn't my alarm go off?</span>
                                  <span className="transition-transform group-open:rotate-180 opacity-50">▼</span>
                              </summary>
                              <p className="mt-4 text-sm opacity-70 leading-relaxed border-t border-white/5 pt-4">
                                  Modern browsers often put inactive tabs to "sleep" to save battery. While we use Web Workers to mitigate this, please ensure your computer doesn't enter Sleep Mode if you are relying on a long-term alarm.
                              </p>
                          </details>
                          <details className="group bg-white/5 rounded-xl p-4 cursor-pointer border border-white/5 hover:border-white/10 transition-colors">
                              <summary className="font-medium flex justify-between items-center list-none text-white/90">
                                  <span>Is this site free?</span>
                                  <span className="transition-transform group-open:rotate-180 opacity-50">▼</span>
                              </summary>
                              <p className="mt-4 text-sm opacity-70 leading-relaxed border-t border-white/5 pt-4">
                                  Yes, Yclocktb is 100% free. We built this as a clean, ethical alternative to ad-heavy timer sites.
                              </p>
                          </details>
                      </div>
                  </div>
              </div>
            </>
        );
      default:
        return null;
    }
});