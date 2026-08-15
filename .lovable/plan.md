# Make the corner p5 sketch match the original piece

Comparing the original `sketch.js` from the zip against the current React port, three things drifted.

## What's different

1. **Wireframe lines.** The port draws the ellipsoid with p5's default stroke on, so a mesh grid sits over the surface — and because the corner canvas is small, those lines dominate. Turn strokes off so only the lit surface shows.

2. **Light position, so wrong colors.** The original calls `pointLight(colorvalue, 0, colorvalue2, 180)` and `directionalLight(137, 0)` — unusual short-form calls that p5 resolves to a specific light placement. The port "corrected" them to `pointLight(c1, 0, c2, 0, 0, 180)` and `directionalLight(137, 0, 0, 0, 0, -1)`, which moves the light and changes how the pulsating pink/magenta reads. Restore the original argument forms exactly.

3. **Geometry scaled instead of the canvas.** The port shrinks the ellipsoid (`245 * W / 825`) to fit the 380px box while lights, `translate(-width/145)` and camera stay at default distance — so the object sits differently in the light field and the pulsation is muted. Instead, always build the canvas at the original 825x427 with the original hard-coded `ellipsoid(245, 100, 95)`, and scale the whole canvas down with CSS to fit the corner box. Identical rendering to the GitHub version, just smaller on screen.

## Result

The corner sketch and `/tones` both render exactly what the GitHub page renders: a smooth ellipsoid with no wireframe, colors pulsing with the three sine partials. Audio timing and volume stay as they are now.

## Technical notes

- `src/components/OscillatorSketch.tsx`: drop the `W/H`-relative geometry, always `createCanvas(825, 427, WEBGL)`, add `p.noStroke()` in `setup`, revert the two light calls to the original short forms, keep `background(40,40,40)` and `specularMaterial(440)`.
- The `width`/`height` props become display size only: the host div gets `width: <prop>px` with the canvas scaled via `transform: scale(w/825)` (or `width:100%; height:auto`) so the 825x427 buffer is letter-boxed into the box.
- `src/routes/index.tsx` keeps the 380px corner box and the 8-second `audible` timing unchanged.
