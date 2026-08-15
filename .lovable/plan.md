Match the p5 corner sketch background to the main page canvas color so the "border" around the ellipsoid blends into the page background, while keeping the box at its current top-right size and position.

## What will change

1. **Expose the canvas RGB value for JavaScript**  
   Add a new `--canvas-rgb` variable to `src/styles.css` alongside the existing `--canvas` oklch variable. This lets the p5 sketch set the exact same background color programmatically.

2. **Update the p5 background in `src/components/OscillatorSketch.tsx`**  
   Read `--canvas-rgb` when the p5 instance is created and replace the hardcoded `p.background(40, 40, 40)` with the matched canvas color. This removes the visible grey rectangle around the ellipsoid and makes the corner sketch look like it sits directly on the main page background.

3. **Leave position and size unchanged**  
   The corner box stays fixed at the top-right (`w-[380px] max-w-[45vw]`) and does not overlap the main center artwork on full-screen viewports. No change is needed to the layout or size.

## Technical details

- p5's `background()` accepts an RGB triple, so the oklch value in `--canvas` must be converted to RGB. The new `--canvas-rgb` CSS variable will hold that triple (`r, g, b`).
- `OscillatorSketch.tsx` will call `getComputedStyle(document.documentElement).getPropertyValue('--canvas-rgb')` once during setup, parse it, and use it in `p.draw()`.
- The container's existing thin grey border and subtle shadow will remain unchanged, per the clarified scope (only the p5 background should match the page).
