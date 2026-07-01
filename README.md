# Portafolio de Videojuegos

Sitio estático (HTML + CSS + JS puro, sin frameworks ni build step) listo para publicarse en **GitHub Pages**.

## Estructura del proyecto

```
portfolio/
├── index.html              → estructura de las 3 secciones (Portafolio, Acerca de mí, CV)
├── css/
│   └── styles.css          → todos los estilos
├── js/
│   ├── data.js              → ⭐ AQUÍ agregas/editas tus proyectos
│   └── script.js             → lógica de navegación, tarjetas y modal (no necesitas tocarlo)
├── assets/
│   ├── img/projects/        → portadas y capturas de cada juego
│   └── cv/                  → tu CV en PDF
└── README.md
```

---

## 1. Publicarlo en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `mi-portafolio`).
2. Sube **todo el contenido de esta carpeta** a la raíz del repositorio (no dentro de una subcarpeta), ya sea arrastrando los archivos en la web de GitHub o con:
   ```bash
   git init
   git add .
   git commit -m "Primer commit del portafolio"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/mi-portafolio.git
   git push -u origin main
   ```
3. En el repositorio en GitHub: **Settings → Pages**.
4. En "Build and deployment", selecciona **Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
5. Guarda. En un par de minutos tu sitio quedará disponible en:
   `https://TU-USUARIO.github.io/mi-portafolio/`

No necesitas ningún paso de compilación: es HTML/CSS/JS plano.

---

## 2. Personalizar tu identidad

Busca y reemplaza el texto **"Camila Torres"** en `index.html` por tu nombre (aparece en el título de la pestaña, el menú y el pie de página).

- **Foto de perfil**: en la sección "Acerca de mí" hay un retrato ilustrado de ejemplo (SVG). Para usar tu propia foto, agrega tu imagen en `assets/img/perfil.jpg` y reemplaza el bloque `<svg>...</svg>` dentro de `.about-portrait` en `index.html` por:
  ```html
  <img src="assets/img/perfil.jpg" alt="Foto de Tu Nombre">
  ```
- **Texto de "Acerca de mí"**: edita libremente los párrafos dentro de `<section id="view-about">`.
- **CV en PDF**: coloca tu archivo en `assets/cv/` y actualiza el `href` del botón "Descargar CV en PDF" en `index.html` (sección CV).
- **Datos del CV** (experiencia, educación, habilidades, contacto): edita directamente el HTML dentro de `<section id="view-cv">`.
- **Enlaces de contacto/redes**: aparecen en el CV y en el pie de página (`<footer>`); reemplaza los `href` de GitHub, itch.io, LinkedIn y correo.

---

## 3. Agregar un nuevo proyecto (juego)

Todo el portafolio se genera automáticamente desde el archivo **`js/data.js`**. No necesitas tocar el HTML ni el CSS.

### Paso 1 — Agrega tus imágenes
Coloca la portada y las capturas de pantalla del juego en `assets/img/projects/`, por ejemplo:
```
assets/img/projects/mi-juego-cover.jpg
assets/img/projects/mi-juego-shot1.jpg
assets/img/projects/mi-juego-shot2.jpg
```
(También funcionan `.png` o `.svg`. Recomendado: portada en proporción 16:9.)

### Paso 2 — Copia un bloque en `js/data.js`
Dentro del array `PROJECTS`, agrega un objeto nuevo (puedes copiar uno existente como plantilla):

```js
{
  id: "mi-juego",                         // único, sin espacios
  title: "Mi Juego",
  tagline: "Una frase corta y llamativa.",
  year: "2025",
  status: "Publicado",                    // "Publicado" | "Prototipo" | "En desarrollo"
  language: "C#",
  engine: "Unity",
  tags: ["Aventura", "2D"],
  theme: "Describe la ambientación/tema del juego.",
  mechanics: "Describe las mecánicas principales.",
  challenge: "Describe el problema o reto técnico/de diseño que resolviste.",
  cover: "assets/img/projects/mi-juego-cover.jpg",
  screenshots: [
    "assets/img/projects/mi-juego-shot1.jpg",
    "assets/img/projects/mi-juego-shot2.jpg",
  ],
  links: {
    play: "https://tu-usuario.itch.io/mi-juego",
    repo: "https://github.com/tu-usuario/mi-juego",
    devlog: "",
  },
},
```

Guarda el archivo: la nueva tarjeta aparecerá automáticamente en el grid del Portafolio, con su propio filtro por lenguaje y su modal de detalle con galería de capturas.

Deja vacío (`""`) cualquier link que no aplique — el botón correspondiente simplemente no se mostrará.

---

## 4. Proyectos de ejemplo incluidos

El archivo `data.js` ya incluye 4 proyectos de muestra (Nébula Drift, Cripta del Eco, Reino de Hojas y Pixel Market) con arte generado especialmente para este portafolio, solo para que veas la estructura funcionando. Reemplázalos por tus propios juegos siguiendo el paso 3, o simplemente edítalos si quieres conservar el formato.

---

## 5. Notas técnicas

- El sitio usa Google Fonts vía CDN (Space Grotesk, Inter, IBM Plex Mono) — requiere conexión a internet para verse con las tipografías correctas; si no hay conexión, usa las de respaldo del sistema.
- Es totalmente responsive (móvil, tablet, escritorio) y respeta `prefers-reduced-motion`.
- El filtro de proyectos por lenguaje se genera automáticamente según los lenguajes presentes en `data.js`.
- No hay dependencias ni `npm install`: abre `index.html` directamente en el navegador para probar en local, o usa una extensión tipo "Live Server".
