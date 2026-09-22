import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CodeGrid } from "@/components/CodeGrid";
import { SoundControls } from "@/components/SoundControls";
import { OscillatorSketch } from "@/components/OscillatorSketch";
import { useStepSequencer } from "@/hooks/useStepSequencer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Code Blocks — Baudot Cipher Artwork" },
      {
        name: "description",
        content:
          "A full-screen midnight-navy canvas of coloured blocks arranged as a Baudot telegraph cipher, rendered entirely in CSS.",
      },
      { property: "og:title", content: "Code Blocks — Baudot Cipher Artwork" },
      {
        property: "og:description",
        content:
          "A full-screen midnight-navy canvas of coloured blocks arranged as a Baudot telegraph cipher.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const WORD_FADE_MS = 350;
const INTERLUDE_SEC = 21;

function Index() {
  const {
    playing,
    toggle,
    start,
    stop,
    playInterlude,
    stopInterlude,
    bpm,
    setBpm,
    activeColumn,
    beat,
    loading,
    audioContext,
  } = useStepSequencer();
  const restartRef = useRef<number | null>(null);

  const handleToggle = () => {
    if (restartRef.current) {
      window.clearTimeout(restartRef.current);
      restartRef.current = null;
    }
    stopInterlude();
    toggle();
  };

  useEffect(
    () => () => {
      if (restartRef.current) window.clearTimeout(restartRef.current);
    },
    [],
  );
  const [sketchOn, setSketchOn] = useState(false);
  const [toneOn, setToneOn] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [pauseFading, setPauseFading] = useState(false);
  const [size, setSize] = useState({ w: 1280, h: 800 });

  useEffect(() => {
    const measure = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!playing) {
      setSketchOn(false);
      setToneOn(false);
      setShowPause(false);
      setPauseFading(false);
      return;
    }
    const sketchTimer = window.setTimeout(() => setSketchOn(true), 15000);
    const toneTimer = window.setTimeout(() => setToneOn(true), 15000);
    return () => {
      window.clearTimeout(sketchTimer);
      window.clearTimeout(toneTimer);
    };
  }, [playing]);

  // Big block-letter PAUSE button appears 13s after the tone begins.
  useEffect(() => {
    if (!toneOn) {
      setShowPause(false);
      setPauseFading(false);
      return;
    }
    const timer = window.setTimeout(() => setShowPause(true), 13000);
    return () => window.clearTimeout(timer);
  }, [toneOn]);

  const handleBigPause = () => {
    setPauseFading(true);
    window.setTimeout(() => setShowPause(false), WORD_FADE_MS);
    stop();

    const beatSec = 60 / bpm;
    const delaySec = WORD_FADE_MS / 1000 + beatSec * 2;
    void playInterlude(delaySec, INTERLUDE_SEC);

    if (restartRef.current) window.clearTimeout(restartRef.current);
    restartRef.current = window.setTimeout(
      () => {
        restartRef.current = null;
        void start();
      },
      (delaySec + INTERLUDE_SEC) * 1000,
    );
  };

  // Canvas keeps a fixed 825:427 aspect; widen it so it covers the viewport.
  const coverWidth = Math.max(size.w, (size.h * 825) / 427);

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden bg-canvas px-4 pt-[2vh]">
      <h1 className="sr-only">Baudot code block artwork</h1>
      {sketchOn && (
        <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
          <div style={{ width: coverWidth }}>
            <OscillatorSketch
              width={coverWidth}
              height={(coverWidth * 427) / 825}
              hideControls
              audible={toneOn}
              audioContext={audioContext}
            />
          </div>
        </div>
      )}
      <div className="relative z-10 w-full max-w-[900px]">
        <CodeGrid activeColumn={activeColumn} />
      </div>
      <SoundControls
        playing={playing}
        onToggle={toggle}
        bpm={bpm}
        onBpmChange={setBpm}
        beat={beat}
        loading={loading}
      />
      {showPause && (
        <button
          type="button"
          onClick={handleBigPause}
          className={`fixed inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${
            pauseFading ? "opacity-0" : "opacity-100"
          }`}
          aria-label="Pause audio"
        >
          <span className="text-[clamp(4rem,14vw,12rem)] font-black uppercase leading-none tracking-[0.08em] text-white/90 [text-shadow:0_0_30px_rgba(0,0,0,0.5)]">
            Pause
          </span>
        </button>
      )}
    </main>
  );
}
