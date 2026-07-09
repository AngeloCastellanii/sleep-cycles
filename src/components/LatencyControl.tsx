import { useEffect, useId, useRef, useState } from 'react';
import { MAX_LATENCY_MIN, MIN_LATENCY_MIN } from '../lib/sleepCycles';
import styles from './LatencyControl.module.css';

interface LatencyControlProps {
  value: number;
  onChange: (value: number) => void;
}

function clampLatency(value: number): number {
  return Math.min(MAX_LATENCY_MIN, Math.max(MIN_LATENCY_MIN, value));
}

export function LatencyControl({ value, onChange }: LatencyControlProps) {
  const sliderId = useId();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    const parsed = Number.parseInt(draft, 10);
    if (!Number.isNaN(parsed)) {
      onChange(clampLatency(parsed));
    }
    setEditing(false);
  };

  const cancel = () => {
    setDraft(String(value));
    setEditing(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      commit();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      cancel();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label htmlFor={sliderId} className={styles.label}>
          Tiempo en quedarte dormido
        </label>
        <span className={styles.valueGroup}>
          {editing ? (
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={draft}
              onChange={(e) => setDraft(e.target.value.replace(/\D/g, ''))}
              onBlur={commit}
              onKeyDown={handleKeyDown}
              className={styles.input}
              aria-label="Minutos para quedarte dormido"
              maxLength={2}
            />
          ) : (
            <button
              type="button"
              className={styles.valueButton}
              onClick={() => setEditing(true)}
              aria-label={`${value} minutos para quedarte dormido. Clic para editar.`}
            >
              {value}
            </button>
          )}
          <span className={styles.unit}>min</span>
        </span>
      </div>
      <input
        id={sliderId}
        type="range"
        min={MIN_LATENCY_MIN}
        max={MAX_LATENCY_MIN}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
        aria-valuemin={MIN_LATENCY_MIN}
        aria-valuemax={MAX_LATENCY_MIN}
        aria-valuenow={value}
      />
      <div className={styles.range}>
        <span>{MIN_LATENCY_MIN} min</span>
        <span>{MAX_LATENCY_MIN} min</span>
      </div>
    </div>
  );
}
