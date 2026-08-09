# Second page: pink paint drip

A new standalone page at `/drip` with a clean white background and thick pink paint running down from the top of the screen.

## What it looks like

- Full-height white canvas, no header chrome, matching the minimal feel of the artwork page.
- A band of pink paint along the top edge with an uneven bottom lip, and drips of varying width and length hanging from it — some short, some running most of the way down the page.
- Each drip ends in a rounded bulb, like paint about to fall.
- On page load the paint animates: the top band settles, then the drips extend downward at slightly different speeds and delays, so it looks like it is running rather than appearing all at once.
- Two or three pink tones (a light blush, a mid pink, a deeper rose) layered so the paint reads as having depth rather than one flat shape.
- Responsive: the drips scale with the viewport width and stay sharp on mobile.

## Getting there

A small text link on the artwork page ("drip") and a matching link back, so both pages are reachable.

## Technical notes

- New route file `src/routes/drip.tsx` with `createFileRoute("/drip")` and its own `head()` metadata (unique title, description, og:title, og:description, og:type, twitter:card).
- New component `src/components/PaintDrip.tsx`: an inline SVG spanning the full viewport width, with the paint band and drips as path shapes. Drip geometry is defined as data (x position, width, length, tone, delay, duration) so tones and rhythm are easy to tune.
- Animation via CSS keyframes added to `src/styles.css` (a `drip-fall` transform on each drip group with per-drip duration/delay custom properties), consistent with the existing `strip-up` / `strip-down` approach. Respect `prefers-reduced-motion` by settling to the final state.
- Pink tones added as semantic tokens in `src/styles.css` (`--paint-pink-light`, `--paint-pink`, `--paint-pink-deep`) in oklch and registered in `@theme inline`; the page background uses a `--paper` white token. No hardcoded color utilities.
- Cross links use `<Link to="/drip">` and `<Link to="/">` from `@tanstack/react-router`.