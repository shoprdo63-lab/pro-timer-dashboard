import { MASTER_DATA } from '../constants';

let audioCtx: AudioContext | null = null;

const getContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

export const playAlarmSound = (soundId: string) => {
  const ctx = getContext();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }

  const preset = MASTER_DATA.ALARM_SOUNDS.find(s => s.id === soundId) || MASTER_DATA.ALARM_SOUNDS[0];
  const params = preset.params || {};

  if (preset.type === 'oscillator') {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const t = ctx.currentTime;
    
    osc.type = params.type || 'sine';
    osc.frequency.setValueAtTime(params.freq, t);
    
    // Modulation
    if (params.mod) {
      const lfo = ctx.createOscillator();
      lfo.frequency.value = params.mod;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = params.mod * 50; 
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
    }

    // Slide/Arpeggio Effects
    if (params.slide) {
         osc.frequency.exponentialRampToValueAtTime(params.freq * 2, t + 0.5);
    }
    if (params.arpeggio) {
         osc.frequency.setValueAtTime(params.freq, t);
         osc.frequency.setValueAtTime(params.freq * 1.25, t + 0.1); // Major 3rd
         osc.frequency.setValueAtTime(params.freq * 1.5, t + 0.2); // Perfect 5th
         osc.frequency.setValueAtTime(params.freq * 2, t + 0.3); // Octave
    }

    // Envelopes
    gainNode.gain.setValueAtTime(0, t);
    if (params.env === 'sharp' || params.env === 'piercing') {
        gainNode.gain.linearRampToValueAtTime(0.5, t + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
    } else if (params.env === 'soft' || params.env === 'slow') {
        gainNode.gain.linearRampToValueAtTime(0.4, t + 0.5);
        gainNode.gain.linearRampToValueAtTime(0, t + 1.0);
    } else if (params.env === 'pluck') {
        gainNode.gain.linearRampToValueAtTime(0.5, t + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
    } else {
        gainNode.gain.linearRampToValueAtTime(0.5, t + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, t + 0.5);
    }

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(t + 2.0);
  }
};

export const stopAudio = () => {
  if (audioCtx) {
    audioCtx.suspend();
    audioCtx = null; 
  }
};