import { useMemo, useState } from 'react';
import {
  calculateNapWakeTimes,
  NAP_LATENCY_MIN,
  type NapResult,
} from '../lib/napGuide';
import { getDefaultTime } from '../lib/sleepCycles';
import { TimeDisplay } from './TimeDisplay';
import styles from './NapCalculator.module.css';

function NapRow({
  result,
  selected,
  onSelect,
}: {
  result: NapResult;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
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
        onClick={() => onSelect(result.id)}
        aria-label={`Despierta a las ${result.time}, siesta de ${result.minutes} minutos`}
        aria-pressed={selected}
      >
        <span className={styles.time}>{result.time}</span>
        <span className={styles.meta}>
          {result.minutes} min · {result.label}
        </span>
        <span className={styles.tagline}>{result.tagline}</span>
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

export function NapCalculator() {
  const [time, setTime] = useState(getDefaultTime);
  const [selectedId, setSelectedId] = useState('power');

  const results = useMemo(() => calculateNapWakeTimes(time), [time]);

  return (
    <div className={styles.calculator}>
      <TimeDisplay
        value={time}
        onChange={setTime}
        label="Hora de iniciar la siesta"
      />

      <section className={styles.results} aria-labelledby="nap-results-heading">
        <h2 id="nap-results-heading" className={styles.heading}>
          Pon la alarma a las
        </h2>
        <p className={styles.hint}>
          Elige una duración. La recomendada va en color tierra.
        </p>
        <div className={styles.list}>
          {results.map((result) => (
            <NapRow
              key={result.id}
              result={result}
              selected={selectedId === result.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
        <p className={styles.note}>
          Se suman ~{NAP_LATENCY_MIN} min para quedarte dormido
        </p>
      </section>
    </div>
  );
}
