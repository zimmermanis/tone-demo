import {
  T3kPlayer,
  T3kPlayerProvider,
  PREVIEW_MODE,
} from 'neural-amp-modeler-wasm';
import 'neural-amp-modeler-wasm/dist/styles.css';

// ---------------------------------------------------------------------------
// This stands in for ONE product page. In the real WooCommerce build, the
// arrays below would be populated from product meta (the preview .nam URL,
// the cab IR for amp-head captures, etc.). Files here are served from /public,
// so they're same-origin and safe under the cross-origin-isolation headers.
// Swap in your own .nam files to hear an actual Amalgam capture.
// ---------------------------------------------------------------------------

const SALE_PLATFORM = 'Quad Cortex'; // demo value -> drives the disclaimer text

const models = [
  { name: 'Vox AC10 (sample)', url: '/models/ac10.nam', default: true },
  { name: 'Fender Deluxe Reverb (sample)', url: '/models/deluxe.nam' },
];

const irs = [
  { name: 'None', url: '' },
  { name: 'Celestion', url: '/irs/celestion.wav', default: true },
  { name: 'Plate', url: '/irs/plate.wav', mix: 0.5 },
];

const inputs = [
  { name: 'Guitar DI', url: '/inputs/guitar-di.wav', default: true },
  { name: 'Bass DI', url: '/inputs/bass-di.wav' },
];

export default function App() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img src="/amalgam-logo.svg" alt="Amalgam Audio" style={styles.logo} />
        <div style={styles.divider} />
        <p style={styles.kicker}>CAPTURE PLAYER DEMO</p>
        <h1 style={styles.h1}>Fender Blackface Deluxe Reverb</h1>
        <p style={styles.sub}>
          Hit play for the pre-recorded DI demo, or switch to live to play
          through your own interface.
        </p>

        <T3kPlayerProvider>
          <T3kPlayer
            models={models}
            irs={irs}
            inputs={inputs}
            previewMode={PREVIEW_MODE.MODEL}
            isLoading={false}
            onPlayDemo={(s) => console.log('demo play', s)}
            onPlayLive={(s) => console.log('live play', s)}
            onModelChange={(m) => console.log('model ->', m)}
          />
        </T3kPlayerProvider>

        <p style={styles.disclaimer}>
          You're hearing a <strong>NAM capture</strong> of this amp. The{' '}
          <strong>{SALE_PLATFORM}</strong> version you're buying is captured
          from the same source and sounds very close — minor differences come
          down to how each platform handles cabs and response.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#141316',
    fontFamily: '"Red Hat Display", system-ui, -apple-system, sans-serif',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: 560,
    background: '#1c1b1f',
    border: '1px solid rgba(234,89,36,0.2)',
    borderRadius: 12,
    padding: '32px',
    color: '#f2f2f2',
  },
  logo: {
    height: 22,
    display: 'block',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    background: 'linear-gradient(90deg, #ea5924 0%, rgba(234,89,36,0.1) 60%, transparent 100%)',
    marginBottom: 20,
  },
  kicker: {
    fontSize: 10,
    letterSpacing: '0.16em',
    color: '#ea5924',
    margin: '0 0 8px',
    fontWeight: 900,
  },
  h1: { fontSize: 24, margin: '0 0 8px', fontWeight: 900, letterSpacing: '-0.01em' },
  sub: { fontSize: 14, color: '#a09fa5', margin: '0 0 20px', lineHeight: 1.6, fontWeight: 500 },
  disclaimer: {
    fontSize: 12.5,
    color: '#ea5924',
    background: 'rgba(234,89,36,0.07)',
    border: '1px solid rgba(234,89,36,0.2)',
    borderRadius: 8,
    padding: '12px 14px',
    margin: '20px 0 0',
    lineHeight: 1.6,
    fontWeight: 500,
  },
};
