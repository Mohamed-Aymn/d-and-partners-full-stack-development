import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        library: resolve(root, 'library.html'),
        add: resolve(root, 'add.html'),
        about: resolve(root, 'about.html'),
        book: resolve(root, 'book.html'),
      },
    },
  },
});
