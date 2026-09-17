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

  const contactEmailLink = el("contactEmailLink");
  if (contactEmailLink) {
    contactEmailLink.href = "mailto:" + PROFILE.email;
    contactEmailLink.textContent = PROFILE.email;
  }

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

  const footerEmailLink = el("footerEmailLink");
  if (footerEmailLink) {
    footerEmailLink.href = "mailto:" + PROFILE.footerEmail;
    footerEmailLink.textContent = "Correo";
  }

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
   SWITCH PROFILE BUTTON
   ========================================================= */
var switchBtn = document.getElementById("switchProfile");
if (switchBtn) {
  switchBtn.addEventListener("click", function () {
    sessionStorage.removeItem("selectedProfile");
    location.reload();
  });
}

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
   FONDO VIVO: CAMPO DE PARTÍCULAS A LA DERIVA
   ========================================================= */
(function initParticles() {
  var canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  var w, h, dpr, particles = [];
  var mouse = { x: -9999, y: -9999, active: false };
  var LINK_DIST  = 130;
  var MOUSE_DIST = 160;

  function colorRGB(hex, alpha) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.min(90, Math.max(28, Math.round((w * h) / 22000)));
    particles = Array.from({ length: count }, function () {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() > 0.5 ? "#5EEAD4" : "#FFB648",
      };
    });
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;

      if (mouse.active) {
        var dx = p.x - mouse.x, dy = p.y - mouse.y;
        var dist = Math.hypot(dx, dy);
        if (dist < MOUSE_DIST) {
          var force = (1 - dist / MOUSE_DIST) * 0.6;
          p.x += (dx / (dist || 1)) * force;
          p.y += (dy / (dist || 1)) * force;
        }
      }
    });

    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var a = particles[i], b = particles[j];
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

    particles.forEach(function (p) {
      ctx.fillStyle = colorRGB(p.hue, 0.55);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!prefersReducedMotion) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  });
  window.addEventListener("mouseleave", function () { mouse.active = false; });

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && !prefersReducedMotion) requestAnimationFrame(step);
  });

  if (prefersReducedMotion) {
    step();
  } else {
    requestAnimationFrame(step);
  }
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
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
