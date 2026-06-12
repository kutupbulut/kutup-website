# kutup-website

Marketing website for [Kutup](https://github.com/kutupbulut/kutup) — an
end-to-end encrypted, self-hosted drive with real-time collaboration.

Lives at **kutup.dev**. Documentation is a separate project at **docs.kutup.dev**;
this site only links out to it.

## Stack

- [Astro](https://astro.build) (static output) + [React](https://react.dev) islands
- [Tailwind CSS](https://tailwindcss.com) v4 (via `@tailwindcss/vite`)
- TypeScript
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com)

Interactivity is kept to small React islands (mobile nav, copy-to-clipboard,
OS-aware download, instance-directory filter); everything else is static HTML.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
```

## Build & check

```sh
npm run build    # static output -> dist/
npm run check    # astro check (TypeScript)
npm run preview  # serve the production build locally
```

## Content

- Page copy and screenshots are sourced from the main Kutup repo
  (`README.md`, `docs/self-hosting.md`, `docs/screenshots/`).
- Screenshots live in `public/screenshots/`.
- Shared URLs/metadata are centralized in `src/consts.ts`.
- The public instance directory reads `src/data/instances.json` (currently
  empty). Add objects of shape
  `{ name, url, region, signups: "open"|"invite"|"closed", operator?, notes? }`.

## Brand assets

The three-diamond logo (`src/components/KutupLogo.astro`, `public/favicon.svg`)
and the Kutup name are brand assets — not granted by the source AGPL license.
Do not recolor or modify them. See the main repo's `TRADEMARK.md`.

## Deploy (Cloudflare Pages)

**Recommended — connect the Git repo** in the Cloudflare dashboard:

- Build command: `npm run build`
- Build output directory: `dist`
- Then attach the `kutup.dev` custom domain, and configure the apex/`www`
  canonical redirect via the dashboard.

**Or deploy from the CLI:**

```sh
npm run deploy   # astro build && wrangler pages deploy dist
```

Headers and redirects ship with the build:

- `public/_headers` — security headers + long-cache for `/_astro/*`.
- `public/_redirects` — vanity shortlinks (`/github`, `/docs`, `/releases`).

`docs.kutup.dev` is a separate Cloudflare Pages project (built later).
