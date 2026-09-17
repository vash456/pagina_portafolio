/**
 * PROFILE SELECTOR — Entry-point logic with Deep Linking
 * ========================================================
 * Shows the fullscreen profile selector on first visit.
 *
 * Deep Linking support:
 * - URL Query params: ?profile=gamedev | ?profile=software (or ?p=...)
 * - URL Hash: #gamedev | #software
 * If a profile is specified in the URL or stored in sessionStorage,
 * skips the selector and boots the app directly into that profile.
 *
 * Depends on: profiles.js (PROFILES), script.js (initApp)
 * Load order: data.js → profiles.js → script.js → profile-selector.js
 */

(function initProfileSelector() {
  const selector = document.getElementById("profileSelector");
  const app = document.getElementById("app");

  if (!selector || !app) return;

  /* ── 1. Check for profile in URL (Deep Linking) ──────── */
  function detectProfileFromURL() {
    // 1.1 Check query params: ?profile=gamedev or ?profile=software
    try {
      var params = new URLSearchParams(window.location.search);
      var pParam = (params.get("profile") || params.get("p") || "").toLowerCase().trim();
      if (pParam === "gamedev" || pParam === "software" || pParam === "unity") {
        return pParam === "unity" ? "gamedev" : pParam;
      }
    } catch (e) {}

    // 1.2 Check URL hash: #gamedev, #software, #unity
    var hash = (window.location.hash || "").replace(/^#/, "").toLowerCase().trim();
    if (hash === "gamedev" || hash === "unity") return "gamedev";
    if (hash === "software") return "software";
    if (hash.indexOf("profile=gamedev") !== -1 || hash.indexOf("p=gamedev") !== -1) return "gamedev";
    if (hash.indexOf("profile=software") !== -1 || hash.indexOf("p=software") !== -1) return "software";

    return null;
  }

  const urlProfile = detectProfileFromURL();
  if (urlProfile && typeof PROFILES !== "undefined" && PROFILES[urlProfile]) {
    sessionStorage.setItem("selectedProfile", urlProfile);
    selector.remove();
    app.classList.remove("is-hidden");
    initApp(urlProfile);
    return;
  }

  /* ── 2. Check for saved profile in sessionStorage ─────── */
  const saved = sessionStorage.getItem("selectedProfile");
  if (saved && typeof PROFILES !== "undefined" && PROFILES[saved]) {
    selector.remove();
    app.classList.remove("is-hidden");
    initApp(saved);
    return;
  }

  /* ── 3. Attach click handlers to profile cards ────────── */
  selector.querySelectorAll("[data-profile]").forEach(function (card) {
    card.addEventListener("click", function () {
      selectProfile(card.dataset.profile);
    });

    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectProfile(card.dataset.profile);
      }
    });
  });

  function selectProfile(key) {
    sessionStorage.setItem("selectedProfile", key);

    // Update URL hash smoothly so the URL can be shared directly
    try {
      history.replaceState(null, "", "#" + key);
    } catch (e) {}

    selector.classList.add("is-leaving");

    setTimeout(function () {
      selector.remove();
      app.classList.remove("is-hidden");
      initApp(key);
    }, 480);
  }
})();
