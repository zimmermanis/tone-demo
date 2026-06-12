import {
  T3kPlayer,
  T3kPlayerProvider,
  PREVIEW_MODE,
} from 'neural-amp-modeler-wasm';
import 'neural-amp-modeler-wasm/dist/styles.css';
import './amalgam-player.css';

// ---------------------------------------------------------------------------
// Amalgam Audio — capture player, styled to match the new site design.
// Dark stage + warm orange glow, Amalgam Orange (#ea5924) accents,
// pill platform selector, hairline dividers, uppercase micro-labels.
// In production these arrays come from WooCommerce product meta.
// ---------------------------------------------------------------------------

const SALE_PLATFORM = 'QC'; // demo value -> drives disclaimer + selected pill

const PLATFORMS = ['TONEX', 'QC', 'NAM', 'KEMPER'];

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
      {/* warm amp-glow backdrop */}
      <div style={styles.glow} aria-hidden="true" />

      <div style={styles.card}>
        <div style={styles.badgeRow}>
          <span style={styles.badge}>TRY IT LIVE</span>
        </div>

        <h1 style={styles.h1}>STR SIR 30 — CAPTURE PLAYER</h1>
        <p style={styles.sub}>
          Hit play for the DI demo, or go live and play through your own
          interface.
        </p>

        <div style={styles.divider} />

        <p style={styles.label}>SELECT PLATFORM</p>
        <div style={styles.pillRow}>
          {PLATFORMS.map((p) => (
            <span
              key={p}
              style={p === SALE_PLATFORM ? styles.pillActive : styles.pill}
            >
              {p}
            </span>
          ))}
        </div>

        <div style={styles.divider} />

        <p style={styles.label}>PREVIEW</p>
        <div className="amalgam-player">
        <T3kPlayerProvider>
          <T3kPlayer
            models={models}
            irs={irs}
            inputs={inputs}
            previewMode={PREVIEW_MODE.MODEL}
            isLoading={false}
          />
        </T3kPlayerProvider>
        </div>

        <p style={styles.disclaimer}>
          You're hearing a <strong style={styles.strong}>NAM capture</strong>{' '}
          of this amp. The <strong style={styles.strong}>{SALE_PLATFORM}</strong>{' '}
          version you're buying is captured from the same source and sounds
          very close — minor differences come down to how each platform
          handles cabs and response.
        </p>
      </div>
    </div>
  );
}

const ORANGE = '#ea5924';
const BLACK = '#141316';

const styles = {
  page: {
    minHeight: '100vh',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: BLACK,
    fontFamily:
      "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    right: '-20%',
    top: '-10%',
    width: '70vw',
    height: '70vw',
    background:
      'radial-gradient(circle at center, rgba(234,89,36,0.22) 0%, rgba(234,89,36,0.08) 35%, transparent 70%)',
    filter: 'blur(40px)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: 580,
    background: 'rgba(20,19,22,0.72)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 18,
    padding: '32px',
    color: '#f4f2f0',
    boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
  },
  badgeRow: { marginBottom: 14 },
  badge: {
    display: 'inline-block',
    background: ORANGE,
    color: '#fff',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    padding: '6px 12px',
    borderRadius: 6,
  },
  h1: {
    fontSize: 26,
    margin: '0 0 8px',
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  sub: {
    fontSize: 14,
    color: 'rgba(244,242,240,0.65)',
    margin: 0,
    lineHeight: 1.55,
  },
  divider: {
    height: 1,
    background: 'rgba(255,255,255,0.09)',
    margin: '22px 0',
  },
  label: {
    fontSize: 12,
    letterSpacing: '0.14em',
    color: 'rgba(244,242,240,0.75)',
    margin: '0 0 10px',
    fontWeight: 500,
  },
  pillRow: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  pill: {
    padding: '9px 22px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.18)',
    background: 'rgba(255,255,255,0.04)',
    color: 'rgba(244,242,240,0.85)',
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.04em',
  },
  pillActive: {
    padding: '9px 22px',
    borderRadius: 8,
    border: `1px solid ${ORANGE}`,
    background: ORANGE,
    color: '#fff',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.04em',
    boxShadow: '0 0 18px rgba(234,89,36,0.45)',
  },
  disclaimer: {
    fontSize: 12.5,
    color: 'rgba(244,242,240,0.6)',
    borderTop: '1px solid rgba(255,255,255,0.09)',
    paddingTop: 16,
    margin: '22px 0 0',
    lineHeight: 1.6,
  },
  strong: { color: ORANGE, fontWeight: 600 },
};
