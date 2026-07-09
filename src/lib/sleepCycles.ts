import type { CycleLabel, SleepResult } from '../types/sleep';

export const CYCLE_DURATION_MIN = 90;
export const DEFAULT_LATENCY_MIN = 14;
export const MIN_LATENCY_MIN = 5;
export const MAX_LATENCY_MIN = 30;
export const CYCLE_OPTIONS = [4, 5, 6] as const;

function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function formatTime(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function getLabel(cycles: number): CycleLabel {
  if (cycles === 4) return 'Mínimo';
  if (cycles === 6) return 'Extendido';
  return 'Recomendado';
}

function buildResult(
  cycles: number,
  targetMinutes: number,
  latency: number,
): SleepResult {
  return {
    cycles,
    time: formatTime(targetMinutes),
    totalSleepMinutes: latency + cycles * CYCLE_DURATION_MIN,
    label: getLabel(cycles),
    recommended: cycles === 5,
  };
}

export function calculateFromBedtime(
  bedtime: string,
  latency: number = DEFAULT_LATENCY_MIN,
): SleepResult[] {
  const start = parseTime(bedtime);

  return CYCLE_OPTIONS.map((cycles) => {
    const wakeMinutes = start + latency + cycles * CYCLE_DURATION_MIN;
    return buildResult(cycles, wakeMinutes, latency);
  });
}

export function calculateFromWakeTime(
  wakeTime: string,
  latency: number = DEFAULT_LATENCY_MIN,
): SleepResult[] {
  const wake = parseTime(wakeTime);

  return CYCLE_OPTIONS.map((cycles) => {
    const bedMinutes = wake - latency - cycles * CYCLE_DURATION_MIN;
    return buildResult(cycles, bedMinutes, latency);
  });
}

export function getDefaultTime(): string {
  const now = new Date();
  let minutes = now.getHours() * 60 + now.getMinutes();
  const remainder = minutes % 15;
  if (remainder !== 0) {
    minutes += 15 - remainder;
  }
  return formatTime(minutes);
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}
