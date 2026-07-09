import { useState } from 'react';
import type { SleepResult } from '../types/sleep';
import { formatDuration } from '../lib/sleepCycles';
import styles from './CycleRow.module.css';

interface CycleRowProps {
  result: SleepResult;
  modeLabel: string;
  selected: boolean;
  onSelect: (cycles: number) => void;
}

export function CycleRow({ result, modeLabel, selected, onSelect }: CycleRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(result.time);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <div
      className={`${styles.row} ${result.recommended ? styles.recommended : ''} ${selected ? styles.selected : ''}`}
    >
      <button
        type="button"
        className={styles.selectArea}
        onClick={() => onSelect(result.cycles)}
        aria-label={`${modeLabel} ${result.time}, ${result.cycles} ciclos`}
        aria-pressed={selected}
      >
        <span className={styles.time}>{result.time}</span>
        <span className={styles.meta}>
          {result.cycles} ciclos · {formatDuration(result.totalSleepMinutes)}
        </span>
        <span className={styles.label}>{result.label}</span>
      </button>
      <button
        type="button"
        className={styles.copy}
        onClick={handleCopy}
        aria-label={`Copiar hora ${result.time}`}
      >
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </div>
  );
}
