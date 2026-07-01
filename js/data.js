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
    id: "nebula-drift",
    title: "Nébula Drift",
    tagline: "Arcade espacial con generación procedural de oleadas.",
    year: "2024",
    status: "Publicado",
    language: "C#",
    engine: "Unity",
    tags: ["Arcade", "Espacial", "Shoot 'em up"],
    theme:
      "Un piloto solitario cruza un campo de asteroides en descomposición dentro de una nebulosa moribunda, huyendo de un enjambre de drones que se vuelve más agresivo cuanto más tiempo sobrevive el jugador.",
    mechanics:
      "Movimiento inercial en 8 direcciones, sistema de sobrecalentamiento de armas en vez de munición, y un multiplicador de puntaje que crece mientras el jugador esquiva sin disparar. Los jefes finales de cada oleada heredan patrones de ataque de los enemigos destruidos previamente.",
    challenge:
      "El reto principal fue diseñar un generador de oleadas que ajustara la dificultad en tiempo real según el desempeño del jugador (framerate de aciertos, tiempo sin recibir daño) sin que se sintiera artificial. Resolví esto con un sistema de \"director de dificultad\" que pondera variables de juego cada 15 segundos y ajusta densidad y velocidad de spawns.",
    cover: "assets/img/projects/nebula-drift-cover.svg",
    screenshots: [
      "assets/img/projects/nebula-drift-shot1.svg",
      "assets/img/projects/nebula-drift-shot2.svg",
      "assets/img/projects/nebula-drift-shot3.svg",
    ],
    links: {
      play: "https://tu-usuario.itch.io/nebula-drift",
      repo: "https://github.com/tu-usuario/nebula-drift",
      devlog: "",
    },
  },
  {
    id: "cripta-eco",
    title: "Cripta del Eco",
    tagline: "Puzzle-plataformas donde el sonido revela el camino.",
    year: "2023",
    status: "Publicado",
    language: "GDScript",
    engine: "Godot",
    tags: ["Puzzle", "Plataformas", "Accesibilidad"],
    theme:
      "En una cripta sumida en oscuridad total, la única forma de \"ver\" el entorno es emitiendo pulsos de eco que revelan brevemente plataformas, trampas y enemigos, obligando al jugador a memorizar y planear sus movimientos.",
    mechanics:
      "El jugador emite un pulso de eco con recarga limitada que ilumina el nivel por un instante; las plataformas se desvanecen de nuevo tras unos segundos. Existen variantes de eco (largo alcance, silencioso, direccional) que se desbloquean como power-ups y cambian cómo se resuelven los puzzles.",
    challenge:
      "El mayor reto fue diseñar la mecánica pensando en accesibilidad desde el inicio: el juego debía ser jugable tanto por personas con baja visión (apoyándose en el audio) como por personas sordas (con retroalimentación visual clara). Implementé un sistema dual de señales audiovisuales sincronizadas y un modo de alto contraste, resolviendo además el problema técnico de renderizar \"visibilidad temporal\" de tiles sin afectar el rendimiento en niveles grandes.",
    cover: "assets/img/projects/cripta-eco-cover.svg",
    screenshots: [
      "assets/img/projects/cripta-eco-shot1.svg",
      "assets/img/projects/cripta-eco-shot2.svg",
      "assets/img/projects/cripta-eco-shot3.svg",
    ],
    links: {
      play: "https://tu-usuario.itch.io/cripta-del-eco",
      repo: "https://github.com/tu-usuario/cripta-del-eco",
      devlog: "https://tu-usuario.itch.io/cripta-del-eco/devlog",
    },
  },
  {
    id: "reino-hojas",
    title: "Reino de Hojas",
    tagline: "RPG táctico por turnos sobre una cuadrícula hexagonal.",
    year: "2023",
    status: "Prototipo",
    language: "C++",
    engine: "SFML",
    tags: ["Estrategia", "RPG táctico", "Fantasía"],
    theme:
      "Dos facciones de un reino boscoso, los Custodios y los Marchitos, luchan por el control de un bosque sagrado que decide qué facción sobrevivirá al invierno. Cada bando tiene unidades y habilidades ligadas a las estaciones.",
    mechanics:
      "Combate táctico por turnos en cuadrícula hexagonal con línea de visión real (no simulada), sistema de \"terreno vivo\" donde el pasto crece o se marchita según las acciones de las unidades, y una IA enemiga que planea en dos turnos de anticipación en lugar de reaccionar turno a turno.",
    challenge:
      "El reto central fue programar desde cero un sistema de pathfinding y línea de visión eficiente sobre una cuadrícula hexagonal (A* adaptado a coordenadas axiales) y una IA que evaluara múltiples unidades de forma conjunta sin bloquear el hilo principal. Lo resolví con un A* hexagonal optimizado con caché de costos de terreno y una IA basada en un árbol de decisiones ponderado que se ejecuta de forma asíncrona mientras se muestra la animación del turno anterior.",
    cover: "assets/img/projects/reino-hojas-cover.svg",
    screenshots: [
      "assets/img/projects/reino-hojas-shot1.svg",
      "assets/img/projects/reino-hojas-shot2.svg",
      "assets/img/projects/reino-hojas-shot3.svg",
    ],
    links: {
      play: "",
      repo: "https://github.com/tu-usuario/reino-de-hojas",
      devlog: "https://tu-usuario.itch.io/reino-de-hojas/devlog",
    },
  },
  {
    id: "pixel-market",
    title: "Pixel Market",
    tagline: "Simulador económico de un mercado callejero pixel-art.",
    year: "2022",
    status: "Publicado",
    language: "JavaScript",
    engine: "Phaser",
    tags: ["Simulación", "Tycoon", "Web"],
    theme:
      "El jugador administra un puesto en un mercado callejero pixel-art que crece con el tiempo, compitiendo con otros vendedores simulados por clientes, insumos y espacio, mientras responde a eventos aleatorios como escasez o sobreproducción.",
    mechanics:
      "Sistema de oferta y demanda simulado entre múltiples puestos con precios que fluctúan según las decisiones del jugador y de los vendedores rivales (controlados por IA simple), gestión de inventario en tiempo real, y eventos dinámicos que alteran la economía del mercado cada cierto número de días.",
    challenge:
      "El principal desafío fue balancear una economía simulada para que se sintiera viva y reactiva sin volverse impredecible ni frustrante para el jugador. Diseñé un modelo de precios con límites suaves (soft caps) y retroalimentación negativa que evita espirales de inflación o colapso, además de optimizar la simulación de decenas de vendedores IA para que corriera fluidamente en el navegador sin bloquear el hilo de renderizado.",
    cover: "assets/img/projects/pixel-market-cover.svg",
    screenshots: [
      "assets/img/projects/pixel-market-shot1.svg",
      "assets/img/projects/pixel-market-shot2.svg",
      "assets/img/projects/pixel-market-shot3.svg",
    ],
    links: {
      play: "https://tu-usuario.itch.io/pixel-market",
      repo: "https://github.com/tu-usuario/pixel-market",
      devlog: "",
    },
  },

  // 👉 Agrega tus próximos proyectos aquí, siguiendo el mismo formato.
];
