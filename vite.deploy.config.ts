// Deploy build: the studio dashboard (studio.html) + the bare scene (coding-test.html), no legacy assets.
// Public assets are copied selectively by scripts/build-deploy.mjs.
import {defineConfig} from 'vite';

export default defineConfig({
  publicDir: false,
  // the hosted copy has no agents-live/progress files → open in RANDOM mode (?file / ✕ switches back)
  define: {'import.meta.env.VITE_STUDIO_MODE': JSON.stringify('random')},
  build: {outDir: 'dist-deploy', emptyOutDir: true, rollupOptions: {input: ['studio.html','coding-test.html']}},
});
