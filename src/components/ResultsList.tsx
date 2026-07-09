import type { SleepMode, SleepResult } from '../types/sleep';
import { CycleRow } from './CycleRow';
import styles from './ResultsList.module.css';

interface ResultsListProps {
  results: SleepResult[];
  mode: SleepMode;
  selectedCycles: number;
  onSelectCycles: (cycles: number) => void;
}

export function ResultsList({
  results,
  mode,
  selectedCycles,
  onSelectCycles,
}: ResultsListProps) {
  const heading =
    mode === 'bedtime' ? 'Pon la alarma a las' : 'Acuéstate a las';

  return (
    <section className={styles.wrapper} aria-labelledby="results-heading">
      <h2 id="results-heading" className={styles.heading}>
        {heading}
      </h2>
      <div className={styles.list}>
        {results.map((result) => (
          <CycleRow
            key={result.cycles}
            result={result}
            modeLabel={heading}
            selected={selectedCycles === result.cycles}
            onSelect={onSelectCycles}
          />
        ))}
      </div>
    </section>
  );
}
