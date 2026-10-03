import type { SlideMeta } from "../live/types";
import type { SlideDefinition } from "./types";

/** Keep React components and local presentation settings out of session data. */
export function slideMetadata(slides: SlideDefinition[]): SlideMeta[] {
  return slides.map(({ slug, title, kicker, guide, question }) => ({
    slug,
    title,
    kicker,
    guide,
    ...(question ? { question } : {}),
  }));
}
