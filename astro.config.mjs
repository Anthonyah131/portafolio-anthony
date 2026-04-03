// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Separar lucide-react
            if (id.includes('lucide-react')) {
              return 'lucide';
            }
            // Separar otros node_modules (pero NO react/react-dom)
            if (id.includes('node_modules') && !id.includes('react') && !id.includes('react-dom')) {
              return 'vendor';
            }
            // Dejar React y React-DOM en el chunk principal (undefined = chunk principal)
            return undefined;
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  },
});
