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
  },
});