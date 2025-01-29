export type Timer = {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: 'Running' | 'Paused' | 'Completed';
}

export type TimerContextProps = {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  updateTimer: (id: string, updates: Partial<Timer>) => void;
  removeTimer: (id: string) => void;
}