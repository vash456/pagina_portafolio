/* =========================================================
   NAVEGACIÓN ENTRE VISTAS (Portafolio / Acerca de mí / CV)
   ========================================================= */
const menuItems = document.querySelectorAll("[data-view]");
const views = document.querySelectorAll(".view");
const menu = document.querySelector(".menu");
const menuToggle = document.getElementById("menuToggle");

function setView(name){
  views.forEach(v => v.classList.toggle("is-active", v.dataset.viewPanel === name));
  document.querySelectorAll(".menu-item").forEach(btn=>{
    btn.classList.toggle("is-active", btn.dataset.view === name);
  });
  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded","false");
  window.scrollTo({ top:0, behavior:"instant" in window ? "instant" : "auto" });
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
    return `
    <article class="card" style="--accent-card:${c}" tabindex="0" data-id="${p.id}" role="button" aria-label="Ver detalles de ${p.title}">
      <div class="card-spine">
        <span>${p.year} · ${p.status}</span>
        <b>${p.language}</b>
      </div>
      <div class="card-cover">
        <img src="${p.cover}" alt="Arte de portada de ${p.title}" loading="lazy">
      </div>
      <div class="card-body">
        <h3>${p.title}</h3>
        <p class="card-tagline">${p.tagline}</p>
        <div class="card-tags">
          ${p.tags.map(t => `<span class="chip">${t}</span>`).join("")}
        </div>
      </div>
    </article>`;
  }).join("");

  cardsGrid.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("click", ()=> openModal(card.dataset.id));
    card.addEventListener("keydown", (e)=>{
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openModal(card.dataset.id); }
    });
  });
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
   INIT
   ========================================================= */
renderFilters();
renderCards();
document.getElementById("year").textContent = new Date().getFullYear();
