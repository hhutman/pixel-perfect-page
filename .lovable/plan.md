# Corner p5 sketch tied to the main Play button

Right now the corner sketch is always on screen and permanently silent (its gain never leaves zero because the Sound button is hidden). It will instead be driven by the main 5/4 sequencer.

## Behaviour

- Sequencer paused: corner sketch is hidden and silent.
- Press Play: the sketch fades in immediately and renders, still silent.
- 8 seconds after Play: its tone fades in and keeps drifting (the three sine partials, as on `/tones`).
- Press Pause: sketch hides, tone fades out, and the 8-second countdown resets so the next Play starts the wait over.

## Audio level

Set clearly audible to start (roughly matching the `/tones` page level) so you can judge it against the drums, then tell me louder or quieter and I'll adjust in one line.

## Technical notes

- `OscillatorSketch` gains two props: `audible` (drives the gain target instead of the internal Sound button state) and keeps `hideControls`.
- The corner sketch's AudioContext is created on mount but only resumed when `audible` first turns true, which is safe because the main Play click already unlocked audio in the same gesture chain.
- `src/routes/index.tsx` holds the delay: an effect watching `playing` sets an 8s timer that flips a `toneOn` state, and clears the timer plus resets `toneOn` on pause/unmount.
- Visibility uses an opacity/scale transition on the wrapper so the sketch appears smoothly rather than popping in; the p5 instance stays mounted while playing and unmounts on pause to free the audio graph.
