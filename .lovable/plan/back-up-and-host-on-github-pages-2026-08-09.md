# Back up and host on GitHub Pages

Two parts: get the code into your GitHub repo, then make the build work as a static site GitHub Pages can serve.

## Part 1 — Connect the repo (you do this in the UI)

1. Plus (+) menu in the chat input, bottom left -> GitHub -> Connect project.
2. Authorize the Lovable GitHub App, pick your account or org.
3. Create Repository. From then on it syncs both ways automatically.

Nothing in the code needs to change for this part.

## Part 2 — Make it deployable to GitHub Pages

GitHub Pages only serves static files, and this project currently builds as a
server-rendered app for an edge runtime. It has no backend, database, or
server functions, so it can be turned into a purely static export cleanly.

What I'd change:

- Switch the build to prerender both pages (`/` and `/drip`) to static HTML with
  a client-side app on top, so no server is needed at runtime.
- Add a `404.html` copy of the app shell so deep links like `/drip` don't
  hard-404 on Pages.
- Add a base-path setting so assets resolve correctly at
  `username.github.io/repo-name`. If you later use a custom domain or a
  `username.github.io` repo, the base becomes `/`.
- Add a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds on
  every push to the default branch and publishes to Pages. You then enable
  Pages in the repo settings with source "GitHub Actions".

Note: the seven sound files load from Lovable's CDN, so audio keeps working on
Pages without moving any binaries into the repo.

## Technical notes

- `vite.config.ts`: set `tanstackStart.prerender` (enabled, crawl links) and
  `pages` for `/` and `/drip`; set `vite.base` from an env var
  (`VITE_BASE_PATH`, default `/`) so local dev is unaffected.
- Nitro's output for a fully prerendered build lands in `dist/`; the workflow
  uploads the static directory via `actions/upload-pages-artifact` and deploys
  with `actions/deploy-pages`.
- Workflow sets `VITE_BASE_PATH: /${{ github.event.repository.name }}/` and adds
  `.nojekyll` plus the `404.html` fallback in a post-build step.
- Nothing about the artwork, animation, or sequencer behaviour changes.

## What I need from you

The repo name (or confirmation that you want a custom domain), so the base path
is set correctly. If unsure, I'll wire it to the repo name automatically in the
workflow, which is right for the common case.
