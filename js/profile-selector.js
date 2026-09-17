/**
 * PROFILE SELECTOR — Entry-point logic
 * =====================================
 * Shows the fullscreen profile selector on first visit.
 * If a profile was already chosen (stored in sessionStorage),
 * skips the selector and boots the app directly.
 *
 * Depends on: profiles.js (PROFILES), script.js (initApp)
 * Load order: data.js → profiles.js → script.js → profile-selector.js
 */

(function initProfileSelector() {
  const selector = document.getElementById("profileSelector");
  const app = document.getElementById("app");

  if (!selector || !app) return;

  /* ── Check for saved profile ─────────────────────────── */
  const saved = sessionStorage.getItem("selectedProfile");

  if (saved && typeof PROFILES !== "undefined" && PROFILES[saved]) {
    selector.remove();
    app.classList.remove("is-hidden");
    initApp(saved);
    return;
  }

  /* ── Attach handlers to profile cards ────────────────── */
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
    selector.classList.add("is-leaving");

    setTimeout(function () {
      selector.remove();
      app.classList.remove("is-hidden");
      initApp(key);
    }, 480);
  }
})();
