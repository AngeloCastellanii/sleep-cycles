import { useEffect, useId, useRef, useState } from 'react';
import styles from './IntroGuide.module.css';

interface IntroGuideProps {
  onClose: () => void;
}

const STEPS = [
  {
    kicker: '01',
    title: 'Despierta al cerrar un ciclo',
    body: 'El sueño avanza en ciclos de unos 90 minutos. Cada uno alterna sueño profundo (NREM) y sueño REM. Si la alarma corta un ciclo a la mitad, cuesta más levantarte con la cabeza clara.',
    sketch: true,
  },
  {
    kicker: '02',
    title: 'De noche hay dos cálculos',
    body: '«Me voy a dormir» te dice a qué hora poner la alarma. «Quiero despertar» te dice a qué hora acostarte. Ajusta los minutos que tardas en dormirte. La hora en color tierra es la recomendada: cinco ciclos, cerca de 7,5 horas.',
  },
  {
    kicker: '03',
    title: 'La siesta, corta y a tiempo',
    body: 'En Siesta indicas cuándo empiezas. Se suman unos minutos para quedarte dormido y aparecen varias alarmas. Veinte minutos suele devolver alerta sin el aturdimiento del sueño profundo. Noventa minutos cubre un ciclo entero.',
  },
  {
    kicker: '04',
    title: 'Tres gestos',
    points: [
      'Pulsa la hora grande para cambiarla, o usa la hora actual.',
      'Elige una fila para marcarla. De noche, la gráfica muestra ese ciclo.',
      'Copia la hora y ponla en la alarma del teléfono.',
    ],
  },
] as const;

function CycleSketch() {
  return (
    <svg className={styles.sketch} viewBox="0 0 240 56" aria-hidden="true">
      <line x1="0" y1="44" x2="240" y2="44" className={styles.sketchBase} />
      <path
        d="M0 44 Q30 14 60 44"
        fill="none"
        className={styles.sketchNrem}
      />
      <path
        d="M60 44 Q90 58 120 44"
        fill="none"
        className={styles.sketchRem}
      />
      <path
        d="M120 44 Q150 18 180 44"
        fill="none"
        className={styles.sketchNrem}
      />
      <path
        d="M180 44 Q210 56 240 44"
        fill="none"
        className={styles.sketchRem}
      />
    </svg>
  );
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
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const nodes = [
        ...dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input'),
      ];
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
        <p className={styles.progress} aria-live="polite">
          Paso {step + 1} de {STEPS.length}
        </p>

        <div key={step} className={styles.step}>
          <p className={styles.kicker}>{current.kicker}</p>
          <h2 id={titleId} className={styles.title}>
            {current.title}
          </h2>
          {'sketch' in current && current.sketch ? <CycleSketch /> : null}
          {'body' in current ? <p className={styles.body}>{current.body}</p> : null}
          {'points' in current ? (
            <ul className={styles.points}>
              {current.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.ghost} onClick={onClose}>
            {isLast ? 'Cerrar' : 'Omitir'}
          </button>
          <div className={styles.nav}>
            {step > 0 ? (
              <button
                type="button"
                className={styles.ghost}
                onClick={() => setStep((value) => value - 1)}
              >
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
