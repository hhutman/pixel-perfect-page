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
const H = 882;

// Positions traced pixel-for-pixel from the reference composition.
const COLUMNS: Column[] = [
  {
    x: 277,
    y: 162,
    w: 176,
    h: 173,
    direction: "down",
    duration: 9,
    bands: [
      { color: "bg-block-black", span: 37 },
      { color: "bg-block-grey", span: 86 },
      { color: "bg-block-black", span: 50 },
    ],
  },
  {
    x: 541,
    y: 162,
    w: 90,
    h: 173,
    direction: "up",
    duration: 6.5,
    bands: [
      { color: "bg-block-grey", span: 47 },
      { color: "bg-block-black", span: 86 },
      { color: "bg-block-grey", span: 40 },
    ],
  },
  {
    x: 365,
    y: 360,
    w: 88,
    h: 173,
    direction: "down",
    duration: 5,
    bands: [
      { color: "bg-block-grey-dark", span: 37 },
      { color: "bg-block-grey-light", span: 85 },
      { color: "bg-block-grey-darker", span: 51 },
    ],
  },
  {
    x: 275,
    y: 587,
    w: 92,
    h: 176,
    direction: "up",
    duration: 11,
    bands: [
      { color: "bg-block-brown", span: 47 },
      { color: "bg-block-red-deep", span: 84 },
      { color: "bg-block-brown-dark", span: 45 },
    ],
  },
  {
    x: 539,
    y: 587,
    w: 92,
    h: 176,
    direction: "down",
    duration: 7.5,
    bands: [
      { color: "bg-block-red", span: 40 },
      { color: "bg-block-purple", span: 85 },
      { color: "bg-block-red-deep", span: 51 },
    ],
  },
  {
    x: 275,
    y: 784,
    w: 92,
    h: 98,
    direction: "up",
    duration: 8.5,
    bands: [
      { color: "bg-block-brown", span: 39 },
      { color: "bg-block-green", span: 59 },
    ],
  },
  {
    x: 367,
    y: 784,
    w: 176,
    h: 98,
    direction: "down",
    duration: 12,
    bands: [
      { color: "bg-block-olive", span: 39 },
      { color: "bg-block-green", span: 59 },
    ],
  },
];

// Thin static dashes between the code rows.
const DASHES = [
  { x: 299, y: 552, w: 48, h: 15 },
  { x: 388, y: 552, w: 134, h: 15 },
];

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function ScrollColumn({ column, active }: { column: Column; active: boolean }) {
  const cycle = column.bands.reduce((sum, b) => sum + b.span, 0);
  // Two copies stacked make the translate loop seamless.
  const strip = [...column.bands, ...column.bands];

  return (
    <div
      className={`absolute overflow-hidden ${active ? "sound-pulse" : ""}`}
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

export function CodeGrid({ activeColumn }: { activeColumn?: number | null }) {
  return (
    <div
      className="relative w-full max-w-[900px] blur-[0.4px]"
      style={{ aspectRatio: `${W} / ${H}` }}
      role="img"
      aria-label="Grid of coloured blocks spelling a message in Baudot telegraph code"
    >
      {COLUMNS.map((column, i) => (
        <ScrollColumn key={i} column={column} active={activeColumn === i} />
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
