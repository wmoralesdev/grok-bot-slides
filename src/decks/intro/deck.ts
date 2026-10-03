import type { Deck } from "../types";
import { AmbientLoopSlide } from "./AmbientLoopSlide";
import {
  MeetupAgendaSlide,
  MeetupContextSlide,
  MeetupOrganizationsSlide,
  MeetupStartSlide,
  MeetupWelcomeSlide,
} from "./MeetupSlides";

export const introDeck: Deck = {
  slug: "grok-bot-101",
  title: "Grok bot Meetup",
  description:
    "La bienvenida al primer meetup de SpaceXAI en El Salvador, una iniciativa de AI Labs junto con SpaceXAI.",
  category: "Meetup",
  duration: "2 min 30 s",
  accent: "#1688ff",
  presentationMode: "standalone",
  slides: [
    {
      slug: "espera",
      title: "Grok bot Meetup",
      kicker: "Antes de empezar · Loop de espera",
      component: AmbientLoopSlide,
      ambientMotion: true,
      guide: {
        intro:
          "Bienvenido al primer meetup de SpaceXAI en El Salvador. AI Labs organiza esta iniciativa junto con SpaceXAI para explorar qué podemos hacer con Grok bot.",
        takeaway:
          "En unos momentos empezamos con una bienvenida breve y seguimos con charlas y demos por área.",
      },
    },
    {
      slug: "bienvenida",
      title: "Bienvenidos, El Salvador",
      kicker: "Bienvenida · 0:15",
      component: MeetupWelcomeSlide,
      guide: {
        intro:
          "Bienvenido al primer meetup de SpaceXAI en El Salvador, una iniciativa de AI Labs junto con SpaceXAI.",
        takeaway:
          "Hoy nos reunimos para conocer Grok bot y ver aplicaciones concretas en distintas áreas de trabajo.",
      },
    },
    {
      slug: "organizacion-y-comunidad",
      title: "AI Labs + SpaceXAI",
      kicker: "Organización y comunidad · 0:30",
      component: MeetupOrganizationsSlide,
      guide: {
        intro:
          "AI Labs organiza el primer meetup de SpaceXAI en El Salvador junto con SpaceXAI, a través de su participación en el programa de embajadores.",
        sections: [
          {
            title: "Qué es AI Labs",
            body: "Desde El Salvador, AI Labs ayuda a equipos y profesionales a aplicar inteligencia artificial mediante consultoría, automatización y educación práctica. Conocé más en ailabs.sv.",
          },
          {
            title: "Qué es SpaceXAI y cómo colaboramos",
            body: "SpaceXAI es el equipo de inteligencia artificial de SpaceX, detrás de Grok y Grok bot. Nuestra colaboración para este meetup se da a través del programa de embajadores: AI Labs trae la iniciativa a la comunidad local para compartir herramientas y aprender con ejemplos.",
          },
          {
            title: "Programas de embajadores",
            body: "Somos parte de los programas de SpaceXAI, OpenAI Codex, ElevenLabs, Notion y Mistral. Son parte del trabajo de AI Labs con la comunidad.",
          },
        ],
        takeaway:
          "AI Labs trae esta iniciativa a la comunidad local a través de su participación en el programa de embajadores de SpaceXAI.",
      },
    },
    {
      slug: "cursor-spacex-grok-bot",
      title: "De crear software a delegar trabajo",
      kicker: "Cursor y Grok bot · 0:35",
      component: MeetupContextSlide,
      guide: {
        intro:
          "Cursor es un editor de código con agentes de inteligencia artificial para crear, entender y mejorar software. Podés trabajar sobre un proyecto y pedirle ayuda para escribir código, resolver errores o revisar cambios.",
        sections: [
          {
            title: "Su incorporación a SpaceX",
            body: "El 14 de agosto de 2026, Cursor anunció que SpaceX había completado su adquisición. Cursor sigue siendo un producto; SpaceXAI no es simplemente un nuevo nombre para Cursor.",
          },
          {
            title: "La conexión con Grok bot",
            body: "Grok bot propone compañeros de IA a los que podés delegar tareas en aplicaciones y sitios web, también fuera del desarrollo de software. La aplicación usa tu cuenta de Cursor para iniciar sesión.",
          },
        ],
        takeaway:
          "Vamos a pasar de este contexto a ejemplos de trabajo con Grok bot.",
      },
    },
    {
      slug: "agenda-y-dinamica",
      title: "Cinco áreas. Grok bot en acción",
      kicker: "Agenda y dinámica · 0:30",
      component: MeetupAgendaSlide,
      guide: {
        intro:
          "Vamos a recorrer cinco áreas en este orden, con charlas y demos consecutivas. Cada bloque muestra tareas que podés reconocer y adaptar a tu trabajo.",
        sections: [
          {
            title: "Founders → Engineering",
            body: "Comenzamos con founders: quienes crean y hacen crecer una empresa. Después seguimos con Engineering, para ver cómo construir software.",
          },
          {
            title: "GTM → Ops → Research",
            body: "GTM significa go-to-market: cómo llegar al mercado. Ops aborda la operación diaria, y Research cierra con investigación y experimentación.",
          },
        ],
        takeaway:
          "Buscá un ejemplo que conecte con una tarea tuya; no hace falta instalar nada durante esta bienvenida.",
      },
    },
    {
      slug: "objetivo-contexto-resultado",
      title: "Tu primer bot. Un trabajo concreto",
      kicker: "Para empezar · 0:40",
      component: MeetupStartSlide,
      guide: {
        intro:
          "Para empezar: descargá Grok bot desde x.ai/bot, iniciá sesión con Cursor, creá un bot con una función concreta y dale un primer pedido.",
        sections: [
          {
            title: "Acceso e instalación",
            body: "Necesitás un plan individual de pago de Cursor, Cursor Teams o una suscripción individual SuperGrok compatible vinculada a Cursor. En macOS elegí Apple silicon o Intel, abrí el instalador y arrastrá la app a Aplicaciones. En Windows ejecutá el instalador; en Linux elegí el paquete de tu distribución. Consultá los requisitos actuales en docs.x.ai/grok-bot/get-started.",
          },
          {
            title: "Tu bot",
            body: "Completá el ingreso con Cursor en el navegador y regresá a la app. Elegí una sugerencia o Create your own: poné un nombre, una función y cómo querés que trabaje.",
          },
          {
            title: "Objetivo + contexto + resultado",
            body: "Ejemplo: «Con estas notas del meetup, prepará tres ideas que pueda probar en mi trabajo». Adjuntá las notas, explicá tu contexto y revisá que las ideas sean útiles antes de aplicarlas.",
          },
        ],
        takeaway: "Arrancamos con Founders para verlo en acción.",
      },
    },
  ],
};
