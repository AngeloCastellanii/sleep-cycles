import { useId, useRef } from 'react';
import styles from './TimeDisplay.module.css';

interface TimeDisplayProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function TimeDisplay({ value, onChange, label }: TimeDisplayProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <button type="button" className={styles.display} onClick={openPicker}>
        <span className={styles.time} aria-hidden="true">
          {value}
        </span>
        <input
          ref={inputRef}
          id={inputId}
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.input}
          aria-label={label}
        />
      </button>
    </div>
  );
}
