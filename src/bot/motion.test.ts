import { describe, expect, it } from "vitest";
import { sampleBotExpression } from "./motion";
import { createBotEyeGeometry, resolveBotExpression, type BotShape } from "./model";
import type { BotExpression } from "./expressions";

function values(face: BotExpression) {
  return [face.gaze.yaw, face.gaze.pitch, face.gaze.roll, face.split,
    ...face.eyes.flatMap((eye) => [eye.w, eye.h, eye.tilt ?? 0, eye.open])];
}

describe("ambient bot expressions", () => {
  it("joins every expression and the loop without a face jump", () => {
    for (const boundary of [4.4, 5, 9.4, 10, 14.4, 15, 19.4, 20]) {
      const before = values(sampleBotExpression(boundary - 0.00001));
      const after = values(sampleBotExpression(boundary + 0.00001));
      before.forEach((value, index) => {
        expect(Math.abs(value - after[index])).toBeLessThan(0.01);
      });
    }
    expect(values(sampleBotExpression(20))).toEqual(values(sampleBotExpression(0)));
  });

  it("uses the original centered neutral pose and interpolates between poses", () => {
    expect(values(sampleBotExpression(0))).toEqual(values(resolveBotExpression("neutral")));
    const morph = sampleBotExpression(4.6);
    expect(morph.eyes[0].w).toBeGreaterThan(resolveBotExpression("neutral").eyes[0].w);
    expect(morph.eyes[0].w).toBeLessThan(resolveBotExpression("curious").eyes[0].w);
    expect(sampleBotExpression(1.481).eyes[0].open).toBeCloseTo(0);
    expect(sampleBotExpression(1.481).eyes[1].open).toBeCloseTo(0);
  });

  it("offsets both characters predictably and handles invalid clock input", () => {
    expect(sampleBotExpression(7, "neutral", 4)).toEqual(sampleBotExpression(11));
    expect(sampleBotExpression(-1)).toEqual(sampleBotExpression(19));
    expect(sampleBotExpression(NaN, "unknown", Infinity)).toEqual(sampleBotExpression(0));
  });

  it("keeps two finite eyes throughout the round and flower cycles", () => {
    for (const shape of ["round", "flower"] satisfies BotShape[]) {
      for (let frame = 0; frame < 1200; frame++) {
        const eyes = createBotEyeGeometry(shape, sampleBotExpression(frame / 60), 201);
        expect(eyes).toHaveLength(2);
        for (const eye of eyes) {
          expect(eye.d + eye.transform).not.toMatch(/NaN|Infinity|undefined/);
        }
      }
    }
  });
});
