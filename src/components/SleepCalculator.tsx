import { useEffect, useMemo, useState } from 'react';
import type { SleepMode } from '../types/sleep';
import {
  calculateFromBedtime,
  calculateFromWakeTime,
  DEFAULT_LATENCY_MIN,
  getDefaultTime,
} from '../lib/sleepCycles';
import { ModeToggle } from './ModeToggle';
import { TimeDisplay } from './TimeDisplay';
import { LatencyControl } from './LatencyControl';
import { CycleTimeline } from './CycleTimeline';
import { ResultsList } from './ResultsList';
import styles from './SleepCalculator.module.css';

export function SleepCalculator() {
  const [mode, setMode] = useState<SleepMode>('bedtime');
  const [time, setTime] = useState(getDefaultTime);
  const [latency, setLatency] = useState(DEFAULT_LATENCY_MIN);
  const [selectedCycles, setSelectedCycles] = useState(5);

  const results = useMemo(() => {
    return mode === 'bedtime'
      ? calculateFromBedtime(time, latency)
      : calculateFromWakeTime(time, latency);
  }, [mode, time, latency]);

  const recommended = results.find((r) => r.recommended) ?? results[1];

  useEffect(() => {
    setSelectedCycles(recommended.cycles);
  }, [recommended.cycles]);

  const timeLabel =
    mode === 'bedtime' ? 'Hora de acostarte' : 'Hora de despertar';

  return (
    <div className={styles.calculator}>
      <ModeToggle mode={mode} onChange={setMode} />
      <TimeDisplay value={time} onChange={setTime} label={timeLabel} />
      <LatencyControl value={latency} onChange={setLatency} />
      <CycleTimeline
        cycles={selectedCycles}
        highlightedCycle={selectedCycles}
      />
      <ResultsList
        results={results}
        mode={mode}
        selectedCycles={selectedCycles}
        onSelectCycles={setSelectedCycles}
      />
    </div>
  );
}
