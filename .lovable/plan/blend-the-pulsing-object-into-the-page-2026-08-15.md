# Blend the pulsing object into the page

The corner sketch still reads as a separate panel because it has a visible frame, a translucent black backdrop, and its own painted background color that never exactly matches the page.

## What changes

- Remove the box around the sketch: no border, no rounded corners, no `bg-black/20`, no shadow. Just the sketch floating in the top-right corner.
- Make the sketch canvas itself transparent instead of painting its own navy background, so the real page background shows through and matches perfectly by definition.
- Keep everything else the same: appears on Play, tone fades in after 8 seconds, hides on Pause, pinned top-right.

## Technical notes

- `src/routes/index.tsx`: strip the wrapper div's `rounded border border-block-grey/50 bg-black/20 shadow-lg`, leaving position/size/z-index and the fade-in.
- `src/components/OscillatorSketch.tsx`: create the WEBGL canvas with alpha and call `p.clear()` each frame instead of `p.background(...)`. The `--canvas-rgb` token stays in `src/styles.css` (harmless) unless you want it removed.
- Verify in the preview at your window size that no seam or edge is visible around the ellipsoid.
