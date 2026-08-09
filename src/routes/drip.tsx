import { createFileRoute, Link } from "@tanstack/react-router";
import { PaintDrip } from "@/components/PaintDrip";

export const Route = createFileRoute("/drip")({
  head: () => ({
    meta: [
      { title: "Drip — Pink Paint Running Down a White Page" },
      {
        name: "description",
        content:
          "A bright white page with thick pink paint running down from the top edge, animated in pure CSS.",
      },
      { property: "og:title", content: "Drip — Pink Paint Running Down a White Page" },
      {
        property: "og:description",
        content:
          "A bright white page with thick pink paint running down from the top edge, animated in pure CSS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/drip" }],
  }),
  component: DripPage,
});

function DripPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-paper">
      <h1 className="sr-only">Pink paint dripping down a white page</h1>
      <PaintDrip />
      <Link
        to="/"
        className="absolute bottom-6 left-6 text-xs tracking-[0.3em] text-paint-pink-deep uppercase transition-opacity hover:opacity-60"
      >
        back
      </Link>
    </main>
  );
}