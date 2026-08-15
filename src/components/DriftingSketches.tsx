import { useEffect, useRef, useState } from "react";
import { OscillatorSketch } from "./OscillatorSketch";

type Item = {
  id: number;
  x: number;
  y: number;
  width: number;
  leaving: boolean;
};

const MAX = 5;
const LIFETIME_MS = 6000;
const FADE_MS = 700;

/** Reserved central box (the block artwork) that sketches must not cover. */
function pickSpot(width: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const h = width * 0.52;
  const reservedW = Math.min(vw * 0.42, 460);
  const reservedH = Math.min(vh * 0.92, 900);
  const rx = (vw - reservedW) / 2;
  const ry = (vh - reservedH) / 2;

  const bands = [
    { x: [8, Math.max(8, rx - width)], y: [8, Math.max(8, vh - h - 8)] }, // left
    { x: [rx + reservedW, Math.max(rx + reservedW, vw - width - 8)], y: [8, Math.max(8, vh - h - 8)] }, // right
    { x: [8, Math.max(8, vw - width - 8)], y: [8, Math.max(8, ry - h)] }, // top
    { x: [8, Math.max(8, vw - width - 8)], y: [Math.min(vh - h - 8, ry + reservedH), Math.max(8, vh - h - 8)] }, // bottom
  ].filter((b) => b.x[1]! >= b.x[0]! && b.y[1]! >= b.y[0]!);

  const band = bands[Math.floor(Math.random() * bands.length)] ?? bands[0];
  if (!band) return { x: 8, y: 8 };
  const rand = (a: number, b: number) => a + Math.random() * Math.max(0, b - a);
  return { x: rand(band.x[0]!, band.x[1]!), y: rand(band.y[0]!, band.y[1]!) };
}

export function DriftingSketches({
  playing,
  toneOn,
}: {
  playing: boolean;
  toneOn: boolean;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (!playing) {
      setItems([]);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    const spawn = () => {
      const width = 240 + Math.random() * 140;
      const { x, y } = pickSpot(width);
      const id = ++idRef.current;
      setItems((prev) =>
        prev.length >= MAX ? prev : [...prev, { id, x, y, width, leaving: false }],
      );
      timers.push(
        setTimeout(() => {
          setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, leaving: true } : it)),
          );
          timers.push(
            setTimeout(
              () => setItems((prev) => prev.filter((it) => it.id !== id)),
              FADE_MS,
            ),
          );
        }, LIFETIME_MS),
      );
    };

    spawn();
    let cancelled = false;
    const queue = () => {
      const delay = 4000 + Math.random() * 2000;
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          spawn();
          queue();
        }, delay),
      );
    };
    queue();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [playing]);

  if (!playing) return null;

  return (
    <>
      {items.map((it) => (
        <div
          key={it.id}
          className="pointer-events-none fixed z-20 transition-all ease-out"
          style={{
            left: it.x,
            top: it.y,
            width: it.width,
            transitionDuration: `${FADE_MS}ms`,
            opacity: it.leaving ? 0 : 1,
            transform: it.leaving ? "scale(0.94)" : "scale(1)",
          }}
        >
          <OscillatorSketch
            width={it.width}
            height={it.width * 0.52}
            hideControls
            audible={toneOn && !it.leaving}
            volume={0.12}
          />
        </div>
      ))}
    </>
  );
}
