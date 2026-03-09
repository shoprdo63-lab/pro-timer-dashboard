export enum AppMode {
  CLOCK = 'CLOCK',
  ALARM = 'ALARM',
  TIMER = 'TIMER',
  STOPWATCH = 'STOPWATCH',
  POMODORO = 'POMODORO',
  BLOG = 'BLOG',
  // Info Pages
  ABOUT = 'ABOUT',
  HOW_IT_WORKS = 'HOW_IT_WORKS',
  PRIVACY = 'PRIVACY',
  TERMS = 'TERMS',
  CONTACT = 'CONTACT',
  // Research Articles
  BLOG_FOCUS = 'BLOG_FOCUS',
  BLOG_SYNC = 'BLOG_SYNC',
  BLOG_PRIVACY = 'BLOG_PRIVACY',
  BLOG_AESTHETICS = 'BLOG_AESTHETICS'
}

export interface TimeZone {
  city: string;
  region: string;
  zone: string;
}

export type MathDifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface Alarm {
  id: string;
  time: string; // HH:mm format (24h)
  label: string;
  enabled: boolean;
  days: number[]; // 0 = Sunday, 1 = Monday, etc.
  sound: string;
  difficulty: MathDifficultyLevel;
  snoozedUntil?: number | null; // Timestamp
}

export interface SoundPreset {
  id: string;
  name: string;
  type: 'oscillator' | 'custom';
  params?: any;
}

export interface Theme {
  id: string;
  name: string;
  previewColor: string; // Color used for the selection button
  colors: {
    bgGradient: string;
    glassPanel: string;
    glassCard: string;
    textMain: string;
    textDim: string;
    accent: string;
  };
}

export interface Lap {
  id: number;
  time: number; // milliseconds
  split: number; // milliseconds since last lap
}

export interface TimerState {
  duration: number; // total duration in ms
  remaining: number; // ms remaining
  isRunning: boolean;
  initialDuration: number;
}