export type SleepMode = 'bedtime' | 'waketime';

export type CycleLabel = 'Mínimo' | 'Recomendado' | 'Extendido';

export interface SleepResult {
  cycles: number;
  time: string;
  totalSleepMinutes: number;
  label: CycleLabel;
  recommended: boolean;
}
