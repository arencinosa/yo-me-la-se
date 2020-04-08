# Lista de pendientes/comentarios/...


---
## BUGS
* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/1)] Si se le hace `click` a un botón en medio de un `fade` se cae en una especie de ciclo infinito de opacidad.~~

* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/2)] No se actualiza el nombre del jugador si se cambia durante el juego (al menos, al jugador actual)~~

* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/25)] Eliminar las categorías que no contienen preguntas~~

  ~~Se está dando la opción de agregar jugadores en categorías cuya colección de preguntas está vacía.~~

---
## Por hacer
* ~~Usar las preguntas de la categoría `*` (random >= 0.7?)~~

  ~~La idea es usarlas como comodín, para cualquier categoría/nivel.~~

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/10)] Crear una base de datos (¿sqlite?) central

  Ahora mismo el juego se nutre de un JSON, que a su vez se puede generar a partir de un CSV, pero quizás una solución más "universal" podría ser utilizar diferentes bases de datos (digamos) por niveles, y dar la opción de cargar más de una a la vez.

  * Crear sqlite2json

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/11)] Dar soporte para varios idiomas

  Cada pregunta podría tener definido en qué idioma está (o "requiere"), y se puede dar la opción por jugador cuáles incluir en su set de preguntas.

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/3)] Personalizar tiempo límite

  Aquí, varios niveles:

  * ~~global (o sea, para todos por igual)~~
  * por nivel ("...los de preescolar, 15 segundos; los adultos, 7")
  * por jugador ("los novatos, 10 segundos; los más expertos, 3")

* Hostear el proyecto de forma pública

  Ahora mismo el repo está disponible, pero el juego como tal no está visible para los posibles usuarios. Intenté algo que vi que GitHub permitía pero solo sirve el `index.html` dentro de un `iframe`, y así no sé cómo hacerlo compatible con las rutas relativas que hay hasta ahora.

* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/12)] Permitir especificar cantidad de rondas~~

  ~~Ahora mismo es algo "cableado", cuando debería ser algo especificable a nivel de interfaz.~~
  
  * Llegar a un balance (fórmula?) entre cantidad de jugadores y rondas a jugar
  
    Quizás sería bueno para que el juego no se haga muy largo/tedioso.

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/13)] Multi-jugador

  Cada jugador puede "registrarse" en una partida, y todos los jugadores ven lo mismo, excepto que solo el jugador en turno puede responder.


---
## Por mejorar

* Hacer una clase "Jugador"

* Cambiar las llaves del JSON de entrada

  Eso de `p` y `o` no se explica mucho.

* ~~Dar la opción de aleatorizar o no el orden de los jugadores~~

  ~~Varios niveles aquí:~~

  * ~~Aleatorizar el orden de las categorías~~

  * ~~Aleatorizar el orden de los jugadores dentro de las categorías~~

  * ~~Permitir intercalar jugadores de diferentes categorías~~

* Utilizar los eventos del cronómetro en vez de usar `setTimeout` en  `games.js`

* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/4)] Que el resumen quepa en la pantalla~~

  ~~...sin necesidad de cambiar el nivel de zoom en el navegador.~~

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/5)] Cambiar el `alert` del final del juego por algo más _user-friendly_

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/14)] Que el tiempo que va quedando cambie de color

  Que vaya de verde a rojo, según se vaya agotando el tiempo

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/15)] Dar más estadísticas de tiempo

  Quizás mostrar el tiempo total, por ronda, por jugador, ...

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/16)] Mostrar estadísticas por jugador

  Correctas, tiempo, ..., no solo en su turno, sino en todo momento

* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/6)] Mostrar estadísticas en el resumen~~

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/17)] Dar la posibilidad de "corregir" el balance por jugador

  Quizás hubo un error en la base de datos, o quizás alguna respuesta desactualizada, o incluso alguien se desconectó durante el "countdown" y perdió la posibilidad de responder correctamente.

* Agregar más preguntas

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/18)] Crear "temporadas" por separado

  Mientras no haya un conjunto suficientemente grande de preguntas (stock), volver a jugar con el mismo juego de datos significaría repetir muchas preguntas ya vistas. Una posibilidad podría ser aislar/archivar las preguntas que ya salieron, e intentar no repetir.

  1. Reportar preguntas utilizadas

     Esto, en cualquier caso, es útil. Y no solo las preguntas, sino el estado final del juego (jugadores, puntajes, tiempos, ...)
  
  2. Asignarle a cada pregunta la última fecha en la que se utilizó

* ~~Crear un BTS para llevar mejor la administración de las tareas pendientes~~

  >...no recordaba la sección de _issues_ de GitHub :P

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/7)] Dar soporte para imágenes

   Quizás como parte del texto de la pregunta, quizás como parte de las opciones de respuesta.

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/8)] Dar soporte para sonidos

  * Agregar efectos sonoros
  * Sonidos como parte de las preguntas/respuestas

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/9)] Dar soporte para videos

   Quizás como parte del texto de la pregunta, quizás como parte de las opciones de respuesta.

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/19)] Hacer _tracking_ del desempeño del jugador

  Al menos, el orden de respuestas correctas e incorrectas

* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/20)] Hacer que los botones para avanzar estén siempre visibles~~

  ~~Por ejemplo, el de "Configurar" queda al final de la lista de _sliders_~~

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/21)] Agregar "explicaciones" a las respuestas

  A veces es válido hacer aclaraciones de por qué una respuesta y no otra. A veces es útil también ampliar un poquito para que aprendamos más

* [[link](https://github.com/arencinosa/yo-me-la-se/issues/22)] Agregar indicios a las preguntas

  ...ya sean a modo informativo o para ayudar a la resolución. Por ejemplo, dejar claro que la diferencia entre las opciones es solo una letra ("aráCnido" vs. "aráGnido"). Posibles ideas:

  * Aclaraciones

    Cosas que bien que podrían estar presentes en el propio cuerpo de la pregunta pero harían el texto muy largo, y que pueden resultar útiles como "fijarse bien en la ortografía".

  * Temática

    "Ciencias", "Historia", "Literatura", "Cultura general", ..., "Sombreros", "Pepito", ...

  * Nivel de dificultad

    Especificar cierto grado de dificultad ayudaría también a balancear un poco el set de preguntas por jugador

  * Traducciones

    Como alternativa al soporte de idiomas, podríamos ir incorporando ciertas traducciones que ayuden al entendimiento cuando mezclemos varios en el mismo contexto.

  * Autor/contribuidor

    ...para dar méritos a quien sugirió la pregunta (o para hacerlo responsable :P)

* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/23)] Dejar saber cuántas preguntas por categorías hay~~

* ~~[[link](https://github.com/arencinosa/yo-me-la-se/issues/24)] Cambiar los _sliders_ del "_setup_" por (digamos) _textareas_~~

  ~~En vez de poner límites (y para colmo, anónimos), se puede poner un área editable para poner los nombres (digamos) uno por línea~~

---
## Otras ideas

* Jugar por equipos

* Tiempo límite por jugador, en vez de (o además de) por pregunta

   Ahora mismo el juego limita el tiempo que uno tiene para responder una pregunta, pero podríamos agregar o cambiar esto por otra regla: como en ajedrez, un jugador tiene un tiempo límite a lo largo de todo el juego, mientras más se demore menos le queda para el resto de las preguntas.

* _Set_ de preguntas, en vez de preguntas aisladas

   Un jugador responde una sola pregunta en cada turno, pero... ¿por qué no hacer algo más a lo "Au suivant" y responder (digamos) 3 de 4?

* Seguir avanzando hasta equivocarse

   Sería hacer que el turno terminara sólo al equivocarnos.

* Responder todas las preguntas que se pueda en un tiempo límite

---
## Comentarios
* ...