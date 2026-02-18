import React from 'react';
import { Clock, Brain, Globe, Shield, Zap, BookOpen, Activity, Target } from 'lucide-react';

export const BlogSection: React.FC = () => {
  return (
    <section className="w-full py-24 border-t border-white/5 bg-slate-950/20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-6">
            <BookOpen className="w-4 h-4" />
            <span>YClockTB Authority Hub</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight mb-6">Chronometric Intelligence</h2>
          <p className="text-white/40 max-w-2xl text-lg leading-relaxed">
            Technical research and neuro-scientific frameworks for global synchronization and professional focus.
          </p>
        </div>

        <div className="space-y-32">
          {/* Article 1: Science of Timekeeping */}
          <article className="prose prose-invert max-w-none">
            <header className="mb-12 border-l-4 border-blue-500 pl-8">
              <div className="flex items-center space-x-3 mb-4 text-blue-400">
                <Clock className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-widest">Physics & Engineering</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">The Science of High-Precision Timekeeping & Atomic Clocks</h2>
              <p className="text-white/50 text-xl italic font-serif">A deep dive into the quantum infrastructure that synchronizes the modern digital world.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-white/70 leading-relaxed text-lg">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-2xl text-white font-medium mb-4">The Quantum Definition of a Second</h3>
                  <p>
                    Precision timekeeping is the silent engine of modern civilization. To understand how YClockTB delivers accuracy, one must look at the transition from astronomical time to quantum time. For centuries, humanity relied on the Earth's rotation to define time. However, the Earth is an irregular timekeeper; its rotation is influenced by tidal friction and atmospheric shifts.
                  </p>
                  <p>
                    The breakthrough came in 1967 when the second was redefined via the <strong>Cesium-133 atom</strong>. By exposing these atoms to a specific microwave frequency, they oscillate between energy states. Exactly 9,192,631,770 cycles of this radiation define one SI second. This transition from macro-observation to quantum-precision allowed for the development of Atomic Clocks, which lose less than one second every 300 million years.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl text-white font-medium mb-4">Network Time Protocol (NTP) and Stratum Layers</h3>
                  <p>
                    Generating time is only half the battle; distributing it across a lag-prone internet is the true engineering challenge. Every device connected to YClockTB participates in a hierarchy of synchronization known as <strong>Stratum Layers</strong>. 
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Stratum 0:</strong> The physical atomic clock or GPS receiver.</li>
                    <li><strong>Stratum 1:</strong> Primary servers directly connected to Stratum 0 devices.</li>
                    <li><strong>Stratum 2:</strong> Secondary servers (like those powering cloud providers) that sync with Stratum 1.</li>
                  </ul>
                  <p>
                    When your browser queries time, it uses high-resolution APIs to account for network latency. This ensures that the clock on your screen isn't just a local approximation, but a reflection of <strong>Coordinated Universal Time (UTC)</strong>, the global consensus scale.
                  </p>
                </section>
              </div>
              
              <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit">
                <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6">Technical Impact</h4>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-white font-medium mb-2">Financial Trading</h5>
                    <p className="text-sm opacity-60">High-frequency trading (HFT) requires microsecond synchronization to prevent "slippage" and ensure order fairness.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Cryptographic Security</h5>
                    <p className="text-sm opacity-60">SSL/TLS certificates rely on synchronized timestamps to prevent "replay attacks" and verify server identity.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Distributed Systems</h5>
                    <p className="text-sm opacity-60">Database integrity across global clusters depends on the "Happened-Before" relationship defined by NTP sync.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Article 2: Psychology of Focus */}
          <article className="prose prose-invert max-w-none">
            <header className="mb-12 border-l-4 border-emerald-500 pl-8">
              <div className="flex items-center space-x-3 mb-4 text-emerald-400">
                <Brain className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-widest">Cognitive Science</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Mastering Productivity: The Psychology of Timers and Focus</h2>
              <p className="text-white/50 text-xl italic font-serif">Exploring how temporal constraints trigger neural flow states and sustain peak performance.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-white/70 leading-relaxed text-lg">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-2xl text-white font-medium mb-4">The Neurobiology of Parkinson’s Law</h3>
                  <p>
                    The most common threat to professional output is the "dilution of effort." Without a defined boundary, tasks naturally expand to fill the time available—a phenomenon known as Parkinson's Law. From a neuro-scientific perspective, this occurs because the <strong>Prefrontal Cortex (PFC)</strong> lacks the "perceptual narrowing" required to filter out distractions.
                  </p>
                  <p>
                    Digital timers on YClockTB serve as a cognitive "finish line." The presence of a countdown timer triggers a subtle release of <strong>norepinephrine</strong>, which increases cortical arousal and narrows the focus field. This effectively mutes the "background noise" of the limbic system, allowing the brain to enter a state of <strong>Deep Work</strong>.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl text-white font-medium mb-4">The Pomodoro Technique: Neural Reset Cycles</h3>
                  <p>
                    The 25-minute Pomodoro interval is not arbitrary. Human concentration operates on <strong>Ultradian Rhythms</strong>—cycles of high-frequency brain activity that last approximately 90 minutes. However, "mental fatigue" begins to accumulate long before that. 
                  </p>
                  <p>
                    By breaking work into 25-minute sprints followed by 5-minute neural breaks, we prevent the buildup of metabolic waste products in the synaptic cleft. These breaks are essential for <strong>Consolidation</strong>, where the brain moves information from working memory into long-term storage, preventing "cognitive overload" and preserving decision-making energy for the entire workday.
                  </p>
                </section>
              </div>
              
              <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit">
                <div className="flex items-center gap-2 mb-6 text-emerald-400">
                    <Activity className="w-4 h-4" />
                    <h4 className="font-bold uppercase tracking-widest text-xs">Focus Framework</h4>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 text-xs font-bold">1</div>
                    <p className="text-sm opacity-60">Set a single, unambiguous objective for the interval.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 text-xs font-bold">2</div>
                    <p className="text-sm opacity-60">Eliminate all asynchronous notifications (mute device).</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 text-xs font-bold">3</div>
                    <p className="text-sm opacity-60">Respect the break; physically move away from the screen.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Article 3: Global Coordination */}
          <article className="prose prose-invert max-w-none">
            <header className="mb-12 border-l-4 border-purple-500 pl-8">
              <div className="flex items-center space-x-3 mb-4 text-purple-400">
                <Globe className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-widest">Global Operations</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Global Coordination: Navigating Complex Time Zones for Remote Teams</h2>
              <p className="text-white/50 text-xl italic font-serif">Building temporal empathy and operational excellence in a decentralized work environment.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-white/70 leading-relaxed text-lg">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-2xl text-white font-medium mb-4">The Challenge of "Chronocentricity"</h3>
                  <p>
                    In a decentralized labor market, the most significant barrier to collaboration is no longer language, but <strong>Time Zone Misalignment</strong>. "Chronocentricity"—the tendency to assume your home time zone is the primary one—leads to "Meeting Exhaustion" for team members in minority zones. 
                  </p>
                  <p>
                    Strategic managers use tools like World Clocks not just to check the time, but to build <strong>Temporal Empathy</strong>. Knowing that a 2 PM meeting in New York is 7 PM in London and 2 AM in Singapore allows leaders to rotate meeting times equitably, ensuring that the burden of "off-hours" work is shared across the global team.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl text-white font-medium mb-4">The "Golden Window" Strategy</h3>
                  <p>
                    For every cross-continental team, there exists a <strong>Golden Window</strong>: a 1-2 hour period where multiple regions overlap during standard working hours. For New York and London, this is typically 9 AM to 12 PM EST. For San Francisco and Tokyo, the window is almost non-existent.
                  </p>
                  <p>
                    Operational excellence requires reserving these Golden Windows exclusively for high-bandwidth synchronous communication (conflict resolution, creative brainstorming). All other work should be moved to <strong>Asynchronous Sovereignty</strong>, where project management is handled via documented hand-offs and UTC-based deadlines.
                  </p>
                </section>
              </div>
              
              <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit">
                <div className="flex items-center gap-2 mb-6 text-purple-400">
                    <Target className="w-4 h-4" />
                    <h4 className="font-bold uppercase tracking-widest text-xs">Operational Best Practices</h4>
                </div>
                <div className="space-y-6">
                  <div>
                    <h5 className="text-white font-medium mb-2">Asynchronous Documentation</h5>
                    <p className="text-sm opacity-60">Assume no one is awake to answer questions. Provide total context in every ticket.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">UTC Standardized Logins</h5>
                    <p className="text-sm opacity-60">Standardize all server logs and project deadlines on UTC to eliminate "offset math" errors.</p>
                  </div>
                  <div>
                    <h5 className="text-white font-medium mb-2">Temporal Rotation</h5>
                    <p className="text-sm opacity-60">Alternate who "stays late" or "starts early" for monthly all-hands meetings.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Closing Authority Statement */}
        <div className="mt-40 p-12 rounded-[56px] bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center">
            <Shield className="w-12 h-12 text-blue-400 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-light text-white mb-4">Precision is Our Standard</h3>
            <p className="text-white/40 max-w-3xl mx-auto leading-relaxed">
              YClockTB is engineered for the high-performance professional who demands absolute fidelity. From atomic synchronization to cognitive focus intervals, we provide the temporal infrastructure required for global excellence.
            </p>
        </div>
      </div>
    </section>
  );
};
