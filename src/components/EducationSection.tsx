import { useState } from 'react';
import type { CycleGuideEntry } from '../lib/cycleGuide';
import { EDUCATION_SECTIONS } from '../lib/cycleGuide';
import styles from './EducationSection.module.css';

function CycleGuideContent({ entry }: { entry: CycleGuideEntry }) {
  return (
    <article className={styles.guideEntry}>
      <header className={styles.guideHeader}>
        <span className={styles.guideLabel}>{entry.label}</span>
        <span className={styles.guideDuration}>{entry.duration}</span>
      </header>

      <div className={styles.guideBlock}>
        <h3 className={styles.guideHeading}>Pros</h3>
        <ul>
          {entry.pros.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.guideBlock}>
        <h3 className={styles.guideHeading}>Contras</h3>
        <ul>
          {entry.cons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className={styles.guideBlock}>
        <h3 className={styles.guideHeading}>Recomendado para</h3>
        <ul>
          {entry.recommendedFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function EducationSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className={styles.wrapper} aria-labelledby="education-heading">
      <h2 id="education-heading" className={styles.heading}>
        Sobre los ciclos
      </h2>
      <div className={styles.accordion}>
        {EDUCATION_SECTIONS.map((section) => {
          const isOpen = openId === section.id;
          const isCycle = section.kind === 'cycle';

          return (
            <div key={section.id} className={styles.item}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={`panel-${section.id}`}
                onClick={() => toggle(section.id)}
              >
                <span>{section.title}</span>
                <span className={styles.icon} aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={`panel-${section.id}`}
                className={`${styles.panel} ${isOpen ? styles.open : ''} ${isCycle ? styles.panelGuide : ''}`}
                role="region"
                hidden={!isOpen}
              >
                {isCycle ? (
                  <CycleGuideContent entry={section.entry} />
                ) : (
                  <p>{section.content}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
