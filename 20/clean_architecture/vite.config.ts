import { defineConfig } from 'vite';

export default defineConfig({
  envDir: 'src',
  build: {
    ssr: 'src/server.ts',
    outDir: 'dist',
    emptyOutDir: true,
    target: 'node22',
    rollupOptions: {
      output: {
        entryFileNames: 'server.js',
        format: 'es'
      }
    }
  }
});
