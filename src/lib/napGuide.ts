export const NAP_LATENCY_MIN = 5;

export interface NapOption {
  id: string;
  minutes: number;
  label: string;
  tagline: string;
  recommended: boolean;
}

export interface NapResult extends NapOption {
  time: string;
}

export const NAP_OPTIONS: NapOption[] = [
  {
    id: 'micro',
    minutes: 10,
    label: 'Siesta corta',
    tagline: 'Descanso breve sin aturdimiento',
    recommended: false,
  },
  {
    id: 'power',
    minutes: 20,
    label: 'Siesta recomendada',
    tagline: 'Alerta y energía inmediata',
    recommended: true,
  },
  {
    id: 'focused',
    minutes: 26,
    label: 'Siesta extendida',
    tagline: 'Más recuperación sin llegar al ciclo completo',
    recommended: false,
  },
  {
    id: 'cycle',
    minutes: 90,
    label: 'Ciclo completo',
    tagline: 'Incluye sueño profundo y REM',
    recommended: false,
  },
];

function parseTime(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function formatTime(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function calculateNapWakeTimes(
  startTime: string,
  latency: number = NAP_LATENCY_MIN,
): NapResult[] {
  const start = parseTime(startTime);

  return NAP_OPTIONS.map((option) => ({
    ...option,
    time: formatTime(start + latency + option.minutes),
  }));
}

export interface NapGuideEntry {
  minutes: number;
  label: string;
  duration: string;
  pros: string[];
  cons: string[];
  recommendedFor: string[];
}

export const NAP_GUIDE: NapGuideEntry[] = [
  {
    minutes: 10,
    label: 'Siesta corta',
    duration: '10 min',
    pros: [
      'Despiertas antes del sueño profundo',
      'Sin inercia: alerta casi inmediata',
    ],
    cons: ['El efecto revitalizante dura menos que una siesta de 20 min'],
    recommendedFor: [
      'Bajón de energía a media tarde',
      'Cuando tienes muy poco tiempo',
      'Antes de conducir o una reunión',
    ],
  },
  {
    minutes: 20,
    label: 'Siesta recomendada',
    duration: '20 min',
    pros: [
      'Mejor equilibrio entre descanso y alerta',
      'Mejora concentración, ánimo y memoria',
    ],
    cons: ['Roza el inicio del sueño profundo si te pasas de tiempo'],
    recommendedFor: [
      'La mayoría de las personas',
      'Recarga diaria post-almuerzo',
      'Estudio o trabajo intenso',
    ],
  },
  {
    minutes: 26,
    label: 'Siesta extendida',
    duration: '26 min',
    pros: [
      'Duración basada en estudios de la NASA con pilotos para mejorar alerta y rendimiento',
      'Buen punto medio antes del sueño profundo',
    ],
    cons: ['Puede dejar leve aturdimiento en algunas personas'],
    recommendedFor: [
      'Turnos largos o conducción prolongada',
      'Necesitas máximo rendimiento cognitivo',
    ],
  },
  {
    minutes: 90,
    label: 'Ciclo completo',
    duration: '90 min',
    pros: [
      'Completa un ciclo NREM + REM',
      'Recuperación física y creatividad; despiertas en fase ligera',
    ],
    cons: [
      'Requiere tiempo y buenas condiciones',
      'Si es tarde, puede afectar el sueño nocturno',
    ],
    recommendedFor: [
      'Tras una noche corta o mal dormida',
      'Fines de semana o días libres',
      'Trabajo por turnos',
    ],
  },
];

type NapTextSection = {
  id: string;
  title: string;
  kind: 'text';
  content: string;
};

type NapGuideSection = {
  id: string;
  title: string;
  kind: 'guide';
  entry: NapGuideEntry;
};

export type NapEducationItem = NapTextSection | NapGuideSection;

export const NAP_EDUCATION_SECTIONS: NapEducationItem[] = [
  {
    id: 'when',
    kind: 'text',
    title: 'Cuándo hacer la siesta',
    content:
      'El mejor momento es a primera hora de la tarde, entre las 13:00 y las 15:00, aprovechando el bajón natural de energía tras el almuerzo. Evita hacerla después de las 16:00 para no restarle presión de sueño a la noche.',
  },
  {
    id: 'duration',
    kind: 'text',
    title: 'Cuánto debe durar',
    content:
      'Lo ideal son 10–20 minutos: descansas sin entrar en sueño profundo. Evita el rango de 30–60 min, porque despertar en sueño profundo causa inercia (esa sensación de aturdimiento). Si dispones de tiempo, 90 min completan un ciclo entero.',
  },
  {
    id: 'time',
    kind: 'text',
    title: 'A qué hora ponerla',
    content:
      'Cuanto más tarde la hagas, más interferirá con tu sueño nocturno. Como regla, no duermas siesta a menos de 6–7 horas de tu hora habitual de acostarte.',
  },
  {
    id: 'coffee',
    kind: 'text',
    title: 'Coffee nap: café + siesta',
    content:
      'Toma un café justo antes de una siesta de 20 minutos. La cafeína tarda unos 20–30 min en hacer efecto, así que despiertas justo cuando empieza a actuar: doble efecto de alerta.',
  },
  ...NAP_GUIDE.map(
    (entry): NapGuideSection => ({
      id: `nap-${entry.minutes}`,
      kind: 'guide',
      title: `${entry.duration} — ${entry.label}`,
      entry,
    }),
  ),
];
