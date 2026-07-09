import { SleepCalculator } from './components/SleepCalculator';
import { EducationSection } from './components/EducationSection';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>NREM · REM</p>
        <h1 className={styles.title}>Ciclos de Sueño</h1>
        <p className={styles.subtitle}>
          Calcula cuándo despertar o acostarte para completar ciclos enteros y
          levantarte con claridad.
        </p>
      </header>

      <main className={styles.main}>
        <SleepCalculator />
        <EducationSection />
      </main>

      <footer className={styles.footer}>
        <p>Cada ciclo dura ~90 min · Incluye tiempo para quedarte dormido</p>
      </footer>
    </div>
  );
}

export default App;
