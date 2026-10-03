// Adapted from bloub's expressions.ts, engine.ts and face.ts.
// Copyright (c) 2026 Jérémy Perret. MIT license: ./LICENSE.
import { blendExpression, type BotExpression } from "./expressions";
import { resolveBotExpression } from "./model";

export const BOT_EXPRESSION_CYCLE_SECONDS = 20;
const HOLD_SECONDS = 4.4;
const MORPH_SECONDS = 0.6;
const BLINKS = [1.4, 4.8, 8.9, 9.14, 13.5, 17.7];

function blinkLid(time: number) {
  for (const start of BLINKS) {
    const progress = (time - start) / 0.18;
    if (progress >= 0 && progress <= 1) {
      // Original bloub blink: fast close, slightly slower open.
      return progress < 0.45
        ? 1 - progress / 0.45
        : (progress - 0.45) / 0.55;
    }
  }
  return 1;
}

/** Pure clock-based face: holds have small glances and natural paired blinks. */
export function sampleBotExpression(
  elapsedSeconds: number,
  initialExpression = "neutral",
  delaySeconds = 0,
): BotExpression {
  const elapsed = Number.isFinite(elapsedSeconds) ? elapsedSeconds : 0;
  const delay = Number.isFinite(delaySeconds) ? delaySeconds : 0;
  const time = ((elapsed + delay) % BOT_EXPRESSION_CYCLE_SECONDS +
    BOT_EXPRESSION_CYCLE_SECONDS) % BOT_EXPRESSION_CYCLE_SECONDS;
  const poses = [initialExpression, "curious", "happy", "surprised"];
  const index = Math.floor(time / 5);
  const within = time - index * 5;
  const progress = Math.max(0, (within - HOLD_SECONDS) / MORPH_SECONDS);
  // Bloub's expression morph uses easeOutQuint; the ambient version takes 600ms.
  const eased = 1 - Math.pow(1 - progress, 5);
  const face = blendExpression(
    resolveBotExpression(poses[index]),
    resolveBotExpression(poses[(index + 1) % poses.length]),
    eased,
  );
  const phase = (time / BOT_EXPRESSION_CYCLE_SECONDS) * Math.PI * 2;
  const lid = blinkLid(time);
  return {
    ...face,
    gaze: {
      yaw: face.gaze.yaw + Math.sin(phase * 2) * 2.4,
      pitch: face.gaze.pitch + Math.sin(phase * 3) * 1.6,
      roll: face.gaze.roll + Math.sin(phase) * 0.8,
    },
    eyes: [
      { ...face.eyes[0], open: Math.min(face.eyes[0].open, lid) },
      { ...face.eyes[1], open: Math.min(face.eyes[1].open, lid) },
    ],
  };
}
