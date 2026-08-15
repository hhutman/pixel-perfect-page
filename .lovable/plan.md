# Embed the p5 sketch directly instead of iframing GitHub Pages

The upper-right box on the homepage currently loads `hhutman.github.io/NoObjectNoImageNoFocus1/` in an iframe. That depends on an external site, needs awkward scaling (825x427 content squeezed into a 288x192 frame), and can be blocked by the remote server. The same sketch already runs natively in this project on the `/tones` page.

## Approach: run the sketch in-page (your "Method 1/2", the React way)

Replace the iframe with the project's own p5 sketch component, sized to fit the corner box.

- Make `OscillatorSketch` accept optional props: `width`/`height` for the canvas, and a `compact` flag that hides the "Sound on/off" button (the homepage already has its own audio controls, so a second one there would be noisy).
- On the homepage, render the sketch inside the existing bordered box instead of the iframe. The canvas is created at the box's size, so nothing is scaled or clipped.
- Keep `/tones` as-is: full-size canvas with the Sound button.
- The corner instance renders silently by default; clicking it can be wired to toggle its own tone later if you want.

Result: the sketch loads instantly with the page, no external request, no scaling hack, and it still works after you push to GitHub Pages.

## Alternative if you specifically want the standalone file

If the goal is a self-contained `index.html` you can drop into any static host, I can instead add a plain `public/sketch/index.html` that loads p5 from the CDN plus a `sketch.js` next to it (your Method 2), and iframe *that* local file. Same visual result, but the sketch stays raw p5 rather than React. Say the word and I'll switch the plan to that.

## Technical notes

- Files: `src/components/OscillatorSketch.tsx` (add `width`, `height`, `hideControls` props), `src/routes/index.tsx` (swap iframe for `<OscillatorSketch />`).
- p5 is already installed and dynamically imported after hydration, so SSR/prerender for GitHub Pages export stays safe.
- Each instance creates its own AudioContext and stops it on unmount; the corner instance keeps gain at zero unless enabled.
