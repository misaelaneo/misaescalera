# misaescalera

Misa Escalera's personal portfolio — a single-screen, no-scroll "desk" landing page
built from the Claude Design concept `Misa Portfolio.dc.html`.

## Stack

- Vite + React + TypeScript
- [`@paper-design/shaders-react`](https://www.npmjs.com/package/@paper-design/shaders-react)
  for the WebGL paper-texture background and portrait layer
- Fonts: Space Mono + Courier Prime (Google Fonts), Remingtoned (`public/assets/remingtoned.ttf`)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Deploy

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. Custom domain (`misaescalera.com`) is set in `public/CNAME`.
