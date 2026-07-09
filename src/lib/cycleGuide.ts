export interface CycleGuideEntry {
  cycles: number;
  label: string;
  duration: string;
  pros: string[];
  cons: string[];
  recommendedFor: string[];
}

export const CYCLE_GUIDE: CycleGuideEntry[] = [
  {
    cycles: 4,
    label: 'Mínimo',
    duration: '~6 h',
    pros: [
      'Más tiempo disponible al día',
      'Puede bastar de forma puntual si duermes con eficiencia',
    ],
    cons: [
      'Menos REM acumulado',
      'Cansancio y peor concentración si se repite a menudo',
    ],
    recommendedFor: [
      'Horarios muy ajustados de forma ocasional',
      'Personas que se duermen rápido y duermen profundo',
      'No recomendado como rutina diaria',
    ],
  },
  {
    cycles: 5,
    label: 'Recomendado',
    duration: '~7,5 h',
    pros: [
      'Equilibrio entre descanso y tiempo libre',
      'Suficiente sueño profundo y REM para la mayoría',
    ],
    cons: [
      'Puede quedar corto si tardas en dormirte o te despiertas mucho',
    ],
    recommendedFor: [
      'La mayoría de adultos con rutina habitual',
      'Trabajo o estudios con horario estándar',
      'Quien busca el punto óptimo sueño–vida diaria',
    ],
  },
  {
    cycles: 6,
    label: 'Extendido',
    duration: '~9 h',
    pros: [
      'Mayor recuperación física y mental',
      'Más REM; útil tras noches cortas',
    ],
    cons: [
      'Horario más difícil de sostener',
      'Puede generar somnolencia si tu cuerpo no lo necesita',
    ],
    recommendedFor: [
      'Adolescentes y jóvenes en crecimiento',
      'Deportistas con alta carga de entrenamiento',
      'Tras privación de sueño o semanas exigentes',
    ],
  },
];

type TextSection = {
  id: string;
  title: string;
  kind: 'text';
  content: string;
};

type CycleSection = {
  id: string;
  title: string;
  kind: 'cycle';
  entry: CycleGuideEntry;
};

export type EducationSectionItem = TextSection | CycleSection;

export const EDUCATION_SECTIONS: EducationSectionItem[] = [
  {
    id: 'nrem',
    kind: 'text',
    title: 'NREM — Sueño no REM',
    content:
      'Comprende tres etapas: transición (sueño ligero), consolidación y sueño profundo. En las primeras horas predomina el descanso físico y la recuperación corporal.',
  },
  {
    id: 'rem',
    kind: 'text',
    title: 'REM — Sueño paradójico',
    content:
      'El cerebro se activa casi como en vigilia. Aquí ocurren los sueños vívidos, la consolidación de la memoria y el procesamiento emocional. Cada ciclo incluye más REM que el anterior.',
  },
  {
    id: 'wake',
    kind: 'text',
    title: 'Por qué despertar entre ciclos',
    content:
      'Un ciclo completo dura unos 90 minutos y alterna NREM y REM. Si la alarma suena al final de un ciclo, despiertas en sueño ligero y evitas la inercia del sueño — esa sensación de aturdimiento al levantarte.',
  },
  ...CYCLE_GUIDE.map(
    (entry): CycleSection => ({
      id: `cycles-${entry.cycles}`,
      kind: 'cycle',
      title: `${entry.cycles} ciclos — ${entry.label}`,
      entry,
    }),
  ),
];
