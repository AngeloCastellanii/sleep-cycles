import styles from './ModeToggle.module.css';

export type AppView = 'night' | 'nap';

interface ViewToggleProps {
  view: AppView;
  onChange: (view: AppView) => void;
}

const VIEWS: { value: AppView; label: string }[] = [
  { value: 'night', label: 'Sueño nocturno' },
  { value: 'nap', label: 'Siesta' },
];

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  const activeIndex = VIEWS.findIndex((v) => v.value === view);

  return (
    <div className={styles.toggle} role="tablist" aria-label="Tipo de descanso">
      {VIEWS.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={view === item.value}
          className={view === item.value ? styles.active : undefined}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
      <span
        className={styles.indicator}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
        aria-hidden="true"
      />
    </div>
  );
}
