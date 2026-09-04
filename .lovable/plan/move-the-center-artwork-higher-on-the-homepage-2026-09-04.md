# Move the center artwork higher on the homepage

## Goal
Shift the central Baudot block artwork (and its Play/Pause controls) upward on the page so it is no longer vertically centered. The user reports the bottom is clipped on their laptop while too much empty space sits above it. The full-screen p5 "Tone" sketch must keep its current position and 15-second reveal timing.

## What will change
- `src/routes/index.tsx`
  - Change the `<main>` vertical alignment from `items-center justify-center` to top-aligned with comfortable top padding (e.g. `items-start justify-center pt-[10vh]` or similar).
  - Keep the `CodeGrid` wrapper and `SoundControls` as children of the same `<main>` so they move together.
  - Leave the `OscillatorSketch` full-screen background layer untouched: it still appears after 15 seconds on Play and its audio still starts 15 seconds after Play.
- `src/components/SoundControls.tsx`
  - Keep the control bar anchored at `bottom-6 left-6`; it will naturally sit below the raised artwork.

## What will NOT change
- The p5 sketch's position, sizing, z-index, or 15-second delay.
- The artwork's internal layout, colors, animation speeds, or sound mapping.
- Any other routes or components.

## Verification
- Build the project and check the preview at a typical laptop viewport (e.g. 1280×800 and 1440×900) to confirm the full artwork and controls are visible without clipping, and that empty space above is reduced.
- Confirm the Tone sketch still fades in at the same time and covers the background as before.
