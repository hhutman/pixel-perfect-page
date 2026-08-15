# Single full-screen p5 sketch behind the artwork

## What changes
- Remove the stack of five sketches on the right side.
- One p5 sketch fills the whole browser window, sitting behind the center block artwork.
- It appears when "Play" is pressed and fades in its tone 6 seconds later.
- Pressing pause hides it and mutes the tone; pressing play again restarts the 6-second timer.

## Technical details
- Delete `src/components/DriftingSketches.tsx` and its import/usage in `src/routes/index.tsx`.
- In `src/routes/index.tsx`, render `OscillatorSketch` inside a `fixed inset-0 z-0 pointer-events-none` wrapper, only while `playing` is true, with a fade-in transition.
- Size: measure `window.innerWidth`/`innerHeight` (with a resize listener) and pass them as `width`/`height` so the canvas covers the viewport; keep the canvas transparent so the navy page background shows through.
- Layer order: give the wrapper `z-0` and raise `CodeGrid`/`SoundControls` above it (`relative z-10`) so the blocks and controls stay on top.
- Audio: local `toneOn` state in the index route set by a `setTimeout` 6s after play, cleared and reset to false on pause; passed as `audible` to the sketch. Keep the single-sketch volume back at the fuller default rather than the reduced 0.12 used for the stack.
