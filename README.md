# English, please

Material interactivo de inglés para grado 8.º (grupos 8-1 y 8-2) de la I.E. Liceo Guillermo Valencia.
Autor: **Juan Pablo Herazo Sibaja**, Licenciatura en Lenguas Extranjeras con énfasis en Inglés, Universidad de Córdoba. Práctica docente 2026-2.

- Sitio: `https://jherazolol15.github.io/english-please/`
- Modo docente (tema claro + enlace a la hoja de resultados): agrega `?docente=profe-juan` a la dirección.

## Estructura

```
index.html                     Portada: título, datos del autor y menú de unidades
assets/style.css               Diseño compartido
assets/core.js                 Audio, nota 0-5, envío al docente, PDF, modo docente y motor del examen
assets/unit.js                 Arma una página de unidad a partir de su data.js
assets/units.js                Catálogo de unidades que muestra la portada
units/present-perfect/         Unidad 3 · Present Perfect
  index.html                   Página de la unidad (no hace falta editarla)
  data.js                      TODO el contenido: gramática, verbos, práctica y banco del examen
apps-script/Codigo.gs          Código de la hoja de Google Sheets que recibe los resultados
```

## Cómo agregar una unidad

1. Copia la carpeta `units/present-perfect/` con el nombre del tema (por ejemplo `units/quantifiers/`).
2. Edita su `data.js`: textos, ejemplos, verbos, actividades y banco de preguntas (`t`, `q`, `o`, `a`, `why`).
3. En el `index.html` de la carpeta cambia el texto pequeño del encabezado (UNIDAD · TEMA) y el pie de página.
4. Agrega la unidad al catálogo en `assets/units.js`.

## Examen y resultados

- Banco de 50 preguntas (24 completar, 13 elegir la mejor opción, 13 oración correcta). Cada estudiante recibe 15 al azar (7/4/4), en orden distinto y con opciones mezcladas.
- Nota: aciertos ÷ 15 × 5, con un decimal. Desempeño: Bajo 0.0-2.9 · Básico 3.0-3.9 · Alto 4.0-4.5 · Superior 4.6-5.0 (se cambia en `assets/core.js`).
- Los resultados llegan a la misma hoja de Modal Road, con una columna nueva **Unidad**. Para activarla, reemplaza el código de Apps Script por `apps-script/Codigo.gs` y publícalo como **nueva versión** de la misma implementación. Mientras no lo actualices, los resultados llegan igual, solo que sin la columna Unidad.
- Si el estudiante no tiene internet al terminar, el resultado queda en cola y se reenvía al volver a abrir el sitio.

Licencia: uso educativo libre (CC BY-NC 4.0).
