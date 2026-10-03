import { useEffect, type RefObject } from "react";
import { createBotEyeGeometry, type BotShape } from "../../bot/model";
import { sampleAmbientTimeline, sampleCommunityBot } from "./ambientTimeline";

/** All ten faces and the brand aperture share one pausable stage clock. */
export function useMeetupAmbient(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    const stage = root?.closest<HTMLElement>(".active-stage");
    // Library cards and presenter thumbnails stay static without listeners.
    if (!root || !stage) return;

    const aperture = root.querySelector<HTMLElement>(".meetup-brand-aperture");
    const spacex = root.querySelector<HTMLElement>(".meetup-mark--spacexai");
    const partners = root.querySelector<HTMLElement>(".meetup-mark--partners");
    const characters = Array.from(root.querySelectorAll<HTMLElement>(".meetup-character"))
      .map((element) => {
        const svg = element.querySelector("svg");
        const eyes = Array.from(element.querySelectorAll<SVGPathElement>("[data-bot-eye]"));
        return {
          motion: element.querySelector<HTMLElement>(".meetup-character-motion"),
          svg,
          eyes,
          originalEyes: eyes.map((eye) => ({
            d: eye.getAttribute("d") ?? "",
            transform: eye.getAttribute("transform") ?? "",
          })),
          shape: (element.dataset.botShape ?? "round") as BotShape,
          seed: Number(element.dataset.botSeed ?? 0),
          bot: {
            index: Number(element.dataset.botIndex ?? 0),
            expression: element.dataset.botExpression ?? "neutral",
            phase: Number(element.dataset.botPhase ?? 0),
            yaw: Number(element.dataset.botYaw ?? 0),
            pitch: Number(element.dataset.botPitch ?? 0),
          },
          lastFace: "",
          lastTransform: "",
        };
      });
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let elapsed = 0;
    let previousTime: number | undefined;
    let frame: number | undefined;
    let previousClip = "";
    let previousBrand = "";

    const restore = () => {
      aperture?.style.removeProperty("clip-path");
      spacex?.style.removeProperty("opacity");
      partners?.style.removeProperty("opacity");
      previousClip = "";
      previousBrand = "";
      characters.forEach((character) => {
        character.motion?.style.removeProperty("transform");
        character.eyes.forEach((eye, index) => {
          eye.setAttribute("d", character.originalEyes[index].d);
          eye.setAttribute("transform", character.originalEyes[index].transform);
        });
        character.lastFace = "";
        character.lastTransform = "";
      });
    };
    const draw = () => {
      const scene = sampleAmbientTimeline(elapsed);
      const clip = `ellipse(62% ${(scene.aperture * 70).toFixed(4)}% at 50% 50%)`;
      if (aperture && clip !== previousClip) aperture.style.clipPath = clip;
      previousClip = clip;
      if (scene.brand !== previousBrand) {
        if (spacex) spacex.style.opacity = scene.brand === "spacexai" ? "1" : "0";
        if (partners) partners.style.opacity = scene.brand === "partners" ? "1" : "0";
        previousBrand = scene.brand;
      }
      characters.forEach((character) => {
        const sample = sampleCommunityBot(elapsed, character.bot);
        const { gaze, split, eyes } = sample.face;
        // Resting bots need no projection or DOM writes until their face changes.
        const signature = [gaze.yaw, gaze.pitch, gaze.roll, split,
          ...eyes.flatMap((eye) => [eye.w, eye.h, eye.tilt ?? 0, eye.open])].join(",");
        if (signature !== character.lastFace) {
          const geometry = createBotEyeGeometry(character.shape, sample.face, character.seed);
          character.eyes.forEach((eye, index) => {
            const next = geometry[index];
            if (!next) return;
            eye.setAttribute("d", next.d);
            eye.setAttribute("transform", next.transform);
          });
          character.lastFace = signature;
        }
        const transform = `translate3d(0, ${(-sample.lift).toFixed(4)}cqw, 0) rotate(${sample.tilt.toFixed(4)}deg)`;
        if (character.motion && transform !== character.lastTransform) {
          character.motion.style.transform = transform;
          character.lastTransform = transform;
        }
      });
    };
    const tick = (now: number) => {
      if (previousTime !== undefined) elapsed += (now - previousTime) / 1000;
      previousTime = now;
      draw();
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
      characters.forEach(({ svg }) => {
        if (svg) svg.dataset.botMotion = running ? "running" : "paused";
      });
      if (running) {
        if (frame === undefined) frame = requestAnimationFrame(tick);
      } else {
        stop();
        if (preference.matches || !enabled) restore();
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
      restore();
      characters.forEach(({ svg }) => {
        if (svg) delete svg.dataset.botMotion;
      });
    };
  }, [ref]);
}
