export enum AppMode {
  CLOCK = 'CLOCK',
  ALARM = 'ALARM',
  TIMER = 'TIMER',
  STOPWATCH = 'STOPWATCH',
  POMODORO = 'POMODORO',
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