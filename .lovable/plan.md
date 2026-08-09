# X&Y-Style Landing Page

A single full-screen page recreating the uploaded artwork: a deep midnight-navy field with a grid of colored blocks arranged in the Baudot-code style, rendered in CSS (no image file).

## What gets built

- Rewrite `src/routes/index.tsx` as the page (the current placeholder is removed).
- Full-viewport dark navy canvas, artwork centered and scaled responsively.
- The block grid is built from data, not an image: each column is a stack of colored bars (greys/blacks top rows, the two thin red dashes mid-page, browns/reds/purple, then olive and green at the bottom), matching the uploaded reference positions and proportions.
- Slight film-grain/blur softness on block edges to match the reference's diffused look.
- A quiet entrance: blocks fade in with a short staggered delay, nothing bouncy.
- Page metadata (title, description, og/twitter tags) set for this page.

## Technical notes

- Colors added as semantic tokens in `src/styles.css` (`--canvas`, `--block-*` set) and used through Tailwind classes; no hardcoded hex in components.
- Grid rendered with an absolutely-positioned container using percentage coordinates so the composition scales exactly at any width; `aspect-ratio` locks the artwork proportions.
- Block definitions live in a small local array in a `CodeGrid` component under `src/components/`.
- The uploaded image is used as visual reference only, not shipped as an asset.
