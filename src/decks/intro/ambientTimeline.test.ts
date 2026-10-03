import { describe, expect, it } from "vitest";
import { createBotEyeGeometry } from "../../bot/model";
import { sampleAmbientTimeline, sampleCommunityBot } from "./ambientTimeline";
import type { BotExpression } from "../../bot/expressions";
import { meetupCommunity } from "./meetupBots";

const faceValues = (face: BotExpression) => [
  face.gaze.yaw, face.gaze.pitch, face.gaze.roll, face.split,
  ...face.eyes.flatMap((eye) => [eye.w, eye.h, eye.open, eye.tilt ?? 0]),
];

const cast = meetupCommunity.map(({ bot, x, y, phase }, index) => ({
  shape: bot.shape ?? "round",
  seed: bot.seed ?? 0,
  motion: {
    index,
    expression: bot.expression ?? "neutral",
    phase,
    yaw: Math.max(-24, Math.min(24, (50 - x) * 0.5)),
    pitch: Math.max(-15, Math.min(15, (y - 30) * 0.7)),
  },
}));

describe("meetup community choreography", () => {
  it("switches original brands only inside the closed aperture for ten full cycles", () => {
    let previous = sampleAmbientTimeline(0).brand;
    let changes = 0;
    for (let frame = 1; frame <= 180 * 120; frame++) {
      const sample = sampleAmbientTimeline(frame / 120);
      expect(sample.aperture).toBeGreaterThanOrEqual(0);
      expect(sample.aperture).toBeLessThanOrEqual(1);
      if (sample.brand !== previous) {
        expect(sample.aperture).toBe(0);
        changes++;
      }
      previous = sample.brand;
    }
    expect(changes).toBe(20);
    expect(sampleAmbientTimeline(8.4).brand).toBe("spacexai");
    expect(sampleAmbientTimeline(9).brand).toBe("partners");
    expect(sampleAmbientTimeline(18)).toEqual(sampleAmbientTimeline(0));
    expect(sampleAmbientTimeline(NaN)).toEqual(sampleAmbientTimeline(0));
  });

  it("joins the aperture smoothly at every close, opening and loop seam", () => {
    for (const boundary of [0, 8, 8.45, 8.5, 8.55, 9, 17, 17.45, 17.5, 17.55, 18]) {
      const before = sampleAmbientTimeline(boundary - 0.00001).aperture;
      const after = sampleAmbientTimeline(boundary + 0.00001).aperture;
      expect(Math.abs(before - after)).toBeLessThan(0.001);
    }
  });

  it("carries attention through the group before returning to rest", () => {
    const bot = { index: 0, expression: "neutral", phase: 0, yaw: 14, pitch: -8 };
    expect(sampleCommunityBot(7.6, bot).attention).toBe(1);
    expect(sampleCommunityBot(7.6, { ...bot, index: 9 }).attention).toBe(0);
    for (let index = 0; index < 10; index++) {
      expect(sampleCommunityBot(8.3, { ...bot, index }).attention).toBe(1);
      expect(sampleCommunityBot(10, { ...bot, index }).attention).toBe(0);
      expect(sampleCommunityBot(6, { ...bot, index }).tilt).toBe(0);
    }
  });

  it("keeps the actual community's silhouettes, center gaze and expressions finite", () => {
    for (const character of cast) {
      for (let frame = 0; frame < 18 * 30; frame++) {
        const sample = sampleCommunityBot(frame / 30, character.motion);
        const eyes = createBotEyeGeometry(character.shape, sample.face, character.seed);
        expect(eyes).toHaveLength(2);
        for (const eye of eyes) expect(eye.d + eye.transform).not.toMatch(/NaN|Infinity|undefined/);
      }
    }
  });

  it("returns from group reactions and individual gestures without a face jump", () => {
    for (const { motion: bot } of cast) {
      const blinkPeriod = 8.3 + bot.index * 0.31;
      const boundaries = [0, 7.1, 8.5, 9, 9.9, 16.1, 17.5, 18];
      for (let cycle = 1; cycle <= 6; cycle++) {
        // Each character has a different local clock for repose and eyelids.
        boundaries.push(...[0, 3, 4.8, 5.6].map((time) => cycle * 27 + time - bot.phase));
        boundaries.push(...[0, 2.1, 2.188, 2.32].map((time) => cycle * blinkPeriod + time - bot.phase));
      }
      for (const time of boundaries) {
        const before = faceValues(sampleCommunityBot(time - 0.00001, bot).face);
        const after = faceValues(sampleCommunityBot(time + 0.00001, bot).face);
        before.forEach((value, component) => {
          expect(Math.abs(value - after[component])).toBeLessThan(0.01);
        });
      }
    }
  });
});
