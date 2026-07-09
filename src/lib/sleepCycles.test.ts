import { describe, expect, it } from 'vitest';
import {
  calculateFromBedtime,
  calculateFromWakeTime,
  formatDuration,
} from './sleepCycles';

describe('calculateFromBedtime', () => {
  it('calcula despertar para 5 ciclos con latencia por defecto', () => {
    const results = calculateFromBedtime('23:00');
    const fiveCycles = results.find((r) => r.cycles === 5);

    expect(fiveCycles?.time).toBe('06:44');
    expect(fiveCycles?.totalSleepMinutes).toBe(14 + 5 * 90);
    expect(fiveCycles?.recommended).toBe(true);
    expect(fiveCycles?.label).toBe('Recomendado');
  });

  it('calcula despertar con latencia personalizada', () => {
    const results = calculateFromBedtime('22:00', 20);
    const fourCycles = results.find((r) => r.cycles === 4);

    expect(fourCycles?.time).toBe('04:20');
    expect(fourCycles?.totalSleepMinutes).toBe(20 + 4 * 90);
  });
});

describe('calculateFromWakeTime', () => {
  it('calcula hora de acostarse para 5 ciclos', () => {
    const results = calculateFromWakeTime('07:00');
    const fiveCycles = results.find((r) => r.cycles === 5);

    expect(fiveCycles?.time).toBe('23:16');
    expect(fiveCycles?.recommended).toBe(true);
  });

  it('maneja cruce de medianoche al acostarse tarde', () => {
    const results = calculateFromBedtime('23:30');
    const sixCycles = results.find((r) => r.cycles === 6);

    expect(sixCycles?.time).toBe('08:44');
  });
});

describe('formatDuration', () => {
  it('formatea horas y minutos', () => {
    expect(formatDuration(464)).toBe('7 h 44 min');
    expect(formatDuration(360)).toBe('6 h');
  });
});
