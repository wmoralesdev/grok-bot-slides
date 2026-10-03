import type { BotProps } from "../../components/Bot";

/** The same two hosts accompany the waiting screen and welcome. */
export const meetupBots = {
  round: { shape: "round", seed: 201, color: "#ffffff" },
  flower: { shape: "flower", seed: 202, color: "#c8ff32" },
} satisfies Record<string, BotProps>;

interface MeetupCharacter {
  id: string;
  bot: BotProps;
  /** Centers and sizes use the slide width, matching its 100 × 56.25 canvas. */
  x: number;
  y: number;
  size: number;
  rotation: number;
  phase: number;
}

/** Clockwise cast order also defines the wave of attention around the two hosts. */
export const meetupCommunity: MeetupCharacter[] = [
  { id: "host-round", bot: meetupBots.round, x: 12, y: 43, size: 17, rotation: -12, phase: 0 },
  { id: "coral-left", bot: { shape: "square", seed: 203, color: "#ff6555", expression: "curious" }, x: 1.2, y: 26, size: 11, rotation: 16, phase: 2.1 },
  { id: "cyan-upper-left", bot: { shape: "triangle", seed: 204, color: "#28dbef" }, x: 21, y: 19.5, size: 9, rotation: -13, phase: 4.7 },
  { id: "lime-top", bot: { shape: "round", seed: 205, color: "#c8ff32", expression: "happy" }, x: 53, y: 1.3, size: 9, rotation: 12, phase: 7.3 },
  { id: "coral-upper-right", bot: { shape: "flower", seed: 206, color: "#ff6555" }, x: 80, y: 8, size: 9, rotation: 18, phase: 10.1 },
  { id: "violet-right", bot: { shape: "square", seed: 207, color: "#9d5cff", expression: "curious" }, x: 99, y: 24, size: 11, rotation: -18, phase: 13.4 },
  { id: "host-flower", bot: meetupBots.flower, x: 87.8, y: 43, size: 17, rotation: 12, phase: 4 },
  { id: "cyan-bottom-right", bot: { shape: "round", seed: 208, color: "#28dbef", expression: "happy" }, x: 67, y: 55.7, size: 10, rotation: -16, phase: 16.2 },
  { id: "coral-bottom", bot: { shape: "triangle", seed: 209, color: "#ff6555" }, x: 45, y: 47.5, size: 8.5, rotation: 9, phase: 8.8 },
  { id: "violet-bottom-left", bot: { shape: "flower", seed: 210, color: "#9d5cff", expression: "curious" }, x: 29.5, y: 56, size: 9, rotation: -14, phase: 18.5 },
];
