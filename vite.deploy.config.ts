// Deploy build: the studio dashboard (studio.html) + the bare scene (coding-test.html), no legacy assets.
// Public assets are copied selectively by scripts/build-deploy.mjs.
import {defineConfig} from 'vite';

export default defineConfig({
  publicDir: false,
  build: {outDir: 'dist-deploy', emptyOutDir: true, rollupOptions: {input: ['studio.html','coding-test.html']}},
});
