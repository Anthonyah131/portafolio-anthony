// Only enable Theatre Studio in dev mode AND on root path
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";

if (import.meta.env.DEV && typeof window !== 'undefined' && window.location.pathname === '/') {
  studio.initialize();
  studio.extend(extension);
}
