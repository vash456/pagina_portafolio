/**
 * DATOS DE PROYECTOS
 * ===================
 * Para agregar un nuevo juego, copia uno de los objetos de abajo,
 * pégalo dentro del array PROJECTS y edita sus valores.
 * No necesitas tocar el HTML ni el CSS: las tarjetas y el modal
 * se generan automáticamente a partir de esta lista.
 *
 * Campos:
 * - id: identificador único, sin espacios (ej: "mi-juego")
 * - title: nombre del juego
 * - tagline: frase corta de una línea para la tarjeta
 * - year: año de desarrollo/lanzamiento
 * - status: "Publicado" | "Prototipo" | "En desarrollo"
 * - language: lenguaje principal de programación
 * - engine: motor o framework usado
 * - tags: lista corta de etiquetas (género, plataforma, etc.)
 * - theme: descripción del tema/ambientación del juego
 * - mechanics: mecánicas principales de juego
 * - challenge: el problema o reto técnico/de diseño que resolviste
 * - cover: ruta a la imagen de portada
 * - screenshots: array de rutas a capturas de pantalla
 * - links: { play, repo, devlog } — deja "" en los que no apliquen
 */

const PROJECTS = [
  {
    id: "1",
    title: "RunWorker",
    tagline: "Juego arcade saltando obstáculos.",
    year: "2026",
    status: "Prototipo",
    language: "C#",
    engine: "Unity",
    tags: ["Arcade"],
    theme:
      "Un personaje que debe atravesar una ciudad, esquivando obstáculos.",
    mechanics:
      "Movimiento horizontal continuo y salto simple.",
    challenge:
      "La sincronización de físicas y detección de colisiones para lograr que la detección de los obstáculos (BoxCollider) sea precisa al saltar, evitando que el personaje atraviese los objetos o se atasque.",
    cover: "assets/img/projects/proto3_2.png",
    screenshots: [
      "assets/img/projects/proto3_2.png",
      "assets/img/projects/proto3_1.png",
      "assets/img/projects/proto3_3.png",
    ],
    links: {
      play: "https://vashgames.itch.io/runworker",
      repo: "",
      devlog: "",
    },
  },
  {
    id: "2",
    title: "SoccerChallenge",
    tagline: "Defiende tu portería en un caótico juego de colisiones por oleadas basado en físicas.",
    year: "2026",
    status: "Prototipo",
    language: "C#",
    engine: "Unity",
    tags: ["Acción", "Arcade", "Físicas"],
    theme:
      "Simulación deportiva arcade en un entorno tridimensional simplificado, donde un balón principal debe defender su portería impidiendo el paso de balones enemigos.",
    mechanics:
      "Movimiento omnidireccional basado en físicas (WASD), sistema de impulso instantáneo o dash (Espacio), generación de enemigos por oleadas con dificultad progresiva (velocidad y cantidad) y recolección de multiplicadores de fuerza (power-ups).",
    challenge:
      "La implementación de un sistema dinámico de spawning por oleadas y la correcta aplicación de fuerzas físicas (AddForce) en las colisiones entre Rigidbodies para lograr un movimiento fluido y colisiones precisas.",
    cover: "assets/img/projects/challenge4_1.png",
    screenshots: [
      "assets/img/projects/challenge4_1.png",
      "assets/img/projects/challenge4_2.png",
    ],
    links: {
      play: "https://vashgames.itch.io/challenge4",
      repo: "",
      devlog: "",
    },
  },
  {
    id: "3",
    title: "ClickBox",
    tagline: "Un desafío árcade de reflejos rápidos y precisión con el ratón.",
    year: "2026",
    status: "Prototipo",
    language: "C#",
    engine: "Unity",
    tags: ["Arcade", "Casual", "Clicker"],
    theme:
      "Juego 3D de clicker de eliminación de objetos.",
    mechanics:
      "Selección de dificultad en menú inicial (Easy, Medium, Hard), destrucción de objetos flotantes mediante clics, sistema de puntuación acumulativa y condición de derrota (Game Over) si los cráneos caen al suelo.",
    challenge:
      "La implementación de eventos de clicker y gestión de estados globales del juego (Game Manager) para controlar la dificultad, la interfaz de usuario y el reinicio de la escena. Ademas del uso de Canvas y TextMeshPro para crear una interfaz de usuario interactiva.",
    cover: "assets/img/projects/proto5_1.png",
    screenshots: [
      "assets/img/projects/proto5_1.png",
      "assets/img/projects/proto5_2.png",
      "assets/img/projects/proto5_3.png",
    ],
    links: {
      play: "https://vashgames.itch.io/clickbox",
      repo: "https://github.com/vash456/mision5_unity",
      devlog: "",
    },
  },
  
];