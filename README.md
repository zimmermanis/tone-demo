# Amalgam Audio — Capture Player Demo

A minimal, working local demo of the in-browser NAM player
(`neural-amp-modeler-wasm`), set up exactly the way the real WooCommerce
integration would work. Ships with sample models, IRs, and DI clips so it
runs out of the box.

## Run it

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173). Click play to hear the
DI demo through the model; switch to live mode to play through your own audio
interface (it'll ask for input permission).

> If you only see the player but hear nothing, it's almost always the
> cross-origin isolation headers. They're already set in `vite.config.js` for
> the dev server — don't remove them.

## Try your own captures

Drop your `.nam` files into `public/models/`, then edit the `models` array in
`src/App.jsx`:

```js
const models = [
  { name: 'Blackface Deluxe — Edge', url: '/models/your-file.nam', default: true },
];
```

Same pattern for cab IRs (`public/irs/`, the `irs` array) and DI clips
(`public/inputs/`, the `inputs` array). For full-rig/combo captures, set the IR
to `{ name: 'None', url: '' }` since the cab is already baked in.

## What maps to the real site

- **`src/App.jsx`** is one product page. In WooCommerce, the `models` / `irs` /
  `inputs` arrays come from product meta instead of being hard-coded.
- **`SALE_PLATFORM`** drives the disclaimer text. In production it's read from
  the product's platform (ToneX / Quad Cortex / Kemper / Line 6 / NAM).
- **`vite.config.js` headers** must be replicated on the production server
  (WordPress). Without `Cross-Origin-Opener-Policy: same-origin` and
  `Cross-Origin-Embedder-Policy: require-corp`, the player is silent.
- **`public/t3k-wasm-module.*`** are the WASM runtime files, served from root.
  They came from the package's repo; update them if you bump the package.

## Notes

- Sample assets (Vox AC10, Fender Deluxe, Celestion IR, guitar/bass DI) are from
  the open-source `neural-amp-modeler-wasm` repo, for demo purposes only.
- Package: https://www.npmjs.com/package/neural-amp-modeler-wasm
- Engine repo: https://github.com/tone-3000/neural-amp-modeler-wasm
