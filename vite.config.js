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

// The T3K player hardcodes its waveform canvas colors (red/yellow/blue
// gradient on #18181b) with no props to change them, so rewrite the color
// literals when Vite loads the module.
const amalgamWaveform = {
  name: 'amalgam-waveform-colors',
  transform(code, id) {
    if (!id.includes('neural-amp-modeler-wasm')) return;
    return code
      .replaceAll("addColorStop(0, 'red')", "addColorStop(0, '#ea5924')")
      .replaceAll("addColorStop(0.5, 'yellow')", "addColorStop(0.5, '#fdb287')")
      .replaceAll("addColorStop(1, 'blue')", "addColorStop(1, '#ea5924')")
      .replaceAll("'#18181b'", "'#141316'");
  },
};

export default defineConfig({
  plugins: [react(), amalgamWaveform],
  // Keep the player out of dev pre-bundling so the transform above runs in dev
  optimizeDeps: { exclude: ['neural-amp-modeler-wasm'] },
  server: { headers: crossOriginIsolation },
  preview: { headers: crossOriginIsolation },
});
