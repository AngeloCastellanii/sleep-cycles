import { useEffect, useId, useRef, useState } from 'react';
import styles from './IntroGuide.module.css';

interface IntroGuideProps {
  onClose: () => void;
}

const STEPS = [
  {
    id: 'cycles',
    chapter: 'Ciclos',
    title: 'Despierta al cerrar el ciclo',
    body: 'Cada ciclo dura unos 90 minutos y alterna sueño profundo con sueño REM. Pulsa una fase. La alarma conviene al final, no a la mitad.',
  },
  {
    id: 'night',
    chapter: 'Noche',
    title: 'Dos maneras de calcular',
    body: 'Prueba los dos modos. Uno devuelve la hora de la alarma. El otro, la hora de acostarte. Lo habitual son cinco ciclos, cerca de 7,5 horas.',
  },
  {
    id: 'nap',
    chapter: 'Siesta',
    title: 'Una salida a tiempo',
    body: 'Elige una duración. Veinte minutos suele devolver alerta. Noventa completa un ciclo, con sueño profundo incluido.',
  },
  {
    id: 'use',
    chapter: 'Uso',
    title: 'Tres gestos',
    body: 'Pulsa la hora para cambiarla, marca una fila y copia el número. Eso es todo lo que hace falta para poner la alarma.',
  },
] as const;

const PHASES = [
  { name: 'NREM', note: 'El cuerpo baja de revoluciones. Conviene no cortarlo.' },
  { name: 'REM', note: 'Sueño más ligero. Aquí se ordena parte de la memoria.' },
  { name: 'NREM', note: 'El segundo descenso suele ser más profundo.' },
  { name: 'REM', note: 'Cierra el ciclo. Es un buen momento para despertar.' },
] as const;

const ARCS = [
  'M 8 72 Q 32 24 56 72',
  'M 56 72 Q 80 92 104 72',
  'M 104 72 Q 128 32 152 72',
  'M 152 72 Q 176 90 200 72',
];

function CycleDemo() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const phase = PHASES[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % PHASES.length);
    }, 1800);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div>
      <svg className={styles.wave} viewBox="0 0 208 100" aria-hidden="true">
        <line x1="8" y1="72" x2="200" y2="72" className={styles.waveBase} />
        {ARCS.map((d, arcIndex) => (
          <path
            key={d}
            d={d}
            className={`${arcIndex % 2 === 0 ? styles.waveNrem : styles.waveRem} ${arcIndex === index ? styles.waveOn : ''}`}
          />
        ))}
      </svg>
      <div className={styles.phases} role="group" aria-label="Fases de un ciclo">
        {PHASES.map((item, phaseIndex) => (
          <button
            key={`${item.name}-${phaseIndex}`}
            type="button"
            className={styles.phase}
            aria-pressed={phaseIndex === index}
            onClick={() => {
              setPaused(true);
              setIndex(phaseIndex);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p className={styles.demoNote} aria-live={paused ? 'polite' : 'off'}>
        {phase.note}
      </p>
    </div>
  );
}

function NightDemo() {
  const [mode, setMode] = useState<'bedtime' | 'waketime'>('bedtime');
  const bedtime = mode === 'bedtime';

  return (
    <div>
      <div className={styles.choice} role="tablist" aria-label="Modo de ejemplo">
        <button
          type="button"
          role="tab"
          aria-selected={bedtime}
          className={bedtime ? styles.choiceOn : undefined}
          onClick={() => setMode('bedtime')}
        >
          Me duermo
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!bedtime}
          className={!bedtime ? styles.choiceOn : undefined}
          onClick={() => setMode('waketime')}
        >
          Despertar
        </button>
        <span
          className={styles.choiceBar}
          style={{ transform: bedtime ? 'translateX(0)' : 'translateX(100%)' }}
          aria-hidden="true"
        />
      </div>
      <p className={styles.demoTime}>{bedtime ? '06:45' : '23:15'}</p>
      <p className={styles.demoMeta}>
        {bedtime ? 'Alarma recomendada · 5 ciclos' : 'Hora de acostarte · 5 ciclos'}
      </p>
      <p className={styles.example}>
        {bedtime
          ? 'Ejemplo: te acuestas a las 23:00 y tardas 15 min.'
          : 'Ejemplo: quieres despertar a las 07:00 y tardas 15 min.'}
      </p>
    </div>
  );
}

const NAPS = [
  { minutes: 10, time: '14:15', note: 'Muy breve. Sirve para un corte de atención.' },
  { minutes: 20, time: '14:25', note: 'La más útil para la mayoría. Poca inercia al despertar.' },
  { minutes: 90, time: '15:35', note: 'Un ciclo entero. Mejor si tienes tiempo de verdad.' },
] as const;

function NapDemo() {
  const [index, setIndex] = useState(1);
  const nap = NAPS[index];

  return (
    <div>
      <div className={`${styles.phases} ${styles.phasesThree}`} role="group" aria-label="Duración de la siesta">
        {NAPS.map((item, napIndex) => (
          <button
            key={item.minutes}
            type="button"
            className={styles.phase}
            aria-pressed={napIndex === index}
            onClick={() => setIndex(napIndex)}
          >
            {item.minutes} min
          </button>
        ))}
      </div>
      <p className={styles.demoTime}>{nap.time}</p>
      <p className={styles.demoMeta}>Alarma si empiezas a las 14:00</p>
      <p className={styles.demoNote}>{nap.note}</p>
    </div>
  );
}

function GestureDemo() {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyTime = async () => {
    try {
      await navigator.clipboard.writeText('06:45');
    } catch {
      /* el aviso basta si el portapapeles no está disponible */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div>
      <button type="button" className={styles.clock} onClick={() => setOpened(true)}>
        23:00
      </button>
      <p className={styles.demoNote}>
        {opened ? 'Así se abre el selector de hora.' : 'Pulsa la hora grande.'}
      </p>
      <div className={styles.sample} data-selected={selected ? 'true' : 'false'}>
        <button
          type="button"
          className={styles.sampleMain}
          aria-pressed={selected}
          onClick={() => setSelected((value) => !value)}
        >
          <span className={styles.sampleTime}>06:45</span>
          <span className={styles.sampleMeta}>5 ciclos · recomendado</span>
        </button>
        <button type="button" className={styles.sampleCopy} onClick={copyTime}>
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
    </div>
  );
}

function Demo({ id }: { id: (typeof STEPS)[number]['id'] }) {
  if (id === 'cycles') return <CycleDemo />;
  if (id === 'night') return <NightDemo />;
  if (id === 'nap') return <NapDemo />;
  return <GestureDemo />;
}

export function IntroGuide({ onClose }: IntroGuideProps) {
  const [step, setStep] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLElement>('button')?.focus();
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      const insideChoice = event.target instanceof Element && event.target.closest('[role="tablist"]');

      if (!insideChoice && event.key === 'ArrowRight') {
        setStep((value) => Math.min(value + 1, STEPS.length - 1));
      }
      if (!insideChoice && event.key === 'ArrowLeft') {
        setStep((value) => Math.max(value - 1, 0));
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;
      const nodes = [...dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input')];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles.mast}>
          <p className={styles.progress} aria-live="polite">
            {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
          </p>
          <nav className={styles.chapters} aria-label="Capítulos">
            {STEPS.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={styles.chapter}
                aria-current={index === step ? 'step' : undefined}
                onClick={() => setStep(index)}
              >
                {item.chapter}
              </button>
            ))}
          </nav>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
        </header>

        <div key={current.id} className={styles.copy}>
          <h2 id={titleId} className={styles.title}>
            {current.title}
          </h2>
          <p className={styles.body}>{current.body}</p>
        </div>

        <div key={`${current.id}-demo`} className={styles.plate}>
          <p className={styles.try}>Pruébalo</p>
          <Demo id={current.id} />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.ghost} onClick={onClose}>
            {isLast ? 'Cerrar' : 'Omitir'}
          </button>
          <div className={styles.nav}>
            {step > 0 ? (
              <button type="button" className={styles.ghost} onClick={() => setStep((value) => value - 1)}>
                Atrás
              </button>
            ) : null}
            <button
              type="button"
              className={styles.primary}
              onClick={() => {
                if (isLast) onClose();
                else setStep((value) => value + 1);
              }}
            >
              {isLast ? 'Empezar' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
