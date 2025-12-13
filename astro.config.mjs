// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['@theatre/core', '@theatre/r3f'],
    },
    ssr: {
      noExternal: ['@theatre/core', '@theatre/r3f', '@theatre/studio'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Separar Three.js y dependencias relacionadas
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three';
            }
            // Separar Theatre.js
            if (id.includes('@theatre')) {
              return 'theatre';
            }
            // Separar lucide-react
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            // Separar node_modules grandes
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  },
});