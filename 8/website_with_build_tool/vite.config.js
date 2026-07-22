import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        library: resolve(__dirname, 'library.html'),
        add: resolve(__dirname, 'add.html'),
        about: resolve(__dirname, 'about.html'),
        book: resolve(__dirname, 'book.html'),
      },
    },
  },
});
