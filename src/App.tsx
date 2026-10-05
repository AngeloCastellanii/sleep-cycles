import { useCallback, useState } from 'react';
import { SleepCalculator } from './components/SleepCalculator';
import { EducationSection } from './components/EducationSection';
import { NapCalculator } from './components/NapCalculator';
import { NapEducation } from './components/NapEducation';
import { ViewToggle, type AppView } from './components/ViewToggle';
import { IntroGuide } from './components/IntroGuide';
import styles from './App.module.css';

const INTRO_KEY = 'ciclos-intro-seen';

const HEADER: Record<AppView, { eyebrow: string; subtitle: string; footer: string }> = {
  night: {
    eyebrow: 'NREM · REM',
    subtitle:
      'Calcula cuándo despertar o acostarte para completar ciclos enteros y levantarte con claridad.',
    footer: 'Cada ciclo dura ~90 min · Incluye tiempo para quedarte dormido',
  },
  nap: {
    eyebrow: 'Descanso breve',
    subtitle:
      'Elige cuánto durar para despertar renovado, sin el aturdimiento del sueño profundo.',
    footer: 'La mejor siesta dura 10–20 min · Ideal a primera hora de la tarde',
  },
};

function hasSeenIntro(): boolean {
  try {
    return localStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

function App() {
  const [view, setView] = useState<AppView>('night');
  const [introOpen, setIntroOpen] = useState(() => !hasSeenIntro());
  const copy = HEADER[view];

  const closeIntro = useCallback(() => {
    try {
      localStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* almacenamiento no disponible */
    }
    setIntroOpen(false);
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <button type="button" className={styles.help} onClick={() => setIntroOpen(true)}>
            Cómo funciona
          </button>
        </div>
        <div key={view} className={styles.headingCopy}>
          <h1 className={styles.title}>
            {view === 'night' ? (
              <>
                Ciclos de <em>Sueño</em>
              </>
            ) : (
              <>
                Siesta <em>perfecta</em>
              </>
            )}
          </h1>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>
      </header>

      <div className={styles.toggleWrap}>
        <ViewToggle view={view} onChange={setView} />
      </div>

      <main className={styles.main}>
        <div key={view} className={styles.stage}>
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
        </div>
      </main>

      <footer className={styles.footer}>
        <p>{copy.footer}</p>
      </footer>

      {introOpen ? <IntroGuide onClose={closeIntro} /> : null}
    </div>
  );
}

export default App;
