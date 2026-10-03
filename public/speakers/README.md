# Retratos de ponentes

Se copiaron los activos existentes del proyecto local `bloub` sin regenerarlos,
retocarlos ni cambiar sus píxeles. El encuadre se resuelve con CSS en las slides
de presentación de Engineering y GTM.

| Archivo | Origen en `bloub` | Uso |
| --- | --- | --- |
| `walter-morales.png` | `public/speakers/walter-morales.png` | Walter Morales, Engineering |
| `daniela-huezo.png` | `public/speakers/speaker-2.png` | Daniela Huezo, GTM |

El registro `src/ui/speakerLibrary.ts` de `bloub` identifica esos activos como
Walter Morales y Daniela, respectivamente. Para el nombre visible de Daniela se
conserva el del deck aprobado (Daniela Huezo); el registro de origen usa Daniela
López. `bloub/docs/interface.md` documenta el PNG de Daniela como un recorte
transparente editado con IA y previamente aprobado. Aquí se reutiliza ese archivo
tal cual, sin una nueva edición. La fotografía de origen permanece en
`bloub/output/portrait-review/daniela-original.jpeg`.
