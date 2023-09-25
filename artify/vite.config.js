import { defineConfig } from 'vite';
import { join } from 'path';
import copy from 'rollup-plugin-copy'; // Import the copy plugin

export default defineConfig({
  root: join(process.cwd(), 'src'),
  server: {
    port: 3000,
    open: '/index.html',
  },
  preview: {
    port: 8080,
  },
  build: {
    outDir: join(process.cwd(), 'dist'),
    // Add the copy plugin to copy _redirects file to the dist folder
    rollupOptions: {
      plugins: [
        copy({
          targets: [{ src: '_redirects', dest: 'dist' }],
          hook: 'writeBundle', // Copy after bundle is written
        }),
      ],
    },
  },
});
