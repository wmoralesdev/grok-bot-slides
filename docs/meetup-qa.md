# Verificación de Grok bot Meetup

Revisión local actualizada el 19 de septiembre de 2026.

## Resultado vigente

- Seis slides: espera + cinco intervenciones de **15, 30, 35, 30 y 40 segundos**. Guion de **294 palabras** para una apertura prevista de **150 segundos**, con pausas y cambios de slide. La duración real depende del ensayo del presentador.
- Orden del evento, guías y biblioteca: **Founders → Engineering → GTM → Ops → Research**.
- La bienvenida conserva el saludo, logos y bots. Una slide separada define AI Labs y SpaceXAI y explica la colaboración mediante el programa de embajadores, con texto más grande y más espacio. Los otros programas se muestran como contexto de AI Labs.
- Cursor se presenta como un editor de código con agentes de IA antes de explicar su incorporación a SpaceX y su conexión con Grok bot. Fuentes en [el guion](meetup-talk.md).
- La espera proyecta solamente logos y diez bots. Anfitrión redondo blanco; los demás usan lima, violeta, coral y cian.
- Los retratos de Walter y Daniela sustituyen sus monogramas en Engineering y GTM. Los PNG son idénticos a los activos existentes en `bloub`; encuadre mediante CSS. [Procedencia](../public/speakers/README.md).
- El [PR #1 de Daniela](https://github.com/wmoralesdev/grok-bot-slides/pull/1) se integró con `gh pr merge` y se confirmó `MERGED`, commit `1e3d8bdbb16be2c80f52a2595ccdcf03c889f490`. Se conservaron sus once slides, contenido y UI; la adaptación posterior es el retrato solicitado. Los ajustes de Meetup y retratos siguen siendo locales.
- Modo de presentación independiente: sin preguntas ni sesiones. La ruta `/deck/grok-bot-101` se conserva. Assets locales y Convex deshabilitado.

## Comprobaciones técnicas

- `npm run build`: aprobado, incluye `tsc --noEmit` y el empaquetado existente. No se ejecutó un despliegue.
- `npm test`: **44 pruebas aprobadas en ocho archivos** antes de separar la bienvenida. Tras la separación se repitieron las dos pruebas de metadatos, ambas aprobadas; no cambió el comportamiento de los controladores.
- `git diff --check`: aprobado.
- React Doctor completo tras separar las slides: **cero errores y 14 advertencias**, las mismas categorías del análisis completo anterior. Dos advertencias de RAF son falsos positivos: los efectos llaman a `stop()` en cleanup y este cancela el frame pendiente. Las demás corresponden a complejidad (7), duplicación de JSX (4) y una prueba intencional de serialización JSON (1). La separación no altera esos controladores.
- Revisión independiente de consistencia: tiempos, textos, guías, orden, fuentes y cambios de retratos concordantes.

## Revisión visual

Se usó `http://127.0.0.1:4173` con `VITE_CONVEX_URL` y `VITE_PUBLIC_URL` vacías. No se inició ninguna sesión.

- Bienvenida y organizaciones separadas revisadas en pantalla completa, con temas claro y oscuro. Contexto de Cursor y retratos revisados en la entrega anterior y sin cambios. El bot blanco conserva un contorno sutil en claro.
- Agenda con Founders primero y cierre «Ahora sí: Founders» comprobados en el presentador.
- Miniaturas conservadas, con retratos y contenido actualizado.
- Guía de organizaciones revisada a 390 px: sin desbordamiento horizontal (`scrollWidth = clientWidth = 390`) y escenario de 352 × 198 px, conservando 16:9. La explicación completa se lee debajo de la slide. Tamaño y temas restaurados después de la prueba.
- La portada mantiene diez bots y logos, sin título. El control de pausa y las miniaturas estáticas se verificaron en la revisión previa de esa misma coreografía.

## Movimiento y límites de verificación

- Ciclo vigente de **18 segundos**: ocho de reposo y uno de parpadeo por marca. La máscara elíptica cierra completamente antes del intercambio; los SVG conservan su geometría.
- Las pruebas simulan diez ciclos (180 segundos a 120 Hz), con veinte intercambios ocultos y geometría finita para las diez identidades. Esto no es una medición de FPS ni un ensayo de diez ciclos en pantalla del último cambio de copy.
- La revisión visual previa comprobó que los diez rostros cambian, las miniaturas conservan sus paths y la pausa mantiene ojos, cuerpos, máscara y marca. Navegar a otra slide detiene sus controladores.
- Movimiento reducido se probó con la preferencia real de macOS en la implementación inicial. En los refinamientos posteriores se revisó su controlador; no se volvió a cambiar la preferencia del sistema. La ocultación de documento se verificó en código porque el navegador integrado no expuso un cambio real de visibilidad entre pestañas.
- No se probó en un teléfono físico.

## Uso local

La implementación inicial se entregó con el servidor detenido y la Mac en suspensión. Después Walter pidió reabrir el servidor; permanece disponible para revisar los ajustes.

```bash
VITE_CONVEX_URL= VITE_PUBLIC_URL= npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
```

Abrí [Grok bot Meetup](http://127.0.0.1:4173/deck/grok-bot-101?slide=espera). El [guion](meetup-talk.md) contiene tiempos, fuentes y el recorrido hablado.
