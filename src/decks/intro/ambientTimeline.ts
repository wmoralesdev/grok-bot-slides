import { blendExpression, type BotExpression } from "../../bot/expressions";
import { resolveBotExpression } from "../../bot/model";
import { sampleBotExpression } from "../../bot/motion";

export const MEETUP_LOOP_SECONDS = 18;
const BRAND_SECONDS = MEETUP_LOOP_SECONDS / 2;

const finite = (value: number, fallback = 0) => Number.isFinite(value) ? value : fallback;
const mod = (value: number, duration: number) => ((value % duration) + duration) % duration;
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

/** Both marks are exchanged only while the curved aperture is fully shut. */
export function sampleAmbientTimeline(elapsedSeconds: number) {
  const time = mod(finite(elapsedSeconds), MEETUP_LOOP_SECONDS);
  const within = time % BRAND_SECONDS;
  const aperture = within < 8
    ? 1
    : within < 8.45
      ? 1 - smooth((within - 8) / 0.45)
      : within <= 8.55
        ? 0
        : smooth((within - 8.55) / 0.45);
  const brand = time < 8.5 || time >= 17.5 ? "spacexai" : "partners";
  return { brand, aperture } as const;
}

export interface CommunityBot {
  index: number;
  expression: string;
  phase: number;
  yaw: number;
  pitch: number;
}

function blink(time: number, start: number, duration: number) {
  const progress = (time - start) / duration;
  if (progress < 0 || progress > 1) return 1;
  return progress < 0.4
    ? 1 - smooth(progress / 0.4)
    : smooth((progress - 0.4) / 0.6);
}

/** One sparse individual gesture, plus the shared look-and-blink reaction. */
export function sampleCommunityBot(elapsedSeconds: number, bot: CommunityBot) {
  const elapsed = finite(elapsedSeconds);
  const index = Math.min(9, Math.max(0, finite(bot.index)));
  const phase = finite(bot.phase);
  const base = resolveBotExpression(bot.expression);
  // Spread small personal reactions across a longer cycle; most faces rest.
  const idleTime = mod(elapsed + phase, 27);
  const gesture = smooth((idleTime - 3) / 0.55) *
    (1 - smooth((idleTime - 4.8) / 0.8));
  const idleFace = blendExpression(
    base,
    sampleBotExpression(idleTime + 5, bot.expression, phase / 3),
    gesture * 0.65,
  );

  // Attention travels through ten positions in 800ms, ahead of each change.
  const waveTime = mod(elapsed - 7.1, BRAND_SECONDS);
  const attention = smooth((waveTime - index * (0.8 / 9)) / 0.36) *
    (1 - smooth((waveTime - 2.05) / 0.75));
  const attentive = resolveBotExpression(index % 3 === 0 ? "curious" : "attentive");
  const target: BotExpression = {
    ...attentive,
    gaze: {
      yaw: finite(bot.yaw),
      pitch: finite(bot.pitch),
      roll: base.gaze.roll * 0.35,
    },
  };
  const face = blendExpression(idleFace, target, attention);
  const individualLid = blink(mod(elapsed + phase, 8.3 + index * 0.31), 2.1, 0.22);
  const collectiveLid = blink(waveTime, 1.16 + index * 0.017, 0.38);
  const lid = Math.min(individualLid, collectiveLid);
  const direction = Math.sign(finite(bot.yaw)) || (index % 2 ? -1 : 1);

  return {
    face: {
      ...face,
      eyes: [
        { ...face.eyes[0], open: Math.min(face.eyes[0].open, lid) },
        { ...face.eyes[1], open: Math.min(face.eyes[1].open, lid) },
      ],
    } satisfies BotExpression,
    attention,
    tilt: direction * attention * 2.5,
    lift: attention * 0.16,
  };
}
