import { useState } from 'react';
import { SleepCalculator } from './components/SleepCalculator';
import { EducationSection } from './components/EducationSection';
import { NapCalculator } from './components/NapCalculator';
import { NapEducation } from './components/NapEducation';
import { ViewToggle, type AppView } from './components/ViewToggle';
import styles from './App.module.css';

const HEADER: Record<AppView, { eyebrow: string; title: string; subtitle: string; footer: string }> = {
  night: {
    eyebrow: 'NREM · REM',
    title: 'Ciclos de Sueño',
    subtitle:
      'Calcula cuándo despertar o acostarte para completar ciclos enteros y levantarte con claridad.',
    footer: 'Cada ciclo dura ~90 min · Incluye tiempo para quedarte dormido',
  },
  nap: {
    eyebrow: 'Descanso breve',
    title: 'Siesta perfecta',
    subtitle:
      'Elige cuánto durar para despertar renovado, sin el aturdimiento del sueño profundo.',
    footer: 'La mejor siesta dura 10–20 min · Ideal a primera hora de la tarde',
  },
};

function App() {
  const [view, setView] = useState<AppView>('night');
  const copy = HEADER[view];

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 className={styles.title}>{copy.title}</h1>
        <p className={styles.subtitle}>{copy.subtitle}</p>
      </header>

      <ViewToggle view={view} onChange={setView} />

      <main className={styles.main}>
        {view === 'night' ? (
          <>
            <SleepCalculator />
            <EducationSection />
          </>
        ) : (
          <>
            <NapCalculator />
            <NapEducation />
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <p>{copy.footer}</p>
      </footer>
    </div>
  );
}

export default App;
