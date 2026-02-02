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
  },

  SPONSORED_ADS: [
    {
      id: 'ad_01',
      title: 'Lumina Desk Precision',
      description: 'Advanced LED lighting designed to reduce eye strain during late-night productivity sessions. Flicker-free technology.',
      category: 'Productivity',
      imageURL: 'https://images.unsplash.com/photo-1534067783865-612665cd2a77?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_02',
      title: 'ErgoSpine Pro Chair',
      description: 'Engineered for 12+ hour sitting sessions. Protects your lumbar health with adaptive mesh technology.',
      category: 'Health',
      imageURL: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_03',
      title: 'FocusFlow Nootropics',
      description: 'Natural Vitamin B complex and Lions Mane mushroom blend for sustained mental clarity without the jitters.',
      category: 'Science',
      imageURL: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_04',
      title: 'SilentKey Mechanical',
      description: 'The satisfying tactile feel of a mechanical keyboard with sound-dampening switches for shared workspaces.',
      category: 'Tech',
      imageURL: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_05',
      title: 'Nordic Blue Blockers',
      description: 'Scientifically validated lenses that block 99% of harmful blue light spectrum from digital screens.',
      category: 'Health',
      imageURL: 'https://images.unsplash.com/photo-1570222094114-28a9d8894b74?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_06',
      title: 'HydroSmart Tracker',
      description: 'A water bottle that glows to remind you to hydrate based on your activity level and biometrics.',
      category: 'Health',
      imageURL: 'https://images.unsplash.com/photo-1602143407151-011141950038?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_07',
      title: 'ZenNoise ANC',
      description: 'Active Noise Cancelling headphones that create a sanctuary of silence for deep work and meditation.',
      category: 'Audio',
      imageURL: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_08',
      title: 'VerticalLift Desk',
      description: 'Smooth, motorized standing desk that transitions in seconds to improve circulation and posture.',
      category: 'Office',
      imageURL: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_09',
      title: 'CableMaster Kit',
      description: 'Complete solution for hiding and organizing wires. Create a visually peaceful minimalist workspace.',
      category: 'Organization',
      imageURL: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_10',
      title: 'TimeBlock Planner',
      description: 'Premium paper journal structured for the Pomodoro technique and deep work scheduling.',
      category: 'Productivity',
      imageURL: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_11',
      title: 'CloudSync Drive',
      description: 'Encrypted, decentralized cloud storage ensuring your intellectual property remains yours forever.',
      category: 'Tech',
      imageURL: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_12',
      title: 'SolarPower Bank',
      description: 'High-capacity battery pack with efficient solar cells. Energy independence for the modern nomad.',
      category: 'Travel',
      imageURL: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_13',
      title: 'Digital Ink Tablet',
      description: 'E-ink tablet for distraction-free reading and note-taking. Feels exactly like paper.',
      category: 'Tech',
      imageURL: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_14',
      title: 'PostureAlign Brace',
      description: 'Lightweight wearable that gently vibrates when you slouch, training a healthy spine position.',
      category: 'Health',
      imageURL: 'https://images.unsplash.com/photo-1584650589355-d6090757d5c9?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ad_15',
      title: 'AeroBreeze Purifier',
      description: 'HEPA-13 filtration system that removes allergens and dust, creating a pristine environment for breathing.',
      category: 'Health',
      imageURL: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=600'
    }
  ]
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