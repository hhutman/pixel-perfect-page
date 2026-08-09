type Block = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
};

const W = 948;
const H = 900;

// Positions traced from the reference composition (Baudot-style code rows).
const BLOCKS: Block[] = [
  // Row 1 — left wide group
  { x: 277, y: 163, w: 176, h: 34, color: "bg-block-black" },
  { x: 277, y: 197, w: 176, h: 93, color: "bg-block-grey" },
  { x: 277, y: 290, w: 176, h: 43, color: "bg-block-black" },
  // Row 1 — right group
  { x: 541, y: 163, w: 88, h: 42, color: "bg-block-grey" },
  { x: 541, y: 205, w: 88, h: 90, color: "bg-block-black" },
  { x: 541, y: 295, w: 88, h: 38, color: "bg-block-grey" },
  // Row 2 — centre column
  { x: 366, y: 361, w: 86, h: 34, color: "bg-block-grey-dark" },
  { x: 366, y: 395, w: 86, h: 88, color: "bg-block-grey-light" },
  { x: 366, y: 483, w: 86, h: 50, color: "bg-block-grey-dark" },
  // Row 3 — thin dashes
  { x: 302, y: 551, w: 42, h: 12, color: "bg-block-red" },
  { x: 389, y: 551, w: 130, h: 12, color: "bg-block-red" },
  // Row 4 — left group
  { x: 277, y: 588, w: 88, h: 40, color: "bg-block-brown" },
  { x: 277, y: 628, w: 88, h: 92, color: "bg-block-red-deep" },
  { x: 277, y: 720, w: 88, h: 40, color: "bg-block-brown-dark" },
  // Row 4 — right group
  { x: 541, y: 588, w: 88, h: 40, color: "bg-block-red" },
  { x: 541, y: 628, w: 88, h: 90, color: "bg-block-purple" },
  { x: 541, y: 718, w: 88, h: 42, color: "bg-block-red-deep" },
  // Row 5 — bottom band
  { x: 277, y: 787, w: 88, h: 35, color: "bg-block-brown" },
  { x: 365, y: 787, w: 176, h: 35, color: "bg-block-olive" },
  { x: 277, y: 822, w: 264, h: 78, color: "bg-block-green" },
];

export function CodeGrid() {
  return (
    <div
      className="relative w-full max-w-[900px] blur-[0.4px]"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Grid of coloured blocks spelling a message in Baudot telegraph code"
    >
      {BLOCKS.map((b, i) => (
        <span
          key={i}
          className={`block-in absolute ${b.color}`}
          style={{
            left: `${(b.x / W) * 100}%`,
            top: `${(b.y / H) * 100}%`,
            width: `${(b.w / W) * 100}%`,
            height: `${(b.h / H) * 100}%`,
            animationDelay: `${i * 55}ms`,
          }}
        />
      ))}
    </div>
  );
}