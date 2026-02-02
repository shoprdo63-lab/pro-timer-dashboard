import { SoundPreset, TimeZone, Theme, MathDifficultyLevel } from './types';

export const MASTER_DATA = {
  APP_NAME: "GlassChronos",
  TIME_ZONES: [
    { city: "New York", region: "USA", zone: "America/New_York" },
    { city: "London", region: "UK", zone: "Europe/London" },
    { city: "Paris", region: "France", zone: "Europe/Paris" },
    { city: "Tokyo", region: "Japan", zone: "Asia/Tokyo" },
    { city: "Sydney", region: "Australia", zone: "Australia/Sydney" },
    { city: "Dubai", region: "UAE", zone: "Asia/Dubai" },
    { city: "Los Angeles", region: "USA", zone: "America/Los_Angeles" },
    { city: "Chicago", region: "USA", zone: "America/Chicago" },
    { city: "Toronto", region: "Canada", zone: "America/Toronto" },
    { city: "Berlin", region: "Germany", zone: "Europe/Berlin" },
    { city: "Hong Kong", region: "China", zone: "Asia/Hong_Kong" },
    { city: "Singapore", region: "Singapore", zone: "Asia/Singapore" },
    { city: "Mumbai", region: "India", zone: "Asia/Kolkata" },
    { city: "Shanghai", region: "China", zone: "Asia/Shanghai" },
    { city: "São Paulo", region: "Brazil", zone: "America/Sao_Paulo" },
    { city: "Moscow", region: "Russia", zone: "Europe/Moscow" },
    { city: "Seoul", region: "South Korea", zone: "Asia/Seoul" },
    { city: "Cape Town", region: "South Africa", zone: "Africa/Johannesburg" },
    { city: "Vancouver", region: "Canada", zone: "America/Vancouver" },
    { city: "Zurich", region: "Switzerland", zone: "Europe/Zurich" }
  ] as TimeZone[],

  ALARM_SOUNDS: [
    { id: 'beep', name: 'Digital Beep', type: 'oscillator', params: { type: 'square', freq: 880, mod: 4, env: 'sharp' } },
    { id: 'chime', name: 'Soft Chime', type: 'oscillator', params: { type: 'sine', freq: 600, mod: 0.5, env: 'soft' } },
    { id: 'alert', name: 'Emergency', type: 'oscillator', params: { type: 'sawtooth', freq: 150, mod: 10, env: 'harsh' } },
    { id: 'cosmic', name: 'Cosmic Rise', type: 'oscillator', params: { type: 'sine', freq: 300, slide: true, env: 'long' } },
    { id: 'zen', name: 'Zen Garden', type: 'oscillator', params: { type: 'triangle', freq: 220, mod: 2, env: 'slow' } },
    { id: 'pulse', name: 'Radar Pulse', type: 'oscillator', params: { type: 'sine', freq: 1000, mod: 20, env: 'pluck' } },
    { id: 'retro', name: '8-Bit Up', type: 'oscillator', params: { type: 'square', freq: 440, arpeggio: true, env: 'sharp' } },
    { id: 'urgent', name: 'High Urgency', type: 'oscillator', params: { type: 'sawtooth', freq: 880, mod: 15, env: 'piercing' } }
  ] as SoundPreset[],

  THEMES: [
    { 
      id: 'midnight', 
      name: 'Midnight', 
      colors: {
        bgGradient: 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
        glassPanel: 'rgba(17, 25, 40, 0.75)',
        glassCard: 'rgba(255, 255, 255, 0.05)',
        textMain: '#ffffff',
        textDim: 'rgba(255, 255, 255, 0.5)',
        accent: '#3b82f6'
      }
    },
    { 
      id: 'deep-purple', 
      name: 'Deep Purple', 
      colors: {
        bgGradient: 'radial-gradient(at 0% 0%, #1e1b4b 0, transparent 50%), radial-gradient(at 50% 100%, #4c1d95 0, transparent 50%), radial-gradient(at 100% 0%, #2e1065 0, transparent 50%)',
        glassPanel: 'rgba(46, 16, 101, 0.65)',
        glassCard: 'rgba(216, 180, 254, 0.1)',
        textMain: '#faf5ff',
        textDim: 'rgba(250, 245, 255, 0.5)',
        accent: '#a78bfa'
      }
    },
    { 
      id: 'high-contrast', 
      name: 'High Contrast', 
      colors: {
        bgGradient: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        glassPanel: 'rgba(0, 0, 0, 0.9)',
        glassCard: 'rgba(255, 255, 255, 0.15)',
        textMain: '#ffffff',
        textDim: 'rgba(255, 255, 255, 0.7)',
        accent: '#22c55e'
      }
    }
  ] as Theme[],

  MATH_DIFFICULTIES: {
    Easy: { label: 'Easy', desc: 'Simple Addition' },
    Medium: { label: 'Medium', desc: 'Add & Subtract' },
    Hard: { label: 'Hard', desc: 'Multiplication' },
    Expert: { label: 'Expert', desc: 'Mixed Operations' }
  }
};

// 60FPS tick for Stopwatch/Timer
export const PRECISION_WORKER_CODE = `
let timerId = null;
self.onmessage = function(e) {
  if (e.data === "start") {
    timerId = setInterval(() => {
      self.postMessage("tick");
    }, 16); 
  } else if (e.data === "stop") {
    if (timerId) clearInterval(timerId);
  }
};
`;

// 1Hz tick for Main Clock & Alarms
export const CLOCK_WORKER_CODE = `
let timerId = null;
self.onmessage = function(e) {
  if (e.data === "start") {
    timerId = setInterval(() => {
      self.postMessage("tick");
    }, 1000); 
  } else if (e.data === "stop") {
    if (timerId) clearInterval(timerId);
  }
};
`;