import type { ComponentType } from "react";
import type { SlideMeta } from "../live/types";

/** Each slide is ordinary React. Its companion guide and question live beside it. */
export type SlideDefinition = SlideMeta & {
  component: ComponentType;
  /** Presentation-only behavior; never sent to a live session. */
  ambientMotion?: boolean;
};

export type Deck = {
  slug: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  accent: string;
  presentationMode?: "standalone";
  slides: SlideDefinition[];
};
