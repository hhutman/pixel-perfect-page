# Sound-driven boxes in 5/4 time

Seven sounds, seven scrolling boxes — each box gets its own sound, and a 5/4 loop
triggers them in a shuffling pattern while the box flashes in sync.

## What you'll get

- A small "Play / Pause" control in the corner of the artwork page. Browsers block
  audio until the visitor interacts once, so the first click starts the sequencer.
- A steady 5/4 pulse (5 beats per bar). On each beat, one of the seven boxes is
  chosen at random and its sound fires. Beat 1 of each bar is always accented
  (slightly louder) so the 5/4 feel is audible.
- The box that just sounded gives a brief visual pop (short brightness/scale flash),
  so you can see which sound belongs to which box.
- A tempo slider (60–180 BPM) so the 5/4 groove can be sped up or slowed down.
- Nothing plays automatically before the first click; pausing stops the loop cleanly.

## Sound assignment

| Box (top to bottom, left to right) | Sound |
| --- | --- |
| Upper-left wide black/grey | Taiko drum |
| Upper-right narrow grey/black | Monster footstep |
| Middle grey column | Riser |
| Lower-left brown/red | Heavy walking footsteps |
| Lower-right red/purple | Swoosh |
| Bottom-left brown/green | Water splash |
| Bottom-right olive/green | Funny voice |

## Technical notes

- Upload the seven MP3s as CDN assets via `lovable-assets`, storing pointer JSON in
  `src/assets/`; no binaries land in the repo.
- New `src/hooks/useStepSequencer.ts`: builds a Web Audio `AudioContext` on first
  user gesture, fetches and decodes each MP3 into an `AudioBuffer`, then schedules
  beats with a lookahead timer (setInterval + `ctx.currentTime` scheduling) rather
  than raw `setTimeout`, so timing stays tight. Beat length = 60 / bpm; bar = 5 beats.
- `CodeGrid.tsx` gains an optional `soundKey` per column and an `activeColumn`
  index prop; the active column adds a short-lived `pulse` utility class defined in
  `src/styles.css` (keyframe: brightness + slight scale, ~180ms).
- New `src/components/SoundControls.tsx` renders the play/pause button and tempo
  slider, styled to match the minimal navy/grey aesthetic (existing tokens only).
- `src/routes/index.tsx` owns sequencer state and passes `activeColumn` into
  `CodeGrid`.
- Respects `prefers-reduced-motion` for the flash; audio unaffected.
