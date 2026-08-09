import { useCallback, useEffect, useRef, useState } from "react";
import taiko from "@/assets/taiko.mp3.asset.json";
import monster from "@/assets/monster.mp3.asset.json";
import riser from "@/assets/riser.mp3.asset.json";
import footsteps from "@/assets/footsteps.mp3.asset.json";
import swoosh from "@/assets/swoosh.mp3.asset.json";
import splash from "@/assets/splash.mp3.asset.json";
import funny from "@/assets/funny.mp3.asset.json";

// Column index -> sound URL. Order matches COLUMNS in CodeGrid.
export const COLUMN_SOUNDS = [
  taiko.url,
  monster.url,
  riser.url,
  footsteps.url,
  swoosh.url,
  splash.url,
  funny.url,
];

const BEATS_PER_BAR = 5; // 5/4
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.15; // seconds

export function useStepSequencer() {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [beat, setBeat] = useState(0);

  const ctxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<(AudioBuffer | null)[]>([]);
  const nextTimeRef = useRef(0);
  const beatRef = useRef(0);
  const bpmRef = useRef(bpm);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  bpmRef.current = bpm;

  const ensureContext = useCallback(async () => {
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctor();
      ctxRef.current = ctx;
      buffersRef.current = await Promise.all(
        COLUMN_SOUNDS.map(async (url) => {
          try {
            const res = await fetch(url);
            const data = await res.arrayBuffer();
            return await ctx.decodeAudioData(data);
          } catch {
            return null;
          }
        }),
      );
    }
    if (ctxRef.current.state === "suspended") await ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setPlaying(false);
    setActiveColumn(null);
  }, []);

  const start = useCallback(async () => {
    const ctx = await ensureContext();
    beatRef.current = 0;
    nextTimeRef.current = ctx.currentTime + 0.1;
    setPlaying(true);

    timerRef.current = setInterval(() => {
      const now = ctx.currentTime;
      const spb = 60 / bpmRef.current;
      while (nextTimeRef.current < now + SCHEDULE_AHEAD) {
        const time = nextTimeRef.current;
        const b = beatRef.current % BEATS_PER_BAR;
        const index = Math.floor(Math.random() * COLUMN_SOUNDS.length);
        const buffer = buffersRef.current[index];
        if (buffer) {
          const src = ctx.createBufferSource();
          src.buffer = buffer;
          const gain = ctx.createGain();
          gain.gain.value = b === 0 ? 1 : 0.55;
          src.connect(gain).connect(ctx.destination);
          src.start(time);
          src.stop(time + Math.min(buffer.duration, spb * 1.5));
        }
        const delay = Math.max(0, (time - now) * 1000);
        setTimeout(() => {
          setActiveColumn(index);
          setBeat(b);
          setTimeout(() => setActiveColumn((c) => (c === index ? null : c)), 180);
        }, delay);

        beatRef.current += 1;
        nextTimeRef.current += spb;
      }
    }, LOOKAHEAD_MS);
  }, [ensureContext]);

  const toggle = useCallback(() => {
    if (playing) stop();
    else void start();
  }, [playing, start, stop]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  return { playing, toggle, bpm, setBpm, activeColumn, beat };
}
