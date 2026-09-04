# Reduce top margin on the central artwork

## Goal
Move the Baudot block grid (and its Play/Pause controls) closer to the top of the page. The user’s screenshot shows too much empty space above the artwork and the bottom clipping on their laptop.

## What will change
- `src/routes/index.tsx`
  - Reduce the `<main>` top padding from `pt-[8vh]` to a smaller value such as `pt-[2vh]` or `pt-3`.
  - Keep `items-start justify-center` so the artwork stays horizontally centered but top-aligned.
  - Keep the `OscillatorSketch` background layer unchanged: still full-screen, still appears after 15 seconds on Play, still starts audio after 15 seconds.

## What will NOT change
- The p5 sketch’s position, sizing, z-index, or 15-second delay.
- The artwork’s internal layout, colors, animation speeds, or sound mapping.
- The SoundControls position at the bottom-left margin.

## Verification
- Build the project and check the preview at a typical laptop viewport to confirm the artwork begins near the top with minimal empty space above it, while the full grid and controls remain visible without clipping.
