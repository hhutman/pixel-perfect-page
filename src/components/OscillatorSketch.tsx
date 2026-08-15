import { useEffect, useRef, useState } from "react";

type OscillatorSketchProps = {
  width?: number;
  height?: number;
  hideControls?: boolean;
};

export function OscillatorSketch({
  width = 825,
  height = 427,
  hideControls = false,
}: OscillatorSketchProps) {
  const W = width;
  const H = height;
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const soundRef = useRef(false);
  soundRef.current = soundOn;

  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const p5 = (await import("p5")).default;
      if (cancelled || !hostRef.current) return;

      // Three sine partials driven with the Web Audio API.
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new Ctor();
      const base = 285;
      const gains = [0, 1, 2].map(() => ctx.createGain());
      const oscs = [0, 1, 2].map((i) => {
        const o = ctx.createOscillator();
        o.type = "sine";
        o.frequency.value = base * (i + 1);
        const g = gains[i]!;
        g.gain.value = 0;
        o.connect(g).connect(ctx.destination);
        o.start();
        return o;
      });

      const amps = [0, 0, 0];
      const targetAmps = [0, 0, 0];
      let lastRampTime = 0;
      const rampDuration = 1;

      const sketch = (p: InstanceType<typeof p5>) => {
        p.setup = () => {
          p.createCanvas(W, H, p.WEBGL);
        };

        p.draw = () => {
          if (p.millis() - lastRampTime > rampDuration * 1000) {
            const i = Math.floor(p.random(3));
            targetAmps[i] = p.random(0.1, 0.5);
            lastRampTime = p.millis();
          }

          for (let i = 0; i < amps.length; i++) {
            amps[i]! += (targetAmps[i]! - amps[i]!) * 0.01;
            const g = gains[i]!;
            const level = soundRef.current ? amps[i]! * 0.4 : 0;
            g.gain.setTargetAtTime(level, ctx.currentTime, 0.05);
          }

          p.background(40, 40, 40);

          const colorvalue = 255 * amps[0]!;
          const colorvalue2 = 255 * amps[1]!;

          p.ambientLight(50);
          p.directionalLight(137, 0, 0, 0, 0, -1);
          p.pointLight(colorvalue, 0, colorvalue2, 0, 0, 180);

          p.push();
          p.translate(-W / 145, 0, 0);
          p.rotateX(p.frameCount * 0.03);
          p.specularMaterial(440);
          p.ellipsoid(
            (245 * W) / 825,
            (100 * H) / 427,
            (95 * W) / 825,
          );
          p.pop();
        };
      };

      const instance = new p5(sketch, hostRef.current);
      cleanup = () => {
        instance.remove();
        oscs.forEach((o) => o.stop());
        void ctx.close();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [W, H]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        ref={hostRef}
        style={{ maxWidth: W }}
        className="w-full overflow-hidden [&>canvas]:block [&>canvas]:h-auto [&>canvas]:w-full"
      />
      {!hideControls && (
        <button
        type="button"
        onClick={() => setSoundOn((s) => !s)}
        aria-pressed={soundOn}
        className="border border-block-grey/40 px-4 py-2 text-xs tracking-[0.25em] text-block-grey uppercase transition-opacity hover:opacity-60"
      >
        {soundOn ? "Sound off" : "Sound on"}
      </button>
      )}
    </div>
  );
}
