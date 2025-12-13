# 🚀 Guía de Análisis de Rendimiento

Esta guía te ayudará a analizar y mejorar el rendimiento de tu portafolio en diferentes dispositivos.

## 📊 Herramientas de Análisis

### 1. **Lighthouse (Chrome DevTools)**
La herramienta más completa y recomendada.

#### Cómo usar:
1. Abre Chrome DevTools (F12)
2. Ve a la pestaña **Lighthouse**
3. Selecciona:
   - ✅ Performance
   - ✅ Mobile o Desktop
   - ✅ Clear storage
4. Click en **Analyze page load**

#### Métricas importantes:
- **First Contentful Paint (FCP)**: < 1.8s (bueno)
- **Largest Contentful Paint (LCP)**: < 2.5s (bueno)
- **Time to Interactive (TTI)**: < 3.8s (bueno)
- **Total Blocking Time (TBT)**: < 200ms (bueno)
- **Cumulative Layout Shift (CLS)**: < 0.1 (bueno)

#### Simular dispositivos:
- En DevTools, click en el icono de dispositivo móvil (Ctrl+Shift+M)
- Selecciona diferentes dispositivos:
  - iPhone 12 Pro
  - Samsung Galaxy S20
  - iPad Pro
  - Pixel 5

---

### 2. **PageSpeed Insights (Google)**
Análisis en línea con datos reales de usuarios.

#### Cómo usar:
1. Ve a: https://pagespeed.web.dev/
2. Ingresa la URL de tu sitio (debe estar desplegado)
3. Click en **Analyze**
4. Revisa resultados para Mobile y Desktop

#### Ventajas:
- Usa datos reales de usuarios
- Compara con otros sitios
- Sugerencias específicas de optimización

---

### 3. **Chrome DevTools Performance Tab**
Para análisis detallado de rendimiento en tiempo real.

#### Cómo usar:
1. Abre Chrome DevTools (F12)
2. Ve a la pestaña **Performance**
3. Click en el botón de grabación (círculo)
4. Interactúa con la página (scroll, hover, etc.)
5. Detén la grabación
6. Analiza:
   - **FPS**: Debe estar cerca de 60fps
   - **CPU**: Busca picos altos
   - **Network**: Tiempos de carga
   - **Main Thread**: Busca tareas largas (>50ms)

#### Filtrar por dispositivo:
- En DevTools → Settings → Experiments
- Activa "CPU throttling" para simular dispositivos lentos

---

### 4. **Network Tab (Chrome DevTools)**
Para analizar tiempos de carga de recursos.

#### Cómo usar:
1. Abre Chrome DevTools (F12)
2. Ve a la pestaña **Network**
3. Selecciona:
   - **Throttling**: Fast 3G, Slow 3G, etc.
   - **Disable cache**: Para pruebas reales
4. Recarga la página (Ctrl+R)
5. Revisa:
   - Tiempo total de carga
   - Recursos más pesados
   - Recursos bloqueantes

---

### 5. **React DevTools Profiler**
Para analizar el rendimiento de componentes React.

#### Cómo usar:
1. Instala React DevTools (extensión de Chrome)
2. Abre DevTools → pestaña **Profiler**
3. Click en "Record"
4. Interactúa con la página
5. Detén la grabación
6. Analiza:
   - Componentes que se renderizan más
   - Tiempo de renderizado
   - Componentes que causan re-renders innecesarios

---

## 🎯 Métricas Clave a Revisar

### Core Web Vitals (Google)
1. **LCP (Largest Contentful Paint)**
   - Objetivo: < 2.5s
   - Mide: Tiempo hasta que el contenido principal es visible

2. **FID (First Input Delay)**
   - Objetivo: < 100ms
   - Mide: Tiempo hasta que la página responde a la interacción

3. **CLS (Cumulative Layout Shift)**
   - Objetivo: < 0.1
   - Mide: Estabilidad visual (cuánto se mueven los elementos)

### Otras Métricas Importantes
- **FPS**: 60fps constante durante scroll/animaciones
- **Bundle Size**: JavaScript total < 500KB (comprimido)
- **Time to First Byte (TTFB)**: < 600ms
- **Total Blocking Time**: < 200ms

---

## 📱 Probar en Diferentes Dispositivos

### Opción 1: Chrome DevTools Device Emulation
1. F12 → Click en icono de dispositivo
2. Selecciona dispositivo o crea uno personalizado
3. Ajusta:
   - Resolución
   - DPR (Device Pixel Ratio)
   - CPU throttling (4x slowdown, 6x slowdown)
   - Network throttling

### Opción 2: Dispositivos Reales
- **Android**: Chrome Remote Debugging
  - Conecta tu teléfono por USB
  - Activa "USB Debugging"
  - En Chrome: `chrome://inspect`
  
- **iOS**: Safari Web Inspector
  - Conecta iPhone/iPad por USB
  - En Mac: Safari → Develop → [Tu dispositivo]

### Opción 3: Servicios Online
- **BrowserStack**: https://www.browserstack.com/
- **LambdaTest**: https://www.lambdatest.com/
- **Responsively App**: https://responsively.app/ (gratis, desktop)

---

## 🔧 Scripts Útiles

### Análisis Local con Lighthouse CLI
```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Analizar localhost
lighthouse http://localhost:4321 --view

# Analizar con throttling (simular móvil lento)
lighthouse http://localhost:4321 --throttling.cpuSlowdownMultiplier=4 --view

# Generar reporte HTML
lighthouse http://localhost:4321 --output html --output-path ./lighthouse-report.html
```

### Análisis de Bundle Size
```bash
# Ver tamaño de bundles
npm run build
# Revisa la salida del build para ver tamaños de chunks
```

---

## 🐛 Problemas Comunes y Soluciones

### 1. **LCP Lento**
- **Causa**: Imágenes grandes o 3D scene pesado
- **Solución**: 
  - Lazy load del canvas 3D
  - Optimizar imágenes (WebP, compresión)
  - Preload de recursos críticos

### 2. **TBT Alto (Total Blocking Time)**
- **Causa**: JavaScript bloqueante
- **Solución**:
  - Code splitting
  - Lazy load de Three.js/Theatre.js
  - Defer/async en scripts

### 3. **CLS Alto (Layout Shift)**
- **Causa**: Elementos que se mueven al cargar
- **Solución**:
  - Reservar espacio para imágenes
  - Evitar cambios de tamaño dinámicos
  - Usar `transform` en lugar de cambiar dimensiones

### 4. **FPS Bajo**
- **Causa**: Animaciones pesadas o demasiados elementos 3D
- **Solución**:
  - Reducir estrellas/luces
  - Usar `usePerformanceMode` hook
  - Throttle de scroll events

### 5. **Bundle Size Grande**
- **Causa**: Muchas dependencias cargadas
- **Solución**:
  - Dynamic imports
  - Tree shaking
  - Remover dependencias no usadas

---

## 📈 Checklist de Optimización

### Antes de Desplegar
- [ ] Lighthouse Score > 90 en Performance
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Bundle size < 500KB (gzipped)
- [ ] FPS estable durante scroll (60fps)
- [ ] Probado en dispositivo móvil real
- [ ] Probado con throttling (CPU 4x, Network Slow 3G)

### Optimizaciones Aplicadas
- [x] Lazy loading de iconos
- [x] Reducción de estrellas (2000 → 1200)
- [x] Reducción de luces (40 → 20)
- [x] Preload del modelo GLB
- [x] Throttling de scroll events
- [ ] Code splitting de Three.js/Theatre.js
- [ ] Optimización del modelo GLB
- [ ] Integración de usePerformanceMode

---

## 🛠️ Próximos Pasos Recomendados

1. **Integrar usePerformanceMode**
   - Usar el hook existente para ajustar calidad dinámicamente
   - Reducir calidad en dispositivos de bajo rendimiento

2. **Code Splitting**
   - Cargar Three.js/Theatre.js solo cuando sea necesario
   - Lazy load del canvas 3D en móviles

3. **Optimizar Modelo GLB**
   - Usar `gltf-transform` para comprimir
   - Reducir polígonos si es necesario

4. **Monitoreo en Producción**
   - Integrar Google Analytics con Core Web Vitals
   - Usar Real User Monitoring (RUM)

---

## 📚 Recursos Adicionales

- **Web.dev Performance**: https://web.dev/performance/
- **Chrome DevTools Docs**: https://developer.chrome.com/docs/devtools/
- **Lighthouse Scoring**: https://web.dev/performance-scoring/
- **Core Web Vitals**: https://web.dev/vitals/

