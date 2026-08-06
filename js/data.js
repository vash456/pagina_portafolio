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
    id: "7",
    "title": "Deepre",
    "tagline": "Mueve al personaje con precisión, recoge palabras que impulsan la esperanza y evita las que la debilitan.",
    "year": "2026",
    "status": "Prototipo",
    "language": "C#",
    "engine": "Unity",
    "tags": ["Arcade", "Casual", "2D", "GameJam"],
    "theme": "Juego de tipo arcade en 2D donde la experiencia gira en torno a la esperanza, representada por una barra que sube o baja según las palabras que el jugador interactúa.",
    "mechanics": "Movimiento del personaje mediante teclado o arrastre del mouse, generación continua de palabras positivas y negativas, sistema de barra de esperanza, colisiones con objetos del juego y flujo de menú con pausa, victoria, derrota y reinicio.",
    "challenge": "Desarrolle en Unity el control de movimiento del personaje con Input System permitiendo usar el teclado, el mouse o controles de gamepad. Implemente la logica de spawn de prefabs y el movimiento de las palabras que aparecen en pantalla, ademas de la logica para aparezcan distintas palabras. Desarrolle el sistema de colisiones para distinguir de las palabras buenas y malas, ademas de los efectos sonoros y visuales al colisionar. Colabore en los ajustes de la interfaz de usuario y la integración de los elementos en el escenario, así como funcionalidades para el funcionamiento del juego en general.",
    cover: "assets/img/projects/deepre_1.jpg",
    screenshots: [
      "assets/img/projects/deepre_1.jpg",
      "assets/img/projects/deepre_2.jpg",
      "assets/img/projects/deepre_3.jpg",
    ],
    links: {
      play: "https://daniel-b-m.itch.io/deepre",
      repo: "https://github.com/MonJrz/Deepre",
      devlog: "",
    },
  },
  {
    id: "6",
    title: "Oil Be Back",
    tagline: "¡Deslízate a toda velocidad, esquiva el aceite y mantén el agua limpia!",
    year: "2026",
    status: "Prototipo",
    language: "C#",
    engine: "Unity",
    tags: ["Arcade", "Casual", "Runner 3D", "GameJam"],
    theme:
      "Aventura veraniega con estética de parque acuático en 3D, donde una simpática gota de agua debe deslizarse por un tobogán gigante esquivando la contaminación de charcos de aceite.",
    mechanics:
      "Movimiento tridimensional en el tobogán utilizando las teclas WASD, recolección de patitos de hule flotantes para acumular puntos, evasión de obstáculos de aceite y sistema de flujo de juego con pantallas de Game Over y reinicio.",
    challenge:
      "Primer juego desarrollado para una Game Jam, donde trabaje en equipo con otros desarrolladores. Modele el coleccionable de flotador con forma de pato y el tobogan como escenario, con sus respectivas texturas y box colliders, ademas de realizar la programcion para dar el efecto de movimiento infinito. Colabore en el movimiento del personaje y la integracion de los elementos en escenario, asi como funcionalidades para el funcionamiento del juego en general.",
    cover: "assets/img/projects/oilbeback_1.png",
    screenshots: [
      "assets/img/projects/oilbeback_1.png",
      "assets/img/projects/oilbeback_2.png",
      "assets/img/projects/oilbeback_3.png",
    ],
    links: {
      play: "https://krostgames.itch.io/oil-be-back",
      repo: "https://github.com/Krost22/Oil-Be-Back-Game",
      devlog: "",
    },
  },
  {
    id: "5",
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
  {
    id: "4",
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
    title: "Astro Bank Backend",
    tagline: "Backend para banca digital con cuentas, transferencias y reglas de negocio.",
    year: "2026",
    status: "Prototipo",
    language: "Java",
    engine: "MySQL + JDBC",
    tags: ["Backend", "clean Architecture/Hexagonal", "Singleton", "Repository", "Puertos y Adaptadores"],
    category: "Backend",
    theme:
      "Plataforma de banca digital académica diseñada para gestionar cuentas, movimientos y transferencias de forma segura y escalable.",
    mechanics:
      "Proyecto backend de una plataforma bancaria desarrollado aplicando Arquitectura Limpia (Clean Architecture/Hexagonal) para garantizar una solución desacoplada, mantenible y escalable.",
    challenge:
      "Diseñé la arquitectura separando las capas de Dominio, Casos de Uso, Persistencia y Presentación siguiendo el patrón Ports & Adapters. Implementé funcionalidades como autenticación de clientes, gestión de cuentas bancarias, transferencias, consignaciones, retiros y consulta de movimientos. Desarrollé la capa de persistencia utilizando MySQL, JDBC, los patrones Repository y Data Mapper, aplicando inversión de dependencias para desacoplar la lógica de negocio del acceso a datos. Apliqué principios de Programación Orientada a Objetos y buenas prácticas de arquitectura para facilitar la mantenibilidad y evolución del sistema.",
    cover: "assets/img/projects/astrobank_backend_1.png",
    screenshots: [
      "assets/img/projects/astrobank_backend_1.png",
      "assets/img/projects/astrobank_backend_2.png",
      "assets/img/projects/astrobank_backend_3.png",
    ],
    links: {
      play: "",
      repo: "https://github.com/vash456/AstroBank_backend",
      devlog: "",
    },
  },

  {
    id: "1",
    title: "Facturación Digital API",
    tagline: "Backend REST para gestión de facturación, clientes y planes con autenticación JWT.",
    year: "2026",
    status: "Desarrollo",
    language: "Python",
    engine: "FastAPI + SQLModel + SQLite",
    tags: ["Backend",
      "REST API",
      "JWT Authentication",
      "SQLModel/ORM",
      "Dependency Injection",
      "OAuth2",
      "Role-Based Access Control"],
    category: "Backend",
    theme:
      "Plataforma de facturación digital académica diseñada para gestionar clientes, facturas, transacciones y planes de forma segura y escalable.",
    mechanics:
      "Proyecto backend de una API REST desarrollado con FastAPI aplicando principios de arquitectura limpia, inyección de dependencias y separación de responsabilidades para garantizar una solución desacoplada, mantenible y escalable.",
    challenge:
      "Diseñé una API REST robusta separando las capas de Rutas (routers), Esquemas (schemas), Modelos (models) y Lógica de Negocio (core) siguiendo el patrón de inyección de dependencias. Implementé funcionalidades como autenticación de usuarios con JWT, gestión de clientes con validación de emails únicos, administración de facturas, transacciones, planes y consulta de movimientos. Desarrollé la capa de persistencia utilizando SQLModel como ORM con SQLite, aplicando el patrón Repository implícito a través de las funciones de consulta en SQLModel. Implementé OAuth2 con PasswordBearer para proteger endpoints sensibles, control de acceso basado en roles (RBAC) con decoradores custom, validación de datos con Pydantic, y manejo centralizado de errores HTTP. Apliqué principios SOLID, validaciones de negocio en cascada, hashing seguro de contraseñas con bcrypt, y buenas prácticas RESTful para facilitar la mantenibilidad y evolución del sistema.",
    cover: "assets/img/projects/proyecto_fastapi_1.png",
    screenshots: [
      "assets/img/projects/proyecto_fastapi_1.png",
      "assets/img/projects/proyecto_fastapi_2.png",
    ],
    links: {
      play: "",
      repo: "https://github.com/vash456/proyecto_fastapi",
      devlog: "",
    },
  },

];