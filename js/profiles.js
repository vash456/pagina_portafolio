/**
 * PROFILE CONFIGURATIONS
 * ======================
 * Defines content and settings for each profile (Software / Game Dev).
 * Used by script.js to customize the entire portfolio experience.
 *
 * To edit profile-specific content, modify the values below.
 * Shared content (name, contact info) is in script.js PROFILE object.
 */

const PROFILES = {

  /* ── SOFTWARE DEVELOPER ─────────────────────────────── */
  software: {
    id: "software",
    label: "Desarrollador de Software",
    pageTitle: "Darlin Estrada Patiño — Desarrollador de Software",
    metaDescription:
      "Portafolio de desarrollo de software: backend, APIs REST, arquitectura limpia y desarrollo web Full-Stack.",

    /* Hero */
    eyebrow: "// Desarrollo de software · Backend · Full-Stack",
    heroTitle: "Construyo sistemas confiables donde el rendimiento<br>y la arquitectura importan.",
    heroSub:
      "Desarrollador de software con experiencia en backend, APIs REST, arquitectura limpia y plataformas e-commerce. Aquí reúno los proyectos donde diseño sistemas escalables y resuelvo problemas de negocio.",

    /* CV */
    cvFile: "assets/cv/CV-Darlin-Software.pdf",

    /* Stats */
    stats: {
      projects:   { value: "02", label: "proyectos publicados" },
      stacks:     { value: "04", label: "frameworks / stacks" },
      experience: { value: "+4", label: "años programando" },
    },

    /* Portfolio section */
    portfolioHeading: "Portafolio",
    portfolioDescription:
      "Cada proyecto incluye stack técnico, arquitectura, patrones de diseño y el problema de negocio o técnico que buscaba resolver.",

    /* About section */
    aboutEyebrow: "// apasionado por la tecnología desde siempre",
    aboutParagraph2:
      "Desarrollador de software con más de 4 años de experiencia construyendo soluciones web, backend y plataformas e-commerce. Con bases sólidas en programación orientada a objetos, arquitectura limpia y buenas prácticas de desarrollo. Mi enfoque combina el pensamiento analítico y la rigurosidad técnica para diseñar soluciones escalables, mantenibles y orientadas a resolver problemas reales de negocio. Me destaco por mi capacidad de adaptación tecnológica, comunicación efectiva y un fuerte espíritu de trabajo colaborativo.",

    /* CV sidebar — Languages */
    languages: [
      { name: "Java",       cssClass: "java" },
      { name: "Python",     cssClass: "python" },
      { name: "JavaScript", cssClass: "javascript" },
      { name: "C#",         cssClass: "csharp" },
      { name: "HTML",       cssClass: "html" },
      { name: "CSS",        cssClass: "css" },
      { name: "SQL",        cssClass: "sql" },
    ],

    /* CV sidebar — Skills / Tools */
    skills: [
      { name: "POO",                      cssClass: "coding" },
      { name: "Git/GitHub",               cssClass: "git" },
      { name: "SpringBoot",               cssClass: "springboot" },
      { name: "FastAPI",                   cssClass: "fastapi" },
      { name: "Docker",                    cssClass: "docker" },
      { name: "APIs REST",                cssClass: "apis-rest" },
      { name: "Debugging",                cssClass: "debugging" },
      { name: "Angular",                  cssClass: "angular" },
      { name: "React",                    cssClass: "react" },
      { name: "Node.js",                  cssClass: "nodejs" },
      { name: "Arquitectura de software", cssClass: "architecture" },
      { name: "Lógica de programación",   cssClass: "logica" },
      { name: "Metodologías ágiles",      cssClass: "agil" },
    ],

    /* CV sidebar — Interests */
    interests: [
      { name: "Desarrollo de software", cssClass: "software-dev" },
      { name: "Backend",                cssClass: "backend" },
      { name: "Desarrollo web",         cssClass: "web-dev" },
      { name: "Inteligencia Artificial", cssClass: "ai" },
      { name: "Diseño de sistemas",     cssClass: "systems-design" },
    ],

    /* Social visibility */
    showItch: false,
  },

  /* ── GAME DEVELOPER (UNITY) ─────────────────────────── */
  gamedev: {
    id: "gamedev",
    label: "Desarrollador de Videojuegos Unity",
    pageTitle: "Darlin Estrada Patiño — Desarrollador de Videojuegos Unity",
    metaDescription:
      "Portafolio de desarrollo de videojuegos: mecánicas de juego, Unity, C# y experiencias interactivas.",

    /* Hero */
    eyebrow: "// Desarrollo de videojuegos · Unity · C#",
    heroTitle: "Mecánicas fluidas, físicas precisas<br>y experiencias de juego memorables.",
    heroSub:
      "Programador y desarrollador de videojuegos con Unity y C#. Aquí reúno los proyectos donde creo mecánicas de juego, resuelvo problemas de jugabilidad y experiencia de jugador.",

    /* CV */
    cvFile: "assets/cv/CV-Darlin-GameDev.pdf",

    /* Stats */
    stats: {
      projects:   { value: "06", label: "proyectos publicados" },
      stacks:     { value: "03", label: "motores / stacks" },
      experience: { value: "+4", label: "años programando" },
    },

    /* Portfolio section */
    portfolioHeading: "Portafolio",
    portfolioDescription:
      "Cada proyecto incluye tema, mecánicas, stack técnico y el problema de diseño o programación que buscaba resolver.",

    /* About section */
    aboutEyebrow: "// jugador desde antes de saber leer",
    aboutParagraph2:
      "Desarrollador de software con bases sólidas y expandiendo mi perfil hacia el desarrollo de videojuegos con Unity y C#, aporto una base sólida en programación orientada a objetos, arquitectura limpia y buenas prácticas de desarrollo. Mi enfoque combina el pensamiento analítico y la rigurosidad técnica con la creatividad necesaria para diseñar mecánicas de juego inmersivas, fluidas y desafiantes. Me destaco por mi capacidad de adaptación tecnológica, comunicación efectiva y un fuerte espíritu de trabajo colaborativo.",

    /* CV sidebar — Languages */
    languages: [
      { name: "C#",         cssClass: "csharp" },
      { name: "Java",       cssClass: "java" },
      { name: "Python",     cssClass: "python" },
      { name: "JavaScript", cssClass: "javascript" },
    ],

    /* CV sidebar — Skills / Tools */
    skills: [
      { name: "Unity",                  cssClass: "unity" },
      { name: "POO",                    cssClass: "coding" },
      { name: "Git/GitHub",             cssClass: "git" },
      { name: "Debugging",              cssClass: "debugging" },
      { name: "APIs REST",              cssClass: "apis-rest" },
      { name: "Lógica de programación", cssClass: "logica" },
      { name: "Metodologías ágiles",    cssClass: "agil" },
    ],

    /* CV sidebar — Interests */
    interests: [
      { name: "Desarrollo de juegos",   cssClass: "game-dev" },
      { name: "Mecánicas de juego",     cssClass: "mechanics" },
      { name: "IA de juego",            cssClass: "ai-game" },
      { name: "Diseño de sistemas",     cssClass: "systems-design" },
      { name: "Desarrollo de software", cssClass: "software-dev" },
    ],

    /* Social visibility */
    showItch: true,
  },
};
