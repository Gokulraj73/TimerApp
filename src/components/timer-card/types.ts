export type TimerCardProps = {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: 'Running' | 'Paused' | 'Completed';
}