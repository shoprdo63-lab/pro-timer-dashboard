import React from 'react';
import { AppMode, Theme } from '../types';
import { Mail, Shield, FileText, Info, Cpu, CheckCircle, Zap, Globe2, BookOpen, Clock, Activity, Target } from 'lucide-react';

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
          <article className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-8 h-8" style={{ color: accentColor }} />
                  <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-30">Expert Masterclass</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">Beyond the Clock: How Digital Timers and the Pomodoro Technique Rewire Your Brain for Deep Focus</h1>
              <p className="text-white/40 text-lg italic">A neuro-scientific exploration into the mechanics of sustained cognitive performance.</p>
            </header>

            <div className="prose prose-invert max-w-none space-y-8 text-white/70 leading-relaxed text-lg">
                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">The Myth of Linear Concentration</h2>
                    <p>
                        In the modern era of the "always-on" economy, the prevailing productivity myth is that concentration is a linear resource—something that can be extracted continuously like fuel from a tank. However, neuro-biological research reveals that the human brain operates on <strong>Ultradian Rhythms</strong>, cycles of high-frequency brain activity followed by mandatory recovery periods. When you attempt to force "Deep Work" for three consecutive hours without interruption, you are not being productive; you are experiencing <strong>Cognitive Friction</strong>.
                    </p>
                    <p>
                        <strong>YClockTB’s Focus Engine</strong> is designed to align with these biological pulses. By utilizing the <strong>Pomodoro Technique</strong>, users essentially "harvest" the most potent segment of their cortical arousal cycle, ensuring that the Prefrontal Cortex (PFC)—the seat of complex decision-making—remains oxygenated and efficient.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">Parkinson’s Law and the Psychology of the Countdown</h2>
                    <p>
                        Cyril Northcote Parkinson famously observed that "work expands so as to fill the time available for its completion." This is not just a social observation; it is a psychological imperative. Without a defined temporal boundary, the brain perceives a task as infinite. This lead to "Attention Residue," where parts of your focus are still lingering on the previous email or the upcoming lunch, rather than the task at hand.
                    </p>
                    <p>
                        A <strong>Productivity Timer</strong> creates a visual and psychological "finish line." The sight of a countdown timer—especially one rendered with high precision—triggers a mild release of adrenaline and dopamine. This neuro-chemical cocktail narrows your perceptual field, filtering out extraneous digital noise and allowing for a state of <strong>hyper-focus</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">Rewiring the Brain: From Distraction to Flow</h2>
                    <p>
                        Every time you respond to a notification while working, you pay a "Switching Cost." It takes an average of 23 minutes to return to deep focus after a single interruption. By committing to 25-minute intervals, you are essentially training your neural pathways to resist the urge for instant gratification. This is known as <strong>Neuroplasticity</strong> in action. Over months of consistent use, the brain develops a "Focus Default," making the entry into a <strong>Flow State</strong> faster and more sustainable.
                    </p>
                    <p>
                        The <strong>Pomodoro Hub</strong> on YClockTB isn't just a timer; it's a trainer for your biological operating system. It enforces the recovery periods (Neural Breaks) that are required to flush out metabolic waste products (like adenosine) from the brain, ensuring that your 5th focus session of the day is just as sharp as your 1st.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">Conclusion: Reclaiming Cognitive Sovereignty</h2>
                    <p>
                        Mastering focus is the ultimate competitive advantage in the 21st century. By leveraging the science of <strong>Timed Intervals</strong>, you move from being a victim of your schedule to being the architect of your attention. Precision timing is the first step toward a high-performance life.
                    </p>
                </section>
            </div>
          </article>
        );

      case AppMode.BLOG_SYNC:
        return (
          <article className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                  <Globe2 className="w-8 h-8" style={{ color: accentColor }} />
                  <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-30">Scientific Authority</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">The Science of Global Timekeeping: Why Millisecond Precision Matters in a Connected World</h1>
              <p className="text-white/40 text-lg italic">An authoritative analysis on the physics and technical infrastructure of modern chronometry.</p>
            </header>

            <div className="prose prose-invert max-w-none space-y-8 text-white/70 leading-relaxed text-lg">
                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">The Atomic Heartbeat: Coordinated Universal Time</h2>
                    <p>
                        We often take the time on our screens for granted, but it is the result of an intricate global consensus. <strong>Coordinated Universal Time (UTC)</strong> is not a single clock, but a weighted average of over 400 <strong>Atomic Clocks</strong> located in national laboratories across 50 countries. These clocks utilize the vibrations of Cesium-133 atoms—oscillating at exactly 9,192,631,770 times per second—to define the "Standard Second."
                    </p>
                    <p>
                        For <strong>YClockTB</strong>, precision is the fundamental directive. By leveraging the <strong>High Resolution Time API</strong> and NTP-synced system clocks, we provide users with a window into this atomic reality. In an era where <strong>Global Synchronization</strong> is the backbone of the internet, being "off" by even a second is the difference between a successful trade and a missed opportunity.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">The Physics of Drift: Why Digital Clocks Fail</h2>
                    <p>
                        All non-atomic clocks experience <strong>Clock Drift</strong>. This is caused by environmental factors like temperature, humidity, and the aging of quartz crystals in your hardware. In server environments, drift is corrected via the <strong>Network Time Protocol (NTP)</strong>, which constantly polls reference clocks to stay synced. However, on the client side (your browser), standard JavaScript timers like `setTimeout` are often throttled by the operating system to save battery, leading to cumulative errors.
                    </p>
                    <p>
                        <strong>YClockTB</strong> solves this using <strong>Web Workers</strong>. By running the timekeeping logic on a separate background thread, we bypass the main-thread congestion that causes visual lag and temporal drift. This ensures that our <strong>World Clock</strong> and <strong>Stopwatch</strong> remain accurate to within milliseconds, even when the user is multi-tasking across multiple intensive applications.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">The Strategic Utility of Milliseconds</h2>
                    <p>
                        Why does a millisecond matter? For the average user, perhaps not much. But for a <strong>High-Frequency Trader (HFT)</strong>, a millisecond represents millions of dollars. For a <strong>DevOps Engineer</strong>, millisecond-accurate timestamps are the only way to reconstruct the sequence of events during a distributed system failure. For a <strong>Data Scientist</strong>, precision is required to align datasets from globally distributed sensors.
                    </p>
                    <p>
                        We built YClockTB as a "Stratum 1" style interface—a tool that respects the physics of time. Whether you are monitoring <strong>UTC offsets</strong> for a global server deployment or timing a scientific experiment, you are interacting with a tool designed for <strong>Total Temporal Fidelity</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">Conclusion: Time as a Universal Language</h2>
                    <p>
                        In a decentralized world, time is the only truly shared ledger. By understanding the science behind the tick, we gain a deeper appreciation for the technical miracles that allow us to collaborate across continents. Precision isn't just about math; it's about the trust that sustains our modern civilization.
                    </p>
                </section>
            </div>
          </article>
        );

      case AppMode.BLOG_PRIVACY:
        return (
          <article className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-8 h-8" style={{ color: accentColor }} />
                  <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-30">Executive Strategy</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">The Ultimate Guide to Cross-Time-Zone Productivity: Managing Remote Teams Without Burnout</h1>
              <p className="text-white/40 text-lg italic">A strategic framework for international leadership and temporal empathy.</p>
            </header>

            <div className="prose prose-invert max-w-none space-y-8 text-white/70 leading-relaxed text-lg">
                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">The Collision of Latitudes: The Modern Manager’s Challenge</h2>
                    <p>
                        Remote work has dissolved the physical office, but it has reinforced the <strong>Temporal Boundary</strong>. Managing a team that spans 12 time zones is not just a logistical hurdle; it is a psychological test of endurance. Without a strategy, the default becomes "Always-On," where someone, somewhere, is always sacrificing their sleep for a status update. This leads to <strong>Temporal Exhaustion</strong> and high turnover.
                    </p>
                    <p>
                        The key to international success is <strong>Temporal Empathy</strong>. Using a <strong>World Clock</strong> isn't just about knowing what time it is in Singapore; it's about knowing if your colleague in Singapore is currently eating dinner with their family or entering their peak focus window.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">The "Golden Window" Framework</h2>
                    <p>
                        Every global team has a <strong>Golden Window</strong>—the brief 1-2 hour period where the most time zones overlap within standard working hours (9 AM - 6 PM). For a team spanning London and San Francisco, this is usually 8 AM - 10 AM PST. 
                    </p>
                    <p>
                        <strong>Strategic Tip:</strong> Reserve your Golden Windows exclusively for synchronous, high-bandwidth collaboration (strategy, conflict resolution). All other tasks must be moved to <strong>Asynchronous Channels</strong>. By visualizing these overlaps on a <strong>World Clock Dashboard</strong>, managers can schedule meetings that respect the biological needs of all participants.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">Asynchronous Sovereignty: Reclaiming Your Calendar</h2>
                    <p>
                        True productivity in a global era comes from <strong>Asynchronous sovereignty</strong>. This means that work is documented such that it can be picked up by someone in a different time zone without a live meeting. This requires high-fidelity documentation and a shared understanding of <strong>UTC deadlines</strong>. 
                    </p>
                    <p>
                        Tools like <strong>YClockTB</strong> act as the "Temporal Hub" for this workflow. By setting <strong>Global Alarms</strong> for hand-off times, teams can ensure a 24-hour production cycle that doesn't require 24-hour work from any single individual. This is the hallmark of a mature, <strong>Time-Aware Organization</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">Conclusion: Leadership is Chronometric</h2>
                    <p>
                        In the digital era, the most respected leaders are those who respect their team's time. By mastering the nuances of global synchronization and fostering a culture of asynchronous work, you build a sustainable, high-output organization. The clock is not your enemy; it is your roadmap to global dominance.
                    </p>
                </section>
            </div>
          </article>
        );

      case AppMode.BLOG_AESTHETICS:
        return (
          <article className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="w-8 h-8" style={{ color: accentColor }} />
                  <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-30">Design Philosophy</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">Aesthetic Minimalism as a Tool for Cognitive Reduction</h1>
              <p className="text-white/40 text-lg italic">Exploring why luxury UI design is a functional requirement for professional tools.</p>
            </header>

            <div className="prose prose-invert max-w-none space-y-8 text-white/70 leading-relaxed text-lg">
                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">The Cost of Visual Noise</h2>
                    <p>
                        Every element on a digital screen competes for a fraction of your <strong>Visual Attention</strong>. In high-stress environments—like a developer tracking server uptime or a trader watching a closing bell—unnecessary UI decoration is not just "ugly"; it is a <strong>Cognitive Tax</strong>. It slows down processing speed and increases the likelihood of error.
                    </p>
                    <p>
                        <strong>YClockTB’s Glassmorphism</strong> is a strategic choice. By using blurred backgrounds and subtle depth, we mimic the human eye's natural focus mechanisms. This allows the user to immediately identify the "Primary Data" (the time) while the "Utility Elements" (settings, nav) recede into the peripheral background.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">Monospace and Tabular Nums: The Anatomy of Trust</h2>
                    <p>
                        In chronometry, stability is trust. We utilize <strong>JetBrains Mono</strong> and <strong>Tabular Numbers</strong> to ensure that as seconds tick, the width of the characters does not change. This eliminates "visual jitter," allowing the brain to track the passage of time with zero cognitive overhead. This is the difference between a consumer gadget and a <strong>Scientific Instrument</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl text-white font-medium mb-4">Conclusion: Design as Digital Sovereignty</h2>
                    <p>
                        Luxury design is often misunderstood as vanity. In reality, it is the pursuit of <strong>Clarity</strong>. A tool that looks amazing is a tool that you want to use, and a tool you want to use is one that ultimately helps you achieve your goals. Aesthetics are the gateway to excellence.
                    </p>
                </section>
            </div>
          </article>
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
                          <p className="text-sm opacity-70">Independent threads that stay accurate even when the tab is hidden or throttled.</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">Local Storage</h3>
                          <p className="text-sm opacity-70">Alarms and settings stay on your device, never transmitted to a server for maximum privacy.</p>
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