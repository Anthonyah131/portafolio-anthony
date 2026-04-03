# Skills Section Redesign — Editorial Horizontal Scroll

## Referencia analizada: landonorris.com

La sección horizontal de landonorris.com fue analizada con Chrome DevTools MCP. A continuación
los hallazgos técnicos y visuales clave, seguidos del plan de adaptación para la Skills section.

---

## 1. Cómo funciona el efecto (técnica)

### Mecánica de sticky + translateX

```
Section wrapper  →  position: relative; height: 2282px  (extra altura = distancia horizontal)
  └─ .horizontal-pin-sticky  →  position: sticky; top: 0; height: 100vh
       └─ .horizontal-track  →  width: 3818px; transform: translateX(-Xpx)  ← JS lo mueve
```

- El `<section>` ocupa más altura de lo normal. Esa "altura extra" equivale exactamente
  al total de píxeles que el track viaja horizontalmente.
  - Viewport: 1536px ancho
  - Track total: 3818px
  - Viaje horizontal: 3818 – 1536 = **2282px**
  - Altura extra del section: **2282px**
- El contenedor interno usa `position: sticky; top: 0` → se queda fijo mientras el usuario
  hace scroll vertical.
- JS calcula el progreso del scroll dentro del section y aplica `translateX` al track.
- Resultado visual: el viewport parece "congelado" pero el contenido se desliza de derecha
  a izquierda.

> Este mecanismo **ya está implementado** en `src/components/sections/SkillsSection.tsx`
> con `wrapperRef` / `trackRef`. La base técnica está lista.

---

## 2. Estructura del grid en landonorris.com

El track es un `display: flex` de **columnas de ancho variable**. Dentro de cada columna
los ítems están **absolutamente posicionados** a distintas alturas, creando la sensación de
collage editorial asimétrico.

### Columnas del track (izq → der)

| # | Clase CSS | Ancho | Contenido |
|---|-----------|-------|-----------|
| 1 | `horizontal-grid-col` | 199px | 2 fotos pequeñas (arriba y abajo) |
| 2 | `large-img is-home1` | 444px | Quote text arriba + foto héroe grande al centro |
| 3 | `is-home-flip neg-margin` | 215px | Foto pequeña arriba (solapada con col 2) |
| 4 | base | 145px | Foto pequeña abajo |
| 5 | base | 150px | Foto pequeña arriba |
| 6 | base | 427px | Foto grande + quote callout debajo |
| 7 | `neg-margin` | 215px | Foto mediana arriba + foto pequeña abajo |

### Posiciones verticales de los ítems (dentro de un viewport de 678px)

```
top: 47px  → zona alta   (labels + imágenes pequeñas superior)
top: 59px  → zona alta   (callout de texto)
top: 102px → zona alta-media
top: 149px → zona media
top: 212px → zona media  (inicio de foto héroe grande)
top: 317px → zona baja-media
top: 360px → zona baja   (segunda imagen columna 1)
top: 411px → zona baja
top: 428px → zona baja   (tercera imagen col 3)
top: 519px → zona muy baja (callout de texto inferior)
```

### Tamaños de ítems

| Tipo | Dimensiones aprox. | Uso |
|------|--------------------|-----|
| Pequeño | 145–200 × 165–255px | Skills individuales / ícono |
| Mediano | 215 × 236–269px | Skills destacadas / categoría |
| Grande héroe | 444 × 430px | Tecnología principal (React, etc.) |
| Callout texto | 247–427 × 105px | Frase/descripción corta |
| Label | texto solo | Nombre del grupo encima del card |

### Detalles visuales adicionales

- El **label** (texto pequeño tipo `QATAR, 2024`) aparece **encima** de cada imagen, en
  tipografía small-caps letra espaciada.
- Los callouts de texto usan tipografía serif grande con palabras en **bold inline**.
- Algunos ítems se **solapan** entre columnas (clase `neg-margin`), rompiendo la rigidez
  del grid.
- El fondo **cambia de color** durante el scroll: arranca oscuro (`#1e211a` verde militar)
  y pasa a crema claro (`#e8e4d8`) en el punto medio de la sección.
- Las fotos alternan entre **color y blanco/negro** para dar variedad tonal.

---

## 3. Plan de adaptación para SkillsSection

### Filosofía general

> Reemplazar las "fotos + labels de eventos" por **cards de tecnologías + labels de categoría**,
> manteniendo exactamente la misma mecánica de grid asimétrico con ítems a distintas alturas
> y tamaños.

### 3.1 Estructura de columnas propuesta

El track tendrá **8 clusters** (no columnas uniformes). Cada cluster agrupa tecnologías
relacionadas con distintos tamaños según su relevancia:

```
[INTRO]  [FRONTEND CORE]    [TS/OVERLAP] [STYLING]  [BACKEND]         [TOOLS]       [END]
  ←          ←                  ←           ←           ←                 ←
```

| Cluster | Ancho | Contenido | Posición vertical |
|---------|-------|-----------|-------------------|
| 0 — Intro text | 300px | Eyebrow label + frase corta (callout) | top: 60px |
| 1 — HTML / CSS | 200px | 2 cards pequeños apilados | top: 50px y top: 370px |
| 2 — React (héroe) | 460px | Card grande centrado + label "Frontend" arriba | top: 180px |
| 3 — TypeScript (overlap) | 200px | Card mediano, solapado con cluster 2 | top: 50px |
| 4 — Next.js / Astro | 220px | Card mediano abajo | top: 320px |
| 5 — Node / Express | 160px | Card pequeño arriba | top: 100px |
| 6 — Python (héroe 2) | 440px | Card grande + callout texto debajo | top: 60px |
| 7 — DB / DevOps | 220px | Card mediano arriba + card pequeño abajo | top: 140px / 420px |
| 8 — End cap | 80px | Espacio de respiración | — |

### 3.2 Tamaños de los cards

```
Card XL  (hero)   → 280 × 320px   React, Python/FastAPI
Card M   (medium) → 180 × 210px   TypeScript, Next.js, Astro, Node.js, PostgreSQL
Card S   (small)  → 130 × 155px   HTML, CSS, Docker, Git, Tailwind, etc.
Callout  (texto)  → ancho libre × 90px  Una frase corta de 1–2 líneas
```

### 3.3 Anatomía de cada card

```
┌────────────────────────┐
│  LABEL (categoría)     │  ← texto pequeño tipo "FRONTEND · CORE"
│                        │
│   [ícono devicon]      │  ← icon grande centrado
│                        │
│   Nombre tecnología    │  ← fuente label bold
│                        │
│   ────────  xx%        │  ← barra de proficiencia sutil (opcional en XL)
└────────────────────────┘
```

- Fondo del card: semi-transparente (`rgba(var(--bg-surface), 0.6)`) con
  `backdrop-filter: blur(12px)` — similar a glassmorphism suave.
- Borde: `1px solid rgba(255,255,255,0.06)` o variante de `var(--outline-var)`.
- Sin rotaciones aleatorias (a diferencia del diseño actual) — los cards van rectos,
  la asimetría viene de las posiciones verticales y tamaños.

### 3.4 Callouts de texto

Dos o tres frases cortas distribuidas en el track, al estilo de LN:

```
"Building interfaces
 that feel *fast*."

"From REST APIs to
 *real-time* systems."
```

Tipografía: `var(--font-headline)` en itálica, palabras clave en bold/color accent.

### 3.5 Labels de categoría

Encima de cada cluster o card principal, un label pequeño exactamente como LN:

```css
font-family: var(--font-label);
font-size: 0.58rem;
letter-spacing: 0.3em;
text-transform: uppercase;
color: var(--secondary);
```

Ejemplos: `FRONTEND`, `BACKEND`, `TOOLING`, `DATABASE`, `DEVOPS`

### 3.6 Transición de color de fondo

La sección arranca con el fondo oscuro del portfolio y transiciona hacia un tono
ligeramente más claro/cálido hacia el final del scroll horizontal, usando `opacity`
o `mix-blend-mode` en un overlay que varía con `progress`.

```tsx
// background overlay que desvanece
<div style={{
  position: 'absolute', inset: 0, pointerEvents: 'none',
  background: 'var(--bg-surface)',
  opacity: progress * 0.15,  // sutil, no dramático
}} />
```

### 3.7 Ítem de solapamiento (neg-margin)

TypeScript (cluster 3) se posicionará para solaparse visualmente con el borde derecho
del card héroe de React, al igual que LN usa `neg-margin`. Se logra con `margin-left`
negativo en el cluster o con `position: absolute` respecto al track + z-index superior.

---

## 4. Cambios en el componente existente

### Qué conservar
- Mecánica de scroll (`wrapperRef`, `trackRef`, `translateX` por progreso) ✓
- Altura del wrapper calculada en `vh` ✓
- `position: sticky` del viewport interno ✓
- Header con label "Expertise" + título ✓
- Barra de progreso ✓

### Qué cambiar
- **Estructura del track**: de "columnas por categoría con skills scatter" →
  **clusters manuales posicionados editorialmente** (como LN)
- **Cards**: de ícono+nombre absolutamente posicionado con rotación →
  **cards con fondo glassmorphism, label, ícono, nombre, sin rotación**
- **Sizing**: de tamaños pseudo-aleatorios via hash → **3 tallas fijas (XL, M, S)**
  asignadas manualmente según relevancia de la tecnología
- **Data source**: en vez de iterar `skillCategories` genéricamente, definir un array
  `TRACK_ITEMS` con la posición editorial de cada cluster hardcodeada
- **Fondo**: añadir transición de color sutil por progreso

### Nuevo tipo de dato propuesto

```ts
type TrackCluster = {
  id: string;
  label?: string;           // eyebrow label (e.g. "FRONTEND")
  type: 'skills' | 'callout';
  width: number;            // ancho del cluster en px
  negMargin?: number;       // solapamiento con cluster anterior
  items?: TrackSkillItem[];
  calloutText?: string;     // solo si type === 'callout'
};

type TrackSkillItem = {
  skill: Skill;             // de src/data/skills.ts
  size: 'xl' | 'm' | 's';
  top: number;              // posición vertical en px dentro del cluster
  left: number;             // offset horizontal dentro del cluster
};
```

---

## 5. Hooks / librerías necesarias

| Necesidad | Solución |
|-----------|----------|
| Smooth scroll progress | `useLenis.ts` ya existe en el proyecto |
| translateX animado | RAF manual o `useScrollReveal` — ya hay base |
| Glassmorphism CSS | CSS puro, sin nueva dependencia |
| Devicons | Ya en uso en el proyecto |

---

## 6. Consideraciones de rendimiento

- El track es un único `div` con `will-change: transform` — el navegador lo sube a su
  propia capa de composición. ✓
- Cards con `backdrop-filter` pueden ser costosos si hay muchos. Limitar a cards XL o
  deshabilitar en `prefers-reduced-motion`.
- Ídem para `usePerformanceMode`: en modo `low`, renderizar sin backdrop-filter y sin
  transición de fondo.

---

## 7. Mobile fallback

En pantallas < 768px el scroll horizontal con sticky no es agradable. Propuesta:
- Desactivar el sticky scroll
- Mostrar los clusters como un **scroll horizontal nativo** (`overflow-x: auto`)
  o como un stack vertical con cards en grid 2 columnas.

---

## 8. Resumen visual del track final (esquema simplificado)

```
viewport (1536px)
├────────────────────────────────────────────────────────────── track 3800px ──┤

[callout] [S html] [S css] [──────── XL React ────────] [M TS] [M next] [S node] [──── XL Python ────] [M pg] [S docker]
           top:50   top:380          top:180               top:50  top:320  top:100       top:60            top:140  top:430
           
           ↑ label: FRONTEND         ↑ label: FRONTEND      ↑overlap     ↑ label: BACKEND      ↑ label: TOOLING
```

---

*Documento generado el 2026-04-01. Análisis basado en inspección de landonorris.com con Chrome DevTools MCP.*
