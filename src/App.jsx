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
        <p style={styles.kicker}>AMALGAM AUDIO · CAPTURE PLAYER DEMO</p>
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
          You’re hearing a <strong>NAM capture</strong> of this amp. The{' '}
          <strong>{SALE_PLATFORM}</strong> version you’re buying is captured
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
    background: '#0e0e10',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: 560,
    background: '#17171a',
    border: '1px solid #2a2a30',
    borderRadius: 16,
    padding: '28px',
    color: '#f2f2f2',
  },
  kicker: { fontSize: 11, letterSpacing: '0.12em', color: '#8a8a92', margin: '0 0 6px' },
  h1: { fontSize: 24, margin: '0 0 6px', fontWeight: 700 },
  sub: { fontSize: 14, color: '#b6b6bd', margin: '0 0 20px', lineHeight: 1.5 },
  disclaimer: {
    fontSize: 12.5,
    color: '#c9a24b',
    background: 'rgba(201,162,75,0.08)',
    border: '1px solid rgba(201,162,75,0.25)',
    borderRadius: 10,
    padding: '12px 14px',
    margin: '20px 0 0',
    lineHeight: 1.5,
  },
};
