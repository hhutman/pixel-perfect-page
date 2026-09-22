# Piano interlude after the big PAUSE

## What happens

1. The big block-letter PAUSE appears 13 seconds after the tone/red oval begins (unchanged).
2. Clicking it stops the sound and the word fades away (unchanged).
3. Two beats after the word has faded (about 1.2 seconds at the current tempo of 100 beats per minute), the uploaded piano piece ("Ode to Joy") plays on its own, with nothing else sounding.
4. The piano plays for 21 seconds, then fades out over a moment.
5. The whole piece restarts exactly as if Play had just been pressed: the block grid sound sequence starts from the top, the red oval reappears after 15 seconds, the tone comes in, and the big PAUSE returns 13 seconds later — so the cycle can repeat indefinitely.

During the interlude the lower-left Play/Pause still works; pressing Play during the piano cancels the interlude and starts the piece immediately. Pressing the small lower-left Pause button behaves as it does today (just stops) — only the big PAUSE triggers the piano interlude.

## Technical notes

- Add the uploaded mp3 to `public/audio/ode-to-joy.mp3` so it is bundled and deploys to GitHub Pages like the other seven sounds (the `import.meta.env.BASE_URL` + `audio/` pattern already used in `src/hooks/useStepSequencer.ts`).
- Extend `useStepSequencer` with an `playInterlude()` helper: lazily fetch/decode the piano buffer through the existing `AudioContext` (already unlocked by the first Play click, so no autoplay block), route it through the existing master gain at a lower level, `start()` at `currentTime + 2 * 60/bpm + fadeTime`, and stop with a short gain ramp at 21 seconds.
- In `src/routes/index.tsx`, `handleBigPause` becomes: fade the word, `stop()` the sequencer, schedule the interlude, then after the interlude window (word fade 0.35s + 2 beats + 21s) call `start()` again. Keep the timers in refs so unmount or a manual Play clears them.
- Existing reset effects (`playing` false clears `sketchOn`/`toneOn`/`showPause`) already produce a clean restart when `start()` runs again; no change needed to the 15s oval timing or the tone.
