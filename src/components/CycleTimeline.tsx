import { useMemo, useState } from 'react';
import styles from './CycleTimeline.module.css';

interface CycleTimelineProps {
  cycles: number;
  highlightedCycle: number;
}

interface ArcSegment {
  id: string;
  d: string;
  type: 'nrem' | 'rem';
  cycleIndex: number;
  label: string;
  x1: number;
  x2: number;
}

const WIDTH = 100;
const HEIGHT = 40;
const BASELINE = HEIGHT - 6;

function buildArcs(cycles: number): ArcSegment[] {
  const phasesPerCycle = 2;
  const totalPhases = cycles * phasesPerCycle;
  const phaseWidth = WIDTH / totalPhases;
  const arcs: ArcSegment[] = [];

  for (let i = 0; i < totalPhases; i++) {
    const x1 = i * phaseWidth;
    const x2 = (i + 1) * phaseWidth;
    const mid = (x1 + x2) / 2;
    const isNrem = i % 2 === 0;
    const cycleIndex = Math.floor(i / 2) + 1;
    const amplitude = isNrem ? 12 : 9;
    const direction = isNrem ? 1 : -1;

    arcs.push({
      id: `phase-${i}`,
      type: isNrem ? 'nrem' : 'rem',
      cycleIndex,
      label: isNrem ? 'NREM' : 'REM',
      x1,
      x2,
      d: `M ${x1} ${BASELINE} Q ${mid} ${BASELINE + direction * amplitude} ${x2} ${BASELINE}`,
    });
  }

  return arcs;
}

export function CycleTimeline({ cycles, highlightedCycle }: CycleTimelineProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const arcs = useMemo(() => buildArcs(cycles), [cycles]);
  const active = arcs.find((arc) => arc.id === activeId) ?? null;

  return (
    <div className={styles.wrapper}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className={styles.svg}
        role="img"
        aria-label={`${cycles} ciclos de sueño alternando NREM y REM`}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setActiveId(null);
        }}
      >
        {Array.from({ length: cycles - 1 }, (_, i) => {
          const x = ((i + 1) / cycles) * WIDTH;
          return (
            <line
              key={`tick-${i}`}
              x1={x}
              y1={BASELINE - 1}
              x2={x}
              y2={BASELINE + 1}
              className={styles.tick}
            />
          );
        })}

        <line
          x1="0"
          y1={BASELINE}
          x2={WIDTH}
          y2={BASELINE}
          className={styles.baseline}
        />

        {arcs.map((arc) => {
          const isHighlighted = arc.cycleIndex === highlightedCycle;
          const isActive = arc.id === activeId;

          return (
            <g key={arc.id}>
              <rect
                x={arc.x1}
                y="0"
                width={arc.x2 - arc.x1}
                height={HEIGHT}
                className={styles.hitArea}
                onPointerEnter={() => setActiveId(arc.id)}
                onPointerDown={() => setActiveId(arc.id)}
              />
              <path
                d={arc.d}
                fill="none"
                className={[
                  styles.arc,
                  styles[arc.type],
                  isHighlighted ? styles.highlighted : '',
                  isActive ? styles.active : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}
      </svg>

      <div className={styles.footer}>
        <div className={styles.legend}>
          <span className={styles.nrem}>NREM</span>
          <span className={styles.rem}>REM</span>
        </div>
        <p className={styles.caption} aria-live="polite">
          {active ? (
            <>
              Ciclo {active.cycleIndex} · <span>{active.label}</span>
            </>
          ) : (
            <span className={styles.captionMuted}>
              {cycles} {cycles === 1 ? 'ciclo' : 'ciclos'} · explora una fase
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
