import type { Deck } from "../types";
import {
  OpsWelcomeSlide,
  SpeakerSlide,
  ProblemSlide,
  CalendarSlide,
  SourcesSlide,
  WeekSlide,
  ExecutionSlide,
  CloseSlide,
} from "./OpsSlides";

export const opsDeck: Deck = {
  slug: "grok-bot-for-ops",
  title: "Grok Bot for Ops",
  description:
    "De muchas fuentes a una semana comprometida: el bot propone, tú confirmas y ejecutas el día.",
  category: "Ops",
  duration: "15 min",
  accent: "#00b9aa",
  slides: [
    {
      slug: "bienvenida",
      title: "Grok Bot for Ops",
      kicker: "Introducción · 1:00",
      component: OpsWelcomeSlide,
      guide: {
        intro:
          "Vamos a recorrer cómo uso Grok Bot para pasar de muchas fuentes a una semana comprometida, y después ejecutarla. El bot propone. Yo confirmo. El día se tacha.",
        sections: [
          {
            title: "Qué nos vamos a llevar",
            body: "Un solo lugar para mirar si el tiempo ya está ocupado, una forma de conectar las fuentes y una lista del día que no compite con el calendar.",
          },
        ],
        takeaway:
          "Explora a tu ritmo. Usa «Ir al presentador» para volver a la slide en vivo.",
      },
      question: {
        id: "ops-donde-organizas",
        prompt: "¿Con qué organizas tu tiempo hoy?",
        type: "poll",
        options: [
          { id: "calendar", label: "Calendario" },
          { id: "lista", label: "Lista de tareas" },
          { id: "cabeza", label: "La cabeza o notas" },
          { id: "varias", label: "Varias a la vez" },
        ],
      },
    },
    {
      slug: "saul-calderon",
      title: "Saul Calderon",
      kicker: "Sobre mí · 0:30",
      component: SpeakerSlide,
      guide: {
        intro:
          "Soy Saul Calderon: AI Product Engineer y SpaceXAI Ambassador.",
        sections: [
          {
            title: "Por qué esta charla",
            body: "Les voy a contar el sistema con el que organizo mi semana, en lo personal y en lo profesional. La plantilla se puede llevar a un ticket, a un reporte o a la lista del día.",
          },
        ],
        takeaway: "Una forma de trabajar, contada a través de una semana.",
      },
    },
    {
      slug: "el-plan-no-alcanza",
      title: "Nos perdemos en el plan",
      kicker: "El problema · 1:30",
      component: ProblemSlide,
      guide: {
        intro:
          "El problema no es solo tener muchas fuentes. Es perderse planificando y no ejecutar. Un calendar lleno da la sensación de orden. No es el resultado.",
        sections: [
          {
            title: "Planificar",
            body: "Reuniones, entregas y cuentas entran por todos lados. Anotarlas no alcanza si esa semana no se cumple.",
          },
          {
            title: "Ejecutar",
            body: "Ejecutar pide un horario ya comprometido y una lista que se pueda tachar. Ahí entra Grok Bot: ayuda a cerrar el cuándo para que el día se pueda hacer.",
          },
        ],
        takeaway:
          "El resultado es lo que hiciste, no lo que anotaste.",
      },
    },
    {
      slug: "google-calendar",
      title: "Un solo lugar para el tiempo",
      kicker: "El cuándo · 2:00",
      component: CalendarSlide,
      guide: {
        intro:
          "Yo uso Google Calendar para saber si ese tiempo ya está ocupado. Recomiendo ese calendar y conectarlo con el plugin de Grok Bot.",
        sections: [
          {
            title: "Cómo se conecta",
            body: "En Grok Bot: Marketplace, elige el plugin, Add, conecta la cuenta de Google y pruébalo desde el chat con @. Esa ruta está documentada para plugins.",
          },
          {
            title: "Quién escribe",
            body: "El bot lee el calendar, propone bloques y señala choques. Nada queda comprometido hasta que yo confirmo. Si más adelante la lista no coincide, gana el calendar.",
          },
        ],
        takeaway:
          "Un solo lugar responde si ese tiempo ya está tomado.",
      },
    },
    {
      slug: "fuentes-plugin-mcp",
      title: "De dónde entra el trabajo",
      kicker: "Las entradas · 2:00",
      component: SourcesSlide,
      guide: {
        intro:
          "El trabajo entra de tres maneras: una reunión que ya tiene hora, una entrega que todavía no está en el calendar, y un admin que se repite. Las capturas son mías: Wispr por MCP y Moodle con el bot en mi máquina.",
        sections: [
          {
            title: "Wispr Flow",
            body: "No tenía plugin. Le pedí a Grok Bot que conectara el MCP, autenticé, y el bot ya pudo leer transcripciones. En el trabajo eso es la nota de la reunión.",
          },
          {
            title: "Universidad",
            body: "Moodle lo abre el bot en el navegador de mi máquina. Le pregunto qué sigue después de una actividad y me lista entregas y fechas. En el trabajo eso es un ticket o un reporte.",
          },
        ],
        takeaway:
          "Plugin si existe. Si no, MCP. Si vive en una web, el bot puede entrar desde tu máquina.",
      },
    },
    {
      slug: "una-semana",
      title: "Así se ve una semana",
      kicker: "Una semana · 4:00",
      component: WeekSlide,
      guide: {
        intro:
          "Le pedí al bot cómo se veía mi agenda. Juntó los calendarios, aplicó mis filtros y me armó una tabla. La captura es una semana real.",
        sections: [
          {
            title: "Qué entra en la misma semana",
            body: "Un meetup, una entrega de la universidad, el gym, el stand-up, pagar la tarjeta y reuniones de trabajo. Personal, universidad y gym conviven en la misma vista.",
          },
          {
            title: "Qué hace el bot",
            body: "No te tira todos los calendarios crudos. Filtra, omite lo que pediste ocultar y te deja una tabla para confirmar. Si algo no va, lo sacas.",
          },
        ],
        takeaway:
          "Pide la semana. El bot la ordena. Tú confirmas.",
      },
    },
    {
      slug: "mas-que-el-calendar",
      title: "Si necesitas más que el calendario",
      kicker: "El día · 2:00",
      component: ExecutionSlide,
      guide: {
        intro:
          "El calendario organiza el cuándo. No es una buena lista del día. Para tachar el día, usa TickTick —o una tool propia— desde Grok Bot.",
        sections: [
          {
            title: "TickTick",
            body: "La captura es del producto: lista y horario juntos. En Grok Bot entra por MCP: pídele al bot que te ayude a enlazarlo, como con Wispr. Si no te sirve, pídele una tool que reciba la semana confirmada.",
          },
          {
            title: "Por qué Grok Bot",
            body: "Grok Bot no es un chat lineal, como ChatGPT o un cloud agent. Es un grupo: cada agente llega con su contexto y se organizan entre ellos.",
          },
        ],
        takeaway:
          "Usa Grok Bot para conectar la lista. El grupo sostiene el contexto. El calendario sigue ganando el cuándo.",
      },
    },
    {
      slug: "la-semana-hecha",
      title: "El plan no cuenta. La semana hecha sí",
      kicker: "El cierre · 2:00",
      component: CloseSlide,
      guide: {
        intro:
          "El plan no cuenta. La semana hecha sí. Grok Bot nos ayuda con la automatización y el plan. Nos deja más tiempo para ejecutar.",
        sections: [
          {
            title: "Calendar",
            body: "El único lugar donde miras si ese tiempo ya está ocupado.",
          },
          {
            title: "La lista",
            body: "Lo que vas a hacer hoy, cuando el horario ya está confirmado.",
          },
        ],
        takeaway:
          "Grok Bot arma el plan. El tiempo extra es para ejecutar.",
      },
      question: {
        id: "ops-que-falta",
        prompt: "¿Qué te falta más esta semana?",
        type: "single",
        options: [
          { id: "calendar", label: "Un calendar" },
          { id: "ejecutar", label: "Ejecutar lo que ya anoté" },
          { id: "ambas", label: "Las dos" },
          { id: "nose", label: "No sé" },
        ],
      },
    },
  ],
};
