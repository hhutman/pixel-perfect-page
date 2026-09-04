import { useEffect, useState } from "react";
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

function Index() {
  const { playing, toggle, bpm, setBpm, activeColumn, beat, loading } =
    useStepSequencer();
  const [sketchOn, setSketchOn] = useState(false);
  const [toneOn, setToneOn] = useState(false);
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
      return;
    }
    const sketchTimer = window.setTimeout(() => setSketchOn(true), 15000);
    const toneTimer = window.setTimeout(() => setToneOn(true), 15000);
    return () => {
      window.clearTimeout(sketchTimer);
      window.clearTimeout(toneTimer);
    };
  }, [playing]);

  // Canvas keeps a fixed 825:427 aspect; widen it so it covers the viewport.
  const coverWidth = Math.max(size.w, (size.h * 825) / 427);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4">
      <h1 className="sr-only">Baudot code block artwork</h1>
      {sketchOn && (
        <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
          <div style={{ width: coverWidth }}>
            <OscillatorSketch
              width={coverWidth}
              height={(coverWidth * 427) / 825}
              hideControls
              audible={toneOn}
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
    </main>
  );
}
