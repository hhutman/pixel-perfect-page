# Plan: Adjust p5.js background sketch timing and motion

## What I will change

1. **Delay the background p5 sketch by 15 seconds**
   - Currently in `src/routes/index.tsx` the sketch appears immediately when Play is pressed, and its tone fades in after 6 seconds.
   - I will introduce a `sketchOn` state that toggles on after 15 seconds, and use it to both mount the sketch and trigger the audio.

2. **Remove the object’s motion so it does not “float around”**
   - Currently in `src/components/OscillatorSketch.tsx` the ellipsoid rotates via `rotateX` and `rotateY` every frame.
   - I will remove those two rotation calls so the object stays statically positioned while still changing color.

3. **Keep the color pulsation**
   - The lighting (`directionalLight`, `pointLight`) and `specularMaterial` already react to the sine-partial amplitudes, so the color will continue to pulse without movement.

## Files that will change
- `src/routes/index.tsx`
- `src/components/OscillatorSketch.tsx`

## No new dependencies
No new packages are needed.
