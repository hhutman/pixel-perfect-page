import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  const [toneOn, setToneOn] = useState(false);

  useEffect(() => {
    if (!playing) {
      setToneOn(false);
      return;
    }
    const id = window.setTimeout(() => setToneOn(true), 8000);
    return () => window.clearTimeout(id);
  }, [playing]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4">
      <h1 className="sr-only">Baudot code block artwork</h1>
      <CodeGrid activeColumn={activeColumn} />
      <SoundControls
        playing={playing}
        onToggle={toggle}
        bpm={bpm}
        onBpmChange={setBpm}
        beat={beat}
        loading={loading}
      />
      <Link
        to="/drip"
        className="absolute bottom-6 left-6 text-xs tracking-[0.3em] text-block-grey uppercase transition-opacity hover:opacity-60"
      >
        drip
      </Link>
      <Link
        to="/tones"
        className="absolute bottom-6 right-6 text-xs tracking-[0.3em] text-block-grey uppercase transition-opacity hover:opacity-60"
      >
        tones
      </Link>
      {playing && (
        <div className="animate-in fade-in fixed top-6 right-6 z-20 w-[380px] max-w-[45vw] overflow-hidden duration-700">
          <OscillatorSketch
            width={380}
            height={197}
            hideControls
            audible={toneOn}
          />
        </div>
      )}
    </main>
  );
}
