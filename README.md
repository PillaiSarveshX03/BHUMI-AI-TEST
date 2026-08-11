# Project Bhumi — Interactive GIS Frontend

An AI-powered farmer assistant frontend: explore India's soils state by
state, drill into districts, and turn a soil profile into a crop plan.
Built with React, TypeScript, Tailwind CSS, Framer Motion, and React Router.

```
https://bhumi-ayi9.onrender.com/
```

---

## 1. Before you start

You need **Node.js 18 or later** (Node 20 LTS recommended) and **npm**,
which ships with Node. Check what you have:

```bash
node -v
npm -v
```

If you don't have Node installed, get it from
[nodejs.org](https://nodejs.org) or via a version manager like `nvm`.

No database, API keys, or backend are required — the app runs entirely on
the sample JSON data bundled in `src/data`.

---

## 2. Run it locally (development)

From the project folder:

```bash
npm install
npm run dev
```

`npm install` downloads the dependencies listed in `package.json` (React,
React Router, Framer Motion, Lucide icons, Tailwind, Vite, TypeScript,
etc.) — this step needs an internet connection. `npm run dev` then starts
a local dev server, prints a URL (typically `http://localhost:5173`), and
opens it in your browser automatically. Edits to any file under `src/`
hot-reload in place.

Stop the server with `Ctrl+C`.

---

## 3. Build for production

```bash
npm run build
```

This type-checks the project and outputs a static, optimized build to a
new `dist/` folder — plain HTML, JS, and CSS with no server-side
requirement. Preview that build locally before deploying:

```bash
npm run preview
```

---

## 4. Hosting the built site

Because `dist/` is fully static, you can host it almost anywhere:

**Vercel or Netlify (easiest)**
1. Push this project to a GitHub/GitLab repo.
2. Import the repo in Vercel or Netlify.
3. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — you'll get a live URL automatically on every push.

**Any static file host (S3, GitHub Pages, Nginx, Apache, Firebase Hosting, etc.)**
1. Run `npm run build` locally.
2. Upload the contents of `dist/` to your host / bucket / web root.
3. Point the host's document root at that folder. `index.html` is the
   entry point; all routes are client-side (React Router), so configure
   your host to fall back to `index.html` for unknown paths (a standard
   "SPA rewrite" rule — Vercel/Netlify do this automatically; for Nginx,
   use `try_files $uri /index.html;`).

**Quick local "hosting" without a real deploy**

```bash
npm run build
npx serve dist
```

`npx serve` needs internet the first time to fetch the `serve` package,
then serves `dist/` at a local URL — handy for demoing the production
build on your own machine.

---

## 5. Project structure

```
project-bhumi/
├── index.html
├── package.json
├── vite.config.ts          # dev server + @ path alias
├── tailwind.config.js      # color palette, fonts, animations
├── src/
│   ├── main.tsx             # entry point, router setup
│   ├── App.tsx              # layout + route table
│   ├── index.css            # Tailwind + global styles
│   ├── types/                # shared TypeScript types
│   ├── data/                 # india.json, soil.json, districts.json,
│   │                         # rainfall.json, climate.json, crops.json
│   ├── context/               # MapContext — shared map selection state
│   ├── hooks/                 # useMapData, useDebounce
│   ├── services/               # cropRecommendation.ts (scoring engine),
│   │                           # api.ts (future backend placeholder)
│   ├── components/             # Navbar, Footer, IndiaMap, StateMap,
│   │                           # SoilLegend, ToggleSwitch,
│   │                           # FarmerDecisionCard, CropSearch,
│   │                           # CropCard, InfoPanel, Tooltip
│   └── pages/                  # Home, About, CropDatabase, Dashboard, Help
```

---

## 6. Design decisions worth knowing about

**The map is a schematic tile grid, not traced geography.** Each
state/district is a tile positioned on a grid (`row`/`col` in
`india.json` / `districts.json`) laid out to loosely mirror India's real
shape — north at the top, coast states in the correct relative
positions — and styled like a soil-sensor / satellite readout grid,
which fits the "scientific, data-driven" brief and ties into the
soil-sensor integration mentioned as a future goal.

This was a deliberate substitution: precise state/district boundaries
need real GeoJSON/TopoJSON data, and the environment this project was
built in has no internet access to fetch it. If you want traced
coastlines instead:

1. Get an India states/districts TopoJSON file (e.g. search GitHub for
   community-maintained India TopoJSON/GeoJSON datasets).
2. Install `react-simple-maps`: `npm install react-simple-maps d3-geo`.
3. Replace the tile grid in `IndiaMap.tsx` / `StateMap.tsx` with a
   `<ComposableMap>` / `<Geographies>` pair from `react-simple-maps`,
   feeding it the topojson file and keeping the same hover/click
   handlers and `getSoilColor()` fill logic already written.

**Sample data, not verified agronomy.** `src/data` covers 21 states and
30 districts across 10 states, with 15 crops. Soil types, rainfall, and
climate figures are representative approximations for demonstrating the
interface — not a substitute for official agricultural extension advice.
The Help page and footer say this explicitly to end users, too.

**Suggested Crops / Crop Advisor run on a rule-based scorer, not an
LLM.** `src/services/cropRecommendation.ts` ranks crops by matching the
selected location's dominant soil against each crop's `suitableSoils`
list, with a deterministic score. It's written as a drop-in seam: swap
its internals for a real AI recommendation engine or LLM call later
without touching any component.

**Backend integration points are stubbed, not faked.** `src/services/api.ts`
defines the shape of future calls (`getWeatherForecast`,
`getSatelliteImagery`, `getSoilSensorReading`, `askFarmerAssistant`) and
throws a clear "not implemented" error if called — so it's obvious in
development what's real data versus a planned integration, rather than
silently returning fake numbers.

---

## 7. Extending the data

To add a new state: append an entry to `src/data/india.json` with a
unique `id`, a free `row`/`col` grid position, and a `dominantSoil` from
`Black | Red | Laterite | Sandy | Alluvial | Mountain`.

To add district-level drill-down for that state: add entries to
`src/data/districts.json` with matching `stateId`, plus corresponding
entries in `rainfall.json` and `climate.json` keyed by the district's
`id`. Set `hasDistrictData: true` on the state entry.

To add a crop: append an entry to `src/data/crops.json`. Any crop whose
`suitableSoils` includes a given soil type will automatically appear in
that location's Suggested Crops list and in the Crop Database page — no
component code changes needed.

---

## 8. Accessibility notes

- All interactive tiles are real `<button>` elements — reachable and
  activatable by keyboard (Tab + Enter/Space), with descriptive
  `aria-label`s.
- Tooltips are associated with their trigger via `aria-describedby` and
  also appear on keyboard focus, not just mouse hover.
- The soil/political toggle uses `role="switch"` with `aria-checked`.
- A "Skip to main content" link is available for keyboard/screen-reader
  users at the very top of every page.
- Motion respects `prefers-reduced-motion` globally (see `src/index.css`).

---

## 9. Troubleshooting

- **`npm install` fails / hangs** — check your internet connection; this
  step needs to reach the npm registry.
- **Blank page after `npm run dev`** — check the terminal for a
  TypeScript or build error; Vite prints the offending file and line.
- **Fonts or icons look off on first load** — `index.html` loads Space
  Grotesk, Inter, and IBM Plex Mono from Google Fonts over the network;
  they'll cache after the first successful load.
