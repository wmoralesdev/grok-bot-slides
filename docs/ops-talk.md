# Grok Bot for Ops

Charla de 15 minutos para una audiencia mixta: estudiantes, operators, founders e engineering. Grok Bot es el asistente. El tema es pasar de muchas fuentes a una semana comprometida y después ejecutarla. No hay demo en vivo: la semana está preparada.

| Slide                                    | Tiempo | Acumulado | Guía del presentador                                                                                                                                                          |
| ---------------------------------------- | ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Grok Bot for Ops                      | 1:00   | 1:00      | Presentar el recorrido. Encuesta: ¿con qué organizas tu tiempo hoy?                                                                                                           |
| 2. Saul Calderon                         | 0:30   | 1:30      | AI Product Engineer y SpaceXAI Ambassador. Así organizo mi semana.                                                                                                            |
| 3. Nos perdemos en el plan               | 1:30   | 3:00      | El fallo no es solo tener muchas fuentes: es planificar y no ejecutar.                                                                                                        |
| 4. Un solo lugar para el tiempo          | 2:00   | 5:00      | Google Calendar. Plugin de Grok Bot: Marketplace → Add → conectar cuenta → probar. El bot propone; tú confirmas.                                                              |
| 5. De dónde entra el trabajo             | 2:00   | 7:00      | Reunión, entrega, admin. Capturas: Wispr Flow por MCP y Moodle con el bot en la máquina.                                                                                       |
| 6. Así se ve una semana                  | 4:00   | 11:00     | Pide la semana. El bot junta calendarios, filtra y arma la tabla. Captura real: meetup, universidad, gym, tarjeta, stand-up.                                                   |
| 7. Si necesitas más que el calendario    | 2:00   | 13:00     | TickTick (o una tool propia) desde Grok Bot. Ventaja: grupo de agentes con contexto, no un hilo lineal como ChatGPT.                                                           |
| 8. El plan no cuenta. La semana hecha sí | 2:00   | 15:00     | Cerrar: Grok Bot automatiza el plan y deja más tiempo para ejecutar. Encuesta: ¿qué te falta más esta semana?                                                                 |

## Plugin y MCP

La ruta Marketplace → Add → autenticación → @ conector está documentada para plugins de Grok Bot. La gestión está en Marketplace → Your plugins. No se atribuyen a Grok Bot los comandos de instalación de Cursor ni los de Grok Build.

MCP significa Model Context Protocol. Se explica como protocolo. La conexión de Wispr Flow está en la captura de la slide 5: Saul le pidió al bot que conectara el MCP, autenticó y el conector quedó agregado. Moodle no entra por MCP: el bot lo abre en el navegador de su máquina.

Google Calendar como plugin recomendado proviene de la práctica de Saul, no de un inventario verificado del Marketplace.

## Capturas

En `src/decks/ops/images/`. Son evidencia de Saul, no recreaciones.

| Archivo | Slide | Qué muestra |
| --- | --- | --- |
| `wispr-connect.png` | 5 | Conectar Wispr Flow por MCP |
| `moodle-local.png` | 5 | Bot local leyendo actividades en Moodle |
| `agenda-ask.png` | 6 | “How does my agenda look…” y el arranque de la tabla |
| `agenda-week.png` | 6 | Martes y miércoles: tarjeta, stand-up, trabajo |
| `ticktick-app.png` | 7 | Producto TickTick: lista y calendario. Ilustrativa, no es la semana de Saul. |

No se proyecta la captura de notas crudas de Wispr: el texto no se lee a distancia. Si hace falta, se menciona en voz alta.

La semana de la slide 6 es real. En la misma vista conviven meetup, universidad, gym, pagar la tarjeta y reuniones de trabajo. El bot filtró calendarios antes de armar la tabla. TickTick o una tool propia siguen después de confirmar, en la slide 7.

## Identidad de los bots

| Bot     | Identidad              | Rol en la charla      |
| ------- | ---------------------- | --------------------- |
| Tiempo  | Teal, cuadrado, seed 150 | El cuándo, Calendar   |
| Fuentes | Azul, triángulo, seed 151 | Inbox y conexiones    |
| Día     | Naranja, flor, seed 152  | Lista / ejecución     |

## Fuentes

Consultadas el 19 de septiembre de 2026:

- [Conectar apps en Grok Bot](https://docs.x.ai/grok-bot/computer-and-apps#connect-an-app)
- [Gestionar plugins y herramientas](https://docs.x.ai/grok-bot/settings-and-notifications#plugins)
- [Qué es MCP](https://modelcontextprotocol.io/docs/getting-started/intro)
