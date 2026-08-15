# Five drifting p5 sketches

The single corner sketch becomes a pool of five that appear and disappear on their own while the main sequencer is playing.

## Behaviour

- Sequencer paused: no sketches on screen, all silent.
- Press Play: as today, the first sketch appears and its tone fades in 8 seconds later.
- After that, a new sketch pops in every 4-6 seconds (random), up to five on screen at once.
- Each one stays for 6 seconds, then fades out and unmounts. Its slot is free to be reused, so the page keeps cycling appear/fade while playing.
- All five are audible: each fades its tone in as it appears and out as it leaves. Levels are lowered per-sketch so five at once stays balanced against the drums.
- Press Pause: everything fades out, timers reset, next Play starts the cycle fresh.

## Placement

Positions are random but constrained to the margins around the centre artwork, so a sketch may touch the edge of the central blocks but never sit on top of them. A slot picks a random spot in the left, right, top, or bottom band of the viewport; sizes vary slightly (roughly 240-380px wide) for depth.

## Technical notes

- New `src/components/DriftingSketches.tsx` owns the pool: an array of active items `{ id, x, y, width, bornAt }`, a spawn timer on a 4-6s random interval, and a 6s removal timer per item. Component only mounts while `playing` is true, so pause clears everything.
- Each item renders `<OscillatorSketch hideControls audible />` inside an absolutely positioned wrapper with an opacity/scale transition for fade in and fade out (fade-out uses a short "leaving" state before unmount so the tone and visual ramp down together).
- `OscillatorSketch` gains an optional `volume` prop (default keeps today's level); the pool passes a reduced value so five simultaneous tones don't clip. Nothing else about the sketch changes.
- Placement helper computes a random rect inside one of four edge bands derived from the viewport size minus a reserved central box matching the artwork's footprint; recomputed on resize.
- `src/routes/index.tsx` keeps the existing 8-second `toneOn` delay for the first sketch and renders `<DriftingSketches playing={playing} toneOn={toneOn} />` in place of the current single corner instance.
