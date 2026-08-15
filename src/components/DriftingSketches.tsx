import { useEffect, useState } from "react";
import { OscillatorSketch } from "./OscillatorSketch";

const COUNT = 5;
const STAGGER_MS = 1500;
const TONE_DELAY_MS = 6000;
const FADE_MS = 700;

function Slot({ width }: { width: number }) {
  const [visible, setVisible] = useState(false);
  const [audible, setAudible] = useState(false);

  useEffect(() => {
    const a = window.setTimeout(() => setVisible(true), 20);
    const b = window.setTimeout(() => setAudible(true), TONE_DELAY_MS);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  return (
    <div
      className="pointer-events-none transition-all ease-out"
      style={{
        width,
        transitionDuration: `${FADE_MS}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.94)",
      }}
    >
      <OscillatorSketch
        width={width}
        height={width * 0.52}
        hideControls
        audible={audible}
        volume={0.12}
      />
    </div>
  );
}

export function DriftingSketches({ playing }: { playing: boolean }) {
  const [count, setCount] = useState(0);
  const [width, setWidth] = useState(300);

  useEffect(() => {
    const measure = () => {
      const byHeight = (window.innerHeight - 40) / COUNT / 0.52;
      setWidth(Math.max(140, Math.min(340, window.innerWidth * 0.32, byHeight)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!playing) {
      setCount(0);
      return;
    }
    const timers: number[] = [];
    for (let i = 0; i < COUNT; i++) {
      timers.push(
        window.setTimeout(() => setCount((c) => Math.max(c, i + 1)), i * STAGGER_MS),
      );
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [playing]);

  if (!playing) return null;

  return (
    <div className="pointer-events-none fixed right-2 top-1/2 z-20 flex -translate-y-1/2 flex-col items-end gap-1">
      {Array.from({ length: count }, (_, i) => (
        <Slot key={i} width={width} />
      ))}
    </div>
  );
}
