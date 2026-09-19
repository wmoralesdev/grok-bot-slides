import calendarMark from "./images/calendar-mark.png";
import moodleMark from "./images/moodle-mark.png";
import ticktickMark from "./images/ticktick-mark.png";
import wisprMark from "./images/wispr-mark.png";

export type ToolId = "calendar" | "ticktick" | "wispr" | "moodle";

type ToolKind = "square" | "badge" | "wide" | "wordmark";

const tools: Record<
  ToolId,
  { src: string; label: string; kind: ToolKind }
> = {
  calendar: { src: calendarMark, label: "Google Calendar", kind: "square" },
  ticktick: { src: ticktickMark, label: "TickTick", kind: "badge" },
  wispr: { src: wisprMark, label: "Wispr Flow", kind: "wordmark" },
  moodle: { src: moodleMark, label: "Moodle", kind: "wide" },
};

export function ToolMark({
  name,
  label,
}: {
  name: ToolId;
  label?: string | false;
}) {
  const tool = tools[name];
  const caption = label === false ? undefined : (label ?? tool.label);
  return (
    <span className={`ops-tool ops-tool--${tool.kind}`}>
      <img
        className="ops-tool-icon"
        src={tool.src}
        alt={caption ? "" : tool.label}
      />
      {caption ? <span className="ops-tool-label">{caption}</span> : null}
    </span>
  );
}
