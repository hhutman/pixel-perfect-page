import { createFileRoute, Link } from "@tanstack/react-router";
import { OscillatorSketch } from "@/components/OscillatorSketch";

export const Route = createFileRoute("/tones")({
  head: () => ({
    meta: [
      { title: "No Object No Image No Focus — Rotating Tone Ellipsoid" },
      {
        name: "description",
        content:
          "A rotating lit ellipsoid whose colour is driven by three drifting sine partials at 285 Hz and its harmonics.",
      },
      {
        property: "og:title",
        content: "No Object No Image No Focus — Rotating Tone Ellipsoid",
      },
      {
        property: "og:description",
        content:
          "A rotating lit ellipsoid whose colour is driven by three drifting sine partials.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/tones" }],
  }),
  component: TonesPage,
});

function TonesPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-canvas px-4">
      <h1 className="sr-only">No object, no image, no focus</h1>
      <OscillatorSketch />
      <Link
        to="/"
        className="absolute bottom-6 left-6 text-xs tracking-[0.3em] text-block-grey uppercase transition-opacity hover:opacity-60"
      >
        back
      </Link>
    </main>
  );
}
