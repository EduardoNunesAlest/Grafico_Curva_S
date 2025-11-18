import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    base: './',
    build: {
      outDir: 'build',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        }
      }
    },
    plugins: [react()],
    server: {
      port: 8301,
      allowedHosts: ['.apps-tunnel.monday.app']
    }
  };
});