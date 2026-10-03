import { useEffect, useMemo, useRef } from "react";
import { createBotEyeGeometry, createBotGeometry, type BotShape } from "../bot/model";
import { sampleBotExpression } from "../bot/motion";

export interface BotProps {
  seed?: number;
  color?: string;
  shape?: BotShape;
  className?: string;
  expression?: string;
  /** Opt in to ambient expressions; only the active presenter stage can play. */
  animated?: boolean;
  /** Phase offset in seconds, so two characters do not react in unison. */
  expressionDelay?: number;
}

/** Decorative bloub geometry; static unless ambient expressions are requested. */
export function Bot({
  seed = 0,
  color = "currentColor",
  shape = "round",
  className,
  expression = "neutral",
  animated = false,
  expressionDelay = 0,
}: BotProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const geometry = useMemo(
    () => createBotGeometry(shape, expression, seed),
    [shape, expression, seed],
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (!animated || !svg) return;
    const stage = svg.closest<HTMLElement>(".active-stage");
    // Thumbnails and library cards never allocate a clock or listeners.
    if (!stage) return;
    const eyes = Array.from(svg.querySelectorAll<SVGPathElement>("[data-bot-eye]"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let elapsed = 0;
    let previousTime: number | undefined;
    let frame: number | undefined;

    const draw = (nextEyes: typeof geometry.eyes) => {
      eyes.forEach((eye, index) => {
        const next = nextEyes[index];
        if (!next) return;
        eye.setAttribute("d", next.d);
        eye.setAttribute("transform", next.transform);
      });
    };
    const tick = (now: number) => {
      if (previousTime !== undefined) {
        elapsed += Math.min((now - previousTime) / 1000, 0.064);
      }
      previousTime = now;
      draw(createBotEyeGeometry(
        shape,
        sampleBotExpression(elapsed, expression, expressionDelay),
        seed,
      ));
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
      previousTime = undefined;
    };
    const update = () => {
      const enabled = stage.dataset.motionEnabled === "true";
      const running = enabled && stage.dataset.motionState === "running" &&
        !preference.matches && !document.hidden;
      svg.dataset.botMotion = running ? "running" : "paused";
      if (running) {
        if (frame === undefined) frame = requestAnimationFrame(tick);
      } else {
        stop();
        if (preference.matches || !enabled) draw(geometry.eyes);
      }
    };
    const observer = new MutationObserver(update);
    observer.observe(stage, {
      attributes: true,
      attributeFilter: ["data-motion-enabled", "data-motion-state"],
    });
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      stop();
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      draw(geometry.eyes);
      delete svg.dataset.botMotion;
    };
  }, [animated, expression, expressionDelay, geometry, seed, shape]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-118 -118 236 236"
      width="100%"
      height="100%"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-bot-shape={shape}
    >
      <path d={geometry.body} fill={color} fillOpacity={1} />
      {geometry.eyes.map((eye, index) => (
        <path
          key={index}
          d={eye.d}
          transform={eye.transform}
          fill="#050505"
          fillOpacity={1}
          opacity={1}
          data-bot-eye="solid"
          style={{ mixBlendMode: "normal" }}
        />
      ))}
    </svg>
  );
}

export default Bot;
