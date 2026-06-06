// View your website at your own local server
// for example http://vite-php-setup.test

// http://localhost:3000 is serving Vite on development
// but accessing it directly will be empty

// IMPORTANT image urls in CSS works fine
// BUT you need to create a symlink on dev server to map this folder during dev:
// ln -s {path_to_vite}/src/assets {path_to_public_html}/assets
// on production everything will work just fine

import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config
export default defineConfig({
  // config
  root: '',
  base: '',

  build: {
    // output dir for production build
    outDir: resolve(__dirname, './static/js'),
    emptyOutDir: true,

    // esbuild target
    target: 'es2018',

    // our entry
    rollupOptions: {
      input: {
        main: resolve(`${__dirname}/main.js`),
      },

      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },

    // minifying switch
    minify: true,
    write: true,
  },
});
