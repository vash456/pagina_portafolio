/* =========================================================
   NAVEGACIÓN ENTRE VISTAS (Portafolio / Acerca de mí / CV)
   ========================================================= */
const menuItems = document.querySelectorAll("[data-view]");
const views = document.querySelectorAll(".view");
const menu = document.querySelector(".menu");
const menuToggle = document.getElementById("menuToggle");

const menuIndicator = document.getElementById("menuIndicator");

const PROFILE = {
  fullName: "Darlin Estrada Patiño",
  contactName: "Darlin Estrada Patiño",
  pageTitle: "Darlin Estrada Patiño — Programador de Videojuegos",
  portfolioTitle: "Construyo mundos jugables,<br>un sistema a la vez.",
  githubUser: "vash456",
  githubUrl: "https://github.com/vash456",
  linkedinUrl: "https://linkedin.com/in/darlin-estrada",
  itchUrl: "https://vashgames.itch.io/",
  email: "darlin.estrada456@gmail.com",
  footerEmail: "darlin.estrada456@gmail.com",
  statExperience: "+4",
  statEngines: "03",
  statProjects: "04",
};

function applyProfileContent(){
  const brandNameText = document.getElementById("brandNameText");
  if(brandNameText) brandNameText.textContent = PROFILE.fullName;

  const statExperience = document.getElementById("statExperience");
  if(statExperience) statExperience.textContent = PROFILE.statExperience;

  const statEngines = document.getElementById("statEngines");
  if(statEngines) statEngines.textContent = PROFILE.statEngines;

  const statProjects = document.getElementById("statProjects");
  if(statProjects) statProjects.textContent = PROFILE.statProjects;

  const heroTitle = document.getElementById("heroTitle");
  if(heroTitle) heroTitle.innerHTML = PROFILE.portfolioTitle;

  const contactEmailLink = document.getElementById("contactEmailLink");
  if(contactEmailLink){
    contactEmailLink.href = `mailto:${PROFILE.email}`;
    contactEmailLink.textContent = PROFILE.email;
  }

  const cvGithubLink = document.getElementById("cvGithubLink");
  if(cvGithubLink){
    cvGithubLink.href = PROFILE.githubUrl;
    cvGithubLink.textContent = PROFILE.githubUrl.replace("https://", "");
  }

  const linkedinLink = document.getElementById("linkedinLink");
  if(linkedinLink){
    linkedinLink.href = PROFILE.linkedinUrl;
    linkedinLink.textContent = PROFILE.linkedinUrl.replace("https://", "");
  }

  const footerGithubLink = document.getElementById("footerGithubLink");
  if(footerGithubLink){
    footerGithubLink.href = PROFILE.githubUrl;
    footerGithubLink.textContent = "GitHub";
  }

  const footerItchLink = document.getElementById("footerItchLink");
  if(footerItchLink) footerItchLink.href = PROFILE.itchUrl;
  
  const itchLink = document.getElementById("itchLink");
  if(itchLink) itchLink.href = PROFILE.itchUrl;

  const footerEmailLink = document.getElementById("footerEmailLink");
  if(footerEmailLink){
    footerEmailLink.href = `mailto:${PROFILE.footerEmail}`;
    footerEmailLink.textContent = "Correo";
  }

  const footerOwnerName = document.getElementById("footerOwnerName");
  if(footerOwnerName) footerOwnerName.textContent = PROFILE.fullName;

  document.title = PROFILE.pageTitle;
}

applyProfileContent();

function moveIndicator(){
  const active = document.querySelector(".menu-item.is-active");
  if(!active || !menuIndicator) return;
  menuIndicator.style.left = active.offsetLeft + "px";
  menuIndicator.style.width = active.offsetWidth + "px";
}

function setView(name){
  views.forEach(v => v.classList.toggle("is-active", v.dataset.viewPanel === name));
  document.querySelectorAll(".menu-item").forEach(btn=>{
    btn.classList.toggle("is-active", btn.dataset.view === name);
  });
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded","false");
  window.scrollTo({ top:0, behavior:"instant" in window ? "instant" : "auto" });
  requestAnimationFrame(moveIndicator);
  requestAnimationFrame(revealObserveAll);
}

menuItems.forEach(el=>{
  el.addEventListener("click", (e)=>{
    e.preventDefault();
    setView(el.dataset.view);
  });
});

menuToggle?.addEventListener("click", ()=>{
  const open = menu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

window.addEventListener("resize", moveIndicator);
window.addEventListener("load", moveIndicator);

/* =========================================================
   ACCENT COLORS POR LENGUAJE (para la "columna" de la tarjeta)
   ========================================================= */
const LANG_COLORS = {
  "C#": "#FFB648",
  "GDScript": "#5EEAD4",
  "C++": "#F97066",
  "JavaScript": "#C084FC",
  "Python": "#7DD3FC",
  "Lua": "#93C5FD",
};
function colorFor(lang){ return LANG_COLORS[lang] || "#5EEAD4"; }

const STATUS_COLORS = {
  "Publicado": "#5EEAD4",
  "En desarrollo": "#FFB648",
  "Prototipo": "#C084FC",
};
function statusColor(status){ return STATUS_COLORS[status] || "#5EEAD4"; }

/* =========================================================
   RENDER: TARJETAS DE PORTAFOLIO
   ========================================================= */
const cardsGrid = document.getElementById("cardsGrid");
const filterBar = document.getElementById("filterBar");
const statProjects = document.getElementById("statProjects");

let activeFilter = "Todos";

function renderFilters(){
  const langs = ["Todos", ...new Set(PROJECTS.map(p => p.language))];
  filterBar.innerHTML = langs.map(l =>
    `<button class="filter-chip ${l===activeFilter ? "is-active":""}" data-lang="${l}" type="button">${l}</button>`
  ).join("");

  filterBar.querySelectorAll(".filter-chip").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      activeFilter = btn.dataset.lang;
      renderFilters();
      renderCards();
    });
  });
}

function renderCards(){
  const list = activeFilter === "Todos" ? PROJECTS : PROJECTS.filter(p => p.language === activeFilter);

  if(list.length === 0){
    cardsGrid.innerHTML = `<p style="color:var(--text-muted)">No hay proyectos con este filtro todavía.</p>`;
    return;
  }

  cardsGrid.innerHTML = list.map(p => {
    const c = colorFor(p.language);
    const sc = statusColor(p.status);
    const meta = p.tags.slice(0, 2).join(" / ").toUpperCase();
    return `
    <article class="card" style="--accent-card:${c}; --status-color:${sc}" tabindex="0" data-id="${p.id}" role="button" aria-label="Ver detalles de ${p.title}">
      <div class="card-cover">
        <img src="${p.cover}" alt="Arte de portada de ${p.title}" loading="lazy">
        <span class="card-badge">${p.status}</span>
      </div>
      <div class="card-body">
        <p class="card-meta">${meta} · ${p.year}</p>
        <h3>${p.title}</h3>
        <p class="card-tagline">${p.tagline}</p>
        <div class="card-tags">
          <span class="chip">${p.language}</span>
          <span class="chip">${p.engine}</span>
        </div>
        <span class="card-link">Ver proyecto <span class="chev" aria-hidden="true">›</span></span>
      </div>
    </article>`;
  }).join("");

  cardsGrid.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("click", ()=> openModal(card.dataset.id));
    card.addEventListener("keydown", (e)=>{
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openModal(card.dataset.id); }
    });
    attachTilt(card);
  });
  requestAnimationFrame(revealObserveAll);
}

if(statProjects) statProjects.textContent = String(PROJECTS.length).padStart(2,"0");

/* =========================================================
   MODAL DE DETALLE DE PROYECTO
   ========================================================= */
const modalBackdrop = document.getElementById("modalBackdrop");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
let lastFocused = null;

function linkRow(links){
  const items = [];
  if(links.play) items.push(`<a class="btn btn-primary" href="${links.play}" target="_blank" rel="noopener">▶ Jugar</a>`);
  if(links.repo) items.push(`<a class="btn btn-ghost" href="${links.repo}" target="_blank" rel="noopener">Código fuente</a>`);
  if(links.devlog) items.push(`<a class="btn btn-ghost" href="${links.devlog}" target="_blank" rel="noopener">Devlog</a>`);
  return items.length ? `<div class="modal-links">${items.join("")}</div>` : "";
}

function openModal(id){
  const p = PROJECTS.find(x => x.id === id);
  if(!p) return;
  const c = colorFor(p.language);

  modalContent.innerHTML = `
    <div class="modal-gallery" style="--accent-card:${c}">
      <div class="modal-gallery-main">
        <img id="modalMainImg" src="${p.screenshots[0]}" alt="Captura de ${p.title}">
      </div>
    </div>
    <div class="modal-thumbs" id="modalThumbs">
      ${p.screenshots.map((s,i)=>`
        <button type="button" class="${i===0 ? "is-active":""}" data-src="${s}" aria-label="Captura ${i+1}">
          <img src="${s}" alt="">
        </button>`).join("")}
    </div>
    <div class="modal-body">
      <h2 id="modalTitle">${p.title}</h2>
      <div class="modal-meta">
        <span class="chip" style="border-color:${c};color:${c}">${p.language}</span>
        <span class="chip">${p.engine}</span>
        <span class="chip">${p.year}</span>
        <span class="chip">${p.status}</span>
        ${p.tags.map(t=>`<span class="chip">${t}</span>`).join("")}
      </div>
      <p class="modal-tagline">${p.tagline}</p>

      <div class="modal-section">
        <h4>Tema</h4>
        <p>${p.theme}</p>
      </div>
      <div class="modal-section">
        <h4>Mecánicas principales</h4>
        <p>${p.mechanics}</p>
      </div>
      <div class="modal-section">
        <h4>Reto de diseño / programación</h4>
        <p>${p.challenge}</p>
      </div>

      ${linkRow(p.links)}
    </div>
  `;

  const mainImg = document.getElementById("modalMainImg");
  document.querySelectorAll("#modalThumbs button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      mainImg.src = btn.dataset.src;
      document.querySelectorAll("#modalThumbs button").forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  lastFocused = document.activeElement;
  modalBackdrop.classList.add("is-open");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal(){
  modalBackdrop.classList.remove("is-open");
  document.body.style.overflow = "";
  if(lastFocused) lastFocused.focus();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e)=>{
  if(e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e)=>{
  if(e.key === "Escape" && modalBackdrop.classList.contains("is-open")) closeModal();
});

/* =========================================================
   REVEAL AL HACER SCROLL
   ========================================================= */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let revealObserver = null;
if("IntersectionObserver" in window){
  revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.12, rootMargin:"0px 0px -40px 0px" });
}

function revealObserveAll(){
  document.querySelectorAll(".reveal:not(.is-visible), .card:not(.is-visible)").forEach(el=>{
    const r = el.getBoundingClientRect();
    // ya visible en pantalla → mostrar de inmediato en vez de esperar el observer
    if(r.top < window.innerHeight * 0.94 && r.bottom > 0){
      el.classList.add("is-visible");
    } else if(revealObserver){
      revealObserver.observe(el);
    }
  });
}

/* =========================================================
   TILT + BRILLO INTERACTIVO EN TARJETAS
   ========================================================= */
function attachTilt(card){
  if(prefersReducedMotion) return;

  card.addEventListener("mousemove", (e)=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0 → 1
    const py = (e.clientY - r.top) / r.height;   // 0 → 1
    const rotateY = (px - 0.5) * 10;              // grados
    const rotateX = (0.5 - py) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  });

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "";
  });
}

/* =========================================================
   FONDO VIVO: CAMPO DE PARTÍCULAS A LA DERIVA
   ========================================================= */
(function initParticles(){
  const canvas = document.getElementById("bgCanvas");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");

  let w, h, dpr, particles = [];
  const mouse = { x:-9999, y:-9999, active:false };
  const LINK_DIST = 130;
  const MOUSE_DIST = 160;

  function colorRGB(hex, alpha){
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(90, Math.max(28, Math.round((w * h) / 22000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.6,
      hue: Math.random() > 0.5 ? "#5EEAD4" : "#FFB648",
    }));
  }

  function step(){
    ctx.clearRect(0, 0, w, h);

    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < -20) p.x = w + 20; else if(p.x > w + 20) p.x = -20;
      if(p.y < -20) p.y = h + 20; else if(p.y > h + 20) p.y = -20;

      if(mouse.active){
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if(dist < MOUSE_DIST){
          const force = (1 - dist / MOUSE_DIST) * 0.6;
          p.x += (dx / (dist || 1)) * force;
          p.y += (dy / (dist || 1)) * force;
        }
      }
    });

    for(let i=0; i<particles.length; i++){
      for(let j=i+1; j<particles.length; j++){
        const a = particles[i], b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if(dist < LINK_DIST){
          ctx.strokeStyle = colorRGB("#5EEAD4", (1 - dist / LINK_DIST) * 0.12);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    particles.forEach(p=>{
      ctx.fillStyle = colorRGB(p.hue, 0.55);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if(!prefersReducedMotion) requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);

  window.addEventListener("mousemove", (e)=>{
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  });
  window.addEventListener("mouseleave", ()=>{ mouse.active = false; });

  document.addEventListener("visibilitychange", ()=>{
    if(document.visibilityState === "visible" && !prefersReducedMotion) requestAnimationFrame(step);
  });

  if(prefersReducedMotion){
    // dibuja un solo cuadro estático, sin animación ni interacción, por accesibilidad
    step();
  } else {
    requestAnimationFrame(step);
  }
})();

/* =========================================================
   INIT
   ========================================================= */
renderFilters();
renderCards();
moveIndicator();
revealObserveAll();
document.getElementById("year").textContent = new Date().getFullYear();