# Animations & Transitions Reference

Análisis de las animaciones de [landonorris.com](https://landonorris.com) aplicadas al portfolio de Anthony.

---

## 1. Stack de animación detectado en landonorris.com

| Librería / Técnica | Rol |
|---|---|
| **Lenis** | Smooth scrolling — reemplaza el scroll nativo con una curva suave |
| **Rive** | Animaciones interactivas vectoriales (canvas-based) |
| **CSS custom properties** | Timing consistente en todo el sitio |
| **Clip-path transitions** | Revelar/ocultar elementos con formas |
| **Split text + line clip** | Texto que "sale" línea a línea desde detrás de un mask |
| **Horizontal scroll sections** | Sección que hace scroll horizontal al hacer scroll vertical |
| **Sticky hero** | El hero se queda fijo mientras el contenido sube encima |
| **CSS Marquee** | Texto/logos que corren infinitamente |
| **Nav theme transition** | La navbar cambia de color según la sección visible |

---

## 2. Variables de timing usadas en landonorris.com

```css
--cubic-default: cubic-bezier(0.65, 0.05, 0, 1);
--duration-default: 0.75s;
--animation-default: var(--duration-default) var(--cubic-default);
```

Esta curva tiene una salida muy suave (`0, 1` al final) — da sensación de "peso" y elegancia.
Equivale a una ease-out con inercia pronunciada.

---

## 3. Efectos a implementar en este portfolio

### 3.1 Smooth Scrolling con Lenis

**Qué hace:** Reemplaza el scroll nativo con una interpolación suave. El contenido sigue al dedo/rueda con inercia.

**Cómo se ve:** El scroll no se detiene abruptamente — tiene un "deslizamiento" al soltar.

**Implementación:**
```bash
npm install @studio-freight/lenis
# o el fork moderno:
npm install lenis
```

```ts
// src/hooks/useLenis.ts
import Lenis from 'lenis';
import { useEffect } from 'react';

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}
```

Agregar en `PortfolioWrapper` o en el layout principal.

**Compatibilidad con Theatre.js:** Lenis tiene integración con GSAP ScrollTrigger. Con Theatre.js hay que sincronizar manualmente pasando `lenis.scroll` a `useTheatreScroll`.

---

### 3.2 Split Text Animation (entrada de títulos línea a línea)

**Qué hace:** Las palabras/líneas de un título entran desde debajo de un `overflow: hidden` container. Efecto de "cortina".

**Cómo se ve:**
```
[ título oculto ]
     ↓ scroll
[ A] ← aparece línea 1
[ An]
[ Ant]
[Anthony] ← línea completa visible
```

**CSS:**
```css
.split-line-wrapper {
  overflow: hidden;
  display: block;
}

.split-line {
  display: block;
  transform: translateY(110%);
  transition: transform 0.8s cubic-bezier(0.65, 0.05, 0, 1);
}

.split-line.is-visible {
  transform: translateY(0);
}
```

**JS (con IntersectionObserver):**
```ts
// Wrappear cada línea en un .split-line-wrapper > .split-line
// Observar el wrapper, añadir .is-visible al hacer scroll
```

**Dónde aplicar en el portfolio:**
- `HomeSection` — nombre "Anthony Avila" + rol (typewriter actual se puede combinar con esto)
- `AboutSection` — título "About Me"
- `SkillsSection` — título "Skills"
- `ProjectsSection` — título "Projects"
- `ContactSection` — título "Contact"

---

### 3.3 Clip-path Reveal en tarjetas/imágenes

**Qué hace:** Las imágenes o cards aparecen con una animación de `clip-path` que se expande.

**Cómo se ve en Lando Norris:** Las fotos del helmet gallery se revelan desde `clip-path: inset(100% 0 0 0)` hasta `clip-path: inset(0% 0 0 0)`.

**CSS:**
```css
.clip-reveal {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.9s cubic-bezier(0.65, 0.05, 0, 1);
}

.clip-reveal.is-visible {
  clip-path: inset(0% 0 0 0);
}
```

**Variantes:**
```css
/* Desde la izquierda */
clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)

/* Desde el centro */
clip-path: inset(0 50% 0 50%) → inset(0 0% 0 0%)

/* Desde arriba */
clip-path: inset(0 0 100% 0) → inset(0 0 0% 0)
```

**Dónde aplicar:**
- `ProjectCard` — imagen del proyecto al hacer scroll
- `CertificateCard` — imagen/badge
- `SkillsSection` — íconos de tecnologías

---

### 3.4 Nav Theme Transition (navbar cambia según sección)

**Qué hace:** Cuando el scroll pasa sobre distintas secciones, la navbar cambia de color (fondo claro → oscuro, o viceversa).

**Cómo se ve:** En Lando Norris la nav se vuelve oscura sobre el hero y clara sobre las secciones blancas.

**En nuestro portfolio:** La navbar podría tener un fondo `transparent` en Home y `rgba(0,0,0,0.8) + blur` en el resto. O cambiar el color del texto/logo.

**Implementación con IntersectionObserver:**
```ts
// data-nav-theme="dark" | "light" en cada section
// Observer en Navbar que detecta cuál section está en el top del viewport
// Aplica clase al <nav>
```

**Estado actual:** La navbar actual (`src/components/ui/Navbar.tsx`) necesita revisión para confirmar si ya tiene algo similar.

---

### 3.5 Stagger Animations (elementos que entran en cascada)

**Qué hace:** Una lista de elementos (skills, proyectos) entra uno tras otro con un pequeño delay entre cada uno.

**CSS:**
```css
.stagger-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.stagger-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Delays escalonados */
.stagger-item:nth-child(1) { transition-delay: 0ms; }
.stagger-item:nth-child(2) { transition-delay: 80ms; }
.stagger-item:nth-child(3) { transition-delay: 160ms; }
.stagger-item:nth-child(4) { transition-delay: 240ms; }
/* ... */
```

**Dónde aplicar:**
- `SkillsSection` — íconos de habilidades
- `ProjectsSection` — cards de proyectos
- `AboutSection` — stats/badges

---

### 3.6 Marquee (texto corriendo)

**Qué hace:** Una fila de logos/texto que se mueve horizontalmente de forma continua e infinita.

**Cómo se ve en Lando Norris:** Hay dos tracks — uno va a la izquierda y otro a la derecha, creando profundidad.

**CSS (ya casi existe en el sitio de Lando):**
```css
@keyframes marquee-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-left 30s linear infinite;
}

/* Pausar en hover */
.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}
```

**Dónde aplicar:**
- `SkillsSection` — logos de tecnologías en dos filas con dirección opuesta
- `AboutSection` — posiblemente para certificaciones o partners

---

### 3.7 Hover Clip-path en Project Cards

**Qué hace:** Al hacer hover sobre una card, la imagen se revela con un clip-path animado.

**Cómo se ve en Lando Norris:** Las imágenes del helmet pasan de `ellipse(80% 50%)` a `ellipse(100% 60%)` al hover.

**Aplicación en ProjectCard:**
```css
.project-card-image {
  clip-path: inset(0 0 20% 0);
  transition: clip-path 0.6s cubic-bezier(0.65, 0.05, 0, 1);
}

.project-card:hover .project-card-image {
  clip-path: inset(0 0 0% 0);
}
```

---

## 4. Estado actual del portfolio vs. lo que falta

| Efecto | Estado actual | Acción requerida |
|---|---|---|
| Fade-up en scroll | ✅ Implementado (`data-scroll="fade-up"`) | Mejorar easing |
| Split text por líneas | ❌ No existe | Implementar |
| Smooth scrolling (Lenis) | ❌ No existe | Instalar + integrar |
| Clip-path reveal | ❌ No existe | Implementar en cards |
| Nav theme por sección | ❌ No existe | Implementar en Navbar |
| Stagger animations | ❌ No existe | Implementar |
| Marquee de skills | ❌ No existe | Implementar en SkillsSection |
| Hover clip-path cards | ❌ No existe | Implementar en ProjectCard |
| CSS timing variables | ❌ No existe | Agregar a global.css |

---

## 5. Orden de implementación sugerido

1. **CSS timing variables** — base para todo (10 min)
2. **Lenis smooth scroll** — cambia la sensación general (30 min)
3. **Stagger animations** — reutilizable, alto impacto visual (1 hr)
4. **Split text** — alto impacto en títulos (1 hr)
5. **Clip-path reveal en cards** — ProjectCard + CertificateCard (1 hr)
6. **Marquee en SkillsSection** — reemplaza el grid estático (1 hr)
7. **Nav theme transition** — pulido final (30 min)
8. **Hover clip-path** — detalle en ProjectCard (30 min)

---

## 6. Consideraciones de compatibilidad

- **Theatre.js + Lenis:** Lenis consume el evento `scroll`. Para que `useTheatreScroll` siga funcionando, hay que pasarle `lenis.scroll` (valor en px) en lugar de `window.scrollY`. Ajustar `useTheatreScroll.ts` para aceptar una fuente de scroll externa.
- **`pointer-events: none` en `#content-sections`:** Las animaciones CSS puras no se ven afectadas. Las interacciones hover en cards ya tienen `pointer-events: auto` en `.section-container`.
- **`prefers-reduced-motion`:** Envolver todas las animaciones nuevas con `@media (prefers-reduced-motion: no-preference)`.
- **Performance:** Clip-path y transform son GPU-accelerated. Lenis + RAF puede aumentar CPU en mobile — considerar desactivar Lenis en mobile (< 1024px).
