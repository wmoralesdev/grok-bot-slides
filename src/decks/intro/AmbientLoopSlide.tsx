import { useRef, type CSSProperties } from "react";
import { Bot } from "../../components/Bot";
import { BrandLogo } from "./BrandLogo";
import { meetupCommunity } from "./meetupBots";
import { useMeetupAmbient } from "./useMeetupAmbient";
import "./ambient.css";

function MeetupPartnerLogos() {
  return (
    <div className="meetup-partner-logos">
      <img className="meetup-partner-logo meetup-partner-logo--ufm" src="/brand/ufm.webp" alt="UFM · Universidad Francisco Marroquín" draggable={false} />
      <img className="meetup-partner-logo meetup-partner-logo--u3" src="/brand/u3-tech.jpeg" alt="U3 Tech" draggable={false} />
    </div>
  );
}

export function AmbientLoopSlide() {
  const scene = useRef<HTMLElement>(null);
  useMeetupAmbient(scene);

  return (
    <section ref={scene} className="slide-canvas meetup-ambient">
      <div
        className="meetup-brand-scene"
        role="img"
        aria-label="Grok bot Meetup · SpaceXAI, UFM y U3 Tech"
      >
        <div className="meetup-brand-static" aria-hidden="true">
          <BrandLogo brand="spacexai" />
          <span className="meetup-brand-cross">×</span>
          <MeetupPartnerLogos />
        </div>
        <div className="meetup-brand-animated" aria-hidden="true">
          <div className="meetup-brand-aperture">
            <div className="meetup-mark meetup-mark--spacexai">
              <BrandLogo brand="spacexai" />
            </div>
            <div className="meetup-mark meetup-mark--partners">
              <MeetupPartnerLogos />
            </div>
          </div>
        </div>
      </div>

      <div className="meetup-community" aria-hidden="true">
        {meetupCommunity.map(({ id, bot, x, y, size, rotation, phase }, index) => (
          <div
            key={id}
            className="meetup-character"
            data-bot-index={index}
            data-bot-shape={bot.shape}
            data-bot-seed={bot.seed}
            data-bot-expression={bot.expression ?? "neutral"}
            data-bot-phase={phase}
            data-bot-yaw={Math.max(-24, Math.min(24, (50 - x) * 0.5))}
            data-bot-pitch={Math.max(-15, Math.min(15, (y - 30) * 0.7))}
            style={{
              "--character-x": `${x}cqw`,
              "--character-y": `${y}cqw`,
              "--character-size": `${size}cqw`,
              "--character-rotation": `${rotation}deg`,
            } as CSSProperties}
          >
            <div className="meetup-character-motion">
              <Bot {...bot} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
