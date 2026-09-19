import type { ReactNode } from "react";
import { Bot } from "../../components/Bot";
import agendaAsk from "./images/agenda-ask.png";
import agendaWeek from "./images/agenda-week.png";
import moodleLocal from "./images/moodle-local.png";
import ticktickApp from "./images/ticktick-app.png";
import { ToolMark } from "./ToolMark";
import wisprConnect from "./images/wispr-connect.png";
import "./ops.css";

const cast = {
  tiempo: {
    name: "Tiempo",
    color: "#00b9aa",
    shape: "square" as const,
    seed: 150,
  },
  fuentes: {
    name: "Fuentes",
    color: "#1688ff",
    shape: "triangle" as const,
    seed: 151,
  },
  dia: {
    name: "Día",
    color: "#ff6b00",
    shape: "flower" as const,
    seed: 152,
  },
};

function CastBot({
  who,
  className = "",
}: {
  who: (typeof cast)[keyof typeof cast];
  className?: string;
}) {
  return (
    <Bot
      className={`slide-bot ops-bot ${className}`}
      seed={who.seed}
      color={who.color}
      shape={who.shape}
    />
  );
}

function Shot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="ops-shot">
      <img src={src} alt={alt} />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Frame({
  number,
  label,
  title,
  footer,
  children,
  className = "",
}: {
  number: number;
  label: string;
  title: ReactNode;
  footer: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`slide-canvas ops-slide ${className}`}>
      <div className="slide-eyebrow">Grok Bot for Ops / {label}</div>
      <h2 className="ops-title">{title}</h2>
      <div className="ops-content">{children}</div>
      <div className="slide-footer">
        <span>{footer}</span>
        <span>{String(number).padStart(2, "0")} / 08</span>
      </div>
    </section>
  );
}

export function OpsWelcomeSlide() {
  return (
    <section className="slide-canvas ops-slide ops-cover">
      <div className="slide-eyebrow">Saul Calderon / 15 minutos</div>
      <h1 className="ops-cover-title">
        Grok Bot
        <br />
        for Ops<span className="slide-teal">.</span>
      </h1>
      <p className="ops-cover-caption">
        De muchas fuentes a una semana
        <br />
        comprometida. Después, ejecutarla.
      </p>
      <div className="ops-cover-cast" aria-label="Tiempo, Fuentes y Día">
        {Object.values(cast).map((who) => (
          <div key={who.name}>
            <CastBot who={who} />
            <span>{who.name}</span>
          </div>
        ))}
      </div>
      <div className="slide-footer">
        <span>El bot propone. Tú confirmas. El día se tacha.</span>
        <span>01 / 08</span>
      </div>
    </section>
  );
}

export function SpeakerSlide() {
  return (
    <Frame
      number={2}
      label="Un gusto, soy Saul"
      title={
        <>
          Saul
          <br />
          Calderon<span className="slide-teal">.</span>
        </>
      }
      footer="Hoy les cuento cómo organizo mi semana con Grok Bot."
      className="ops-speaker-slide"
    >
      <div className="ops-speaker-roles">
        <p>
          <span>Mi trabajo</span>
          <strong>AI Product Engineer</strong>
        </p>
        <p>
          <span>SpaceXAI</span>
          <strong>Ambassador</strong>
        </p>
      </div>
      <div className="ops-speaker-mark" aria-hidden="true">
        SC<span>↗</span>
      </div>
    </Frame>
  );
}

export function ProblemSlide() {
  return (
    <Frame
      number={3}
      label="El problema"
      title={
        <>
          Nos perdemos
          <br />
          en el plan.
        </>
      }
      footer="El calendar lleno no es el resultado. El resultado es lo que hiciste."
      className="ops-problem-slide"
    >
      <div className="ops-split">
        <section>
          <CastBot who={cast.fuentes} />
          <span className="ops-overline slide-blue">Planificar</span>
          <h3>La semana anotada.</h3>
          <p>Muchas fuentes. La sensación de estar organizado.</p>
        </section>
        <section>
          <CastBot who={cast.dia} />
          <span className="ops-overline slide-teal">Ejecutar</span>
          <h3>La semana hecha.</h3>
          <p>Un horario comprometido. Una lista que se puede tachar.</p>
        </section>
      </div>
    </Frame>
  );
}

export function CalendarSlide() {
  return (
    <Frame
      number={4}
      label="El cuándo"
      title={
        <>
          Un solo lugar
          <br />
          para el tiempo.
        </>
      }
      footer="Si Calendar y la lista no coinciden, gana el calendar."
    >
      <CastBot who={cast.tiempo} className="ops-corner-bot" />
      <p className="ops-calendar-lead">
        <ToolMark name="calendar" label={false} />
        Yo uso Google Calendar para saber si ese tiempo ya está ocupado.
        Conéctalo con el plugin de Grok Bot.
      </p>
      <ol
        className="ops-connect"
        aria-label="Conectar Google Calendar en Grok Bot"
      >
        <li>
          <small>01</small>
          <strong>Marketplace</strong>
          <span>Elige el plugin</span>
        </li>
        <li>
          <small>02</small>
          <strong>Add</strong>
          <span>Agrégalo</span>
        </li>
        <li>
          <small>03</small>
          <strong>Conecta la cuenta</strong>
          <span>Autentica Google</span>
        </li>
        <li>
          <small>04</small>
          <strong>Pruébalo en el chat</strong>
          <span>@ el conector</span>
        </li>
      </ol>
      <p className="ops-confirm-line">
        El bot lee el calendar, propone bloques y señala choques. Nada queda
        comprometido hasta que tú confirmas.
      </p>
    </Frame>
  );
}

export function SourcesSlide() {
  return (
    <Frame
      number={5}
      label="Las entradas"
      title="De dónde entra el trabajo."
      footer="Plugin si existe. Si no, MCP o el bot en tu máquina."
      className="ops-sources-slide"
    >
      <div className="ops-sources">
        <article>
          <span className="ops-overline slide-blue">Ya tiene hora</span>
          <h3>
            <ToolMark name="wispr" label={false} />
          </h3>
          <p>El contexto cuando el título de la reunión no alcanza.</p>
        </article>
        <article>
          <span className="ops-overline slide-teal">No está anotada</span>
          <h3>
            <ToolMark name="moodle" label={false} />
            Moodle
          </h3>
          <p>En mi máquina. En el trabajo: un ticket.</p>
        </article>
        <article>
          <span className="ops-overline slide-orange">Se repite</span>
          <h3>
            <ToolMark name="calendar" label={false} />
            Calendar
          </h3>
          <p>La tarjeta, o payroll. Se aprueba una vez.</p>
        </article>
      </div>
      <div className="ops-shots">
        <Shot
          src={wisprConnect}
          alt="Grok Bot agrega el conector MCP de Wispr Flow y pide autenticar"
          caption="Wispr Flow · pídele al bot que conecte el MCP"
        />
        <Shot
          src={moodleLocal}
          alt="Grok Bot lee Moodle en el navegador de la máquina local y lista las próximas actividades"
          caption="Moodle · el bot lo abre en tu máquina"
        />
      </div>
    </Frame>
  );
}

export function WeekSlide() {
  return (
    <Frame
      number={6}
      label="Una semana"
      title="Así se ve una semana."
      footer="Le pedí la agenda. El bot juntó los calendarios, filtró y me armó la tabla."
      className="ops-week-slide"
    >
      <ol className="ops-week-steps">
        <li>
          <span>01</span>
          <strong>Pide la semana</strong>
        </li>
        <li>
          <span>02</span>
          <strong>
            <ToolMark name="calendar" label={false} />
            Junta calendarios
          </strong>
        </li>
        <li>
          <span>03</span>
          <strong>Aplica tus filtros</strong>
        </li>
        <li>
          <span>04</span>
          <strong>Arma la tabla</strong>
        </li>
        <li>
          <span>05</span>
          <strong>Confirma</strong>
        </li>
      </ol>
      <div className="ops-shots">
        <Shot
          src={agendaAsk}
          alt="Pregunta al bot cómo se ve la agenda de la semana y comienza la tabla filtrada"
          caption="Meetup, universidad y gym · sábado a lunes"
        />
        <Shot
          src={agendaWeek}
          alt="Continuación de la semana: stand-up, pagar la tarjeta, súper, presupuesto y reuniones de trabajo"
          caption="Tarjeta, stand-up y trabajo · martes y miércoles"
        />
      </div>
    </Frame>
  );
}

export function ExecutionSlide() {
  return (
    <Frame
      number={7}
      label="El día"
      title={
        <>
          Si necesitas más
          <br />
          que el calendario.
        </>
      }
      footer="El calendario no es una buena lista del día. La lista no decide si estás libre."
      className="ops-exec-slide"
    >
      <div className="ops-exec">
        <div className="ops-exec-copy">
          <section>
            <span className="ops-overline slide-orange">Usar una tool</span>
            <h3>
              <ToolMark name="ticktick" label={false} />
              TickTick, con Grok Bot.
            </h3>
            <p>
              La lista para tachar. Pídele al bot que conecte el MCP, igual
              que con Wispr. Si no te sirve, pídele una tool propia.
            </p>
          </section>
          <section>
            <span className="ops-overline slide-teal">Por qué Grok Bot</span>
            <h3>Un grupo, no un hilo.</h3>
            <p>
              Cada agente llega con su contexto y se organizan entre ellos.
              No es un chat lineal, como ChatGPT o un cloud agent.
            </p>
          </section>
        </div>
        <Shot
          src={ticktickApp}
          alt="TickTick en escritorio y en el teléfono: lista de la semana y calendario del día"
          caption="TickTick · la lista y el horario, juntos"
        />
      </div>
    </Frame>
  );
}

export function CloseSlide() {
  return (
    <section className="slide-canvas ops-slide">
      <div className="slide-eyebrow">Grok Bot for Ops / El cierre</div>
      <h2 className="ops-close-title">
        El plan no cuenta.
        <br />
        La semana hecha sí<span className="slide-teal">.</span>
      </h2>
      <p className="ops-close-caption">
        Grok Bot nos ayuda con la automatización y el plan. Nos deja más
        tiempo para ejecutar.
      </p>
      <div className="ops-close-pair">
        <div>
          <h3>
            <ToolMark name="calendar" label={false} />
            Calendar
          </h3>
          <p>El único lugar donde miras si ese tiempo ya está ocupado.</p>
        </div>
        <div>
          <h3>
            <ToolMark name="ticktick" label={false} />
            La lista
          </h3>
          <p>Lo que vas a hacer hoy, cuando el horario ya está confirmado.</p>
        </div>
      </div>
      <div className="slide-footer">
        <span>Grok Bot arma el plan. El tiempo extra es para ejecutar.</span>
        <span>08 / 08</span>
      </div>
    </section>
  );
}
