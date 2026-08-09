type Drip = {
  /** horizontal position, % of viewport width */
  left: number;
  /** stem width in rem */
  width: number;
  /** run length, % of viewport height */
  length: number;
  /** bulb diameter in rem */
  bulb: number;
  tone: "light" | "mid" | "deep";
  delay: number;
  duration: number;
};

const TONE_CLASS: Record<Drip["tone"], string> = {
  light: "bg-paint-pink-light",
  mid: "bg-paint-pink",
  deep: "bg-paint-pink-deep",
};

const DRIPS: Drip[] = [
  { left: 4, width: 1.6, length: 18, bulb: 2.1, tone: "light", delay: 0.5, duration: 2.2 },
  { left: 10, width: 2.4, length: 46, bulb: 3.1, tone: "mid", delay: 0.75, duration: 3.4 },
  { left: 17, width: 1.2, length: 10, bulb: 1.6, tone: "deep", delay: 0.6, duration: 1.6 },
  { left: 23, width: 3, length: 68, bulb: 3.8, tone: "deep", delay: 0.9, duration: 4.2 },
  { left: 31, width: 1.5, length: 26, bulb: 2, tone: "light", delay: 1.1, duration: 2.6 },
  { left: 38, width: 2.2, length: 38, bulb: 2.9, tone: "mid", delay: 0.65, duration: 3 },
  { left: 45, width: 1.1, length: 14, bulb: 1.5, tone: "deep", delay: 1.3, duration: 1.8 },
  { left: 52, width: 2.8, length: 82, bulb: 3.6, tone: "mid", delay: 0.85, duration: 4.8 },
  { left: 60, width: 1.4, length: 22, bulb: 1.9, tone: "light", delay: 1, duration: 2.4 },
  { left: 67, width: 2.5, length: 54, bulb: 3.2, tone: "deep", delay: 0.7, duration: 3.8 },
  { left: 74, width: 1.3, length: 12, bulb: 1.7, tone: "mid", delay: 1.25, duration: 1.7 },
  { left: 81, width: 2.1, length: 34, bulb: 2.7, tone: "light", delay: 0.95, duration: 2.9 },
  { left: 88, width: 1.7, length: 60, bulb: 2.3, tone: "mid", delay: 1.15, duration: 4 },
  { left: 95, width: 2.6, length: 24, bulb: 3.3, tone: "deep", delay: 0.8, duration: 2.5 },
];

function DripStem({ drip }: { drip: Drip }) {
  return (
    <div
      className={`drip-fall absolute top-0 ${TONE_CLASS[drip.tone]}`}
      style={
        {
          left: `${drip.left}%`,
          width: `${drip.width}rem`,
          height: `${drip.length}%`,
          marginLeft: `${-drip.width / 2}rem`,
          borderBottomLeftRadius: "9999px",
          borderBottomRightRadius: "9999px",
          "--drip-delay": `${drip.delay}s`,
          "--drip-duration": `${drip.duration}s`,
        } as React.CSSProperties
      }
    >
      <span
        className={`absolute left-1/2 rounded-full ${TONE_CLASS[drip.tone]}`}
        style={{
          width: `${drip.bulb}rem`,
          height: `${drip.bulb}rem`,
          marginLeft: `${-drip.bulb / 2}rem`,
          bottom: `${-drip.bulb / 3}rem`,
        }}
      />
    </div>
  );
}

export function PaintDrip() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layered pink bands along the top edge, deepest first. */}
      <div className="paint-settle absolute inset-x-0 top-0" style={{ animationDelay: "0.25s" }}>
        <div className="h-[9vh] w-full bg-paint-pink-deep" />
        <svg
          className="block h-[5vh] w-full text-paint-pink-deep"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0h1200v18c-70 26-130 4-198 22-68 18-120-14-190-4-70 10-118 30-186 20-68-10-124-32-192-22-68 10-130 34-198 22-46-8-36 6-36 6z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="paint-settle absolute inset-x-0 top-0" style={{ animationDelay: "0.1s" }}>
        <div className="h-[6vh] w-full bg-paint-pink" />
        <svg
          className="block h-[4vh] w-full text-paint-pink"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0h1200v10c-58 30-118 2-176 24-58 22-116-10-174 2-58 12-116 34-174 22-58-12-116-34-174-24-58 10-116 32-174 22-58-10-92 4-92 4z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="paint-settle absolute inset-x-0 top-0">
        <div className="h-[3vh] w-full bg-paint-pink-light" />
        <svg
          className="block h-[3vh] w-full text-paint-pink-light"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0h1200v8c-90 34-170-2-260 20-90 22-160-12-250 4-90 16-150 30-240 16-90-14-160-26-250-14-90 12-200 26-200 26z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Runs of paint hanging from the band. */}
      <div className="absolute inset-x-0 top-[7vh] bottom-0">
        {DRIPS.map((drip, i) => (
          <DripStem key={i} drip={drip} />
        ))}
      </div>
    </div>
  );
}