import React from 'react';

export const BlogSection: React.FC = () => {
  return (
    <section className="w-full py-24 border-t border-white/5 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-6">
        {/* Authority Header */}
        <div className="flex flex-col items-center mb-24 text-center">
          <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold uppercase tracking-[0.4em] mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>The YClockTB Professional Resource Hub</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-tight mb-8">Temporal Mastery</h2>
          <p className="text-white/40 max-w-3xl text-xl leading-relaxed">
            Our Knowledge Hub provides authoritative insights into the physics of synchronization, the neurobiology of focus, and the technical architecture of global timekeeping.
          </p>
        </div>

        <div className="space-y-40">
          {/* Article 1: Evolution of Timekeeping */}
          <article className="prose prose-invert max-w-none">
            <header className="mb-16 border-l-[6px] border-blue-500 pl-10">
              <span className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 block">Article 01 — Chronometric History</span>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">The Evolution of Global Timekeeping: <br/><span className="text-white/60">From Sun Dials to Atomic Precision</span></h2>
              <p className="text-white/40 text-2xl italic font-serif max-w-4xl">A comprehensive historical analysis of human attempts to measure the infinite progression of entropy.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 text-white/70 leading-relaxed text-xl">
              <div className="lg:col-span-8 space-y-12 text-justify">
                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">The Celestial Genesis</h3>
                  <p>
                    For the majority of human history, time was not an abstract digital constant, but a celestial rhythm. Ancient civilizations in Egypt and Mesopotamia utilized the most reliable "oscillator" available: the rotation of the Earth relative to the sun. The first sundials, or gnomons, were essentially architectural shadows—obelisks that mapped the sun's journey across the sky. While effective for agricultural planning, these tools were inherently flawed, rendered useless by cloud cover or the descent of night.
                  </p>
                  <p>
                    By 1500 BCE, the search for "portable time" led to the development of clepsydras, or water clocks. These devices relied on the regulated flow of water from one vessel to another, creating the first independent measure of duration that functioned regardless of celestial visibility. It was during this era that the Babylonians introduced the <strong>sexagesimal system</strong> (base 60), which remains the standard for our seconds and minutes today.
                  </p>
                </section>

                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">The Mechanical Revolution</h3>
                  <p>
                    The true turning point in horology occurred in the 14th century with the invention of the <strong>verge escapement</strong>. This mechanical mechanism allowed for the controlled release of energy from a falling weight, translating it into the rhythmic "tick" of a gear train. For the first time, time could be "packaged" into a machine. In 1656, Christiaan Huygens revolutionized precision by applying the mathematics of the pendulum, reducing the daily drift of clocks from 15 minutes to a mere 15 seconds.
                  </p>
                  <p>
                    As global trade expanded, the "Longitude Problem" became a matter of national security. Sailors required a clock that could keep time accurately on the turbulent seas to calculate their position. John Harrison's marine chronometer, developed in the 18th century, proved that mechanical precision could bridge the gap between continents, laying the groundwork for the modern global economy.
                  </p>
                </section>

                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">The Quantum Leap: Atomic Synchronization</h3>
                  <p>
                    In 1927, the discovery of the piezoelectric effect in quartz crystals allowed for a new era of electronic timekeeping. Quartz oscillators, vibrating at 32,768 Hz, provided stability that mechanical gears could never achieve. However, even quartz is subject to environmental drift.
                  </p>
                  <p>
                    The modern standard, and the one that powers the backend of <strong>YClockTB</strong>, is atomic time. By utilizing the hyperfine transition of <strong>Cesium-133 atoms</strong>, we have defined the second as 9,192,631,770 cycles of microwave radiation. Atomic clocks are so precise they will not lose a single second in 100 million years. This is the bedrock of GPS, internet protocols, and the very foundation of our synchronized reality.
                  </p>
                </section>
              </div>
              
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white/5 p-10 rounded-[48px] border border-white/10 shadow-2xl">
                  <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-8">Horological Milestones</h4>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-white font-mono text-xs opacity-30">1500 BC</span>
                      <p className="text-sm opacity-80">Egyptian Sundials reach peak architectural integration.</p>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-white font-mono text-xs opacity-30">1364 AD</span>
                      <p className="text-sm opacity-80">Giovanni de' Dondi completes the first astronomical clock.</p>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-white font-mono text-xs opacity-30">1735 AD</span>
                      <p className="text-sm opacity-80">John Harrison solves the Longitude Problem with the H1.</p>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-white font-mono text-xs opacity-30">1967 AD</span>
                      <p className="text-sm opacity-80">The SI second is officially defined by atomic transitions.</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/* Article 2: Psychology of Focus */}
          <article className="prose prose-invert max-w-none">
            <header className="mb-16 border-l-[6px] border-emerald-500 pl-10">
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-4 block">Article 02 — Productivity Neurobiology</span>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">Maximizing Productivity: <br/><span className="text-white/60">The Science of Timed Focus</span></h2>
              <p className="text-white/40 text-2xl italic font-serif max-w-4xl">Exploring why artificial temporal constraints are the most effective antidote to cognitive fatigue.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 text-white/70 leading-relaxed text-xl">
               <div className="lg:col-span-4 hidden lg:block">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-emerald-500/10 p-10 rounded-[48px] border border-emerald-500/20 shadow-2xl">
                    <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8">Focus Mechanics</h4>
                    <div className="space-y-8">
                      <div>
                        <span className="block text-white font-medium mb-2">The 25/5 Cycle</span>
                        <p className="text-xs opacity-60 leading-relaxed">The optimal window for maintaining high cortical arousal before the 'Concentration Decay' begins.</p>
                      </div>
                      <div>
                        <span className="block text-white font-medium mb-2">Parkinson's Law</span>
                        <p className="text-xs opacity-60 leading-relaxed">Work expands to fill the time available. Timers create a 'Finish Line' for the brain.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-12 text-justify">
                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">The Anatomy of a Flow State</h3>
                  <p>
                    Productivity is often misunderstood as an act of will, but in reality, it is a biological state. The human brain is not designed for continuous, high-intensity output. We operate on <strong>Ultradian Rhythms</strong>—cycles of energy and focus that typically peak every 90 to 120 minutes. When we attempt to force work past these peaks, we experience "Ego Depletion," where the prefrontal cortex loses its ability to regulate attention and resist distractions.
                  </p>
                  <p>
                    The <strong>Pomodoro Technique</strong>, popularized by Francesco Cirillo, is a strategic intervention into this rhythm. By setting a countdown timer for exactly 25 minutes, you are creating a "Closed Focus Loop." This temporal constraint triggers a mild release of norepinephrine, which narrows your perceptual field and increases the speed of task processing.
                  </p>
                </section>

                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">Fighting the Zeigarnik Effect</h3>
                  <p>
                    One of the greatest drains on cognitive energy is "Attention Residue." This happens when we are interrupted mid-task; a part of our brain remains tethered to the unfinished objective, even as we try to focus on something else. This is known as the <strong>Zeigarnik Effect</strong>. 
                  </p>
                  <p>
                    Using the high-precision timers on <strong>YClockTB</strong> allows you to "Close the Tab" in your brain. When the bell rings, the task is formally paused. This external signal gives the brain permission to fully disengage during the 5-minute neural break. These breaks are not "wasted time"; they are the periods during which the brain flushes out metabolic waste products like adenosine, preparing the synapses for the next sprint of deep work.
                  </p>
                </section>

                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">Neuroplasticity and Habitual Focus</h3>
                  <p>
                    Focus is a muscle that can be hypertrophied. By consistently using a productivity timer, you are performing <strong>Neural Strength Training</strong>. Over time, the sight of a countdown timer becomes a "Priming Cue." Your brain learns that a 25-minute window means a total suspension of distractions. This re-wires your dopamine pathways to find pleasure in sustained effort rather than the "cheap dopamine" of notification scrolling. 
                  </p>
                </section>
              </div>
            </div>
          </article>

          {/* Article 3: UTC & Technology */}
          <article className="prose prose-invert max-w-none">
            <header className="mb-16 border-l-[6px] border-purple-500 pl-10">
              <span className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-4 block">Article 03 — Technical Infrastructure</span>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">Universal Time Coordination (UTC): <br/><span className="text-white/60">The Backbone of Modern Technology</span></h2>
              <p className="text-white/40 text-2xl italic font-serif max-w-4xl">Why the invisible protocol of atomic synchronization is the most critical asset of the digital age.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 text-white/70 leading-relaxed text-xl">
              <div className="lg:col-span-8 space-y-12 text-justify">
                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">The Consensus of the Clock</h3>
                  <p>
                    In a decentralized world, truth is often subjective—but time cannot be. <strong>Coordinated Universal Time (UTC)</strong> is the primary time standard by which the world regulates clocks and time. Unlike Greenwich Mean Time (GMT), which is based on the Earth's rotation (and thus varies), UTC is based on <strong>International Atomic Time (TAI)</strong>. TAI is a weighted average of over 400 atomic clocks distributed across the globe, providing a level of stability that is functionally absolute.
                  </p>
                  <p>
                    This synchronization is facilitated by the <strong>Network Time Protocol (NTP)</strong>. Without it, the internet as we know it would collapse. Every server, every database, and every cryptographic certificate relies on the assumption that all parties agree on the current millisecond.
                  </p>
                </section>

                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">Impact on Distributed Computing</h3>
                  <p>
                    For developers and system architects, time is a data integrity issue. In distributed databases like Google Spanner or Amazon DynamoDB, the "Happened-Before" relationship is the only way to resolve data conflicts. If two users edit the same document in different parts of the world, the system relies on synchronized UTC timestamps to determine which edit takes precedence. 
                  </p>
                  <p>
                    Even a 10-millisecond drift between servers can lead to "Split-Brain" scenarios, where a database becomes corrupted because it cannot determine the true sequence of events. <strong>YClockTB</strong> provides a window into this high-precision world, allowing professionals to monitor their local drift against the global standard.
                  </p>
                </section>

                <section>
                  <h3 className="text-3xl text-white font-medium mb-6">Aviation, Finance, and Global Security</h3>
                  <p>
                    The high-stakes sectors of our society operate exclusively on UTC. In aviation, every air traffic control center and cockpit uses UTC to ensure that "separation minimums" are maintained in the sky. In global finance, regulations like MiFID II require that every trade be logged with microsecond-accurate UTC timestamps to prevent market manipulation. 
                  </p>
                  <p>
                    Time is the invisible ledger of our modern civilization. By mastering the tools of synchronization, we are not just checking a clock; we are participating in the global consensus that keeps the world in motion.
                  </p>
                </section>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="bg-purple-500/10 p-10 rounded-[48px] border border-purple-500/20 shadow-2xl">
                  <h4 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-8">NTP Hierarchy</h4>
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <span className="block text-white font-mono text-[10px] mb-1">STRATUM 0</span>
                      <p className="text-sm opacity-60">Atomic Clocks / GPS Reference</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <span className="block text-white font-mono text-[10px] mb-1">STRATUM 1</span>
                      <p className="text-sm opacity-60">Primary Network Servers</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <span className="block text-white font-mono text-[10px] mb-1">STRATUM 2</span>
                      <p className="text-sm opacity-60">Secondary Distribution Nodes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Conclusion / Authority Banner */}
        <div className="mt-48 p-20 rounded-[80px] bg-gradient-to-br from-blue-600/20 via-slate-900 to-purple-600/10 border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-light text-white mb-8">The Professional Standard</h3>
              <p className="text-white/50 max-w-4xl mx-auto text-xl leading-relaxed mb-12">
                YClockTB isn't just a utility; it's a commitment to professional excellence. Whether you're managing global infrastructure or your personal focus, we provide the precision you need to dominate your time.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">NTP Synced</span>
                <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">Atomic Precision</span>
                <span className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">Privacy Secured</span>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};
