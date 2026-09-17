/* =========================================================
   PROFILE STATE & CONFIG
   ========================================================= */
let currentProfileKey = null;

const PROFILE = {
  fullName: "Darlin Estrada Patiño",
  contactName: "Darlin Estrada Patiño",
  githubUser: "vash456",
  githubUrl: "https://github.com/vash456",
  linkedinUrl: "https://linkedin.com/in/darlin-estrada",
  itchUrl: "https://vashgames.itch.io/",
  email: "darlin.estrada456@gmail.com",
  footerEmail: "darlin.estrada456@gmail.com",
};

/* =========================================================
   DOM REFERENCES
   ========================================================= */
const menuItems     = document.querySelectorAll("[data-view]");
const views         = document.querySelectorAll(".view");
const menu          = document.querySelector(".menu");
const menuToggle    = document.getElementById("menuToggle");
const menuIndicator = document.getElementById("menuIndicator");

/* =========================================================
   APPLY SHARED PROFILE CONTENT (contact info, etc.)
   ========================================================= */
function applyProfileContent() {
  const el = (id) => document.getElementById(id);

  const brandNameText = el("brandNameText");
  if (brandNameText) brandNameText.textContent = PROFILE.fullName;

  const contactEmailBtn = el("contactEmailBtn");
  if (contactEmailBtn) {
    contactEmailBtn.textContent = PROFILE.email;
    contactEmailBtn.title = "Haz clic para copiar " + PROFILE.email;
  }

  const heroEmailBtn = el("heroEmailBtn");
  if (heroEmailBtn) heroEmailBtn.title = "Haz clic para copiar " + PROFILE.email;

  const cvGithubLink = el("cvGithubLink");
  if (cvGithubLink) {
    cvGithubLink.href = PROFILE.githubUrl;
    cvGithubLink.textContent = PROFILE.githubUrl.replace("https://", "");
  }

  const linkedinLink = el("linkedinLink");
  if (linkedinLink) {
    linkedinLink.href = PROFILE.linkedinUrl;
    linkedinLink.textContent = PROFILE.linkedinUrl.replace("https://", "");
  }

  const footerGithubLink = el("footerGithubLink");
  if (footerGithubLink) {
    footerGithubLink.href = PROFILE.githubUrl;
    footerGithubLink.textContent = "GitHub";
  }

  const footerItchLink = el("footerItchLink");
  if (footerItchLink) footerItchLink.href = PROFILE.itchUrl;

  const itchLink = el("itchLink");
  if (itchLink) itchLink.href = PROFILE.itchUrl;

  const footerEmailBtn = el("footerEmailBtn");
  if (footerEmailBtn) footerEmailBtn.title = "Haz clic para copiar " + PROFILE.email;

  const footerOwnerName = el("footerOwnerName");
  if (footerOwnerName) footerOwnerName.textContent = PROFILE.fullName;
}

/* =========================================================
   NAVEGACIÓN ENTRE VISTAS
   ========================================================= */
function moveIndicator() {
  const active = document.querySelector(".menu-item.is-active");
  if (!active || !menuIndicator) return;
  menuIndicator.style.left  = active.offsetLeft + "px";
  menuIndicator.style.width = active.offsetWidth + "px";
}

function setView(name) {
  views.forEach(function (v) {
    v.classList.toggle("is-active", v.dataset.viewPanel === name);
  });
  document.querySelectorAll(".menu-item").forEach(function (btn) {
    btn.classList.toggle("is-active", btn.dataset.view === name);
  });
  if (menu) menu.classList.remove("is-open");
  if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  requestAnimationFrame(moveIndicator);
  requestAnimationFrame(revealObserveAll);
}

menuItems.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    setView(el.dataset.view);
  });
});

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
}

window.addEventListener("resize", moveIndicator);
window.addEventListener("load", moveIndicator);

/* =========================================================
   SWITCH PROFILE BUTTON (con limpieza de URL)
   ========================================================= */
var switchBtn = document.getElementById("switchProfile");
if (switchBtn) {
  switchBtn.addEventListener("click", function () {
    sessionStorage.removeItem("selectedProfile");
    try {
      history.replaceState(null, "", window.location.pathname);
    } catch (e) {}
    location.reload();
  });
}

/* =========================================================
   COPIAR CORREO AL PORTAPAPELES EN BOTONES DE CORREO
   ========================================================= */
function setupEmailCopyButton(buttonId, defaultText, copiedText) {
  var btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    var email = PROFILE.email;

    function setCopiedState() {
      btn.classList.add("is-copied");
      btn.textContent = copiedText || "¡Correo copiado!";

      setTimeout(function () {
        btn.classList.remove("is-copied");
        btn.textContent = typeof defaultText === "function" ? defaultText() : defaultText;
      }, 2200);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(setCopiedState).catch(function () {
        fallbackCopy(email, setCopiedState);
      });
    } else {
      fallbackCopy(email, setCopiedState);
    }
  });
}

function fallbackCopy(text, callback) {
  var ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    if (callback) callback();
  } catch (e) {}
  document.body.removeChild(ta);
}

// Configurar los 3 botones de correo para copiar y mostrar feedback
setupEmailCopyButton("heroEmailBtn", "Correo", "¡Correo copiado!");
setupEmailCopyButton("contactEmailBtn", function () { return PROFILE.email; }, "¡Correo copiado!");
setupEmailCopyButton("footerEmailBtn", "Correo", "¡Correo copiado!");

/* =========================================================
   ACCENT COLORS POR LENGUAJE
   ========================================================= */
const LANG_COLORS = {
  "C#":         "#FFB648",
  "GDScript":   "#5EEAD4",
  "C++":        "#F97066",
  "JavaScript": "#C084FC",
  "Python":     "#7DD3FC",
  "Lua":        "#93C5FD",
  "Java":       "#60A5FA",
  "TypeScript": "#38BDF8",
  "PHP":        "#F59E0B",
  "SQL":        "#34D399",
};
function colorFor(lang) { return LANG_COLORS[lang] || "#5EEAD4"; }

const STATUS_COLORS = {
  "Publicado":     "#5EEAD4",
  "En desarrollo": "#FFB648",
  "Prototipo":     "#C084FC",
  "Desarrollo":    "#FFB648",
};
function statusColor(status) { return STATUS_COLORS[status] || "#5EEAD4"; }

/* =========================================================
   GET FILTERED PROJECTS (by profile)
   ========================================================= */
function getProfileProjects() {
  if (!currentProfileKey) return PROJECTS;
  return PROJECTS.filter(function (p) {
    return p.profile === currentProfileKey || p.profile === "both";
  });
}

/* =========================================================
   RENDER: TARJETAS DE PORTAFOLIO
   ========================================================= */
const cardsGrid  = document.getElementById("cardsGrid");
const filterBar  = document.getElementById("filterBar");

let activeFilter = "Todos";

function renderFilters() {
  if (!filterBar) return;
  var projects = getProfileProjects();
  var langs = ["Todos"].concat(
    Array.from(new Set(projects.map(function (p) { return p.language; })))
  );
  filterBar.innerHTML = langs.map(function (l) {
    return '<button class="filter-chip ' + (l === activeFilter ? "is-active" : "") +
           '" data-lang="' + l + '" type="button">' + l + '</button>';
  }).join("");

  filterBar.querySelectorAll(".filter-chip").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeFilter = btn.dataset.lang;
      renderFilters();
      renderCards();
    });
  });
}

function renderCards() {
  if (!cardsGrid) return;
  var projects = getProfileProjects();
  var list = activeFilter === "Todos"
    ? projects
    : projects.filter(function (p) { return p.language === activeFilter; });

  if (list.length === 0) {
    cardsGrid.innerHTML = '<p style="color:var(--text-muted)">No hay proyectos con este filtro todavía.</p>';
    return;
  }

  cardsGrid.innerHTML = list.map(function (p) {
    var c  = colorFor(p.language);
    var sc = statusColor(p.status);
    var meta = p.tags.slice(0, 2).join(" / ").toUpperCase();
    var teamBadge = (p.teamSize && p.teamSize !== "Individual")
      ? '<span class="card-team-badge">' + p.teamSize + '</span>'
      : '';

    return '\n    <article class="card" style="--accent-card:' + c + '; --status-color:' + sc +
           '" tabindex="0" data-id="' + p.id + '" role="button" aria-label="Ver detalles de ' + p.title + '">' +
           '\n      <div class="card-cover">' +
           '\n        <img src="' + p.cover + '" alt="Portada de ' + p.title + '" loading="lazy">' +
           '\n        <span class="card-badge">' + p.status + '</span>' +
           teamBadge +
           '\n      </div>' +
           '\n      <div class="card-body">' +
           '\n        <p class="card-meta">' + meta + ' · ' + p.year + '</p>' +
           '\n        <h3>' + p.title + '</h3>' +
           '\n        <p class="card-tagline">' + p.tagline + '</p>' +
           '\n        <div class="card-tags">' +
           '\n          <span class="chip">' + p.language + '</span>' +
           '\n          <span class="chip">' + p.engine + '</span>' +
           '\n        </div>' +
           '\n        <span class="card-link">Ver proyecto <span class="chev" aria-hidden="true">›</span></span>' +
           '\n      </div>' +
           '\n    </article>';
  }).join("");

  cardsGrid.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", function () { openModal(card.dataset.id); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(card.dataset.id); }
    });
    attachTilt(card);
  });
  requestAnimationFrame(revealObserveAll);
}

/* =========================================================
   MODAL DE DETALLE DE PROYECTO
   ========================================================= */
const modalBackdrop = document.getElementById("modalBackdrop");
const modalContent  = document.getElementById("modalContent");
const modalClose    = document.getElementById("modalClose");
let lastFocused = null;

function linkRow(links, project) {
  var items = [];
  var playLabel = "▶ Jugar";
  var cat = (project.category || "").toLowerCase();
  if (cat.includes("backend") || cat.includes("software")) playLabel = "▶ Demo / Enlace";

  if (links.play) items.push('<a class="btn btn-primary" href="' + links.play + '" target="_blank" rel="noopener">' + playLabel + '</a>');
  if (links.repo) items.push('<a class="btn btn-ghost" href="' + links.repo + '" target="_blank" rel="noopener">Código fuente</a>');
  if (links.devlog) items.push('<a class="btn btn-ghost" href="' + links.devlog + '" target="_blank" rel="noopener">Devlog</a>');
  return items.length ? '<div class="modal-links">' + items.join("") + '</div>' : "";
}

function projectTypeLabel(project) {
  var category = (project.category || "").toLowerCase();
  if (category.includes("backend"))  return "Backend";
  if (category.includes("software")) return "Software";
  return "Videojuego";
}

function modalSectionLabels(project) {
  switch (projectTypeLabel(project)) {
    case "Backend":
      return { primary: "Funcionalidades principales", secondary: "Retos de arquitectura y desarrollo" };
    case "Software":
      return { primary: "Características principales", secondary: "Retos de desarrollo y solución" };
    default:
      return { primary: "Mecánicas principales", secondary: "Reto de diseño / programación" };
  }
}

function openModal(id) {
  var p = PROJECTS.find(function (x) { return x.id === id; });
  if (!p) return;
  var c = colorFor(p.language);
  var labels = modalSectionLabels(p);

  /* ── Build project info section (role, team, duration) ── */
  var projectInfoHTML = "";
  var infoItems = [];
  if (p.role)     infoItems.push('<div class="modal-info-item"><span class="modal-info-label">Mi rol</span><span class="modal-info-value">' + p.role + '</span></div>');
  if (p.teamSize) infoItems.push('<div class="modal-info-item"><span class="modal-info-label">Equipo</span><span class="modal-info-value">' + p.teamSize + '</span></div>');
  if (p.duration) infoItems.push('<div class="modal-info-item"><span class="modal-info-label">Duración</span><span class="modal-info-value">' + p.duration + '</span></div>');
  if (infoItems.length) {
    projectInfoHTML = '<div class="modal-info-grid">' + infoItems.join("") + '</div>';
  }

  modalContent.innerHTML =
    '<div class="modal-gallery" style="--accent-card:' + c + '">' +
      '<div class="modal-gallery-main">' +
        '<img id="modalMainImg" src="' + p.screenshots[0] + '" alt="Captura de ' + p.title + '">' +
      '</div>' +
    '</div>' +
    '<div class="modal-thumbs" id="modalThumbs">' +
      p.screenshots.map(function (s, i) {
        return '<button type="button" class="' + (i === 0 ? "is-active" : "") +
               '" data-src="' + s + '" aria-label="Captura ' + (i + 1) + '">' +
               '<img src="' + s + '" alt=""></button>';
      }).join("") +
    '</div>' +
    '<div class="modal-body">' +
      '<h2 id="modalTitle">' + p.title + '</h2>' +
      '<div class="modal-meta">' +
        '<span class="chip" style="border-color:' + c + ';color:' + c + '">' + p.language + '</span>' +
        '<span class="chip">' + p.engine + '</span>' +
        '<span class="chip">' + projectTypeLabel(p) + '</span>' +
        '<span class="chip">' + p.status + '</span>' +
        p.tags.map(function (t) { return '<span class="chip">' + t + '</span>'; }).join("") +
        '<span class="chip">' + p.year + '</span>' +
      '</div>' +
      '<p class="modal-tagline">' + p.tagline + '</p>' +
      projectInfoHTML +
      '<div class="modal-section">' +
        '<h4>Tema / Propósito</h4>' +
        '<p>' + p.theme + '</p>' +
      '</div>' +
      '<div class="modal-section">' +
        '<h4>' + labels.primary + '</h4>' +
        '<p>' + p.mechanics + '</p>' +
      '</div>' +
      '<div class="modal-section">' +
        '<h4>' + labels.secondary + '</h4>' +
        '<p>' + p.challenge + '</p>' +
      '</div>' +
      linkRow(p.links, p) +
    '</div>';

  var mainImg = document.getElementById("modalMainImg");
  document.querySelectorAll("#modalThumbs button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      mainImg.src = btn.dataset.src;
      document.querySelectorAll("#modalThumbs button").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
    });
  });

  lastFocused = document.activeElement;
  modalBackdrop.classList.add("is-open");
  document.body.style.overflow = "hidden";
  if (modalClose) modalClose.focus();
}

function closeModal() {
  modalBackdrop.classList.remove("is-open");
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modalBackdrop) {
  modalBackdrop.addEventListener("click", function (e) {
    if (e.target === modalBackdrop) closeModal();
  });
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) closeModal();
});

/* =========================================================
   REVEAL AL HACER SCROLL
   ========================================================= */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let revealObserver = null;
if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
}

function revealObserveAll() {
  document.querySelectorAll(".reveal:not(.is-visible), .card:not(.is-visible)").forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.94 && r.bottom > 0) {
      el.classList.add("is-visible");
    } else if (revealObserver) {
      revealObserver.observe(el);
    }
  });
}

/* =========================================================
   TILT + BRILLO INTERACTIVO EN TARJETAS
   ========================================================= */
function attachTilt(card) {
  if (prefersReducedMotion) return;

  card.addEventListener("mousemove", function (e) {
    var r  = card.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width;
    var py = (e.clientY - r.top) / r.height;
    var rotateY = (px - 0.5) * 10;
    var rotateX = (0.5 - py) * 8;
    card.style.transform = "perspective(900px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
    card.style.setProperty("--mx", (px * 100) + "%");
    card.style.setProperty("--my", (py * 100) + "%");
  });

  card.addEventListener("mouseleave", function () {
    card.style.transform = "";
  });
}

/* =========================================================
   FONDO VIVO INTERACTIVO: MOTOR DUAL (Software & Game Dev Arcade)
   ========================================================= */
const BackgroundEngine = (function () {
  var canvas = document.getElementById("bgCanvas");
  if (!canvas) return { setMode: function () {} };
  var ctx = canvas.getContext("2d");

  var currentMode = "software"; // "software" | "gamedev"
  var w = 0, h = 0, dpr = 1;
  var mouse = { x: -9999, y: -9999, vx: 0, vy: 0, active: false };

  // Datos para modo Software (Red de Nodos)
  var netParticles = [];
  var LINK_DIST = 140;
  var MOUSE_DIST = 170;

  // Datos para modo GameDev (Asteroides, Orbes, Balas, Chispas, Nave)
  var asteroids = [];
  var orbs = [];
  var bullets = [];
  var sparks = [];
  var ship = { x: 0, y: 0, angle: 0 };
  var score = 0;
  var orbsCount = 0;

  var scoreEl = document.getElementById("gameScore");
  var orbsEl = document.getElementById("gameOrbs");

  function colorRGB(hex, alpha) {
    var n = parseInt(hex.replace("#", ""), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  function updateHUD() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (orbsEl)  orbsEl.textContent  = String(orbsCount);
  }

  function resetGame() {
    score = 0;
    orbsCount = 0;
    updateHUD();
    spawnGameElements();
  }

  function createAsteroid(x, y, r) {
    r = r || (Math.random() * 24 + 16);
    var numPts = Math.floor(Math.random() * 3) + 5;
    var offsets = [];
    for (var i = 0; i < numPts; i++) {
      offsets.push(0.72 + Math.random() * 0.45);
    }
    return {
      x: x !== undefined ? x : Math.random() * w,
      y: y !== undefined ? y : Math.random() * h,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: r,
      angle: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.015,
      numPts: numPts,
      offsets: offsets,
      hue: Math.random() > 0.4 ? "#FFB648" : "#FF7844"
    };
  }

  function createOrb(x, y) {
    return {
      x: x !== undefined ? x : Math.random() * w,
      y: y !== undefined ? y : Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 4.5,
      hue: Math.random() > 0.5 ? "#5EEAD4" : "#FFD07A"
    };
  }

  function createSparks(x, y, color, count) {
    count = count || 10;
    for (var i = 0; i < count; i++) {
      var a = Math.random() * Math.PI * 2;
      var spd = Math.random() * 2.8 + 1.2;
      sparks.push({
        x: x,
        y: y,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd,
        life: 1,
        decay: Math.random() * 0.035 + 0.02,
        r: Math.random() * 2 + 1,
        color: color || "#FFB648"
      });
    }
  }

  function spawnGameElements() {
    asteroids = [];
    orbs = [];
    bullets = [];
    sparks = [];

    var astCount = Math.min(18, Math.max(8, Math.round((w * h) / 75000)));
    for (var i = 0; i < astCount; i++) {
      asteroids.push(createAsteroid());
    }

    var orbCount = Math.min(14, Math.max(6, Math.round((w * h) / 95000)));
    for (var j = 0; j < orbCount; j++) {
      orbs.push(createOrb());
    }
  }

  function initSoftwareParticles() {
    var count = Math.min(85, Math.max(28, Math.round((w * h) / 22000)));
    netParticles = Array.from({ length: count }, function () {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() > 0.5 ? "#5EEAD4" : "#60A5FA"
      };
    });
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initSoftwareParticles();
    spawnGameElements();
  }

  function fireBullet(targetX, targetY) {
    if (currentMode !== "gamedev") return;
    var startX = mouse.active ? mouse.x : w / 2;
    var startY = mouse.active ? mouse.y : h / 2;
    var dx = targetX - startX;
    var dy = targetY - startY;
    var dist = Math.hypot(dx, dy) || 1;
    var speed = 7.5;

    bullets.push({
      x: startX,
      y: startY,
      vx: (dx / dist) * speed,
      vy: (dy / dist) * speed,
      life: 1,
      r: 2.8,
      color: "#FFB648"
    });

    createSparks(startX, startY, "#FFB648", 5);
  }

  function renderSoftware() {
    netParticles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;

      if (mouse.active) {
        var dx = p.x - mouse.x, dy = p.y - mouse.y;
        var dist = Math.hypot(dx, dy);
        if (dist < MOUSE_DIST) {
          var force = (1 - dist / MOUSE_DIST) * 0.55;
          p.x += (dx / (dist || 1)) * force;
          p.y += (dy / (dist || 1)) * force;
        }
      }
    });

    for (var i = 0; i < netParticles.length; i++) {
      for (var j = i + 1; j < netParticles.length; j++) {
        var a = netParticles[i], b = netParticles[j];
        var dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < LINK_DIST) {
          ctx.strokeStyle = colorRGB("#5EEAD4", (1 - dist / LINK_DIST) * 0.12);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    netParticles.forEach(function (p) {
      ctx.fillStyle = colorRGB(p.hue, 0.55);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function renderGameDev() {
    if (mouse.active) {
      ship.x += (mouse.x - ship.x) * 0.16;
      ship.y += (mouse.y - ship.y) * 0.16;
      var dirX = mouse.x - ship.x;
      var dirY = mouse.y - ship.y;
      if (Math.hypot(dirX, dirY) > 2) {
        ship.angle = Math.atan2(dirY, dirX);
      }
    }

    // Asteroides
    for (var i = 0; i < asteroids.length; i++) {
      var a = asteroids[i];
      a.x += a.vx;
      a.y += a.vy;
      a.angle += a.vrot;

      if (a.x < -a.r * 2) a.x = w + a.r * 2; else if (a.x > w + a.r * 2) a.x = -a.r * 2;
      if (a.y < -a.r * 2) a.y = h + a.r * 2; else if (a.y > h + a.r * 2) a.y = -a.r * 2;

      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.angle);
      ctx.strokeStyle = colorRGB(a.hue, 0.38);
      ctx.fillStyle = colorRGB(a.hue, 0.04);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (var v = 0; v < a.numPts; v++) {
        var ang = (v / a.numPts) * Math.PI * 2;
        var rad = a.r * a.offsets[v];
        var px = Math.cos(ang) * rad;
        var py = Math.sin(ang) * rad;
        if (v === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Orbes coleccionables
    for (var o = orbs.length - 1; o >= 0; o--) {
      var orb = orbs[o];
      orb.x += orb.vx;
      orb.y += orb.vy;

      if (orb.x < -10) orb.x = w + 10; else if (orb.x > w + 10) orb.x = -10;
      if (orb.y < -10) orb.y = h + 10; else if (orb.y > h + 10) orb.y = -10;

      if (mouse.active) {
        var odx = mouse.x - orb.x;
        var ody = mouse.y - orb.y;
        var odist = Math.hypot(odx, ody);

        if (odist < 110) {
          var pull = (1 - odist / 110) * 2.2;
          orb.x += (odx / odist) * pull;
          orb.y += (ody / odist) * pull;
        }

        if (odist < 22) {
          createSparks(orb.x, orb.y, orb.hue, 14);
          score += 15;
          orbsCount += 1;
          updateHUD();
          orb.x = Math.random() > 0.5 ? -10 : w + 10;
          orb.y = Math.random() * h;
        }
      }

      ctx.save();
      ctx.translate(orb.x, orb.y);
      ctx.fillStyle = colorRGB(orb.hue, 0.75);
      ctx.shadowColor = orb.hue;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, -orb.r);
      ctx.lineTo(orb.r, 0);
      ctx.lineTo(0, orb.r);
      ctx.lineTo(-orb.r, 0);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    // Balas
    for (var b = bullets.length - 1; b >= 0; b--) {
      var bullet = bullets[b];
      bullet.x += bullet.vx;
      bullet.y += bullet.vy;
      bullet.life -= 0.02;

      var hit = false;
      for (var ai = 0; ai < asteroids.length; ai++) {
        var ast = asteroids[ai];
        var bDist = Math.hypot(bullet.x - ast.x, bullet.y - ast.y);
        if (bDist < ast.r) {
          createSparks(bullet.x, bullet.y, "#FFB648", 18);
          score += 50;
          updateHUD();
          hit = true;

          ast.x = Math.random() > 0.5 ? -40 : w + 40;
          ast.y = Math.random() * h;
          ast.vx = (Math.random() - 0.5) * 0.6;
          ast.vy = (Math.random() - 0.5) * 0.6;

          if (orbs.length < 20) {
            orbs.push(createOrb(bullet.x, bullet.y));
          }
          break;
        }
      }

      if (hit || bullet.life <= 0 || bullet.x < 0 || bullet.x > w || bullet.y < 0 || bullet.y > h) {
        bullets.splice(b, 1);
        continue;
      }

      ctx.fillStyle = colorRGB(bullet.color, bullet.life * 0.9);
      ctx.shadowColor = bullet.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Chispas
    for (var s = sparks.length - 1; s >= 0; s--) {
      var spk = sparks[s];
      spk.x += spk.vx;
      spk.y += spk.vy;
      spk.vx *= 0.96;
      spk.vy *= 0.96;
      spk.life -= spk.decay;

      if (spk.life <= 0) {
        sparks.splice(s, 1);
        continue;
      }

      ctx.fillStyle = colorRGB(spk.color, spk.life * 0.85);
      ctx.beginPath();
      ctx.arc(spk.x, spk.y, spk.r * spk.life, 0, Math.PI * 2);
      ctx.fill();
    }

    // Nave / Retícula
    if (mouse.active) {
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.angle);

      ctx.strokeStyle = colorRGB("#FFB648", 0.15);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = colorRGB("#FFB648", 0.7);
      ctx.strokeStyle = colorRGB("#FFE194", 0.9);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(-9, -7);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-9, 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    if (currentMode === "gamedev") {
      renderGameDev();
    } else {
      renderSoftware();
    }

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", function (e) {
    mouse.vx = e.clientX - mouse.x;
    mouse.vy = e.clientY - mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener("mouseleave", function () {
    mouse.active = false;
  });

  window.addEventListener("click", function (e) {
    if (currentMode !== "gamedev") return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "button" || tag === "a" || tag === "input" || e.target.closest("button") || e.target.closest("a") || e.target.closest(".modal") || e.target.closest(".game-hud")) {
      return;
    }
    fireBullet(e.clientX, e.clientY);
  });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && !prefersReducedMotion) requestAnimationFrame(step);
  });

  var resetBtn = document.getElementById("gameResetBtn");
  if (resetBtn) resetBtn.addEventListener("click", resetGame);

  var toggleHudBtn = document.getElementById("gameToggleBtn");
  var gameHud = document.getElementById("gameHud");
  if (toggleHudBtn && gameHud) {
    toggleHudBtn.addEventListener("click", function () {
      var coll = gameHud.classList.toggle("is-collapsed");
      toggleHudBtn.textContent = coll ? "+" : "Minimizar";
    });
  }

  if (prefersReducedMotion) {
    step();
  } else {
    requestAnimationFrame(step);
  }

  return {
    setMode: function (mode) {
      currentMode = mode;
      if (mode === "gamedev") {
        spawnGameElements();
      }
    },
    reset: resetGame
  };
})();

/* =========================================================
   PROFILE APPLICATION SYSTEM
   ========================================================= */

/**
 * Render chip-row HTML from an array of { name, cssClass } items.
 */
function renderChips(items) {
  if (!items || !items.length) return "";
  return items.map(function (item) {
    return '<span class="chip ' + item.cssClass + ' has-icon">' + item.name + '</span>';
  }).join("");
}

/**
 * Apply profile-specific content to the page.
 */
function applyProfile(profileKey) {
  currentProfileKey = profileKey;
  var profile = PROFILES[profileKey];
  if (!profile) return;

  var el = function (id) { return document.getElementById(id); };

  /* ── Page title & meta ─────────────────────────────────── */
  document.title = profile.pageTitle;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", profile.metaDescription);

  /* ── Hero section ──────────────────────────────────────── */
  var heroEyebrow = el("heroEyebrow");
  if (heroEyebrow) heroEyebrow.textContent = profile.eyebrow;

  var heroTitle = el("heroTitle");
  if (heroTitle) heroTitle.innerHTML = profile.heroTitle;

  var heroSub = el("heroSub");
  if (heroSub) heroSub.textContent = profile.heroSub;

  /* ── Stats ─────────────────────────────────────────────── */
  var statProjects = el("statProjects");
  if (statProjects) statProjects.textContent = profile.stats.projects.value;

  var statProjectsLabel = el("statProjectsLabel");
  if (statProjectsLabel) statProjectsLabel.textContent = profile.stats.projects.label;

  var statEngines = el("statEngines");
  if (statEngines) statEngines.textContent = profile.stats.stacks.value;

  var statEnginesLabel = el("statEnginesLabel");
  if (statEnginesLabel) statEnginesLabel.textContent = profile.stats.stacks.label;

  var statExperience = el("statExperience");
  if (statExperience) statExperience.textContent = profile.stats.experience.value;

  var statExperienceLabel = el("statExperienceLabel");
  if (statExperienceLabel) statExperienceLabel.textContent = profile.stats.experience.label;

  /* ── Portfolio section head ─────────────────────────────── */
  var portfolioHeading = el("portfolioHeading");
  if (portfolioHeading) portfolioHeading.textContent = profile.portfolioHeading;

  var portfolioDescription = el("portfolioDescription");
  if (portfolioDescription) portfolioDescription.textContent = profile.portfolioDescription;

  /* ── About section ─────────────────────────────────────── */
  var aboutEyebrow = el("aboutEyebrow");
  if (aboutEyebrow) aboutEyebrow.textContent = profile.aboutEyebrow;

  var aboutP2 = el("aboutParagraph2");
  if (aboutP2) aboutP2.textContent = profile.aboutParagraph2;

  /* ── CV sidebar ────────────────────────────────────────── */
  var cvLanguages = el("cvLanguages");
  if (cvLanguages) cvLanguages.innerHTML = renderChips(profile.languages);

  var cvSkills = el("cvSkills");
  if (cvSkills) cvSkills.innerHTML = renderChips(profile.skills);

  var cvInterests = el("cvInterests");
  if (cvInterests) cvInterests.innerHTML = renderChips(profile.interests);

  /* ── CV download & preview links ───────────────────────── */
  var cvPdfUrl = profile.cvFile;
  var cvPdfParamUrl = cvPdfUrl + "#toolbar=1&navpanes=0";
  var cvFileName = cvPdfUrl.split("/").pop();

  var cvDownloadBtn = el("cvDownloadBtn");
  if (cvDownloadBtn) {
    cvDownloadBtn.href = cvPdfUrl;
  }

  var cvFallbackDownloadBtn = el("cvFallbackDownloadBtn");
  if (cvFallbackDownloadBtn) cvFallbackDownloadBtn.href = cvPdfUrl;

  var cvPdfNewTabBtn = el("cvPdfNewTabBtn");
  if (cvPdfNewTabBtn) cvPdfNewTabBtn.href = cvPdfUrl;

  var cvModalNewTabBtn = el("cvModalNewTabBtn");
  if (cvModalNewTabBtn) cvModalNewTabBtn.href = cvPdfUrl;

  var cvModalDownloadBtn = el("cvModalDownloadBtn");
  if (cvModalDownloadBtn) cvModalDownloadBtn.href = cvPdfUrl;

  var cvPdfProfileBadge = el("cvPdfProfileBadge");
  if (cvPdfProfileBadge) cvPdfProfileBadge.textContent = profile.label;

  var cvPdfFileName = el("cvPdfFileName");
  if (cvPdfFileName) cvPdfFileName.textContent = cvFileName;

  var cvModalTag = el("cvModalTag");
  if (cvModalTag) cvModalTag.textContent = profile.label;

  var cvModalTitle = el("cvModalTitle");
  if (cvModalTitle) cvModalTitle.textContent = "Curriculum Vitae — " + profile.label;

  var cvEmbeddedIframe = el("cvEmbeddedIframe");
  if (cvEmbeddedIframe) cvEmbeddedIframe.src = cvPdfParamUrl;

  var cvModalIframe = el("cvModalIframe");
  if (cvModalIframe) cvModalIframe.src = cvPdfParamUrl;

  /* ── Show/hide gamedev-only elements ───────────────────── */
  document.querySelectorAll(".gamedev-only").forEach(function (elem) {
    elem.style.display = profile.showItch ? "" : "none";
  });

  /* ── Body class for profile ────────────────────────────── */
  document.body.classList.remove("profile-software", "profile-gamedev");
  document.body.classList.add("profile-" + profileKey);

  /* ── Switch canvas background mode ─────────────────────── */
  if (typeof BackgroundEngine !== "undefined" && BackgroundEngine.setMode) {
    BackgroundEngine.setMode(profileKey);
  }
}

/* =========================================================
   SISTEMA DE PREVISUALIZACIÓN DE CV (Tabs y Modal)
   ========================================================= */
const cvModalBackdrop = document.getElementById("cvModalBackdrop");
const cvModalClose    = document.getElementById("cvModalClose");
const cvOpenModalBtn  = document.getElementById("cvOpenModalBtn");
const cvPdfExpandBtn  = document.getElementById("cvPdfExpandBtn");
const cvTabWeb        = document.getElementById("cvTabWeb");
const cvTabPdf        = document.getElementById("cvTabPdf");
const cvLayoutWeb     = document.getElementById("cvLayoutWeb");
const cvLayoutPdf     = document.getElementById("cvLayoutPdf");
let cvModalLastFocused = null;

function openCvModal() {
  if (!cvModalBackdrop) return;
  cvModalLastFocused = document.activeElement;
  cvModalBackdrop.classList.add("is-open");
  document.body.style.overflow = "hidden";
  if (cvModalClose) cvModalClose.focus();
}

function closeCvModal() {
  if (!cvModalBackdrop) return;
  cvModalBackdrop.classList.remove("is-open");
  document.body.style.overflow = "";
  if (cvModalLastFocused) cvModalLastFocused.focus();
}

if (cvOpenModalBtn) cvOpenModalBtn.addEventListener("click", openCvModal);
if (cvPdfExpandBtn) cvPdfExpandBtn.addEventListener("click", openCvModal);
if (cvModalClose)   cvModalClose.addEventListener("click", closeCvModal);
if (cvModalBackdrop) {
  cvModalBackdrop.addEventListener("click", function(e) {
    if (e.target === cvModalBackdrop) closeCvModal();
  });
}
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && cvModalBackdrop && cvModalBackdrop.classList.contains("is-open")) {
    closeCvModal();
  }
});

function setCvTab(mode) {
  if (!cvTabWeb || !cvTabPdf || !cvLayoutWeb || !cvLayoutPdf) return;
  var isPdf = (mode === "pdf");
  cvTabWeb.classList.toggle("is-active", !isPdf);
  cvTabWeb.setAttribute("aria-selected", String(!isPdf));
  cvTabPdf.classList.toggle("is-active", isPdf);
  cvTabPdf.setAttribute("aria-selected", String(isPdf));

  cvLayoutWeb.classList.toggle("is-hidden", isPdf);
  cvLayoutPdf.classList.toggle("is-hidden", !isPdf);

  requestAnimationFrame(revealObserveAll);
}

if (cvTabWeb) cvTabWeb.addEventListener("click", function() { setCvTab("web"); });
if (cvTabPdf) cvTabPdf.addEventListener("click", function() { setCvTab("pdf"); });

/* =========================================================
   INIT APP — Called after profile selection
   ========================================================= */
function initApp(profileKey) {
  applyProfile(profileKey);
  applyProfileContent();
  setCvTab("web");
  activeFilter = "Todos";
  renderFilters();
  renderCards();
  moveIndicator();
  revealObserveAll();

  // Comprobar si hay una vista específica en el hash (ej: #about, #cv)
  var rawHash = (window.location.hash || "").replace(/^#/, "").toLowerCase();
  if (rawHash === "about" || rawHash === "cv" || rawHash === "portfolio") {
    setView(rawHash);
  } else if (!window.location.hash) {
    // Si no hay hash, reflejar el perfil actual para facilitar compartir el link
    try {
      history.replaceState(null, "", "#" + profileKey);
    } catch (e) {}
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
