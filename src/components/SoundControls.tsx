type Props = {
  playing: boolean;
  onToggle: () => void;
  bpm: number;
  onBpmChange: (value: number) => void;
  beat: number;
};

export function SoundControls({
  playing,
  onToggle,
  bpm,
  onBpmChange,
  beat,
}: Props) {
  return (
    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-5 text-xs tracking-[0.25em] text-block-grey uppercase">
      <button
        type="button"
        onClick={onToggle}
        className="border border-block-grey/40 px-4 py-2 transition-opacity hover:opacity-60"
        aria-pressed={playing}
      >
        {playing ? "Pause" : "Play 5/4"}
      </button>

      <label className="flex items-center gap-3">
        <span className="sr-only">Tempo</span>
        <input
          type="range"
          min={60}
          max={180}
          step={1}
          value={bpm}
          onChange={(e) => onBpmChange(Number(e.target.value))}
          className="h-1 w-32 cursor-pointer appearance-none rounded bg-block-grey/40 accent-block-red"
          aria-label="Tempo in beats per minute"
        />
        <span className="tabular-nums">{bpm}</span>
      </label>

      <span className="flex gap-1.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-opacity ${
              playing && beat === i
                ? "bg-block-red opacity-100"
                : "bg-block-grey opacity-30"
            }`}
          />
        ))}
      </span>
    </div>
  );
}
