import { Bot } from "../../components/Bot";
import { BrandLogo } from "./BrandLogo";
import { meetupBots } from "./meetupBots";
import "./meetup.css";

function MeetupFooter({ number, note }: { number: string; note: string }) {
  return (
    <div className="slide-footer">
      <span>{note}</span>
      <span>Meetup / {number}</span>
    </div>
  );
}

export function MeetupWelcomeSlide() {
  return (
    <section className="slide-canvas meetup-slide meetup-welcome">
      <div className="slide-eyebrow">El primer meetup de SpaceXAI en El Salvador</div>
      <h1 className="meetup-heading">Bienvenidos,<br /><span className="slide-blue">El Salvador.</span></h1>
      <div className="meetup-organizers">
        <p className="meetup-label">Una iniciativa de AI Labs junto con SpaceXAI</p>
        <div className="meetup-brand-pair">
          <BrandLogo brand="ailabs" className="meetup-ailabs-logo" />
          <span className="meetup-brand-plus" aria-hidden="true">+</span>
          <BrandLogo brand="spacexai" className="meetup-spacexai-logo" />
        </div>
      </div>
      <div className="meetup-hosts">
        <div className="meetup-host-pair" aria-hidden="true">
          <Bot className="slide-bot" {...meetupBots.round} />
          <Bot className="slide-bot" {...meetupBots.flower} />
        </div>
      </div>
      <MeetupFooter number="02" note="AI Labs × SpaceXAI" />
    </section>
  );
}

export function MeetupOrganizationsSlide() {
  return (
    <section className="slide-canvas meetup-slide meetup-community">
      <div className="slide-eyebrow">Quiénes somos y cómo colaboramos</div>
      <h2 className="meetup-heading">AI Labs <span className="slide-blue">+ SpaceXAI.</span></h2>
      <div className="meetup-organizations">
        <div><h3>AI Labs</h3><p>Consultoría, automatización y educación en IA.<br />Desde El Salvador, para equipos y profesionales.</p></div>
        <div><h3>SpaceXAI</h3><p>El equipo de inteligencia artificial de SpaceX,<br />detrás de Grok y Grok bot.</p></div>
      </div>
      <div className="meetup-relationship">
        <span>Cómo colaboramos</span>
        <p>AI Labs organiza este meetup junto con SpaceXAI<br />a través de su participación en el programa de embajadores.</p>
      </div>
      <div className="meetup-ambassadors">
        <span>AI Labs · Programas de embajadores</span>
        <p>SpaceXAI · OpenAI Codex · ElevenLabs · Notion · Mistral</p>
      </div>
      <MeetupFooter number="03" note="Una iniciativa para la comunidad local" />
    </section>
  );
}

export function MeetupContextSlide() {
  return (
    <section className="slide-canvas meetup-slide meetup-context">
      <div className="slide-eyebrow">Un poco de contexto</div>
      <h2 className="meetup-heading">De crear software<br />a delegar trabajo.</h2>
      <div className="meetup-context-grid">
        <div className="meetup-cursor-context">
          <span className="meetup-label">Crear y entender software</span>
          <h3>Cursor<span className="slide-blue">.</span></h3>
          <p>Un editor de código con agentes de IA<br />para crear, entender y mejorar software.</p>
          <span className="meetup-account-note">Parte de SpaceX desde el 14 de agosto de 2026.</span>
        </div>
        <div className="meetup-grok-context">
          <span className="meetup-label">Hoy nos reúne</span>
          <h3>Grok bot<span className="slide-orange">.</span></h3>
          <p>Compañeros de IA para delegar tareas<br />en apps y sitios web, también fuera del código.</p>
          <span className="meetup-account-note">Empezás con tu cuenta de Cursor.</span>
        </div>
      </div>
      <MeetupFooter number="04" note="Cursor · Anuncio oficial del 14 de agosto de 2026" />
    </section>
  );
}

const agenda = [
  ["Founders", "Crear una empresa"],
  ["Engineering", "Construir software"],
  ["GTM", "Llegar al mercado"],
  ["Ops", "Mejorar la operación"],
  ["Research", "Investigar y experimentar"],
] as const;

export function MeetupAgendaSlide() {
  return (
    <section className="slide-canvas meetup-slide meetup-agenda">
      <div className="slide-eyebrow">Agenda y dinámica</div>
      <h2 className="meetup-heading">Cinco áreas.<br /><span className="slide-orange">Grok bot en acción.</span></h2>
      <ol className="meetup-agenda-track">
        {agenda.map(([name, description], index) => (
          <li key={name}>
            <span className="meetup-agenda-number">0{index + 1}</span>
            <h3>{name}</h3>
            <p>{description}</p>
            {index < agenda.length - 1 && <span className="meetup-agenda-arrow" aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>
      <div className="meetup-event-format">
        <span>Charlas + demos</span>
        <p>Una detrás de otra. Ejemplos para llevar a tu trabajo.</p>
      </div>
      <MeetupFooter number="05" note="Arrancamos con Founders" />
    </section>
  );
}

export function MeetupStartSlide() {
  return (
    <section className="slide-canvas meetup-slide meetup-start">
      <div className="slide-eyebrow">Para empezar</div>
      <h2 className="meetup-heading">Tu primer bot.<br /><span className="slide-blue">Un trabajo concreto.</span></h2>
      <ol className="meetup-setup">
        <li><span>01</span><div><h3>Descargá</h3><p>x.ai/bot</p></div></li>
        <li><span>02</span><div><h3>Iniciá sesión</h3><p>Tu cuenta de Cursor</p></div></li>
        <li><span>03</span><div><h3>Creá un bot</h3><p>Un nombre y una función</p></div></li>
      </ol>
      <div className="meetup-first-request">
        <div className="meetup-request-label"><span>04 / Tu primer pedido</span><p>Objetivo + contexto + resultado</p></div>
        <p className="meetup-request-example">“Con estas notas del meetup, prepará<br />tres ideas que pueda probar en mi trabajo.”</p>
        <span className="meetup-request-caption">Ejemplo · Revisá el resultado y ajustá lo que falte.</span>
      </div>
      <MeetupFooter number="06" note="Ahora sí: Founders →" />
    </section>
  );
}
