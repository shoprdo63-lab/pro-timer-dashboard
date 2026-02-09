import React from 'react';
import { AppMode, Theme } from '../types';
import { Mail, Shield, FileText, Info, Cpu, CheckCircle, Zap, Globe2, BookOpen } from 'lucide-react';

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
                    In a digital landscape often cluttered with distractions and invasive tracking, we sought to build a sanctuary of utility. Our philosophy is grounded in <strong>Calm Technology</strong>: tools that serve you quietly and reliably.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                        <Shield className="w-8 h-8 mb-3 opacity-80" />
                        <h3 className="font-bold text-white mb-1">Integrity</h3>
                        <p className="text-xs opacity-70">Zero tracking. Zero data selling.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                        <CheckCircle className="w-8 h-8 mb-3 opacity-80" />
                        <h3 className="font-bold text-white mb-1">Quality</h3>
                        <p className="text-xs opacity-70">Atomic-grade precision using browser APIs.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center">
                        <Info className="w-8 h-8 mb-3 opacity-80" />
                        <h3 className="font-bold text-white mb-1">Modesty</h3>
                        <p className="text-xs opacity-70">Clean content, safe for all environments.</p>
                    </div>
                </div>
            </div>
          </>
        );

      case AppMode.BLOG_FOCUS:
        return (
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-8">
                <Zap className="w-8 h-8" style={{ color: accentColor }} />
                <h2 className="text-3xl font-light">Neural Intervals: The Science of Focus</h2>
            </div>
            <div className="space-y-8 text-white/80 leading-relaxed">
                <p className="text-xl font-light leading-relaxed">
                    The human brain is not a machine designed for linear, infinite exertion. Instead, it operates on a series of biological rhythms known as Ultradian Cycles.
                </p>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">The 90-Minute Rhythm</h3>
                    <p>Research indicates that our levels of alertness and cognitive performance fluctuate in cycles of roughly 90 minutes. Toward the end of these cycles, the brain begins to exhibit signs of fatigue, leading to a decrease in beta-wave activity (associated with focus) and an increase in alpha or theta waves (associated with daydreaming and relaxation).</p>
                </section>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">The Pomodoro Advantage</h3>
                    <p>By implementing a 25-minute focus period, we essentially harvest the most productive segment of an ultradian cycle while it is at its peak. This prevents the cognitive "burnout" that occurs during long, unstructured work sessions. The mandatory 5-minute break acts as a "neural reset," allowing the metabolic waste products of concentration—like adenosine—to be processed more efficiently.</p>
                </section>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">Deep Work and Flow States</h3>
                    <p>Consistency is key. Training the brain to recognize the start of a Pomodoro timer as a signal for deep focus builds a psychological habit. Over time, this reduces the "activation energy" required to enter a flow state, making productivity a natural default rather than a forced effort.</p>
                </section>
            </div>
          </div>
        );

      case AppMode.BLOG_SYNC:
        return (
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-8">
                <Globe2 className="w-8 h-8" style={{ color: accentColor }} />
                <h2 className="text-3xl font-light">The Physics of Global Synchronization</h2>
            </div>
            <div className="space-y-8 text-white/80 leading-relaxed">
                <p className="text-xl font-light leading-relaxed">
                    Time is the silent protocol of the modern world. Without precise synchronization, the global economy would collapse into chaos within minutes.
                </p>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">From Atomic Clocks to Browser Ticks</h3>
                    <p>Professional timekeeping relies on Coordinated Universal Time (UTC), which is maintained by over 400 atomic clocks globally. These clocks are so precise they lose less than a second every 100 million years. Modern web applications like Yclocktb use the High Resolution Time API to sync with these standards with millisecond accuracy.</p>
                </section>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">Relativity and Time Drift</h3>
                    <p>Einstein's theory of relativity teaches us that time is not absolute. Satellites in the GPS network must account for both special and general relativity to stay synced with Earth. On a local level, "clock drift" in computers occurs due to temperature changes affecting quartz crystals. Our engine uses Web Workers to provide a steady heart-beat that resists the typical throttling of standard browser environments.</p>
                </section>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">The Digital Ledger of Time</h3>
                    <p>In high-frequency trading and blockchain technology, timestamps are the ultimate authority. Synchronization ensures that transactions are ordered correctly, preventing double-spending and ensuring market fairness. Yclocktb serves as a personal authority for these temporal reference points.</p>
                </section>
            </div>
          </div>
        );

      case AppMode.BLOG_PRIVACY:
        return (
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-8">
                <Shield className="w-8 h-8" style={{ color: accentColor }} />
                <h2 className="text-3xl font-light">The Privacy Imperative</h2>
            </div>
            <div className="space-y-8 text-white/80 leading-relaxed">
                <p className="text-xl font-light leading-relaxed">
                    In the era of "Big Data," the simple act of checking the time has become a vector for tracking. We believe utilities should be tools, not surveillance devices.
                </p>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">Local-First Architecture</h3>
                    <p>Most modern apps are "Cloud-First," meaning your data is sent to a server before it is shown to you. Yclocktb is "Local-First." Every alarm, timer, and preference stays within your browser's local sandbox. This architecture is fundamentally more secure because data that is never sent can never be intercepted or leaked.</p>
                </section>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">The Metadata Menace</h3>
                    <p>Even "anonymous" data can be used to fingerprint users. By eliminating server-side logging entirely, we ensure that your productivity habits—when you wake up, when you focus, where you are looking for time zones—remain your private business. We don't want your data; we want to give you back your time.</p>
                </section>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">Zero-Dependency Trust</h3>
                    <p>We avoid third-party libraries that might secretly bundle tracking scripts. Our code is lean, transparent, and focused solely on its stated purpose. This is the new standard for ethical software development in the 21st century.</p>
                </section>
            </div>
          </div>
        );

      case AppMode.BLOG_AESTHETICS:
        return (
          <div className="max-w-4xl">
            <div className="flex items-center space-x-3 mb-8">
                <BookOpen className="w-8 h-8" style={{ color: accentColor }} />
                <h2 className="text-3xl font-light">Minimalism and Cognitive Load</h2>
            </div>
            <div className="space-y-8 text-white/80 leading-relaxed">
                <p className="text-xl font-light leading-relaxed">
                    Good design is invisible. In the context of a timekeeping utility, design should facilitate information retrieval without competing for attention.
                </p>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">The Psychology of Glassmorphism</h3>
                    <p>Glassmorphism uses blurred backgrounds and semi-transparent layers to mimic the way the human eye perceives depth in the physical world. This "Z-axis" hierarchy allows the brain to quickly categorize foreground information (the time) versus background noise (the theme), reducing the cognitive effort required to process the screen.</p>
                </section>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">Reducing Interaction Cost</h3>
                    <p>Every extra click or confusing button is an "interaction cost." Our UI is optimized for immediate utility. By removing heavy solid borders and high-contrast distractions, we create a "calm" interface that doesn't trigger the brain's "alert" response, making it ideal for high-stress professional environments.</p>
                </section>
                <section className="space-y-4">
                    <h3 className="text-2xl text-white font-medium">The Aesthetics of Precision</h3>
                    <p>Clean lines and monospaced typography are not just stylistic choices; they are functional. Monospaced numbers ensure that as time ticks, the characters don't jump around (tabular nums), providing a sense of stability and exactitude that solidifies the user's trust in the tool.</p>
                </section>
            </div>
          </div>
        );

      case AppMode.HOW_IT_WORKS:
        return (
            <>
              <div className="flex items-center space-x-3 mb-8">
                  <Cpu className="w-8 h-8" style={{ color: accentColor }} />
                  <h2 className="text-3xl font-light">How It Works</h2>
              </div>
              <div className="space-y-6 text-white/80 leading-relaxed max-w-3xl">
                  <p>Yclocktb leverages modern web capabilities to deliver a native-app-like experience directly in your browser.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">Web Workers</h3>
                          <p className="text-sm opacity-70">Independent threads that stay accurate even when the tab is hidden.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">Local Storage</h3>
                          <p className="text-sm opacity-70">Alarms and settings stay on your device, never transmitted to a server.</p>
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
                  <p>Your privacy is paramount. Unlike many free tools online, <strong>Yclocktb operates on a strict Zero-Data policy.</strong></p>
                  <section><h3 className="text-xl font-medium text-white mb-2">1. Data Collection</h3><p>We do not collect, log, or share any personal information. No servers receive your data.</p></section>
                  <section><h3 className="text-xl font-medium text-white mb-2">2. Cookies</h3><p>We use Local Storage strictly for functional settings, not for tracking.</p></section>
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
                  <p>By using Yclocktb, you agree to these terms.</p>
                  <section><h3 className="text-xl font-medium text-white mb-2">1. Usage</h3><p>Free for personal and commercial use. No attribution required.</p></section>
                  <section><h3 className="text-xl font-medium text-white mb-2">2. Liability</h3><p>Provided "as is". Not liable for missed alarms or scheduling errors.</p></section>
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
                  <p className="text-lg">We value your feedback. Our team is dedicated to your productivity.</p>
                  <div className="p-10 rounded-3xl bg-white/5 border border-white/10 mt-8 flex flex-col items-center text-center shadow-lg relative overflow-hidden group">
                      <Mail className="w-12 h-12 mb-6 opacity-80" style={{ color: accentColor }} />
                      <h3 className="text-xl font-medium text-white mb-2">Get in Touch</h3>
                      <a href="mailto:magic.reviewsite@gmail.com" className="text-xl md:text-3xl font-mono font-bold hover:opacity-80 transition-all select-all break-all" style={{ color: accentColor }}>
                          magic.reviewsite@gmail.com
                      </a>
                  </div>
              </div>
            </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full p-6 animate-in fade-in duration-500">
      {renderContent()}
    </div>
  );
});