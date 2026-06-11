import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The NAM WASM engine uses SharedArrayBuffer, which the browser only exposes
// on a "cross-origin isolated" page. These two headers are what make that work.
// Without them the player loads but stays silent. Same headers must exist in
// production (WordPress) too -- see README.
const crossOriginIsolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

export default defineConfig({
  plugins: [react()],
  server: { headers: crossOriginIsolation },
  preview: { headers: crossOriginIsolation },
});
