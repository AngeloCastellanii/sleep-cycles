# Ciclos de Sueño

PWA responsiva que calcula horarios óptimos para dormir o despertar según ciclos NREM/REM de 90 minutos.

## Desarrollo local

```bash
pnpm install
pnpm dev
```

## Tests

```bash
pnpm test
```

## Build

```bash
pnpm build
pnpm preview
```

## Despliegue en Vercel

1. Sube el proyecto a un repositorio Git
2. Importa el repo en [vercel.com](https://vercel.com)
3. Vercel detectará Vite automáticamente:
   - **Build command:** `pnpm build`
   - **Output directory:** `dist`
   - **Install command:** `pnpm install`
4. Despliega y verifica la instalación PWA desde el navegador móvil

## Funcionalidades

- Modo *Me voy a dormir* → horas recomendadas para la alarma
- Modo *Quiero despertar a las…* → horas recomendadas para acostarse
- Latencia de sueño ajustable (5–30 min)
- Visualización SVG de ciclos NREM/REM
- Instalable como PWA con soporte offline básico
