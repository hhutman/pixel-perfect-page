# Five stacked p5 sketches on the homepage

## What changes

Go back to the original behavior: when you press **Play**, the p5 pulsing sketch appears in the upper-right corner and its tone fades in **6 seconds** later (was 8).

Then, instead of sketches drifting to random spots, four exact copies stack straight down below the first one, in the same right-hand column:

- Sketch 1 appears immediately on Play
- Sketches 2-5 appear one after another, about 1.5s apart
- All five stay on screen and keep playing until Pause
- Each copy's tone fades in 6s after that copy appears
- On Pause, all five disappear and go silent

## Layout

The five sketches form one vertical column pinned to the right edge, sized so the whole stack fits the window height without covering the central block artwork. Each sketch keeps the transparent background (no border, no frame) it has now.

```text
 ┌───────────────┐
 │        [1]    │
 │  ▮▮    [2]    │
 │  ▮▮    [3]    │
 │  ▮▮    [4]    │
 │        [5]    │
 └───────────────┘
```

## Technical notes

- `src/routes/index.tsx`: tone delay 8000ms -> 6000ms; keep passing `playing` down.
- Replace `src/components/DriftingSketches.tsx` internals with a fixed 5-slot stack: a `fixed` right-side flex column, staggered mount timers (0, 1.5s, 3s, 4.5s, 6s), no lifetime/despawn timers, no random placement.
- Each slot renders `<OscillatorSketch hideControls volume={0.12} audible={...} />`, with its own 6s post-appearance audio timer so the tones layer in gradually.
- Sketch width derived from viewport height divided by 5 so the column always fits; height stays at the 0.52 aspect ratio.
