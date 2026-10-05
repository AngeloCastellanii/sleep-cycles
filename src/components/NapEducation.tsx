import { useState } from 'react';
import { NAP_EDUCATION_SECTIONS, type NapGuideEntry } from '../lib/napGuide';
import styles from './EducationSection.module.css';

function NapGuideContent({ entry }: { entry: NapGuideEntry }) {
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

export function NapEducation() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className={styles.wrapper} aria-labelledby="nap-education-heading">
      <h2 id="nap-education-heading" className={styles.heading}>
        Sobre las siestas
      </h2>
      <div className={styles.accordion}>
        {NAP_EDUCATION_SECTIONS.map((section) => {
          const isOpen = openId === section.id;
          const isGuide = section.kind === 'guide';

          return (
            <div key={section.id} className={styles.item}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={`nap-panel-${section.id}`}
                onClick={() => toggle(section.id)}
              >
                <span>{section.title}</span>
                <span className={styles.icon} aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              <div
                id={`nap-panel-${section.id}`}
                className={`${styles.panel} ${isOpen ? styles.open : ''}`}
                role="region"
              >
                <div className={styles.panelInner} inert={!isOpen}>
                  {isGuide ? (
                    <NapGuideContent entry={section.entry} />
                  ) : (
                    <p>{section.content}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
