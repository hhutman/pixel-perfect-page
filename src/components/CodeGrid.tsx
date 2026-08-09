type Band = { color: string; span: number };

type Column = {
  x: number;
  y: number;
  w: number;
  h: number;
  bands: Band[];
  direction: "up" | "down";
  duration: number;
  delay?: number;
};

const W = 948;
const H = 900;

// Positions traced from the reference composition (Baudot-style code rows).
const COLUMNS: Column[] = [
  {
    x: 277,
    y: 163,
    w: 176,
    h: 170,
    direction: "down",
    duration: 9,
    bands: [
      { color: "bg-block-black", span: 34 },
      { color: "bg-block-grey", span: 93 },
      { color: "bg-block-black", span: 43 },
    ],
  },
  {
    x: 541,
    y: 163,
    w: 88,
    h: 170,
    direction: "up",
    duration: 6.5,
    bands: [
      { color: "bg-block-grey", span: 42 },
      { color: "bg-block-black", span: 90 },
      { color: "bg-block-grey", span: 38 },
    ],
  },
  {
    x: 366,
    y: 361,
    w: 86,
    h: 172,
    direction: "down",
    duration: 5,
    bands: [
      { color: "bg-block-grey-dark", span: 34 },
      { color: "bg-block-grey-light", span: 88 },
      { color: "bg-block-grey-dark", span: 50 },
    ],
  },
  {
    x: 277,
    y: 588,
    w: 88,
    h: 172,
    direction: "up",
    duration: 11,
    bands: [
      { color: "bg-block-brown", span: 40 },
      { color: "bg-block-red-deep", span: 92 },
      { color: "bg-block-brown-dark", span: 40 },
    ],
  },
  {
    x: 541,
    y: 588,
    w: 88,
    h: 172,
    direction: "down",
    duration: 7.5,
    bands: [
      { color: "bg-block-red", span: 40 },
      { color: "bg-block-purple", span: 90 },
      { color: "bg-block-red-deep", span: 42 },
    ],
  },
  {
    x: 277,
    y: 787,
    w: 88,
    h: 113,
    direction: "up",
    duration: 8.5,
    bands: [
      { color: "bg-block-brown", span: 35 },
      { color: "bg-block-green", span: 78 },
    ],
  },
  {
    x: 365,
    y: 787,
    w: 176,
    h: 113,
    direction: "down",
    duration: 12,
    bands: [
      { color: "bg-block-olive", span: 35 },
      { color: "bg-block-green", span: 78 },
    ],
  },
];

// Thin static dashes between the code rows.
const DASHES = [
  { x: 302, y: 551, w: 42, h: 12 },
  { x: 389, y: 551, w: 130, h: 12 },
];

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function ScrollColumn({ column }: { column: Column }) {
  const cycle = column.bands.reduce((sum, b) => sum + b.span, 0);
  // Two copies stacked make the translate loop seamless.
  const strip = [...column.bands, ...column.bands];

  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: pct(column.x, W),
        top: pct(column.y, H),
        width: pct(column.w, W),
        height: pct(column.h, H),
      }}
    >
      <div
        className={column.direction === "up" ? "strip-up" : "strip-down"}
        style={
          {
            height: `${(2 * cycle * 100) / column.h}%`,
            "--strip-duration": `${column.duration}s`,
            animationDelay: `${column.delay ?? 0}s`,
          } as React.CSSProperties
        }
      >
        {strip.map((band, i) => (
          <div
            key={i}
            className={band.color}
            style={{ height: `${(band.span / (2 * cycle)) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function CodeGrid() {
  return (
    <div
      className="relative w-full max-w-[900px] blur-[0.4px]"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Grid of coloured blocks spelling a message in Baudot telegraph code"
    >
      {COLUMNS.map((column, i) => (
        <ScrollColumn key={i} column={column} />
      ))}
      {DASHES.map((d, i) => (
        <span
          key={`dash-${i}`}
          className="absolute bg-block-red"
          style={{
            left: pct(d.x, W),
            top: pct(d.y, H),
            width: pct(d.w, W),
            height: pct(d.h, H),
          }}
        />
      ))}
    </div>
  );
}
