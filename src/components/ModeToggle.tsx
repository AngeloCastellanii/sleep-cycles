import type { SleepMode } from '../types/sleep';
import styles from './ModeToggle.module.css';

interface ModeToggleProps {
  mode: SleepMode;
  onChange: (mode: SleepMode) => void;
}

const MODES: { value: SleepMode; label: string }[] = [
  { value: 'bedtime', label: 'Me voy a dormir' },
  { value: 'waketime', label: 'Quiero despertar a las…' },
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
          {item.label}
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
