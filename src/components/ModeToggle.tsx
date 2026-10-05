import type { SleepMode } from '../types/sleep';
import styles from './ModeToggle.module.css';

interface ModeToggleProps {
  mode: SleepMode;
  onChange: (mode: SleepMode) => void;
}

const MODES: { value: SleepMode; label: string; short: string }[] = [
  { value: 'bedtime', label: 'Me voy a dormir', short: 'Me duermo' },
  { value: 'waketime', label: 'Quiero despertar a las…', short: 'Despertar a las…' },
];

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  const activeIndex = MODES.findIndex((m) => m.value === mode);

  return (
    <div className={styles.toggle} role="tablist" aria-label="Modo de cálculo">
      {MODES.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={mode === item.value}
          className={mode === item.value ? styles.active : undefined}
          onClick={() => onChange(item.value)}
        >
          <span className={styles.labelLong}>{item.label}</span>
          <span className={styles.labelShort}>{item.short}</span>
        </button>
      ))}
      <span
        className={styles.indicator}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
        aria-hidden="true"
      />
    </div>
  );
}
