# Procedencia de los bots

Los bots de Grok bot Slides reutilizan la geometría de **bloub**. Su
`package.json` y su README lo identifican como `bloub`; Flow fue el nombre
utilizado para referirse al proyecto durante la extracción.

Fuente original: [Jérémy Perret / bloub](https://github.com/jeremy-prt/bloub).
Revisión local al extraer: `b4bb3c1b5f93c7b87a2e8d620f667c4093d97749`.
Copyright (c) 2026 Jérémy Perret. El texto completo de la licencia MIT se conserva
en [`src/bot/LICENSE`](../src/bot/LICENSE). La licencia cubre el código; los nombres
Grok y x.ai y el diseño visual original pertenecen a sus respectivos titulares.

## Código extraído

- `src/bot/geometry.ts`: funciones de `bloub/src/bot/shape.ts`: muestreo radial de
  64 puntos, proyección del contorno, curvas Catmull–Rom, superelipses, polígonos
  redondeados, unión radial de círculos, interpolación radial y cápsulas.
- `src/bot/face.ts`: proyección ortográfica de los ojos sobre una esfera y las
  medidas originales: separación de 15.46°, ancho 0.186, alto 0.412, mirada
  `yaw: 28.49, pitch: 28.62, roll: -13`.
- `src/bot/expressions.ts`: las 16 expresiones de reposo originales y su mezcla
  de mirada, tamaño, inclinación y apertura de ojos, sin depender de los tipos del motor.
- `src/bot/model.ts`: adaptador geométrico. Conserva el perfil circular, el
  squircle (`superellipseProfile(4.2)` normalizado a 1.15) y el triángulo
  (`regularPolygonProfile(3, 1.12, 0.34, -90)`) del personalizador original.
  La flor adapta la construcción original de unión de círculos a seis pétalos.
  La matriz tangente de los ojos sigue `bloub/src/bot/engine.ts`. Para seguir las
  referencias visuales de estas slides, la pose neutra mira al centro y las
  cápsulas aumentan 1.3 veces su tamaño. Un ajuste estático traslada ambos ojos
  juntos hacia el centro si el contorno es estrecho.
- `src/bot/motion.ts`: secuencia ambiental de 20 segundos basada en
  `expressions.ts`, `engine.ts` y `face.ts` de bloub. Interpola las expresiones con
  `easeOutQuint` durante 600 ms y añade parpadeos y pequeños cambios de mirada.

No se importan Vue, GSAP, Hyperframes, el editor, el motor de animaciones completo ni los
servicios de renderizado y exportación. El repositorio de origen queda intacto.

## Componente React

```tsx
import { Bot } from "./components/Bot";

<Bot shape="flower" color="#d0ef7b" expression="curious" seed={12} />;
// Animación individual opcional en un escenario con movimiento habilitado:
<Bot shape="round" color="#9d5cff" seed={201} animated expressionDelay={4} />;
```

API: `seed?: number`, `color?: string`, `shape?: 'round' | 'flower' | 'square' |
'triangle'`, `className?: string`, `expression?: string`, `animated?: boolean`,
`expressionDelay?: number` (desfase en segundos).

La forma por defecto es `round`; el color es `currentColor`. El seed introduce
una pequeña variación determinista en la mirada. `expression` acepta los IDs
originales y los alias `neutral`, `attentive`, `happy`, `curious`, `surprised`,
`sleepy`, `excited`, `thinking` y `wink`; los valores desconocidos usan la
expresión neutra. `wink` representa la asimetría de ojos `mefiant` original.

El SVG ocupa su contenedor y es decorativo (`aria-hidden`). Los ojos usan negro
sólido (`#050505`) para conservar su color cuando se superponen bots. Por defecto
permanece inmóvil. `animated` habilita la secuencia expresión inicial → curioso →
feliz → sorprendido → expresión inicial, únicamente dentro del escenario activo
con movimiento habilitado. Las miniaturas no crean relojes ni listeners.

El bucle actualiza directamente los atributos de los dos ojos, sin renderizar React
en cada frame. Pausa/reanudar conserva el tiempo y la pose; ocultar la pestaña
también lo detiene. Movimiento reducido restaura la expresión estática. El efecto
limpia su RAF, observador y listeners al desmontarse. El componente no comparte
identificadores SVG entre instancias.

La portada del Meetup reutiliza diez instancias estáticas de `Bot` y un solo
controlador de escena, `src/decks/intro/useMeetupAmbient.ts`. Así las expresiones,
la ola de atención y el parpadeo de los logos comparten reloj y pausa.
`ambientTimeline.ts` combina las expresiones originales con miradas hacia el
centro; los gestos individuales son ocasionales y están desfasados. El
controlador comparte las mismas reglas de escenario activo, pestaña visible y
movimiento reducido. Las caras en reposo no se reproyectan ni reescriben.

## Verificación de la extracción

Se compararon directamente los paths resultantes del círculo, el cuadrado y el
triángulo con `shape.ts` y `skins.ts` del proyecto original: son idénticos. La
proyección de ojos también coincide con `face.ts`. Se comprobaron 256
combinaciones de forma, expresión y seed para asegurar geometría finita y
determinista, incluyendo un seed inválido. Los módulos geométricos pasan
TypeScript en modo estricto.
