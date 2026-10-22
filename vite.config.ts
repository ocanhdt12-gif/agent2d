import {defineConfig} from 'vite';

export default defineConfig({
  server: {proxy: {'/api': {target: 'http://localhost:7788', changeOrigin: true}}},
  preview: {proxy: {'/api': {target: 'http://localhost:7788', changeOrigin: true}}},
});
