# Lista de pendientes/comentarios/...


---
## Por hacer
* ~~Usar las preguntas de la categoría `*` (random >= 0.7?)~~

   La idea es usarlas como comodín, para cualquier categoría/nivel.

* Crear una base de datos (sqlite?) central

   Ahora mismo el juego se nutre de un JSON, que a su vez se puede generar a partir de un CSV, pero quizás una solución más "universal" podría ser utilizar diferentes bases de datos (digamos) por niveles, y dar la opción de cargar más de una a la vez.

  * Crear sqlite2json

* Dar soporte para varios idiomas

   Cada pregunta podría tener definido en qué idioma está (o "requiere"), y se puede dar la opción por jugador cuáles incluir en su set de preguntas.

* Personalizar tiempo límite

   Aquí, varios niveles:

  * global (o sea, para todos por igual)
  * por nivel ("...los de preescolar, 15 segundos; los adultos, 7")
  * por jugador ("los novatos, 10 segundos; los más expertos, 3")

* _Publicar en GitHub_

   Bueno, ahora mismo el repo como tal está disponible, pero pensé en algo más a lo "hosting". Intenté algo que vi que permitían pero solo sirven el index.html dentro de un `iframe`, y así no sé cómo hacerlo compatible con lo que hay hasta ahora.

* Permitir especificar cantidad de rondas

  * Llegar a un balance (fórmula?) entre cantidad de jugadores y rondas a jugar

* Multi-jugador

   Cada jugador puede "registrarse" en una partida, y todos los jugadores ven lo mismo, excepto que solo el jugador en turno puede responder.


---
## Por mejorar

* Dar más estadísticas de tiempo

   Quizás mostrar el tiempo total, por ronda, por jugador, ...

* Mostrar estadísticas por jugador

   Correctas, tiempo, ..., no solo en su turno, sino en todo momento

* Mostrar estadísticas en el resumen

* Dar la posibilidad de "corregir" el balance por jugador

   Quizás hubo un error en la base de datos, o quizás alguna respuesta desactualizada, o incluso alguien se desconectó durante el "countdown" y perdió la posibilidad de responder correctamente.

* Agregar más preguntas

* Crear "temporadas" por separado

   Mientras no haya un conjunto suficientemente grande de preguntas (stock), volver a jugar con el mismo juego de datos significaría repetir muchas preguntas ya vistas. Una posibilidad podría ser aislar/archivar las preguntas que ya salieron, e intentar no repetir.

* Crear un BTS para llevar mejor la administración de las tareas pendientes

* Dar soporte para imágenes

   Quizás como parte del texto de la pregunta, quizás como parte de las opciones de respuesta.

* Dar soporte para sonidos

  * Agregar efectos sonoros
  * Sonidos como parte de las preguntas/respuestas

* Dar soporte para videos

   Quizás como parte del texto de la pregunta, quizás como parte de las opciones de respuesta.


---
## Otras ideas

* Tiempo límite por jugador, en vez de (o además de) por pregunta

   Ahora mismo el juego limita el tiempo que uno tiene para responder una pregunta, pero podríamos agregar o cambiar esto por otra regla: como en ajedrez, un jugador tiene un tiempo límite a lo largo de todo el juego, mientras más se demore menos le queda para el resto de las preguntas.

* _Set_ de preguntas, en vez de preguntas aisladas

   Un jugador responde una sola pregunta en cada turno, pero... ¿por qué no hacer algo más a lo "Au suivant" y responder (digamos) 3 de 4?

* Seguir avanzando hasta equivocarse

   Sería hacer que el turno terminara solo al equivocarnos.

---
## Comentarios
* ...